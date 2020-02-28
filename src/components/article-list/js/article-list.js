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
    var  Article = $('#article-list-section'),
        _ArticleLists = $('#article-list-section .list-container'),
        _HeadlinesLists = $('section .headline-list .list-container'),
        FilterMenu = $(".category-filter-list .categoryFilter"),
        ArticleCont = $("section .article-list"),
        HeadlineCont = $("section .headline-list"),
        isExperienceMode = INFORMA.global.siteCore.isExperience,
        Urls = INFORMA.Configs.urls.webservices,
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
        CreateSlider, GetCarouselOptions, GetCarouselUpdatedHtml, GetCarouselData, equalHeights, RenderCarousel, BindFilterEvents, GetListCount,headLineEqualHeight;

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
        RenderCarousel = function(xhtml, ele,m,i) {
            ele.empty().html(xhtml);
            CreateSlider(ele,m,i);
            ele.show();
            var updateCarouselHeight = setTimeout(function(){
                clearTimeout(updateCarouselHeight);
                equalHeights();
                headLineEqualHeight();
            },500);
        },
        GetCarouselData = function(data) {

            INFORMA.Spinner.Show($(".article-list"));
            INFORMA.DataLoader.GetServiceData(Urls.GetArticles, {
                method: "GET",
                data: data,
                success_callback: function (data) {
                    var isNewCoTemplate = $('body').data('sitetemplate') === 'ovum-new';
                    if (data.Articles !== undefined && data.Articles.length > 0) {
                        var html = GetCarouselUpdatedHtml(isNewCoTemplate ? INFORMA.Templates.articleListItemsNewCo : INFORMA.Templates.articleListItems, { Articles: data.Articles });
                        _ArticleLists.slick('unslick');
                        ArticleCont.show();
                        RenderCarousel(html, _ArticleLists,1,2);
                    }else{
                        ArticleCont.hide();
                    }
                    if (data.Articles !== undefined && data.Headlines.length > 0) {
                        var HeadelinesListHtml = GetCarouselUpdatedHtml(INFORMA.Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        HeadlineCont.show();
                        RenderCarousel(HeadelinesListHtml, _HeadlinesLists,2,4);
                    }else{
                        HeadlineCont.hide();
                    }
                },
                error_callback: function() {

                }
            });
        },
        equalHeights = function() {
            // Select and loop the container element of the elements you want to equalise
           var Items = Article.find('.recomended-wrapper'),
                MaxHeight = 0,
                MaxWrapperHeight = 0,
                MaxTopicHeight = 0,
                MaxSubSectorHeight = 0;

                Items.each(function () {
                    var ContentHeight = $(this).find('.content').outerHeight();
                    if(ContentHeight > MaxHeight) {
                        MaxHeight = ContentHeight;
                    }
                })
                Items.find('.content').css('min-height' , MaxHeight);
                Items.each(function(){
                    var TopicHeight = $(this).find('.topics').outerHeight();
                    if(TopicHeight > MaxTopicHeight) {
                        MaxTopicHeight = TopicHeight;
                    }
                })
                Items.find('.topics').height(MaxTopicHeight);
                Items.each(function(){
                    var TopicHeight = $(this).find('.SubSectors').outerHeight();
                    if(TopicHeight > MaxSubSectorHeight) {
                        MaxSubSectorHeight = TopicHeight;
                    }
                })
                Items.find('.SubSectors').height(MaxSubSectorHeight);
                Items.each(function(){
                    var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                    if(WrapperHeight > MaxWrapperHeight) {
                        MaxWrapperHeight = WrapperHeight;
                    }
                })
                Items.find('.recomend-content').css('min-height' , MaxWrapperHeight);
        },

        headLineEqualHeight = function () {
            var items = _HeadlinesLists.find('.slick-slide'),
                maxHeight = 0,
                Padding = 0;
                items.each(function () {
                    var Height = $(this).outerHeight();
                    if(Height > maxHeight) {
                        maxHeight = Height + Padding;
                    }
                })
                items.css('height', maxHeight);
        }

        BindFilterEvents = function() {
            //Filter menu present then bind filter event to dropdown
            if (FilterMenu) {
                FilterMenu.on("change", function(e) {
                    e.preventDefault();
                    var SelectedFilter = FilterMenu.val();
                    GetCarouselData(SelectedFilter);
                });
            }
            equalHeights();

        },
        CreateSlider = function(el,mobileScroll,ipadScroll) {
            var _listItemCounts = GetListCount(el),
                Options = GetCarouselOptions(el);
            if ( Options != undefined) {
                el.slick({
                    dots: Options.sliderDots,
                    infinite: Options.sliderInfinite,
                    speed: Options.speed,
                    autoplay: (!isExperienceMode) ? Options.autoplay:false,
                    autoplaySpeed: Options.autoplaySpeed,
                    slidesToShow: (_listItemCounts >= Options.slidesShow) ? Options.slidesShow : _listItemCounts,
                    slidesToScroll: Options.slidesScroll,
                    swipe: INFORMA.global.device.isDesktop ? false : true,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: (_listItemCounts >= 2) ? ipadScroll : _listItemCounts,
                                slidesToScroll: ipadScroll
                            }
                        }, {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: (_listItemCounts >= 2) ? ipadScroll : _listItemCounts,
                                slidesToScroll: ipadScroll
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: mobileScroll,
                                slidesToScroll: mobileScroll
                            }
                        }
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                    ]
                });
            }
        }

    init = function() {
        if(!$('.article-list').hasClass('no-carousel')) {
            if (_ArticleLists.length > 0) {
                CreateSlider(_ArticleLists,1,2);
            }
            if (_HeadlinesLists.length > 0) {
                var headlineListItems = _HeadlinesLists.find('li');
                var HeadlinesListItemsLength = headlineListItems.length;
                var _vp = INFORMA.global.device.viewportN;
                if((_vp === 2 && HeadlinesListItemsLength >= 2) || (_vp === 1 && HeadlinesListItemsLength >= 4) || (_vp === 0 && HeadlinesListItemsLength >= 6)) {
                    CreateSlider(_HeadlinesLists,2,4);
                }
                else{
                    CreateSlider(_HeadlinesLists,HeadlinesListItemsLength,HeadlinesListItemsLength);
                }   
                //headLineEqualHeight();
            }
            if (FilterMenu && !isExperienceMode) {
                $(".chosen-select").chosen({ disable_search_threshold: 10, width: "100%" });
                BindFilterEvents();
            }
        }
        $(window).on("load", function() {
            equalHeights();
            headLineEqualHeight();
            $("#article-category-list li:first").children(".custom-radio").children("input").prop("checked", true);
        });
        $(window).on("resize", function() {
            equalHeights();
            //headLineEqualHeight();
        });
        $(document).on('click', '.article-filter-section-for-mob .drop-content li p', function (e) {
            e.preventDefault();
            var SelectedFilter=$(this).attr('value');
            GetCarouselData(SelectedFilter);

        });
        $(document).on('click', '#article-category-list li', function (e) {
            e.preventDefault();
            $(this).children(".custom-radio").children("input").prop("checked", true);
            var SelectedFilter=$(this).attr('value');
            GetCarouselData(SelectedFilter);
            
        });

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ArticleList.init());
