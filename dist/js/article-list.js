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
    var el = $('.article-list .list-container'),
        _listItemCounts = el.find("li").size(),
        numberItemShown = (el.data("slides-show") !== null && el.data("slides-show") !== undefined) ? Math.floor(el.data("slides-show")) : 3,
        // methods
        init,
        _createSlider, _getDataOptions;

    //get all default setting value from component and check 
    //if exist any default setting then return true else false.

    _getDataOptions = function(key) {
            var dataValue = el.data(key);
            if (dataValue !== null && dataValue !== undefined) {
                return true;
            }
            return false;
        },
        _createSlider = function() {

            // if data-items, data-infinite is defined, used it  - Todo - SW-450 - move null and undefined check to method to remove repetition
            el.slick({
                dots: (_getDataOptions("slider-dots")) ? el.data("slider-dots") : false,
                infinite: (_getDataOptions("infinite")) ? el.data("infinite") : true,
                speed: (_getDataOptions("speed")) ? el.data("speed") : 400,
                autoplay: (_getDataOptions("autoplay")) ? el.data("autoplay") : true,
                autoplaySpeed: (_getDataOptions("autoplay-speed")) ? el.data("autoplay-speed") : 4000,
                slidesToShow: (_listItemCounts >= numberItemShown) ? numberItemShown : _listItemCounts,
                slidesToScroll: (_getDataOptions("slides-scroll")) ? Math.floor(el.data("slides-scroll")) : 3,
                responsive: [{ //TODO - SW450 - Setting need to be move to config file.
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: (_listItemCounts >= 2) ? 2 : _listItemCounts,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: (_listItemCounts >= 2) ? 2 : _listItemCounts,
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

            //var template = Handlebars.compile(partial.match),
            //myhtml = template({ articleListItems : mytest.articleListItems });
        }

    init = function() {
        if (el.length > 0) {
            _createSlider();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.article_list.init());
