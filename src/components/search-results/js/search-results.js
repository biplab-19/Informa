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
INFORMA.SearchResults = (function(window, $, namespace) {
    'use strict';
    //Default variables and cached html elements
    var Templates = INFORMA.Templates,
        Config = INFORMA.Configs,
        PageSize = parseInt(Config.searchResult.pageSize),
        Urls = INFORMA.Configs.urls.webservices,
        Utils = INFORMA.Utils, SearchType,
        SearchContent = $(".search-container"),
        ProductFinderSection = $('#product-finder-section'), Data = {},
        // methods
        init, CreateSearchResult, ParseSearchData, ToggleView,GetPaginationData, DoPagination,GetAjaxData, EqualHeight;

        GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: SCallback,
                error_callback: Errcallback
            });
        },
        EqualHeight = function(){
            var Items = SearchContent.find('.list-items'),
                MaxHeight = 0,
                Padding = 35;

            Items.each(function() {
                var ItemHeight = $(this).outerHeight();
                if(ItemHeight> MaxHeight) {
                    MaxHeight = ItemHeight;
                }
            })
            //Items.height(MaxHeight + Padding);
        },
        GetPaginationData = function(SectionObject){
            var Data = {};
            $.each(SectionObject, function(){
                var KeyName = $(this).data("type"),
                    KeyValue = $(this).data("id");
                if(Data.hasOwnProperty(KeyName)){
                    var uniqueArr = [], existingVal =[];
                        existingVal = existingVal.concat(Data[KeyName]);
                        uniqueArr.push(KeyValue);
                        Data[KeyName] = uniqueArr.concat(existingVal);
                }else{
                   Data[KeyName] = KeyValue;
                }
            });
            return Data;
        },
       DoPagination = function(){
            var ShowMoreLink = SearchContent.find(".btn-showMore");
            ShowMoreLink.off("click").on("click",function(e){
                e.preventDefault();
                var currentSection = $(this).parents(".product-results").eq(0),
                    TileList = currentSection.find(".col-xs-12"),
                    PData = GetPaginationData(TileList),
                    ProdData = INFORMA.ProductFinder.GetProductData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData,PData,FilterData);

                GetAjaxData(Urls[SearchType], "Get", JSON.stringify(Data),ParseSearchData, null);
            });
       },
       ToggleView = function() {
            var toggleButtons = $(".search-container .view-mode li");
            toggleButtons.on("click", function(e) {
                e.preventDefault();
                var currentView = $(this).data("view"),
                    parentEle = $(this).parents(".search-container").eq(0);
                if (currentView) {
                    toggleButtons.removeClass("selected");
                    $(this).addClass("selected");
                    parentEle.removeClass("tileView listView");
                    parentEle.addClass(currentView);
                }
            });
        },
        CreateSearchResult = function(Data,SearchType) {
            var FinalHTml='',Title,ShowMoreText;
            for (var i = 0; i < Data.length; i++) {
                var Results = Data[i], TemplateName, ListTemplate, Html='', ContentType,
                    Lists = Results.Products;
                    Title = (Results.ProductTitle) ? Results.ProductTitle:"";
                    ShowMoreText = (Results.ShowMoreText) ? Results.ShowMoreText:"";
                if(Lists){
                    for (var j = 0; j < Lists.length; j++) { 
                        if(Lists[j].ContentType){
                            ContentType = Lists[j].ContentType;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html+= ListTemplate({ results: Lists[j] });
                        }
                    }
                    var Container = SearchContent.find(".product-results").eq(i);
                    Container.find(".row").html(Html);
                    Container.find("h2").text(Title);
                    EqualHeight();
                }
            }
            DoPagination();
        },
        ParseSearchData = function(data, SearchType) {

            if (Object.keys(data).length) {
                var ProductResults = (data.ProductListing !== undefined) ? data.ProductListing : false,
                    Refine = (data.FacetSections !== undefined) ? data.FacetSections : false;
                if (ProductResults && Object.keys(ProductResults).length) {
                    CreateSearchResult(ProductResults,SearchType);
                } else {
                    $(".no-results").show();
                }
            }
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            ToggleView();
            EqualHeight();
        };
    return {
        init: init,
        RenderSearchResults: ParseSearchData
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
