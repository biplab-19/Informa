/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.analystProfile = (function(window, $, namespace) {
    'use strict';
     var init,
        _bindShowMore,
        _checkButton;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-options');
        _showMore.click(function(){
            $(this).parents('#analyst-profile').find('.descriptions').toggleClass("show-content");
        });
    }

    _checkButton = function () {
        var ContentHeight = $('.descriptions').height(),
            TotalHeight = $('.descriptions').addClass('show-content').height();
            debugger;
        if(TotalHeight <= ContentHeight) {
            jQuery('.show-options').addClass('hidden');
        }
        $('.descriptions').removeClass('show-content');
    }

    init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
            _checkButton();
        //}
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystProfile.init());
