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
INFORMA.sectorList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _sectorList = $('#sector-list-section'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
        });
    }
    _bindShowLess = function () {
      var _showLess = $('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 20
            },700);
      });
    }
    init = function() {
        if (_sectorList.length > 0) {
            _bindShowMore(_sectorList);
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorList.init());
