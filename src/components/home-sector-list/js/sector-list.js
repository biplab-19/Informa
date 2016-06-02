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
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
        });
    }

    init = function() {
        if (_sectorList.length > 0) {
            _bindShowMore(_sectorList);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorList.init());
