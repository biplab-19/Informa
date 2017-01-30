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

        $('.descriptions').removeClass('show-content')
        if(TotalHeight < ContentHeight) {
            jQuery('.show-options').addClass('hidden');
        }
    }
   init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
            _checkButton();
            if(INFORMA.global.siteCore.isExperience) {
                $('#analyst-profile .show-options').hide();
                $('#analyst-profile .descriptions').addClass('show-content')
            }
        //}
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystProfile.init());
