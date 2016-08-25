var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init, _showProgressiveTabs, _renderMultiSelect, _showNextTab, _showPrevTab, _validateForm;

    //methods
    _showNextTab = function(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
    }
    _showPrevTab = function(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
    }

    _renderMultiSelect = function() {
        var findMultipleSelect = $('.register-myinterests').find('form select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect();
                }
            });
        }
    }

    _showProgressiveTabs = function() {
        $('.triangle-nav > li a[title]').tooltip();
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });

        $(".next-step").click(function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            _validateForm();
            _showNextTab($active);

        });
        $(".prev-step").click(function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }
    _validateForm = function() {
        var myinterestForm = $('.register-myinterests').find('form');
        myinterestForm.validate({
            submitHandler: function() {
                console.log("submitted!");
            },
            failure: function() {
                console.log("Failure");
            },
            success: function() {
                console.log("Success");
            }
        });
    }

    init = function() {
        _showProgressiveTabs();
        _renderMultiSelect();
        //  _validateForm();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());
