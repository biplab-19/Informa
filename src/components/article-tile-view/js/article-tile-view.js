var INFORMA = window.INFORMA || {};
INFORMA.articleTileView = (function (window, $, namespace) {
    'use strict';

    // $(".owl-carousel").owlCarousel({
    //     loop: false,
    //     autoplay: false,
    //     items: 1,
    //     nav: true,
    //     autoplayHoverPause: true,
    //     animateOut: 'slideOutDown',
    //     animateIn: 'slideInUp',
    //     margin: 10,
    //     mouseDrag: false,
    //     navText: ["<span class='fas fa-angle-up'></span>", "<span class='fas fa-angle-down'></span>"],
    // });

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

    $("._brexitstyle .owl-carousel a.brexit-list").click(function () {
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