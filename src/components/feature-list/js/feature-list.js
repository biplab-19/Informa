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
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 3; //to emulate nth-child(n+3)
            }
            else {
                _vp = 9; // or (n+9)
            }
            _featureList.children().find('.feature-list-container:nth-child(n+'+_vp+')').slideToggle();
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
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.featureList.init());
