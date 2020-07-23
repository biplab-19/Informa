var INFORMA = window.INFORMA || {};
INFORMA.articleTileView = (function (window, $, namespace) {
  "use strict";
  $(".carousel-container").slick({
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    loop: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:false,
    responsive: [
     {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]

  });

  $('.prev-slide').click(function(){
    $(this).parents(".carousel-section").find(".carousel-container").slick('slickPrev');
  });
  $('.next-slide').click(function(){
    $(this).parents(".carousel-section").find(".carousel-container").slick('slickNext');
  });

  $(".pc-body.Podcastslist .podcast-recoderbutton").click(function () {
   $(this).parent(".podcast-recoder").hide();
   $(this).parent(".podcast-recoder").siblings(".carousel-section").show();
   $(this).parents(".carousel-section").show();
   
  });

  $(".btn-Podcasts").click(function () {
    $(this).closest(".pc-body").next("div").addClass("demo");
  });

  $("button#carouselbutton").click(function () {
    $(this).closest(".demo").removeClass("demo");
  });

  $("._brexitstyle .carousel-container .brexit-list").click(function (ele) {
    var hiddenValue = $(this).find("input[type=hidden]:first").val(),
        hasbrexit = $(this).hasClass("brexit-list");
        
    if(hasbrexit) {
      if (hiddenValue != undefined && hiddenValue != null && hiddenValue != "") {
        if (hiddenValue.includes("soundcloud.com")) {
            
            $(this).parents(".carousel-section").siblings(".podcast-recoder").show();
            $(this).parents(".carousel-section").siblings(".podcast-recoder").find("iframe").attr("src", hiddenValue);
            $(this).parents(".carousel-section").siblings(".podcast-recoder").find(".brexit-list").empty();
            $(this).parents(".carousel-section").siblings(".podcast-recoder").find(".brexit-list").append(ele.delegateTarget.innerHTML);
            $(this).parents(".carousel-section").hide();
          
        } else {
          window.open(hiddenValue);
          $(this).parents(".carousel-section").siblings(".podcast-recoder").hide();
          $(this).parents(".carousel-section").show();
          
          
          
        }
      } else {
        window.open(hiddenValue);
        $(this).parents(".carousel-section").siblings(".podcast-recoder").hide();
        $(this).parents(".carousel-section").show();
        
       
       
      }
    }
  });


})(this, ($INFORMA = jQuery.noConflict()), "INFORMA");

