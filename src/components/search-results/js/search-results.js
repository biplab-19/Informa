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
        ShowMoreLink = SearchContent.find(".btn-showMore"),
        RefineSection = $(".refine-container"),
        // methods
        init, CreateSearchResult, ParseSearchData,UpdateRefineSection, ToggleView,GetPaginationData, DoPagination,GetAjaxData, EqualHeight;

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
        UpdateRefineSection = function(Data, Type){
                for (var i = 0; i < Data.length; i++) {
                        var Results = Data[i], Html ='',
                            FacetList = Results.FacetItem,
                            CurrentClass = Results.ClassName,
                            CurrentSection = RefineSection.find("."+CurrentClass),
                            GetAllCheckBox =  CurrentSection.find("input[type=checkbox]"),
                            TemplateName = (Templates["RefineFacets"]) ? Templates["RefineFacets"] : "",
                            ListTemplate = Handlebars.compile(TemplateName);

                    if(CurrentSection && FacetList){
                            Html = ListTemplate({ results: FacetList });
                            CurrentSection.find("ul").html(Html);
                            INFORMA.SearchResultFilter.BindRefineEvents();
                    }
                }
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
                    if(Lists.length<3){
                        Container.find(".text-center").addClass("hidden");
                    }else{
                        Container.find(".text-center").removeClass("hidden");
                    }
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
                if(Refine && Object.keys(Refine).length){
                    UpdateRefineSection(Refine,SearchType);
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
            if(ShowMoreLink){
                DoPagination();
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
