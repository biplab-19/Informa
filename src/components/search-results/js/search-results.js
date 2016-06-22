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
    //variables
    var Templates = INFORMA.Templates,
        ResultContainer = $(".search-container #results"),
        ProductFinder = $('#product-finder-section'),
        SectorSelect = $("select.sector-list"),
        SubSectorSelect = $("select.sub-sector-list"),
        SubmitBtn = $(".product-finder .sector-search li.button"),
        SearchSubmitBtn = $(".site-search li.button"),
        SearchField = $(".site-search input"),
        SectorHidden = $("input.sector-list"),
        SearchHidden = $("input.search-hidden"),
        SubSectorHidden = $("input.sub-sector-list"),
        FilterList = $(".search-filter .filter-list"),
        RefineContainer = $(".search-container .refine-result"),
        ResultCount, ResultInner, SectorData, SubSectorData,
        Config = INFORMA.Configs,
        PageSize = parseInt(Config.searchResult.pageSize),
        Urls = INFORMA.Configs.urls.webservices,
        Utils = INFORMA.Utils, SearchType = '',
        // methods
        init,
        equalHeight, BindPaginationEvents, GetPaginatedData, UpdateHtmlView, ShowFilter,
        LoadProducts, CreateFilterList, BindPageLoadEvents, BindTabOpenEvents, OpenTab,
        ParseSearchData, BindTileEvents, CreateSearchResult, UpdateResultPage, MakeDropPreSelected,GetSearchData;

        equalHeight = function(container) {
            var ItemsList = container.find('.col-md-4'),
                MaxHeight = 0,
                Padding = 10;

            ItemsList.each(function() {
                var currentHeight = jQuery(this).height();
                if (currentHeight > MaxHeight) {
                    MaxHeight = currentHeight;
                }
            })
            ItemsList.css('height', MaxHeight + Padding);
            if (INFORMA.global.device.viewportN === 2) {
                ItemsList.css('height', 'auto');
            }
        },
        MakeDropPreSelected = function(Arr, DrpDwn) {
            DrpDwn.val("");
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", true);
            });
            DrpDwn.multiselect('rebuild');
        },
        LoadProducts = function(){
            INFORMA.DataLoader.GetServiceData(Urls.ProductSearch, {
                method:"Post",
                success_callback: ParseSearchData
            });
        },
        GetSearchData = function(sVal){
            if(sVal){
                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinder.find("input[type=radio]").eq(1).trigger("click");
                //SearchSubmitBtn.trigger("click");
            }
        },
        UpdateResultPage = function(SecValue, SubSecValue) {

            var SectorArray = SecValue.split(","),
                SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                SectorIDs = 'SectorIDs=' + Utils.StrngToQryStrng(SecValue);

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
                        ProductFinder.slideDown();
                        SubmitBtn.trigger("click");
                    },
                    error_callback: function() {

                    }
                });
            }
        },
        GetPaginatedData = function(Url, Method, Data, SCallBack, ErrCallack) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Url, {
                method: Method,
                data: Data,
                success_callback: SCallBack,
                error_callback: ErrCallack
            });
        },
        BindPaginationEvents = function(Object) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();

                var SerializeArrays = ProductFinder.find("form").serializeArray(),
                    Data = Utils.serializeObject(SerializeArrays);
                    PageSize+=6;
                Data.pageSize =  PageSize;

                GetPaginatedData(Urls.ProductSearch, "Post", JSON.stringify(Data), ParseSearchData, null);
            });
        },
        BindTabOpenEvents = function(Object) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();
                var TabName = $(this).attr("href");
                OpenTab(TabName);
            });
        },
        OpenTab = function(TabName){
            var CurrentTab = ResultContainer.find(TabName), CurrentPos,
                AllResults = ResultContainer.find(".search-results");

            if(TabName==="#results"){
                AllResults.show();
                CurrentPos = ResultContainer.offset().top;
            }else{
                AllResults.hide();
                ResultContainer.find(TabName).show();
                CurrentPos = CurrentTab.offset().top;
            }

            $("html, body").animate({ scrollTop: CurrentPos });
            $(".tab-list li").removeClass("selected");
            $(".tab-list li a").each(function(){
                if($(this).attr("href")===TabName){
                    $(this).parent().addClass("selected")
                }
            });
        },
        ShowFilter = function(html, container,isDefaultShow) {
            if (html && container) {
                container.html(html);
                if(isDefaultShow){
                    container.parent().parent().delay(600).slideDown();
                }
            }
        },
        CreateSearchResult = function(DataObject) {

            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key) && DataObject[key]) {
                    var ResultName = key,
                        html = "",
                        Data = DataObject[key],
                        ResultCount, ShowMoreLink, RemainingCount,
                        TemplateName = (Templates[ResultName] !== "undefined") ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName),
                        ContainerID = "#" + (ResultName).toLowerCase();

                    html = ListTemplate({ results: Data[ResultName+'List'] });
                    ShowMoreLink = $(ContainerID).find(".btn-container");

                    //Update Search Results
                    $(ContainerID).find(".row").html(html);
                    ShowMoreLink.removeClass('hide');

                    //Update Record Counts
                    if (Data) {
                        ResultCount = (Data.Count) ? Data.Count:0;
                        RemainingCount = (Data.RemainingCount) ? Data.RemainingCount:0;

                        $(ContainerID).find(".count strong").text(ResultCount);

                        if(RemainingCount<1){
                            ShowMoreLink.addClass('hide');
                        }

                    } else {
                        $(ContainerID).find(".count strong").text("0");
                        ShowMoreLink.addClass('hide');
                    }
                }
            }
            var UpddateHeight = setTimeout(function() {
                clearTimeout(UpddateHeight);
                UpdateHtmlView();
            }, 500);
        },
        CreateFilterList = function(DataObject,Template,labelsObject) {
            var html = "";
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        Data = DataObject[key],
                        ListTemplate = Handlebars.compile(Template);
                        if(Data.length > 0){
                            Data.FilterName = labelsObject[ResultName];
                            Data.FilterID = ResultName;
                            html += ListTemplate({ results: Data });
                        }
                }
            }
            return html;
        },
        BindTileEvents = function() {
            INFORMA.Utils.flipTile(ResultInner);
        },
        BindPageLoadEvents = function(){
            ResultInner = $(".search-results");
            ResultInner.each(function() {
                equalHeight($(this));
            });
            BindTileEvents();
            var ShowMoreBtn = ResultContainer.find(".btn-ShowMore");

            if(SearchType==='ProductSearch'){
                BindPaginationEvents(ShowMoreBtn);
            }
            if(SearchType==='SearchResult'){
                var TabsLink = $(".tab-list a");
                BindTabOpenEvents(ShowMoreBtn);
                BindTabOpenEvents(TabsLink);
            }
        },
        UpdateHtmlView = function() {
            if (ResultContainer.length) {
                ResultContainer
                    .hide()
                    .fadeIn(1000);
                BindPageLoadEvents();
            }
        },
        ParseSearchData = function(data, SearchType) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine = (data.ProductFacets !== undefined) ? data.ProductFacets : false,
                    FilterLabels = (data.FilterLabels !== undefined) ? data.FilterLabels : false,
                    ProductFilters = (data.ProductFilters !== undefined) ? data.ProductFilters : false,
                    SearchTabs = (data.Tabs !== undefined) ? data.Tabs : false;
                if (ProductFilters) {
                    var html = CreateFilterList(ProductFilters,Templates.ProductFilters,FilterLabels);
                    ShowFilter(html, FilterList,true);
                    INFORMA.SearchResultFilter.DoFilter();
                }
                if (Refine) { 
                   var html = CreateFilterList(Refine,Templates.ProductFacets,FilterLabels);
                   ShowFilter(html, RefineContainer ,false);
                   INFORMA.SearchResultFilter.DoRefine();
                }
                if (Results) {
                    CreateSearchResult(Results);

                }
                if(SearchTabs){
                    var html = CreateFilterList(SearchTabs,Templates.SearchTabs);
                }
            }
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
            if (IsProductPage && SectorHidden.length > 0) {
                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (SVal) {
                    UpdateResultPage(SVal, SubSecVal);
                }else{
                    LoadProducts();
                }
            }

            if(IsSearchPage && SearchHidden.length >0){
                var SearchVal = SearchHidden.val();
                if (SearchVal) {
                    GetSearchData(SearchVal);
                }
            }

            if (ResultContainer.length > 0) {
                BindPageLoadEvents();
            }

    };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        UpdateResultPage: UpdateResultPage
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
