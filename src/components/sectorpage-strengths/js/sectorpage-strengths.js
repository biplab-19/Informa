/*
 * sectorpage-strengths.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-25
 * @author:     Tejaswi , tchennupati@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.sectorPageStrengths = (function(window, $, namespace) {
    'use strict';
    //variables

    var _sectorPageStrengths = $('.sectorpage-strengths'),
        _elements = 0,
    // methods
        init,
        _bindShowMore,_bindShowLess,
        _adjustHeigt, _checkElemnt ;


    _checkElemnt = function () {
        var _vp = INFORMA.global.device.viewportN;

        if(_vp == 0) {
            var count = _sectorPageStrengths.data('desktop');
            _sectorPageStrengths.find('.marg1:nth-child(n+'+ (count + 1)+')').hide();
            if(_sectorPageStrengths.find('.marg1').length >= (count+1)) {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
            } else {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
            }
            _elements = count;
        } else if(_vp == 1) {
          _sectorPageStrengths.find('.marg1:nth-child(n+5)').hide();
          if(_sectorPageStrengths.find('.marg1').length > 4) {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
          } else {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
          }
          _elements = 4;
        } else {
          _sectorPageStrengths.find('.marg1:nth-child(n+4)').hide();
          _elements = 3;
        }
    }

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(n+'+ (_elements + 1) +')').slideToggle();
              $(this).parents('.sectorpage-strengths').toggleClass('showLess');
        });
    }

  // removed equal height function;

    _bindShowLess = function () {
      var _showLess = _sectorPageStrengths.find('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 35
            },700);
      });
    }
    init = function() {
        if (_sectorPageStrengths.length > 0) {
            _checkElemnt();
            _bindShowMore(_sectorPageStrengths);
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());
