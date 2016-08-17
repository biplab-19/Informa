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
        _openAccordian,
        _equalHeight;

    _openAccordian = function(container){
        if(INFORMA.global.device.viewportN === 2) {
            var _tiles = container.find('.panel-default');

            _tiles.each(function(key, value) {
                if(key < 2) {
                    jQuery(this).find('.panel-heading').removeClass('collapsed');
                } else {
                    jQuery(this).find('.collapse').collapse('hide');
                    
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
    
    _equalHeight = function () {
        var EachView = jQuery('#contactus-section');
        EachView.each(function () {
            var Items = jQuery(this).find('.panel-default'),
                _maxHeight = 0;
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight);
        })
    }

    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
             _equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());
