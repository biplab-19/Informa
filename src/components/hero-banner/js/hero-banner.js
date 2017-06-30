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
        _heroBannerFull = $('.hero-banner-texture'),
        _heroBannerImage = $('.hero-banner-texture .cf-img'),

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
        ytPlayers=[],
        playCount = 0,
        vimeoCount = 0,
        vimeoPlayers=[],
        vimeoPlayer,
        wistiaPlayers=[],
        _pauseAllVideos,
        resizeHeroBanner;
       

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
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                    _vimeoUrl = $(this).attr('data-videourl')
                    _vimeoId = $(this).attr('data-videoid');
                    _vimeoSound = $(this).attr('data-videosound');

                    var playerVMElement = document.createElement('div');
                    playerVMElement.id = "vimeoPlayer"+i;
                    $(this).append(playerVMElement);
                    var id = document.getElementById('vimeoPlayer'+i);
                    var options = {
                      id: _vimeoId,
                      loop: true,
                      autoplay: true
                    };
                    vimeoPlayer = new Vimeo.Player(id, options);
                    vimeoPlayers.push(vimeoPlayer);
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
                    iframeWSElement.id = "wistiaEmbed" + i,
                    iframeWSElement.class = "wistia_embed",
                    iframeWSElement.name = "wistia_embed";
                    iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                    $(this).append(iframeWSElement);
                    var id = document.getElementById('wistiaEmbed'+i);
                    var options = {
                      id: _wistiaId
                    };
                    wistiaPlayers.push(options);
                    if (INFORMA.global.device.viewportN == 1 || INFORMA.global.device.viewportN == 2 ) {
                        var playButton = $(".videoBG_wrapper");
                        if(playButton.length > 0 ){
                          playButton.on("click", function() {
                                var wistiaEmbed = document.getElementById("wistiaEmbed"+i).wistiaApi;
                                    wistiaEmbed.play();
                          });
                        }
                    }
                }
            });
            onVimeoIframeAPIReady();
            //onWistiaIframeAPIReady();
        });

        if(_heroBannerList.length > 0){
            window.onYouTubeIframeAPIReady = function(){
                var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
                _iFrameElement.each(function(i, e) {
                    _urlType = $(this).attr('data-videotype');
                    if (_urlType == "youtube") {
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
                        ytPlayers.push(ytPlayer);
                    }  
                });
            }  
            window.onVimeoIframeAPIReady = function(){
                $.each(vimeoPlayers, function(key, value) {
                    var player = value;
                    player.ready().then(function() {
                        player.pause();
                        player.setVolume(_vimeoSound);
                        vimeoCount++;
                        if(vimeoPlayers.length == vimeoCount) {
                            $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                            setTimeout(function(){
                                _heroBannerList.find('.hero-items.slick-active .videoBG iframe').css('display','block');
                            },100)
                            if(_heroBannerList.find('.hero-items.slick-active .videoBG').attr('data-videotype') ==='vimeo') { 
                                var VimeoId = _heroBannerList.find('.hero-items.slick-active .videoBG iframe').parent()[0].id;
                                for(var i=0; i<vimeoPlayers.length;i++){
                                    if(vimeoPlayers[i].element.parentElement.id === VimeoId){
                                        vimeoPlayers[i].play();
                                    }
                                }
                            }
                        }
                        else {
                            $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                            _heroBannerList.find('.hero-items.slick-active .videoBG iframe').css('display','none');
                        }
                    });
                });
            }
            // window.onWistiaIframeAPIReady = function(){
            //    $.each(wistiaPlayers, function(key, value) {
            //    }); 
            // }
        }

        function onCarouselYTPlayerReady(event) {
            if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
                setTimeout(function(){
                    event.target.pauseVideo();
                    event.target.setVolume(_youTubeSound);
                },10)
                playCount++;
                if(ytPlayers.length == playCount) {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                        if(_heroBannerList.find('.hero-items.slick-active .videoBG').attr('data-videotype') ==='youtube') {
                            var ytubeId = _heroBannerList.find('.hero-items.slick-active .videoBG iframe')[0].id;
                            for(var i=0; i<ytPlayers.length;i++){
                                if(ytPlayers[i].a.id === ytubeId){
                                    ytPlayers[i].playVideo();
                                }
                            }
                        }
                } else {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                }
            }
        }
       
       _heroBannerList.on('afterChange', function(event, slick, currentSlide, nextSlide){
            if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
                var video = slick.$slides[currentSlide].getElementsByClassName('videoBG'),
                   _urlType = $(event.target).find('.slick-active .videoBG').attr('data-videotype');
                if(video.length > 0){
                    if(_urlType === 'youtube'){
                        _pauseAllVideos();
                        var ytubeId = slick.$slides[currentSlide].getElementsByTagName('iframe')[0].id;
                        for(var i=0; i<ytPlayers.length;i++){
                            if(ytPlayers[i].a.id === ytubeId ){
                                ytPlayers[i].playVideo();
                            }
                        }    
                    }
                    else if(_urlType === 'vimeo'){
                        _pauseAllVideos();
                        var VimeoId = $(slick.$slides[currentSlide].getElementsByTagName('iframe')).parent()[0].id
                        for(var i=0; i<vimeoPlayers.length;i++){
                            if(vimeoPlayers[i].element.parentElement.id === VimeoId){
                                vimeoPlayers[i].play();
                            }
                        } 
                    }
                }
                else{
                   _pauseAllVideos();
                } 
           }   
        });
        _pauseAllVideos = function(){
            for(var i=0; i<ytPlayers.length; i++){
                ytPlayers[i].pauseVideo();
            }    
            for(var i =0; i<vimeoPlayers.length; i++){
                vimeoPlayers[i].pause();
            }
        },

        resizeHeroBanner = function(){
            if ($(window).width() > 1360) {
                var width = _heroBannerFull.width() - _heroBannerImage.width();
                var innerWidth = (_heroBannerFull.width() - 1172)/2;
                var finalWidth = (width - innerWidth) - 15;
                $('.hero-banner-texture .h1-styles, .hero-banner-texture .subtext, .hero-banner-texture .description').css({
                    'width' : finalWidth
                })
            }  
            else{
                $('.hero-banner-texture .h1-styles,.hero-banner-texture .subtext, .hero-banner-texture .description').css('width','auto');
            }
        },

        init = function() {
            if (_videoElem.length > 0) {
               _bindIframe();
            }
            if (_heroBannerList.length > 0) {
                _createSlider(_heroBannerList);
                if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
                    if($('.hero-banner-carousel .videoBG').length>0){
                        $('.hero-banner-carousel .slick-next, .hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                    }
                }    
            }
            if(_heroBannerFull.length > 0){
                resizeHeroBanner();
                if(INFORMA.global.device.viewport === "mobile"){
                    var height = $('.hero-banner-texture .container').outerHeight();
                    $('.hero-banner-texture').height(height);
                }
            }

            $(window).on("resize", function() {
               if(_heroBannerFull.length > 0){
                    resizeHeroBanner();
               }
            });

        };

        return {
            init: init
        };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.heroBanner.init());

