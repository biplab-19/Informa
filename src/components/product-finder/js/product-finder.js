/*
 * analyst-list.js
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
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
    // methods
        init;


    init = function() {
        if (ProductFinderSection.length > 0) {
            jQuery(".custom-multiselect select").multiselect({ numberDisplayed: 0});
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
