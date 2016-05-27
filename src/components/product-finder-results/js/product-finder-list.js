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
        _productListItems = _productList.find('.product-finder-list'),
        _productListContainer = _productListItems.find('.product-finder-container'),
        _hoverFrontHeader = _productList.find('.front .header'),
        _backElement = _productList.find('.back'),
        _combineElement = _productList.find('.front .header, .back'),
        _pinElement = _productList.find('.pin'),
        _showMore = _productList.find('.btn-ShowMore'),
    // methods
        init,
        _equalHeight;

    _equalHeight = function(container){
        var _itemsList = container.find('.product-finder-list'),
            _maxHeight = 0,
            _padding = 10;

        _itemsList.each(function() {
            var currentHeight = jQuery(this).height();
            if(currentHeight > _maxHeight){
                _maxHeight = currentHeight;
            }
        })
        _itemsList.css('height',_maxHeight+_padding);
        if(INFORMA.global.device.viewportN === 2) {
            _itemsList.css('height','auto');
        }
    }

    if(INFORMA.global.device.viewportN === 0) {
        _hoverFrontHeader.mouseenter(function(){
            var _container =jQuery(this).parents('.product-finder-container');
            if(_container.hasClass('un-pinned')) {
                _container.addClass('flip');
            }
        });

        _backElement.mouseleave(function(){
            var _container =jQuery(this).parents('.product-finder-container');
            if(_container.hasClass('un-pinned')) {
                _container.removeClass('flip');
            }
        });
    } else {
        _combineElement.hover(function(){
            var _container =jQuery(this).parents('.product-finder-container');
            if(_container.hasClass('un-pinned')) {
                _container.addClass('flip');
            }
        }, function() {
            var _container =jQuery(this).parents('.product-finder-container');
            if(_container.hasClass('un-pinned')) {
                _container.removeClass('flip');
            }
        });
    }

    _pinElement.click(function() {
        jQuery(this).parents('.product-finder-container').toggleClass('un-pinned');
    })

    _showMore.click(function() {
        jQuery(this).parents('.product-finder-results').toggleClass('all-shown');
        jQuery(this).parents('.product-finder-results').find('.product-finder-list:nth-child(n+4)').slideToggle();
    })

     //Resize
    $(window).resize(function(){
       if (_productList.length > 0) {
            _equalHeight(_productList);
        }
    });

    init = function() {
        if (_productList.length > 0) {
            $(document).ready(function() {
                 _equalHeight(_productList);
            });
        }
    };
    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.productListResults.init());
