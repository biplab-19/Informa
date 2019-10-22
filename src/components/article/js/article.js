var INFORMA = window.INFORMA || {};
INFORMA.articletech = (function (window, $, namespace) {
    'use strict';
    var ArticleSearch = "",
        segmentContainerId = "Segments",
        searchInputCross = "SearchInput",
        docElem = document.documentElement,
        transitionProp = typeof docElem.style.transition == 'string' ? 'transition' : 'WebkitTransition',
        transitionEndEvent = {
            WebkitTransition: 'webkitTransitionEnd',
            transition: 'transitionend'
        }[transitionProp],
        showmoredispcount = 0,
        hasClassSelected = $(this).hasClass("allSelected"),
        init,
        _InitDropdownSelectEvent,
        _ArticleFilter,
        _updateSegmentSelection,
        _showClearOption,
        _checkSearchBoxHasValue,
        _removeSearchTextBreadcrumb,
        _GetSelectedSegment,
        _LoadArticleListdata,
        _BindArticlesPartialView,
        _GetSelectedBrands,
        _updateBrandSelection,
        _addBreadcrumbSelectedFilter,
        _updateArticleFilterBreadcrumb,
        _updateSearchTextBreadcrumb,
        _showMessage,
        _DeleteFilter,
        _setArticleFilterSelectedMessage,
        jsonSegmentObj,
        segmentObj,
        segmentId,
        SegmentAndSubSegment,
        jsonBrandObj,
        brandsObj,
        BrandsId,
        checkSearchBoxHasValue,
        id,
        subsegmentId,
        isAjaxCalled,
        SubSegments,
        _ToggleArticleList,
        x2;
    document.addEventListener('readystatechange', function (event) {
        if (event.target.readyState === 'complete') {
            $(".grid-item").addClass("grid-show");
        }
    });
    $(function () {
        _InitDropdownSelectEvent();
        _ToggleArticleList();
        //INFORMA.Spinner.Show($('body'));
        //if query string
        $(document).ready(function () {
            //check query string if set
            var urlParam = window.location.href.split("?");
            if (urlParam.length > 1) {
                //check querystring
                //set selected segment and subsegment items in dropdowns
                var segmentArray = _GetSelectedSegment();
                $.each(segmentArray, function (index, jsonObject) {
                    if (jsonObject.Segment != null) {
                        $("#" + jsonObject.Segment + " p").eq(0).addClass("selected");

                        //set parent checked if in querystring
                        $("#" + jsonObject.Segment).find(".input-checkbox").eq(0).prop("checked", true);

                        if (jsonObject.SubSegment != null) {

                            var subsegmentCount = $("#" + jsonObject.Segment).find(".sub-seg-mob li").not(".selectall").length;
                            var subSegmentSelectedCount = jsonObject.SubSegment.length;

                            $.each(jsonObject.SubSegment, function (key, subsegmentId) {
                                $("#" + subsegmentId).find("p").addClass("selected");

                                //set subsegment checked if parent or same item in query string
                                $("#" + subsegmentId).find(".input-checkbox").prop("checked", true);
                            });

                            if (subsegmentCount == subSegmentSelectedCount) {
                                $(".selectall .input-checkbox").prop("checked", true);
                            }
                        }
                    }
                });

                var brandsLine = _GetSelectedBrands();
                if (brandsLine != null) {
                    var pbrandsArray = brandsLine.split(",")
                    for (var i = 0; i < productLineArray.length - 1; i++) {
                        if ($("#" + pbrandsArray[i]) != null) {
                            $("#" + pbrandsArray[i]).find("p").addClass("selected");

                            //set subsegment checked if parent or same item in query string
                            $("#" + pbrandsArray[i]).find(".input-checkbox").prop("checked", true);
                        }
                    }
                }

                _updateArticleFilterBreadcrumb();
                _setArticleFilterSelectedMessage();
            }
        });
    });
    $(document).ready(function () {
        $(document).on("click", ".menu a", function () {
            var SiblingMenu = $(this).parent(".menu").siblings(".menu"),
                ChildSpan = $(this).children("span");

            SiblingMenu.removeClass("active");
            SiblingMenu.children(".dropdown-content").removeClass("drop-content-active");
            SiblingMenu.children("a").children("span").removeClass('triangle-down');
            SiblingMenu.children("a").children("span").addClass('triangle-right');
            $(this).parent().toggleClass('active');
            $(this).siblings(".dropdown-content").toggleClass('drop-content-active');
            if ($(this).parent().hasClass('active')) {
                ChildSpan.removeClass('triangle-right');
                ChildSpan.addClass('triangle-down');
            }
            else {
                ChildSpan.addClass('triangle-right');
                ChildSpan.removeClass('triangle-down');
            }
        });
        $(".article-list-filter #closeFilterBtn").on("click", function () {
            var $articleList = $('.article-list-filter'),
                $body = $('body')
            $articleList.removeClass('active');
            $("#showArticleFiltersBtn").text('Select filters');
            $body.css('overflow-y', '');
        });
        $("#showArticleFiltersBtn").on("click", function () {
            var $articleList = $('.article-list-filter'),
                $body = $('body')
            $articleList.toggleClass('active');
            if ($articleList.hasClass('active')) {
                $(this).text('Search');
                $body.css('overflow-y', 'hidden');
            } else {
                $(this).text('Select filters');
                $body.css('overflow-y', '');
            }
        });
        $('.segmanet-head, .sub-segment').click(function () {
            $(this).siblings('label').children('input').trigger('change');
        })
        $('.segmanet-head-mob').on("click", function () {
            if ($(this).children().hasClass('sub-seg-mob')) {
                $(this).find('.sub-seg-mob').toggleClass('active-slide');
            }

            if ($(this).children('span').hasClass('triangle-right')) {
                $(this).children('span').removeClass("triangle-right");
                $(this).children('span').addClass("triangle-down");
            } else {
                $(this).children('span').removeClass("triangle-down");
                $(this).children('span').addClass("triangle-right");
            }
        });
        $(document).on("click", ".active-slide .selectall", function () {

            if (hasClassSelected) {
                $(this).siblings("li").children("label").children('input[type=checkbox]').prop("checked", false);
                $(this).removeClass("allSelected");
            }
            else {
                $(this).siblings("li").children("label").children('input[type=checkbox]').prop("checked", true);
                $(this).addClass("allSelected");
            }
        });
        $(".drop-options li").each(function () {
            var classsub = $(this).children("ul").hasClass("sub-seg-mob");

            if (!classsub) {
                $(this).children("span").addClass("de-active");
                $(this).children("label").addClass("active");
            }
        });

    });
    $(document).on("click", ".clearAllArticlesFilters", function () {
        window.location = window.location.href.split("?")[0];
    });
    $(document).on("click", ".article-cross", function () {
        var id = $(this).attr("data-attr-id");
        var valueofoption = $(this).attr("data-attr-valueofoption");
        _DeleteFilter(id, valueofoption);
        $("#" + valueofoption + " input").prop("checked", false);

        if (id == "Segments" || id == "SubSegments")//update selected attribute for segment and subsegment
        {
            //remove class from child
            if (id == "Segments") {
                $("#" + valueofoption + " .sub-seg-mob li").find("p").each(function () {
                    //$(this).removeClass("selected");
                    subsegmentId = $(this).parent().attr("id");
                    _DeleteFilter("SubSegments", subsegmentId);
                });
            }
            _updateSegmentSelection("Segments");
        }

        if (id == "articlebrands")//update selected attribute for brands
            _updateBrandSelection(id);

        INFORMA.Spinner.Show($('body'));
        var pageNumber = parseInt($('#filterpageno').val());
        var pageSize = $('#filterpagesize').val();
        var showless = $('#showless').val();
        if (pageNumber == "1") {
            pageNumber = 1;
        }
        else {
            pageNumber = pageNumber;
        }
        if (showless == 'true') {
            showmoredispcount = pageNumber - 1;
        }
        else {
            showmoredispcount = pageNumber + 1;
        }
        INFORMA.Spinner.Show($('body'));
        var obj = {
            data: JSON.stringify({
                SegmentAndSubSegments: _GetSelectedSegment(),
                BrandID: _GetSelectedBrands(),
                SearchText: $('#searchText').val(),
                CurrentPage: $('#CurrentPage').val(),
                ProductLineId: $('#productlinepre').val(),
                MaxItemCount: $('#maxitemcount').val(),
                PageNo: showmoredispcount,
            })
        }
        isAjaxCalled = false;
        _BindArticlesPartialView(ArticleSearch, "POST", obj, true);
    });
    _BindArticlesPartialView=function(url, method, data, reset) {
        $.ajax({
            url: "/client/search/GetFilteredArticlesList",
            type: "POST",
            data: data,
            success: function (result) {
               
                if (reset) {
                    $("#article-list").empty();
                }
               
                if ($($(result).find(".artical-list-outer > .artcl-list")).length) {            
                   
                    $("#article-list").html("");
                    $("#article-list").html($(result).find("#article-list"));                
                    return;
                }
                INFORMA.Spinner.Hide();
               
    
            },
            error: function (error) {
                INFORMA.Spinner.Hide();
            },
            complete: function (data) {
               
                setTimeout(function () { INFORMA.Spinner.Hide(); }, 1000);
            }
        })
        
    
    }
    _LoadArticleListdata=function () {
        var elementType = $(this).parents(".wrapper-dropdown-1").attr('name');
        var pageNumber = parseInt($('#filterpageno').val()) + 1;
        var pageSize = $('#filterpagesize').val(); 
        if (pageNumber == "1") {
        pageNumber = 1;
        }
        else {
        pageNumber = pageNumber;
        }
        
        var obj = {
        data: JSON.stringify({
        SegmentAndSubSegments: _GetSelectedSegment(),
        BrandID: _GetSelectedBrands(),
        SearchText: $('#searchText').val(),
        CurrentPage: $('#CurrentPage').val(),
        ProductLineId: $('#productlinepre').val(), 
        PageNo: pageNumber,
        })
        }
        $('#filterpageno').val(pageNumber);
        _BindArticlesPartialView(ArticleSearch, "POST", obj, true);
        }
    $(document).on("click", "#articlelistshowmore", function () {
        _LoadArticleListdata();
        _ToggleArticleList();
    });
    _ToggleArticleList = function () {
        var totalresult = parseInt($('#totalresultcount').val());
        var tolalpagesize = parseInt($('#PageNo').val());
        var totalpageno = parseInt($('#filterpageno').val());
        if (totalresult < (tolalpagesize * totalpageno)) {
            $('#articlelistshowmore').addClass('hide-article');
        }
        else {

            $('#articlelistshowmore').removeClass('hide-article');
        }
    }
    _InitDropdownSelectEvent = function () {

        $(".drop-options .input-checkbox").change(function () {
            var obj = $(this).parent().next();
            var liSelectAll = $(this).parent(".round-checkbox").parent();
            if (this.checked) {

                var hasChild;

                if ($(liSelectAll).hasClass("selectall")) {
                    var parent = $(this).parent(".round-checkbox").parent().attr("parentsegmentid");
                    var obj = $("#" + parent).find(".segmanet-head").eq(0);
                    hasChild = $(obj).parent().children(".round-checkbox").siblings("ul").hasClass("sub-seg-mob");

                    if (hasChild) {
                        $(obj).parent().children("ul").children("li").not(".selectall").children("label").children('input[type=checkbox]').prop("checked", true);
                        $(obj).parent().children("ul").children("li").not(".selectall").children("p").addClass("selected");
                    }

                }
                else {
                    hasChild = $(this).parent(".round-checkbox").siblings("ul").hasClass("sub-seg-mob");
                    if (hasChild) {
                        $(this).parent(".round-checkbox").siblings("ul").children("li").not(".selectall").children("label").children('input[type=checkbox]').prop("checked", true);
                        $(this).parent(".round-checkbox").siblings("ul").children("li").not(".selectall").children("p").addClass("selected");
                    }
                    else {
                        //set parent true if parent not selected
                        var parent = obj.parent().attr("parentsegmentid");
                        $("#" + parent + " p").eq(0).addClass("selected");
                        $("#" + parent).find(".input-checkbox").eq(0).prop("checked", true);
                    }
                }
                _ArticleFilter(obj);
                _LoadArticleListdata();
            }
            else {

                if ($(liSelectAll).hasClass("selectall")) {
                    var parent = $(this).parent(".round-checkbox").parent().attr("parentsegmentid");
                    obj = $("#" + parent).find(".segmanet-head").eq(0);

                    if ($(obj).hasClass("segmanet-head")) {
                        id = $(obj).parents(".wrapper-dropdown-1").attr("id");
                    }
                    else if ($(obj).hasClass("sub-segment")) {
                        id = "SubSegments";
                    }
                    x2 = $(obj).parent().attr("id");
                    $("#" + id + "_" + x2).find(".article-cross").click();

                    //remove class from child
                    if (id == "Segments") {
                        $("#" + x2 + " input").find("p").each(function () {
                            $(this).removeClass("selected");
                        });
                    }
                }
                else {
                    // delete filter and load results
                    if ($(obj).hasClass("segmanet-head")) {
                        id = $(obj).parents(".wrapper-dropdown-1").attr("id");
                    }
                    else if ($(obj).hasClass("sub-segment")) {
                        id = "SubSegments";
                    }
                    else if ($(obj).hasClass("single-level-dropdown")) {
                        id = $(obj).parents(".wrapper-dropdown-1").attr("id");
                    }
                    x2 = $(obj).parent().attr("id");
                    $("#" + id + "_" + x2).find(".article-cross").click();

                    //remove class from child
                    if (id == "Segments") {
                        var segs = JSON.parse($('#' + id).attr('data-value-segment-and-subsegment'));
                        if (segs.length > 0) {

                            for (var i = 0; i < segs.length; i++) {
                                if (segs[i].Segment == x2) {
                                    segs.remove(segs[i]);
                                    break;

                                }
                            }

                            $('#' + id).attr('data-value-segment-and-subsegment', JSON.stringify(segs));
                        }

                        $("#" + x2 + " input").attr('checked', false);
                    }

                    if (id == "articlebrands") {

                        var brands = $('#' + id).attr('data-value-brands').split(',')
                        var selectedbrands = "";
                        if (brands.length > 0) {

                            for (var i = 0; i < brands.length; i++) {
                                if (brands[i] == x2) {
                                    $('#' + id).find("p").removeClass("selected")
                                    brands.remove(brands[i]);
                                    break;
                                }
                            }
                            $('#' + id).attr('data-value-brands', brands);
                            _LoadArticleListdata();
                        }

                        $("#" + x2 + " input").attr('checked', false);
                    }
                }
            }
            _updateArticleFilterBreadcrumb();
            _setArticleFilterSelectedMessage();
        });
    }
    _ArticleFilter = function (objSelection) {
        if (objSelection == searchInputCross) {
            _updateSearchTextBreadcrumb();
        }
        else {
            var id = "";
            var x2 = "";
            var index = 0;
            var value = $(objSelection).text();
            if ($(objSelection).hasClass("segmanet-head")) {
                id = $(objSelection).parents(".wrapper-dropdown-1").attr("id");//root parent
            }
            else if ($(objSelection).hasClass("sub-segment")) {
                id = "SubSegments";
            }
            else if ($(objSelection).hasClass("single-level-dropdown")) {
                id = $(objSelection).parents(".wrapper-dropdown-1").attr("id");
            }
            x2 = $(objSelection).parent().attr("id");
            index = $(objSelection).parent().attr("attr-index");

            //segment and subsegment
            if (id == segmentContainerId || id == "SubSegments") {
                $(objSelection).addClass("selected");
                id = segmentContainerId;
                _updateSegmentSelection(id);
            }

            //brands
            if (id == "articlebrands") {
                $(objSelection).addClass("selected");
                _updateBrandSelection(id);
            }
        }
        // setArticleFilterSelectedMessage();
    }
    _updateSegmentSelection = function (id) {

        jsonSegmentObj = [];
        $("#" + id + " .drop-options .segmanet-head-mob").each(function () {
            segmentObj = this;
            var pTag = $(this).find(".segmanet-head");
            var parentSelected = $(segmentObj).find("p.segmanet-head").hasClass("selected");
            var subsegment = $(segmentObj).find(".sub-seg-mob li").not(".selectall");
            SegmentAndSubSegment = {};
            segmentId = $(segmentObj).attr("id");
            if (parentSelected) {
                SegmentAndSubSegment["Segment"] = segmentId;

                //$(pTag).addClass("selected");
            }
            var subSegmentSelectedCount = 0;
            if (subsegment.length != null) {
                SubSegments = {};
                var subsegmentArray = [];
                $(subsegment).find("p").each(function () {
                    var subsegmentSelected = $(this).hasClass("selected");
                    if (subsegmentSelected) {
                        subsegmentArray.push($(this).parent().attr("id"));
                        subSegmentSelectedCount++;
                    }
                })
                if (subSegmentSelectedCount > 0) {
                    SegmentAndSubSegment["Segment"] = segmentId;
                    SegmentAndSubSegment["SubSegment"] = subsegmentArray;
                }
                else if (parentSelected) {
                    //if only parent segment selected and no sub-segments selected
                    // find all sub-segment
                    subsegmentArray = [];
                    $(subsegment).each(function () {
                        subsegmentArray.push($(this).attr("id"));
                    });
                    if (subsegmentArray.length > 0) {
                        SegmentAndSubSegment["SubSegment"] = subsegmentArray;
                    } else {
                        SegmentAndSubSegment["SubSegment"] = null;
                    }
                }
            }
            if (subSegmentSelectedCount > 0 || parentSelected) {
                jsonSegmentObj.push(SegmentAndSubSegment);
            }

        });
        if (jsonSegmentObj.length == 0)
            $("#" + segmentContainerId).attr("data-value-segment-and-subsegment", "");
        else
            $("#" + segmentContainerId).attr("data-value-segment-and-subsegment", JSON.stringify(jsonSegmentObj));
    }
    _checkSearchBoxHasValue = function () {
        var searchTextValue = $('#searchText').val();
        if (searchTextValue != "" && searchTextValue != "View Search") {
            return true;
        }
        return false
    }
    _GetSelectedSegment = function () {

        var segmentAndSubSegments = $("#" + segmentContainerId).attr("data-value-segment-and-subsegment");
        if (segmentAndSubSegments != null && segmentAndSubSegments != "")
            return JSON.parse(segmentAndSubSegments)
        else
            return null;
    }
    _GetSelectedBrands = function () {
        var brands = $("#articlebrands").attr("data-value-brands");
        if (brands != null && brands != "")
            return brands;
        else
            return null;
    }
    _updateBrandSelection = function (id) {
        jsonBrandObj = [];
        $("#" + id + " .drop-options .brands-item").each(function () {
            brandsObj = this;
            var brandsitem = $(brandsObj).find("p").hasClass("selected");
            BrandsId = $(brandsObj).attr("id");
            if (brandsitem) {
                jsonBrandObj.push(BrandsId)
            }
        });
        if (jsonBrandObj.length == 0)
            $("#" + id).attr("data-value-brands", "");
        else
            $("#" + id).attr("data-value-brands", jsonBrandObj);


    }
    _addBreadcrumbSelectedFilter = function (id, x2, value, index, renderhidden) {
        var x;
        if (renderhidden)
            x = '<div class="unit articlelist-hidden-filter" style="display:none;" id="' + id + '_' + x2 + '" data-attr="' + x2 + '"><label class="value">' + value + '</label> <label data-attr-id="' + id + '" data-attr-x2="' + index + '" data-attr-valueofoption="' + x2 + '"  class="cross">X</label></div>';
        else
            x = '<div class="unit" id="' + id + '_' + x2 + '" data-attr="' + x2 + '"><label class="value">' + value + '</label> <label data-attr-id="' + id + '" data-attr-x2="' + index + '" data-attr-valueofoption="' + x2 + '"  class="article-cross">X</label></div>';
        $(".section").append(x);
    }
    _updateArticleFilterBreadcrumb = function () {
        $(".section").empty();
        if (_showClearOption()) {
            var x = '<div class="unit clearAllArticlesFilters hideclass"><label class="value">Clear All Filters</label><label style="margin:0 10px;cursor:pointer">X</label></div>';
            $(".section").append(x);
        }

        $("#Segments .drop-options .segmanet-head-mob").each(function () {
            segmentObj = this;
            var pTag = $(this).find(".segmanet-head");
            var parentSelected = $(this).find("p").hasClass("selected");
            var subsegment = $(segmentObj).find(".sub-seg-mob li").not(".selectall");
            if ($(subsegment).hasClass("selectall")) {
                //nothing will do
            }
            else {
                segmentId = $(segmentObj).attr("id");
                if (parentSelected) {
                    /*logic to add breadcrumb for segment*/
                    var segmentText = $(pTag).text();
                    var index = $(segmentObj).attr("attr-index")

                    var aresubsegment = $("#" + segmentId).find(".sub-seg-mob li").not(".selectall").find("p").hasClass("selected");
                    var subSegmentSelectedCount = $("#" + segmentId).find(".sub-seg-mob li").not(".selectall").length;
                    if (!aresubsegment && subSegmentSelectedCount == 0)
                        _addBreadcrumbSelectedFilter("Segments", segmentId, segmentText, index);
                    else
                        _addBreadcrumbSelectedFilter("Segments", segmentId, segmentText, index, true);
                }
                var subSegmentSelectedCount = 0;
                if (subsegment.length != null) {
                    $(subsegment).find("p").each(function () {
                        var subsegmentSelected = $(this).hasClass("selected");
                        if (subsegmentSelected) {
                            subSegmentSelectedCount++;
                            subsegmentId = $(this).parent().attr("id");
                            /*logic to add breadcrumb for sub-segment*/
                            var subsegmentText = $(this).text();
                            var index = $(this).parent().attr("attr-index");
                            _addBreadcrumbSelectedFilter("SubSegments", subsegmentId, subsegmentText, index);
                        }
                    })
                }
            }
        });

        $("#articlebrands .drop-options li").each(function () {
            var pTag = $(this).find(".single-level-dropdown");
            var isSelected = $(this).find("p").hasClass("selected");
            var brandId = $(this).attr("id");
            if (isSelected) {
                /*logic to add breadcrumb for product*/
                var text = $(pTag).text();
                var index = $(this).attr("attr-index")
                _addBreadcrumbSelectedFilter("articlebrands", brandId, text, index);
            }
        });

        _updateSearchTextBreadcrumb();
    }
    _removeSearchTextBreadcrumb = function () {
        if ($("#SearchInput").length > 0) {
            $("#SearchInput").remove();
        }
    }
    _updateSearchTextBreadcrumb = function () {
        var input = $.trim($("#searchText").val());
        if (input != "") {
            _removeSearchTextBreadcrumb();
            var x = '<div class="unit" id="SearchInput"><label class="value">' + input + '</label> <label data-attr-id="SearchInput" class="article-cross">X</label></div>';
            $(".section").append(x);
        }
        else {
            _removeSearchTextBreadcrumb();
        }
    }
    _showMessage = function (isShow) {
        if (isShow)
            $(".no-records").show();
        else
            $(".no-records").hide();
    }
    _DeleteFilter = function (id, li_value) {
        if (id == searchInputCross) {
            //search text box selection
            $("#" + id).remove();
            $("#searchText").val("");
        }
        else {
            $("#" + li_value + " p").removeClass("selected");
            $("#" + id + "_" + li_value).remove();

            if ("Segments" == id || "SubSegments" == id) {
                //code only for segment and subsegment dropdown
                //remove parent selector if sub-segment un-selected
                var parent = $("#" + li_value).attr("parentSegmentId");
                var aresubSegmentSelected = $("#" + parent).find(".sub-seg-mob li").not(".selectall").find("p").hasClass("selected");
                var subsegmentCount = $("#" + parent).find(".sub-seg-mob li").not(".selectall").length;
                if (!aresubSegmentSelected) {
                    if (subsegmentCount > 0) {
                        $("#" + parent + " p").removeClass("selected");
                        $("#Segments_" + parent).remove();
                        $("#" + parent + " .round-checkbox").find('input[type=checkbox]').prop("checked", false);
                    }
                }
            }

        }
        _setArticleFilterSelectedMessage();

    }
    _showClearOption = function () {
        var length = $('.drop-options p.selected').length;
        var result = _checkSearchBoxHasValue();
        if (result)
            length++;
        if (length >= 1)
            return true;
        else
            return false;
    }
    _setArticleFilterSelectedMessage = function () {
        var length = $('.drop-options p.selected').length;
        var hidenfilterCount = $(".articlelist-hidden-filter").length;
        var result = _checkSearchBoxHasValue();
        if (result)
            length++;

        if (hidenfilterCount > 0) {
            length = length - hidenfilterCount;
        }

        if (length > 1) {
            $(".filter-section .heading").show();
            $(".filter-section .heading").text("active filters (" + (length - 1) + ")");
            $(".clearAllArticlesFilters").removeClass("hide-clear-filter")
        } else {
            $(".filter-section .heading").hide();
            $(".clearAllArticlesFilters").addClass("hide-clear-filter")
        }
    }
    init = function () {
            if ($('#articlesection').length == 0)
                return;
            _InitDropdownSelectEvent(),
            _ArticleFilter(),
            _updateSegmentSelection(),
            _showClearOption(),
            _checkSearchBoxHasValue(),
            _removeSearchTextBreadcrumb(),
            _GetSelectedSegment(),
            _GetSelectedBrands(),
            _updateBrandSelection(),
            _addBreadcrumbSelectedFilter(),
            _updateArticleFilterBreadcrumb(),
            _updateSearchTextBreadcrumb(),
            _showMessage(),
            _DeleteFilter(),
            _setArticleFilterSelectedMessage(),
            _ToggleArticleList();




    };
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.articletech.init());