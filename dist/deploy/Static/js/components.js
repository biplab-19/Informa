/*! 2016-09-27 */
/*
 * welcome-description
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.welcome_description= (function(window, $, namespace) {
    'use strict';
    //variables
    var _welcomedescription = $('.welcome-description'),
        // _tooltip = _welcomedescription.find('.anonymous,.registered'),
    // methods
        init,
        _closeTip,
        _closeTip = function(){
          var closetip = $('#closetip');
           $('#closetip').on('click', function(){
		            $('.tool').remove();
		        });
        }


    init = function() {
        _closeTip();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.welcome_description.init());

_adjustHeigt = function(){
  var maxHeightTitle = Math.max.apply(null, el.find('.sector-card h2').map(function() {
      return $(this).height();
  }).get());
//  el.find('.slide-block-container').height(maxHeightDesc);
  var maxHeightDesc = Math.max.apply(null, el.find('.sector-card .content').map(function() {
      return $(this).height();
  }).get());

  var maxHeightSubSector= Math.max.apply(null, el.find('.sector-card .sector-list-products').map(function() {
      return $(this).height();
  }).get());

  var maxHeightLink = Math.max.apply(null, el.find('.sector-card .btn-container').map(function() {
      return $(this).height();
  }).get());
  el.find('.sector-card h2').height(maxHeightTitle);
  el.find('.sector-card .content').height(maxHeightDesc);
  el.find('.sector-card .sector-list-products').height(maxHeightSubSector);
  el.find('.sector-card .btn-container').height(maxHeightSubSector);
}

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
INFORMA.AnalystEventList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _AnalystEventLists = $('.analyst-profile-events'),
        List = _AnalystEventLists.find('.events-section'),
        ShowMoreBtn = _AnalystEventLists.find('.btn-more-events'),
        // methods
        init,
        EqualHeight,
        ShowMore;

        EqualHeight = function(){
               var highestBox = 0,
                EachItem = List.find(".content-wrap"),
                padding = 0;

                jQuery('section[data-view="list-view"]').show();
              EachItem.each(function(){
                      if(jQuery(this).height() > highestBox){
                      highestBox = jQuery(this).height();
                    }
              });
              EachItem.height(highestBox + padding);
        },

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                $(this).toggleClass('showLess');
                $('.analyst-profile-events .events-section:nth-child(n+2)').slideToggle();
            })
        },

    init = function() {
        if (_AnalystEventLists.length > 0) {
            EqualHeight();
            ShowMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystEventList.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.analystProfile = (function(window, $, namespace) {
    'use strict';
     var init,
        _bindShowMore,
        _checkButton;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-options');
        _showMore.click(function(){
            $(this).parents('#analyst-profile').find('.descriptions').toggleClass("show-content");
        });
    }

    _checkButton = function () {
        var ContentHeight = $('.descriptions').height(),
            TotalHeight = $('.descriptions').addClass('show-content').height();

        if(TotalHeight <= ContentHeight) {
            jQuery('.show-options').addClass('hidden');
        }
        $('.descriptions').removeClass('show-content');
    }

    init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
            _checkButton();
        //}
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystProfile.init());

/*
 * Anlayst Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystSearch = (function (window, $, namespace) {
    'use strict';
    //variables
    var AnalystSearch = $('.analyst-search'),
        Sector = AnalystSearch.find('.sector select'),
        SubSector = AnalystSearch.find('.sub-sector select'),
        submitBtn = AnalystSearch.find('.submit-btn'),
        resetBtn = AnalystSearch.find('.btn-reset'),
        txtField = AnalystSearch.find('#name'),
        productAnalystResults = $('.product-analyst-results'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _template = "",
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, checkButtonMore, equalHeight, RenderChangeResult, ajaxCallonSector, AppendItems, AppendSearchResult, RenderAllSubSectorResults;

    equalHeight = function () {
        var EachView = jQuery('.analyst-views');
        EachView.each(function () {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                ItemsHeader = jQuery(this).find('.analyst-list-container .analyst-details'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _padding = 50;
            ItemsHeader.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }

    checkButtonMore = function () {
        var _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp),
            Items = productAnalystResults.find('.analyst-views');

            Items.each(function () {
                var Data = $(this).find('.btn-plus').attr('data-count');

                if(Data <= _limit) {
                    $(this).find('.btn-plus').addClass('hidden');
                }
            })


    }

    RenderAllSubSectorResults = function (data, sectorId) {
        var results = data,
            html = "",
            Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
            _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp) + 1;

        for (var key in results) {
            if (results.hasOwnProperty(key)) {

                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystTemplate !== "undefined") ? Templates.AnalystTemplate : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }

        Parent.find('.row').html(html);
        equalHeight();
        Parent.addClass('showLess');
        Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideDown();
        return html;
    }

    EventsFunctions = function () {
        txtField.on('keyup', function () {
            var calcLength = jQuery(this).val().length,
                SectorValue = Sector.val();
            if (calcLength < 3 && SectorValue == 'default') {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
            }
            if(calcLength > 0) {
                resetBtn.show();
            } else {
                resetBtn.hide();
            }
        })

        Sector.chosen().on('change', function () {
            var _value = jQuery(this).val(),
                _text = jQuery(this).find("option:selected").text(),
                _txtField = txtField.val().length;
            if (_value === 'default' && _txtField < 3) {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
                resetBtn.show();
            }

            if (_value == "default") {
                SubSector.parents('.sub-sector').addClass('disabled');
                SubSector.parents('.form-group').find('label').html('By Sub-Sector');
            }
            else {
                SubSector.parents('.sub-sector').removeClass('disabled');
                SubSector.parents('.form-group').find('label').html('By ' + _text);
            }

            GetAjaxData(Urls.AnalystSearchDropDown, "Post", _value, RenderChangeResult, null, null);
            INFORMA.Spinner.Show(SubSector);
            SubSector.trigger("chosen:updated");

        })

        submitBtn.on('click', function () {
            var FieldArray = AnalystSearch.find("form").serializeArray();
            for (var key in FieldArray) {
                if (FieldArray[key].value == "default") {
                    FieldArray[key].value = null;
                }
            }
            var Data = INFORMA.Utils.serializeObject(FieldArray);
            Data.SearchText = $('.SearchTextSpecialist').val();
            var GetSerializeData = JSON.stringify(Data);
            GetAjaxData(Urls.AnalystSearch, "Post", GetSerializeData, RenderSearchResult, null, null);
            //resetBtn.hide();
        })

        resetBtn.on('click', function (e) {
            e.preventDefault();
            var _Object = {
                "Name": null,
                "Sector": null,
                "SearchText": $('.SearchTextSpecialist').val()
            }
            AnalystSearch.find('#name').val('');
            //$('select[name="Sector"]').prop('selectedIndex',0);
            Sector.prop('selectedIndex',0).trigger('chosen:updated').trigger('change');
            //$('select[name="SubSector"]').prop('selectedIndex',0);
            GetAjaxData(Urls.AnalystSearch, "Post", JSON.stringify(_Object), RenderSearchResult, null, null);
            $(this).hide();
        })
    }

    RenderChangeResult = function (data) {
        var defaultValue = jQuery(SubSector.find('option')[0]);
        SubSector.empty();

        var html = '<option value=' + defaultValue.val() + '>' + defaultValue.text() + '</option>';

        for (var key = 0; key< data.length; key++) {
            html += '<option value=' + data[key].Value + '>' + data[key].Text + '</option>';
        }
        SubSector.html(html);
        SubSector.trigger("chosen:updated");
    }

    RenderSearchResult = function (data) {
        //INFORMA.SearchResults.RenderSearchResults(data);
        INFORMA.Spinner.Show($("body"));
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }
        if(Object.getOwnPropertyNames(results).length === 0) {
            $('.NoRecords').removeClass('hidden');
        } else {
            $('.NoRecords').addClass('hidden');
        }
        productAnalystResults.html(html);
        checkButtonMore();
        equalHeight();
        ajaxCallonSector();
        return html;
    }

    AppendSearchResult = function (data) {
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }
        productAnalystResults.html(html);
        equalHeight();
        return html;
    }

    ajaxCallonSector = function () {
        var SectorBtn = jQuery('.btn-plus');

        SectorBtn.on('click', function () {
            var sectorId = jQuery(this).data('fetch');
            var FieldArray = AnalystSearch.find("form").serializeArray(),
                GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray)),
                _Object = JSON.parse(GetSerializeData),
                Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
                _vp = INFORMA.global.device.viewport,
                _limit = parseInt(productAnalystResults.data(_vp)) + 1;

            _Object.SectorID = sectorId;
            _Object.SearchText = $('.SearchTextSpecialist').val()
            for (var key in _Object) {
                if (_Object[key] == "default") {
                    _Object[key] = null;
                }
            }
            if (!Parent.hasClass('showLess')) {
                GetAjaxData(Urls.AnalystSearchAll, "Post", JSON.stringify(_Object), RenderAllSubSectorResults, null, sectorId);
            } else {
                Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideUp();
                Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').remove();
                Parent.removeClass('showLess');
            }


        })
    },

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    init = function () {
        //alert('hi');
        if (AnalystSearch.length > 0) {
            EventsFunctions();
            ajaxCallonSector();
            checkButtonMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());

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
        Templates = INFORMA.Templates,
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
                success_callback: function(data) {
                    if (data.Articles !== undefined && data.Articles.length > 0) {
                        var html = GetCarouselUpdatedHtml(INFORMA.Templates.articleListItems, { Articles: data.Articles });
                        _ArticleLists.slick('unslick');
                        ArticleCont.show();
                        RenderCarousel(html, _ArticleLists,1,2);
                    }else{
                        ArticleCont.hide();
                    }
                    if (data.Articles !== undefined && data.Headlines.length > 0) {
                        var html = GetCarouselUpdatedHtml(INFORMA.Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        HeadlineCont.show();
                        RenderCarousel(html, _HeadlinesLists,2,4);
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
                MaxTopicHeight = 0;

                Items.each(function () {
                    var ContentHeight = $(this).find('.content').height();
                    if(ContentHeight > MaxHeight) {
                        MaxHeight = ContentHeight;
                    }
                })
                Items.find('.content').height(MaxHeight);
                Items.each(function(){
                    var TopicHeight = $(this).find('.topics').outerHeight();
                    if(TopicHeight > MaxTopicHeight) {
                        MaxTopicHeight = TopicHeight;
                    }
                })
                Items.find('.topics').height(MaxTopicHeight);
                Items.each(function(){
                    var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                    if(WrapperHeight > MaxWrapperHeight) {
                        MaxWrapperHeight = WrapperHeight;
                    }
                })
                Items.find('.recomend-content').height(MaxWrapperHeight);
        },

        headLineEqualHeight = function () {
            var items = _HeadlinesLists.find('.slick-slide'),
                maxHeight = 0,
                Padding = 40;
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
                            slidesToShow: (_listItemCounts >= 2) ? 2 : _listItemCounts,
                            slidesToScroll: 2
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

    init = function() {
        if(!$('.article-list').hasClass('no-carousel')) {
            if (_ArticleLists.length > 0) {
                CreateSlider(_ArticleLists,1,2);
            }
            if (_HeadlinesLists.length > 0) {
                CreateSlider(_HeadlinesLists,2,4);
                headLineEqualHeight();
            }
            if (FilterMenu && !isExperienceMode) {
                $(".chosen-select").chosen({ disable_search_threshold: 10, width: "100%" });
                BindFilterEvents();
            }
        }
        $(window).on("load", function() {
            equalHeights();
            headLineEqualHeight();
        });
        $(window).on("resize", function() {
            equalHeights();
            //headLineEqualHeight();
        });

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ArticleList.init());

/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _brandList = $('#product-brands-list-section, #related-products-section'),
    // methods
        init,
        _bindShowMore,
        _equalHeight;
    _equalHeight = function(container) {
        var captionItems = container.find('.caption'),
            maxHeight = 0;

        captionItems.each(function() {
            var height = jQuery(this).height();
            if(height > maxHeight) {
                maxHeight = height;
            }
        })
        if(INFORMA.global.device.viewportN != 2) {
            captionItems.css('height', maxHeight);
        } else {
            captionItems.css('height', 'auto');
        }
    }

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.product-brands-list .view-all-mobile-container');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path

              //$('.product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading').show();
              $(this).prev().find(".col-xs-12 ").show();
              $(this).hide();
            }
        });
    }

    init = function() {
        if (_brandList.length > 0) {
            _equalHeight(_brandList);
            _bindShowMore(_brandList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());

var INFORMA = window.INFORMA || {};
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    var DynamicBrandList = $('.product-brands-list'),
        init, HideOnLoad, _equalHeight, ClickEvents,
        Count = 1,
        BtnShowMore = DynamicBrandList.find('.btn-showMore');

    _equalHeight = function(container) {
        var captionItems = container.find('.caption'),
            maxHeight = 0,
            padding = 50;

        captionItems.each(function() {
            var height = jQuery(this).height();
            if(height > maxHeight) {
                maxHeight = height;
            }
        })
        if(INFORMA.global.device.viewportN != 2) {
            captionItems.css('height', maxHeight + padding);
        } else {
            captionItems.css('height', 'auto');
        }
    }

    init = function () {
        if(DynamicBrandList.length > 0) {
            _equalHeight(DynamicBrandList);
        }
    }

     return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());
/*
 * Home Contact Us.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.homeContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var _contactUs = $('#contactus-section'),
        _accordianTile = _contactUs.find('.panel-default'),
        _eachTile = _contactUs.find('.panel-heading'),
        _eachTileBtnMargin =_contactUs.find('.panel-body'),
    // methods
        init,
        _openAccordian,
        _marginBottomWrapperCta,
        _equalHeight;

        _marginBottomWrapperCta = function(){
          var _vp = INFORMA.global.device.viewportN;
           if(_vp === 0 || _vp === 1) {
          _eachTileBtnMargin.each(function(){
            var _tileBtnHeight = jQuery(this).find(".btn-container").outerHeight()-30;
            if(_tileBtnHeight>0){
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom',_tileBtnHeight+'px');
            }else{
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom','15px');
            }
          });
        }
      }

    _openAccordian = function(container){
        if(INFORMA.global.device.viewportN === 2) {
            var _tiles = container.find('.panel-default');

            _tiles.each(function(key, value) {
                if(key < 2) {
                    jQuery(this).find('.panel-heading').removeClass('collapsed');
                } else {
                    jQuery(this).find('.collapse').collapse('hide');

                }
            })
        }
    }

    _eachTile.on('click', function(a) {
     a.stopPropagation();
        if(jQuery(this).hasClass('collapsed')) {
            jQuery(this).removeClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('show');
        } else {
            jQuery(this).addClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('hide');
        }
    })

    _equalHeight = function () {
        var EachView = jQuery('#contactus-section'),
         _vp = INFORMA.global.device.viewportN;
         if(_vp === 0 || _vp === 1) {
            EachView.each(function () {
                var Items = jQuery(this).find('.panel-default'),
                    _maxHeight = 0;
                Items.each(function () {
                    var Height = jQuery(this).height();
                    if (Height > _maxHeight) {
                        _maxHeight = Height;
                    }
                })
                Items.css('height', _maxHeight);
            })
        }
    }

    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
             _equalHeight();
             _marginBottomWrapperCta();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());

var INFORMA = window.INFORMA || {};
INFORMA.ContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var Tabs = $('.pos ul.nav li'),
        tabcontent = $('.tab-content .tab-pane'),
        _updateRedirectUrl,
        _showSelectedTab,
        init;

    _showSelectedTab = function() {
        var sucessTabId = $('.contactUsPage-contactUs').find(".submit-status[data-status='success']").parents('.tab-pane').attr('id');
        $('.contactUsPage-contactUs .nav-tabs a[href!="#' + sucessTabId + '"]').removeClass('active')
        $('.contactUsPage-contactUs .nav-tabs a[href="#' + sucessTabId + '"]').tab('show').addClass('active');
        //_updateRedirectUrl();
    }
    _updateRedirectUrl = function() {
        var urlRedirectHidden = $('.contactUsPage-contactUs').find('.redirect-url-field');
        if (urlRedirectHidden.length > 0) {
            urlRedirectHidden.val(window.location.href);
        }
    }
    init = function() {
        _showSelectedTab();
        var hash = document.location.hash,
            prefix = "tab_";
        if (hash) {
            $('.contactUsPage-contactUs .nav-tabs a[href="' + hash.replace(prefix, "") + '"]').tab('show').addClass('active');
            _updateRedirectUrl();
        } else {
            $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
            _showSelectedTab();
            _updateRedirectUrl();
        }
        $('.contactUsPage-contactUs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            window.location.hash = e.target.hash.replace("#", "#" + prefix);
            _updateRedirectUrl();
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ContactUs.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-July-8
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.CookiePolicy = (function(window, $, namespace) {
    'use strict';
    //variables
    var dropCookie = true, // false disables the Cookie, allowing you to style the banner
        cookieDuration = 0, // Number of days before the cookie expires, banner reappears
        cookieName = 'cookiepolicyaccepted', // Name of our cookie
        cookieValue = 'yes', // Value of cookie
        // methods
        init,
        ShowBanner, CreateCookie, CheckCookie, EraseCookie, RemoveMe;


    ShowBanner = function(name, value, days) {
            $("body").find("#cookieBanner").show();
            $("#cookieBanner a.close").on("click", function(e) {
                e.preventDefault();
                RemoveMe();
                //CreateCookie(cookieName,cookieValue, cookieDuration); 
                INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
                    method: "Post",
                    data: JSON.stringify({"key":cookieName,"value":cookieValue ,"expires":cookieDuration}),
                    success_callback: function(data) {
                    }
                });
                    ///
            });
        },
        // CreateCookie = function(name,value,days) {
        //         if (days) {
        //             var date = new Date();
        //             date.setTime(date.getTime()+(days*24*60*60*1000)); 
        //             var expires = "; expires="+date.toGMTString(); 
        //         }
        //         else {
        //             var expires = "";
        //         }
        //         if(dropCookie) { 
        //             document.cookie = name+"="+value+expires+"; path=/"; 
        //         }
        // },
        CheckCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        EraseCookie = function(xhtml, ele) {
            CreateCookie(name, "", -1);
        },
        RemoveMe = function(data) {
            $("body").find("#cookieBanner").hide();
            if($('.mainNavigation').hasClass('navbar-fixed-top')) {
                $('.mainNavigation').css('top',0);
            }
            if($('.mobileNavigation').hasClass('navbar-fixed-top')) {
                $('.mobileNavigation').css('top',0);
            }
            if($('#pdp-navigation').hasClass('navbar-fixed-top')) {
                $('#pdp-navigation').css('top', $('.mainNavigation').outerHeight());
            }
        },
        init = function() {
            var getCookieExpiryDate = ($("input.cookieDuration").val()) ? $("input.cookieDuration").val() : 365;
            cookieDuration = parseInt(getCookieExpiryDate);
            window.onload = function() {
                if (CheckCookie(cookieName) !== cookieValue) {
                    ShowBanner();
                }
            };
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.CookiePolicy.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.PreferenceTab = (function(window, $, namespace) {
    'use strict';
    //variables
    var PreferenceCheckbox = $(".preference .panel-body li .custom-checkbox"),
         CheckBoxes = $(".preference .panel-body .custom-checkbox input"),
         SelectAll = $(".preference .panel-heading .custom-checkbox input"),
        init, BindCheckboxes,ReadCookies,BakeCookies, CookieValue = {},Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    
    BakeCookies = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadCookies = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
    },

    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
            if($(this).prop("checked")===true){
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).trigger("click");
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).trigger("click");
                }); 
            }
            BakeCookies("PrefernceUpdated", true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
                var getCookie = ReadCookies("USR_DETAIL"),
                    CheckBoxVal = $(this).val(),
                    ExistingInterest = (getCookie!==null && getCookie.AreaOfInterest) ? getCookie.AreaOfInterest : [],
                    ParentEle = $(this).parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    UserInterest = [] , MergedJson; 

                if($(this).prop("checked")){
                    UserInterest.push(CheckBoxVal);
                    MergedJson = INFORMA.Utils.ArrayUnique(UserInterest.concat(ExistingInterest));
                }else{
                    var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                    MergedJson = INFORMA.Utils.RemoveArrayItem(tempArray,CheckBoxVal);
                    $(this).parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);

                }
                
                if(MergedJson && getCookie!==null){
                    getCookie.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", getCookie);
                }else{
                    CookieValue.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", CookieValue);
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
            BakeCookies("PrefernceUpdated", true);
        });
    },


    init = function() {
        if(PreferenceCheckbox.length){
            BindCheckboxes();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());
/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.PreferenceTab = (function(window, $, namespace) {
    'use strict';
    //variables
    var PreferenceCheckbox = $(".preference .panel-body li .custom-checkbox"),
         CheckBoxes = $(".preference .panel-body .custom-checkbox input"),
         SelectAll = $(".preference .panel-heading .custom-checkbox input"),
        init, BindCheckboxes,ReadCookies,BakeCookies, CookieValue = {},Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    
    BakeCookies = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadCookies = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
    },

    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
            if($(this).prop("checked")===true){
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).trigger("click");
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).trigger("click");
                }); 
            }
            BakeCookies("PrefernceUpdated", true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
                var getCookie = ReadCookies("USR_DETAIL"),
                    CheckBoxVal = $(this).val(),
                    ExistingInterest = (getCookie!==null && getCookie.AreaOfInterest) ? getCookie.AreaOfInterest : [],
                    ParentEle = $(this).parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    UserInterest = [] , MergedJson; 

                if($(this).prop("checked")){
                    UserInterest.push(CheckBoxVal);
                    MergedJson = INFORMA.Utils.ArrayUnique(UserInterest.concat(ExistingInterest));
                }else{
                    var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                    MergedJson = INFORMA.Utils.RemoveArrayItem(tempArray,CheckBoxVal);
                    $(this).parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);

                }
                
                if(MergedJson && getCookie!==null){
                    getCookie.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", getCookie);
                }else{
                    CookieValue.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", CookieValue);
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
            BakeCookies("PrefernceUpdated", true);
        });
    },


    init = function() {
        if(PreferenceCheckbox.length){
            BindCheckboxes();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());

/*
 * Events Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.EventsViews = (function(window, $, namespace) {
    'use strict';
    //variables
    var EventsLists = $('.events-search'),
        Views = EventsLists.find('.views a'),
        CalendarView = EventsLists.find('.views a.icon-calendar'),
        ListView = EventsLists.find('.views a.icon-list-view'),
        Calendar = $('section[data-view="calendar-view"] .container'),
        List = $('section[data-view="list-view"] .container'),
        MonthSelect = $('select[name="month"]'),
        SectorSelect = $('select[name="sector"]'),
        Country = $('select[name="country"]'),
        Type = $('select[name="eventType"]'),
        NextButton = $('.fc-next-button'),


        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMMM YYYY'),
       _end = moment(_Start).add(11, 'months').format('MMMM YYYY'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents,
        SetCalendarEvents, RenderParticularMonth, RenderChange,
        SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents;


    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {

        //INFORMA.Spinner.Show($('body'));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    EqualHeight = function(){
           var highestBox = 0,
            EachItem = List.find(".content-wrap"),
            padding = 0;

            jQuery('section[data-view="list-view"]').show();
          EachItem.each(function(){
                  if(jQuery(this).height() > highestBox){
                  highestBox = jQuery(this).height();
                }
          });
          if(jQuery('body').hasClass('calendar-view')) {
              jQuery('section[data-view="list-view"]').hide();
          }

          EachItem.height(highestBox + padding);
          if(INFORMA.global.device.viewportN == 2) {
            EachItem.height("auto");
          }
    },

    RenderChange = function(data) {
        CheckEvents(data);
        SetCalendarEvents(data);
        SetListEvents(data);
    },

    SetListEvents    = function(data) {
        var results = data.SearchDictionary,
              html = "";

          for (var key in results) {
              if (results.hasOwnProperty(key)) {
                  var Data = results[key],
                      HeaderText = key,
                      TemplateName = (Templates.EventpageListviewTemplate !== "undefined") ? Templates.EventpageListviewTemplate : "",
                      ListTemplate = Handlebars.compile(TemplateName);
                  Data.Month = HeaderText;
                  html += ListTemplate({ results: Data });
              }
          }
          List.html(html);
           NoEventsFound();
           EqualHeight();

          CheckCount();

          var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date('1 '+ViewDateText));

          if(ViewDate.format('MMMM YYYY') == _Start) {
            List.find('.previous').addClass('arrow-desabled');
          } else {
             List.find('.previous').removeClass('arrow-desabled');
          }

          if(ViewDate.format('MMMM YYYY') == _end) {
            List.find('.next').addClass('arrow-desabled');
          } else {
             List.find('.next').removeClass('arrow-desabled');
          }

          //RenderClickEvents();
    },
    CheckCount = function() {
        List.each(function() {

            var Count = jQuery(this).data('count'),
                Items = List.find('.events-section').length;

            if(Items > Count) {
                jQuery(this).find('.events-section:nth-child(n+'+(Count+1)+')').hide();
                jQuery(this).next('.more-events').find('.btn-more-events').removeClass('hidden');
            } else {
                jQuery(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
        })
    },
    RenderOnLoad = function() {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY');
            EqualHeight();
        var obj = {
            data:JSON.stringify({MonthYear: DatePass})
        }
        _previousDate = date;
        GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderLoadEvents, null, null);
        CheckCount();
    },

    RenderLoadEvents = function(data) {
        var _contentheight = null, _dayView = [],
            _vp = INFORMA.global.device.viewportN,
            header = {
                left: 'prev',
                center: 'title',
                right: 'next'
            };

        if(_vp === 2) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else if(_vp === 1) {
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        } else {
            _contentheight = 1700;
            _dayView = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        // if(_vp === 1 || _vp === 0) {
        //     header = {
        //         left: 'title',
        //         right: 'prev,next'
        //     }
        // } else {
        //     header = {
        //         left: 'prev',
        //         center: 'title',
        //         right: 'next'
        //     }
        // }

        List.find('.previous').addClass('arrow-desabled');
        NoEventsFound();
        Calendar.html("");
        Calendar.fullCalendar({
                header: header,
                eventLimit: true,
                contentHeight: _contentheight,
                weekMode: 'liquid',
                firstDay: 1,
                viewRender: function(view) {
                    var Current = moment(new Date()).format('MMMM YYYY'),
                        ViewDate = moment(view.title).format('MMMM YYYY'),
                        End = moment(new Date()).add(11, 'months').format('MMMM YYYY');
                        //
                    if(view.title == Current) {
                        jQuery('.fc-prev-button').addClass('disabled');
                    } else {
                        jQuery('.fc-prev-button').removeClass('disabled');

                    }
                    if(view.title === End) {
                        jQuery('.fc-next-button').addClass('disabled');
                    } else {
                        jQuery('.fc-next-button').removeClass('disabled');
                    }
                },
                dayNamesShort: _dayView,
                dayClick: function(date, jsEvent, view) {
                    var _vp = INFORMA.global.device.viewportN;

                    if(_vp === 2 || _vp === 1) {
                        var selectedDate = date.format(),
                            parentNode = $(this).parents('.fc-row.fc-widget-content'),
                            DateAttr = $(this).data('date'),
                            Container = $(this).parents('.fc-view-container'),
                            ItemList = null;
                        Container.find('.fc-widget-content').removeClass('open');
                        Container.toggleClass('open-event');
                        Container.find('.events-wrap').remove();
                        Container.find('.fc-day-number').css('color','#6a7285');
                        if($(this).hasClass('event-present')) {
                            ItemList = Container.find('.events[data-date="'+DateAttr+'"]').clone();
                            ItemList.addClass('cloned');
                            parentNode.after('<div class="events-wrap"></div>');
                        } else {
                            parentNode.after('');
                        }

                        if(Container.hasClass('open-event')) {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').addClass('open');
                            Container.find('.fc-day-number[data-date="'+DateAttr+'"]').css('color','#fff');
                            Container.find('.events-wrap').html(ItemList);
                        } else {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').removeClass('open');
                            Container.find('.events-wrap').remove();
                        }

                        ItemList = "";
                        Container.find('.events-wrap').hide().slideDown();
                    }

                },
                eventAfterAllRender: function(view) {
                    var _vp = INFORMA.global.device.viewportN;
                    if(_vp === 2 || _vp === 1) {

                        var Events = $('.fc-event-container .events');

                        Events.each(function () {
                            var DateField = $(this).data('date');
                            $('td.fc-day-number[data-date="'+DateField+'"]').addClass('events-now');
                            $('td.fc-widget-content[data-date="'+DateField+'"]').addClass('event-present');
                        })
                    }

                    if(_vp === 0) {
                        var OtherMonths = $('.fc-day-number.fc-other-month');

                        OtherMonths.each(function() {
                            var DateView = $(this).data('date'),
                                Month = moment(new Date(DateView)).format('MMM'),
                                Dates = moment(new Date(DateView)).format('DD');

                            $(this).html(Dates + '<sup>\/' +Month+ '</sup>');
                        })
                    }
                },
                eventRender: function(event, element, view) {
                    var CurrentDate = new Date(),
                        ItemDate = new Date(event.start._i),
                        DateAttr = moment(ItemDate).format('YYYY-MM-DD'),
                        CountryText = "",
                        ViewDate = view;

                        if(event.Country != null) {
                            CountryText = event.Country;
                        }

                    if(moment(CurrentDate) > moment(ItemDate)) {
                        if(moment(CurrentDate).format('d MMM YYYY') == moment(ItemDate).format('d MMM YYYY')) {
                            return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                        } else {
                            return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                        }
                    } else {
                        return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    }
                }
        });
        CheckEvents(data);
        SetCalendarEvents(data);
    },
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(new Date('1 ' +date)).format('MMMM YYYY'); 
                
                var obj = { 
                     data:JSON.stringify({MonthYear: NextMonth, 
                        SectorId: SectorSelect.val(),
                        eventType: Type.val()
                        })
                } 

        GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null); 

    },

    CheckEvents = function(data) {

        var results = data.SearchDictionary,
            List = [];

        for(var key in results) {
            List = results[key];
        }

        if(List.length > 0) {
            jQuery('.no-results').hide();
        } else {
            jQuery('.no-results').show();
        }
    },

    SetCalendarEvents = function(list) {
        Calendar.fullCalendar('removeEvents');
        var Month = Object.keys(list.SearchDictionary)[0],
            data = list.SearchDictionary[Month].ModelItem;

        var EventList = [];

        for(var key = 0; key < data.length ; key++) {
            EventList.push({
                "title": data[key].Title,
                "start": new Date(data[key].EventDate),
                "State": data[key].State,
                "Country": data[key].Country
            })
        }
        jQuery('section[data-view="calendar-view"]').show();
        for(var key = 0; key < EventList.length ; key++) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
        if(jQuery('body').hasClass('list-view')) {
            jQuery('section[data-view="calendar-view"]').hide();
        }
    }

    SwitchEvents = function() {
        Views.on('click', function(e) {
            e.preventDefault();
            var ViewMode = jQuery(this).data('viewport');
            Views.removeClass('active');
            jQuery(this).addClass('active');
            jQuery('body').removeClass('list-view');
            jQuery('body').removeClass('calendar-view');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);
            jQuery('section[data-view="'+ViewMode+'"]').show();

            NoEventsFound();

        })



        MonthSelect.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date('1 '+value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
              data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                eventType: Type.val(),
              Country: Country.val()})
            } 

            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })
        Country.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
               data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                eventType: Type.val(),
               Country: jQuery(this).val()})
            }


            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })

        Type.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
               data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                eventType: jQuery(this).val(),
               Country: Country.val()})
            }


            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })


        SectorSelect.on('change', function(){
            var obj = {
              data:JSON.stringify({  MonthYear: MonthSelect.val(),
                SectorId: jQuery(this).val(),
                eventType: Type.val(),
              Country: Country.val()})
            }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })

    },
    NoEventsFound = function() {

        var Container = jQuery('.events-container'),
            Items = Container.find('.events-section');

            if(Items.length > 0) {
                jQuery('.no-result').addClass('hidden');
                $('.fc-view-container').removeClass('hidden');
            } else {
                jQuery('.no-result').removeClass('hidden');
                $('.fc-view-container').addClass('hidden');
            }
    },
    MoreEventsFunc = function() {
        MoreEvents.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.find('.container').data('count');
                //
            Parent.find('.events-container').find('.events-section:nth-child(n+' + (Count + 1) + ')').slideToggle();
            jQuery(this).toggleClass('showLess');
        });
    },

    ListChangeEvents = function() {
        $(document).on('click', 'section[data-view="list-view"] .next', function() {
            var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
                    prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');

                    var obj = {
                       data:JSON.stringify({  MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                       Country: Country.val(),
                        eventType: Type.val()})
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

        })
        $(document).on('click','.fc-next-button, .fc-prev-button', function(){
            var currentMonth = jQuery(this).parents('.fc-toolbar').find('h2').text();
            RenderParticularMonth(currentMonth);
        })
        $(document).on('click', 'section[data-view="list-view"] .previous', function() {
            var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
                    prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');

                    var obj = {
                      data:JSON.stringify({   MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                      Country: Country.val(),
                        eventType: Type.val()})
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

        })
    }

    init = function() {
        if(EventsLists.length > 0) {
            SwitchEvents();
            RenderOnLoad();
            MoreEventsFunc();
            ListChangeEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());

var INFORMA = window.INFORMA || {};
INFORMA.FAQs = (function (window, $, namespace) {
    'use strict';
    //variables
    var FaqMoreBtn = $('.btn-faq-more'),
        pageNo = 0,
        AccordianWrapper = $('.accordian-structure'),
        PanelWrapper = AccordianWrapper.find('.panel-group'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        init, BindMore, ResetAccordian, GetAjaxData, GetFaqIds, RenderFaqs;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify(data),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    RenderFaqs = function (data, Button) {

        var Results = data,
            List = Results.FaqList,
            AccordianId = Results.FaqAccordionId,
            Html = "",
            TabsValue = "";

        for (var key in List) {
            var Data = List[key],
            TemplateName = (Templates.AccordianTemplate !== "undefined") ? Templates.AccordianTemplate : "",
            ListTemplate = Handlebars.compile(TemplateName);
            Data.FaqAccordionId = AccordianId;
            if(Button.parents('.accordian-structure').attr('data-tabs'))
            Data.Tabs = Button.parents('.accordian-structure').attr('data-tabs');
        
            Html += ListTemplate({ results: Data });
        }

        if(Button.parents('.accordian-structure').attr('data-tabs').length > 0) {
            TabsValue = Button.parents('.accordian-structure').attr('data-tabs');
        }

        if($('.help-faq-wrapper').length > 0) {
            Button.parents('.help-faq-wrapper').find('.panel-group[data-panel="'+AccordianId + TabsValue+'"]').append(Html);
        } else {
            Button.parents('.accordian-wrap').find('.panel-group[data-panel="'+AccordianId + TabsValue+'"]').append(Html);
        }

        if (Results.FaqRemainingCount < 1) {
            $('.panel-group#' + AccordianId + TabsValue).parent().find('.btn-faq-more').hide();
        } else {
            $('.panel-group#' + AccordianId + TabsValue).parent().find('.btn-faq-more').show();
        }
    },

    GetFaqIds = function (Parent) {
        var panels = Parent.find('.panel-collapse'),
            ids = [];

        panels.each(function () {
            var Current = $(this).attr('data-fetch');
            ids.push(Current);
        })

        return ids;
    },

    ResetAccordian = function () {
        var Items = AccordianWrapper.find('.panel-group');
        if($('.help-faq-wrapper').length > 0) {
            $('.help-faq-wrapper .accordian-wrap').addClass('hide');
            $('.help-faq-wrapper .accordian-wrap:first-child').removeClass('hide').addClass('show');
        }
        Items.each(function () {
            $(this).attr('data-pageno', pageNo);
        });
    },

    BindMore = function () {
        FaqMoreBtn.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.accordian-wrap'),
                CurrentPage = Parent.find('.panel-group').attr('data-pageno'),
                HelpDropdown = Parent.parents('.accordian-structure').find('.help-faq-select'),
                Count = Parent.parents('.accordian-structure').attr('data-count'),
                CurrentPageItemGuid = Parent.parents('.accordian-structure').attr('data-CurrentPageItemGuid'),
                SearchTextFaqs = $('.SearchTextFAQ').val(),
                _Object = {
                    PageNo: 0,
                    PageSize: Count,
                    CurrentPageItemGuid: CurrentPageItemGuid,
                    SearchText: SearchTextFaqs
                };

            _Object.ExcludedFAQItemIds = GetFaqIds(Parent);

            if (HelpDropdown.length > 0) {
                _Object.FAQTypeItemGuid = HelpDropdown.val();
            } else {
                _Object.FAQTypeItemGuid = null;
            }
            Parent.find('.panel-group').attr('data-pageno', (parseInt(CurrentPage) + 1));

            GetAjaxData(Urls.GetFAQs, "Post", _Object, RenderFaqs, null, $(this));
        })
    },

    init = function () {
        if (AccordianWrapper.length > 0) {
            ResetAccordian();
            BindMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.FAQs.init());
/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.featureList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _featureList = $('.feature-list'),
        _featureListSection = $('.feature-list-section-pharma, .feature-list-section'),
        // methods
        init,
        _hideList,
        _bindShowMore,
        equalHeight;

    _bindShowMore = function() {
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click', function() {
            var _vp = INFORMA.global.device.viewport,
                _limit = $(this).parents('.feature-list-section').data(INFORMA.global.device.viewport) + 1,
                Parent = $(this).parents('.feature-list-section'),
                Children = Parent.find('.feature-list-container');
                $(Children.slice((_limit-1), Children.length)).slideToggle();
                Parent.toggleClass('showLess');
        });
    }
    _hideList = function(ListItems) {
        ListItems.each(function() {
            var _limit = $(this).data(INFORMA.global.device.viewport) + 1;
            $(this).find('.feature-list-container:nth-child(n+' + _limit + ')').hide();

        });
    }
    equalHeight = function () {
        var EachView = jQuery('.feature-list-section-pharma, .feature-list-section');
        EachView.each(function () {
            var Items = jQuery(this).find('.feature-list-container'),
                _maxHeight = 0,
                _padding = 80;
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight);
        })
    }
    init = function() {
        if (_featureListSection.length > 0) {
            //_hideList(_featureListSection);
            //_bindShowMore();
            equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());

var INFORMA = window.INFORMA || {};
INFORMA.formComponents = (function(window, $, namespace) {
    'use strict';
    var _toolTip = $('.hasToolTip .icon.icon-info'),

        //functions
        init,
        _bindToolTip,
        _showOverlay, _validateForm;

    _showOverlay = function(container) {

        //alert(1);
    }

    _validateForm = function() {
        $('#requestDemoForm').validate({
            errorPlacement: function(error, element) {        
                if (element.attr('type') === 'select') {          
                    error.insertAfter(element.closest('.chosen-container'));        
                }
                else{
                  error.insertAfter(element);        
                }
            }
        });
        $('#requestTrial').validate({
            ignore: [],
            errorPlacement: function(error, element) {     
              console.log(error, element);   
                if (element.hasClass('chosen-select')) {          
                    error.insertAfter(element.siblings('.chosen-container'));        
                }
                else{
                  error.insertAfter(element);        
                }
            },
            submitHandler: function(){
              console.log("Form Submit")
            }
        });
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        // _showOverlay();
        // _bindToolTip();
        // _validateForm();

    };

    _bindToolTip = function() {
        _toolTip.on('click', function() {
            $(this).toggleClass('active');
            $(this).parent().parent() // .hasToolTip
                .children('.tooltip-placeholder').slideToggle();
        })
    }


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formComponents.init());

var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _showProgressiveTabs,
        _renderMultiSelect,
        _renderSingleSelect,
        _showNextTab,
        _showPrevTab,
        _appendNextBtn,
        _appendBackBtn,
        _myinterestsSection = $('.register-myinterests-section'),
        _myinterestForm = $('.register-myinterests-form'),
        _myinterestFormContainer = $('.register-myinterests-form-container'),
        _myinterestFormTabContainer = _myinterestFormContainer.find('tab-content'),
        _myinterestFormSubmitBtn = _myinterestForm.find('input[type="submit"]'),
        _stepOneContaner = _myinterestFormContainer.find('#step1'),
        _stepTwoContaner = _myinterestFormContainer.find('#step2'),
        _recommendedTips = $('.recommended-tips'),
        _recommendedTipsContainer = $('.recommended-tips-container'),
        _recommendedTipCol = $('.recommended-tips-col'),
        _appendSteps,
        _wrapFormContainer,
        _renderAllContainers,
        _renderRecommendedTips,
        _updateMultiSelect,
        _multiselectonchange,
        _showSelectAll,
        _hideSelectAll,
        _yourinterestguid = [],
        _yourinterestitem = [],
        _isAllSelected = 'false',
        //_validateMultiSelct,
        _showRegisterFormBtn = $('.show-register-form'),
        _showRegisterForm,
        _showRegisterFormPopup,
        _myinterestsModal = $('#registerMyinterestModal'),
        _myinterestsModalClose = $('.register-myinterests-close'),
        _validateEmailDomainMsg,
        _getAjaxData, _SelectAll,
        _updateProductVertical,
        Urls = INFORMA.Configs.urls.webservices,
        _parseResults,
        _bindNumber,
        _clearFormInput,
        _bindToggleTab,
        _destroyMultiSelect,
        _addTabNumbers,
        _closeMyInterestModal;

    //methods

    _clearFormInput = function(form) {
        form.find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
        form.find('.area-interests-guid').val('');
        form.find('.area-interests-text').val('');
        form.find(".field-validation-error span").hide();
        form.find('input[type=radio]').removeAttr('checked');
        form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        form.find('.preselected-checkbox input[type=checkbox]').prop('checked', true);
    }
    _parseResults = function(data) {
        $('span.product-name-holder').html(data.ProductName);
        $('.product-name-holder').val(data.ProductName);
        $('.vertical-name-holder').val(data.VerticalName);
        $('.tc-product-name').html(data.ProductName);
        $('.tc-vertical-name').html(data.VerticalName);
        if (data.ProductName != null) {
            $('.tc-product-name').html(data.ProductName);
        } else {
            $('.tc-product-name').html(data.VerticalName);
        }
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }
    _updateProductVertical = function() {
        var productId = {
            'guid': $('.page-id').val()
        };
        _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseResults, null, null);
    }
    _getAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, SearchType);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data, SearchType);
                    }
                }
            });
        },

    _addTabNumbers = function() {
            var progressiveTabs = $('.form-progressive-wizard a[data-toggle="tab"]');
            if (progressiveTabs.length > 0) {
                $.each(progressiveTabs, function(i) {
                    $(this).prepend('<span class="tab-numbers">' + (i + 1) + '</span>');
                });
            }
        },

        _bindToggleTab = function() {
            $('.form-progressive-wizard a[data-toggle="tab"]').on('show.bs.tab', function(e) {
                if (_myinterestForm.valid() == true) {
                    var $target = $(e.target);
                    if ($target.attr('href') == "#step2" && $target.parent().attr('class') == 'active') {
                        _recommendedTipCol.css('display', 'block');
                    } else {
                        _recommendedTipCol.css('display', 'none');
                    }
                    if ($target.parent().hasClass('disabled')) {
                        return false;
                    }
                } else {
                    e.preventDefault();
                }
            });
        }
    _showRegisterFormPopup = function() {
        _myinterestsModal.find('.modal-body').empty();
        _myinterestsModal.find('.modal-body').append(_myinterestsSection);
        var chosenSelect = $("form.register-myinterests-form .chosen-select"),
        chosenCotainer = $('form.register-myinterests-form .chosen-container');
        if(chosenCotainer.length > 0 ){
          chosenCotainer.remove();
        }
        if(chosenSelect.length > 0){
          chosenSelect.chosen('destroy');
          chosenSelect.chosen({
              disable_search_threshold: 10,
              width: "100%"
          });
        }
        _myinterestsModal.find('.modal-body .container').removeClass('container');
        _clearFormInput(_myinterestForm);
        _yourinterestguid = [];
        _yourinterestitem = [];
        var resetFormValidate = _myinterestForm.removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(resetFormValidate);
        var $active = $('.form-progressive-wizard .triangle-nav li.active');
        if ($active) {
            _showPrevTab($active);
        }
        _bindToggleTab();
        _destroyMultiSelect();
        _renderMultiSelect();

        $.each($('.custom-multiselect'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });

        $.each($('.select-wrapper'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });
        _myinterestsModal.modal('show');
    }

    _showRegisterForm = function() {
        $('body').on('click', '.show-register-form', function(e) {
            if ($(this).attr('data-show-register') == 'true') {
                e.preventDefault();
                e.stopPropagation();
                $('.redirect-url-field').val($(this).attr('data-url'));
                _showRegisterFormPopup();
            }
        });
    }

    _renderRecommendedTips = function() {
        _recommendedTipsContainer.append(_recommendedTips);
        _recommendedTipCol.css('display', 'none');
    }
    _destroyMultiSelect = function() {
        _myinterestForm.find('select[multiple="multiple"]').multiselect('rebuild');
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                }
            });
        }
    }
    _renderAllContainers = function() {
        _myinterestForm.append(_myinterestFormContainer);
        _myinterestForm.addClass('row');
        _addTabNumbers();
        _renderSingleSelect();
        _renderMultiSelect();
    }
    _wrapFormContainer = function() {
        _myinterestFormContainer.before(_myinterestForm);
    }
    _appendSteps = function() {
        var step1Block = _myinterestForm.find('fieldset.step1'),
            step2Block = step1Block.nextAll();
        _stepOneContaner.prepend(step1Block);
        _stepTwoContaner.prepend(step2Block);
        //    aboutYouBlock.remove();
    }

    _appendBackBtn = function() {
        var backBtn = $('.prev-step')[0],
            btnContainer = _myinterestForm.find(":submit").parent();
        btnContainer.append(backBtn);
    }
    _showNextTab = function(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
        _recommendedTipCol.css('display', 'block');
        _myinterestFormContainer.removeClass('background-pattern');
    }
    _showPrevTab = function(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
        $('.about-you-details').find(":input:not([type=hidden]):first").focus();
        _recommendedTipCol.css('display', 'none');
        _myinterestFormContainer.addClass('background-pattern');
    }

    _renderMultiSelect = function() {
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                    var placeHolder = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).multiselect({
                        buttonText: function(options, select) {
                            return placeHolder;
                        },
                        maxHeight: 140,
                        onChange: _updateMultiSelect,
                        onDropdownShow: _showSelectAll,
                        onDropdownHidden: _hideSelectAll,
                        numberDisplayed: 1
                    });
                    var placeHolderText = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).next().find('button.multiselect>.multiselect-selected-text').html(placeHolderText)
                    var mutiselectContainer = $(this).next().find('.multiselect-container');
                    if (!mutiselectContainer) {
                        var newMultiselectContainer = $(this).parent().find('.multiselect-container').detach();
                        $(this).next().append(newMultiselectContainer);
                    }
                    var selectAllDiv = $('<div class="select-all-bottom"><a class="multiselect-all" data-selectall="false" href="#">Select all</a></div>');
                    $(this).next().append(selectAllDiv);
                }
            });
            _SelectAll();
        }
        $('.multiselect-container').mCustomScrollbar();
    }

    _showSelectAll = function(select) {
        $(this.$container).parent().find("select").addClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'block');
    }
    _hideSelectAll = function() {
        $(this.$container).parent().find("select").removeClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'none');
    }
    _updateMultiSelect = function(option, checked, select) {
        if (option) {
            if (checked) {
                _yourinterestitem.push(option.text());
                _yourinterestguid.push(option.val());
            } else {
                _yourinterestitem.splice($.inArray(option.text(), _yourinterestitem), 1);
                _yourinterestguid.splice($.inArray(option.val(), _yourinterestguid), 1);
            }
            _yourinterestguid = $.unique(_yourinterestguid);
            _yourinterestitem = $.unique(_yourinterestitem);
            _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
            _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
        }

    }
    _SelectAll = function() {
        var Element = $(".select-all-bottom a");
        if (Element.length > 0 ) {
          $.each(Element, function(){
            $(this).on("click", function(e) {
                _isAllSelected = $(this).attr('data-selectall');
                e.preventDefault();
                if (_isAllSelected == 'false') {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("selectAll", true);
                    var CurrentVals = CurrentSelect.val();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                    $.each(CurrentTxt,function(index, value){
                      if ($.inArray(value, _yourinterestitem)==-1){
                        _yourinterestitem.push(value);
                      }
                    });
                    $.each(CurrentVals,function(index, value){
                        if ($.inArray(value, _yourinterestguid)==-1){
                          _yourinterestguid.push(value);
                        }
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                    $(this).attr('data-selectall', 'true');
                  //  _isAllSelected = true;
                } else {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("deselectAll", false);
                    var CurrentVals = CurrentSelect.find('option').map(function() {
                        return $(this).val();
                    }).get();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                     _yourinterestitem = $.grep(_yourinterestitem, function(value) {
                        return $.inArray(value, CurrentTxt) < 0;
                    });
                     _yourinterestguid = $.grep(_yourinterestguid, function(value) {
                        return $.inArray(value, CurrentVals) < 0;
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                  //  _isAllSelected = false;
                    $(this).attr('data-selectall', 'false');
                }
                return false;
            });
          });

        }
    }
    _showProgressiveTabs = function() {
        _bindToggleTab();
        $(document).on('click', '.next-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            var emailError = $('form.register-myinterests-form .email-field').parent().find('.email-validation-message.show');
            $('form.register-myinterests-form').find('.field-validation-error span').css('display', 'block');
            if (emailError.length == 0) {
                if (_myinterestForm.valid() == true) {
                    var formSubmitBtn = $('form.register-myinterests-form').find('.form-submit-border .btn');
                    formSubmitBtn.removeAttr('disabled');
                    _showNextTab($active);
                }
            }
        });

        $(document).on('click', '.prev-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }

    // _validateMultiSelct = function() {
    //     $.validator.setDefaults({
    //         ignore: ":hidden:not(.chosen-select)"
    //     });
    //     $("form.register-myinterests-form .chosen-select").on('change', function() {
    //         $(this).valid();
    //     });
    // }

    _renderSingleSelect = function() {
        $("form.register-myinterests-form .chosen-select").chosen({
            disable_search_threshold: 10,
            width: "100%"
        });
    }

    _closeMyInterestModal = function() {
        _myinterestsModalClose.click(function() {
            $("form.register-myinterests-form .chosen-select").chosen('destroy');
        });
    }

    init = function() {
        if (_myinterestForm.length > 0) {
            _showProgressiveTabs();
            _appendBackBtn();
            _appendSteps();
            _wrapFormContainer();
            _renderAllContainers();
            _bindNumber();
            _renderRecommendedTips();
            //_validateMultiSelct();
            _showRegisterForm();
            _updateProductVertical();
            _closeMyInterestModal();
        } else {
            _myinterestsSection.css('display', 'none');

        }

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.formRequestForDemo = (function(window, $, namespace) {
    'use strict';
     var _toolTip = $('.hasToolTip .icon.icon-info'),

//functions
     init,
      _bindToolTip,
        _showOverlay;

    _showOverlay = function(container){

      //alert(1);
    }

    init = function() {
          //todo: No null check, dont execute these bindings if forms are not there

          //  _showOverlay();
        //    _bindToolTip();

    };

    _bindToolTip = function(){
          _toolTip.on('click',function(){
                $(this).toggleClass('active');
                $(this).parent().parent() // .hasToolTip
                        .children('.tooltip-placeholder').slideToggle();
          })
   }


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formRequestForDemo.init());

var INFORMA = window.INFORMA || {};
INFORMA.forms = (function(window, $, namespace) {
    'use strict';
    var _formModal = $('.form-modal'),
        _formModalBtn = $('.form-btn-container .form-modal-btn'),
        _formSubmitStatus = $('.submit-status'),
        _formInlineContiner,
        months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthName = '',
        monthNbr = '',
        Urls = INFORMA.Configs.urls.webservices,
        formHeading,
        productId,
        _formId,

        //functions
        init,
        _validateEmail,
        _showModal,
        _resetForm,
        _getAjaxData,
        _parseResults,
        _parseVerticalName,
        _bindProductId,
        _bindToolTip,
        _bindCalendar,
        _bindSelectOptions,
        _bindValidationLogic,
        _showOverlay,
        _showOverlayQueryString,
        _validateAllForms,
        _reCaptchaHandler,
        _disableSubmit,
        _showHideInlineForm,
        _HideOverlay,
        _showFormIntro,
        _bindNumber,
        _updateProductVerticalName,
        //_validateChoosenSelect,
        _destroyChosenInDevice,
        _customPhoneErrorMsg;

    // _validateChoosenSelect = function() {
    //     $.validator.setDefaults({
    //         ignore: ":hidden:not(.chosen-select)"
    //     });
    //     $(".wffm-form .chosen-select").on('change', function() {
    //         $(this).valid();
    //     });
    // }

    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }

    _HideOverlay = function() {
        $('.form-modal').on('hidden.bs.modal', function() {
            var Parent = $(this),
                Status = Parent.find('.submit-status');

            Status.attr('data-status', '');

            Parent.find('.submit-response, .error-response').addClass('hide');

            Parent.find('form').removeClass('hide');
        })
    }

    _reCaptchaHandler = function() {
        $("form.get-in-touch, form.request-a-demo").submit(function() {
            var widgetId, captcha_response, g_captchaId = $(this).find('.g-recaptcha').attr('id');
            if (window.gRecaptchaWidget) {
                widgetId = $.grep(window.gRecaptchaWidget, function(obj) {
                    return obj.captchaElementId === g_captchaId;
                })
            }
            if (widgetId) {
                captcha_response = grecaptcha.getResponse(widgetId[0].captchaWidgetId);
            }
            var captchaMsgContainer = $(this).find('.captcha-wrapper .field-validation-valid');
            if (captcha_response.length == 0) {
                // Captcha failed
                captchaMsgContainer.css('display', 'block').html('The captcha field is required.').addClass('field-validation-error');
                return false;
            } else {
                // Captcha is Passed
                captchaMsgContainer.css('display', 'none');
                return true;
            }
        });

        // grecaptcha.render('captcha-wrapper', {
        //     'sitekey': '6LezlCQTAAAAALwyoWgTPjpFlBYTWy7pfSAXbPfn', //enter sitekey here
        //     'callback': function(e) {
        //         if (e.length > 0) {
        //             $('#hiddenRecaptcha-error').hide();
        //         }
        //     }
        // });
        //
        // $('#hiddenRecaptcha').rules('add', {
        //     required: function() {
        //         if (grecaptcha.getResponse().length !== 0) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     },
        //     messages: {
        //         required: "Enter valid captcha"
        //     }
        // });
    }

    _showOverlayQueryString = function(container) {
        var url = window.location.href;
        if (url.indexOf('?ResponseStatus=Success') != -1 || url.indexOf('/ResponseStatus/Success') != -1) {
            _formModal.modal({
                show: true,
                backdrop: "static"
            });
        }
    }

    _resetForm = function($form) {
        $form.find('input[type=text], input[type=password], input[type=number], input[type=email], select, textarea').val('');
        $form.find('input[type=radio]').removeAttr('checked');
        $form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        $form.find('.preselected-checkbox input[type=checkbox]').prop('checked', true);
    }

    _showHideInlineForm = function() {
        var formInlineActiveTab = $('.contactUsPage-contactUs .tab-pane.active');
        if (formInlineActiveTab.length > 0) {
            var inlineTabError = formInlineActiveTab.find('.error-response'),
                inlineTabErrorForm = inlineTabError.parents('.tab-pane.active').find('form');
            if (inlineTabError.length > 0) {
                inlineTabErrorForm.addClass('hide');
            } else {
                inlineTabErrorForm.removeClass('hide');
            }
            var inlineTabSucess = formInlineActiveTab.find('.submit-response'),
                inlineTabSucessForm = inlineTabSucess.parents('.tab-pane.active').find('form');
            if (inlineTabSucess.length > 0) {
                inlineTabSucessForm.addClass('hide');
            } else {
                inlineTabSucessForm.removeClass('hide');
            }
        }
    }

    _showOverlay = function() {
        var formSubmitResponseModal;
        if (_formSubmitStatus.length > 0) {
            if (_formSubmitStatus.attr('data-status') == "") {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {
                    formSubmitResponseModal.find('form').removeClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').addClass('hide');
                    formSubmitResponseModal.removeClass('centreAlign');
                }
            } else if (_formSubmitStatus.attr('data-status').length > 0) {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {

                    formSubmitResponseModal.find('form').addClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').removeClass('hide');
                    formSubmitResponseModal.addClass('centreAlign');
                    _resetForm(formSubmitResponseModal.find('form'));
                    formSubmitResponseModal.modal({
                        show: true
                    })

                }

                //Checking The status and Displaying that section

                if (_formSubmitStatus.attr('data-status') == 'success') {
                    $('.submit-response').removeClass('hide');
                    $('.error-response').addClass('hide');
                } else {
                    $('.error-response').removeClass('hide');
                    $('.submit-response').addClass('hide');
                }

            }

            _formSubmitStatus.each(function() {
                var Status = $(this).attr('data-status'),
                    Parent = $(this).parents('.modal');
                if (Status.length > 0) {
                    Parent.find('form').addClass('hide');
                    Parent.modal({
                        show: true,
                        backdrop: "static"
                    })

                    if (Status == 'success') {
                        Parent.find('.submit-response').removeClass('hide');
                        Parent.find('.error-response').addClass('hide');
                    } else {
                        Parent.find('.error-response').removeClass('hide');
                        Parent.find('.submit-response').addClass('hide');
                    }

                }
            })

        }

    }


    _validateAllForms = function() {
        // $('form.get-in-touch').validate();
        // $('form.request-a-demo').validate();
        $('.wffm-form').find(':submit').on('click', function() {
            if ($('.get-in-touch ').valid() == true) {
                return true;
            } else {
                return false;
            }
        });
    }

    _bindToolTip = function() {
        $('form.get-in-touch legend, form.request-a-demo legend').on("click", function(e) {
            $(this).toggleClass('active');
            $(this).parent().children('p').toggleClass('show');
        });

        $('form.get-in-touch legend, form.request-a-demo legend').each(function() {
            if ($(this).next().is('p'))
                $(this).addClass('tool_tip');
        });
    }

    _parseVerticalName = function(data) {
        $('span.product-name-holder').html(data.ProductName);
        $('.product-name-holder').val(data.ProductName);
        $('.vertical-name-holder').val(data.VerticalName);
        $('.tc-product-name').html(data.ProductName);
        $('.tc-vertical-name').html(data.VerticalName);
        if (data.ProductName != null) {
            $('.tc-product-name').html(data.ProductName);
        } else {
            $('.tc-product-name').html(data.VerticalName);
        }
    }

    _parseResults = function(data) {
        var results = data,
            _inputId = $(_formId + ' .area-interests input').first().attr("id"),
            _inputName = $(_formId + ' .area-interests input').first().attr("name"),
            _interestValue = '',
            _interestText = '',
            _presentHeading,
            _tmpElement;
        if (_inputId) {
            _inputId = _inputId.replace("Id", "Value");
        }
        if (_inputName) {
            _inputName = _inputName.replace("Id", "Value");
        }

        $(_formId + " .area-interests .form-group .checkbox").remove();
        $(_formId + " .area-interests").addClass('dynamic-interests');
        $(_formId + ' .page-header h2').find('.product-name').text(results.ProductName);

        $(_formId + ' .page-header h2').text(formHeading);

        var hiddenProdcutName = $(_formId + " .form-additional-fields .product-name-field");
        if (hiddenProdcutName.length > 0) {
            hiddenProdcutName.val(results.Title);
        }

        for (var key in results.Items) {
            if (results.Items.hasOwnProperty(key)) {
                _interestText = results.Items[key].Text;
                _interestValue = results.Items[key].Value;

                _tmpElement = $('<input>').attr({
                    type: 'checkbox',
                    value: _interestValue,
                    id: _inputId,
                    name: _inputName
                });

                $(_formId + ' .area-interests .form-group').append(_tmpElement);
                $(_formId + ' .area-interests .form-group input[type=checkbox]').last().wrap('<div class="checkbox"></div>').wrap('<label>' + _interestText + '</label>');
            }
        }

    }

    _getAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    }

    _bindSelectOptions = function() {
        $(document).on('change', 'form.get-in-touch .hide-title .checkbox input, form.request-a-demo .hide-title .checkbox input', function(e) {
            $(this).parent().parent().toggleClass('active');
        });
    }

    _validateEmail = function(email) {
        var domain = email.substring(email.lastIndexOf("@") + 1);
        if (INFORMA.validDomains.indexOf(domain) < 0)
            return false;
        return true;
    }

    _bindValidationLogic = function() {
        //Email validation logic
        $('.wffm-form').find('.email-field').each(function() {
            $(this).blur(function() {
                var emailDomainMsg = $(this).parent().find('span.email-validation-message'),
                    emailValidMsg = $(this).parent().find('span.field-validation-error');
                if (_validateEmail($(this).val())) {
                    if (emailDomainMsg.length > 0 && emailValidMsg.length == 0) {
                        emailDomainMsg.removeClass('hide').addClass('show');
                    } else {
                        emailDomainMsg.addClass('hide').removeClass('show');
                    }
                } else {
                    if (emailDomainMsg.length > 0) {
                        emailDomainMsg.addClass('hide').removeClass('show');
                    }
                }
            });
        });
    }

    function strToDate(str) {
        try {
            var array = str.split('-');
            var year = parseInt(array[0]);
            var month = parseInt(array[1]);
            var day = array.length > 2 ? parseInt(array[2]) : 1;
            if (year > 0 && month >= 0) {
                return new Date(year, month - 1, day);
            } else {
                return null;
            }
        } catch (err) {}; // just throw any illegal format
    };

    /* Date => "YYYY-MM-DD" */
    function dateToStr(d) {
        /* fix month zero base */
        var year = d.getFullYear();
        var month = d.getMonth();
        return year + "-" + (month + 1) + "-" + d.getDate();
    };

    $.fn.calendar = function(options) {
        var _this = this;
        var opts = $.extend({}, $.fn.calendar.defaults, options);
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var tHead = week.map(function(day) {
            return "<th>" + day + "</th>";
        }).join("");

        _this.init = function() {
            var tpl = '<table class="cal">' +
                '<caption>' +
                '   <span class="prev"><a href="javascript:void(0);">&lt;</a></span>' +
                '   <span class="next"><a href="javascript:void(0);">&gt;</a></span>' +
                '   <span class="month" data-date=""><span>' +
                "</caption>" +
                "<thead><tr>" +
                tHead +
                "</tr></thead>" +
                "<tbody>" +
                "</tbody>" + "</table>";
            var html = $(tpl);
            _this.append(html);
        };

        function daysInMonth(d) {
            var newDate = new Date(d);
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(0);
            return newDate.getDate();
        }

        _this.update = function(date) {
            var mDate = new Date(date);
            mDate.setDate(1); /* start of the month */

            var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
            mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

            function dateToTag(d) {
                var tag = $('<td><a href="javascript:void(0);"></a></td>');
                var a = tag.find('a');
                a.text(d.getDate());
                a.data('date', moment(d).format('YYYY-MM-DD'));
                if (date.getMonth() != d.getMonth()) { // the bounday month
                    tag.addClass('off');
                } else if (_this.data('date') == a.data('date')) { // the select day
                    tag.addClass('active');
                    _this.data('date', dateToStr(d));
                } else if (d.toDateString() == date.toDateString()) {
                    tag.addClass('active');
                }
                return tag;
            };

            var tBody = _this.find('tbody');
            tBody.empty(); /* clear previous first */
            var cols = Math.ceil((day + daysInMonth(date)) / 7);
            for (var i = 0; i < cols; i++) {
                var tr = $('<tr></tr>');
                for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
                    tr.append(dateToTag(mDate));
                }
                tBody.append(tr);
            }

            /* set month head */
            var monthStr = dateToStr(date).replace(/-\d+$/, '');
            monthNbr = date.getMonth();
            monthName = months[monthNbr];
            _this.find('.month').text(monthName);
            _this.find('.month').data("date", monthStr);
        };

        _this.getCurrentDate = function() {
            return _this.data('date');
        }

        _this.init();
        /* in date picker mode, and input date is empty,
         * should not update 'data-date' field (no selected).
         */
        var initDate = opts.date ? opts.date : new Date();
        if (opts.date || !opts.picker) {
            _this.data('date', dateToStr(initDate));
        }
        _this.update(initDate);

        /* event binding */
        _this.delegate('tbody td', 'click', function() {
            var $this = $(this);
            _this.find('.active').removeClass('active');
            $this.addClass('active');
            _this.data('date', $this.find('a').data('date'));
            /* if the 'off' tag become selected, switch to that month */
            if ($this.hasClass('off')) {
                _this.update(strToDate(_this.data('date')));
            }
            if (opts.picker) { /* in picker mode, when date selected, panel hide */
                _this.hide();
            }
        });

        function updateTable(monthOffset) {
            var date = strToDate(_this.find('.month').data('date'));
            date.setMonth(date.getMonth() + monthOffset);
            _this.update(date);
        };

        _this.find('.next').click(function() {
            updateTable(1);
        });

        _this.find('.prev').click(function() {
            updateTable(-1);
        });

        return this;
    };

    $.fn.calendar.defaults = {
        date: new Date(),
        picker: false,
    };

    $.fn.datePicker = function() {
        var _this = this;
        var picker = $('<div></div>')
            .addClass('picker-container')
            .hide()
            .calendar({
                'date': strToDate(_this.val()),
                'picker': true
            });

        _this.after(picker);

        /* event binding */
        // click outside area, make calendar disappear
        $('body').click(function() {
            picker.hide();
        });

        // click input should make calendar appear
        _this.click(function() {
            picker.show();
            return false; // stop sending event to docment
        });

        // click on calender, update input
        picker.click(function() {
            _this.val(moment(picker.getCurrentDate()).format('DD/MMM/YYYY'));
            return false;
        });

        return this;
    };

    _bindCalendar = function() {
        $("form.request-a-demo .three-column .date-picker").wrap("<div class='right-inner'></div>");
        $("form.request-a-demo .three-column .right-inner").prepend("<i class='icon-calender'></i>");

        $('form.request-a-demo .date-picker:text').each(function() {
            $(this).datePicker({
                dateFormat: "dd-mm-yy"
            });
        });
    }

    _disableSubmit = function() {
        var formDOM = $("form.get-in-touch, form.request-a-demo"),
            formSubmitBtn = $('form.get-in-touch, form.request-a-demo').find('.form-submit-border .btn');
        formSubmitBtn.attr('disabled', true);
        formDOM.on('change', 'input, textarea, select', function() {
            formSubmitBtn.removeAttr('disabled');
        });
    }

    _showModal = function(el)  {         
        _formId = $(el).data('modal');
        _resetForm($(_formId).find('form'));
        if ($(el).attr('data-productid')) {
            productId = {
                'guid': $(el).attr('data-productid')
            };
            _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
        }        
        $(_formId).modal({         
            show: 'true'         
        })
        _showOverlay();
    };

    _bindProductId = function() {
        $(document).on('click', '.wffm-elq-form-btn', function() {
            _showModal(this);
        });
    }

    _showFormIntro = function() {
        var contactUsGetinTouchForm = $('.contactUsPage-contactUs'),
            formIntroText = contactUsGetinTouchForm.find('.form-introduction'),
            tabform = contactUsGetinTouchForm.find('.tab-content'),
            formHeaderText = contactUsGetinTouchForm.find('.page-header');
        if (formIntroText.length > 0) {
            formIntroText.addClass('show');
        }
        if (tabform.length > 0) {
            formHeaderText.addClass('hide');
        }

    }

    _updateProductVerticalName = function() {
        var productId = {
            'guid': $('.page-id').val()
        };
        _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
    }

    _destroyChosenInDevice = function() {
        if (INFORMA.global.device.isTablet || INFORMA.global.device.isMobile) {
            if ($('form.wffm-form .chosen-select').length > 0) {
                $('form.wffm-form .chosen-select').chosen('destroy');
                $("form.get-in-touch .form-group .chosen-select, form.request-a-demo .form-group .chosen-select, form.register-myinterests-form .form-group .chosen-select").wrap("<div class='select-wrapper'></div>");
            }
        }
    }

    _customPhoneErrorMsg = function() {
        var phoneErorrMsg = $('form.wffm-form input[type="number"]').attr('data-val-regex');
        if (phoneErorrMsg) {
            $.extend($.validator.messages, {
                number: phoneErorrMsg
            });
        }
    }
    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        _destroyChosenInDevice();
        _bindNumber();
        _showOverlay();
        _showOverlayQueryString()
        _reCaptchaHandler();
      //  _validateAllForms();
        _bindToolTip();
        _bindCalendar();
        _bindProductId();
        _bindSelectOptions();
        _bindValidationLogic();
        _disableSubmit();
        _showHideInlineForm();
        _HideOverlay();
        _showFormIntro();
        _updateProductVerticalName();
        //_validateChoosenSelect();
        _customPhoneErrorMsg();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.forms.init());

