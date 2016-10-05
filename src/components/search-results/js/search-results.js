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
        Utils = INFORMA.Utils,
        SearchType = '',
        SearchContent = $(".search-container"),
        ProductFinderSection = $('#product-finder-section'),
        Data = {},
        ShowMoreLink = SearchContent.find(".btn-showMore"),
        SearchHidden = $("input.search-hidden"),
        SectorHidden = $("input.sector-list"),
        SubSectorHidden = $("input.sub-sector-list"),
        RefineSection = $(".refine-container"),
        SortDropDown = SearchContent.find(".chosen-select"),
        ProductSearchText = $('input[name="SearchText"]'),
        SeeAllButton = SearchContent.find(".see-all"),
        IsShowFlag = false,
        PageNo = 2,
        SortValue = null,
        // methods
        init, CreateSearchResult, GetSortValue, CreateSearchTags, ParseSearchData, DoGlobalShowMore, ResetPageSize,
        SetSearchState, MakeDropPreSelected, UpdateResultPage, UpdateRefineSection, ToggleView, GetPaginationData, DoPagination, GetAjaxData, EqualHeight, CreateSubItems,
        DoLinksEvents, GetDefaultValues, LoadMoreProducts;
    GetDefaultValues = function() {
            var data = {};
            data.Sorting = ($('select[name="sorting"]')) ? $('select[name="sorting"]').val() : null;
            data.PageSize = ($('.product-results')) ? $('.product-results').attr('data-pagesize') : null;
            data.DefaultItemCount = ($('input[name="DefaultItemCount"]')) ? $('input[name="DefaultItemCount"]').val() : null;
            data.MaxItemCount = ($('input[name="MaxItemCount"]')) ? $('input[name="MaxItemCount"]').val() : null;
            data.DefaultProductCount = ($('input[name="DefaultProductCount"]')) ? $('input[name="DefaultProductCount"]').val() : null;
            data.SearchTexts = ($('input[name="SearchTexts"]') && $('input[name="SearchTexts"]').length > 0) ? $('input[name="SearchTexts"]').val().split(",") : null;
            data.OrderOfContentType = ($('input[name="OrderOfContentType"]')) ? $('input[name="OrderOfContentType"]').val().split(",") : null;
            data.WhoWeHelp = ($('input[name="WhoWeHelp"]')) ? $('input[name="WhoWeHelp"]').val() : null,
            data.SearchText = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
            if (SearchType != "ProductSearch") {
                if($('#hdnSearchType').length > 0) {
                    var NameSearchType = $('#hdnSearchType').attr('name'),
                        Value = $('#hdnSearchType').attr('value');
                                    
                    data[NameSearchType] = Value;
                }
            }
            return data;
        },
        DoLinksEvents = function() {
            var Links = $('.items-found').find('a');

            Links.on('click', function(e) {
                e.preventDefault();
                var ProdData, FilterData, Data, DefaultData,
                    GetContentType = $(this).attr('data-contenttype'),
                    FacetCheck = ($(this).attr('data-check') != undefined) ? $(this).attr('data-check') : "",
                    Name = ($(this).attr('name')) ? $(this).attr('name') : "";

                
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }

                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                if (FacetCheck != "null") {
                    Data[Name] = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', Name);
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                } else {
                    Data.ContentType = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', 'ContentType');
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                }
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        }
    GetSortValue = function(value) {
            SortValue = (value) ? value : SortDropDown.val();

            SortDropDown.on("change", function(e) {
                SortValue = $(this).find("option:selected").val();

                var ProdData, FilterData, Data, DefaultData;
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }

                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        },
        SetSearchState = function(sVal) {
            if (sVal) {
                var SearchField = $(".site-search input[type=text]"),
                    SearchSubmitBtn = $(".site-search li.button");

                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinderSection.find("input[type=radio]").eq(0).trigger("click");
                //SearchSubmitBtn.trigger("click");
            }
        },
        ResetPageSize = function() {
            PageNo = 2;
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
                SectorIDs = 'SectorIDs=' + SecValue,
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

                        //ProductFinderSection.slideDown();
                         $('.search:visible').trigger('click');
                        //SubmitBtn.trigger("click");
                    },
                    error_callback: function() {

                    }
                });
            }
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, Item) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, Item);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        EqualHeight = function() {
            var Items = SearchContent.find('.wrap-content'),
                Wrapper = SearchContent.find('.list-items');

            if ($(".search-container").hasClass("tileView")) {
                var MaxHeight = 0,
                    maxWrapperHeight = 0;

                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);
                Wrapper.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        maxWrapperHeight = ItemHeight;
                    }
                })
                Wrapper.height(maxWrapperHeight);
            } else {
                Items.css("height", "auto");
            }
        },
        GetPaginationData = function(List, Section) {
            var Data = {},
                PageSizeValue = (Section) ? Section.data("pagesize") : null;
            if(PageSizeValue){
                Data.PageSize = PageSizeValue;
            }
            $.each(List, function() {
                var KeyName = $(this).data("type"),
                    KeyValue = $(this).data("fetch");
                if (Data.hasOwnProperty(KeyName)) {
                    var uniqueArr = [],
                        existingVal = [];
                    existingVal = existingVal.concat(Data[KeyName]);
                    uniqueArr.push(KeyValue);
                    Data[KeyName] = uniqueArr.concat(existingVal);
                } else {
                    Data[KeyName] = [].concat(KeyValue);
                }
            });
            return Data;
        },
        DoPagination = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var currentSection = $(this).parents(".product-results").eq(0),
                    TileList = currentSection.find(".list-items"),
                    PData = GetPaginationData(TileList, currentSection),
                    ProdData = INFORMA.ProductFinder.GetProductData(),
                    GetDefaultData = GetDefaultValues(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData, PData, FilterData, GetDefaultData);

                if (!$(currentSection).hasClass('showLess')) {
                    $(currentSection).addClass('showLess');
                    GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));
                } else {
                    $(currentSection).removeClass('showLess');
                    $(currentSection).find('.col-xs-12:nth-child(n+4)').remove();
                    $(window).scrollTop($(currentSection).offset().top - 60);
                }


            });
        },
        LoadMoreProducts = function(){
            var Data, TileList = jQuery('.search-container .product-results [data-type="Product"]'),
                PData = GetPaginationData(TileList),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = GetDefaultValues(),
                ProdData = INFORMA.ProductFinder.GetProductData();
                Data = INFORMA.ProductFinder.MergeData(FilterData, DefaultData,ProdData);
                Data.PageNo = 1;
                Data.ExcludedProduct = PData["Product"];
                GetAjaxData(Urls["GetMoreProducts"], "Post", Data, ParseSearchData, null, $(this));
        },
        DoGlobalShowMore = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var Section = $(this).parents(".product-results").eq(0),
                    ProdData = INFORMA.ResourceFilter.GetResourceData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = GetDefaultValues(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);

                Data.PageNo = PageNo;

                if (SearchType === "SearchResult") {
                    Data.SearchText = $('input[name="SearchText"]').val();
                }
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));

            });

            DoLinksEvents();
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
        UpdateRefineSection = function(Data, Type) {
            for (var key in Data) {
                if (Data.hasOwnProperty(key) && Data[key]) {
                    var RefineObj = Data[key],
                        CurrentSection = key;
                    if (RefineObj && CurrentSection) {
                        var Facet = RefineSection.find("#"+CurrentSection),
                            CheckBoxes = Facet.find("input[type=checkbox]"),
                            Header = Facet.prev(".panel-heading"),
                           	SelectAllChkBox = Header.find("input[type=checkbox]"),
                            Links = Header.find("a strong");

                        if (CheckBoxes && Facet && RefineObj.length) {
                            $.each(CheckBoxes, function() {
                                 var CurrentChkBoxVal = $(this).attr("value");
                                     if (RefineObj.contains(CurrentChkBoxVal)) {
                                        $(this).removeAttr("disabled");
                                     }else{
                                        $(this).attr("disabled","disabled");
                                     }
                            });
                            SelectAllChkBox.removeAttr("disabled");
                            Links.removeClass("disabled");
                        }
                        if(CheckBoxes && Facet && RefineObj.length<1){
                            $.each(CheckBoxes, function() {         
                                 $(this).attr("disabled","disabled");
                            });
                            SelectAllChkBox.attr("disabled","disabled");
                            Links.addClass("disabled");
                        }
                    }
                }
            }
        },
        CreateSearchResult = function(Data) {
            var FinalHTml = '',
                Title, ShowMoreText;
            for (var i = 0; i < Data.length; i++) {
                var Results = Data[i],
                    TemplateName, ListTemplate,
                    HeroTemplate, HeroHandlebar, Html = '',
                    ContentType,
                    Lists = Results.Results;
                HeroTemplate = (Templates.SearchTemplate) ? Templates.SearchTemplate : "";
                HeroHandlebar = Handlebars.compile(HeroTemplate);

                if (Lists) {
                    for (var j = 0; j < Lists.length; j++) {
                        if (Lists[j].Category) {
                            ContentType = Lists[j].Category;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            if(ContentType == 'SampleContent') {
                                if(Lists[j].Price != null){
                                    if(Lists[j].Price){
                                        var replacezeroWidthSpace = Lists[j].Price.replace(/\u200B/g,'');
                                        Lists[j].Price = (replacezeroWidthSpace.length > 0) ? replacezeroWidthSpace : null;
                                    }
                                }
                            }
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html += ListTemplate({ results: Lists[j] });
                        }
                    }

                    Results.Content = Html;
                    if(!IsShowFlag){
                        SearchContent.find(".product-results").remove();
                    }
                    FinalHTml += HeroHandlebar({ results: Results });
                }
            }
            IsShowFlag = false;
            SearchContent.find('.container').append(FinalHTml);
            EqualHeight();
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
            }
        },
        CreateSubItems = function(Data, Button, RemainingCount) {
            var FinalHTml = '',
                Title, ShowMoreText;
            var Results = Data[0],
                TemplateName, ListTemplate, Html = '',
                ContentType,
                Lists = Results.Results;
            ShowMoreText = (Results.ShowMoreText) ? Results.ShowMoreText : "";
            if (Lists) {
                for (var j = 0; j < Lists.length; j++) {
                    if (Lists[j].Category) {
                        ContentType = Lists[j].Category;
                        TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                        if(ContentType == 'SampleContent') {
                            if(Lists[j].Price != null){
                                if(Lists[j].Price){
                                    var replacezeroWidthSpace = Lists[j].Price.replace(/\u200B/g,'');
                                    Lists[j].Price = (replacezeroWidthSpace.length > 0) ? replacezeroWidthSpace : null;
                                }
                            }
                        }
                        ListTemplate = Handlebars.compile(TemplateName);
                        Html += ListTemplate({ results: Lists[j] });
                    }
                }
                // debugger;
                $(Button).parents('.product-results').find(".list").append(Html);
                EqualHeight();

                if (SearchType != "ProductSearch") {
                    if (RemainingCount < 1) {
                        $(Button).addClass("hidden");
                    }
                }

            }
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
                PageNo++;
            }
        },
        CreateSearchTags = function(SiteFacets) {
            if (!$.isEmptyObject(SiteFacets)) {
                var Html = "";
                for (var i = 0; i < SiteFacets.length; i++) {
                    Html += "<li><a href='#' name='" + SiteFacets[i].Name + "' data-check='" + SiteFacets[i].Check + "'' data-contenttype='" + SiteFacets[i].ItemId + "'><strong>" + SiteFacets[i].Count + "</strong>" + SiteFacets[i].Value + "</li>";
                }
                $('.items-found').html(Html);
            }
            DoLinksEvents();
        },
        ParseSearchData = function(data, Button) {
            if (Object.keys(data).length) {
                var ProductResults = (data.ProductListing !== undefined) ? data.ProductListing : false,
                    Refine = (data.UpdatedFacets !== undefined) ? data.UpdatedFacets : false,
                    AppendItemsFlag = (data.AppendItemsFlag !== undefined) ? data.AppendItemsFlag : false,
                    FacetDescription = (data.FacetDescription != null && data.FacetDescription.length > 0) ? data.FacetDescription : false,
                    ShowMoreProductFlag = (data.ShowAllFlag  !== undefined) ? data.ShowAllFlag  : false,
                    RemainingCount = (data.RemainingCount !== undefined) ? data.RemainingCount : false;

                if (ProductResults && Object.keys(ProductResults).length && AppendItemsFlag != true) {

                    CreateSearchResult(ProductResults);
                    SearchContent.find('.results').find('strong').html(data.ProductFound);
                    if (data.ProductFound == 0) {
                        $('.items-found').addClass('hidden');
                        $('.product-results').hide();
                    } else {
                        $('.items-found').removeClass('hidden');
                        $('.product-results').show();
                    }
                    SearchContent.find('.product-results').attr('data-pagesize', data.DefaultItemCount);
                    if (FacetDescription) {
                        CreateSearchTags(FacetDescription);
                    }
                    if (Refine && Object.keys(Refine).length) {
                        UpdateRefineSection(Refine);
                    }
                    if(ShowMoreProductFlag)
                    {
                        $(".see-all").removeClass("hidden");
                        $(".see-all").off("click").on("click",function(e){
                            e.preventDefault();
                            IsShowFlag = true;
                            LoadMoreProducts();
                        });
                    }else{
                        $(".see-all").addClass("hidden");
                    }
                }
                if (AppendItemsFlag == true) {
                    CreateSubItems(ProductResults, Button, RemainingCount);
                }
                
                addthis.toolbox('.product-results');
            } else {
                $('.product-results').html(data);
            }
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
                if ($("input[name=searchResultsPageUrl]") && $("input.SeeAllResultInput")) {
                    var Value = $("input[name=searchResultsPageUrl]").val() + '?searchText=*';
                    $("input.SeeAllResultInput").val(Value);
                }
                if(SeeAllButton){
                    SeeAllButton.off("click").on("click",function(e){
                        e.preventDefault();
                        IsShowFlag = true;
                        LoadMoreProducts();
                    });
                }
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
            }

            if (IsProductPage && SectorHidden.length > 0) {
                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (SVal) {
                    var SectorSelect = ProductFinderSection.find("select.Sector");
                    UpdateResultPage(SectorSelect, SVal, SubSecVal);
                }
            }
            if ((IsSearchPage && SearchHidden.length > 0) || (ProductSearchText)) {
                var SearchVal = SearchHidden.val(),
                    SearchText = (ProductSearchText.length > 0) ? ProductSearchText.val() : null;
                if (SearchVal) {
                    SetSearchState(SearchVal);
                }
                if (SearchText) {
                    $('.search:visible').trigger('click');
                }
            }
            if (ShowMoreLink && IsProductPage) {
                DoPagination();
            }
            if (ShowMoreLink && (IsResourcePage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            if (ShowMoreLink && (IsSearchPage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            ToggleView();
            EqualHeight();
            GetSortValue();
        };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        ResetPaging: ResetPageSize,
        DefaultParameters: GetDefaultValues
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
