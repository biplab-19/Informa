var INFORMA = window.INFORMA || {};
INFORMA.campaignbackground = (function (window, $, namespace) {
    'use strict';
    //variables
    var init,
        _scrollDown = $(".scroll-down"),
        _scrollImg = $("img.scroll-down").length,
        _docHeight = $("body").height(),
        _headerHeight = $("#informa-main-header").height(),
        _footerHeight = $("#informa-footer").height(),
        _cookiesHeight = $("#cookieBanner").height(),
        _scrollhideHeight = parseInt(_docHeight) - (parseInt(_headerHeight) + parseInt(_footerHeight) + parseInt(_cookiesHeight) + 1300),
        _scrollfromTop,
        //methods
        _scrollHide

    _scrollHide = function (_scrollfromTop) {
        _scrollDown.removeClass("hide");
        if (_scrollImg > 0) {
            if (_scrollfromTop >= _scrollhideHeight) {
                _scrollDown.addClass("hide");
            }
            else {
                _scrollDown.removeClass("hide");
            }
        }
    }

    init = function () {
        window.addEventListener("scroll", function (event) {
            var scroll = this.scrollY;
            _scrollHide(scroll);
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.campaignbackground.init());