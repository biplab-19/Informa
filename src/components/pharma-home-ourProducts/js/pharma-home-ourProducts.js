/*
 * pharma-home-ourProductsl.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-3
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */



 var INFORMA = window.INFORMA || {};
 INFORMA.pharma_home_products = (function(window, $, namespace) {
     'use strict';
     //variables
     var _pharma_home_products = $('#Pharma-ourproducts'),
         _productsList = _pharma_home_products.find('.products-carousel'),
     // methods
         init,
         _closeNews,
         _createSlider;
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
                             slidesToShow: 3,
                             slidesToScroll: 3
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
         }

     init = function() {
         if (_productsList.length > 0) {
             _createSlider(_productsList);
         }
     }

     return {
         init: init
     }
 }(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
 jQuery(INFORMA.pharma_home_products.init());
