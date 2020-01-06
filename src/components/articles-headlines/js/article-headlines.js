

var INFORMA = window.INFORMA || {};
INFORMA.articleHeadline = (function (window, $, namespace) {
    'use strict';
    //variables
    var  categoryChild=$(".all-category").children("a"),
         init;
    init = function () {
        $(document).ready(function () {
            //checking the gradient required or not
            if ($('.drop-content #all-category')[0].checked) {
                categoryChild.removeClass("select-gradient");
            } else {
                categoryChild.addClass("select-gradient");
            }
            //on click of all category
            $(document).on("click", ".all-category a", function () {
                var thisChild =$(this).children("a").children("span"),
                    thisParent=$(this).parent().hasClass('active'),
                    thisSpan=$(this).children("span");
                $(this).removeClass("active");
                $(this).children(".dropdown-content").removeClass("drop-content-active");
                thisChild.removeClass('triangle-down');
                thisChild.addClass('triangle-right');
                $(this).parent().toggleClass('active');
                $(this).siblings(".dropdown-content").toggleClass('drop-content-active');
                if (thisParent) {
                    thisSpan.removeClass('triangle-right');
                    thisSpan.addClass('triangle-down');
                }
                else {
                    thisSpan.addClass('triangle-right');
                    thisSpan.removeClass('triangle-down');
                }

            });


            $(document).on('click', '.article-filter-section-for-mob .drop-content li', function () {
                var valueOfli = $('input[name="yesno"]:checked').parent(".custom-radio").siblings(".sub-seg").text();
                $('a#category-value').html('<span class="triangle-down"></span>' + valueOfli);
                if ($('.drop-content #all-category')[0].checked) {
                    categoryChild.removeClass("select-gradient");
                } else {
                    categoryChild.addClass("select-gradient");
                }
            });
        });
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.articleHeadline.init());