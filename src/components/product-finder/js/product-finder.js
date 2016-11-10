/*
 * Product Finder
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
        SubSectorList = $(".sector-search .SubSector"),
        SubmitBtn = $(".sector-search li.button"),
        CustomSelect = ProductFinderSection.find(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchField = $(".site-search input"),
        ResultContainer = $(".search-container #results"),
        SearchTabHidden = $(".site-search input.search-tab"),
        SearchSubmitBtn = $(".site-search li.button"),
        //SearchIcon = $(".navbar-default .search a"),
        SearchIcon = $(".search:visible"),
        SearchPage = $("#search-page"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,

        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSearch, GetProductFinderData,
        ToggleProductFinder, ToggleSearch, RenderSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler, BindAjaxHandler,MergeJsonData;

        ToggleSearch = function(){
            var NavClose =$("#sub-nav .subnav-close a");
            ProductFinderSection.slideDown("slow");
                if(NavClose){
                    NavClose.trigger("click");
                }
                if($(".mainNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
                if($(".mobileNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
        },
        ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                SearchIcon.toggleClass("inactive");
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
                if($("#product-finder-section:hidden").length){
                    SearchIcon.toggleClass( "inactive" );
                    ToggleSearch();
                }else{
                    SearchIcon.toggleClass( "active" );
                    ToggleSearch();
                }
            });
        },
        MergeJsonData = function(Json1, Json2,Json3,Json4){
            var Data = {};
            $.extend(Data, Json1,Json2,Json3,Json4);
            return Data;
        },
        GetProductFinderData = function(){
            var FieldArray = ProductFinderSection.find("form").serializeArray(),
                Data = INFORMA.Utils.serializeObject(FieldArray);
            return Data;
        },
        UpdateSubSectorDropdown = function(data) {
            if (data.SubSectors.length > 0) {
                var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                    html = ListTemplate({ SubSectors: data.SubSectors });


                $(".sector-search li").removeClass("disabled");
                SubSectorList.removeAttr("disabled")
                    .removeProp("disabled")
                    .html(html);
                SubSectorList.multiselect('rebuild');
            }
        },
        RenderSearchResult = function(data,type) {
            INFORMA.SearchResults.RenderSearchResults(data);
            //Update url with update search text value
            if(type === "SearchResult") { 
                var SearchValue = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
                if (history.pushState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText='+SearchValue;
                    window.history.pushState({path:newurl},'',newurl);
                }
            }
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        SubmitHandler = function(btn,SearchType) {
            btn.off().on("click", function(e) {
                e.preventDefault();
                INFORMA.Spinner.Show($("body"));
                if($('#hdnSearchType')) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                var ProductData = GetProductFinderData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = INFORMA.SearchResults.DefaultParameters(),
                    Data = MergeJsonData(ProductData,FilterData,DefaultData);

                if(SearchType === "ProductSearch") {
                    Data.IsProduct = true;
                }
                if(SearchType === "SearchResult") { 
                    Data.IsSearch = true;
                    Data.PageNo = 1;
                    Data.CurrentPage = $(".search-container").data("currentpage");
                }
                GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), function(data){RenderSearchResult(data,SearchType)}, null);
                INFORMA.SearchResults.ResetPaging();
            });
        },
        BindAjaxHandler = function() {

            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SubmitHandler(SubmitBtn,"ProductSearch");
            }
            if (IsSearchPage) {
                SubmitHandler(SearchSubmitBtn,"SearchResult");
            }
            SearchField.on("keyup",function(e){
                var MaxLength = $(this).data('length');
                if($(this).val().length >= MaxLength){
                    SearchSubmitBtn.removeClass("disabled");
                }
                else{
                    SearchSubmitBtn.addClass("disabled");
                }
            });
            $(".product-finder form").on("keydown",function(e){
                var SearchTextField = $(".site-search input[name=SearchText]"),
                    SiteSearchRadio = ProductFinderSection.find("input[type=radio][data-show='site-search']:checked"),
                    ViewPort = INFORMA.global.device.viewportN;
                    if (e.keyCode === 13 || e.which===13) {

                         if(ViewPort===1|| ViewPort===2){
                            SearchTextField.trigger("blur");
                            document.activeElement.blur();
                        }
                        if((SearchTextField.val().length >= SearchTextField.data('length')) && (SiteSearchRadio)){
                            var SearchSbmtBtn = $('button[data-submit="site-search"]').parent();
                            if(!SearchSbmtBtn.hasClass('disabled')) {
                                SearchTextField.parents('.site-search').find('button[data-submit="site-search"]').trigger('click');
                            }
                            return false;
                        }else{
                            var ProductSbmtBtn = $("button[data-submit='sector-search']").parent();
                            if(!ProductSbmtBtn.hasClass('disabled')) {
                                return true;
                            }
                            return false;
                        }
                    }
            });
        },
        ShowHideSearch = function(ele) {
            var ShowOption = $(ele).data('show');
            $("ul.searchToggle").addClass('hidden');
            ProductFinderSection.find("ul." + ShowOption).removeClass("hidden").fadeIn("slow");
        },
        ToggleSearchOption = function() {
            ToggleProductFinder();
            jQuery(".search-options input[type=radio]").on('change', function(e) {
                e.preventDefault();
                ShowHideSearch($(this));
            });
            jQuery(".search-options input[type=radio]").on('focus', function(e) {
                e.preventDefault();
                $(this).parent().addClass("active");
            });
            jQuery(".search-options input[type=radio]").on('focusout', function(e) {
                e.preventDefault();
               	$(this).parent().removeClass("active");
            });
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSearch(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {
            var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
                SectorIDs = 'SectorIDs='+SectorIDs;

            GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null);
        },
        BindDropDown = function() {
        	var IsSectorExist = $("input.sector-list").val(),
            	SectorList = (IsSectorExist) ? IsSectorExist.split(',') : [];

            CustomSelect.val("");
            CustomSelect.multiselect({
                maxHeight: 200,
                buttonText: function(o, s) {

                    if (o.length === 0) {
                        return $(s).data('placeholder');
                    } else {
                        var labels = 1;
                        o.each(function(i) {
                            labels = parseInt(1 + i);
                        });
                        return labels + ' Selected';
                    }
                },
                onChange: function(option, checked, select) {
                    if ($(option).parent().hasClass("Sector") === true) {
                        if (checked) {
                            SectorList.push($(option).val());
                        } else {
                            var index = SectorList.indexOf($(option).val());
                            if (index >= 0) {
                                SectorList.splice(index, 1);
                            }
                            SubSectorList.parents("li").eq(0).addClass("disabled");
                            SubSectorList.attr("disabled", "disabled");
                            SubSectorList.val('');
                            SubSectorList.multiselect('rebuild');
                            SubmitBtn.addClass("disabled");
                            $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                        }
                        if (SectorList.length > 0) {
                            GetSubSectorList(SectorList);
                        }
                    }
                }
            });
        };
    init = function() {

        if (ProductFinderSection.length > 0) {
            BindDropDown();
            ToggleSearchOption();
            BindAjaxHandler();
        }
    };

    return {
        init: init,
        UpdateSubSectorDropdown: UpdateSubSectorDropdown,
        GetProductData : GetProductFinderData,
        GetSubSectorList: GetSubSectorList,
        MergeData :MergeJsonData
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());