var INFORMA = window.INFORMA || {};
INFORMA.formComponents = (function(window, $, namespace) {
    'use strict';
    var _toolTip = $('.hasToolTip .icon.icon-info'),

        //functions
        init,
        _bindToolTip,
        _showOverlay, _validateForm;

    _showOverlay = function(container) {

        //alert(1);
    }

    _validateForm = function() {
        $('#requestDemoForm').validate({
            errorPlacement: function(error, element) {        
                if (element.attr('type') === 'select') {          
                    error.insertAfter(element.closest('.chosen-container'));        
                }
            }
        });
        $('#requestTrial').validate({
            ignore: [],
            errorPlacement: function(error, element) {     
              console.log(error, element);   
                if (element.hasClass('chosen-select')) {          
                    error.insertAfter(element.siblings('.chosen-container'));        
                }
                else{
                  error.insertAfter(element);        
                }
            },
            submitHandler: function(){
              alert(1);
            }
        });
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        _showOverlay();
        _bindToolTip();
        _validateForm();

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
jQuery(INFORMA.formComponents.init());
