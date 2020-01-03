

var INFORMA = window.INFORMA || {};
INFORMA.articleHeadline = (function (window, $, namespace) {
    'use strict';
    //variables
    var init;
    init = function () {
        $(document).ready(function () {
            //checking the gradient required or not
            if ($('.drop-content #all-category')[0].checked) {
                $(".all-category").children("a").removeClass("select-gradient");
            } else {
                $(".all-category").children("a").addClass("select-gradient");
            }
            //on click of all category
            $(document).on("click", ".all-category a", function () {
                $(this).removeClass("active");
                $(this).children(".dropdown-content").removeClass("drop-content-active");
                $(this).children("a").children("span").removeClass('triangle-down');
                $(this).children("a").children("span").addClass('triangle-right');
                $(this).parent().toggleClass('active');
                $(this).siblings(".dropdown-content").toggleClass('drop-content-active');
                if ($(this).parent().hasClass('active')) {
                    $(this).children("span").removeClass('triangle-right');
                    $(this).children("span").addClass('triangle-down');
                }
                else {
                    $(this).children("span").addClass('triangle-right');
                    $(this).children("span").removeClass('triangle-down');
                }

            });


            $(document).on('click', '.article-filter-section-for-mob .drop-content li', function () {
                var valueOfli = $('input[name="yesno"]:checked').parent(".custom-radio").siblings(".sub-seg").text();
                $('a#category-value').html('<span class="triangle-down"></span>' + valueOfli);
                if ($('.drop-content #all-category')[0].checked) {
                    $(".all-category").children("a").removeClass("select-gradient");
                } else {
                    $(".all-category").children("a").addClass("select-gradient");
                }
            });
        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleHeadline.init());