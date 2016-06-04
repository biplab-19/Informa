/*
 * Home Contact Us.js
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
INFORMA.homeContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var _contactUs = $('#contactus-section'),
        _accordianTile = _contactUs.find('.panel-default'),
    // methods
        init,
        _openAccordian;

    _openAccordian = function(container){
        if(INFORMA.global.device.viewportN === 2) {
            var _tiles = container.find('.panel-default');

            _tiles.each(function() {
                if(!jQuery(this).hasClass('on-mobile-open')) {
                    jQuery(this).find('.accordion-toggle').addClass('collapsed');
                    jQuery(this).find('.panel-collapse').removeClass('in');
                } else {
                    jQuery(this).find('.accordion-toggle').removeClass('collapsed');
                    jQuery(this).find('.panel-collapse').addClass('in');
                }
            })
        }
    }
    

    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());
