var INFORMA = window.INFORMA || {};
INFORMA.videoFull = (function (window, $, namespace) {
    'use strict';
    //variables
    var _videoWrapper = $(".video-full-container .video-img,.video-full-container .play-icon,.video-full-container h1"),
        thumbnailImage = "cms-images/video-img/video-thumb-default.png",
        // methods
        init,
        video,
        _playFullVideo;

    _playFullVideo = function () {
        _videoWrapper.click(function (ele) {
            console.log(ele.target.localName);
            var videoImg = $(this).parent().find('img'),
                videoType = videoImg.attr('data-videotype'),
                videoUrl = videoImg.attr('data-videourl'),
                videoAutoplay = videoImg.attr('data-videoautoplay'),
                videoControl = videoImg.attr('data-videocontrol'),
                videoMuted = videoImg.attr('data-videomuted');


            if (videoAutoplay == "" || videoAutoplay == undefined) {
                videoAutoplay = 0;
            }
            if (videoControl == "" || videoControl == undefined) {
                videoControl = 0;
            }
            if (videoMuted == "" || videoMuted == undefined) {
                videoMuted = 0;
            }
            switch (videoType) {
                case "youtube":
                    video = '<iframe id="existing-iframe-example"  width="100%" src="' + videoUrl + '?autoplay=' + videoAutoplay + '&controls=' + videoControl + '&muted=' + videoMuted + '" frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
                    break;
                case "vimeo":
                    video = '<iframe width="100%" id="made-in-ny" src="' + videoUrl + '?autoplay=' + videoAutoplay + '&controls=' + videoControl + '&muted=' + videoMuted + '" frameborder="0" allowfullscreen></iframe>';
                    break;
                case "wistia":
                    video = '<iframe width="100%" height="' + videoImg.attr('height') + '" src="' + videoUrl + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
                    break;
                default:
                    video = '<iframe  width="100%" src="' + videoUrl + '?autoplay=' + videoAutoplay + '&controls=' + videoControl + '&muted=' + videoMuted + '" frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
            }
            videoImg.replaceWith(video);
            ele.target.remove();
        });
    }
    $(".embed-responsive").each(function () {
        var thumbnail = $(this).find("img").attr("src");
        if (thumbnail == "" || thumbnail == undefined) {
            $(this).find("img").attr("src", thumbnailImage);
        }
    });

    init = function () {
        _playFullVideo();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoFull.init());
