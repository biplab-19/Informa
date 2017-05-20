/*
 * Hero Video.js
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
INFORMA.heroBanner = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoElem = $('img[data-video]'),
        _heroBannerList = $('.hero-banner-carousel .slider-component'),
    // methods
        init,
        _bindIframe,
        _createSlider,
        _playPauseVideo,
        _urlType,
        _youTubeId,
        _wistiaId,
        _vimeoId,
        _wistiaUrl,
        _vimeoUrl,
        ytPlayer,
        _youTubeSound,
        _wistiaSound,
        _vimeoSound,
        currentPlayer;
       

    _bindIframe = function(){
        var videoUrl = _videoElem.data('video');
        _videoElem.parent().html('<iframe width="100%" height="auto" src="'+videoUrl+'" frameborder="0" allowfullscreen volume="0"></iframe>');

    };
     _createSlider = function(container){
        var _slideCount = 1,//container.data('itemsperframe'), Evil laugh when the author tries to change config,
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = Boolean(container.data('dots')),
            _rtl;

            if(container.data('rtl') != undefined) {
              _rtl = container.data('rtl');
            }

            if (INFORMA.global.siteCore.isExperience) {
               _autoplay = false;
               _infinite = false;
            }
            if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    debugger;
                    var $slickList = container.find('.slick-list');

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
               dots: (_dots!==null || _dots!==undefined) ? _dots : true,
               swipe: INFORMA.global.device.isDesktop ? false : true
           });
        };
        _heroBannerList.on('init', function(event, slick){
            var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
            // var index= $('.hero-banner-carousel .slick-slide.slick-active').attr('data-slick-index');
             _iFrameElement.each(function(i, e) {
                _urlType = $(this).attr('data-videotype');

                if (_urlType == "youtube") {

                    _youTubeId = $(this).attr('data-videoid');
                    _youTubeSound = $(this).attr('data-videosound');

                    var playerYTElement = document.createElement('div');
                    playerYTElement.id = "youtubePlayer"+i;
                    $(this).append(playerYTElement);

                    var scriptTag = document.createElement('script');
                    scriptTag.src = "https://www.youtube.com/iframe_api";

                    var ytTag = document.getElementById('youtubePlayer'+i);
                    var node = ytTag.parentNode.insertBefore(scriptTag, ytTag.nextSibling);
                    $(this).append(node);

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

                    var vimeoPlayer = new Vimeo.Player('vimeoPlayer'+i, options);
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
        });
        if(_heroBannerList.length > 0){
            window.onYouTubeIframeAPIReady = function(){
                var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
                _iFrameElement.each(function(i, e) {
                    _youTubeId = $(this).attr('data-videoid');
                     _youTubeSound = $(this).attr('data-videosound');
                    var id = document.getElementById('youtubePlayer'+i);
                    ytPlayer = new YT.Player(id, {
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
                            'onReady': onCarouselYTPlayerReady
                        }
                    });
                });
            }    
        }

        function onCarouselYTPlayerReady(event) {
            if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
                event.target.playVideo();
                event.target.setVolume(_youTubeSound);
            }
        }

       _heroBannerList.on('afterChange', function(event, slick, currentSlide, nextSlide){
            ytPlayer.pauseVideo();
            if(slick.$slides[currentSlide]){
                ytPlayer.playVideo();
            }
        });

        init = function() {
            if (_videoElem.length > 0) {
               _bindIframe();
            }
            if (_heroBannerList.length > 0) {
                _createSlider(_heroBannerList);
                 // _playPauseVideo();
            }
        };

        return {
            init: init
        };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.heroBanner.init());
