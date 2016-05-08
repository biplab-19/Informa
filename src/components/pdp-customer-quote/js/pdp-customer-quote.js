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
INFORMA.pdp_customer_quote = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('#customer-quote-slider'),
    // methods
        init,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        //todo: for the love of Madonna Sebastian move this to common
        var _slideCount = container.data('itemsperframe'),
           _autoplay = container.data('autorotate'),
           _speed = container.data('transitionspeed'), // speed of transition
           _duration = container.data('slideduration'); // how long the slider will be dis

           //chk for sitecore preview
           if($('#scPageExtendersForm').length > 0){
                 _infinite = false;
           }
       container.slick({
           infinite: true,
           autoplay: _autoplay,
           autoplaySpeed: _duration,
           slidesToShow: _slideCount,
           slidesToScroll: _slideCount,
           speed: _speed
       });
    }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider(_customersList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.pdp_customer_quote.init());
