var INFORMA = window.INFORMA || {};
INFORMA.articleTileView = (function (window, $, namespace) {
  "use strict";
  var _slidecount,
    init,
    nodecount,
    _carouselPrevWrapper,
    _carouselNextWrapper,
    _podcastRecorderWrapper,
    _podcastBtnWrapper,
    _carouselBtnWrapper,
    _brexitListWrapper,
    _cauoselSlideButton,
    _carouselContainer = $(".brexitstyle .carousel-container"),
    _carouselPrev = $('.brexitstyle .prev-slide'),
    _carouselNext = $('.brexitstyle .next-slide'),
    _podcastRecorder = $(".brexitstyle .pc-body.Podcastslist .podcast-recoderbutton"),
    _podcastBtn = $(".brexitstyle .btn-Podcasts"),
    _carouselBtn = $(".brexitstyle button#carouselbutton"),
    _brexitList = $(".brexitstyle .carousel-container .brexit-list");
  _carouselContainer.slick({
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    loop: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  });

  _carouselPrevWrapper = function () {
    _carouselPrev.click(function () {
      $(this).parents(".carousel-section").find(".carousel-container").slick('slickNext');
    });
  }

  _carouselNextWrapper = function () {
    _carouselNext.click(function () {
      $(this).parents(".carousel-section").find(".carousel-container").slick('slickPrev');
    });
  }

  _podcastRecorderWrapper = function () {
    _podcastRecorder.click(function () {
      $(this).parent(".podcast-recoder").hide();
      $(this).parent(".podcast-recoder").siblings(".carousel-section").show();
      $(this).parents(".carousel-section").show();
    });
  }

  _podcastBtnWrapper = function () {
    _podcastBtn.click(function () {
      $(this).closest(".pc-body").next("div").addClass("demo");
    });
  }

  _carouselBtnWrapper = function () {
    _carouselBtn.click(function () {
      $(this).closest(".demo").removeClass("demo");
    });
  }

  _brexitListWrapper = function () {
    _brexitList.click(function (ele) {
      var hiddenValue = $(this).find("input[type=hidden]:first").val(),
        hasbrexit = $(this).hasClass("brexit-list"),
        _carouselSection = $(this).parents(".carousel-section"),
        _carouselSectionSiblings = $(this).parents(".carousel-section").siblings(".podcast-recoder");
      if (hasbrexit) {
        if (hiddenValue != undefined && hiddenValue != null && hiddenValue != "") {
          if (hiddenValue.includes("soundcloud.com")) {
            _carouselSectionSiblings.show();
            _carouselSectionSiblings.find("iframe").attr("src", hiddenValue);
            _carouselSectionSiblings.find(".brexit-list").empty();
            _carouselSectionSiblings.find(".brexit-list").append(ele.delegateTarget.innerHTML);
            _carouselSection.hide();
          } else {
            window.open(hiddenValue);
            _carouselSectionSiblings.hide();
            _carouselSection.show();
          }
        } else {
          window.open(hiddenValue);
          _carouselSectionSiblings.hide();
          _carouselSection.show();
        }
      }
    });
  }

  _slidecount = function () {
    $(".brexitstyle .carousel-container").each(function () {
      nodecount = $(this).find(".slide-container").length,
      _cauoselSlideButton = $(this).parents(".carousel-section").find(".carousel-slide-button");
      _cauoselSlideButton.show();
      if (nodecount <= 3) {
        _cauoselSlideButton.hide();
      }
      else {
        _cauoselSlideButton.show();
      }
    });
  }

  init = function () {
    _slidecount();
    _carouselPrevWrapper();
    _carouselNextWrapper();
    _podcastRecorderWrapper();
    _podcastBtnWrapper();
    _carouselBtnWrapper();
    _brexitListWrapper();
  }
  
  return {
    init: init
  };
})(this, ($INFORMA = jQuery.noConflict()), "INFORMA");
jQuery(INFORMA.articleTileView.init());