/*
 * global.js
 *
 *
 * @project:	Informa
 * @date:	   2016-April-25
 * @author:	 Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.global = (function(window, $, namespace) {
	'use strict';
	//variables
	var device = {},
		siteCore = {},
		_html = $('html');


	var init = function(){
		// viewport properties
		var _viewportWidth = $(window).width();
		if(_viewportWidth >= 1024){
			device.isDesktop = true;
			device.viewport = 'desktop';
			device.viewportN = 0;
		}
		else if(_viewportWidth >= 768){
			device.isTablet = true;
			device.viewport = 'tablet';
			device.viewportN = 1;
		}
		else {
			device.isMobile = true;
			device.viewport = 'mobile';
			device.viewportN = 2;
		}
		_html.addClass(device.viewport);

		// siteCore properties
		if( $('html').hasClass('preview-mode')){
			siteCore.isPreview = true;
		}
		else if($('html').hasClass('experience-mode')){
			siteCore.isExperience = true;
		}
	}

	return {
		init: init,
		device: device,
		siteCore: siteCore
	};
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.global.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalFooter = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('.customers_list_slider'),
    // methods
        init,
        _dots,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = false;
            //chk for sitecore preview
            if (INFORMA.global.siteCore.isPreview) {
                _autoplay = true;
            }
            if (INFORMA.global.siteCore.isExperience) {
                _autoplay = false;
                _infinite = false;
            }
            if(INFORMA.global.device.viewportN == 1){
                  _slideCount = 4;
                  _dots = true;
            }
            else if (INFORMA.global.device.viewportN == 2){
                  _slideCount = 2;
                  _dots = true;
            }
        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            swipe: INFORMA.global.device.isDesktop ? false : true, 
            dots: _dots
        });
    }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider(_customersList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalFooter.init());

/*
 * global-header.js - 1
 * pdp-navigation.js
 * Because I dont want to create two on('scroll')
 * Update : Bad idea Man, move pdp nav to new file
 * Update 2: If this comment is still here, that means the code is not optimized.
 * Dont try to optimize unless you have absolutely no story to do
 * Already wasted 2 hrs
 *
 * @project:    Informa
 * @date:       2016-May-8
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalHeader = (function(window, $, namespace) {
    'use strict';
    var //_mainNavigation = $('#mainNavigation'),
        _mainNavigation = $('.mainNavigation'),
        _mobileNavigation = $('.mobileNavigation'),
        _mobileHeaderNavigation = $('#mobile-header-navigation'),
        _cookieBanner =  $('#cookieBanner'),
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _cookieHeight =  $('#cookieBanner').outerHeight(),
        _fixed = 'navbar-fixed-top',
        _isHeaderFixed = false,
        _heroBannerHeading = $('#banner h1').text(),
        _marketingClose = $('.marketing-banner .close a'),

        // for sticky nav of pdp-navigation
        _pdpNavigation = $('#pdp-navigation'),
        _pdpNavigationScrollTo,
        _pdpSectionActions,
        _pdpNavigationHeight = 0,
        _pdpNavigationPos = 0,
        _pdpSectionsHeight = 0,
        _pdpWrapper = $('.product-detail-page'),
        _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
        _pdpSectionsButton = $('#pdp-navigation .nav-pdp-nondesktop'),
        _pdpMenuActive = true,

        _pdpLink = $('#pdp-navigation ul > li > a'),
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span'),
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],

        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _arrayFlag = true,
        _pdpFirst = true,
        _pdpStickyMobileFlag = false,
        _pdpStickyIconDesktopFlag = false,
        _pdpStickyHeadingDesktopFlag = false,
        _initialPdpHdrPos = 0,
        _expandedPdpNav = false,



        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        _servicesNavigationPos = 0,
        //_servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
        _servicesLinkSpan = $('#services-navigation ul > li > a > span'),
        _servicesFixed = false,
        _servicesMenuPos = [],
        _servicesMenuWidth = [],
        _servicesMenuleft = [],

        _initServicesMenuBarFollow,
        _activateServicesFixedHeader,
        _arrayServicesFlag = true,
        _servicesFirst = true,
        _initialServicesHdrPos = 0,
        _expandedServicesNav = false,


        _tryStick = $('#banner .try-stick'),
        _subscribeStick = $('#banner .subscribe-stick'),
        _headingStick = $('#banner h1'),
        _tryStickPosition = 0,
        _headingStickPosition = 0,


        _navlinks = $('.informaNav .nav-links'),
        _subnavclose = $('#sub-nav .subnav-close'),
        _navtoggle = $('.informaNav .navbar-toggle'),
        _navclose = $('#mobile-header-navigation .nav-close'),
        _navback = $('#mobile-header-navigation .nav-back'),
        _stickAnimation = $('.informaNav .hide-stick'),


        //functions
        init,
        _whenScrolling,
        _activateMainFixedHeader,
        _activateMobileFixedHeader,
        _pdpsectionSubnavigationInit,
        _selectDocClickEvents,
        _bindClickEvents,
        _bindNavigationEvents,
        _cookieBannerExist,
        _PdpNavReArrange;



    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen
     
    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
        _pdpNavigationPos = _pdpNavigation.offset().top;

        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                        .show();
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();
        _servicesNavigationPos = _servicesNavigation.offset().top;

        // To show the menu follower with right width and position, todo: remove harcode
        _servicesMenuFollower.css('width', $(_servicesLinkSpan[0]).width())
                             .css('left', $(_servicesLinkSpan[0]).offset().left)
                             .show();
    }

    if (_mainNavigation.length > 0) {
        _navHeight = _mainNavigation.height();
        _headerPos = _mainNavigation.offset().top;
    }

    if (_mobileNavigation.length > 0) {
        _navHeightMobile = _mobileNavigation.height();
        _headerPosMobile = _mobileNavigation.offset().top;
    }

    //Check whether cookie banner exists or not
   _cookieBannerExist = function(){
        if($('#cookieBanner:visible').length){
             _cookieHeight =  $('#cookieBanner').outerHeight();
        }else{
              _cookieHeight =  0;
        }
   }
    // both pdp nav and main nav handled here

    _whenScrolling = function() {
        $(window).on('scroll', function() {

            if (!_pdpFixed && _mainNavigation.length > 0 && INFORMA.global.device.isDesktop)
                _activateMainFixedHeader();
            if (!_pdpFixed && _mobileNavigation.length > 0 && !INFORMA.global.device.isDesktop)
                _activateMobileFixedHeader();
            if (_pdpNavigation.length > 0 && _pdpMenuActive)
                _activatePdpFixedHeader();
            if (_servicesNavigation.length > 0 && _servicesMenuActive)
                _activateServicesFixedHeader();
        });
    };

    _activateMainFixedHeader = function() {
        var _windowPos = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPos > _headerPos + _cookieHeight) {
            if (!_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.addClass(_fixed);
                _cookieBanner.addClass(_fixed);
                _mainNavigation.css('top', _cookieHeight);
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', _navHeight);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.removeClass(_fixed);
                _cookieBanner.removeClass(_fixed);
                _mainNavigation.css('top', 0);
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', 0);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPosMobile > _headerPosMobile + _cookieHeight) {
            _mobileNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mobileNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeightMobile);
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _mobileNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mobileNavigation.css('top', 0);
            $('body').css('padding-top', 0);
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }
    };

    _pdpSectionActions = function(){
        _pdpSectionsButton.on('click', function(e) {
            e.preventDefault();
            var _pdpLinksCont = $('#pdp-navigation ul > li > a > span').length;
            if($("#pdp-sections:visible").length){
                $('#pdp-sections').slideUp();
              if(_pdpLinksCont>6){
                $('nav#pdp-navigation').removeClass('deviceactive');
                if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                $('body').removeClass('global-no-scroll');
              }
              }
            }else{
                $('#pdp-sections').slideDown();
                if(_pdpLinksCont>6){
                $('nav#pdp-navigation').addClass('deviceactive');
                if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                $('body').addClass('global-no-scroll');
              }
              }
            }
        });
    }

    _initPdpMenuBarFollow = function() {
        _pdpLink = $('#pdp-navigation ul > li > a');

        if (_pdpLink.length == 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;
        }

    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop(),
            PdpNavTop = null;

        if (_pdpFirst) {
            _initialPdpHdrPos = _pdpNavigation.offset().top;
            _pdpFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
            _pdpNavigationHeight = $('#pdp-navigation').height();
        } else {
            _fixedNavHeight = _navHeightMobile;
            _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();
        }


        if (INFORMA.global.device.isDesktop){

            if(_tryStick.length > 0){

                _tryStickPosition = _tryStick.offset().top;
                if (_windowPos > ((_tryStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyIconDesktopFlag) {
                        _tryStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _subscribeStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _pdpStickyIconDesktopFlag = true;
                        $('.nav-pdp-desktop-sticky').addClass('move-left');
                    }
                }
                else{
                    _pdpStickyIconDesktopFlag = false;
                    $('.nav-pdp-desktop-sticky').empty();
                }
            }

            if(_headingStick.length > 0){
                _headingStickPosition = _headingStick.offset().top;
                if (_windowPos > ((_headingStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyHeadingDesktopFlag) {
                      //debugger;
                        $('#pdp-sections-heading').text(_heroBannerHeading);
                        _pdpStickyHeadingDesktopFlag = true;
                        $('#pdp-sections-heading').addClass('move-left');
                        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                                        .show();

                    }
                }
                else{
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                    .css('left', $(_pdpLinkSpan[0]).offset().left)
                                    .show();
                    _pdpStickyHeadingDesktopFlag = false;
                }
            }

        }

        
        //For fixing the Product Detail Header: Desktop + Tablet + Mobile
        _cookieBannerExist();
        if (_windowPos > (_initialPdpHdrPos - _fixedNavHeight) - _cookieHeight) {
            _pdpNavigation.addClass(_fixed);
            _pdpNavigation.css('top', _fixedNavHeight + _cookieHeight + 'px');
            _pdpWrapper.css('padding-top', _pdpNavigationHeight);
            _pdpFixed = true;

            $('.nav-pdp-nondesktop').addClass('move-left');

            if (!INFORMA.global.device.isDesktop && !_pdpStickyMobileFlag) {
              var leftOfPdpMover = _pdpMenuFollower.css('left');
                _tryStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _subscribeStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _pdpStickyMobileFlag = true;
                $('#pdp-sections-heading').text(_heroBannerHeading);
                $('#pdp-sections-heading').addClass('move-left');
                $('.nav-pdp-nondesktop-sticky').addClass('move-left');
                _pdpMenuFollower.css('left', leftOfPdpMover + $('#pdp-sections-heading').outerWidth());
            }

            if (_arrayFlag) {
                _pdpMenuPos = [];
                _pdpMenuWidth = [];
                _pdpMenuleft = [];
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = '#' + $(_pdpLink[i]).data('target');
                    if($(_sectionName).length > 0){
                        _pdpMenuPos.push($(_sectionName).offset().top);
                    }else{
                        _pdpMenuPos.push(0);
                    }
                    if($(_pdpLinkSpan[i]).length > 0) {
                    _pdpMenuWidth.push($(_pdpLinkSpan[i]).width());
                    _pdpMenuleft.push($(_pdpLinkSpan[i]).offset().left);
                    }
                }
                _arrayFlag = false;
            }

        } else {
            if(_pdpFixed){
                _pdpNavigation.removeClass(_fixed);
                _pdpNavigation.css('top', '0px');
                _pdpWrapper.css('padding-top', 0);
                _pdpFixed = false;
                _arrayFlag = true;
                _initialPdpHdrPos = _pdpNavigation.offset().top;

                if (!INFORMA.global.device.isDesktop){
                    _pdpStickyMobileFlag = false;
                    $('.nav-pdp-nondesktop-sticky').empty();
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    $('.nav-pdp-nondesktop').removeClass('move-left');
                }
            }

        }

        var _fixedHeights = _fixedNavHeight + _pdpNavigationHeight + 5;
        var i = _pdpMenuPos.length - 1;
        for (; i >= 0; i--) {
            if (_windowPos + _fixedHeights >= _pdpMenuPos[i]) {

                if (INFORMA.global.device.isDesktop) {
                    _pdpMenuFollower.css('width', _pdpMenuWidth[i]);
                    _pdpMenuFollower.css('left', _pdpMenuleft[i]);
                }
                i = -1;
            }
        }

    };

    _pdpNavigationScrollTo = function() {
        _pdpLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight;

            if (!INFORMA.global.device.isDesktop) {

                    var _target = $(this).data('target');

                    $('#pdp-sections').slideUp();
                    _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();

                    if(!_pdpFixed)
                        _pdpSectionsHeight = $('#pdp-sections').height();
                    else
                        _pdpSectionsHeight = 0;

                    _fixedNavHeight = _navHeightMobile;
                    var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _pdpSectionsHeight);

                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

            }else{
                var _target = $(this).data('target');
                $('#pdp-navigation li').removeClass('selected');
                $('#pdp-navigation li').addClass('select-options');
                _pdpNavigationHeight = _pdpNavigation.height();
                _fixedNavHeight = _navHeight;

                var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }

        })
    };


    _initServicesMenuBarFollow = function() {
        _servicesLink = $('#services-navigation ul > li > a');

        if (_servicesLink.length == 0) {
            _servicesNavigation.remove();
            _servicesMenuActive = false;
        }
    };

    _activateServicesFixedHeader = function() {
        var _windowPos = $(window).scrollTop(),
        _servicesWrapper = $('#services-list').parent();
        if (_servicesFirst) {
            _initialServicesHdrPos = _servicesNavigation.offset().top;
            _servicesFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
        } else {
            _fixedNavHeight = _navHeightMobile;
        }
        _servicesNavigationHeight = _servicesNavigation.height();

        if (_windowPos > (_initialServicesHdrPos - _fixedNavHeight)) {

            _servicesNavigation.addClass(_fixed);
            _servicesNavigation.css('top', _fixedNavHeight + 'px');
            _servicesWrapper.css('padding-top', _servicesNavigationHeight);
            _servicesFixed = true;

            if (_arrayServicesFlag) {
                _servicesMenuPos = [];
                _servicesMenuWidth = [];
                _servicesMenuleft = [];
                for (var i = 0; i < _servicesLink.length; i++) {
                    var _sectionName = '#' + $(_servicesLink[i]).data('target');

                    _servicesMenuPos.push($(_sectionName).offset().top);
                    _servicesMenuWidth.push($(_servicesLinkSpan[i]).width());
                    _servicesMenuleft.push($(_servicesLinkSpan[i]).offset().left);
                }
                _arrayServicesFlag = false;
            }
        } else {
            _servicesNavigation.removeClass(_fixed);
            _servicesNavigation.css('top', '0px');
            _servicesWrapper.css('padding-top', 0);
            _servicesFixed = false;
            _arrayServicesFlag = true;
            _initialServicesHdrPos = _servicesNavigation.offset().top;
        }

        var _fixedHeights = _fixedNavHeight + _servicesNavigationHeight + 7;

        var i = _servicesMenuPos.length - 1;
        for (; i >= 0; i--) {
            if (_windowPos + _fixedHeights >= _servicesMenuPos[i]) {

                if (INFORMA.global.device.isDesktop) {
                    _servicesMenuFollower.css('width', _servicesMenuWidth[i]);
                    _servicesMenuFollower.css('left', _servicesMenuleft[i]);
                } else {
                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $($('#services-navigation li')[i]).addClass('selected');
                }
                i = -1;
            }
        }
    };

    _servicesNavigationScrollTo = function() {
        _servicesLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight;

            if (!INFORMA.global.device.isDesktop) {

                if (_expandedServicesNav) {
                    var _target = $(this).data('target');

                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $('#services-navigation li:not(".selected")').slideUp();

                    $(this).parent().addClass('selected');

                    _servicesNavigationHeight = _servicesNavigation.height();
                    _fixedNavHeight = _navHeightMobile;

                    var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

                    _expandedServicesNav = false;
                } else {
                    $('#services-navigation li').addClass('select-options');
                    _expandedServicesNav = true;
                }

            } else {
                var _target = $(this).data('target');
                $('#services-navigation li').removeClass('selected');
                $('#services-navigation li').addClass('select-options');
                _servicesNavigationHeight = _servicesNavigation.height();
                _fixedNavHeight = _navHeight;

                var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }


        })
    };

    _bindClickEvents = function(){
        _marketingClose.on('click', function(e) {
            e.preventDefault();
            $(this).closest('section').hide();
        });
    };

    _bindNavigationEvents = function() {

        if (INFORMA.global.device.isDesktop) {

            _navlinks.on('mouseover', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav'),
                    SubNav =  $('#sub-nav'),
                    SubContainer = $("#sub-nav").find(".subnav-container");
                SubNav.css({ 'left': 0});
                SubContainer.hide();
                _navlinks.removeClass('nav-active');
                $(this).addClass('nav-active');
                SubNav.show();
                $('#' + navId).show();
                SubContainer.removeClass("active");
                SubNav.find('#'+navId).addClass("active");
            });

            $('#sub-nav').hover(
                function() {
                    $(this).show();
                    $('#sub-nav').css({ 'left': 0});
                    var ActiveId = $('#sub-nav').find(".active").attr("id"),
                        ParentEle = _navlinks.find('a[data-subnav='+ActiveId+']').parent();
                    _navlinks.removeClass('nav-active');
                    ParentEle.addClass('nav-active');
                },
                function() {
                    $(this).hide();
                     _navlinks.removeClass('nav-active');
                }
            );
            _navlinks.on('mouseout', function(e) {
                e.preventDefault();
                $('#sub-nav').hide();
                $('#sub-nav').css({'left': 0});
                _navlinks.removeClass('nav-active');
            });
            _subnavclose.on('click', function(e) {
                e.preventDefault();
                $('#sub-nav .subnav-container').hide();
                $('#sub-nav').css({ 'left': 0});
                _navlinks.removeClass('nav-active');
            });
        } else {
             _navlinks.on('click', function(e) {
                //e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                var navText = $(this).find('a').text();
                if($('#' + navId).length > 0) {
                    $('#sub-nav .subnav-container').hide();
                    //$('.informaNav .nav-main').css('left', '-100%');
                    $('#sub-nav').css('left', '0');
                    $('#' + navId).css('display', 'block');
                    $('#mobile-header-navigation .nav-subnav-heading').text(navText);
                    $('#mobile-header-navigation .nav-back').css('display', 'block');
                }
            });
        }

        //For mobile toggle navigations
        _navtoggle.on('click', function(e) {
            e.preventDefault();
            $('#mobile-header-navigation').css('left', '0');
            $('.informaNav .nav-main').css('left', '0');
            //$('#sub-nav').css('left', '0');
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
            //$('html, body').addClass('global-no-scroll');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
        });

        _navclose.on('click', function(e) {
            $(".navbar-collapse").collapse('hide');
            $('#mobile-header-navigation').css('left', '-100%');
            $('.informaNav .nav-main').css('left', '-100%');
            $('#sub-nav').css('left', '-100%');
            //$('html, body').removeClass('global-no-scroll');
            $('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'scroll');
            //$('body').css('height', 'auto');
        });

        _navback.on('click', function(e) {
            $('.informaNav .nav-main').css('left', '0');
            $('#sub-nav').css('left', '-100%');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            //$('html, body').addClass('global-no-scroll');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
            //$('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
        });

    };
    _pdpsectionSubnavigationInit = function(){
      $('#pdp-sections ul li').each(function(){
       var idname = '#' + $(this).find('a').data("target");
       if($(idname).length == 0) {
          $(this).remove();
       }
      });
    }
    _selectDocClickEvents=function(){
      $(document).on('touchstart',function(event) {
        if(event.target.class != 'selectMenu' && !$('.selectMenu').find(event.target).length){
           $(".selectMenu .chosen-container").removeClass("container-active chosen-with-drop");
        }
       });
    }
    _PdpNavReArrange = function () {
      var _ArrayOfPdpElements = [],
          Html = "";
      _pdpLink.each(function () {
          var Target = $(this).data('target'),
              _Element = {};
          if($('#'+Target).length > 0) {
              _Element["Name"] = $(this).text();
              _Element["Target"] = Target;
              _ArrayOfPdpElements.push(_Element);
              $('#'+Target).addClass('pdp-item-id');
          }
      });
      $('.pdp-item-id').each(function() {
          var _Id = $(this).attr("id");
          for(var i = 0; i < _ArrayOfPdpElements.length; i++) {
              if(_ArrayOfPdpElements[i].Target == _Id) {
                  Html += '<li><a href="#" data-target="' +_ArrayOfPdpElements[i].Target+ '"><span>' +_ArrayOfPdpElements[i].Name+ '</span></a></li>';
              }
          }
      })
      $('#pdp-sections').find('.navbar-nav').html(Html);
    }
    init = function() {
        //if(INFORMA.global.device.viewport!='mobile'){
        if (_pdpNavigation.length > 0) {
            if (!INFORMA.global.siteCore.isExperience) {
                _pdpsectionSubnavigationInit();
                _PdpNavReArrange();
            }
            _initPdpMenuBarFollow();
            _pdpNavigationScrollTo();
            _pdpSectionActions();
        }

        if (_servicesNavigation.length > 0) {
            _initServicesMenuBarFollow();
            _servicesNavigationScrollTo();
        }

        $('[data-toggle="popover"]').popover();

        _whenScrolling();
        //}
        _bindNavigationEvents();
        _bindClickEvents();
        _selectDocClickEvents();
        /*if (INFORMA.global.device.isMobile) {
            $('#pdp-navigation ul').on('click', function() {
                //todo stop hardcoding
                $('#pdp-navigation li:not(".selected")').slideDown();
                _pdpNavigation.removeClass('cont');
            });
        }*/

        if (INFORMA.global.device.isTablet) {
            $('#services-list section').each(function(i, obj) {
                var _id = this.id;
                $("#" + _id + " .image-thumbnail").prependTo("#" + _id + " .content");
            });
        }

        if (!INFORMA.global.device.isDesktop) {
            $('#services-navigation ul > li:first-child').addClass('selected');
            _expandedServicesNav = false;

            //$('#pdp-navigation ul > li:first-child').addClass('selected');
            _expandedPdpNav = false;

        }

    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());

