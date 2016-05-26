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
        _equalHeight,
        _lists = null;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            } else if(_vp == 3) {
                _vp = 3;
            }
            else {
                _vp = 4; // or (n+9)
            }
            _analystList.find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).toggleClass('showLess');
        });
    }

    _equalHeight = function(items) {
        var _analystDescription = items.find('.analyst-description'),
            _docWidth = jQuery(document).width(),
            _eachItemWidth = jQuery(items.find('.analyst-description')[0]).width(),
            _maxHeight = 0;
            _analystDescription.each(function() {
                var _currentHeight = jQuery(this).height();
                if(_currentHeight > _maxHeight) {
                    _maxHeight = _currentHeight;
                }
            });
            _analystDescription.css('height',_maxHeight+50);

    }

    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
        }
        if (_listItems.length > 0) {
            _listItems.each(function() {
                var items = jQuery(this).find('.analyst-list-container');
                _equalHeight(items);
            });
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());
