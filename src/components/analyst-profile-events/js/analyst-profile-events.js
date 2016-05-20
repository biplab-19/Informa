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
INFORMA.EventList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _EventLists = $('.analyst-profile-events .event-items'),
        // methods
        init,
        SliderOption = {
            "autoplay": false,
            "autoplaySpeed": 4000,
            "sliderDots": true,
            "sliderInfinite": true,
            "slidesScroll": 1,
            "slidesShow": 1,
            "speed": 400
        },
        CreateSlider;

        CreateSlider = function(el) {

            el.slick({
                dots: SliderOption.sliderDots,
                infinite: SliderOption.sliderInfinite,
                speed: SliderOption.speed,
                autoplay: SliderOption.autoplay,
                autoplaySpeed: SliderOption.autoplaySpeed,
                slidesToShow: SliderOption.slidesShow,
                slidesToScroll: SliderOption.slidesScroll
            });
        }

    init = function() {
        if (_EventLists.length > 0) {
            if(INFORMA.global.device.isMobile){
                CreateSlider(_EventLists);
            }
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventList.init());
