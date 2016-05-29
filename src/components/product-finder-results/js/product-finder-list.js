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
        ResultCount, ResultInner,CreateRefineList,
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
                        console.log(Data);
                    html += ListTemplate({ results: Data });
                }
            }
            return html;
        },
        CreateRefineList = function(Html){
            var RefineContainer = $(".search-container .refine-list");
            if (RefineContainer.length) {
                RefineContainer
                    .empty()
                    .html(Html);
                RefineContainer.parents(".refine-result").slideDown();
            }
            $(".refine-result").off("click").on("click","a.refine",function(e){
                e.preventDefault();
                RefineContainer.slideToggle();
            })
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
                    Refine  = (data.RefineResult !== undefined) ? data.RefineResult : false;
                if (Results) {
                    var html = ParseTemplate(Results);
                    UpdateHtmlView(html);
                }
                if(Refine){
                    var Data={"RefineResult":Refine};
                    CreateRefineList(ParseTemplate(Data));
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
