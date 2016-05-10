/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ArticleList = (function(window, $, namespace) {
    'use strict';
    //variables
    var el = $('.article-list .list-container'),
        _listItemCounts = el.find("li").size(),
        NumberItemShown = (el.data("slides-show") !== null && el.data("slides-show") !== undefined) ? Math.floor(el.data("slides-show")) : 3,
        FilterMenu = $(".category-filter-list .categoryFilter"),
        // methods
        init,
        CreateSlider, GetDataOptions, GetCarouselData, RenderCarousel, BindFilterEvents;

    //get all default setting value from component and check 
    //if exist any default setting then return true else false.

    GetDataOptions = function(key) {
            var DataValue = el.data(key);
            if (DataValue !== null && DataValue !== undefined) {
                return true;
            }
            return false;
    },
    RenderCarousel = function (xhtml) {
        //el.fadeOut("fast")
          el.slick('unslick');

        el.empty().html(xhtml);
        CreateSlider();
        //el.fadeIn("slow");
    },
    GetCarouselData = function(FilterName){

        INFORMA.Spinner.Show($(".article-list"));
        INFORMA.DataLoader.GetServiceData("/webservices/article_list.json", {
            method : "GET", 
            data : "{ \"FilterName\" : "+ FilterName +"\" }",
            success_callback : function(data)
            {
                if(data.articleListItems){
                    var ListTemplate = Handlebars.compile(INFORMA.Templates.articleListItems),
                        html = ListTemplate({ articleListItems : data.articleListItems });
                        RenderCarousel(html);
                }
            },
            error_callback : function()
            {

            }
        });
    },
    BindFilterEvents = function() {
            //Filter menu present then bind filter event to dropdown
            if (FilterMenu) {
                FilterMenu.on("change", function(e) {
                    e.preventDefault();
                    var SelectedFilter = FilterMenu.val();
                    GetCarouselData(SelectedFilter);
                });
            }

    },
    CreateSlider = function() {

        // if data-items, data-infinite is defined, used it  - Todo - SW-450 - move null and undefined check to method to remove repetition
        el.slick({
            dots: (GetDataOptions("slider-dots")) ? el.data("slider-dots") : false,
            infinite: (GetDataOptions("infinite")) ? el.data("infinite") : true,
            speed: (GetDataOptions("speed")) ? el.data("speed") : 400,
            autoplay: (GetDataOptions("autoplay")) ? el.data("autoplay") : true,
            autoplaySpeed: (GetDataOptions("autoplay-speed")) ? el.data("autoplay-speed") : 4000,
            slidesToShow: (_listItemCounts >= NumberItemShown) ? NumberItemShown : _listItemCounts,
            slidesToScroll: (GetDataOptions("slides-scroll")) ? Math.floor(el.data("slides-scroll")) : 3,
            responsive: [{ //TODO - SW450 - Setting need to be move to config file.
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: (_listItemCounts >= 2) ? 2 : _listItemCounts,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: (_listItemCounts >= 2) ? 2 : _listItemCounts,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        if(FilterMenu){
            $(".chosen-select").chosen({disable_search_threshold: 10,width:"100%"});
            BindFilterEvents();
        }
    }

    init = function() {
        if (el.length > 0) {
            CreateSlider();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ArticleList.init());
