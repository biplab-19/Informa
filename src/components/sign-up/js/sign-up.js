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
        _signUpBoxCollapse

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

    init = function() {
        _signUpBoxExpand();
        _signUpBoxCollapse();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.signup.init());