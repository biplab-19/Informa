
/*
 * BrandPortfolio Search.js
 *
 *
 * @project:    Informa
 * @date:       2019-April-06
 * @author:     Girish
 * @licensor:   YenDigital
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.BrandPortfolioViews = (function (window, $, namespace) {
	'use strict';
	//variables
	var BrandPortfolioLists = $('.brands-search'),
        MonthSelect = $('select[name="month"]'),
        SectorSelect = $('select[name="sector"]'),
        Country = $('select[name="country"]'),
        Type = $('select[name="eventType"]'),

        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, DeleteFilter;
	var dd1_list = [];
	var dd2_list = [];
	var dd3_list = [];
	var $grid;
	var docElem = document.documentElement;
	var transitionProp = typeof docElem.style.transition == 'string' ?
		'transition' : 'WebkitTransition';
	var transitionEndEvent = {
		WebkitTransition: 'webkitTransitionEnd',
		transition: 'transitionend'
	}[transitionProp];

	init = function () {

		$grid = $('.grid').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
			percentPosition: true,
			gutter: 10,
			transitionDuration: 0
		});


		//$(document).on("click", ".dropdown li", function () {
		$(".dropdown li").click(function (e) {
			INFORMA.Spinner.Show($('body'));
			BrandFilter(this);
			LoadBrands();
		});


		$grid.on('click', '.grid-item-content', function () {

			var itemContent = this;
			var itemElem = itemContent.parentNode;

			if ($(itemElem).hasClass("is-expanded")) {
				ResetAll();
			}
			else {

				if ($(itemElem).hasClass("is-expanded")) {
					$(itemElem).find(".outer-img").show();
					$(itemElem).find(".plus").show();
					$(itemElem).find(".content").hide();
				} else {
					ResetAll();

					$(itemElem).toggleClass('is-expanded');
					$(itemElem).find(".outer-img").hide();
					$(itemElem).find(".plus").hide();
					$(itemElem).find(".content").show();
				}

				setItemContentPixelSize(itemContent);

				// force redraw
				var redraw = itemContent.offsetWidth;
				// renable default transition
				itemContent.style[transitionProp] = '';

				addTransitionListener(itemContent);
				setItemContentTransitionSize(itemContent, itemElem);
			}
			$grid.masonry();
		});


		$(document).on("click", ".cross", function () {

			var id = $(this).attr("data-attr-id");
			var x2 = $(this).attr("data-attr-x2");
			var valueofoption = $(this).attr("data-attr-valueofoption");

			DeleteFilter(id, x2, valueofoption);

			INFORMA.Spinner.Show($('body'));
			var SegmentId = "", RegionId = "", ProductId = "";
			SegmentId = $("#Segments").attr("data-values");
			ProductId = $("#productType").attr("data-values");
			RegionId = $("#Topic").attr("data-values");

			var objData = {
				SegmentId: SegmentId,
				RegionId: RegionId,
				ProductId: ProductId
			};

			var obj = {
				data: JSON.stringify({
					SegmentId: SegmentId,
					RegionId: RegionId,
					ProductId: ProductId,
					CurrentPage: $('#CurrentPage').val()
				})
			}

			BindBrandsPartialView(Urls.BrandPortfolioSearch, "POST", obj, true);

		});

		$('#searchText').keyup(function (e) {
			if (e.keyCode == 13) {
				var brandId = $("section#brandportfolios");
				var obj = {
					data: JSON.stringify({
						SegmentId: "",
						RegionId: "",
						ProductId: "",
						SearchText: $('#searchText').val(),
						CurrentPage: $('#CurrentPage').val(),
					})
				}
				BindBrandsPartialView(Urls.BrandPortfolioSearch, "POST", obj, true);
			}
		});

		$(window).scroll(function () {

			var pageNumber = parseInt($('#PageNo').val());
			var pageSize = $('#PageSize').val();
			if (pageNumber < pageSize) {
				if ($(window).scrollTop() == ($(document).height() - $(window).height())) {

					var SegmentId = "", RegionId = "", ProductId = "";
					SegmentId = $("#Segments").attr("data-values");
					ProductId = $("#productType").attr("data-values");
					RegionId = $("#Topic").attr("data-values");

					var obj = {
						data: JSON.stringify({
							PageNo: pageNumber + 1,
							SearchText: $('#searchText').val(),
							SegmentId: SegmentId,
							RegionId: RegionId,
							ProductId: ProductId,
							CurrentPage: $('#CurrentPage').val()
						})
					}
					BindBrandsPartialView(Urls.BrandPortfolioSearch, "POST", obj, false);
				}
			}
		});
	};

    function BrandFilter(ddlObj) {
        //console.log(event.target.id);
        var valueofoption = $(ddlObj).text();
        var id = $(ddlObj).parents(".wrapper-dropdown-5").attr("id");
        var x2 = event.target.id;
        var index = $(ddlObj).index();
        //var x = '<div class="unit" id="' + id + '_' + x2 + '" data-attr="' + x2 + '"><label class="value">' + valueofoption + '</label> <label class="cross" onclick=DeleteFilter("' + id + '","' + x2 + '","' + valueofoption + '");>X</label></div>';
        var x = '<div class="unit" id="' + id + '_' + x2 + '" data-attr="' + x2 + '"><label class="value">' + valueofoption + '</label> <label data-attr-id="' + id + '" data-attr-x2="' + index + '" data-attr-valueofoption="' + x2 + '"  class="cross">X</label></div>';

        $(".section").append(x);
        $(ddlObj).addClass("disable");

        var x = $(ddlObj).parent().children("li.disable").length;
        if (x >= 1) {
            $(ddlObj).parents(".wrapper-dropdown-5").addClass("active-drop");
        }

        var total_len = $(ddlObj).parent().children("li").length;
        // alert(total_len);
        for (var i = 0; i < total_len - 1; i++) {
            var j = i + 1;
            var c = $("#" + id + " .dropdown li:nth-child(" + j + ")").hasClass("disable");
            //var lass = $("#" + id + " .dropdown li:nth-child(" + j + ")").text();
            var lass = x2;
            if (id == "Segments") {
                if (c) {
                    dd1_list[i] = lass;
                    $("#Segments").attr("data-values", dd1_list);
                }
            }
            if (id == "productType") {
                if (c) {
                    dd2_list[i] = lass;
                    $("#productType").attr("data-values", dd2_list);
                }
            }
            if (id == "Topic") {
                if (c) {
                    dd3_list[i] = lass;
                    $("#Topic").attr("data-values", dd3_list);
                }
            }
        }

        var length = $('.chosen-select-brand .dropdown > li.disable').length;
        if (length >= 1) {

            $(".filter-section").show();
            $(".filter-section .heading").text("active filters (" + length + ")");
        } else {
            $(".filter-section").hide();
        }

    }

	function LoadBrands() {
		var elementType = $(this).parents(".wrapper-dropdown-5").attr('name');
		var SegmentId = "", RegionId = "", ProductId = "";

		SegmentId = $("#Segments").attr("data-values");
		ProductId = $("#productType").attr("data-values");
		RegionId = $("#Topic").attr("data-values");

		var obj = {
			data: JSON.stringify({
				SegmentId: SegmentId,
				RegionId: RegionId,
				ProductId: ProductId,
				CurrentPage: $('#CurrentPage').val()
			})
		}
		BindBrandsPartialView(Urls.BrandPortfolioSearch, "POST", obj, true);
	}

	function BindBrandsPartialView(url, method, data, reset) {
		$.ajax({
			url: "/client/search/GetBrandPortfolioList",
			type: "POST",
			data: data,
			success: function (result) {
				//$("#brandportfolios").html();
				if (reset) {
					$("#brandportfolios .grid").html("");
				}
				INFORMA.Spinner.Hide();
				var $content = $($(result).find(".grid"));
				$grid.append($content).masonry('appended', $content);
				$grid.masonry();
				$('.section-content #PageNo').val($($(result).find("#PageNo")).val());
			},
			error: function (error) {
				alert(error)
			},
			complete: function (data) {
			}
		})
	}

	function setItemContentPixelSize(itemContent) {
		var previousContentSize = getSize(itemContent);
		// disable transition
		itemContent.style[transitionProp] = 'none';
		// set current size in pixels
		itemContent.style.width = previousContentSize.width + 'px';
		itemContent.style.height = previousContentSize.height + 'px';
	}

	function addTransitionListener(itemContent) {
		// reset 100%/100% sizing after transition end
		var onTransitionEnd = function () {
			itemContent.style.width = '';
			itemContent.style.height = '';
			itemContent.removeEventListener(transitionEndEvent, onTransitionEnd);
		};
		itemContent.addEventListener(transitionEndEvent, onTransitionEnd);
	}

	function setItemContentTransitionSize(itemContent, itemElem) {
		// set new size
		var size = getSize(itemElem);
		itemContent.style.width = size.width + 'px';
		if ($(itemElem).hasClass("is-expanded")) {
			itemContent.style.zIndex = '10';
		}
		else {
			itemContent.style.zIndex = '1';
		}
		itemContent.style.height = size.height + 'px';
	}

	function ResetAll() {
		$(".grid-item-content").each(function (index, element) {
			var itemContent = this;
			setItemContentPixelSize(itemContent);

			var itemElem = itemContent.parentNode;
			$(itemElem).removeClass('is-expanded');

			$(itemElem).find(".outer-img").show();
			$(itemElem).find(".plus").show();
			$(itemElem).find(".content").hide();

			// force redraw
			var redraw = itemContent.offsetWidth;
			// renable default transition
			itemContent.style[transitionProp] = '';

			addTransitionListener(itemContent);
			setItemContentTransitionSize(itemContent, itemElem);
		});
	}

	function DeleteFilter(id, index_val, li_value) {
		$("#" + id + " .dropdown > li.disable").each(function (index, element) {
			if ($(this).attr("id") == li_value) {
				$(this).removeClass("disable");
			}
		});

		$("#" + id + "_" + li_value).remove();
		//var length = $('#'+id+' > option:disabled').length;
		var total_len1 = $("#" + id + " .dropdown li.disable").length;
		if (total_len1 <= 0) {

			$("#" + id).removeClass("active-drop");
		}

		if (id == "Segments") {
			delete dd1_list[index_val];
			$("#" + id).attr("data-values", dd1_list);
		}
		if (id == "productType") {
			delete dd2_list[index_val];
			$("#" + id).attr("data-values", dd2_list);
		}
		if (id == "Topic") {
			delete dd3_list[index_val];
			$("#" + id).attr("data-values", dd3_list);
		}

		var length = $('.chosen-select-brand .dropdown > li.disable').length;
		if (length >= 1) {

			$(".filter-section").show();
			$(".filter-section .heading").text("active filters (" + length + ")");
		} else {
			$(".filter-section").hide();
		}
	}

	/*drop down*/
	function DropDown(el) {
		this.dd = el;
		this.initEvents();
	}


	DropDown.prototype = {
		initEvents: function () {
			var obj = this;

			obj.dd.on('click', function (event) {
				$(this).parents(".select").siblings(".select").children(".wrapper-dropdown-5").removeClass("active");
				$(this).toggleClass('active');

				event.stopPropagation();
			});
		}
	}

	$(function () {
		var dd = new DropDown($('.wrapper-dropdown-5'));
		$(document).click(function () {
			// all dropdowns
			$('.wrapper-dropdown-5').removeClass('active');
		});
	});



	return {
		init: init
	};
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.BrandPortfolioViews.init());