// {{compare unicorns ponies operator="<"}}
// 	I knew it, unicorns are just low-quality ponies!
// {{/compare}}

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    '==':		function(l,r) { return l == r; },
    '===':	function(l,r) { return l === r; },
    '!=':		function(l,r) { return l != r; },
    '<':		function(l,r) { return l < r; },
    '>':		function(l,r) { return l > r; },
    '<=':		function(l,r) { return l <= r; },
    '>=':		function(l,r) { return l >= r; },
    'typeof':	function(l,r) { return typeof l == r; }
  }

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

  var result = operators[operator](lvalue,rvalue);

  if( result ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});
var INFORMA = window.INFORMA || {};
INFORMA.helpfaq = (function(window, $, namespace) {
    'use strict';
    //variables
    var _helpfaqSelect = $('.help-faq-select'),
        _faqItemsWrapper = $('.help-faq-wrapper'),
        // methods
        init,
        _showHideFaq;

    _showHideFaq = function() {
        _helpfaqSelect.change(function() {
            var target = $(this).data('target');
            $(this).parents('.accordian-structure').find('.help-faq-wrapper').children().removeClass('show').addClass('hide');
            var show = $("option:selected", this).data('show');
            $(show).removeClass('hide').addClass('show');
        });
    }

    init = function() {
        // $('.help-faq-wrapper').children().first().addClass('show');
        // $('.help-faq-wrapper').children().not(':first').addClass('hide');
        // $('#tabs-2 .accordian-structure .help-faq-wrapper div.col-md-offset-1').first().removeClass('hide').addClass('show');
        _showHideFaq();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.helpfaq.init());

/*
 * Hero Video.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.heroBanner = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoElem = $('img[data-video]'),
    // methods
        init,
        _bindIframe;

    _bindIframe = function(){
        var videoUrl = _videoElem.data('video');
        _videoElem.parent().html('<iframe width="100%" height="auto" src="'+videoUrl+'" frameborder="0" allowfullscreen volume="0"></iframe>');

    };

    init = function() {
        if (_videoElem.length > 0) {
           _bindIframe();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.heroBanner.init());

/*
 * twitter-feed.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.twitterFeed = (function(window, $, namespace) {
    'use strict';
    //variables
    var _twitterList = $('.twitter-carousel'),
    // methods
        init,
        _dots,
        _createSlider,
        _equalHeight;

    _equalHeight = function () {
        var items = _twitterList.find('.feed'),
            _vp = INFORMA.global.device.viewportN,
            maxHeight = 0;

            if(_vp === 0 || _vp === 1) {
                items.each(function () {
                    var Height = $(this).height();
                    if(Height > maxHeight) {
                        maxHeight = Height;
                    }
                })
                items.css('height', maxHeight);
            }

    }

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = Boolean(container.data('pagination')),
            _rtl;

            if(container.data('rtl') != undefined) {
                _rtl = container.data('rtl');
            }
            //chk for sitecore preview
            // if (INFORMA.global.siteCore.isPreview) {
            //     _autoplay = true;
            // }
            // if (INFORMA.global.siteCore.isExperience) {
            //     _autoplay = false;
            //     _infinite = false;
            // }
            if(INFORMA.global.device.viewportN == 1){
                  _slideCount = 2;
            }
            else if (INFORMA.global.device.viewportN == 2){
                  _slideCount = 1;
                  _dots = true;
            }

            if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    var $slickList = container.find('.slick-list');

                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            dots: _dots,
            swipe: INFORMA.global.device.isDesktop ? false : true,
            adaptiveHeight: true
        });
    }

    init = function() {
        if (_twitterList.length > 0) {
            _createSlider(_twitterList);
            _equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.twitterFeed.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.analystList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _analystList = $('#pdp-analyst'),
        _listItems = $('.analyst-views'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _equalHeight,
        _lists = null;

    _bindShowMore = function(container){

        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){

            var _vp = INFORMA.global.device.viewportN,
                VisibleItem = $(this).parents('section').find('.analyst-list-container:visible');

            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            } else if(_vp == 3) {
                _vp = 3;
            }
            else {
                _vp = 4; // or (n+9)
            }
            $(this).parents('.analyst-views').find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).parents('.analyst-views').toggleClass('showLess');
        });
    }

    _equalHeight = function(items) {
        var EachView = jQuery('.analyst-views');
        EachView.each(function () {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                ItemsHeader = jQuery(this).find('.analyst-list-container .analyst-details'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _padding = 50;
            ItemsHeader.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }
    _bindShowLess = function () {
      var _showLess = $('.btn.btn-showMore .less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _analystList.offset().top - 20
            },700);
      });
    }
    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
            _bindShowLess();
        }
        if (_listItems.length > 0) {
            _listItems.each(function() {
                var items = jQuery(this).find('.analyst-list-container');
                _equalHeight(items);
            });
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.pdpBrochure = (function(window, $, namespace) {
    'use strict';
    //variables
   var downloadBrochure = $('.pdp-brochure, #agri-report'),
       submitResponse = $('#formSendBrochure .submit-response'),
       Url = downloadBrochure.data('url'),
    //methods
        init;

    init = function() {

      if(submitResponse.length > 0){
        window.open(Url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=100,width=1000,height=600");
      }

    }
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.pdpBrochure.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.pdp_customer_quote = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('.customer-quote .slider-component'),
    // methods
        init,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        //todo: for the love of Madonna Sebastian move this to common
        var _slideCount = 1,//container.data('itemsperframe'), Evil laugh when the author tries to change config,
           _autoplay = container.data('autorotate'),
           _speed = container.data('transitionspeed'), // speed of transition
           _duration = container.data('slideduration'), // how long the slider will be dis
           _infinite = true,
           _dots = Boolean(container.data('dots')),
           _rtl;

          if(container.data('rtl') != undefined) {
              _rtl = container.data('rtl');
          }

      if (INFORMA.global.siteCore.isExperience) {
          _autoplay = false;
          _infinite = false;
      }
      if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    var $slickList = container.find('.slick-list');

                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
            container.slick({
               infinite: _infinite,
               autoplay: _autoplay,
               autoplaySpeed: _duration,
               slidesToShow: _slideCount,
               slidesToScroll: _slideCount,
               speed: _speed,
               dots: (_dots!==null || _dots!==undefined) ? _dots : true,
               swipe: INFORMA.global.device.isDesktop ? false : true
           });
      }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider(_customersList);
        }
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.pdp_customer_quote.init());

/*
 * pharma-home-ourProductsl.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-3
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */



 var INFORMA = window.INFORMA || {};
 INFORMA.pharma_home_products = (function(window, $, namespace) {
     'use strict';
     //variables
     var _pharma_home_products = $('#Pharma-ourproducts'),
         _productsList = _pharma_home_products.find('.products-carousel'),
     // methods
         init,
         _closeNews,
         _createSlider;
         _createSlider = function(container){
             // if data-items, data-infinite is defined, used it
             var _slideCount = container.data('itemsperframe'),
                 _autoplay = container.data('autorotate'),
                 _speed = container.data('transitionspeed'), // speed of transition
                 _duration = container.data('slideduration'), // how long the slider will be displayed
                 _infinite = true,
                 _dots = Boolean(container.data('pagination'));
                 //chk for sitecore preview
                 if (INFORMA.global.siteCore.isPreview) {
                     _autoplay = true;
                 }
                 if (INFORMA.global.siteCore.isExperience) {
                     _autoplay = false;
                     _infinite = false;
                 }

             container.slick({
                 infinite: _infinite,
                 autoplay: _autoplay,
                 autoplaySpeed: _duration,
                 slidesToShow: _slideCount,
                 slidesToScroll: _slideCount,
                 speed: _speed,
                 dots: _dots,
                 adaptiveHeight: true,
                 arrows: true,
                 swipe: INFORMA.global.device.isDesktop ? false : true,
                 responsive: [{
                         breakpoint: 1024,
                         settings: {
                             slidesToShow: 3,
                             slidesToScroll: 3
                         }
                     },{
                             breakpoint: 480,
                             settings: {
                                 slidesToShow: 1,
                                 slidesToScroll: 1
                             }
                         }
                 ]
             });
         }

     init = function() {
         if (_productsList.length > 0) {
             _createSlider(_productsList);
         }
     }

     return {
         init: init
     }
 }(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
 jQuery(INFORMA.pharma_home_products.init());

/*
 * Product Finder
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
        SubSectorList = $(".sector-search .SubSector"),
        SubmitBtn = $(".sector-search li.button"),
        CustomSelect = ProductFinderSection.find(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchField = $(".site-search input"),
        ResultContainer = $(".search-container #results"),
        SearchTabHidden = $(".site-search input.search-tab"),
        SearchSubmitBtn = $(".site-search li.button"),
        //SearchIcon = $(".navbar-default .search a"),
        SearchIcon = $(".search:visible"),
        SearchPage = $("#search-page"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,

        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSearch, GetProductFinderData,
        ToggleProductFinder, ToggleSearch, RenderSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler, BindAjaxHandler,MergeJsonData;

        ToggleSearch = function(){
            var NavClose =$("#sub-nav .subnav-close a");
            ProductFinderSection.slideDown("slow");
                if(NavClose){
                    NavClose.trigger("click");
                }
                if($(".mainNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
                if($(".mobileNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
        },
        ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                SearchIcon.toggleClass("inactive");
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
                if($("#product-finder-section:hidden").length){
                    SearchIcon.toggleClass( "inactive" );
                    ToggleSearch();
                }else{
                    SearchIcon.toggleClass( "active" );
                    ToggleSearch();
                }
            });
        },
        MergeJsonData = function(Json1, Json2,Json3,Json4){
            var Data = {};
            $.extend(Data, Json1,Json2,Json3,Json4);
            return Data;
        },
        GetProductFinderData = function(){
            var FieldArray = ProductFinderSection.find("form").serializeArray(),
                Data = INFORMA.Utils.serializeObject(FieldArray);
            return Data;
        },
        UpdateSubSectorDropdown = function(data) {
            if (data.SubSectors.length > 0) {
                var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                    html = ListTemplate({ SubSectors: data.SubSectors });


                $(".sector-search li").removeClass("disabled");
                SubSectorList.removeAttr("disabled")
                    .removeProp("disabled")
                    .html(html);
                SubSectorList.multiselect('rebuild');
            }
        },
        RenderSearchResult = function(data,type) {
            INFORMA.SearchResults.RenderSearchResults(data);
            //Update url with update search text value
            if(type === "SearchResult") { 
                var SearchValue = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
                if (history.pushState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText='+SearchValue;
                    window.history.pushState({path:newurl},'',newurl);
                }
            }
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        SubmitHandler = function(btn,SearchType) {
            btn.off().on("click", function(e) {
                e.preventDefault();
                INFORMA.Spinner.Show($("body"));
                if($('#hdnSearchType')) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                var ProductData = GetProductFinderData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = INFORMA.SearchResults.DefaultParameters(),
                    Data = MergeJsonData(ProductData,FilterData,DefaultData);

                if(SearchType === "ProductSearch") {
                    Data.IsProduct = true;
                }
                if(SearchType === "SearchResult") { 
                    Data.IsSearch = true;
                    Data.PageNo = 1;
                }
                GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), function(data){RenderSearchResult(data,SearchType)}, null);
                INFORMA.SearchResults.ResetPaging();
            });
        },
        BindAjaxHandler = function() {

            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SubmitHandler(SubmitBtn,"ProductSearch");
            }
            if (IsSearchPage) {
                SubmitHandler(SearchSubmitBtn,"SearchResult");
            }
            SearchField.on("keyup",function(e){
                var MaxLength = $(this).data('length');
                if($(this).val().length >= MaxLength){
                    SearchSubmitBtn.removeClass("disabled");
                }
                else{
                    SearchSubmitBtn.addClass("disabled");
                }
            });
        },
        ShowHideSearch = function(ele) {
            var ShowOption = $(ele).data('show');
            $("ul.searchToggle").addClass('hidden');
            ProductFinderSection.find("ul." + ShowOption).removeClass("hidden").fadeIn("slow");
        },
        ToggleSearchOption = function() {
            ToggleProductFinder();
            jQuery(".search-options input[type=radio]").on('change', function(e) {
                e.preventDefault();
                ShowHideSearch($(this));
            });
            jQuery(".search-options input[type=radio]").on('focus', function(e) {
                e.preventDefault();
                $(this).parent().addClass("active");
            });
            jQuery(".search-options input[type=radio]").on('focusout', function(e) {
                e.preventDefault();
               	$(this).parent().removeClass("active");
            });
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSearch(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {
            var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
                SectorIDs = 'SectorIDs='+SectorIDs;

            GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null);
        },
        BindDropDown = function() {
        	var IsSectorExist = $("input.sector-list").val(),
            	SectorList = (IsSectorExist) ? IsSectorExist.split(',') : [];

            CustomSelect.val("");
            CustomSelect.multiselect({
                maxHeight: 200,
                buttonText: function(o, s) {

                    if (o.length === 0) {
                        return $(s).data('placeholder');
                    } else {
                        var labels = 1;
                        o.each(function(i) {
                            labels = parseInt(1 + i);
                        });
                        return labels + ' Selected';
                    }
                },
                onChange: function(option, checked, select) {
                    if ($(option).parent().hasClass("Sector") === true) {
                        if (checked) {
                            SectorList.push($(option).val());
                        } else {
                            var index = SectorList.indexOf($(option).val());
                            if (index >= 0) {
                                SectorList.splice(index, 1);
                            }
                            SubSectorList.parents("li").eq(0).addClass("disabled");
                            SubSectorList.attr("disabled", "disabled");
                            SubSectorList.val('');
                            SubSectorList.multiselect('rebuild');
                            SubmitBtn.addClass("disabled");
                            $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                        }
                        if (SectorList.length > 0) {
                            GetSubSectorList(SectorList);
                        }
                    }
                }
            });
        };
    init = function() {

        if (ProductFinderSection.length > 0) {
            BindDropDown();
            ToggleSearchOption();
            BindAjaxHandler();
        }
    };

    return {
        init: init,
        UpdateSubSectorDropdown: UpdateSubSectorDropdown,
        GetProductData : GetProductFinderData,
        GetSubSectorList: GetSubSectorList,
        MergeData :MergeJsonData
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductRefine = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductRefineSection = $('.product-refine-results'),
        RefineHeading = ProductRefineSection.find('.refine-heading'),
        init, DropDownEvents;

    DropDownEvents = function () {
        var _vp = INFORMA.global.device.viewport;

        if(_vp != "desktop") {
            RefineHeading.on('click', function () {
                $(this).parents('.refine-wrapper').find('.accordian-container').slideToggle();
                $(this).toggleClass('open');
            })
        }

        $('.refine-accordian .title').on('click', function (e) {
            e.preventDefault();
            $(this).next('.content').slideToggle();
            $(this).parents('.refine-accordian').toggleClass('open');
        });

    }


    init = function() {

        if (ProductRefineSection.length > 0) {
            DropDownEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductRefine.init());

/*
 * My recommendations-recommended products
 *
 *
 * @project:    Informa
 * @date:       2016-August-22
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.news_flash = (function(window, $, namespace) {
    'use strict';
    //variables
    var _recommendedproducts = $('.recommended-products'),
        _productsList = _recommendedproducts.find('.recom-prod-carousel'),
    // methods
        init,
        _createSlider,
        EqualHeightProducts;

        EqualHeightProducts = function() {
            var Items = _recommendedproducts.find('.wrap-content'),
                MaxHeight = 0;
                Items.height('auto');
                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);

        },
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _slideCount = container.data('itemsperframe'),
                _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = Boolean(container.data('pagination'));
                //chk for sitecore preview
                if (INFORMA.global.siteCore.isPreview) {
                    _autoplay = true;
                }
                if (INFORMA.global.siteCore.isExperience) {
                    _autoplay = false;
                    _infinite = false;
                }

            container.slick({
                infinite: _infinite,
                autoplay: _autoplay,
                autoplaySpeed: _duration,
                slidesToShow: _slideCount,
                slidesToScroll: _slideCount,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true,
                swipe: INFORMA.global.device.isDesktop ? false : true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },{
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                ]
            });
        }

    init = function() {
        if (_productsList.length > 0) {
            _createSlider(_productsList);
            setTimeout(function() {
                EqualHeightProducts();
            }, 500);
        }
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.news_flash.init());

/*
* Product Results.js
*
*
* @project:    Informa
* @date:       2016-April-25
* @author:     Tejaswi
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedTabs = (function(window, $, namespace) {
    'use strict';
    var RecomendedTab = $('.recommendation-tabs'),
        RecomendedResults = $('.recommended-results'),
        Tabs = RecomendedTab.find('a[data-toggle="tab"]'),
        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, LargeDeviceFunction, SmallDeviceFunction, GetAjaxData, GetItemsDefault, RenderItems;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },
    GetItemsDefault = function (target) {
        var object = null;
         var   DefaultCount = $('.recomended-content').attr('data-defaultCount');

        if(target === '#tabs-1' && document.cookie.indexOf("PrefernceUpdated=true") > 0) {
            
            object = {
                PageSize: DefaultCount,
                GetContentBasedOnContentType:true
            }
            
            GetAjaxData(Urls.GetRecomendedItems, "Post", object, INFORMA.RecomendedContent.RenderRecomendResult, null, "PreferenceUpdate");
        }
    },

    SmallDeviceFunction = function (Parent) {
        var Select = Parent.find('select[name="RecommendTabs"]'),
            SelectFirst = $(Select.find('option')[0]);

        Select.val('#tabs-1').trigger('change');

        Select.on('change', function () {
            var Value = $(this).val();
            RecomendedResults.find('.tab-pane').removeClass('active');

            $(Value).addClass('active');

            GetItemsDefault(Value);
        })
    }

    LargeDeviceFunction = function (Parent) {
        Parent.find('.nav-tabs li:first-child a').trigger('click');

        Tabs.on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href");

            GetItemsDefault(target);
        });
    },

    init = function () {
        if(RecomendedTab.length > 0) {
            var Viewport = INFORMA.global.device.viewport;

            if(Viewport == "mobile") {
                SmallDeviceFunction(RecomendedTab);
            } else {
                LargeDeviceFunction(RecomendedTab);
            }
        }
    }
    return {
        init: init
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedTabs.init());
/*
* Product Results.js
*
*
* @project:    Informa
* @date:       2016-April-25
* @author:     Rajiv Aggarwal
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedContent = (function(window, $, namespace) {
    'use strict';
    //variables
    var RecomendedWrapper = $('.recomended-content'),
        BtnMore = RecomendedWrapper.find('.btn-showMore'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        equalHeight, init, ShowMore, GetIds, GetAjaxData, RenderRecomendResult;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    RenderRecomendResult = function (data, SearchType) {

        if(data != null) {
            var results = data,
                html = "",
                Articles = results.Articles;

                for(var key = 0; key < Articles.length; key++) {
                    var Data = Articles[key],
                        TemplateName = (Templates.SampleContent !== "undefined") ? Templates.SampleContent : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                    html += ListTemplate({ results: Data });
                }

            if(SearchType == null) {
                RecomendedWrapper.find('.row').append(html);
            } else {
                RecomendedWrapper.find('.row').html(html);
                equalHeight(RecomendedWrapper);
                var name = "PrefernceUpdated";
                var cookie = name+"="+false+'; path=/';
                document.cookie = cookie;
            }

            equalHeight(RecomendedWrapper);



            if(results.ArticleRemainingCount > 0 && RecomendedWrapper.find('.recomended-wrapper').length < 30) {
                BtnMore.removeClass('hidden');
            } else {
                BtnMore.addClass('hidden');
            }
        } else {
            BtnMore.addClass('hidden');
        }
    },

    GetIds = function (Parent) {
        var items = Parent.find('.list-items'),
            ids = [];

        items.each(function () {
            var id = $(this).attr('data-fetch');
            ids.push(id);
        })

        return ids;
    }

    ShowMore = function () {
        BtnMore.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.recomended-content'),
                ViewPort = INFORMA.global.device.viewport,
                Count = Parent.attr('data-' + ViewPort),
                Ids = GetIds(Parent),
                ItemDisplayed = Parent.find('.recomended-wrapper').length,
                MaximumCount = Parent.attr('data-MaximumNumberOfArticles'),
                _Object = null;

                if((MaximumCount - ItemDisplayed) <= Count) {
                    Count = (MaximumCount - ItemDisplayed);
                }

                _Object = {
                    ExcludeContentGuids: Ids,
                    PageSize: Count,
                    SearchTexts: $('.SearchTextsSampleContent').val().split('|')
                };

            GetAjaxData(Urls.GetRecomendedItems, "Post", _Object, RenderRecomendResult, null, null);
        })
    }

    equalHeight = function (Parent) {
        var Items = Parent.find('.recomended-wrapper'),
            MaxHeight = 0,
            MaxWrapperHeight = 0,
            MaxTopicHeight = 0;
            Items.each(function () {
                var ContentHeight = $(this).find('.content').height();
                if(ContentHeight > MaxHeight) {
                    MaxHeight = ContentHeight;
                }
            })
            Items.find('.content').height(MaxHeight);
            Items.each(function(){
                var TopicHeight = $(this).find('.topics').outerHeight();
                if(TopicHeight > MaxTopicHeight) {
                    MaxTopicHeight = TopicHeight;
                }
            })
            Items.find('.topics').height(MaxTopicHeight);
            Items.each(function(){
                var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                if(WrapperHeight > MaxWrapperHeight) {
                    MaxWrapperHeight = WrapperHeight;
                }
            })
            Items.find('.recomend-content').height(MaxWrapperHeight);
    }

    init = function () {
        if(RecomendedWrapper.length > 0) {
            $('#tabs-1').addClass('active');
            equalHeight(RecomendedWrapper);
            ShowMore();
        }
    }
    return {
        init: init,
        RenderRecomendResult: RenderRecomendResult
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedContent.init());
/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RelevantProducts = (function(window, $, namespace) {
    'use strict';
    //variables
    var _RelevantProductsWrapper = $('#relevant-products'),
        ShowMoreBtn = _RelevantProductsWrapper.find('.btn-ShowMore'),
        TriangleBtn = _RelevantProductsWrapper.find('.triangle'),
        // methods
        init,
        ShowMore,
        HideItems,
        FlipItems,
        EqualHeight;

        EqualHeight = function (Parent) {
            var Items = Parent.find('.search-tile'),
                MaxHeight = 0,
                Padding = 90;
            Items.each(function () {
                var Height = $(this).height();
                
                if(Height > MaxHeight) {
                    MaxHeight = Height;
                }
            })
            Items.height(MaxHeight + Padding);

        },
        FlipItems = function (This) {
            TriangleBtn.on('click', function () {
                $(this).parents('.tile').toggleClass('flip');
            })
            
        },
        HideItems = function(Parent){
            var Viewport = INFORMA.global.device.viewport,
                Count = Parent.attr('data-'+Viewport);

            Parent.find('.search-tile:nth-child(n+' + (parseInt(Count) + 1 )+ ')').hide();
        },

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                var Parent = $(this).parents('#relevant-products'),
                    Viewport = INFORMA.global.device.viewport,
                    Count = Parent.attr('data-'+Viewport);

                Parent.find('.search-tile:nth-child(n+' + (parseInt(Count) + 1 )+ ')').slideToggle();
                Parent.toggleClass('showLess');
            })
        },

    init = function() {
        if (_RelevantProductsWrapper.length > 0) {
            HideItems(_RelevantProductsWrapper);
            ShowMore();
            FlipItems();
            EqualHeight(_RelevantProductsWrapper);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RelevantProducts.init());

var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var ResourceContainer = $('#resource-finder-section'),
    	CustomSelect = ResourceContainer.find(".custom-multiselect select"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        ResourceSubSectorList = ResourceContainer.find('.SubSector'),
        ResourceSbmtBtn = ResourceContainer.find("li.button"),
    	//methods
    	init, BindDropDown, GetSubSectorList, UpdateSubSectorDropdown, GetAjaxData, BindResourceSbmt, GetProductFinderData;

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    GetProductFinderData = function(){
        var FieldArray = ResourceContainer.find("form").serializeArray(),
            Data = INFORMA.Utils.serializeObject(FieldArray);
        return Data ;
    },
    BindResourceSbmt = function() {
        ResourceSbmtBtn.on('click', function(){
            var ProductData = GetProductFinderData(),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = INFORMA.SearchResults.DefaultParameters(),
                Data = INFORMA.ProductFinder.MergeData(ProductData,FilterData,DefaultData);
                Data.PageNo = 1;

            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null, null);
        });
    },
    UpdateSubSectorDropdown = function(data) {
        if (data.SubSectors.length > 0) {
            var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                html = ListTemplate({ SubSectors: data.SubSectors });


            ResourceSubSectorList.parents("li").removeClass("disabled");
            ResourceSubSectorList.removeAttr("disabled")
                .removeProp("disabled")
                .html(html);
            ResourceSubSectorList.multiselect('rebuild');
            ResourceSbmtBtn.removeClass('disabled');
        }
    },
    GetSubSectorList = function(arrayList) {
        var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
            SectorIDs = 'SectorIDs='+SectorIDs;
        GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null, null);
        INFORMA.SearchResults.ResetPaging();
    },
    BindDropDown = function() {
        var SectorList = [];
        CustomSelect.val("");
        CustomSelect.multiselect({
            maxHeight: 200,
            buttonText: function(o, s) {

                if (o.length === 0) {
                    return $(s).data('placeholder');
                } else {
                    var labels = 1;
                    o.each(function(i) {
                        labels = parseInt(1 + i);
                    });
                    return labels + ' Selected';
                }
            },
            onChange: function(option, checked, select) {
                if ($(option).parent().hasClass("Sector") === true) {
                    if (checked) {
                        SectorList.push($(option).val());
                    } else {
                        var index = SectorList.indexOf($(option).val());
                        if (index >= 0) {
                            SectorList.splice(index, 1);
                        }
                        //if(SectorList.length === 0) {	                    
                    }
                    if (SectorList.length > 0) {
                        GetSubSectorList(SectorList);
                    } else {
                        ResourceSubSectorList.parents("li").eq(0).addClass("disabled");
                        ResourceSubSectorList.attr("disabled", "disabled");
                        ResourceSubSectorList.val('');
                        ResourceSubSectorList.multiselect('rebuild');
                        ResourceSbmtBtn.addClass("disabled");
                        $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                    }
                }
            }
        });
    };

    init = function() {
    	if(ResourceContainer.length > 0) {
    		BindDropDown();
            BindResourceSbmt();
    	}
    }

    return {
        init: init,
        GetResourceData : GetProductFinderData
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());
/*
 * News Flash
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.news_flash = (function(window, $, namespace) {
    'use strict';
    //variables
    var _newsFlash = $('.newsFlash'),
        _newsList = _newsFlash.find('.news-carousel'),
    // methods
        init,
        _closeNews,
        _createSlider;
        _closeNews = function(){
          var closenews = $('#close-news');

           $('#close-news').on('click', function(){
		            $('.newsFlash').remove();
		        });
        }
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _slideCount = 1,
                _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = false;
                //chk for sitecore preview
                if (INFORMA.global.siteCore.isPreview) {
                    _autoplay = true;
                }
                if (INFORMA.global.siteCore.isExperience) {
                    _autoplay = false;
                    _infinite = false;
                }

            container.slick({
                infinite: _infinite,
                autoplay: _autoplay,
                autoplaySpeed: _duration,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true,
                swipe: INFORMA.global.device.isDesktop ? false : true
            });
        }

    init = function() {
        if (_newsList.length > 0) {
            _createSlider(_newsList);
        }
        _closeNews();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.news_flash.init());

var INFORMA = window.INFORMA || {};
INFORMA.RTETable = (function(window, $, namespace) {
    'use strict';
    //variables
    var titles = [],i,init, _RTEOnLoad,
        responsiveContainer = $(".rte-custom-table .responsiveTable"),
        Clonedtable = $(".rte-custom-table .table-responsive .table").clone(true);

    _RTEOnLoad = function() {
        Clonedtable.appendTo(responsiveContainer);
        $('.rte-custom-table .table tr:first-child td').each(function() {
            titles.push('<div class="rteTitles">'+$(this).html()+'</div>');
        });
        responsiveContainer.find('table.table tr').each(function() {
            for (i = 1; i <= titles.length; i++) {
                $(this).find('td').eq(i).wrapInner('<div class="rteValues" />').prepend(titles[i]);
            }
        });
        responsiveContainer.find('table.table tr:first-child').remove();
    }
    init = function() {
        _RTEOnLoad();
    };
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RTETable.init());

/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResultFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SelectAll = $(".refine-container .panel-heading .custom-checkbox input"),
        RefineSection = $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        CheckedRefineCheckBox = $(".refine-container .panel-body .custom-checkbox input:checked"),
        ClearAllLink = $(".refine-container a.clear-all"),
        ProductFinderSection = $('#product-finder-section'),
        SearchType = '',

        // methods
        init, SelectAllCheckBox, BindRefineEvents, ClearAllLinkBinding, DoRefine, RefineSearchResult, GetAjaxData, GetSelectedFilter;

    GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: SCallback,
                error_callback: Errcallback
            });
            INFORMA.SearchResults.ResetPaging();
        },
        GetSelectedFilter = function() {
            var Data = {};
            if (RefineSection) {
                $.each(RefineSection, function() {
                    var GetSectionID = $(this).parent().attr("id"),
                        SelectedCheckBox = $(this).find("input[type=checkbox]:checked").not(":disabled"),
                        EnabledCheckBox = $(this).find('input[type="checkbox"]').not(":disabled"),
                        uniqueArr = [];

                    if (SelectedCheckBox.length) {
                        $.each(SelectedCheckBox, function() {
                            uniqueArr.push($(this).attr("value"));
                            Data[GetSectionID] = uniqueArr;
                        });
                    }

                });
                return Data;
            }
        },
        DoRefine = function() {
            var ProductData = INFORMA.ProductFinder.GetProductData(),
                FilterData = GetSelectedFilter(),
                DefaultData = INFORMA.SearchResults.DefaultParameters(),
                Data = INFORMA.ProductFinder.MergeData(ProductData, FilterData, DefaultData);

            Data.PageNo = 1;
            if (SearchType === "ResourceResult") {
                Data.IsResourceListing = true;
            }
            if (SearchType === "SearchResult") {
                Data.IsSearch = true;
            }
            if (SearchType === "ProductSearch") {
                Data.IsProduct = true;
            }
            GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null);
        },
        SelectAllCheckBox = function() {

            SelectAll.on("click", function(e) {
                var ParentEle = $(this).parents(".panel").eq(0).find(".panel-body"),
                    CurrentCheckBoxs = ParentEle.find('input[type="checkbox"]').not(":disabled"),
                    CurrentShowMoreLink = ParentEle.find("a.show-more");

                if ($(this).prop("checked") === true) {
                    jQuery.each(CurrentCheckBoxs, function() {
                        $(this).prop("checked", "checked");
                        $(this).attr("checked", "checked");
                    });
                } else {
                    jQuery.each(CurrentCheckBoxs, function() {
                        $(this).removeAttr("checked", false);
                        $(this).removeProp("checked", false);
                    });
                }
                if (CurrentShowMoreLink) {
                    CurrentShowMoreLink.trigger("click");
                }
                DoRefine();
            });
        },
        ClearAllLinkBinding = function(obj){
            obj.on("click", function(e) {
                e.preventDefault();
                var AllCheckBox = $(".refine-container .custom-checkbox input");
                if($('#hdnSearchType').length > 0) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                $.each(AllCheckBox, function() {
                    $(this).prop("checked", false);
                });
                DoRefine();
            });

        },
        BindRefineEvents = function() {
            $.each(RefineSection, function() {
                var DefaultCount = ($(this).attr("data-defaultcount") !== null) ? $(this).attr("data-defaultcount") : 5,
                    SectionCheckBox = $(this).find(".custom-checkbox input"),
                    CurrentList = $(this).find("ul li"),
                    CheckBoxCount = SectionCheckBox.length,
                    ShowMoreLink = $(this).find("a.show-more");

                if (CheckBoxCount > DefaultCount) {
                    ShowMoreLink.addClass("show");
                    $.each(CurrentList, function(i) {
                        var currentIndex = i + 1;
                        if (currentIndex > DefaultCount) {
                            $(this).addClass("hidden");
                        }
                    });
                }
            });
            var RefineCheckBoxes = $(".refine-container .panel-body .custom-checkbox input");
            RefineCheckBoxes.on("click", function() {
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox = ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if (SelectedCheckBox && SelectedCheckBox.length === InputCount.length) {
                    CurrentSelectAllCheckBox.prop("checked", true);
                } else {
                    CurrentSelectAllCheckBox.prop("checked", false);
                }
                DoRefine();
            });

            RefineCheckBoxes.on("focus",function(){
                $(this).parents('li').eq(0).addClass("active");
            });
            RefineCheckBoxes.on("focusout",function(){
                $(this).parents('li').eq(0).removeClass("active");
            });

            ShowMoreLinks.on("click", function(e) {
                e.preventDefault();
                if($(this).hasClass("SeeLess")!==true){
                    var text = $(this).data("lesstext");
                    $(this).parent().find("ul li").removeClass("hidden");
                    $(this).addClass("SeeLess");
                    $(this).text(text);
                }else{
                    var text = $(this).data("moretext"),
                        defaultCount = $(this).parent().data('defaultcount'),
                        listItem = $(this).parent().find("li");
                        $(this).removeClass("SeeLess");
                        $(this).text(text);
                        listItem.addClass("hidden");
                        
                    $.each(listItem, function(i){
                        var Index=i+1;
                        console.log($(this));
                        if(Index<=defaultCount){
                            $(this).removeClass("hidden");
                        }
                    });
                }

            });
            ClearAllLinkBinding(ClearAllLink);
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }

            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
            }
            if (CheckedRefineCheckBox.length > 0) {
                //DoRefine();
            }
            if (SelectAll && RefineCheckBox) {
                var ViewPort = INFORMA.global.device.viewportN;

                if(ViewPort===1|| ViewPort===2){
                    var AllRefineText = $(".refine-container").find("p.heading"),
                        ClearAll = $(".refine-container").find("a.clear-all"),
                        ClearHtml = $('<div class="clear-mobile"><a href="#" class="clear-all">'+ClearAll.html()+'</a></div>');

                    $("body").find(".refine-container").after(ClearHtml);
                    
                    // By default on mobile and tabet refine need to close
                    AllRefineText.addClass("heading-collapsed");
                    $("#refine-list").hide();

                    if(AllRefineText.hasClass("heading-collapsed")!==true){
                        ClearHtml.show();
                    };

                    AllRefineText.off().on("click", function(){
                        var RefineContent = $(this).parent().find("#refine-list");
                        if($(this).hasClass("heading-collapsed")!==true){
                            RefineContent.slideUp("slow");
                             $(this).addClass("heading-collapsed");
                             ClearHtml.hide();
                        }else{
                             RefineContent.slideDown("slow");
                            $(this).removeClass("heading-collapsed");
                            ClearHtml.show();
                        }
                    });
                }
                SelectAllCheckBox();
                BindRefineEvents();
                var ClearMobileLink = $("body").find(".clear-mobile a");
                if(ClearMobileLink){
                    ClearAllLinkBinding(ClearMobileLink);
                }
            }
        };
    return {
        init: init,
        GetRefineData: GetSelectedFilter,
        BindRefineEvents: BindRefineEvents

    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());

/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResults = (function(window, $, namespace) {
    'use strict';
    //Default variables and cached html elements
    var Templates = INFORMA.Templates,
        Config = INFORMA.Configs,
        PageSize = parseInt(Config.searchResult.pageSize),
        Urls = INFORMA.Configs.urls.webservices,
        Utils = INFORMA.Utils,
        SearchType = '',
        SearchContent = $(".search-container"),
        ProductFinderSection = $('#product-finder-section'),
        Data = {},
        ShowMoreLink = SearchContent.find(".btn-showMore"),
        SearchHidden = $("input.search-hidden"),
        SectorHidden = $("input.sector-list"),
        SubSectorHidden = $("input.sub-sector-list"),
        RefineSection = $(".refine-container"),
        SortDropDown = SearchContent.find(".chosen-select"),
        ProductSearchText = $('input[name="SearchText"]'),
        SeeAllButton = SearchContent.find(".see-all"),
        IsShowFlag = false,
        PageNo = 2,
        SortValue = null,
        // methods
        init, CreateSearchResult, GetSortValue, CreateSearchTags, ParseSearchData, DoGlobalShowMore, ResetPageSize,
        SetSearchState, MakeDropPreSelected, UpdateResultPage, UpdateRefineSection, ToggleView, GetPaginationData, DoPagination, GetAjaxData, EqualHeight, CreateSubItems,
        DoLinksEvents, GetDefaultValues, LoadMoreProducts;
    GetDefaultValues = function() {
            var data = {};
            data.Sorting = ($('select[name="sorting"]')) ? $('select[name="sorting"]').val() : null;
            data.PageSize = ($('.product-results')) ? $('.product-results').attr('data-pagesize') : null;
            data.DefaultItemCount = ($('input[name="DefaultItemCount"]')) ? $('input[name="DefaultItemCount"]').val() : null;
            data.MaxItemCount = ($('input[name="MaxItemCount"]')) ? $('input[name="MaxItemCount"]').val() : null;
            data.DefaultProductCount = ($('input[name="DefaultProductCount"]')) ? $('input[name="DefaultProductCount"]').val() : null;
            data.SearchTexts = ($('input[name="SearchTexts"]') && $('input[name="SearchTexts"]').length > 0) ? $('input[name="SearchTexts"]').val().split(",") : null;
            data.OrderOfContentType = ($('input[name="OrderOfContentType"]')) ? $('input[name="OrderOfContentType"]').val().split(",") : null;
            data.WhoWeHelp = ($('input[name="WhoWeHelp"]')) ? $('input[name="WhoWeHelp"]').val() : null,
            data.SearchText = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
            if (SearchType != "ProductSearch") {
                if($('#hdnSearchType').length > 0) {
                    var NameSearchType = $('#hdnSearchType').attr('name'),
                        Value = $('#hdnSearchType').attr('value');
                                    
                    data[NameSearchType] = Value;
                }
            }
            return data;
        },
        DoLinksEvents = function() {
            var Links = $('.items-found').find('a');

            Links.on('click', function(e) {
                e.preventDefault();
                var ProdData, FilterData, Data, DefaultData,
                    GetContentType = $(this).attr('data-contenttype'),
                    FacetCheck = ($(this).attr('data-check') != undefined) ? $(this).attr('data-check') : "",
                    Name = ($(this).attr('name')) ? $(this).attr('name') : "";

                
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }

                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                if (FacetCheck != "null") {
                    Data[Name] = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', Name);
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                } else {
                    Data.ContentType = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', 'ContentType');
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                }
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        }
    GetSortValue = function(value) {
            SortValue = (value) ? value : SortDropDown.val();

            SortDropDown.on("change", function(e) {
                SortValue = $(this).find("option:selected").val();

                var ProdData, FilterData, Data, DefaultData;
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }

                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        },
        SetSearchState = function(sVal) {
            if (sVal) {
                var SearchField = $(".site-search input[type=text]"),
                    SearchSubmitBtn = $(".site-search li.button");

                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinderSection.find("input[type=radio]").eq(0).trigger("click");
                //SearchSubmitBtn.trigger("click");
            }
        },
        ResetPageSize = function() {
            PageNo = 2;
        },
        MakeDropPreSelected = function(Arr, DrpDwn) {
            DrpDwn.val("");
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", true);
            });
            DrpDwn.multiselect('rebuild');
        },
        UpdateResultPage = function(SectorSelect, SecValue, SubSecValue) {

            var SectorArray = SecValue.split(","),
                SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                SectorIDs = 'SectorIDs=' + SecValue,
                SubmitBtn = ProductFinderSection.find(".sector-search li.button"),
                SubSectorSelect = ProductFinderSection.find("select.SubSector");

            ProductFinderSection.find("input[type=radio]").eq(1).trigger("click");
            if (SectorSelect.length && SectorArray) {
                MakeDropPreSelected(SectorArray, SectorSelect);
                INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                    method: "Get",
                    data: SectorIDs,
                    success_callback: function(data) {
                        INFORMA.ProductFinder.UpdateSubSectorDropdown(data);

                        if (SubSectors) {
                            MakeDropPreSelected(SubSectors, SubSectorSelect);
                        }
                        ProductFinderSection.slideDown();
                        //SubmitBtn.trigger("click");
                    },
                    error_callback: function() {

                    }
                });
            }
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, Item) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, Item);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        EqualHeight = function() {
            var Items = SearchContent.find('.wrap-content');

            if ($(".search-container").hasClass("tileView")) {
                var MaxHeight = 0;

                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);
            } else {
                Items.css("height", "auto");
            }
        },
        GetPaginationData = function(List, Section) {
            var Data = {},
                PageSizeValue = (Section) ? Section.data("pagesize") : null;
            if(PageSizeValue){
                Data.PageSize = PageSizeValue;
            }
            $.each(List, function() {
                var KeyName = $(this).data("type"),
                    KeyValue = $(this).data("fetch");
                if (Data.hasOwnProperty(KeyName)) {
                    var uniqueArr = [],
                        existingVal = [];
                    existingVal = existingVal.concat(Data[KeyName]);
                    uniqueArr.push(KeyValue);
                    Data[KeyName] = uniqueArr.concat(existingVal);
                } else {
                    Data[KeyName] = [].concat(KeyValue);
                }
            });
            return Data;
        },
        DoPagination = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var currentSection = $(this).parents(".product-results").eq(0),
                    TileList = currentSection.find(".list-items"),
                    PData = GetPaginationData(TileList, currentSection),
                    ProdData = INFORMA.ProductFinder.GetProductData(),
                    GetDefaultData = GetDefaultValues(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData, PData, FilterData, GetDefaultData);

                if (!$(currentSection).hasClass('showLess')) {
                    $(currentSection).addClass('showLess');
                    GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));
                } else {
                    $(currentSection).removeClass('showLess');
                    $(currentSection).find('.col-xs-12:nth-child(n+4)').remove();
                    $(window).scrollTop($(currentSection).offset().top - 60);
                }


            });
        },
        LoadMoreProducts = function(){
            var Data, TileList = jQuery('.search-container .product-results [data-type="Product"]'),
                PData = GetPaginationData(TileList),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = GetDefaultValues(),
                ProdData = INFORMA.ProductFinder.GetProductData();
                Data = INFORMA.ProductFinder.MergeData(FilterData, DefaultData,ProdData);
                Data.PageNo = 1;
                Data.ExcludedProduct = PData["Product"];
                GetAjaxData(Urls["GetMoreProducts"], "Post", Data, ParseSearchData, null, $(this));
        },
        DoGlobalShowMore = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var Section = $(this).parents(".product-results").eq(0),
                    ProdData = INFORMA.ResourceFilter.GetResourceData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = GetDefaultValues(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);

                Data.PageNo = PageNo;

                if (SearchType === "SearchResult") {
                    Data.SearchText = $('input[name="SearchText"]').val();
                }
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));

            });

            DoLinksEvents();
        },
        ToggleView = function() {
            var toggleButtons = $(".search-container .view-mode li");
            toggleButtons.on("click", function(e) {
                e.preventDefault();
                var currentView = $(this).data("view"),
                    parentEle = $(this).parents(".search-container").eq(0);
                if (currentView) {
                    toggleButtons.removeClass("selected");
                    $(this).addClass("selected");
                    parentEle.removeClass("tileView listView");
                    parentEle.addClass(currentView);
                }

                EqualHeight();

            });
        },
        UpdateRefineSection = function(Data, Type) {
            for (var key in Data) {
                if (Data.hasOwnProperty(key) && Data[key]) {
                    var RefineObj = Data[key],
                        CurrentSection = key;
                    if (RefineObj && CurrentSection) {
                        var Facet = RefineSection.find("#"+CurrentSection),
                            CheckBoxes = Facet.find("input[type=checkbox]"),
                            Header = Facet.prev(".panel-heading"),
                           	SelectAllChkBox = Header.find("input[type=checkbox]"),
                            Links = Header.find("a strong");

                        if (CheckBoxes && Facet && RefineObj.length) {
                            $.each(CheckBoxes, function() {
                                 var CurrentChkBoxVal = $(this).attr("value");
                                     if (RefineObj.contains(CurrentChkBoxVal)) {
                                        $(this).removeAttr("disabled");
                                     }else{
                                        $(this).attr("disabled","disabled");
                                     }
                            });
                            SelectAllChkBox.removeAttr("disabled");
                            Links.removeClass("disabled");
                        }
                        if(CheckBoxes && Facet && RefineObj.length<1){
                            $.each(CheckBoxes, function() {         
                                 $(this).attr("disabled","disabled");
                            });
                            SelectAllChkBox.attr("disabled","disabled");
                            Links.addClass("disabled");
                        }
                    }
                }
            }
        },
        CreateSearchResult = function(Data) {
            var FinalHTml = '',
                Title, ShowMoreText;
            for (var i = 0; i < Data.length; i++) {
                var Results = Data[i],
                    TemplateName, ListTemplate,
                    HeroTemplate, HeroHandlebar, Html = '',
                    ContentType,
                    Lists = Results.Results;
                HeroTemplate = (Templates.SearchTemplate) ? Templates.SearchTemplate : "";
                HeroHandlebar = Handlebars.compile(HeroTemplate);

                if (Lists) {
                    for (var j = 0; j < Lists.length; j++) {
                        if (Lists[j].Category) {
                            ContentType = Lists[j].Category;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html += ListTemplate({ results: Lists[j] });
                        }
                    }

                    Results.Content = Html;
                    if(!IsShowFlag){
                        SearchContent.find(".product-results").remove();
                    }
                    FinalHTml += HeroHandlebar({ results: Results });
                }
            }
            IsShowFlag = false;
            SearchContent.find('.container').append(FinalHTml);
            EqualHeight();
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
            }
        },
        CreateSubItems = function(Data, Button, RemainingCount) {
            var FinalHTml = '',
                Title, ShowMoreText;
            var Results = Data[0],
                TemplateName, ListTemplate, Html = '',
                ContentType,
                Lists = Results.Results;
            ShowMoreText = (Results.ShowMoreText) ? Results.ShowMoreText : "";
            if (Lists) {
                for (var j = 0; j < Lists.length; j++) {
                    if (Lists[j].Category) {
                        ContentType = Lists[j].Category;
                        TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                        ListTemplate = Handlebars.compile(TemplateName);
                        Html += ListTemplate({ results: Lists[j] });
                    }
                }
                // debugger;
                $(Button).parents('.product-results').find(".list").append(Html);
                EqualHeight();

                if (SearchType != "ProductSearch") {
                    if (RemainingCount < 1) {
                        $(Button).addClass("hidden");
                    }
                }

            }
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
                PageNo++;
            }
        },
        CreateSearchTags = function(SiteFacets) {
            if (!$.isEmptyObject(SiteFacets)) {
                var Html = "";
                for (var i = 0; i < SiteFacets.length; i++) {
                    Html += "<li><a href='#' name='" + SiteFacets[i].Name + "' data-check='" + SiteFacets[i].Check + "'' data-contenttype='" + SiteFacets[i].ItemId + "'><strong>" + SiteFacets[i].Count + "</strong>" + SiteFacets[i].Value + "</li>";
                }
                $('.items-found').html(Html);
            }
            DoLinksEvents();
        },
        ParseSearchData = function(data, Button) {
            if (Object.keys(data).length) {
                var ProductResults = (data.ProductListing !== undefined) ? data.ProductListing : false,
                    Refine = (data.UpdatedFacets !== undefined) ? data.UpdatedFacets : false,
                    AppendItemsFlag = (data.AppendItemsFlag !== undefined) ? data.AppendItemsFlag : false,
                    FacetDescription = (data.FacetDescription != null && data.FacetDescription.length > 0) ? data.FacetDescription : false,
                    ShowMoreProductFlag = (data.ShowAllFlag  !== undefined) ? data.ShowAllFlag  : false,
                    RemainingCount = (data.RemainingCount !== undefined) ? data.RemainingCount : false;

                if (ProductResults && Object.keys(ProductResults).length && AppendItemsFlag != true) {

                    CreateSearchResult(ProductResults);
                    SearchContent.find('.results').find('strong').html(data.ProductFound);
                    if (data.ProductFound == 0) {
                        $('.items-found').hide();
                        $('.product-results').hide();
                    } else {
                        $('.items-found').show();
                        $('.product-results').show();
                    }
                    SearchContent.find('.product-results').attr('data-pagesize', data.DefaultItemCount);
                    if (FacetDescription) {
                        CreateSearchTags(FacetDescription);
                    }
                    if (Refine && Object.keys(Refine).length) {
                        UpdateRefineSection(Refine);
                    }
                    if(ShowMoreProductFlag)
                    {
                        $(".see-all").removeClass("hidden");
                        $(".see-all").off("click").on("click",function(e){
                            e.preventDefault();
                            IsShowFlag = true;
                            LoadMoreProducts();
                        });
                    }else{
                        $(".see-all").addClass("hidden");
                    }
                }
                if (AppendItemsFlag == true) {
                    CreateSubItems(ProductResults, Button, RemainingCount);
                }
                
                addthis.toolbox('.product-results');
            } else {
                $('.product-results').html(data);
            }
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
                if ($("input[name=searchResultsPageUrl]") && $("input.SeeAllResultInput")) {
                    var Value = $("input[name=searchResultsPageUrl]").val() + '?searchText=*';
                    $("input.SeeAllResultInput").val(Value);
                }
                if(SeeAllButton){
                    SeeAllButton.off("click").on("click",function(e){
                        e.preventDefault();
                        IsShowFlag = true;
                        LoadMoreProducts();
                    });
                }
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
            }

            if (IsProductPage && SectorHidden.length > 0) {
                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (SVal) {
                    var SectorSelect = ProductFinderSection.find("select.Sector");
                    UpdateResultPage(SectorSelect, SVal, SubSecVal);
                }
            }
            if ((IsSearchPage && SearchHidden.length > 0) || (ProductSearchText)) {
                var SearchVal = SearchHidden.val(),
                    SearchText = (ProductSearchText.length > 0) ? ProductSearchText.val() : null;
                if (SearchVal) {
                    SetSearchState(SearchVal);
                }
                if (SearchText) {
                    $('.search:visible').trigger('click');
                }
            }
            if (ShowMoreLink && IsProductPage) {
                DoPagination();
            }
            if (ShowMoreLink && (IsResourcePage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            if (ShowMoreLink && (IsSearchPage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            ToggleView();
            EqualHeight();
            GetSortValue();
        };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        ResetPaging: ResetPageSize,
        DefaultParameters: GetDefaultValues
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());

/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.sectorList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _sectorList = $('#sector-list-section'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
        });
    }
    _bindShowLess = function () {
      var _showLess = $('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 20
            },700);
      });
    }
    init = function() {
        if (_sectorList.length > 0) {
            _bindShowMore(_sectorList);
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorList.init());

/*
 * sectorpage-strengths.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-25
 * @author:     Tejaswi , tchennupati@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.sectorPageStrengths = (function(window, $, namespace) {
    'use strict';
    //variables

    var _sectorPageStrengths = $('.sectorpage-strengths'),
        _elements = 0,
    // methods
        init,
        _bindShowMore,_bindShowLess,
        _adjustHeigt, _checkElemnt , equalHeight;


    _checkElemnt = function () {
        var _vp = INFORMA.global.device.viewportN;

        if(_vp == 0) {
            var count = _sectorPageStrengths.data('desktop');
            _sectorPageStrengths.find('.marg1:nth-child(n+'+ (count + 1)+')').hide();
            if(_sectorPageStrengths.find('.marg1').length >= (count+1)) {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
            } else {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
            }
            _elements = count;
        } else if(_vp == 1) {
          _sectorPageStrengths.find('.marg1:nth-child(n+5)').hide();
          if(_sectorPageStrengths.find('.marg1').length > 4) {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
          } else {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
          }
          _elements = 4;
        } else {
          _sectorPageStrengths.find('.marg1:nth-child(n+4)').hide();
          _elements = 3;
        }
    }

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(n+'+ (_elements + 1) +')').slideToggle();
              $(this).parents('.sectorpage-strengths').toggleClass('showLess');
        });
    }

    equalHeight = function () {
        var EachView = jQuery('.sectorpage-strengths');
        EachView.each(function () {
            var Items = jQuery(this).find('.text-description'),
                Description = jQuery(this).find('.yellow-container'),
                MainContainer = jQuery(this).find('.main-container'),
                _maxHeight = 0,
                _mainMaxHeight = 0,
                _descHeight = 0;
            Items.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight );
            Description.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _descHeight) {
                    _descHeight = Height;
                }
            })
            Description.css('height', _descHeight );
            MainContainer.each(function () {
                var Height = jQuery(this).outerHeight();
                if (Height > _mainMaxHeight) {
                    _mainMaxHeight = Height;
                }
            })
            MainContainer.css('height', _mainMaxHeight );

        })
    }
    _bindShowLess = function () {
      var _showLess = $('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 20
            },700);
      });
    }
    init = function() {
        if (_sectorPageStrengths.length > 0) {
            _checkElemnt();
            _bindShowMore(_sectorPageStrengths);
            _bindShowLess();
            equalHeight();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());

/*
* support-page-tabs.js
*
*
* @project:    Informa
* @date:       2016-june-13
* @author:     Tejaswi tchennupati@sapient.com
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.navtabs = (function(window, $, namespace) {
    'use strict';
    //variables
    var Tabs = $('.support-page-tabs ul.nav li'),
        tabcontent = $('.support-page-tabs .tab-content .tab-pane'),
        init;
    init = function() {
        jQuery(Tabs[0]).addClass('active');
        jQuery(tabcontent[0]).addClass('active');
        Tabs.on('click', function() {
        Tabs.removeClass('active');
            jQuery(this).addClass('active');
            var tabpane = jQuery(this).find('a').attr('href');
            tabcontent.removeClass('active');
            jQuery(tabpane).addClass('active');
        })
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navtabs.init());

/*
 * training-material.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-18
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.trainingMaterial = (function(window, $, namespace) {
    'use strict';
    //variables
    var _traininglist = $('.slick-carousel'),
    // methods
        init,
        _dots,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = Boolean(container.data('autorotate')),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be displayed
            _infinite = true,
            _dots = Boolean(container.data('pagination'));
            

        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            dots: _dots,
            adaptiveHeight: true,
            arrows: true,
            swipe: INFORMA.global.device.isDesktop ? false : true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },{
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
            ]
        });
    }

    init = function() {
        if (_traininglist.length > 0) {
            _createSlider(_traininglist);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.trainingMaterial.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoBackground = (function(window, $, namespace) {
    'use strict';

    var _iFrameElement = $('.hero-banner .videoBG'),
        init,
        _urlType,
        _urlSrc,
        _urlSrcOptions,
        _youTubeId,
        _wistiaId,
        _vimeoId,
        _wistiaUrl,
        _vimeoUrl,
        ytPlayer,
        _youTubeSound,
        _wistiaSound,
        _vimeoSound,
        _addOptions,
        _setHeroVideoHeight;
    _setHeroVideoHeight = function(){
      var videoBGContainer = $('.hero-banner').find('.videoBG');
      if(videoBGContainer.length > 0){
        $('.hero-banner').addClass('hero-banner-video');
      }else{
        $('.hero-banner').removeClass('hero-banner-video');
      }

    }
    _addOptions = function() {
        //$('.videoBG_wrapper').parent().css( "height", "auto" );
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');

            if (_urlType == "youtube") {

                _youTubeId = $(this).attr('data-videoid');
                _youTubeSound = $(this).attr('data-videosound');

                var playerYTElement = document.createElement('div');
                playerYTElement.id = "youtubePlayer";
                $(this).append(playerYTElement);

                var scriptTag = document.createElement('script');
                scriptTag.src = "https://www.youtube.com/iframe_api";

                var ytTag = document.getElementById('youtubePlayer');
                ytTag.parentNode.insertBefore(scriptTag, ytTag.nextSibling);

            } else if (_urlType == "vimeo") {

                _vimeoUrl = $(this).attr('data-videourl')
                _vimeoId = $(this).attr('data-videoid');
                _vimeoSound = $(this).attr('data-videosound');

                var playerVMElement = document.createElement('div');
                playerVMElement.id = "vimeoPlayer";
                $(this).append(playerVMElement);

                var options = {
                  id: _vimeoId,
                  autoplay: true,
                  loop: true
                };

                var vimeoPlayer = new Vimeo.Player('vimeoPlayer', options);
                vimeoPlayer.setVolume(_vimeoSound);

            } else if (_urlType == "wistia") {

                _wistiaUrl = $(this).attr('data-videourl')
                _wistiaId = $(this).attr('data-videoid');
                _wistiaSound = $(this).attr('data-videosound');

                var iframeWSElement = document.createElement('iframe');
                iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                $(this).append(iframeWSElement);

            }

        });

    }

    window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player('youtubePlayer', {
            videoId: _youTubeId,
            playerVars: {
                'modestbranding': 1,
                'autoplay': 1,
                'controls': 0,
                'loop': 1,
                'playlist': _youTubeId,
                'showinfo': 0
            },

            events: {
                'onReady': onYTPlayerReady
            }
        });
    };

    function onYTPlayerReady(event) {
        event.target.playVideo();
        event.target.setVolume(_youTubeSound);
    }

    init = function() {
        _addOptions();
        _setHeroVideoHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBackground.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoFull = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoFullWrapper = $('.video-full-container .video-img'),
        _videoPlayBtnWrapper = $('.video-full-container .play-icon'),
        video,
        // methods
        init,
        _playFullVideoWrapper,
        _playFullVideoBtnWrapper;

    _playFullVideoBtnWrapper = function() {
        _videoPlayBtnWrapper.click(function() {
            var videoImg = $(this).parent().find('img');
            if (videoImg.attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg .attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
            }
            videoImg.replaceWith(video);
            $(this).remove();
        });
    }

    _playFullVideoWrapper = function() {
        _videoFullWrapper.click(function() {

            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay=1&autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
            }
            $(this).replaceWith(video);
            function onYouTubePlayerAPIReady() {
                player = new YT.Player('video', {
                  autoplay: 1
                });
            }
            $('.play-icon').remove();
        });


    }

    init = function() {
        _playFullVideoWrapper();
        _playFullVideoBtnWrapper();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoFull.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoMini = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoMiniImgWrapper = $('.video-mini-container .video-img'),
        _videoMiniPlayBtnWrapper = $('.video-mini-container .play-icon'),
        _videoMiniPlayerModal = $('#videoMiniModal'),
        _videoMiniModalClose = $('.video-mini-close'),
        video,
        // methods
        init,
        _playVideoMiniImgWrapper,
        _playVideoMiniBtnWrapper,
        _videoMiniShowPlayIcon;

    _playVideoMiniBtnWrapper = function() {
        _videoMiniPlayBtnWrapper.click(function() {
            var videoImg = $(this).parent().find('img');
            if (videoImg.attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            _videoMiniPlayerModal.find('.modal-body .video-mini-player').html(video)
            _videoMiniPlayerModal.modal('show');
            $(this).parents('.video-mini-container').find('.play-icon').hide();
          //  imgContainer.find(_videoMiniPlayBtnWrapper).hide();

        });
    }

    _playVideoMiniImgWrapper = function() {
        _videoMiniImgWrapper.click(function() {
            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            _videoMiniPlayerModal.find('.modal-body .video-mini-player').html(video)
            _videoMiniPlayerModal.modal('show');
            _videoMiniPlayBtnWrapper.hide();
        });
    }
    _videoMiniShowPlayIcon = function() {
        _videoMiniModalClose.click(function() {
            _videoMiniPlayBtnWrapper.show();
            $(this).parents('.video-mini-modal').find('iframe').remove();
        });
    }

    init = function() {
        _playVideoMiniImgWrapper();
        _playVideoMiniBtnWrapper();
        _videoMiniShowPlayIcon();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoMini.init());
