var INFORMA = window.INFORMA || {};
INFORMA.articleTileView = (function (window, $, namespace) {
    'use strict';

    $('.carousel-container').slick({
        vertical: true,
        verticalSwiping: true,
    });

    $(".pc-body.Podcastslist #podcast-recoderbutton").click(function () {
        $(".podcast-recoder").hide();
        $("._brexitstyle .carousel-section").show();
    });

    $("#podcastsidbutton").click(function () {
        $("._brexitstyle #Podcastslistboxone").addClass("demo");
    });

    $("#podcastsidbuttontwo").click(function () {
        $("._brexitstyle #Podcastslistboxtwo").addClass("demo");
    });

    $("#podcastsidbuttonthree").click(function () {
        $("._brexitstyle #Podcastslistboxthree").addClass("demo");
    });

    $("button#carouselbutton").click(function () {
        $("._brexitstyle #Podcastslistboxone").removeClass("demo");
        $("._brexitstyle #Podcastslistboxtwo").removeClass("demo");
        $("._brexitstyle #Podcastslistboxthree").removeClass("demo");
    });

    $("._brexitstyle .carousel-container a.brexit-list").click(function () {
        $(".podcast-recoder").show();
        $("._brexitstyle .carousel-section").hide();
    });

    init = function () {
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleTileView.init());