var INFORMA = window.INFORMA || {};
INFORMA.videoBackground = (function(window, $, namespace) {
    'use strict';

    var _iFrameElement = $('.hero-banner .videoBG'),
        init,
        _urlType,
        _urlSrc,
        _urlSrcOptions,
        _youTubeId,
        _wistiaId,
        _vimeoId,
        _wistiaUrl,
        _vimeoUrl,
        ytPlayer,
        _addOptions;

    _addOptions = function() {
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');

            if (_urlType == "youtube") {

                _youTubeId = $(this).attr('data-videoid');

                var playerYTElement = document.createElement('div');
                playerYTElement.id = "youtubePlayer";
                $(this).append(playerYTElement);


            } else if (_urlType == "vimeo") {

                _vimeoUrl = $(this).attr('data-videourl')
                _vimeoId = $(this).attr('data-videoid');

                var playerVMElement = document.createElement('div');
                playerVMElement.id = "vimeoPlayer";
                $(this).append(playerVMElement);

                var options = {
                  id: _vimeoId,
                  autoplay: true,
                  loop: true
                };

                var vimeoPlayer = new Vimeo.Player('vimeoPlayer', options);
                vimeoPlayer.setVolume(0);

            } else if (_urlType == "wistia") {

                _wistiaUrl = $(this).attr('data-videourl')
                _wistiaId = $(this).attr('data-videoid');

                var iframeWSElement = document.createElement('iframe');
                iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=0";
                $(this).append(iframeWSElement);

            }
            /*_urlSrc = $(this).attr('src');
            _urlSrcOptions = _urlSrc;

            if (_urlType == "youtube") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=1&controls=0&showinfo=0&enablejsapi=1";
            } else if (_urlType == "vimeo") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=true&setVolume=0";
            } else if (_urlType == "wistia") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=0";
            }

            $(this).attr('src', _urlSrcOptions);*/
        });

    }

    window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player('youtubePlayer', {
            videoId: _youTubeId,
            playerVars: {
                'modestbranding': 1,
                'autoplay': 1,
                'controls': 0,
                'loop': 1,
                'playlist': _youTubeId,
                'showinfo': 0
            },

            events: {
                'onReady': onYTPlayerReady
            }
        });
    };

    function onYTPlayerReady(event) {
        event.target.playVideo();
        event.target.setVolume(0);
    }

    init = function() {
        _addOptions();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBackground.init());
