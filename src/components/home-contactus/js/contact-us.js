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
        _eachTile = _contactUs.find('.panel-heading'),
        _eachTileBtnMargin =_contactUs.find('.panel-body'),
    // methods
        init,
        _openAccordian,
        _marginBottomWrapperCta,
        _equalHeight;

        _marginBottomWrapperCta = function(){
          var _vp = INFORMA.global.device.viewportN;
           if(_vp === 0 || _vp === 1) {
          _eachTileBtnMargin.each(function(){
            var _tileBtnHeight = jQuery(this).find(".btn-container").outerHeight()-30;
            if(_tileBtnHeight>0){
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom',_tileBtnHeight+'px');
            }else{
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom','15px');
            }
          });
        }
      }

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

    _eachTile.on('click', function(a) {
     a.stopPropagation();
        if(jQuery(this).hasClass('collapsed')) {
            jQuery(this).removeClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('show');
        } else {
            jQuery(this).addClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('hide');
        }
    })

    _equalHeight = function () {
        var EachView = jQuery('#contactus-section'),
         _vp = INFORMA.global.device.viewportN;
         if(_vp === 0 || _vp === 1) {
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
    }

    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
             // _equalHeight();
             _marginBottomWrapperCta();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());
