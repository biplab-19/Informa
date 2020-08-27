var INFORMA = window.INFORMA || {};
INFORMA.MeetCustomer = (function (window, $, namespace) {
    'use strict';
    var methodList = $('tech-main-header'), init;
    init = function () {

        $(document).ready(function () {
            var lengthcdiv = $(".mc-button-div .mc-button-child").length
            if (lengthcdiv >= 4) {
                $(".mc-button-div").addClass("fourbutton");
            }
            if (lengthcdiv == 3) {
                
                $(".mc-button-div").addClass("threebutton");
            }
            if (lengthcdiv == 2) {
                $(".mc-button-div").addClass("twobutton");
            }
            
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.MeetCustomer.init());
