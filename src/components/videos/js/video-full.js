var INFORMA = window.INFORMA || {};
INFORMA.videoFull = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoFullWrapper = $('.video-full-container .video-img'),
        _videoPlayBtnWrapper = $('.video-full-container .play-icon'),
        video,
        // methods
        init,
        _playFullVideoWrapper,
        _playFullVideoBtnWrapper;

    _playFullVideoBtnWrapper = function() {
        _videoPlayBtnWrapper.click(function() {
            var videoImg = $(this).parent().find('img');
            if (videoImg.attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg .attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            videoImg.replaceWith(video);
            $(this).remove();
        });
    }

    _playFullVideoWrapper = function() {
        _videoFullWrapper.click(function() {

            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            $(this).replaceWith(video);
            function onYouTubePlayerAPIReady() {
                player = new YT.Player('video', {
                  autoplay: 1
                });
            }
            $('.play-icon').remove();
        });


    }

    init = function() {
        _playFullVideoWrapper();
        _playFullVideoBtnWrapper();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoFull.init());