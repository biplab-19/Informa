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
INFORMA.SearchRefineResult = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        // methods
        init,
        CreateRefineList, BindRefineEvents;

    BindRefineEvents = function(html) {
            var RefineContainer = $(".search-container .refine-result"),
                RefineCloseBtn = $(".refine-result .close-filter");

            if (RefineContainer.length) {
                RefineContainer
                    .empty()
                    .html(html);
                RefineContainer.parents(".refine-list").delay(1000).slideDown();
            }

            RefineCloseBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.slideUp();
            });

            $(".refine-list").off("click").on("click", "a.refine", function(e) {
                e.preventDefault();
                RefineContainer.slideToggle();
                RefineCloseBtn.show();
            });
        },
        CreateRefineList = function(DataObject) {
            if (Object.keys(DataObject).length) {
                var ListTemplate = Handlebars.compile(Templates.RefineResult),
                    html = ListTemplate({ results: DataObject.RefineResult });
                BindRefineEvents(html);
            }

        },

        init = function() {};
        return {
            init: init,
            CreateRefineList: CreateRefineList
        };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchRefineResult.init());
