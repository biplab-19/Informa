/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _brandList = $('#product-brands-list-section, #related-products-section'),
    // methods
        init,
        _bindShowMore,
        _equalHeight;
    _equalHeight = function(container) {
        var captionItems = container.find('.caption'),
            maxHeight = 0;

        captionItems.each(function() {
            var height = jQuery(this).height();
            if(height > maxHeight) {
                maxHeight = height;
            }
        })
        if(INFORMA.global.device.viewportN !== 2) {
            captionItems.css('height', maxHeight);
        } else {
            captionItems.css('height', 'auto');
        }
    }

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.product-brands-list .view-all-mobile-container');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp === 2) {// This is mobile, toggle everything except first twbs-font-path

              //$('.product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading').show();
              $(this).prev().find(".col-xs-12 ").show();
              $(this).hide();
            }
        });
    }

    init = function() {
        if (_brandList.length > 0) {
            _equalHeight(_brandList);
            _bindShowMore(_brandList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());

INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    var DynamicBrandList = $('.product-brands-list'),
        init, HideOnLoad, _equalHeight, ClickEvents,
        Count = 1,
        BtnShowMore = DynamicBrandList.find('.btn-showMore');

    _equalHeight = function(container) {
        var captionItems = container.find('.caption'),
            maxHeight = 0,
            padding = 50;

        captionItems.each(function() {
            var height = jQuery(this).height();
            if(height > maxHeight) {
                maxHeight = height;
            }
        })
        if(INFORMA.global.device.viewportN !== 2) {
            captionItems.css('height', maxHeight + padding);
        } else {
            captionItems.css('height', 'auto');
        }
    }

    init = function () {
        if(DynamicBrandList.length > 0) {
            _equalHeight(DynamicBrandList);
        }
    }

     return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());