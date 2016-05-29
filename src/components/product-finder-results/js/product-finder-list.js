/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
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
        ResultCount, ResultInner,CreateRefineList,CreateFilterList,
        // methods
        init,
        equalHeight, UpdateHtmlView, ParseResult, BindEvents,ParseTemplate;

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
        ParseTemplate = function(DataObject){
            var html="";
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        Data = DataObject[key],
                        TemplateName = (Templates[ResultName] !== "undefined") ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                    html += ListTemplate({ results: Data });
                }
            }
            return html;
        },
        CreateRefineList = function(Html){
            var RefineContainer = $(".search-container .refine-list"),
                RefineCloseBtn = $(".refine-result .close-filter");

            if (RefineContainer.length) {
                RefineContainer
                    .empty()
                    .html(Html);
                RefineContainer.parents(".refine-result").delay(1000).slideDown();
            }
            RefineCloseBtn.off("click").on("click",function(e){
                e.preventDefault();
                RefineContainer.slideUp();
            });
            $(".refine-result").off("click").on("click","a.refine",function(e){
                e.preventDefault();
                RefineContainer.slideToggle();
                RefineCloseBtn.show();
            })

        }
        CreateFilterList = function(DataObject){
            if (Object.keys(DataObject).length) {
                 var ListTemplate = Handlebars.compile(Templates.SearchFilter),
                     SectorHtml , SubSectorHtml,
                     FilterCont = $(".search-filter .filter-list");

                    if(DataObject.Sector){
                        SectorHtml = ListTemplate({ results: DataObject.Sector });
                        FilterCont.find(".sector ul").empty().html(SectorHtml);
                    }
                    if(DataObject.Sector){
                        SubSectorHtml = ListTemplate({ results: DataObject.SubSector });
                        FilterCont.find(".subsector ul").empty().html(SubSectorHtml);
                    }
                    $(".search-filter").delay(600).slideDown();
            }
        },
        BindEvents = function(){
            INFORMA.Utils.flipTile(ResultInner);
        },
        UpdateHtmlView = function(Html) {
            if (ResultContainer.length) {
                ResultContainer
                    .hide()
                    .empty()
                    .html(Html);

                ResultContainer.fadeIn(1000);
                ResultInner = $(".search-results");
                ResultInner.each(function() {
                    equalHeight($(this));
                });
                BindEvents();
            }
        },
        ParseResult = function(data) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine  = (data.RefineResult !== undefined) ? data.RefineResult : false,
                    SearchFilter = (data.SearchFilter !== undefined) ? data.SearchFilter : false;
                if(SearchFilter){
                    CreateFilterList(SearchFilter);
                }
                if(Refine){
                    var Data={"RefineResult":Refine};
                    CreateRefineList(ParseTemplate(Data));
                }
                if (Results) {
                    var html= ParseTemplate(Results)
                    UpdateHtmlView(html);
                }
            }
        };

    //Resize
    // $(window).resize(function() {
    //     if (SearchResults.length > 0) {
    //         equalHeight(SearchResults);
    //     }
    // });

    init = function() {};
    return {
        init: init,
        RenderSearchResults: ParseResult
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());
