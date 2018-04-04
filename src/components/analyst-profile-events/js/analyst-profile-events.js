/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystEventList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _AnalystEventLists = $('.analyst-profile-events'),
        List = _AnalystEventLists.find('.events-section'),
        ShowMoreBtn = _AnalystEventLists.find('.btn-more-events'),
        // methods
        init,
        ShowMore,
        UnbindEvent,
        disabledEvent;

        disabledEvent = function(){
            $('.register.disabled').click(function(e){
                e.preventDefault();
            });
        },
        
        UnbindEvent = function() {
            $('.register.disabled').on('keydown', function(e) {
                if (e.keyCode === 13 || e.which===13) {
                    e.preventDefault();
                }   
            })
        },

// removed equal height function;

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                $(this).toggleClass('showLess');
                $('.analyst-profile-events .events-section:nth-child(n+2)').slideToggle();
            })
        },

    init = function() {
        if (_AnalystEventLists.length > 0) {
            ShowMore();
            UnbindEvent();
            disabledEvent();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystEventList.init());
