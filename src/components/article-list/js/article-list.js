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
    var _ArticleLists = $('.article-list .list-container'),
        _HeadlinesLists = $('.headline-list .list-container'),
        FilterMenu = $(".category-filter-list .categoryFilter"),
        Templates = INFORMA.Templates,
        // methods
        init,
        SliderOption = {
            "autoplay": false,
            "autoplaySpeed": 4000,
            "sliderDots": true,
            "sliderInfinite": true,
            "slidesScroll": 3,
            "slidesShow": 3,
            "speed": 400
        },
        CreateSlider, GetCarouselOptions, GetCarouselUpdatedHtml, GetCarouselData, RenderCarousel, BindFilterEvents, GetListCount;

    //get all default setting value from component and check 
    //if exist any default setting then update and return carousel object.

    GetCarouselOptions = function(ele) {
            var DataObject = ele.data(),
                OptionObj = {};

            if (typeof DataObject === "object") {
                for (var key in DataObject) {
                    if (DataObject.hasOwnProperty(key)) {
                        var val = DataObject[key];
                        OptionObj[key] = (val !== null && val !== undefined) ? val : SliderOption[key];
                    }
                }
                return OptionObj;
            }
        },
        GetListCount = function(ele) {
            var count = ele.find("li").size();
            return count;
        },
        GetCarouselUpdatedHtml = function(TemplateName, DataObject) {
            var ListTemplate = Handlebars.compile(TemplateName),
                html = ListTemplate(DataObject);
            return html;
        },
        RenderCarousel = function(xhtml, ele) {
            ele.empty().html(xhtml);
            CreateSlider(ele);
        },
        GetCarouselData = function(data) {

            INFORMA.Spinner.Show($(".article-list"));
            INFORMA.DataLoader.GetServiceData("/client/search/getarticles", {
                method: "GET",
                data: data,
                success_callback: function(data) {
                    if (data.Articles!==undefined && data.Articles.length > 0) {
                        var html = GetCarouselUpdatedHtml(Templates.articleListItems, { Articles: data.Articles });
                        _ArticleLists.slick('unslick');
                        RenderCarousel(html, _ArticleLists);
                    }
                    if (data.Articles!==undefined && data.Headlines.length > 0) {
                        var html = GetCarouselUpdatedHtml(Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        RenderCarousel(html, _HeadlinesLists);
                    }
                },
                error_callback: function() {

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
        CreateSlider = function(el) {
            var _listItemCounts = GetListCount(el),
                Options = GetCarouselOptions(el);

            el.slick({
                dots: Options.sliderDots,
                infinite: Options.sliderInfinite,
                speed: Options.speed,
                autoplay: Options.autoplay,
                autoplaySpeed: Options.autoplaySpeed,
                slidesToShow: (_listItemCounts >= Options.slidesShow) ? Options.slidesShow : _listItemCounts,
                slidesToScroll: Options.slidesScroll,
                responsive: [{
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
        }

    init = function() {
        if (_ArticleLists.length > 0) {
            CreateSlider(_ArticleLists);
        }
        if (_HeadlinesLists.length > 0) {
            CreateSlider(_HeadlinesLists);
        }
        if (FilterMenu) {
            $(".chosen-select").chosen({ disable_search_threshold: 10, width: "100%" });
            BindFilterEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ArticleList.init());
