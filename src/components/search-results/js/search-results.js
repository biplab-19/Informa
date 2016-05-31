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
        ResultCount, ResultInner,
        Config = INFORMA.Configs,
        PageNum =1, 
        Urls = INFORMA.Configs.urls.webservices,
        // methods
        init,
        equalHeight, BindPaginationEvents,GetPaginatedData, UpdateHtmlView, 
        ParseSearchData, BindTileEvents, CreateSearchResult;

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
        GetPaginatedData = function(Url,Method,Data,SCallBack,ErrCallack) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Url, {
                method: Method,
                data: Data,
                success_callback:SCallBack,
                error_callback: ErrCallack
            });
        },
        BindPaginationEvents = function(Object) {
            Object.on("click", function(e) {
                e.preventDefault();
                var SerializeArrays = ProductFinder.find("form").serializeArray(),
                    GetSerializeData = INFORMA.Utils.serializeObject(SerializeArrays);
                    GetSerializeData.pageSize = ($(this).data('pagesize')!==undefined) ? $(this).data('pagesize') : Config.searchResult.pageSize;
                    GetSerializeData.pageNum = PageNum++;
                
                GetPaginatedData(Urls, "Get", JSON.stringify(GetSerializeData), ParseSearchData, null);
            });
        },
        CreateSearchResult = function(DataObject) {
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        html = "",
                        Data = DataObject[key],
                        TemplateName = (Templates[ResultName] !== "undefined") ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName),
                        ContainerID = "#" + (ResultName).toLowerCase();

                    html = ListTemplate({ results: Data });

                    //Update Search Results
                    $(ContainerID).find(".row").html(html);

                    //Update Record Counts
                    $(ContainerID).find(".count strong").text(Data.length);
                }
            }
            var UpddateHeight = setTimeout(function() {
                clearTimeout(UpddateHeight);
                UpdateHtmlView();
            }, 500);
        },
        BindTileEvents = function() {
            INFORMA.Utils.flipTile(ResultInner);
        },
        UpdateHtmlView = function() {
            if (ResultContainer.length) {
                ResultContainer
                    .hide()
                    .fadeIn(1000);
                ResultInner = $(".search-results");
                ResultInner.each(function() {
                    equalHeight($(this));
                });
                BindTileEvents();
                var ShowMoreBtn = ResultContainer.find(".btn-ShowMore");
                BindPaginationEvents(ShowMoreBtn);
            }
        },
        ParseSearchData = function(data) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine = (data.RefineResult !== undefined) ? data.RefineResult : false,
                    ProductFilters = (data.ProductFilters !== undefined) ? data.ProductFilters : false;
                if (ProductFilters) {
                    INFORMA.SearchResultFilter.CreateFilterList(ProductFilters);
                }
                if (Refine) {
                    var Data = { "RefineResult": Refine };
                    INFORMA.SearchRefineResult.CreateRefineList(Data);
                }
                if (Results) {
                    CreateSearchResult(Results);
                }
            }
        };

    //Resize
    // $(window).resize(function() {
    //     if (SearchResults.length > 0) {
    //         equalHeight(SearchResults);
    //     }
    // });

    init = function() {
            var IsProductPage = (ProductFinder.data("product") === true) ? true : false;
            if(IsProductPage){
                if(ResultContainer.length && $(".search-tile").length){
                    UpdateHtmlView();
                }
            }

    };
    return {
        init: init,
        RenderSearchResults: ParseSearchData
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
