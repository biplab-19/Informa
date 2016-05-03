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

    _createSlider = function(){
        // if data-items, data-infinite is defined, used it
        _customersList.slick({
            dots: true
        });
        _customersList.css('opacity',1);
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
jQuery(INFORMA.pdp_customer_quote.init());
