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
INFORMA.featureList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _featureList = $('#feature-list'),
    // methods
        init,
        _bindShowMore;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore',container);
       var _limit = container.data(INFORMA.global.device.viewport) + 1;
        $('.feature-list-container:nth-child(n+'+_limit+')').hide();
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewport;
            var _limit = container.data(INFORMA.global.device.viewport) + 1;
            _featureList.children().find('.feature-list-container:nth-child(n+'+_limit+')').slideToggle();
            $(this).toggleClass('showLess');
        });
    }

    init = function() {
        if (_featureList.length > 0) {
            _bindShowMore(_featureList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());
