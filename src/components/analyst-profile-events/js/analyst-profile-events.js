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
        EqualHeight,
        ShowMore;

        EqualHeight = function(){
               var highestBox = 0,
                EachItem = List.find(".content-wrap"),
                padding = 0;

                jQuery('section[data-view="list-view"]').show();
              EachItem.each(function(){
                      if(jQuery(this).height() > highestBox){
                      highestBox = jQuery(this).height();
                    }
              });
              EachItem.height(highestBox + padding);
        },

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                $(this).toggleClass('showLess');
                $('.analyst-profile-events .events-section:nth-child(n+2)').slideToggle();
            })
        },

    init = function() {
        if (_AnalystEventLists.length > 0) {
            EqualHeight();
            ShowMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystEventList.init());
