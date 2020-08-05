var INFORMA = window.INFORMA || {};
INFORMA.signup = (function(window, $, namespace) {
    'use strict';
    //variables
    var _signUpExpand = $('.inf-sign-up-box-expand'),
        _signUpCollapse = $('.inf-sign-up-box'),
        _signUpCollapseImg = $('.inf-sign-up-box img.collapse-box'),
        _infSignUp = $(".inf-sign-up"),
        _signUpCollapseTextField = $(".inf-sign-up-box input[type=text]"),
        // methods
        init,
        _signUpBoxExpand,
        _signUpBoxCollapse,
        _validateEmailRegex,
        _validateEmailFunction,
        _validateEmail,
        _validateEmailOnEnter,
        _validateEmailOnMouseout,
        _redirectToLink

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

    init = function() {
        _signUpBoxExpand();
        _signUpBoxCollapse();
        _validateEmail();
        _validateEmailOnEnter();
        _validateEmailOnMouseout();
        _redirectToLink();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.signup.init());