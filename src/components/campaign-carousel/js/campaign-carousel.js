var INFORMA = window.INFORMA || {};
INFORMA.campaignCarousel = (function (window, $, namespace) {
    'use strict';
    //variables
    let init,
        _slideimage = $(".inf-slider-section .campaign-carousel.twitter-carousel .inf-slider-image img"),
        _slider = $(".inf-slider-section .campaign-carousel.twitter-carousel"),
        imageheight = 0,
        //methods
        _getImageHeight;

    _getImageHeight = function (e) {
        if (_slideimage.length > 0) {
            _slideimage.each(function () {
                var newimageheight = $(this).height();
                if (newimageheight > imageheight) {
                    imageheight = newimageheight;
                }

            });

            _slider.on('setPosition', function (event, slick) {
                slick.$slides.css('height', imageheight + 'px');
            });

        }

    }

    init = function () {
        _getImageHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.campaignCarousel.init());