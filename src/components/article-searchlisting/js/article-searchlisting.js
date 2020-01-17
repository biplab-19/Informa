var INFORMA = window.INFORMA || {};
INFORMA.articleSerchlisting = (function (window, $, namespace) {
    'use strict';
    //variables
    var init,
        refineChild = $(".product-finder-results").children(".container").children(".refine-container");

    init = function () {
        $(document).ready(function () {
            $(document).on("click", ".btn-group .dropdown-toggle", function () {
                $(this).parent(".btn-group").toggleClass("open");
                if ($(this).siblings(".multiselect-container").children("li").hasClass("active")) {
                    $(this).toggleClass("select-gradient");
                }
                else {
                    $(this).removeClass("select-gradient");
                }
            });

            $(document).on("click", ".panel-default .panel-title a", function () {
                var panelSibling = $(this).parents(".panel-heading").siblings(".panel-collapse");
                $(this).toggleClass("toggle-panel-body");
                if (panelSibling.hasClass("panel-collapse")) {
                    panelSibling.toggleClass("open-collapse");
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

            if (refineChild.find(".heading").hasClass("heading-collapsed")) {
                refineChild.find(".heading").removeClass("heading-collapsed");
                refineChild.find(".panel-group").css("display", "block");
            }
            $(".panel-default .panel-title a").parents(".panel-heading").siblings(".panel-collapse").removeClass("collapse");
        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleSerchlisting.init());
