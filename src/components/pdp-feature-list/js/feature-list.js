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
        _featureListContainer = $('.feature-list-container'),
        _featureListSection = $('.feature-list-section-pharma, .feature-list-section'),
        // methods
        init,
        _hideList,
        _bindShowMore,
        _bindShowLess;

    _bindShowMore = function() {
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.feature-list-section .btn-showMore');
        _showMore.on('click', function() {
            var _vp = INFORMA.global.device.viewport,
                _limit = $(this).parents('.feature-list-section').data(INFORMA.global.device.viewport) + 1,
                Parent = $(this).parents('.feature-list-section'),
                Children = Parent.find('.feature-list-container');
            $(Children.slice((_limit - 1), Children.length)).slideToggle();
            Parent.toggleClass('showLess');
        });
    }
    _hideList = function(ListItems) {
        if (ListItems.length > 0) {
            ListItems.each(function() {
                $(this).find('.feature-list-btn-container').hide();
                var _limit = $(this).data(INFORMA.global.device.viewport) + 1,
                    containersLength = $(this).find('.feature-list-container').length,
                    containerConfigLength = $(this).data(INFORMA.global.device.viewport);


                if (_limit) {
                    $(this).find(".feature-list-container:nth-child(n+" + _limit + ")").hide();
                    if (containersLength > containerConfigLength) {
                        $(this).find('.feature-list-btn-container').show();
                    } else {
                        $(this).find('.feature-list-btn-container').hide();
                    }
                }else{
                  $(this).find('.feature-list-btn-container').show();
                }
            });
        }
    }
// removed equal height function;


    _bindShowLess = function () {
      var _showLess = $('.feature-list-section').find('.btn-showMore .less');
        _showLess.on('click',function(){
          $('html, body').animate({
              scrollTop: $(this).closest('.feature-list-section').offset().top - 50
          });
        });
    }

    init = function() {
        if (_featureListSection.length > 0) {
            if($('.feature-list-section').length > 0) {
                _hideList(_featureListSection);
            }
            _bindShowMore();
          
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());
