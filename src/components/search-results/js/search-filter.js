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
INFORMA.SearchResultFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        // methods
        init,
        CreateFilterList;

        CreateFilterList = function(DataObject) {
            if (Object.keys(DataObject).length) {
                var ListTemplate = Handlebars.compile(Templates.SearchFilter),
                    SectorHtml, SubSectorHtml,
                    FilterCont = $(".search-filter .filter-list");

                if (DataObject.Sector) {
                    SectorHtml = ListTemplate({ results: DataObject.Sector });
                    FilterCont.find(".sector ul").empty().html(SectorHtml);
                }
                if (DataObject.Sector) {
                    SubSectorHtml = ListTemplate({ results: DataObject.SubSector });
                    FilterCont.find(".subsector ul").empty().html(SubSectorHtml);
                }
                $(".search-filter").delay(600).slideDown();
            }
        },

    init = function() {};
    return {
        init: init,
        CreateFilterList:CreateFilterList
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
