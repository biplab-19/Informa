var INFORMA = window.INFORMA || {};
INFORMA.videoBackground = (function(window, $, namespace) {
    'use strict';

    var _iFrameElement = $('.hero-banner .videoBG iframe'),
        init,
        _urlType,
        _urlSrc,
        _urlSrcOptions,
        _addOptions;

    _addOptions = function() {
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');
            _urlSrc = $(this).attr('src');
            if (_urlType == "youtube") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=1&controls=0&showinfo=0";
            } else if (_urlType == "vimeo") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=true";
            } else if (_urlType == "wistia") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop";
            }
            $(this).attr('src', _urlSrcOptions);
        });

    }

    init = function() {
        _addOptions();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBackground.init());
