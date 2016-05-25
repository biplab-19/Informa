/*
 * Product Results.js
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
INFORMA.productListResults = (function(window, $, namespace) {
    'use strict';
    //variables
    var _productList = $('.product-finder-results'),
        _hoverItem = _productList.find('.front .header'),
    // methods
        init,
        _equalHeight;

    _equalHeight = function(container){
        var _itemsList = container.find('.product-finder-list'),
            _maxHeight = 0,
            _padding = 20;

        _itemsList.each(function() {
            var currentHeight = jQuery(this).height();
            if(currentHeight > _maxHeight){
                _maxHeight = currentHeight;
            }
        })
        _itemsList.css('height',_maxHeight+_padding);
    }

    _hoverItem.hover(function(){
        jQuery(this).parents('.product-finder-container').addClass('flip');
    })

    init = function() {
        if (_productList.length > 0) {
            _equalHeight(_productList);
        }
    };
    //Resize
    $(window).resize(function(){
       if (_productList.length > 0) {
            _equalHeight(_productList);
        }
    });
    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.productListResults.init());
