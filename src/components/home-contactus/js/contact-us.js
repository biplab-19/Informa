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
        _eachTile = _contactUs.find('.panel-heading'),
    // methods
        init,
        _openAccordian;

    _openAccordian = function(container){
        if(INFORMA.global.device.viewportN === 2) {
            var _tiles = container.find('.panel-default');

            _tiles.each(function(key, value) {
                if(!jQuery(this).hasClass('on-mobile-open') && key < 2) {
                    jQuery(this).find('.collapse').collapse('hide');
                } else {
                    jQuery(this).find('.panel-heading').removeClass('collapsed');
                }
            })
        }
    }

    _eachTile.on('click', function() {
        _eachTile.parent().find('.collapse').collapse('hide');
        _eachTile.not(jQuery(this)).addClass('collapsed');
        jQuery(this).parent().find('.collapse').collapse('hide');
        if(jQuery(this).hasClass('collapsed')) {
            jQuery(this).removeClass('collapsed');
        } else {
            jQuery(this).addClass('collapsed');
        }
    })
    

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
