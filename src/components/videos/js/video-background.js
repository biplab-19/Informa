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
        _youTubeSound,
        _wistiaSound,
        _vimeoSound,
        _addOptions,
        _setHeroVideoHeight,
        _heroBannerList = $('.hero-banner-carousel .slider-component');
    _setHeroVideoHeight = function(){
      var videoBGContainer = $('.hero-banner').find('.videoBG');
      if(videoBGContainer.length > 0){
        $('.hero-banner').addClass('hero-banner-video');
      }else{
        $('.hero-banner').removeClass('hero-banner-video');
      }

    }
    _addOptions = function() {
        
        //$('.videoBG_wrapper').parent().css( "height", "auto" );
        if(_heroBannerList.length == 0){
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');

            if (_urlType == "youtube") {

                _youTubeId = $(this).attr('data-videoid');
                _youTubeSound = $(this).attr('data-videosound');

                var playerYTElement = document.createElement('div');
                playerYTElement.id = "youtubePlayer";
                $(this).append(playerYTElement);

                var scriptTag = document.createElement('script');
                scriptTag.src = "https://www.youtube.com/iframe_api";

                var ytTag = document.getElementById('youtubePlayer');
                ytTag.parentNode.insertBefore(scriptTag, ytTag.nextSibling);

            } else if (_urlType == "vimeo") {

                _vimeoUrl = $(this).attr('data-videourl')
                _vimeoId = $(this).attr('data-videoid');
                _vimeoSound = $(this).attr('data-videosound');

                var playerVMElement = document.createElement('div');
                playerVMElement.id = "vimeoPlayer";
                $(this).append(playerVMElement);

                var options = {
                  id: _vimeoId,
                  autoplay: true,
                  loop: true
                };

                var vimeoPlayer = new Vimeo.Player('vimeoPlayer', options);
                vimeoPlayer.setVolume(_vimeoSound);
                if (INFORMA.global.device.viewportN == 2 ) {
                  $('.videoBG_wrapper').css('height', '80%');
                  $('.block-centered').css('transform','translateY(-40%)');
                }
                if (INFORMA.global.device.viewportN == 1) {
                  $('section.hero-banner').addClass('vimeo-video-banner');
                  $('.videoBG_wrapper').css('height', '80%');
                  $('.block-centered').css('transform','translateY(-25%)');
                }
            } else if (_urlType == "wistia") {

                _wistiaUrl = $(this).attr('data-videourl')
                _wistiaId = $(this).attr('data-videoid');
                _wistiaSound = $(this).attr('data-videosound');

                var iframeWSElement = document.createElement('iframe');
                iframeWSElement.id = "wistiaEmbed",
                iframeWSElement.class = "wistia_embed",
                iframeWSElement.name = "wistia_embed";
                iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                $(this).append(iframeWSElement);

                  if (INFORMA.global.device.viewportN == 1 || INFORMA.global.device.viewportN == 2 ) {
                    var playButton = $(".videoBG_wrapper");
                    if(playButton.length > 0 ){
                      playButton.on("click", function() {
                            var wistiaEmbed = document.getElementById("wistiaEmbed").wistiaApi;
                                wistiaEmbed.play();
                      });
                    }
                  }
            }

        });
       } 

    }

    if(_heroBannerList.length == 0){
   window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player('youtubePlayer', {
            videoId: _youTubeId,
            playerVars: {
                'modestbranding': 0,
                'autoplay': 1,
                'controls': 1,
                'loop': 1,
                'wmode':'opaque',
                'playlist': _youTubeId,
                'showinfo': 0
            },

            events: {
                'onReady': onYTPlayerReady
            }
        });
    };
}
    function onYTPlayerReady(event) {
        if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
            event.target.playVideo();
            event.target.setVolume(_youTubeSound);
        }
    }

    init = function() {
        _addOptions();
      //  _setHeroVideoHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBackground.init());
