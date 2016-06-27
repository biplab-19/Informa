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
INFORMA.featureList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _featureList = $('.feature-list'),
        _featureListSection = $('.feature-list-section'),
        // methods
        init,
        _hideList,
        _bindShowMore;

    _bindShowMore = function() {
        // if data-items, data-infinite is defined, used it
        var _showMore = jQuery('.btn-showMore');
        _showMore.on('click', function() {
            var _vp = INFORMA.global.device.viewport,
                _limit = jQuery(this).parents('.feature-list-section').data(INFORMA.global.device.viewport) + 1,
                moreItems = jQuery(this).parents('.feature-list-section').find('.feature-list-container:nth-child(n+' + _limit + ')');
            if (jQuery(this).parents('.feature-list-section').find('.feature-list:visible').length > _limit) {
                jQuery(this).addClass('showLess');
                moreItems.slideUp();
            } else {
                moreItems.slideDown();
                jQuery(this).removeClass('showLess');
            }
        });
    }
    _hideList = function(ListItems) {
        ListItems.each(function() {
            var _limit = jQuery(this).data(INFORMA.global.device.viewport) + 1;
            jQuery(this).find('.feature-list-container:nth-child(n+' + _limit + ')').hide();

        });
    }
    init = function() {
        if (_featureListSection.length > 0) {
            _hideList(_featureListSection);
            _bindShowMore();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());
