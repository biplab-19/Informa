/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalFooter = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('.customers_list_slider'),
    // methods
        init,
        _createSlider;

    _createSlider = function(){
        // if data-items, data-infinite is defined, used it
        var _slideCount = _customersList.data(INFORMA.global.device.viewport+'-items') || 1,
            _slidesToScroll = _customersList.data(INFORMA.global.device.viewport+'-displacement') || _slideCount,
            _infinite = _customersList.data('infinite') || true;
        _customersList.slick({
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 6,
            autoplay: true,
            autoplaySpeed: 4000
        });
    }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.globalFooter.init());
