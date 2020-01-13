var INFORMA = window.INFORMA || {};
INFORMA.articleSerchlisting = (function(window, $, namespace) {
    'use strict';
    //variables
    var init;
    
    init = function () {
        $(document).ready(function () {
            $(document).on("click", ".btn-group .dropdown-toggle", function () {
                $(this).parent(".btn-group").toggleClass("open");
                if($(this).siblings(".multiselect-container").children("li").hasClass("active")){
                    $(this).addClass("select-gradient");
                }
                else{
                    $(this).removeClass("select-gradient");
                }
                if($(this).hasClass("select-gradient")){
                    $(this).parent(".btn-group").css("border" , "2px solid transparent");
                }
                else{
                    $(this).parent(".btn-group").css("border" , "2px solid #a8abb5");
                }
            });
           
            $(document).on("click", ".panel-default .panel-title a", function () {
                $(this).toggleClass("toggle-panel-body");
                if($(this).parents(".panel-heading").siblings(".panel-collapse").hasClass("panel-collapse")){
                    $(this).parents(".panel-heading").siblings(".panel-collapse").toggleClass("open-collapse");
                }
            });
            $(".panel-default .panel-title a").parents(".panel-heading").siblings(".panel-collapse").removeClass("collapse");
        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleSerchlisting.init());
