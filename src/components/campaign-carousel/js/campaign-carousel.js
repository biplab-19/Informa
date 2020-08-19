var INFORMA = window.INFORMA || {};
INFORMA.campaigncarousel = (function (window, $, namespace) {
    'use strict';
    //variables
    var init,
        _container = $(".campaign-carousel"),
        _autoplay = _container.data('autorotate'),
        _dots = _container.data('pagination'),
        _slideCount = _container.data('itemsperframe'),
        _speed = _container.data('transitionspeed'),
        _duration = _container.data('slideduration'),
        _rtl;

    if(_container.data('rtl') !== undefined) {
        _rtl = _container.data('rtl');
    }

    if(_rtl === true && _autoplay === true) {
        _container.on('init', function() {
            window.setInterval(function() {
                _container.slick('slickPrev');
            }, _duration);
        });
    }

    init = function () {
        $(".campaign-carousel").slick({
            arrows: false,
            autoplay: _autoplay,
            dots: _dots,
            slidesToShow: _slideCount,
            speed: _speed,
            autoplaySpeed: _duration
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.campaigncarousel.init());