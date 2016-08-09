/*
 * News Flash
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.news_flash = (function(window, $, namespace) {
    'use strict';
    //variables
    var _newsFlash = $('.newsFlash'),
        _newsList = _newsFlash.find('.news-carousel'),
    // methods
        init,
        _closeNews,
        _createSlider;
        _closeNews = function(){
          var closenews = $('#close-news');

           $('#close-news').on('click', function(){
		            $('.newsFlash').remove();
		        });
        }
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _slideCount = 1,
                _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = false;
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
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true
            });
        }

    init = function() {
        if (_newsList.length > 0) {
            _createSlider(_newsList);
        }
        _closeNews();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.news_flash.init());
