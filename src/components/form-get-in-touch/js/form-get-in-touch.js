var INFORMA = window.INFORMA || {};
INFORMA.formGetInTouch = (function(window, $, namespace) {
    'use strict';
    var _toolTip = $('.hasToolTip .icon.icon-info'),
        _formModal = $('.form-modal'),
        _formModalBtn = $('.form-btn-container .form-modal-btn'),
        _formInlineContiner,
        
        
        //functions
        init,
        _bindToolTip,
        _bindCalendar,
        _showOverlay,
        _attachInlineForm,
        _validateAllForms;

    _showOverlay = function(container) {
        _formModalBtn.click(function() {

            var _formName = $(this).data('form');
            _formInlineContiner = $('.' + _formName).parent();

            var formHTML = _formInlineContiner.html();
            _formModal.find('.modal-body .form-popup-container').html(formHTML);
            _formInlineContiner.find('form').remove();

            _validateAllForms();
            _bindToolTip();
            _bindCalendar();
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
            _validateAllForms();
            $('.form-popup-container').find('form').remove();
        });
    }

    _validateAllForms = function() {
        $('form.get-in-touch').validate();
        $('form.request-a-demo').validate();
    }

    _bindToolTip = function() {        
        $('.form-modal legend').on("click", function(e){
                if (e.offsetX > $(this).outerWidth() + 15) {
                    $(this).toggleClass('active');
                    $(this).parent().children('p').slideToggle();
                } else {
                    console.log('C2');
                } 
        });
    }

    _bindCalendar = function(){
        $('.three-column input:text').wrap("<div class='right-inner'></div>");
        $( ".three-column .right-inner" ).prepend("<i class='icon-calender'></i>");
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        _showOverlay();
        //_bindToolTip();
        _attachInlineForm();
      //  _validateGetInTouchForm();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formGetInTouch.init());
