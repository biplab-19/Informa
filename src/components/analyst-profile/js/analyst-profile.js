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
        _bindShowMore;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-options');
        _showMore.click(function(){
            $(this).parents('#analyst-profile').find('.descriptions').toggleClass("show-content");
        });
    }

    init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
        //}
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystProfile.init());
