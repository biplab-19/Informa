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
INFORMA.sectorPageStrengths = (function (window, $, namespace) {
    'use strict';
    //variables

    var _sectorPageStrengths = $('.sectorpage-strengths'),
        _elements = 0,
        // methods
        init,
        _bindShowMore, _bindShowLess,
        _adjustHeigt, _checkElemnt, equalHeight;


    _checkElemnt = function ($element) {
        var _vp = INFORMA.global.device.viewportN;

        if (_vp === 0) {
            var count = $element.data('desktop');
            $element.find('.marg1').hide();
            if ($element.find('.marg1').length >= (count + 1)) {
                $element.find('.view-all-sectors-btn-container').show();
            } else {
                $element.find('.view-all-sectors-btn-container').hide();
            }
            _elements = count;
        } else if (_vp === 1) {
            $element.find('.marg1:nth-child(n+5)').hide();
            if ($element.find('.marg1').length > 4) {
                $element.find('.view-all-sectors-btn-container').show();
            } else {
                $element.find('.view-all-sectors-btn-container').hide();
            }
            _elements = 4;
        } else {
            $element.find('.marg1:nth-child(n+4)').hide();
            _elements = 3;
        }

        $element.find('.marg1').slice(0, _elements).each(function (index, ele) {
            $(ele).attr('data-display', true).show();
        });
    };

    _bindShowMore = function (container) {
        var _showMore = $(container).find('.view-all-sectors-btn');
        _showMore.on('click', function (element) {

            $(this).closest('.container').find('.row + .row >.marg1:not([data-display])').slideToggle();
            $(this).parents('.sectorpage-strengths').toggleClass('showLess');

        });
    };

    equalHeight = function () {
        var EachView = jQuery('.sectorpage-strengths');
        EachView.each(function () {
            var Items = jQuery(this).find('.text-description'),
                Description = jQuery(this).find('.yellow-container'),
                MainContainer = jQuery(this).find('.main-container'),
                _maxHeight = 0,
                _mainMaxHeight = 0,
                _descHeight = 0;
            Items.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            });
            Items.css('height', _maxHeight);
            Description.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _descHeight) {
                    _descHeight = Height;
                }
            });
            Description.css('height', _descHeight);
            MainContainer.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _mainMaxHeight) {
                    _mainMaxHeight = Height;
                }
            });
            MainContainer.css('height', _mainMaxHeight)

        })
    };

    _bindShowLess = function () {
        var _showLess = _sectorPageStrengths.find('.view-all-sectors-btn.less');
        _showLess.on('click', function () {
            $('html, body').animate({
                scrollTop: $(this).parents('section').offset().top
            }, 700);
        });
    };
    init = function () {
        var EachView = jQuery('.sectorpage-strengths');
        EachView.each(function (index, element) {
            _checkElemnt($(element));
            _bindShowMore(element); // Individual container Fix Ben(2018)
            _bindShowLess();
            $(window).on('load', function () {
                equalHeight();
            });
        });

        $("#loadPDFComponentModal").on('hidden.bs.modal', function () {
            $("#hiddenIframe").html("");
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());
