var INFORMA = window.INFORMA || {};
INFORMA.campaignbackground = (function (window, $, namespace) {
    'use strict';
    //variables
    var init,
        scrollImg = $("img.scroll-down").length,
        docHeight = $("body").height(),
        headerHeight = $("#informa-main-header").height(),
        footerHeight = $("#informa-footer").height(),
        cookiesHeight = $("#cookieBanner").height(),
        scrollhideHeight = parseInt(docHeight) - (parseInt(headerHeight) + parseInt(footerHeight) + parseInt(cookiesHeight) + 300),
        scrollfromTop,
        //methods
        scrollHide,
        scrollHide = function (scrollfromTop) {
            $(".scroll-down").removeClass("hide");
            if (scrollImg > 0) {
                if (scrollfromTop >= scrollhideHeight) {
                    $(".scroll-down").addClass("hide");
                }
                else {
                    $(".scroll-down").removeClass("hide");
                }
            }
        }
    init = function () {

        window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            scrollHide(scroll);
        });


    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.campaignbackground.init());