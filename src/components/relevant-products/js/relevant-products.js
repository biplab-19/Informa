/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RelevantProducts = (function(window, $, namespace) {
    'use strict';
    //variables
    var _RelevantProductsWrapper = $('#relevant-products'),
        ShowMoreBtn = _RelevantProductsWrapper.find('.btn-showMore'),
        TriangleBtn = _RelevantProductsWrapper.find('.triangle'),
        // methods
        init,
        ShowMore,
        HideItems,
        FlipItems,
        EqualHeight;

        EqualHeight = function (Parent) {
            var Items = Parent.find('.search-tile'),
                MaxHeight = 0;
            Items.each(function () {
                var Height = $(this).height();
                
                if(Height > MaxHeight) {
                    MaxHeight = Height;
                }
            })
            Items.height(MaxHeight);

        },
        FlipItems = function (This) {
            TriangleBtn.on('click', function () {
                $(this).parents('.tile').toggleClass('flip');
            })
            
        },
        HideItems = function(Parent){
            var Viewport = INFORMA.global.device.viewport,
                Count = Parent.attr('data-'+Viewport);

            Parent.find('.search-tile:nth-child(n+' + (Count + 1 )+ ')').hide();
        },

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                var Parent = $(this).parents('#relevant-products'),
                    Viewport = INFORMA.global.device.viewport,
                    Count = Parent.attr('data-'+Viewport);

                Parent.find('.search-tile:nth-child(n+' + (Count + 1 )+ ')').slideToggle();
                Parent.toggleClass('showLess');
            })
        },

    init = function() {
        if (_RelevantProductsWrapper.length > 0) {
            HideItems(_RelevantProductsWrapper);
            ShowMore();
            EqualHeight(_RelevantProductsWrapper);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RelevantProducts.init());
