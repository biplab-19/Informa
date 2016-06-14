var INFORMA = window.INFORMA || {};
INFORMA.eventPage = (function(window, $, namespace) {
    'use strict';
    var init,
       _equalheight,
       _bindShowMoreEvents,
       _eventList = $('#events');
       _equalheight = function(){
           var highestBox = 0;
          $('.events-section .events-wrap').each(function(){
                  if($(this).height() > highestBox){
                  highestBox = $(this).height();
                }
          });
          $('.events-section .events-wrap').height(highestBox);
        }
        _bindShowMoreEvents = function(container){
            // if data-items, data-infinite is defined, used it
            var _showMoreEvents = $('.btn-more-events');
           var _limit = container.data(INFORMA.global.device.viewport) + 1;
            _showMoreEvents.on('click',function(){
                var _vp = INFORMA.global.device.viewport;
                var _limit = container.data(INFORMA.global.device.viewport) + 1;
                _eventList.find('.events-section:nth-child(n+7)').slideToggle();
                $(this).toggleClass('showLess');
            });
        }
        init = function() {
              _equalheight();
            if (_eventList.length > 0) {
              _bindShowMoreEvents(_eventList);
            }
        };
    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.eventPage.init());
