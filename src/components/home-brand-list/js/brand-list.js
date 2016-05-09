/*
 * feature-list.js
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
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _brandList = $('#product-brands-list-section'),
    // methods
        init,
        _bindShowMore;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-more-brands ');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path

              $('.product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading').show();
              $('.product-brands-list .view-all-mobile-container').hide();
            }
        });
    }

    init = function() {
        if (_brandList.length > 0) {
            _bindShowMore(_brandList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());
