/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductRefine = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductRefineSection = $('.product-refine-results'),
        RefineHeading = ProductRefineSection.find('.refine-heading'),
        init, DropDownEvents;

    DropDownEvents = function () {
        var _vp = INFORMA.global.device.viewport;

        if(_vp !== "desktop") {
            RefineHeading.on('click', function () {
                $(this).parents('.refine-wrapper').find('.accordian-container').slideToggle();
                $(this).toggleClass('open');
            })
        }

        $('.refine-accordian .title').on('click', function (e) {
            e.preventDefault();
            $(this).next('.content').slideToggle();
            $(this).parents('.refine-accordian').toggleClass('open');
        });

    }


    init = function() {

        if (ProductRefineSection.length > 0) {
            DropDownEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductRefine.init());
