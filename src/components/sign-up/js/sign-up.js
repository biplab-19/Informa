var INFORMA = window.INFORMA || {};
INFORMA.signup = (function(window, $, namespace) {
    'use strict';
    //variables
    var _signUpExpand = $('.inf-sign-up-box-expand'),
        _signUpCollapse = $('.inf-sign-up-box'),
        _signUpCollapseImg = $('.inf-sign-up-box img.collapse-box'),
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
        });
    }

    _signUpBoxCollapse = function() {
        _signUpCollapseImg.click(function() {
            _signUpCollapse.slideUp();
        });
    }

    _validateEmailRegex = function (email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    };

    _validateEmailFunction = function (email) {
        if (!_validateEmailRegex($(".inf-sign-up-box input[type=text]").val())) {
            $(".inf-sign-up").prop("disabled", true);
            $(".inf-sign-up").removeClass("inf-btn-active");
        }
        else {
            $(".inf-sign-up").removeAttr("disabled");
            $(".inf-sign-up").addClass("inf-btn-active");
        }
    };

    _validateEmail = function () {
        $(".inf-sign-up-box input[type=text]").on('blur', function() {
            _validateEmailFunction();
        });
    };

    _validateEmailOnEnter = function () {
        $(".inf-sign-up-box input[type=text]").keypress(function(e) {
            if(e.which == 13) {
                _validateEmailFunction();
            }
        });
    };

    _validateEmailOnMouseout = function () {
        $(".inf-sign-up-box input[type=text]").mouseout(function() {
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