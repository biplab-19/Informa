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
        _bindShowMore,
        equalHeight;

    _bindShowMore = function() {
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click', function() {
            var _vp = INFORMA.global.device.viewport,
                _limit = $(this).parents('.feature-list-section').data(INFORMA.global.device.viewport) + 1,
                Parent = $(this).parents('.feature-list-section'),
                Children = Parent.find('.feature-list-container');
                $(Children.slice((_limit-1), Children.length)).slideToggle();
                Parent.toggleClass('showLess');
        });
    }
    _hideList = function(ListItems) {
        ListItems.each(function() {
            var _limit = $(this).data(INFORMA.global.device.viewport) + 1;
            $(this).find('.feature-list-container:nth-child(n+' + _limit + ')').hide();

        });
    }
    equalHeight = function () {
        var EachView = jQuery('.feature-list-section');
        EachView.each(function () {
            var Items = jQuery(this).find('.feature-list-container'),
                _maxHeight = 0,
                _padding = 80;;
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }
    init = function() {
        if (_featureListSection.length > 0) {
            _hideList(_featureListSection);
            _bindShowMore();
            equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());
