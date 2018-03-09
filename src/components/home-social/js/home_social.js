/*
 * twitter-feed.js
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
INFORMA.twitterFeed = (function(window, $, namespace) {
    'use strict';
    //variables
    var _twitterList = $('.twitter-carousel'),
    // methods
        init,
        _dots,
        _createSlider,
        _equalHeight;

    _equalHeight = function () {
        var items = _twitterList.find('.feed'),
            _vp = INFORMA.global.device.viewportN,
            maxHeight = 0;

            if(_vp === 0 || _vp === 1) {
                items.each(function () {
                    var Height = $(this).height();
                    if(Height > maxHeight) {
                        maxHeight = Height;
                    }
                })
                items.css('height', maxHeight);
            }

    }

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = Boolean(container.data('pagination')),
            _rtl;

            if(container.data('rtl') !== undefined) {
                _rtl = container.data('rtl');
            }
            //chk for sitecore preview
            // if (INFORMA.global.siteCore.isPreview) {
            //     _autoplay = true;
            // }
            // if (INFORMA.global.siteCore.isExperience) {
            //     _autoplay = false;
            //     _infinite = false;
            // }
            if(INFORMA.global.device.viewportN === 1){
                  _slideCount = 2;
            }
            else if (INFORMA.global.device.viewportN === 2){
                  _slideCount = 1;
                  _dots = true;
            }

            if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            dots: _dots,
            swipe: INFORMA.global.device.isDesktop ? false : true,
            adaptiveHeight: true
        });
    }

    init = function() {
        if (_twitterList.length > 0) {
            _createSlider(_twitterList);
            _equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.twitterFeed.init());
