var INFORMA = window.INFORMA || {};
INFORMA.articleTileView = (function (window, $, namespace) {
  "use strict";

  $(".carousel-container").slick({
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    loop: false,
  });

  $(".pc-body.Podcastslist .podcast-recoderbutton").click(function () {
   $(this).parent(".podcast-recoder").hide();
   $(this).parent(".podcast-recoder").siblings(".carousel-section").show();

  });

  $(".btn-Podcasts").click(function () {
    $(this).closest(".pc-body").next("div").addClass("demo");
  });

  $("button#carouselbutton").click(function () {
    $(this).closest(".demo").removeClass("demo");
  });

  $("._brexitstyle .carousel-container a.brexit-list").click(function () {
    var hiddenValue = $(this).find("input[type=hidden]:first").val();
    if (hiddenValue != undefined && hiddenValue != null && hiddenValue != "") {
      if (hiddenValue.includes("soundcloud.com")) {
        // $(".podcastimagechild").find("iframe").attr("src", hiddenValue);
        // $("._brexitstyle .carousel-section").hide();
        // $(".podcast-recoder").show();
        $(this).siblings(".podcastimages").children(".podcastimagechild").find("iframe").attr("src", hiddenValue);
        $(this).parent(".podcast-recoder").siblings(".carousel-section").hide();
        $(this).parent(".podcast-recoder").show();
      } else {
        window.open(hiddenValue);
        // $(".podcast-recoder").hide();
        // $("._brexitstyle .carousel-section").show();
        $(this).parent(".podcast-recoder").hide();
        $(this).parent(".podcast-recoder").siblings(".carousel-section").show();
      }
    } else {
      window.open(hiddenValue);
      // $(".podcast-recoder").hide();
      // $("._brexitstyle .carousel-section").show();
        $(this).parent(".podcast-recoder").hide();
        $(this).parent(".podcast-recoder").siblings(".carousel-section").show();
    }
  });

  init = function () {};

  return {
    init: init,
  };
})(this, ($INFORMA = jQuery.noConflict()), "INFORMA");
jQuery(INFORMA.articleTileView.init());
