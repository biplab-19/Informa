var INFORMA = window.INFORMA || {};
INFORMA.circleinfo = (function(window, $, namespace) {
    'use strict';
    //variables
    var _circleli = $('.info-circle-container .list-inline li'),
    // methods
        init,
        _circlelicontainer;

        _circlelicontainer = function() {
            _circleli.on("click",function(){
                var clircleid = $(this).attr("data-image");
                $(".circle-content .content-holder").removeClass("active");
                $(".circle-container li").removeClass("active");
                $("#"+clircleid).addClass("active");
                $(this).addClass("active");
            });
        }



    init = function() {
        _circlelicontainer();
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.circleinfo.init());
