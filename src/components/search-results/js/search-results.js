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
        Urls = INFORMA.Configs.urls.webservices,
        SearchType = '',
        SearchContent = $(".search-container"),
        ProductFinderSection = $('#product-finder-section'),
        ShowMoreLink = SearchContent.find(".btn-showMore"),
        SearchHidden = $("input.search-hidden"),
        SectorHidden = $("input.sector-list"),
        SubSectorHidden = $("input.sub-sector-list"),
        RefineSection = $(".refine-container"),
        SortDropDown = SearchContent.find(".chosen-select"),
        SortDropDownNewCo = $(".refine-container").find(".chosen-select"),
        ProductSearchText = $('input[name="SearchText"]'),
        SeeAllButton = SearchContent.find(".see-all"),
        IsShowFlag = false,
        PageNo = 2,
        // methods
        init, CreateSearchResult, GetSortValue, CreateSearchTags, ParseSearchData, DoGlobalShowMore, ResetPageSize, getSubsectors, UpdateResourceResultPage,
        SetSearchState, MakeDropPreSelected, UpdateResultPage, UpdateRefineSection, ToggleView, GetPaginationData, DoPagination, GetAjaxData, EqualHeight, CreateSubItems,
        DoLinksEvents, GetDefaultValues, LoadMoreProducts, UnbindEvent, disabledEvent, appendEloquaId,
        TotalCountLimit = $("#hdnTotalCountLimit") ? $("#hdnTotalCountLimit").val() : 0,
        FacetCountLimit = $("#hdnFacetCountLimit") ? $("#hdnFacetCountLimit").val() : 0,
        pageattr = $(".search-container .product-results").attr("data-pagesize"),

    disabledEvent = function(){
        $('.register.disabled').click(function(e){
            e.preventDefault();
        });
    },
    
    UnbindEvent = function() {
        $('.register.disabled').on('keydown', function(e) {
            if (e.keyCode === 13 || e.which===13) {
                e.preventDefault();
            }   
        })
    },

    GetDefaultValues = function() {
            var data = {},
            DefaultPageSize = $('input[name="defaultPageSize"]') ? $('input[name="defaultPageSize"]').val() : null;
            data.Sorting = ($('select[name="sorting"]')) ? $('select[name="sorting"]').val() : null;
            data.PageSize = ($('.product-results')) ? ($('.product-results').attr('data-pagesize') > 0 ? $('.product-results').attr('data-pagesize'): DefaultPageSize) : null;
            data.DefaultItemCount = ($('input[name="DefaultItemCount"]')) ? $('input[name="DefaultItemCount"]').val() : null;
            data.MaxItemCount = ($('input[name="MaxItemCount"]')) ? $('input[name="MaxItemCount"]').val() : null;
            data.DefaultProductCount = ($('input[name="DefaultProductCount"]')) ? $('input[name="DefaultProductCount"]').val() : null;
            data.SearchTexts = ($('input[name="SearchTexts"]') && $('input[name="SearchTexts"]').length > 0) ? $('input[name="SearchTexts"]').val().split(",") : null;
            data.OrderOfContentType = ($('input[name="OrderOfContentType"]')) ? $('input[name="OrderOfContentType"]').val().split(",") : null;
            data.WhoWeHelp = ($('input[name="WhoWeHelp"]')) ? $('input[name="WhoWeHelp"]').val() : null,
            //data.Brand = ($('input[name="Brand"]')) ? $('input[name="Brand"]').val() : null,
            data.SearchText = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
            if (SearchType != "ProductSearch") {
                if($('#hdnSearchType').length > 0) {
                    var NameSearchType = $('#hdnSearchType').attr('name'),
                        Value = $('#hdnSearchType').attr('value');
                                    
                    data[NameSearchType] = Value;
                }
            }
            if (SearchType === "ProductSearch") {
            	data.SearchTextSampleContent = ($('input[name="SearchTextSampleContent"]') && $('input[name="SearchTextSampleContent"]').length > 0) ? $('input[name="SearchTextSampleContent"]').val().split(",") : null;
            	data.SearchTextProducts = ($('input[name="SearchTextProducts"]') && $('input[name="SearchTextProducts"]').length > 0) ? $('input[name="SearchTextProducts"]').val().split(",") : null;
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
                $(".product-finder-results a.clear-all").addClass("noOpaque");
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

            SortDropDown.on("change", function(e) {

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
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
            SortDropDownNewCo.on("change", function(e) {

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
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        },
        SetSearchState = function(sVal) {
            //if (sVal) {
                /* unused variable SearchField removed */
                var SearchSubmitBtn = $(".site-search li.button");

                //SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinderSection.find("input[type=radio][data-show='site-search']").trigger("click");
                //SearchSubmitBtn.trigger("click");
            //}
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
        getSubsectors = function(searchbar, groupid, subsector){
            var dropDownId, QueryString,searchQueryStrings, urlParameters = new URLSearchParams(window.location.search);
            QueryString = urlParameters.toString();
            if (QueryString) {
                searchQueryStrings = QueryString.split("&");
                if (searchQueryStrings) {
                    var sectorParam = urlParameters.get(groupid);
                    if (sectorParam) {
                        var hiddenSecotrList = [], sectorFilterOptionsList=[], sectorFscets = sectorParam.split(","), selctedSectorFacets = [];
                        $.each(sectorFscets, function () {
                            selctedSectorFacets.push(this.replace(/-/g, " ").replace(/%26/g, "&").toLowerCase());
                        });

                        if (subsector.length > 0){
                            $.each(subsector, function () {
                                sectorFilterOptionsList.push(this);
                            });
                            $.each(sectorFilterOptionsList,function () {
                                var item = this;
                                if (selctedSectorFacets.includes(item.SubSectorName.toLowerCase())) {
                                    hiddenSecotrList.push(this.SubSectorID);
                                }
                           });
        
                        }
                        else{
                            if(searchbar == 'sector-search')
                            sectorFilterOptionsList = $("." + searchbar + " [id='" + groupid + "2' i]").next().find(".multiselect-container").find("input[type='checkbox']");
                            else
                            sectorFilterOptionsList = $("." + searchbar + " [id='" + groupid + "' i]").next().find(".multiselect-container").find("input[type='checkbox']");
                            sectorFilterOptionsList.filter(function () {
                                if (selctedSectorFacets.includes($(this).parent().text().trim().toLowerCase())) {
                                    hiddenSecotrList.push($(this).val());
                                }
                            });
    
                        }
                        if (hiddenSecotrList.length > 0) {
                            return hiddenSecotrList.toString();
                        }                    }
                }else{
                    return null;
                }
            }

        },
        UpdateResourceResultPage = function(SectorSelect) {
            var URLSubSectorValue, URLSectorValue = getSubsectors('resource-sector-search','sector',[]);

            if (URLSectorValue) {

                var SectorArray = URLSectorValue.split(","),
                    SubSectors,
                    SectorIDs = 'SectorIDs=' + URLSectorValue, resourceFinderSection = $("#resource-finder-section"),
                    /* unused variable SubmitBtn removed */
                    SubSectorSelect = resourceFinderSection.find("select.SubSector");

                resourceFinderSection.find("input[type=radio][data-show='sector-search']").trigger("click");
                if (SectorSelect.length && SectorArray) {
                    MakeDropPreSelected(SectorArray, SectorSelect);
                    INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                        method: "Get",
                        data: SectorIDs,
                        success_callback: function (data) {
                            INFORMA.ResourceFilter.UpdateSubSectorDropdown(data);
                            URLSubSectorValue = getSubsectors('resource-sector-search', 'subsector', data.SubSectors);
                            if (URLSubSectorValue) {
                                SubSectors = URLSubSectorValue.split(",");
                            }
                            if (SubSectors) {
                                MakeDropPreSelected(SubSectors, SubSectorSelect);
                            }
                        },
                        error_callback: function () {

                        }
                    });
                }
            }
            },
        UpdateResultPage = function(SectorSelect, SecValue, SubSecValue) {
            var URLSubSectorValue, URLSectorValue = getSubsectors('sector-search','sector',[]);
            if(URLSectorValue){
                SecValue = URLSectorValue;
            }
            if (SecValue) {
                var SectorArray = SecValue.split(","),
                    SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                    SectorIDs = 'SectorIDs=' + SecValue,
                    /* unused variable SubmitBtn removed */
                    SubSectorSelect = ProductFinderSection.find("select.SubSector");

                ProductFinderSection.find("input[type=radio][data-show='sector-search']").trigger("click");
                if (SectorSelect.length && SectorArray) {
                    MakeDropPreSelected(SectorArray, SectorSelect);
                    INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                        method: "Get",
                        data: SectorIDs,
                        success_callback: function (data) {
                            INFORMA.ProductFinder.UpdateSubSectorDropdown(data);
                            URLSubSectorValue = getSubsectors('sector-search', 'subsector',data.SubSectors);
                            if (URLSubSectorValue) {
                                SubSectors = URLSubSectorValue.split(",");
                            }
                            if (SubSectors) {
                                MakeDropPreSelected(SubSectors, SubSectorSelect);
                            }

                            //ProductFinderSection.slideDown();
                            $('.search:visible').trigger('click');
                            //SubmitBtn.trigger("click");
                        },
                        error_callback: function () {

                        }
                    });
                }
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

                $('.search-container .list-items[data-type="SampleContent"]').each(function() {
                    var IsVideoComponent = $(this).find('.video-container');

                    if(IsVideoComponent.length > 0) {
                        $(this).find('.content').css('padding-right', '0');
                    }
                });
                var MaxHeight = 0;

                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);

            } else {
                Wrapper.css("height", "auto");
                Items.css("height", "auto");

                $('.search-container .list-items[data-type="SampleContent"]').each(function() {
                    var IsVideoComponent = $(this).find('.video-container');

                    if(IsVideoComponent.length > 0) {
                        $(this).find('.content').css('padding-right', IsVideoComponent.width());
                    }
                });
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
                    FilterData = INFORMA.SearchResultFilter.GetRefineData();

                    if((SearchType === "ProductSearch") && ('Product' in PData)) {
                        PData['CurrentProduct'] = PData.Product;
                    } 
                    var Data = INFORMA.ProductFinder.MergeData(ProdData, PData, FilterData, GetDefaultData);

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
            var Data, TileList = jQuery('.search-container .product-results .list-items'),
                PData = GetPaginationData(TileList),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = GetDefaultValues(),
                ProdData = INFORMA.ProductFinder.GetProductData();
                Data = INFORMA.ProductFinder.MergeData(FilterData, DefaultData,ProdData);
                Data.PageNo = 1;
                Data.ExcludedProduct = PData;
                GetAjaxData(Urls["GetMoreProducts"], "Post", Data, ParseSearchData, null, $(this));
        },
        DoGlobalShowMore = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var ProdData = INFORMA.ResourceFilter.GetResourceData(),
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
                                        $(this).closest("li").removeClass("hide");
                                        $(this).removeAttr("disabled");
                                     }else{
                                        $(this).attr("disabled","disabled");
                                        $(this).closest("li").addClass("hide");
                                        $(this).prop("checked",false);
                                     }
                            });
                            SelectAllChkBox.removeAttr("disabled");
                            SelectAllChkBox.closest("div.panel-default").removeClass("hide");
                            Links.removeClass("disabled");
                        }
                        if(CheckBoxes && Facet && RefineObj.length<1){
                            $.each(CheckBoxes, function() {         
                                 $(this).attr("disabled","disabled");
                                 $(this).closest("li").addClass("hide");
                                 $(this).prop("checked",false);
                            });
                            SelectAllChkBox.attr("disabled","disabled");
                            SelectAllChkBox.closest("div.panel-default").addClass("hide");
                            Links.addClass("disabled");
                        }
                    }
                }
            }
            if( SearchType === "ResourceResult"){
                var getSelectedCheckBoxID = $("input.UnFilterCheckbox").val();
                if(getSelectedCheckBoxID!==undefined){
                    var getCheckBox = jQuery("#"+getSelectedCheckBoxID);
                    if(typeof getCheckBox != undefined){
                        getCheckBox.removeAttr("disabled");
                        getCheckBox.prop("checked","checked");
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
                            if (ContentType == "SampleContent" && $("#IsNewCoTemplateEnabled").val() == "True") {
                                ContentType = "SampleContentNewCo"
                            }
                            if (ContentType == "Product" && $("#IsNewCoTemplateEnabled").val() == "True") {
                                ContentType = "ProductNewCo"
                            }
                            if (ContentType == "Event" && $("#IsNewCoTemplateEnabled").val() == "True") {
                                ContentType = "EventNewCo"
                            }
                            if (ContentType == "Specialist" && $("#IsNewCoTemplateEnabled").val() == "True") {
                                ContentType = "SpecialistNewCo"
                            }
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
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
            setTimeout(function() {
                EqualHeight();
            }, 800);
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
            }
        },
        CreateSubItems = function(Data, Button, RemainingCount) {
            var Title;
            var Results = Data[0],
                TemplateName, ListTemplate, Html = '',
                ContentType,
                Lists = Results.Results;
            /* unused ShowMoreText variable removed */
            if (Lists) {
                for (var j = 0; j < Lists.length; j++) {
                    if (Lists[j].Category) {
                        ContentType = Lists[j].Category;
                        if (ContentType == "SampleContent" && $("#IsNewCoTemplateEnabled").val() == "True") {
                            ContentType = "SampleContentNewCo"
                        }
                        if (ContentType == "Product" && $("#IsNewCoTemplateEnabled").val() == "True") {
                            ContentType = "ProductNewCo"
                        }
                        if (ContentType == "Event" && $("#IsNewCoTemplateEnabled").val() == "True") {
                            ContentType = "EventNewCo"
                        }
                        if (ContentType == "Specialist" && $("#IsNewCoTemplateEnabled").val() == "True") {
                            ContentType = "SpecialistNewCo"
                        }
                        TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                        ListTemplate = Handlebars.compile(TemplateName);
                        Html += ListTemplate({ results: Lists[j] });
                    }
                }
                // debugger;
                $(Button).parents('.product-results').find(".list").append(Html);
                setTimeout(function() {
                    EqualHeight();
                }, 800);

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
                    var facetCount = (FacetCountLimit <= 0 || SiteFacets[i].Count < FacetCountLimit) ? SiteFacets[i].Count : (FacetCountLimit + "+");
                    Html += "<li><a href='#' name='" + SiteFacets[i].Name + "' data-check='" + SiteFacets[i].Check + "'' data-contenttype='" + SiteFacets[i].ItemId + "'><strong>" + facetCount + "</strong>" + SiteFacets[i].Value + "</li>";
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
                    var productTotalCount = (TotalCountLimit <= 0 || data.ProductFound < TotalCountLimit) ? data.ProductFound : (TotalCountLimit + "+");
                    SearchContent.find('.results').find('strong').html(productTotalCount);
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
            appendEloquaId();
        },
        appendEloquaId = function() {
            // console.log('appendEloquaId');
            var eloquaId = $("body").attr('data-eloqua-customerid'),
                $btn,
                btnURL;

            if (eloquaId) {
                // ignore elements with eloqid-checked to avoid repeats 
                $('.product-results a.btn').not('[eloqid-checked]').each(function () {
                    $btn = $(this);
                    btnURL = $btn.attr('href');

                    // if URL contains trial query string
                    if (btnURL.indexOf('istrial=true') > -1) {
                        // append eloquaId to the existing href
                        $btn.attr('href', btnURL + '&eloquacookieid=' + eloquaId);
                    }
                    // add 'once only' flag
                    $btn.attr('eloqid-checked', 'true');
                });
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
                var SectorSelect = $("#resource-finder-section").find("select.Sector");
                UpdateResourceResultPage(SectorSelect);
            }

            if (IsProductPage) {

                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (IsProductPage) {
                    var SectorSelect = ProductFinderSection.find("select.Sector");
                    UpdateResultPage(SectorSelect, SVal, SubSecVal);
                }
            }
            if ((IsSearchPage && SearchHidden.length > 0) || (ProductSearchText)) {
                var SearchVal = SearchHidden.val(),
                    SearchText = (ProductSearchText.length > 0) ? ProductSearchText.val() : null;
                if (IsSearchPage) {
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
            if(pageattr > 0) {
                // set hidden field value.
               $('input[name="defaultPageSize"]').val(pageattr);
            }
            ToggleView();
            $(window).on('load', function() {
                EqualHeight();
            });
            GetSortValue();
            UnbindEvent();
            disabledEvent();
        };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        ResetPaging: ResetPageSize,
        DefaultParameters: GetDefaultValues,
        AppendEIDToTrialCTAs: appendEloquaId
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
