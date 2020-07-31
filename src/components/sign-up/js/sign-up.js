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
        _validateEmail,
        _signupEmailValue = $(".inf-sign-up-box input[type=text]").val();

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

    $(".inf-sign-up-box input[type=text]").on('blur', function() {
        if (!_validateEmail($(".inf-sign-up-box input[type=text]").val())) {
            alert("Invalid email address.");
        }
        else {
            alert("Valid email address.");
        }
    });

    _validateEmail = function (email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    };

    init = function() {
        _signUpBoxExpand();
        _signUpBoxCollapse();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.signup.init());