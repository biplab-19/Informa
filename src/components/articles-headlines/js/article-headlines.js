var INFORMA = window.INFORMA || {};
INFORMA.articleHeadline = (function (window, $, namespace) {
    'use strict';
    //variables
    var categoryChild = $(".all-category").children("a"),
        init;
    init = function () {
        $(document).ready(function () {
            //onload all category checked
                var $radios = $('.drop-content ul li:first-child input:radio[name=yesno]');
                var flag=1;
                if($radios.is(':checked') == true) {
                   $radios.prop('checked', true);
                   flag=parseInt(flag);
                   flag=flag+1;
                }
            //checking the gradient required or not
            if ($('.drop-content #all-category').length > 0) {
                if ($('.drop-content #all-category')[0].checked) {
                    categoryChild.removeClass("select-gradient");
                } else {
                    categoryChild.addClass("select-gradient");
                }
            }
            //on click of all category
            $(document).on("click", ".all-category a", function () {
                 var thisChild = $(this).children("a").children("span"),
                    thisParent = $(this).parent().hasClass('active'),
                    thisSpan = $(this).children("span");
                    if($radios.is(':checked') === false && flag==2) {
                        $radios.prop('checked', true);
                        flag++;
                    }
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