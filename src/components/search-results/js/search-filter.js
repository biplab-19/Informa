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
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SubmitBtn = $(".product-finder .sector-search li.button"),
        RefineList = $(".search-container .refine-result"),
        // methods
        init, ReturnAllSelectVal,GetFilterData, ClearAllFilter, BindRefineEvents,
        MakeDropUnSelected, BindFilterEvents, UpdateSearchResult, RemoveFilter, GetRefineData;

        RemoveFilter = function(item, parent) {
            item.fadeOut("fast", function() {
                item.remove();
                var FilterLength = parent.find("li").size(),
                    FilterData = GetFilterData(FilterList);
                if (FilterLength < 1) {
                    parent.parent('div').hide();       
                }
                UpdateSearchResult(FilterData);
            });
        },
        ClearAllFilter = function(Parent){
            Parent.fadeOut("fast", function() {
                Parent.remove();
                var FilterData = GetFilterData(FilterList);
                UpdateSearchResult(FilterData);
            });
        },
        ReturnAllSelectVal = function(options) {
            var values = jQuery.map(options, function(option) {
                return option.value;
            });
            return values;
        },
        GetRefineData = function(){
            var AllFilterData = {},
                FilterData = GetFilterData(FilterList),
                RefineData = GetFilterData(RefineList);
                $.extend(AllFilterData, RefineData, FilterData);
            return AllFilterData;
         },
        GetFilterData = function(FilterContainer){
            var Filters = FilterContainer.find("ul"),
                FilterData = {};
            $.each(Filters,function(){
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem  = ($(this).find("li a").length)? $(this).find("li a") : $(this).find("li input:checked"),
                    FilterValue = [];

                 $.each(ListItem,function(){
                    FilterValue.push($(this).data("value"));
                 });

                FilterData[FilterID] = FilterValue;
            });
            return FilterData;
        },
        UpdateSearchResult = function(filterData) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Urls.ProductSearch, {
                method:"Post",
                data:JSON.stringify(filterData),
                success_callback: INFORMA.SearchResults.RenderSearchResults
            });
        },
        BindRefineEvents = function() {
            var RefineCloseBtn = $(".refine-list .close-filter"),
                RefineContainer = $(".search-container .slider"),
                RefineBtn = $(".refine-list .btn");
                
            RefineContainer.hide();
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

                if(FilterID==="sectors"){
                    MakeDropUnSelected([ItemValue],$("select.sector-list"));
                }
                if(FilterID==="subsectors"){
                    MakeDropUnSelected([ItemValue],$("select.sub-sector-list"));
                }
    
            });

            ClearAll.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parent(),
                    ItemID = $(this).data("filterid").toLowerCase();

                    if(ItemID==="sectors"){
                        FilterList.find(".SubSectors").remove();
                    }
                ClearAllFilter(Parent);
            });

        },
        MakeDropUnSelected = function(Arr, DrpDwn) {
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", false);
            });
            DrpDwn.multiselect('rebuild');
        },
        init = function() {};
        return {
            init: init,
            DoFilter: BindFilterEvents,
            DoRefine:BindRefineEvents
        };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
