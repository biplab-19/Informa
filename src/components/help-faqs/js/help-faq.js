var INFORMA = window.INFORMA || {};
INFORMA.helpfaq = (function(window, $, namespace) {
    'use strict';
    //variables
    var _helpfaqSelect = $('.help-faq-select'),
        _faqItemsWrapper = $('.help-faq-wrapper'),
        // methods
        init,
        _showHideFaq;

    _showHideFaq = function() {
        _helpfaqSelect.change(function() {
            var target = $(this).data('target');
            $(target).children().removeClass('show').addClass('hide');
            var show = $("option:selected", this).data('show');
            $(show).removeClass('hide').addClass('show');
        });
    }

    init = function() {
        $('.help-faq-wrapper').children().first().addClass('show');
        $('.help-faq-wrapper').children().not(':first').addClass('hide');
        $('#tabs-2 .accordian-structure .help-faq-wrapper div.col-md-offset-1').first().removeClass('hide').addClass('show');
        _showHideFaq();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.helpfaq.init());
