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
        SectorSelect = $(".product-finder").find("select.sector-list"),
        SubSectorSelect = $(".product-finder").find("select.sub-sector-list"),
        // methods
        init, ReturnAllSelectVal,GetFilterData, ClearAllFilter,
        CreateFilterList, MakeDropUnSelected, BindFilterEvents, UpdateSearchResult, RemoveFilter;

        RemoveFilter = function(item, parent) {
            item.fadeOut("fast", function() {
                item.remove();
                var FilterLength = parent.find("li").size(),
                    FilterData = GetFilterData();
                if (FilterLength < 1) {
                    parent.parent('div').hide();       
                }
                UpdateSearchResult(FilterData);
            });
        },
        ClearAllFilter = function(ItemID,Parent){
            Parent.fadeOut("fast", function() {
                Parent.remove();
                var FilterData = GetFilterData();
                if(ItemID==="sectors"){
                    FilterList.find(".SubSectors").remove();
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
        GetFilterData = function(){
            var Filters = FilterList.find("ul"),
                FilterData = {};

            $.each(Filters,function(){
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem  = $(this).find("li a"),
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
                method:"Get",
                data:JSON.stringify(filterData),
                success_callback: INFORMA.SearchResults.RenderSearchResults
            });
        },
        BindFilterEvents = function() {
            var RemoveLink = FilterList.find("a.remove"),
                ClearAll = FilterList.find("a.remove-all");

            RemoveLink.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parents("ul").eq(0);
                RemoveFilter($(this).parent(), Parent);
            });

            ClearAll.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parent(),
                    ItemID = $(this).data("filterid").toLowerCase();
                ClearAllFilter(ItemID,Parent);
            });
        },
        MakeDropUnSelected = function(Arr, DrpDwn) {
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", false);
            });
            DrpDwn.multiselect('rebuild');
        },
        CreateFilterList = function(DataObject) {
            var html = "";
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        Data = DataObject[key],
                        ListTemplate = Handlebars.compile(Templates.ProductFilters);

                        if(Data.length > 0){
                            Data.FilterName = ResultName;
                            html += ListTemplate({ results: Data });
                        }
                }
            }
            return html;
        },

        init = function() {};
    return {
        init: init,
        CreateFilterList: CreateFilterList,
        DoFilter: BindFilterEvents
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
