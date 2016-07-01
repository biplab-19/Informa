var INFORMA = window.INFORMA || {};
INFORMA.formGetInTouch = (function(window, $, namespace) {
    'use strict';
    var _toolTip = $('.hasToolTip .icon.icon-info'),
        _formModalBtn = $('.form-modal-btn'),
        _formInlineContiner = $('.form-inline-container'),
        _formModal = $('.form-modal'),
        //functions
        init,
        _bindToolTip,
        _showOverlay,
        _attachInlineForm,
        _validateGetInTouchForm;

    _showOverlay = function(container) {
        _formModalBtn.click(function() {
            var formHTML = _formInlineContiner.html();
            _formModal.find('.modal-body .form-popup-container').html(formHTML);
            _formInlineContiner.find('form').remove();
            _validateGetInTouchForm();
            $('.form-popup-container form').css('display', 'block');
            _formModal.modal({
                show: true,
                keyboard: false,
                backdrop: "static"
            });
        })
    }

    _attachInlineForm = function() {
        $('.form-modal-close').click(function() {
            var formHTML = _formModal.find('.modal-body .form-popup-container').html();
            _formInlineContiner.html(formHTML);
            $('.form-inline-container form').css('display', 'none');
            _validateGetInTouchForm();
            $('.form-popup-container').find('form').remove();
        });
    }

    _validateGetInTouchForm = function() {
        $('form.get-in-touch').validate();
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        _showOverlay();
        _bindToolTip();
        _attachInlineForm();
      //  _validateGetInTouchForm();
    };

    _bindToolTip = function() {
        _toolTip.on('click', function() {
            $(this).toggleClass('active');
            $(this).parent().parent() // .hasToolTip
                .children('.tooltip-placeholder').slideToggle();
        })
    }


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formGetInTouch.init());
