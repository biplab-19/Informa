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
INFORMA.analystList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _analystList = $('#pdp-analyst'),
        _listItems = $('.analyst-views'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _lists = null;

    _bindShowMore = function(container){

        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){

            var _vp = INFORMA.global.device.viewportN,
                VisibleItem = $(this).parents('section').find('.analyst-list-container:visible');

            if(_vp === 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            } else if(_vp === 3) {
                _vp = 3;
            }
            else {
                _vp = 4; // or (n+9)
            }
            $(this).parents('.analyst-views').find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).parents('.analyst-views').toggleClass('showLess');
        });
    }

    // removed equal height function

    _bindShowLess = function () {
      var _showLess = _analystList.find('.btn.btn-showMore .less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _analystList.offset().top - 35
            },700);
      });
    }
    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
            //_bindShowLess();
        }
        if (_listItems.length > 0) {
            _listItems.each(function() {
                var items = jQuery(this).find('.analyst-list-container');
               });
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());
