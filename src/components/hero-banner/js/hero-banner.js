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
        _heroBannerFull = $('.hero-banner-texture,.hero-banner'),
        _heroBannerImage = $('.hero-banner-texture .cf-img,.hero-banner .cf-img'),
        _heroBannerTexture = $('.hero-banner-texture').not('.sample-content-banner, .product, .key-acocunt-landing-section'),
        _heroBannerSg = $('.hero-banner-texture.product.supergraphic'),

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
        _pauseAllYoutubeVideos,
        _pauseAllVimeoVideos,
        resizeHeroBanner,
        resizeHeroSG,
        updateBannerHeightOnMobile,
        stripEmptyTags;
       

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

            if(container.data('rtl') !== undefined) {
              _rtl = container.data('rtl');
            }

            if (INFORMA.global.siteCore.isExperience) {
               _autoplay = false;
               _infinite = false;
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
               dots: (_dots != null || _dots != undefined) ? _dots : true,
               swipe: INFORMA.global.device.isDesktop ? false : true
           });
        };

        _heroBannerList.on('init', function(event, slick){
            var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
               
            _iFrameElement.each(function(i, e) {
                
                _urlType = $(this).attr('data-videotype');

                if (_urlType === "youtube") {

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

                } else if (_urlType === "vimeo") {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
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
                    if (INFORMA.global.device.viewportN === 2 ) {
                      $('.videoBG_wrapper').css('height', '80%');
                      $('.block-centered').css('transform','translateY(-40%)');
                    }
                    if (INFORMA.global.device.viewportN === 1) {
                      $('section.hero-banner').addClass('vimeo-video-banner');
                      $('.videoBG_wrapper').css('height', '80%');
                      $('.block-centered').css('transform','translateY(-25%)');
                    }
                } else if (_urlType === "wistia") {

                    _wistiaUrl = $(this).attr('data-videourl')
                    _wistiaId = $(this).attr('data-videoid');
                    _wistiaSound = $(this).attr('data-videosound');

                    var iframeWSElement = document.createElement('iframe');
                    iframeWSElement.id = "wistiaEmbed" + i,
                    iframeWSElement.class = "wistia_embed",
                    iframeWSElement.name = "wistia_embed";
                    iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                    $(this).append(iframeWSElement);
                    var wistiaOptions = {
                      id: _wistiaId
                    };
                    wistiaPlayers.push(wistiaOptions);
                    if (INFORMA.global.device.viewportN === 1 || INFORMA.global.device.viewportN === 2 ) {
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
                    if (_urlType === "youtube") {
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
                vimeoCount = 0;
                $.each(vimeoPlayers, function(key, value) {
                    vimeoCount++;
                    var player = value;
                    player.ready().then(function() {
                        player.pause();
                        player.setVolume(_vimeoSound);
                        if(vimeoPlayers.length === vimeoCount) {
                            $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                            setTimeout(function(){
                                _heroBannerList.find('.hero-items.slick-active .videoBG iframe').css('display','block');
                            },100)
                            if(_heroBannerList.find('.hero-items .videoBG').attr('data-videotype') ==='vimeo') { 
                                var VimeoId = _heroBannerList.find('.hero-items .videoBG iframe').parent()[0].id;
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
            if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                event.target.pauseVideo();
                event.target.setVolume(_youTubeSound);
                playCount++;
                if(ytPlayers.length === playCount) {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                        if(_heroBannerList.find('.videoBG').attr('data-videotype') ==='youtube') {
                            var ytubeId = _heroBannerList.find('.videoBG iframe')[0].id;
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
            if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                var video = slick.$slides[currentSlide].getElementsByClassName('videoBG'),
                   _urlType = $(event.target).find('.slick-active .videoBG').attr('data-videotype');
                if(video.length > 0){
                    if(_urlType === 'youtube'){
                        var allYoutubeId = $(slick.$slides[currentSlide].getElementsByTagName('iframe')).parent();                        
                        _pauseAllYoutubeVideos(allYoutubeId);
                        var ytubeId = slick.$slides[currentSlide].getElementsByTagName('iframe')[0].id;
                        for(var i=0; i<ytPlayers.length;i++){
                            if(ytPlayers[i].a.id === ytubeId ){
                                ytPlayers[i].playVideo();
                            }
                        }    
                    }
                    else if(_urlType === 'vimeo'){
                        var allVimeoId = $(slick.$slides[currentSlide].getElementsByTagName('iframe')).parent();                        
                        _pauseAllVimeoVideos(allVimeoId);
                        
                        var vimeoId = $(slick.$slides[currentSlide].getElementsByTagName('iframe')).parent()[0].id
                        for(var j=0; j<vimeoPlayers.length;j++){
                            if(vimeoPlayers[j].element.parentElement.id === vimeoId){
                                vimeoPlayers[j].play();
                            }
                        } 
                    }
                }
                
           }   
        });
        _pauseAllYoutubeVideos = function(allVideoId){            
            
            for (var k = 0; k < allVideoId.length; k++) {
                var vId = allVideoId[k].id;
                for (var i = 0; i < ytPlayers.length; i++){
                    try {
                        if (ytPlayers[i].element.parentElement.id === vId) {
                            ytPlayers[i].pauseVideo();
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                }                 
            }
          
        },
        _pauseAllVimeoVideos = function(allVideoId){            
            
           for (var k = 0; k < allVideoId.length; k++) {
                var vId = allVideoId[k].id;
               for (var j = 0; j < vimeoPlayers.length; j++) {
                   try {
                       if (vimeoPlayers[j].element.parentElement.id === vId) {
                           vimeoPlayers[j].pause();
                       }
                   }
                   catch (err) {
                       console.log(err)
                   }
                }
            }
        },


        resizeHeroBanner = function(){
          var textEls;
          if(_heroBannerTexture.length > 0){
              textEls = _heroBannerTexture.find('.h1-styles, .subtext, .description');
                if ($(window).width() > 1360) {
                    var width = _heroBannerFull.width() - _heroBannerImage.width();
                    var innerWidth = (_heroBannerFull.width() - 1172)/2;
                    var finalWidth = (width - innerWidth) - 15;
                    textEls.css({
                        'width' : finalWidth
                    })
                }  
                else{
                    textEls.css('width','auto');
                }
            }
        },

        resizeHeroSG = function(){
            var secondCol;
            if (_heroBannerSg.length > 0) {
                if (INFORMA.global.device.viewport === "mobile") {
                    secondCol = _heroBannerSg.children('.container').children('.row').children('div').eq(1);
                    if(_heroBannerImage.legth >0) {
                        _heroBannerImage.css('top', secondCol[0].offsetTop);
                        _heroBannerImage.css('height', secondCol.height());
                    }
                } else {
                    if(_heroBannerImage.legth >0) {
                        _heroBannerImage.css('top', '');
                        _heroBannerImage.css('height', '');
                    }
                }
                _heroBannerImage.addClass('ready');
                
            }
        },

        stripEmptyTags = function($contentContainer) {
            $contentContainer.find('h1, h2, h3, p, span').each(function() {
                var $this = $(this);
                // if empty tag found, strip it and run again to address nested empty tags
                if ($this.html().length === 0) {
                    $this.remove();
                    stripEmptyTags($contentContainer);
                    return false;
                }
            });
        }

        updateBannerHeightOnMobile = function() {
            if(_heroBannerFull.length > 0){
                if(INFORMA.global.device.viewport === "mobile") {
                    _heroBannerFull.each(function () {
                        var $this = $(this),
                            isVideo = $this.hasClass('hero-banner-video'),
                            $contentContainer = isVideo ? $this.find('.videoBG') : $this.find('.container'),
                            imageHeight = $this.find('.key-logo-img-mobile'),
                            height;

                        // strip out empty content tags for newco 
                        // ideally for all but limiting enexpected consequences for other verts
                        // TODO: move to newco-header.js? but here to avoid to ensure correct order
                        if ($("#IsNewCoTemplateEnabled").val() == "True")
                            stripEmptyTags($contentContainer);

                        // apply height of content to banner
                        height = $contentContainer.innerHeight() + (imageHeight.length > 0 ? imageHeight.height() : 0);
                        $this.height(height);
                    });
                }
            }
        },

        init = function() {
            if (_videoElem.length > 0) {
               _bindIframe();
            }
            var animatedText = $('.animatedText ').val();
            if(animatedText){
                var title = animatedText.split(',');
                $(".typed-text-primary").typed({
                    strings: title,
                    typeSpeed: 50,
                    backDelay: 1200,
                    loop: true,
                    cursorChar: "",
                });
            }
           
            if (_heroBannerList.length > 0) {
                _createSlider(_heroBannerList);
                if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                    if($('.hero-banner-carousel .videoBG').length>0){
                        $('.hero-banner-carousel .slick-next, .hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                    }
                }    
            }
            resizeHeroBanner();
            resizeHeroSG();
            $(window).on("load", function() {
                updateBannerHeightOnMobile();
            });
           
            $(document).ready(function () {

                if ($(".single-image .hero-items .hero-cf-image").length == 0) {
                    $(".single-image .hero-items .vertical-align").addClass("empty-banner-image");
                }
            });

            $(window).on("resize", function() {
                updateBannerHeightOnMobile();
                if(_heroBannerFull.length > 0){
                    resizeHeroBanner();
                    resizeHeroSG();
               }
            });

        };

        return {
            init: init
        };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.heroBanner.init());

