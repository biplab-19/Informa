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
        // methods
        init , CreateSearchResult , ParseSearchData;
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

                    if ((Templates[ResultName]) && (Data[ResultName + 'List'])) {
                        html = ListTemplate({ results: Data[ResultName + 'List'] }); //Update Search Results
                        $(ContainerID).find(".row").html(html);
                        $(ContainerID).show();
                        ShowMoreLink.removeClass('hide');
                    }

                    //Update Record Counts
                    if (Data) {
                        ResultCount = (Data.Count) ? Data.Count : 0;
                        RemainingCount = (Data.RemainingCount) ? Data.RemainingCount : 0;

                        $(ContainerID).find(".count strong").text(ResultCount);

                        if (RemainingCount < 1) {
                            ShowMoreLink.addClass('hide');
                        }

                    } else {
                        $(ContainerID).find(".count strong").text("0");
                        ShowMoreLink.addClass('hide');
                    }
                } else {
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
        ParseSearchData = function(data, SearchType) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine = (data.ProductFacets !== undefined) ? data.ProductFacets : false;

                if (Results && Object.keys(Results).length) {
                    CreateSearchResult(Results);
                } else {
                    $(".no-results").show();
                }
            }
        },
        init = function() {

        };
     return {
        init: init,
        RenderSearchResults: ParseSearchData
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
