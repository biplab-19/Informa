/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.article_list = (function(window, $, namespace) {
    'use strict';
    //variables
    var _articleList = $('.article_list .list-container'),
        _listItemCounts = _articleList.find("li").size(),
        // methods
        init,
        _createSlider;

    _createSlider = function() {
        // if data-items, data-infinite is defined, used it
        _articleList.slick({
            dots: true,
            infinite: true,
            speed: 400,
            autoplay: true,
            autoplaySpeed:4000,
            slidesToShow: (_listItemCounts >= 3 ) ? 3 : _listItemCounts,
            slidesToScroll: 3,
            responsive: [{ //TODO - SW450 - Setting need to be move to config file.
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: (_listItemCounts >= 2 ) ? 2 : _listItemCounts,
                        slidesToScroll: 2,
                        dots: true
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: (_listItemCounts >= 2 ) ? 2 : _listItemCounts,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    init = function() {
        if (_articleList.length > 0) {
            _createSlider();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.article_list.init());
