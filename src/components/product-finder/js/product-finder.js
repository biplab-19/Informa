/*
 * analyst-list.js
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
        SubSectorList = $(".sector-search .sub-sector-list"),
        SubmitBtn = $(".product-finder li.button"),
        CustomSelect = $(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchIcon = $(".navbar-default .search a"),
        SearchPage = $("#search-page"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,

        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSearch,
        ToggleProductFinder, RenderSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler, BindAjaxHandler;

        ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
                ProductFinderSection.slideDown("slow");
            });
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
        RenderSearchResult = function(data, SearchType) {
            INFORMA.SearchResults.RenderSearchResults(data,SearchType);
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, SearchType);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data, SearchType);
                    }
                }
            });
        },
        SubmitHandler = function(SearchType) {
            SubmitBtn.on("click", ".btn", function(e) {
                e.preventDefault();
                var FieldArray = ProductFinderSection.find("form").serializeArray(),
                    GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
                INFORMA.Spinner.Show($("body"));
                GetAjaxData(Urls[SearchType], "Post", GetSerializeData, RenderSearchResult, null, SearchType);
            });
        },
        BindAjaxHandler = function() {

            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (SearchPage.data("search") === true) ? true : false;

            if (IsProductPage) {
                SubmitHandler("ProductSearch");
            }
            if (IsSearchPage) {
                SubmitHandler("SearchResult");
            }
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
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSearch(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {

            var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join("&");
            SectorIDs = 'SectorIDs='+SectorIDs;
            GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null);
        },
        BindDropDown = function() {
            var SectorList = [];
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
                    if ($(option).parent().hasClass("sector-list") === true) {
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
        UpdateSubSectorDropdown: UpdateSubSectorDropdown
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
