/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResultFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        FilterList = $(".search-filter .filter-list"),
        SearchFilter = $(".search-container .search-filter"),
        SearchDropDown = $(".sector-search select"),
        SubSecDropDown = $(".sector-search select.sub-sector-list"),
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SubmitBtn = $(".product-finder .sector-search li.button"),
         ProductFinder = $('#product-finder-section'),
        RefineList = $(".search-container .refine-result"), SearchType ='',
        // methods
        init, ReturnAllSelectVal, GetFilterData, ClearAllFilter, BindRefineEvents, MakeRefineSelected,
        MakeDropUnSelected, BindFilterEvents, UpdateSearchResult, RemoveFilter, GetRefineData;

        RemoveFilter = function(item, parent) {
            item.fadeOut("fast", function() {
                item.remove();
                var FilterLength = parent.find("li").size(),
                    NoFilter = FilterList.find("li"),
                    FilterData = GetFilterData(FilterList);
                if (FilterLength < 1) {
                    parent.parent('div').hide();
                }
                if (!NoFilter.length) {
                    SearchFilter.slideUp();
                }
                UpdateSearchResult(FilterData);
            });
        },
        MakeRefineSelected = function(FilterContainer) {
            var Filters = FilterContainer.find("ul"),
                RefineItems = RefineList.find("li input"),
                FilterData = {},
                FilterValue = [];

            $.each(Filters, function() {
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem = $(this).find("li a");
                $.each(ListItem, function() {
                    if (FilterID !== "sectors" && FilterID !== "subsectors" || (SearchType === "SearchResult")) {
                        FilterValue.push($(this).data("value"));
                    }
                });
            });
            $.each(RefineItems, function(i, v) {
                if (($.inArray($(this).data("value"), FilterValue)) > -1) {
                    $(this).parent().trigger("click");
                }
            });
        },
        ClearAllFilter = function(Parent) {
            Parent.fadeOut("fast", function() {
                Parent.remove();
                var FilterData = GetFilterData(FilterList),
                    NoFilter = FilterList.find("li");
                if (!NoFilter.length) {
                    SearchFilter.slideUp();
                    $(".site-search .search-tab").val("allresults");
                }
                UpdateSearchResult(FilterData);
            });
        },
        ReturnAllSelectVal = function(options) {
            var values = jQuery.map(options, function(option) {
                return option.value;
            });
            return values;
        },
        GetRefineData = function() {
            var AllFilterData = {},
                FilterData = GetFilterData(FilterList),
                RefineData = GetFilterData(RefineList);
            $.extend(AllFilterData, FilterData,RefineData);
            return AllFilterData;
        },
        GetFilterData = function(FilterContainer) {
            var Filters = FilterContainer.find("ul"),
                FilterData = {};
            $.each(Filters, function() {
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem = ($(this).find("li a").length) ? $(this).find("li a") : $(this).find("li input:checked"),
                    FilterValue = [];

                $.each(ListItem, function() {
                    FilterValue.push($(this).data("value"));
                });

                FilterData[FilterID] = FilterValue;
            });
            return FilterData;
        },
        UpdateSearchResult = function(filterData) {
            INFORMA.Spinner.Show($("body"));
            if(SearchType === "SearchResult"){
                filterData.searchText = $(".site-search #searchField").val();
                filterData.searchTab = $(".site-search .search-tab").val();
            }
            INFORMA.DataLoader.GetServiceData(Urls[SearchType], {
                method: "Post",
                data: JSON.stringify(filterData),
                success_callback: INFORMA.SearchResults.RenderSearchResults
            });
        },
        BindRefineEvents = function() {
            var RefineCloseBtn = $(".refine-list .close-filter"),
                RefineContainer = $(".search-container .slider"),
                RefineBtn = $(".refine-list .btn");

            RefineCloseBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.slideUp();
                RefineCloseBtn.hide();
            });

            $(".refine-list").off("click").on("click", "a.refine", function(e) {
                e.preventDefault();
                RefineContainer.slideDown();
                RefineCloseBtn.show();
            });
            RefineBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.fadeOut();
                RefineCloseBtn.hide();
                var getFilterData = GetRefineData();
                UpdateSearchResult(getFilterData);
            });
            MakeRefineSelected(FilterList);
        },
        BindFilterEvents = function() {
            var RemoveLink = FilterList.find("a.remove"),
                ClearAll = FilterList.find("a.remove-all");

            RemoveLink.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parents("ul").eq(0),
                    ItemValue = $(this).data("value"),
                    FilterID = Parent.data("filterid").toLowerCase();

                RemoveFilter($(this).parent(), Parent);

                if (FilterID === "sectors") {
                    MakeDropUnSelected([ItemValue], $("select.sector-list"));
                }
                if (FilterID === "subsectors") {
                    MakeDropUnSelected([ItemValue], $("select.sub-sector-list"));
                }

            });

            ClearAll.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parent(),
                    ItemID = $(this).data("filterid").toLowerCase();
               
                ClearAllFilter(Parent);
               
                if (ItemID === "sectors") {
                    FilterList.find(".SubSectors").remove();
                    SearchDropDown.val("");
                    SubSecDropDown.parents("li.menu").addClass("disabled");
                    SearchDropDown.multiselect('rebuild');
                }
                if (ItemID === "subsectors") {
                    SubSecDropDown.val("");
                    SubSecDropDown.multiselect('rebuild');
                }
            });

        },
        MakeDropUnSelected = function(Arr, DrpDwn) {
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", false);
            });
            DrpDwn.multiselect('rebuild');
        },
        init = function() {
            var IsProductPage = (ProductFinder.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinder.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
        };
    return {
        init: init,
        DoFilter: BindFilterEvents,
        DoRefine: BindRefineEvents
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
