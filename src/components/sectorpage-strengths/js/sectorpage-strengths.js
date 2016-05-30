/*
 * feature-list.js
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
    // methods
        init,
        _bindShowMore,
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
            var viewport = INFORMA.global.device.viewportN;
            if(viewport == 2) {// This is mobile, toggle everything except first twbs-font-path
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(2n+2)').toggle();
              // $('.sectorpage-strengths .view-all-sectors-btn-container').hide();
            }
        });
    }

    init = function() {
              if (_sectorPageStrengths.length > 0) {
            _bindShowMore(_sectorPageStrengths);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());
