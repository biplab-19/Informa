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
                var ListTemplate = Handlebars.compile(Templates.ProductFilters),
                    SectorHtml, SubSectorHtml,
                    FilterCont = $(".search-filter .filter-list");

                if (DataObject.Sectors) {
                    SectorHtml = ListTemplate({ results: DataObject.Sectors });
                    FilterCont.find(".sector ul").empty().html(SectorHtml);
                }
                if (DataObject.SubSectors) {
                    SubSectorHtml = ListTemplate({ results: DataObject.SubSectors });
                    FilterCont.find(".subsector ul").empty().html(SubSectorHtml);
                }
                $(".search-filter").delay(600).slideDown();
            }
        },

        init = function() {};
        return {
            init: init,
            CreateFilterList: CreateFilterList
        };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
