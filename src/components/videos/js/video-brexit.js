var INFORMA = window.INFORMA || {};
INFORMA.videoBrexit = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoFullWrapper = $('.video-full-container .video-img'),
        _videoPlayBtnWrapper = $('.video-full-container .play-icon'),
        _videoPlayTextWrapper = $('.video-full-container h1'),
        video,
        // methods
        init,
        _playFullVideoWrapper,
        _playFullVideoTextWrapper,
        _playFullVideoBtnWrapper;

    _playFullVideoBtnWrapper = function() {
        _videoPlayBtnWrapper.click(function() {
            setTimeout(function(){
                var videoImg = $(this).parent().find('img'),
                videoType = videoImg.attr('data-videotype');
                if (videoType == "youtube") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +' " frameborder="0" allowfullscreen  ></iframe>';
                } else if (videoType == "vimeo") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                } else if (videoType == "wistia") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoPlay=true&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                }
                videoImg.replaceWith(video);
                $(this).remove();
    
            },10);

        });
    }

    _playFullVideoWrapper = function() {
        _videoFullWrapper.click(function() {
            
                var videoType =$(this).attr('data-videotype');
                if (videoType == "youtube") {
                    video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                } else if (videoType == "vimeo") {
                    video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                } else if (videoType == "wistia") {
                    video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoPlay=true&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                }
                $(this).replaceWith(video);
                function onYouTubePlayerAPIReady() {
                   var player = new YT.Player('video', {
                      autoplay: 0,
                      controls: 0, 
                    });
                }
                $(this).parent().siblings('.play-icon').remove();
            


        });


    }

    _playFullVideoTextWrapper = function() {
        _videoPlayTextWrapper.click(function() {
            
                var videoImg = $(this).parent().find('h1').siblings("img"),
                videoType= $(this).parent().find('h1').siblings("img").attr('data-videotype');
                if (videoType == "youtube") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen  ></iframe>';
                } else if (videoType == "vimeo") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay='+ videoImg.attr('data-videoautoplay') +'&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                } else if (videoType == "wistia") {
                    video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoPlay=true&controls='+ videoImg.attr('data-videocontrol') +'" frameborder="0" allowfullscreen></iframe>';
                }
                videoImg.replaceWith(video);
                $(this).remove();
            


        });
    }
    init = function() {
        
        _playFullVideoWrapper();
        _playFullVideoBtnWrapper();
        _playFullVideoTextWrapper();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBrexit.init());
