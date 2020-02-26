var INFORMA = window.INFORMA || {};
INFORMA.articleSerchlisting = (function (window, $, namespace) {
    'use strict';
    //variables
    var init,
        refineChild = $(".product-finder-results").children(".container").children(".refine-container");

    init = function () {
        $(document).ready(function () {
            $(document).on("click", ".btn-group .dropdown-toggle", function () {
                if ($(this).siblings(".multiselect-container").children("li").hasClass("active")) {
                    $(this).toggleClass("select-gradient");
                }
                else {
                    $(this).removeClass("select-gradient");
                }
            });
            $(document).on("click", ".resource-sector-search .button button", function () {
                var resourceSibling = $(this).parents(".resource-finder").siblings(".product-finder-results");
                resourceSibling.addClass("show-refine-container");
                resourceSibling.find(".refine-container").show();
            });
            $(document).on("click", ".close-refine-list", function () {
                $(this).parent(".refine-container").hide();
            });
            $(document).on("click",'.refine-container-button .refine-button',function() {
                $(this).parent(".refine-container-button").siblings(".refine-container").toggle();
            });
            if (refineChild.find(".heading").hasClass("heading-collapsed")) {
                refineChild.find(".heading").removeClass("heading-collapsed");
                refineChild.find(".panel-group").css("display", "block");
            }

        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleSerchlisting.init());
