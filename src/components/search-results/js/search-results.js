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
        SearchHidden = $("input.search-hidden"),
        SectorHidden = $("input.sector-list"),
        SubSectorHidden = $("input.sub-sector-list"),
        RefineSection = $(".refine-container"),
        // methods
        init, CreateSearchResult, ParseSearchData,SetSearchState,MakeDropPreSelected, UpdateResultPage, UpdateRefineSection, ToggleView,GetPaginationData, DoPagination,GetAjaxData, EqualHeight, CreateSubItems;

        SetSearchState = function(sVal) {
            if (sVal) {
                var SearchField = $(".site-search input[type=text]"),
                    SearchSubmitBtn =  $(".site-search li.button");

                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinderSection.find("input[type=radio]").eq(0).trigger("click");
                SearchSubmitBtn.trigger("click");
            }
        },
        MakeDropPreSelected = function(Arr, DrpDwn) {
            DrpDwn.val("");
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", true);
            });
            DrpDwn.multiselect('rebuild');
        },
        UpdateResultPage = function(SectorSelect, SecValue, SubSecValue) {

            var SectorArray = SecValue.split(","),
                SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                SectorIDs = SecValue,
                SubmitBtn = ProductFinderSection.find(".sector-search li.button"),
                SubSectorSelect = ProductFinderSection.find("select.SubSector");

            ProductFinderSection.find("input[type=radio]").eq(1).trigger("click");
            if (SectorSelect.length && SectorArray) {
                MakeDropPreSelected(SectorArray, SectorSelect);
                INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                    method: "Get",
                    data: SectorIDs,
                    success_callback: function(data) {
                        INFORMA.ProductFinder.UpdateSubSectorDropdown(data);

                        if (SubSectors) {
                            MakeDropPreSelected(SubSectors, SubSectorSelect);
                        }
                        ProductFinderSection.slideDown();
                        SubmitBtn.trigger("click");
                    },
                    error_callback: function() {

                    }
                });
            }
        },
        GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType, Item) {
            INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function (data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, SearchType, Item);
                    }
                },
                error_callback: function () {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data, SearchType);
                    }
                }
            });
        },
        EqualHeight = function(){
            var Items = SearchContent.find('.wrap-content');
            
            if($(".search-container").hasClass("tileView")) {
                var MaxHeight = 0;

                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if(ItemHeight> MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);
            } else {
                
                Items.css("height", "auto");
            }
        },
        GetPaginationData = function(List,Section){
            var Data = {},
                PageSizeValue = Section.data("pagesize");
                
            Data.PageSize = PageSizeValue;
            $.each(List, function(){
                var KeyName = $(this).data("type"),
                    KeyValue = $(this).data("fetch");
                if(Data.hasOwnProperty(KeyName)){
                    var uniqueArr = [], existingVal =[];
                        existingVal = existingVal.concat(Data[KeyName]);
                        uniqueArr.push(KeyValue);
                        Data[KeyName] = uniqueArr.concat(existingVal);
                }else{
                   Data[KeyName] = [].concat(KeyValue);
                }
            });
            return Data;
        },
       DoPagination = function(){
        var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e){
                e.preventDefault();
                var currentSection = $(this).parents(".product-results").eq(0),
                    TileList = currentSection.find(".list-items"),
                    PData = GetPaginationData(TileList,currentSection),
                    ProdData = INFORMA.ProductFinder.GetProductData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData,PData,FilterData);
                

                GetAjaxData(Urls.ProductSearch, "Post", Data,ParseSearchData, null, SearchType, $(this));
                
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
                
                    EqualHeight();
                
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
                var Results = Data[i], TemplateName, ListTemplate, 
                    HeroTemplate, HeroHandlebar, Html='', ContentType,
                    Lists = Results.Results;
                    HeroTemplate = (Templates.SearchTemplate) ? Templates.SearchTemplate : "";
                    HeroHandlebar = Handlebars.compile(HeroTemplate);

                if(Lists){
                    for (var j = 0; j < Lists.length; j++) { 
                        if(Lists[j].Category){
                            ContentType = Lists[j].Category;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html+= ListTemplate({ results: Lists[j] });
                        }
                    }

                    Results.Content = Html;

                    SearchContent.find(".product-results").remove();
                    
                    FinalHTml += HeroHandlebar({ results: Results });
                    // var Container = SearchContent.find(".product-results").eq(i);
                    // Container.find(".list").html(Html);
                    // Container.find("h2").text(Title);
                    // EqualHeight();
                    // if(Lists.length<3){
                    //     Container.find(".text-center").addClass("hidden");
                    // }else{
                    //     Container.find(".text-center").removeClass("hidden");
                    // }

                    
                }
            }
            //UpdateRefineSection();
            SearchContent.find('.container').append(FinalHTml);
            EqualHeight();
            DoPagination();
        },
        CreateSubItems = function(Data,SearchType, Button) {
            var FinalHTml='',Title,ShowMoreText;
                var Results = Data[0], TemplateName, ListTemplate, Html='', ContentType,
                    Lists = Results.Results;
                    ShowMoreText = (Results.ShowMoreText) ? Results.ShowMoreText:"";
                if(Lists){
                    for (var j = 0; j < Lists.length; j++) { 
                        if(Lists[j].Category){
                            ContentType = Lists[j].Category;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html+= ListTemplate({ results: Lists[j] });
                        }
                    }
                    // debugger;
                    $(Button).parents('.product-results').find(".list").append(Html);
                    EqualHeight();
                    $(Button).addClass("hidden");

                }
            DoPagination();
        },
        ParseSearchData = function(data, SearchType, Button) {
            if (Object.keys(data).length) {
                var ProductResults = (data.ProductListing !== undefined) ? data.ProductListing : false,
                    Refine = (data.FacetSections !== undefined) ? data.FacetSections : false,
                    OnlySampleContent = (data.OnlySampleContent !== undefined) ? data.OnlySampleContent : false;
                if (ProductResults && Object.keys(ProductResults).length && OnlySampleContent != true) {
                    CreateSearchResult(ProductResults,SearchType);
                    SearchContent.find('.results').find('strong').html(data.ProductFound);
                    if(Refine && Object.keys(Refine).length){
                        UpdateRefineSection(Refine,SearchType);
                    }
                }
                if(OnlySampleContent == true) {
                    CreateSubItems(ProductResults, SearchType, Button);
                }
                
            }
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.attr("data-product") == "true") ? true : false,
                IsSearchPage = (ProductFinderSection.attr("data-search") == "true") ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            if (IsProductPage && SectorHidden.length > 0) {
                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (SVal) {
                    var SectorSelect = ProductFinderSection.find("select.Sector");
                    UpdateResultPage(SectorSelect, SVal, SubSecVal);
                } 
            }
            if (IsSearchPage && SearchHidden.length > 0) {
                var SearchVal = SearchHidden.val();
                if (SearchVal) {
                    SetSearchState(SearchVal);
                }
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