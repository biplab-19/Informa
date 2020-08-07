var INFORMA = window.INFORMA || {};
INFORMA.videoFull = (function (window, $, namespace) {
    'use strict';
    //variables
    var _videoWrapper = $(".video-full-container .video-img,.video-full-container .play-icon,.video-full-container h1"),
        thumbnailImage = "./Static/images/video/video-thumb-default.png",
        isMute,
        // methods
        vimeoIframeAPIReady,
        init,
        video,
        _playFullVideo;

    _playFullVideo = function () {
        _videoWrapper.click(function (ele) {
            var videoImg = $(this).parent().find('img'),
                videoType = videoImg.attr('data-videotype'),
                videoUrl = videoImg.attr('data-videourl'),
                videoAutoplay = videoImg.attr('data-videoautoplay'),
                videoControl = videoImg.attr('data-videocontrol'),
                videovolume = videoImg.attr('data-volume'),
                videoid = videoImg.attr("id");
            if (videoAutoplay == "false") {
                videoAutoplay = 1;
                switch (videoControl) {
                    case "true":
                        videoControl = 1;
                        break;
                    case "false":
                        videoControl = 0;
                        break;
                    default:
                        videoControl = 0;
                        break;

                }
                switch (videoType) {
                    case "youtube":
                        video = '<iframe id=' + videoid + '  width="100%" src="' + videoUrl + '?enablejsapi=1&autoplay=' + videoAutoplay + '&controls=' + videoControl + ' " frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
                        break;
                    case "vimeo":
                        video = '<iframe id=' + videoid + ' width="100%"  src="' + videoUrl + '?api=1&player_id=vmplayer&autoplay=' + videoAutoplay + '&controls=' + videoControl + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
                        break;
                    case "wistia":
                        video = '<iframe id=' + videoid + ' width="100%" height="' + videoImg.attr('height') + '" src="' + videoUrl + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
                        break;
                    default:
                        video = '<iframe id=' + videoid + ' width="100%" src="' + videoUrl + '?enablejsapi=1&autoplay=' + videoAutoplay + '&controls=' + videoControl + ' " frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
                        break;
                }

                videoImg.replaceWith(video);
                if (videoType == "youtube" || videoType == " " || videoType == undefined || videoType == null) {
                    var tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName("script")[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    onYouTubeIframeAPIReady(videoid, videovolume);
                }
                if (videoType == "vimeo") {
                    
                var tag = document.createElement("script");
                tag.src = "https://player.vimeo.com/api/player.js";
                var firstScriptTag = document.getElementsByTagName("script")[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    vimeoIframeAPIReady(videoid, videovolume / 100);
                }
                ele.target.remove();
            }

        });
    }
   
    function vimeoIframeAPIReady(id, volume) {
        setTimeout(function () {
            var video = document.getElementById(id);
            //Create a new Vimeo.Player object
            var player = new Vimeo.Player(video);
            //When the player is ready, set the volume to 0
            player.ready().then(function () {
                player.setVolume(volume);
            });
        }, 1000);
    }

    window.onYouTubeIframeAPIReady = function () {
        setTimeout(function () {
            var isvideo = $(".embed-responsive").hasClass("isvideo");
            if (isvideo) {
                var id = $(".isvideo").attr("data-id"),
                    volume = $(".isvideo").attr("data-volume"),
                    player,
                    player = new YT.Player(id, {
                        events: {
                            onReady: function (e) {
                                e.target.setVolume(volume);
                            },
                        }
                    });
            }
        }, 1000);
    }

    $(window).scroll(function() {
        $(".embed-responsive img").each(function () {
            var thumbnail = $(this).attr("src"),
            videoType = $(this).attr('data-videotype'),
            videoUrl = $(this).attr('data-videourl'),
            videoAutoplay = $(this).attr('data-videoautoplay'),
            videoControl = $(this).attr('data-videocontrol'),
            videovolume = $(this).attr('data-volume'),
            videoid = $(this).attr("id"),
            videofsetop=$(this).offset().top,
            windowscroll = window.scrollY;
            console.log(videofsetop);
            console.log(windowscroll);
            if ((videoAutoplay == "true") && (windowscroll>(videofsetop - 300)))  {
                if (thumbnail == "" || thumbnail == undefined || thumbnail == null) {
                    $(this).attr("src", thumbnailImage);
                }
                $(this).parent(".embed-responsive").attr("data-id", videoid);
                $(this).parent(".embed-responsive").attr("data-volume", videovolume);
                $(this).parent(".embed-responsive").attr("data-videoautoplay", videoAutoplay);
                $(this).parent(".embed-responsive").addClass("isvideo");
                videoAutoplay = 1;
                switch (videoControl) {
                    case "true":
                        videoControl = 1;
                        break;
                    case "false":
                        videoControl = 0;
                        break;
                    default:
                        videoControl = 0;
                        break;
                }
                switch (videoType) {
                    case "youtube":
                        video = '<iframe id=' + videoid + '  width="100%" src="' + videoUrl + '?enablejsapi=1&autoplay=' + videoAutoplay + '&controls=' + videoControl + ' " frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
                        break;
                    case "vimeo":
                        video = '<iframe id=' + videoid + ' width="100%"  src="' + videoUrl + '?api=1&player_id=vmplayer&autoplay=' + videoAutoplay + '&controls=' + videoControl + '" frameborder="0" allow="autoplay" allowfullscreen></iframe>';
                        break;
                    case "wistia":
                        video = '<iframe id=' + videoid + ' width="100%" height="' + videoImg.attr('height') + '" src="' + videoUrl + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
                        break;
                    default:
                        video = '<iframe id=' + videoid + ' width="100%" src="' + videoUrl + '?enablejsapi=1&autoplay=' + videoAutoplay + '&controls=' + videoControl + ' " frameborder="0" allowfullscreen allow="autoplay" ></iframe>';
                        break;
                }
                $(this).replaceWith(video);
                if (videoType == "youtube" || videoType == " " || videoType == undefined) {
                    var tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName("script")[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
                }
                if (videoType == "vimeo") {
                    var tag = document.createElement("script");
                    tag.src = "https://player.vimeo.com/api/player.js";
                    var firstScriptTag = document.getElementsByTagName("script")[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    vimeoIframeAPIReady(videoid, videovolume / 100);
                }
            }
        });
        
    });

    $(".embed-responsive img").each(function () {
        var thumbnail = $(this).attr("src");
        if (thumbnail == "" || thumbnail == undefined || thumbnail == null) {
                $(this).attr("src", thumbnailImage);
            }
        });
    init = function () {
        _playFullVideo();
    }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoFull.init());
