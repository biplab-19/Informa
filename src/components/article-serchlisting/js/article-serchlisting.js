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
                    $(this).toggleClass("select-gradient");
                }
                else{
                    $(this).removeClass("select-gradient");
                }
            });
           
            $(document).on("click", ".panel-default .panel-title a", function () {
                 $(this).toggleClass("toggle-panel-body");
                if($(this).parents(".panel-heading").siblings(".panel-collapse").hasClass("panel-collapse")){
                    $(this).parents(".panel-heading").siblings(".panel-collapse").toggleClass("open-collapse");
                 }
            });
            $(document).on("click", ".resource-sector-search .button button", function () {
                $(this).parents(".resource-finder").siblings(".product-finder-results").addClass("show-refine-container");
                $(this).parents(".resource-finder").siblings(".product-finder-results").find(".refine-container").show();
            });
            $(document).on("click", ".close-refine-list", function (){
                $(this).parent(".refine-container").hide();
              });
            if($(".product-finder-results").children(".container").children(".refine-container").find(".heading").hasClass("heading-collapsed")){
                $(".product-finder-results").children(".container").children(".refine-container").find(".heading").removeClass("heading-collapsed");
                $(".product-finder-results").children(".container").children(".refine-container").find(".panel-group").css("display" , "block");
            }
            $(".panel-default .panel-title a").parents(".panel-heading").siblings(".panel-collapse").removeClass("collapse");
        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleSerchlisting.init());
