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
        var _slideCount = _customersList.data('itemsperframe') || 6,
            _infinite = _customersList.data('autorotate') || true,
            _speed = _customersList.data('transitionspeed'), // speed of transition
            _duration = _customersList.data('slideduration'); // how long the slider will be dis

            //chk for sitecore preview
            if($('#scPageExtendersForm').length > 0){
                  _infinite = false;
            }
            if(INFORMA.global.device.viewportN == 1){
                  _slideCount = 4;
            }
            else if (INFORMA.global.device.viewportN == 2){
                  _slideCount = 3;
            }
        _customersList.slick({
            infinite: _infinite,
            autoplay: _infinite,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed
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
