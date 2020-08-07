var INFORMA = window.INFORMA || {};
INFORMA.signup = (function(window, $, namespace) {
    'use strict';
    //variables
    var _signUpExpand = $('.inf-sign-up-box-expand'),
        _signUpCollapse = $('.inf-sign-up-box'),
        _signUpCollapseImg = $('.inf-sign-up-box img.collapse-box'),
        _infSignUp = $(".inf-sign-up"),
        _signUpCollapseTextField = $(".inf-sign-up-box input[type=text]"),
        _modalld = $("#modalId").val(),
        // methods
        init,
        _signUpBoxExpand,
        _signUpBoxCollapse,
        _validateEmailRegex,
        _validateEmailFunction,
        _validateEmail,
        _validateEmailOnEnter,
        _validateEmailOnMouseout,
        _redirectToLink,
        _prePopulateEmail

    _signUpBoxExpand = function() {
        _signUpExpand.click(function() {
            _signUpCollapse.slideDown();
            $(this).slideUp();
        });
    }

    _signUpBoxCollapse = function() {
        _signUpCollapseImg.click(function() {
            _signUpCollapse.slideUp();
            _signUpExpand.slideDown();
        });
    }

    _validateEmailRegex = function (email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    };

    _validateEmailFunction = function (email) {
        if (!_validateEmailRegex(_signUpCollapseTextField.val())) {
            _infSignUp.prop("disabled", true);
            _infSignUp.removeClass("inf-btn-active");
        }
        else {
            _infSignUp.removeAttr("disabled");
            _infSignUp.addClass("inf-btn-active");
        }
    };

    _validateEmail = function () {
        _signUpCollapseTextField.on('blur', function() {
            _validateEmailFunction();
        });
    };

    _validateEmailOnEnter = function () {
        _signUpCollapseTextField.keypress(function(e) {
            if(e.which == 13) {
                _validateEmailFunction();
            }
        });
    };

    _validateEmailOnMouseout = function () {
        _signUpCollapseTextField.mouseout(function() {
            _validateEmailFunction();
        });
    };

    _redirectToLink = function () {
        $(".redirect-to-link").click(function(){
            window.open($("#ctaUrl").val(), '_blank');
        });
    };

    _prePopulateEmail = function () {
        $("#"+_modalld).on('shown.bs.modal', function(){
			$(this).find('.email-field').focus();
			$(this).find('.email-field').val($(".inf-sign-up-box input").val());
		});
    };

    init = function() {
        _signUpBoxExpand();
        _signUpBoxCollapse();
        _validateEmail();
        _validateEmailOnEnter();
        _validateEmailOnMouseout();
        _redirectToLink();
        _prePopulateEmail();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.signup.init());