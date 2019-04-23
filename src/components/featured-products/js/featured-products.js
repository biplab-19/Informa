
var INFORMA = window.INFORMA || {};
INFORMA.FeaturedProduct = (function (window, $, namespace) {
    'use strict';
    var sticky;
    var header;
    var list = $('.owl-carousel'), init, _featuredProduct;
    init = function () {
        $(document).ready(function () {
            _featuredProduct();
        });
    };

    //_featuredProduct = function () {
    //    if ($('.owl-carousel').length > 0) {
    //        var owlCarousel = $('.owl-carousel').owlCarousel({
    //            margin: 0,
    //            loop: true,
    //            autoplay: false,
    //            autoWidth: true,
    //            items: 3,
    //            nav: false,
    //            pagination: false,
    //            dots: false,

                
    //            //navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    //        });

    //        $('.owl-nav.disabled').remove();
    //        $('.custom-owl-next').click(function () {
    //            owlCarousel.trigger('next.owl.carousel', 500);
    //        });

    //        $('.custom-owl-previous').click(function () {
    //            owlCarousel.trigger('prev.owl.carousel', 500);
    //        });
    //    }
    //};

    _featuredProduct = function () {
        var cl_length = $("#dvFeatureProductCarousel .item").length;
        console.log(cl_length);
        if (cl_length >= 4) {
            if ($('#dvFeatureProductCarousel').length > 0) {
                var owlCarousel = $('#dvFeatureProductCarousel').owlCarousel({
                    margin: 0,
                    loop: true,
                    autoplay: false,
                    autoWidth: true,
                    items: 3,
                    nav: false,
                    pagination: false,
                    dots: false,

                    //navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                });

                $('.owl-nav.disabled').remove();
                $('.custom-owl-next').click(function () {
                    owlCarousel.trigger('next.owl.carousel', 500);
                });

                $('.custom-owl-previous').click(function () {
                    owlCarousel.trigger('prev.owl.carousel', 500);
                });
            }
        }
        else {
            if ($('#dvFeatureProductCarousel').length > 0) {
                var owlCarousel = $('#dvFeatureProductCarousel').owlCarousel({
                    margin: 0,
                    loop: false,
                    autoplay: false,
                    autoWidth: true,
                    items: 3,
                    nav: false,
                    pagination: false,
                    dots: false,


                    //navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
                });

                $('.owl-nav.disabled').remove();
                $('.custom-owl-next').hide();
                $('.custom-owl-previous').hide();

            }
        }

    };


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.FeaturedProduct.init());
