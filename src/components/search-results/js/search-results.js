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
        ResultContainer = $(".search-container #results"),
        AllResults = ResultContainer.find(".search-results"),
        ProductFinder = $('#product-finder-section'),
        SectorSelect = $("select.sector-list"),
        SubSectorSelect = $("select.sub-sector-list"),
        SubmitBtn = $(".product-finder .sector-search li.button"),
        SearchSubmitBtn = $(".site-search li.button"),
        SearchField = $(".site-search input[type=text]"),
        SectorHidden = $("input.sector-list"),
        SearchHidden = $("input.search-hidden"),
        SearchTabHidden = $(".site-search input.search-tab"),
        SubSectorHidden = $("input.sub-sector-list"),
        FilterList = $(".search-filter .filter-list"),
        RefineContainer = $(".search-container .refine-result"),
        ResultCount, ResultInner, SectorData, SubSectorData,
        Config = INFORMA.Configs,
        PageSize = parseInt(Config.searchResult.pageSize),
        Urls = INFORMA.Configs.urls.webservices,
        Utils = INFORMA.Utils, SearchType = '',
        // methods
        init, ResetPageSize,
        equalHeight, BindPaginationEvents, GetPaginatedData, UpdateHtmlView, ShowFilter, GetSearchPaginatedData,
        LoadProducts, CreateFilterList, BindPageLoadEvents, BindTabOpenEvents, OpenTab, GetSearchArray,
        ParseSearchData, BindTileEvents, CreateSearchResult, UpdateResultPage, MakeDropPreSelected,SetSearchState;
        ResetPageSize = function(){
            PageSize = parseInt(Config.searchResult.pageSize);
        },
        equalHeight = function(container) {
            var ItemsList = container.find('.col-md-4'),
                MaxHeight = 0,
                Padding = 10;

            if(container.attr("id")==="resources"){
                ItemsList = container.find('.columns');
                
            }else if(container.attr("id")==="analysts"){
                ItemsList = container.find('.analyst-description');
            }
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
        LoadProducts = function(data){
            INFORMA.DataLoader.GetServiceData(Urls.ProductSearch, {
                method:"Post",
                data:data,
                success_callback: ParseSearchData
            });
        },
        SetSearchState = function(sVal){
            if(sVal){
                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinder.find("input[type=radio]").eq(1).trigger("click");
                //SearchSubmitBtn.trigger("click");
            }
        },
        GetSearchArray = function(){
            var SerializeArrays = ProductFinder.find("form").serializeArray(),
                Data = Utils.serializeObject(SerializeArrays);

            return Data;
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
        GetPaginatedData = function(Url, Data, SCallBack, ErrCallack) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Url, {
                method: "Post",
                data: Data,
                success_callback: SCallBack,
                error_callback: ErrCallack
            });
        },
        GetSearchPaginatedData = function(TabName){
            var Data = GetSearchArray();
            PageSize = parseInt(Config.searchResult.pageSize);
            Data.pageSize =  PageSize;
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Urls[SearchType], {
                method: "Post",
                data: JSON.stringify(Data),
                success_callback: function(data){
                    var results = {};
                    results.Results = data["Results"],
                    results.ProductFacets = data["ProductFacets"];
                    RefineContainer.hide();
                    ParseSearchData(results);

                    var UpdateTab = setTimeout(function() {
                        clearTimeout(UpdateTab);
                        OpenTab(TabName);
                    }, 500);
                }
            });
        },
        BindPaginationEvents = function(Object,url) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();
                var TabName, SearchTab, Data;

                if(SearchType==='SearchResult'){
                    TabName = ($(this).attr("href")).toLowerCase();
                    SearchTab = TabName.replace("#",'');
                    SearchTabHidden.val(SearchTab);
                    ResultContainer.addClass('ShowLoadBtn');
                }

                Data = GetSearchArray();
                PageSize+=6;
                Data.pageSize =  PageSize;  
                GetPaginatedData(Urls[url], JSON.stringify(Data), function(data){
                    if(SearchType ==='SearchResult'){
                        var results = {};
                        results.Results = data["Results"],
                        results.ProductFacets = data["ProductFacets"];
                        ParseSearchData(results);
                    }else{
                        ParseSearchData(data);
                    }
                });
            });
        },
        BindTabOpenEvents = function(Object) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();
                var TabName = ($(this).attr("href")).toLowerCase(),
                    SearchTab = TabName.replace("#",''), Data;
            
                if(!$(this).parent().hasClass("selected")){
                    SearchTabHidden.val(SearchTab);
                    GetSearchPaginatedData(TabName);
                }
            });
        },
        OpenTab = function(TabName){
            var CurrentTab = ResultContainer.find(TabName),
                AllResultTab = ($(".tab-list li:first-child a").attr("href")).toLowerCase(),
                CurrentPos;

            if(TabName===AllResultTab){
                ResultContainer.removeClass('ShowLoadBtn');
                CurrentPos = ResultContainer.offset().top;
            }else{
                AllResults.hide();
                CurrentTab.show();
                ResultContainer.addClass('ShowLoadBtn');
                CurrentPos = CurrentTab.offset().top;
            }
            $("html, body").animate({ scrollTop: CurrentPos });
            $(".tab-list li").removeClass("selected");
                $(".tab-list li a").each(function(){
                    var TabLink = ($(this).attr("href")).toLowerCase();
                    if(TabLink===TabName){
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
                        TemplateName = (Templates[ResultName]) ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName),
                        ContainerID = "#" + (ResultName).toLowerCase();
                        ShowMoreLink = $(ContainerID).find(".btn-container");
    
                    if((Templates[ResultName]) && (Data[ResultName+'List'])){
                        html = ListTemplate({ results: Data[ResultName+'List'] });                        //Update Search Results
                        $(ContainerID).find(".row").html(html);
                        $(ContainerID).show();
                        ShowMoreLink.removeClass('hide');
                    }

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
                }else{
                    var ResultName = key,
                        ContainerID = "#" + (ResultName).toLowerCase();
                    $(ContainerID).find(".row").html('');
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
                        if(Data && Data.length > 0){
                            if(labelsObject){
                                Data.FilterName = labelsObject[ResultName];
                            }
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
                BindPaginationEvents(ShowMoreBtn,SearchType);
            }
            if(SearchType==='SearchResult'){

                var TabsLink = $(".tab-list a"),
                    OpenTabBtn = ResultContainer.find(".open-tab"),
                    FilterMenu = $(".search-tabs select");
                
                OpenTabBtn.off("click").on("click",function(e){
                    e.preventDefault();
                    var TabName = ($(this).attr("href")).toLowerCase(),
                    TabToClick = jQuery('.tab-list a[href="'+TabName+'"]');
                    if(TabToClick){
                        TabToClick.trigger("click");
                        jQuery('.search-tabs select option[value="'+TabName+'"]').prop("selected",true);
                    }
                });

                if(FilterMenu){
                    FilterMenu.off("change").on("change", function(e) {
                        e.preventDefault();
                        var SelectedFilter = FilterMenu.val(),
                            TabToClick = jQuery('.tab-list a[href="'+SelectedFilter+'"]');
                        if(TabToClick){
                            TabToClick.trigger("click");
                        }
                    });
                }
                BindPaginationEvents(ShowMoreBtn,SearchType);
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
                    SearchTabs = (data.SearchTabs !== undefined) ? data.SearchTabs : false;
                if (ProductFilters) {
                    var html = CreateFilterList(ProductFilters,Templates.ProductFilters,FilterLabels);
                    ShowFilter(html, FilterList,true);
                    FilterList.parent().parent().show();
                    INFORMA.SearchResultFilter.DoFilter();
                }else{
                    FilterList.parent().parent().hide();
                }
                if (Refine) { 
                   var html = CreateFilterList(Refine,Templates.ProductFacets,FilterLabels);
                   RefineContainer.show();
                   ShowFilter(html, RefineContainer ,false);
                   INFORMA.SearchResultFilter.DoRefine();
                }else{
                    RefineContainer.html("");
                    RefineContainer.hide();
                    $(".refine-list").off("click");
                }
                if(SearchTabs){
                    var Data = {} , html;
                        Data.SearchTabs = SearchTabs;
                        html = CreateFilterList(Data,Templates.SearchTabs);
                    $(".search-tabs").html(html);
                    $(".search-tabs li:first-child").addClass("selected");
                }
                if (Results && Object.keys(Results).length) {
                    AllResults.hide();
                    $(".no-results").hide();
                    CreateSearchResult(Results);
                }else{
                    AllResults.hide();
                    $(".no-results").show();
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
                    var informationTypes = ($("input.informationtypes").val() || ''),
                        role = ($("input.roles").val() || ''),
                        brand = ($("input.brands").val() || ''),
                        data = {"informationtypes":informationTypes,"roles":role,"brands":brand};
                    LoadProducts(JSON.stringify(data));
                }
            }

            if(IsSearchPage && SearchHidden.length >0){
                var SearchVal = SearchHidden.val();
                if (SearchVal) {
                    SetSearchState(SearchVal);
                }
            }

            if (ResultContainer.length > 0) {
                BindPageLoadEvents();
                if(RefineContainer.find(".col-xs-12").length){
                    INFORMA.SearchResultFilter.DoRefine();
                }
            }

    };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        UpdateResultPage: UpdateResultPage,
        ResetPageSize:ResetPageSize
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
