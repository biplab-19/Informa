/*
 * My recommendations-recommended products
 *
 *
 * @project:    Informa
 * @date:       2016-August-22
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedProductsItems = (function(window, $, namespace) {
    'use strict';
    //variables
    var _recommendedproducts = $('.recommended-products'),
        _productsList = _recommendedproducts.find('.recom-prod-carousel'),
    // methods
        init,
        _createSlider,
        EqualHeightProducts;

        EqualHeightProducts = function() {
            var Items = _recommendedproducts.find('.wrap-content'),
                MaxHeight = 0;
                _recommendedproducts.find('.list-items').height('auto');
                Items.height('auto');
                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);

        },
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _slideCount = container.data('itemsperframe'),
                _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = Boolean(container.data('pagination'));
                //chk for sitecore preview
                if (INFORMA.global.siteCore.isPreview) {
                    _autoplay = true;
                }
                if (INFORMA.global.siteCore.isExperience) {
                    _autoplay = false;
                    _infinite = false;
                }

            container.slick({
                infinite: _infinite,
                autoplay: _autoplay,
                autoplaySpeed: _duration,
                slidesToShow: _slideCount,
                slidesToScroll: _slideCount,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true,
                swipe: INFORMA.global.device.isDesktop ? false : true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },{
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                ]
            });
            EqualHeightProducts();
        }

    init = function() {
        if (_productsList.length > 0) {
            _createSlider(_productsList);
            $(window).on('load', function() {
                EqualHeightProducts();
            });
        }
    }

    return {
        init: init,
        CreateProductSlider: _createSlider
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedProductsItems.init());
