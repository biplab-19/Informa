/*! 2016-06-25 */_adjustHeigt = function(){
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
INFORMA.EventList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _EventLists = $('.analyst-profile-events .event-items'),
        // methods
        init,
        SliderOption = {
            "autoplay": false,
            "autoplaySpeed": 4000,
            "sliderDots": true,
            "sliderInfinite": true,
            "slidesScroll": 1,
            "slidesShow": 1,
            "speed": 400
        },
        CreateSlider;

        CreateSlider = function(el) {

            el.slick({
                dots: SliderOption.sliderDots,
                infinite: SliderOption.sliderInfinite,
                speed: SliderOption.speed,
                autoplay: SliderOption.autoplay,
                autoplaySpeed: SliderOption.autoplaySpeed,
                slidesToShow: SliderOption.slidesShow,
                slidesToScroll: SliderOption.slidesScroll
            });
        }

    init = function() {
        if (_EventLists.length > 0) {
            if(INFORMA.global.device.isMobile){
                CreateSlider(_EventLists);
            }
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventList.init());

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
        _bindShowMore;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-options');
        _showMore.click(function(){
            $(this).parents('#analyst-profile').find('.descriptions').toggleClass("show-content");
        });
    }

    init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
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
        txtField = AnalystSearch.find('#name'),
        productAnalystResults = $('.product-analyst-results'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _template = "",
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, equalHeight, RenderChangeResult, ajaxCallonSector, AppendItems, AppendSearchResult, RenderAllSubSectorResults;

    equalHeight = function () {
        var EachView = jQuery('.analyst-views');
        EachView.each(function () {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                _maxHeight = 0,
                _padding = 50;
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }

    RenderAllSubSectorResults = function (data, sectorId) {
        var results = data,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystTemplate !== "undefined") ? Templates.AnalystsTemplate : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }

        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.row').html(html);
        equalHeight();
       

        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').addClass('showLess');

        
        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').slideToggle();
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
        })

        Sector.chosen().on('change', function () {
            var _value = jQuery(this).val(),
                _text = jQuery(this).find("option:selected").text(),
                _txtField = txtField.val().length;
            if (_value === 'default' && _txtField < 3) {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
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
            var GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
            GetAjaxData(Urls.AnalystSearch, "Post", GetSerializeData, RenderSearchResult, null, null);
        })
    }

    RenderChangeResult = function (data) {
        var defaultValue = jQuery(SubSector.find('option')[0]);
        SubSector.empty();

        var html = '<option value=' + defaultValue.val() + '>' + defaultValue.text() + '</option>';

        for (var key in data) {
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
        productAnalystResults.html(html);
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
                _Object = JSON.parse(GetSerializeData);
            _Object.SectorID = sectorId;
            for (var key in _Object) {
                if (_Object[key] == "default") {
                    _Object[key] = null;
                }
            }
            if (!jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').hasClass('showLess')) {
                GetAjaxData(Urls.AnalystSearchAll, "Post", JSON.stringify(_Object), RenderAllSubSectorResults, null, sectorId);
            } else {
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').slideUp();
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').remove();
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').removeClass('showLess');
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
    var _ArticleLists = $('.article-list .list-container'),
        _HeadlinesLists = $('.headline-list .list-container'),
        FilterMenu = $(".category-filter-list .categoryFilter"),
        ArticleCont = $(".article-list"),
        HeadlineCont = $(".headline-list"),
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
        CreateSlider, GetCarouselOptions, GetCarouselUpdatedHtml, GetCarouselData, equalHeights, RenderCarousel, BindFilterEvents, GetListCount;

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
            ele.show();
            var updateCarouselHeight = setTimeout(function(){
                clearTimeout(updateCarouselHeight);
                equalHeights();
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
                        RenderCarousel(html, _ArticleLists);
                    }else{
                        ArticleCont.hide();
                    }
                    if (data.Articles !== undefined && data.Headlines.length > 0) {
                        var html = GetCarouselUpdatedHtml(INFORMA.Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        HeadlineCont.show();
                        RenderCarousel(html, _HeadlinesLists);
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
            $('.list-container').each(function() {

                // Cache the highest
                var highestBox = 0;

                // Select and loop the elements you want to equalise
                $('.columns', this).each(function() {

                    // If this box is higher than the cached highest then store it
                    if ($(this).height() > highestBox) {
                        highestBox = $(this).height();
                    }

                });

                // Set the height of all those children to whichever was highest
                $('.columns', this).height(highestBox);

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
            equalHeights();

        },
        CreateSlider = function(el,mobileScroll) {
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
        if (_ArticleLists.length > 0) {
            CreateSlider(_ArticleLists,1);
        }
        if (_HeadlinesLists.length > 0) {
            CreateSlider(_HeadlinesLists,2);
        }
        if (FilterMenu && !isExperienceMode) {
            $(".chosen-select").chosen({ disable_search_threshold: 10, width: "100%" });
            BindFilterEvents();
        }
        $(window).on("orientationchange", function() {
            equalHeights();
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
    var _brandList = $('#product-brands-list-section'),
    // methods
        init,
        _bindShowMore,
        _equalHeight;
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

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-more-brands ');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path

              $('.product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading').show();
              $('.product-brands-list .view-all-mobile-container').hide();
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
    // methods
        init,
        _openAccordian;

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

    _eachTile.on('click', function() {
        _eachTile.parent().find('.collapse').collapse('hide');
        _eachTile.not(jQuery(this)).addClass('collapsed');
        jQuery(this).parent().find('.collapse').collapse('hide');
        if(jQuery(this).hasClass('collapsed')) {
            jQuery(this).removeClass('collapsed');
        } else {
            jQuery(this).addClass('collapsed');
        }
    })
    

    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());

/*
* analyst-list.js
*
*
* @project:    Informa
* @date:       2016-May-22
* @author:     Tejaswi tchennupati@sapient.com
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.navbars = (function(window, $, namespace) {
    'use strict';
    //variables
    var Tabs = $('.pos ul.nav li'),
      tabcontent = $('.tab-content .tab-pane'),
        init;
    init = function() {
        jQuery(Tabs[0]).addClass('active');
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
jQuery(INFORMA.navbars.init());

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
        NextButton = $('.fc-next-button'),


        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMMM YYYY'),
       _end = moment(_Start).add('months', 11).format('MMMM YYYY'),
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
           // NoEventsFound();
           EqualHeight();
            
          CheckCount();
            
          var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date(ViewDateText)).format('MMMM YYYY');
                
          if(moment(ViewDate).format('MMMM YYYY') == _Start) {
            List.find('.previous').addClass('arrow-desabled');
          } else {
             List.find('.previous').removeClass('arrow-desabled');
          }

          if(ViewDate == _end) {
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
                jQuery(this).next('.more-events').show();
            } else {
                jQuery(this).next('.more-events').hide();
            }
        })
    },
    RenderOnLoad = function() {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY');
            EqualHeight();
        var obj = {
            MonthYear: DatePass
        }
        _previousDate = date;
        GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderLoadEvents, null, null);
        CheckCount();
    },

    RenderLoadEvents = function(data) {
        var _contentheight = null, _dayView = [],
            _vp = INFORMA.global.device.viewportN,
            header = null;

        if(_vp === 2) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else if(_vp === 1) {
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        } else {
            _contentheight = 1700;
            _dayView = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        if(_vp === 1 || _vp === 0) {
            header = {
                left: 'title',
                right: 'prev,next'
            }
        } else {
            header = {
                left: 'prev',
                center: 'title',
                right: 'next'
            }
        }

        List.find('.previous').addClass('arrow-desabled');
        //NoEventsFound(data);
        Calendar.html("");
        Calendar.fullCalendar({
                header: header,
                eventLimit: true,
                contentHeight: _contentheight,
                viewRender: function(view) {
                    var date = new Date(),
                        momentdate = moment(date),
                        currentMonth = date.getMonth(),
                        currentYear = date.getYear(),
                        viewDate = new Date(view.title),
                        viewMonth = viewDate.getMonth(),
                        viewYear = viewDate.getYear(),
                        endDate = momentdate.add('months', 11).toDate(),
                        endMonth = endDate.getMonth(),
                        endYear = endDate.getYear(),
                        nextMonth = moment(viewDate).add('months', 1).toDate(),
                        nextDetails = moment(nextMonth).format('MMM-YYYY');

                    if(currentMonth === viewMonth && currentYear === viewYear) {
                        jQuery('.fc-prev-button').addClass('disabled');
                    } else {
                        jQuery('.fc-prev-button').removeClass('disabled');
                        
                    }
                    
                    if(viewMonth === endMonth) {
                        jQuery('.fc-next-button').addClass('disabled');
                    } else {
                        jQuery('.fc-next-button').removeClass('disabled');
                    }
                    console.log(_previousDate);

                        // if(moment(_previousDate).format('MMMM YYYY') != moment(viewDate).format('MMMM YYYY')) {                            
                        //     
                        //     RenderParticularMonth(viewDate);  
                        // }
                    

                    // _previousDate = null;
                    
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
                        CountryText = "";

                        if(event.Country != null) {
                            CountryText = event.Country;
                        }
                        
                    if(moment(CurrentDate).format('DD MMM YYYY') > moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    } else if(moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    } else {
                        return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    }
                }
        });
        CheckEvents(data);
        SetCalendarEvents(data);
    },
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(date).format('MMMM YYYY'); 
                
                var obj = { 
                        MonthYear: NextMonth, 
                        SectorId: SectorSelect.val() 
                } 
        GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null); 

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
        
        for(var key in data) {
            EventList.push({
                "title": data[key].Title,
                "start": new Date(data[key].EventDate),
                "State": data[key].State,
                "Country": data[key].Country
            })
        }
        jQuery('section[data-view="calendar-view"]').show();
        for(var key in EventList) {
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
            jQuery('body').attr('class', 'agri-theme');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);
            jQuery('section[data-view="'+ViewMode+'"]').show();
            
            //NoEventsFound();
            
        })

         

        MonthSelect.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date(value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
                MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                Country: Country.val()
            }
            
            _previousDate = new Date(value);

            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound();
        })
        Country.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date(value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
                MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                Country: jQuery(this).val()
            }
            
            _previousDate = new Date(value);

            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound();
        })

        
        SectorSelect.on('change', function(){
            var obj = {
                MonthYear: MonthSelect.val(),
                SectorId: jQuery(this).val(),
                Country: Country.val()
            }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound(); 
        })

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
                    ViewDate = new Date(DateText),
                    prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');
                    
                    var obj = {
                        MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                        Country: Country.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

        })
        $(document).on('click','.fc-next-button, .fc-prev-button', function(){
            var currentMonth = jQuery(this).parents('.fc-toolbar').find('h2');
            RenderParticularMonth(currentMonth);
        })
        $(document).on('click', 'section[data-view="list-view"] .previous', function() {
            var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');
                    
                    var obj = {
                        MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                        Country: Country.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

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
    var _featureList = $('#feature-list'),
    // methods
        init,
        _bindShowMore;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore',container);
       var _limit = container.data(INFORMA.global.device.viewport) + 1;
        $('.feature-list-container:nth-child(n+'+_limit+')').hide();
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewport;
            var _limit = container.data(INFORMA.global.device.viewport) + 1;
            _featureList.children().find('.feature-list-container:nth-child(n+'+_limit+')').slideToggle();
            $(this).toggleClass('showLess');
        });
    }

    init = function() {
        if (_featureList.length > 0) {
            _bindShowMore(_featureList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());


(function ($) {
	/* "YYYY-MM[-DD]" => Date */
	function strToDate(str) {
		try {
			var array = str.split('-');
			var year = parseInt(array[0]);
			var month = parseInt(array[1]);
			var day = array.length > 2? parseInt(array[2]): 1 ;
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

	$.fn.calendar = function (options) {
		var _this = this;
		var opts = $.extend({}, $.fn.calendar.defaults, options);
		var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var tHead = week.map(function (day) {
			return "<th>" + day + "</th>";
		}).join("");

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="javascript:void(0);">&lt;</a></span>' +
			'	<span class="next"><a href="javascript:void(0);">&gt;</a></span>' +
			'	<span class="month"><span>' +
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

		_this.update = function (date) {
			var mDate = new Date(date);
			mDate.setDate(1); /* start of the month */
			var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
			mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

			function dateToTag(d) {
				var tag = $('<td><a href="javascript:void(0);"></a></td>');
				var a = tag.find('a');
				a.text(d.getDate());
				a.data('date', dateToStr(d));
				if (date.getMonth() != d.getMonth()) { // the bounday month
					tag.addClass('off');
				} else if (_this.data('date') == a.data('date')) { // the select day
					tag.addClass('active');
					_this.data('date', dateToStr(d));
				}
				return tag;
			};

			var tBody = _this.find('tbody');
			tBody.empty(); /* clear previous first */
			var cols = Math.ceil((day + daysInMonth(date))/7);
			for (var i = 0; i < cols; i++) {
				var tr = $('<tr></tr>');
				for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
					tr.append(dateToTag(mDate));
				}
				tBody.append(tr);
			}

			/* set month head */
			var monthStr = dateToStr(date).replace(/-\d+$/, '');
			_this.find('.month').text(monthStr)
		};

		_this.getCurrentDate = function () {
			return _this.data('date');
		}

		_this.init();
		/* in date picker mode, and input date is empty,
		 * should not update 'data-date' field (no selected).
		 */
		var initDate = opts.date? opts.date: new Date();
		if (opts.date || !opts.picker) {
			_this.data('date', dateToStr(initDate));
		}
		_this.update(initDate);

		/* event binding */
		_this.delegate('tbody td', 'click', function () {
			var $this = $(this);
			_this.find('.active').removeClass('active');
			$this.addClass('active');
			_this.data('date', $this.find('a').data('date'));
			/* if the 'off' tag become selected, switch to that month */
			if ($this.hasClass('off')) {
				_this.update(strToDate(_this.data('date')));
			}
			if (opts.picker) {  /* in picker mode, when date selected, panel hide */
				_this.hide();
			}
		});

		function updateTable(monthOffset) {
			var date = strToDate(_this.find('.month').text());
			date.setMonth(date.getMonth() + monthOffset);
			_this.update(date);
		};

		_this.find('.next').click(function () {
			updateTable(1);

		});

		_this.find('.prev').click(function () {
			updateTable(-1);
		});

		return this;
	};

	$.fn.calendar.defaults = {
		date: new Date(),
		picker: false,
	};

	$.fn.datePicker = function () {
		var _this = this;
		var picker = $('<div></div>')
			.addClass('picker-container')
			.hide()
			.calendar({'date': strToDate(_this.val()), 'picker': true});

		_this.after(picker);

		/* event binding */
		// click outside area, make calendar disappear
		$('body').click(function () {
			picker.hide();
		});

		// click input should make calendar appear
		_this.click(function () {
			picker.show();
			return false; // stop sending event to docment
		});

		// click on calender, update input
		picker.click(function () {
			_this.val(picker.getCurrentDate());
			return false;
		});

		return this;
	};

	$(window).load(function () {
		$('.jquery-calendar').each(function () {
			$(this).calendar();
		});
		$('.date-picker:text').each(function () {
			$(this).datePicker();
		});
	});
}(jQuery));

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
        _showOverlay();
        _bindToolTip();
        _validateForm();

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

            _showOverlay();
            _bindToolTip();

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
 * global-header.js
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
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _fixed = 'navbar-fixed-top',
        _isHeaderFixed = false,


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
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],

        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _arrayFlag = true,
        _pdpFirst = true,
        _initialPdpHdrPos = 0,
        _expandedPdpNav = false,

        

        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        _servicesNavigationPos = 0,
        _servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
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

        _bindNavigationEvents;
        


    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen

    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
        _pdpNavigationPos = _pdpNavigation.offset().top;
        
        _pdpMenuFollower.css('width', $(_pdpLink[0]).width())
                        .css('left', $(_pdpLink[0]).offset().left)
                        .show();
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();
        _servicesNavigationPos = _servicesNavigation.offset().top;

        // To show the menu follower with right width and position, todo: remove harcode
        _servicesMenuFollower.css('width', $(_servicesLink[0]).width())
                             .css('left', $(_servicesLink[0]).offset().left)
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

        if (_windowPos > _headerPos) {
            if (!_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.addClass(_fixed);
                $(".informaNav .hide-stick").fadeOut("5000", "linear");
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', _navHeight);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.removeClass(_fixed);
                $(".informaNav .hide-stick").fadeIn("5000", "linear");
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', 0);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();

        if (_windowPosMobile > _headerPosMobile) {
            _mobileNavigation.addClass(_fixed);
            $('body').css('padding-top', _navHeightMobile);
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _mobileNavigation.removeClass(_fixed);
            $('body').css('padding-top', 0);
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }

    };

    _pdpSectionActions = function(){
        _pdpSectionsButton.on('click', function(e) {
            e.preventDefault();
            console.log("Sections button clicked");
            if($("#pdp-sections:visible").length)
                $('#pdp-sections').slideUp();
            else
                $('#pdp-sections').slideDown();
        })
    };

    _initPdpMenuBarFollow = function() {
        _pdpLink = $('#pdp-navigation ul > li > a');
        
        if (_pdpLink.length == 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;
        }

    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop();

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

        

        if (_windowPos > (_initialPdpHdrPos - _fixedNavHeight)) {
            _pdpNavigation.addClass(_fixed);
            _pdpNavigation.css('top', _fixedNavHeight + 'px');
            _pdpWrapper.css('padding-top', _pdpNavigationHeight);
            _pdpFixed = true;

            if (_arrayFlag) {
                _pdpMenuPos = [];
                _pdpMenuWidth = [];
                _pdpMenuleft = [];
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = '#' + $(_pdpLink[i]).data('target');

                    _pdpMenuPos.push($(_sectionName).offset().top);
                    _pdpMenuWidth.push($(_pdpLink[i]).width());
                    _pdpMenuleft.push($(_pdpLink[i]).parent().offset().left);
                }
                _arrayFlag = false;
            }

        } else {
            _pdpNavigation.removeClass(_fixed);
            _pdpNavigation.css('top', '0px');
            _pdpWrapper.css('padding-top', 0);
            _pdpFixed = false;
            _arrayFlag = true;
            _initialPdpHdrPos = _pdpNavigation.offset().top;
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
        var _windowPos = $(window).scrollTop();

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
                    _servicesMenuWidth.push($(_servicesLink[i]).width());
                    _servicesMenuleft.push($(_servicesLink[i]).parent().offset().left);
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


    _bindNavigationEvents = function() {

        if (INFORMA.global.device.isDesktop) {
            _navlinks.on('click', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                $('#sub-nav .subnav-container').hide();
                _navlinks.removeClass('nav-active');
                $(this).addClass('nav-active');
                $('#' + navId).slideDown();
            });
            _subnavclose.on('click', function(e) {
                e.preventDefault();
                $('#sub-nav .subnav-container').hide();
                _navlinks.removeClass('nav-active');
            });
        } else {
            _navlinks.on('click', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                var navText = $(this).find('a').text();
                $('#sub-nav .subnav-container').hide();
                $('.informaNav .nav-main').css('left', '-100%');
                $('#' + navId).css('display', 'block');
                $('#mobile-header-navigation .nav-subnav-heading').text(navText);
                $('#mobile-header-navigation .nav-back').css('display', 'block');
            });
        }

        //For mobile toggle navigations
        _navtoggle.on('click', function(e) {
            e.preventDefault();
            $('#mobile-header-navigation').css('left', '0');
            $('.informaNav .nav-main').css('left', '0');
            $('#sub-nav').css('left', '0');
            $('body').css('overflow-y', 'hidden');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
        });

        _navclose.on('click', function(e) {
            $(".navbar-collapse").collapse('hide');
            $('#mobile-header-navigation').css('left', '-100%');
            $('.informaNav .nav-main').css('left', '-100%');
            $('#sub-nav').css('left', '-100%');
            $('body').css('overflow-y', 'scroll');
        });

        _navback.on('click', function(e) {
            $('.informaNav .nav-main').css('left', '0');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            $('body').css('overflow-y', 'hidden');
        });

    };

    init = function() {
        //if(INFORMA.global.device.viewport!='mobile'){
        if (_pdpNavigation.length > 0) {
            _initPdpMenuBarFollow();
            _pdpNavigationScrollTo();
            _pdpSectionActions();
        }

        if (_servicesNavigation.length > 0) {
            _initServicesMenuBarFollow();
            _servicesNavigationScrollTo();
        }

        _whenScrolling();
        //}
        _bindNavigationEvents();


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
            $(target).children().removeClass('show').addClass('hide');
            var show = $("option:selected", this).data('show');
            $(show).removeClass('hide').addClass('show');
        });
    }

    init = function() {
        $('.help-faq-wrapper').children().first().addClass('show');
        $('.help-faq-wrapper').children().not(':first').addClass('hide');
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
        _createSlider;

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
            adaptiveHeight: true
        });
    }

    init = function() {
        if (_twitterList.length > 0) {
            _createSlider(_twitterList);
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
        _equalHeight,
        _lists = null;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            } else if(_vp == 3) {
                _vp = 3;
            }
            else {
                _vp = 4; // or (n+9)
            }
            _analystList.find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).toggleClass('showLess');
        });
    }

    _equalHeight = function(items) {
        var _analystDescription = items.find('.analyst-description'),
            _docWidth = jQuery(document).width(),
            _eachItemWidth = jQuery(items.find('.analyst-description')[0]).width(),
            _maxHeight = 0;
            _analystDescription.each(function() {
                var _currentHeight = jQuery(this).height();
                if(_currentHeight > _maxHeight) {
                    _maxHeight = _currentHeight;
                }
            });
            _analystDescription.css('height',_maxHeight+50);

    }

    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
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
    var _customersList = $('#customer-quote-slider'),
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

     //chk for sitecore preview
      if(INFORMA.global.siteCore.isPreview) {
            _autoplay = true;
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
               dots: (_dots!==null || _dots!==undefined) ? _dots : true
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
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
        SubSectorList = $(".sector-search .sub-sector-list"),
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
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSearch,
        ToggleProductFinder, RenderSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler, BindAjaxHandler;

        ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                SearchIcon.toggleClass("inactive");
                ProductFinderSection.slideUp("fast");
            });

            SearchIcon.on("click", function(e) {
                e.preventDefault();
                if($("#product-finder-section:hidden").length)
                    SearchIcon.toggleClass( "inactive" );
                ProductFinderSection.slideDown("slow");
            });
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
        RenderSearchResult = function(data, SearchType) {
            INFORMA.SearchResults.RenderSearchResults(data,SearchType);
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
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
        SubmitHandler = function(btn, SearchType) {
            btn.off().on("click", function(e) {
                e.preventDefault();
                SearchTabHidden.val("allresults");
                var FieldArray = ProductFinderSection.find("form").serializeArray(),
                    GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
                INFORMA.Spinner.Show($("body"));
                GetAjaxData(Urls[SearchType], "Post", GetSerializeData, RenderSearchResult, null, SearchType);

                //Reset Pagination size to default value
                INFORMA.SearchResults.ResetPageSize();
                ResultContainer.removeClass('ShowLoadBtn');
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
                if($(this).val()!==""){
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
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSearch(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {

            var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join("&");
            SectorIDs = 'SectorIDs='+SectorIDs;
            GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null);
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
                    if ($(option).parent().hasClass("sector-list") === true) {
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
        UpdateSubSectorDropdown: UpdateSubSectorDropdown
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());

/*
 * Resource Filter.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        ResourceContainer = $('.resource-filter'),
        CustomResourceSelect = ResourceContainer.find("select"),
        SectorSelect = ResourceContainer.find("select.resource-sector"),
        SubSectorSelect = ResourceContainer.find("select.resource-sub-sector"),
        BtnSubmit = ResourceContainer.find(".search-resource"),
        ResourceListContainer = $('.resource-list'),
        BtnMore = $('.btn-showMore'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        pageNumber = 2,
    // methods
        init,
        BindDropDown,
        ResourceBindDropDown,
        RenderResourceResult,
        RenderOnLoad,
        SubmitHandler,
        GetAjaxData,
        equalHeights,
        GetResourceSubSectorList,
        UpdateResourceSubSectorDropdown;

    equalHeights = function() {
        $('.list-container').each(function() {
            var highestBox = 0;
            $('.columns', this).each(function() {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });
            $('.columns', this).height(highestBox);
        });
    },

    GetResourceSubSectorList = function(arrayList) {
        var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join("&");
            //SectorIDs = 'SectorIDs='+SectorIDs;
            
            var obj = {
                "SectorIDs": SectorIDs
            }
            GetAjaxData(Urls.ResourceSubSectorList, "Post", JSON.stringify(obj), UpdateResourceSubSectorDropdown, null, null);
    },

    UpdateResourceSubSectorDropdown = function(data) {

        if (data.SubSectors.length > 0) {
            var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                html = ListTemplate({ SubSectors: data.SubSectors });


            // $(".sector-search li").removeClass("disabled");
            SubSectorSelect.removeAttr("disabled")
                .removeProp("disabled")
                .html(html);
            SubSectorSelect.multiselect('rebuild');
        }
    },

    ResourceBindDropDown = function() {
        var SectorList = [];
        CustomResourceSelect.val("");
        CustomResourceSelect.multiselect({
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
                if ($(option).parent().hasClass("resource-sector") === true) {
                    if (checked) {
                        SectorList.push($(option).val());
                        SubSectorSelect.parents('li').removeClass('disabled');
                        SubSectorSelect.removeAttr('disabled');
                        SubSectorSelect.multiselect('rebuild');
                    } else {
                        var index = SectorList.indexOf($(option).val());
                        if (index >= 0) {
                            SectorList.splice(index, 1);
                        }
                        SubSectorSelect.parents('li').addClass('disabled');
                        SubSectorSelect.attr('disabled', 'disabled');
                        SubSectorSelect.multiselect();
                    }
                }
                if ($(option).parent().hasClass("resource-sector")) {
                    if (SectorList.length > 0) {
                        GetResourceSubSectorList(SectorList);
                    }
                }
            }

        });
    },

    RenderResourceResult = function(data) {
        INFORMA.Spinner.Show($("body"));
        
        var results = data.Resources,
            html = "";

        for (var key in results) {
            if (key === "Articles") {
                var Data = results[key],
                    TemplateName = (Templates.articleListItems !== "undefined") ? Templates.articleListItems : "",
                    ListTemplate = Handlebars.compile(TemplateName);

                html += ListTemplate({"Articles" : Data});
            }
        }
        if(data.ResourceRemainingCount < 1) {
            jQuery('.btn-showMore').hide();
        } else {
            jQuery('.btn-showMore').show();
        }
        ResourceListContainer.find('ul').html(html);

        //ResourceListContainer.find('ul').find('li:nth-child(n+'+(data.Resources.Articles.length - data.ResourceRemainingCount + 1)+')').hide();
        //ResourceListContainer.find('ul').find('li:nth-child(n+'+(data.Resources.Articles.length - data.ResourceRemainingCount + 1)+')').slideDown();
        RenderOnLoad();
        equalHeights();
    },

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        // INFORMA.Spinner.Show($("body"));
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

    SubmitHandler = function() {
        BtnSubmit.on('click', function(e) {
            e.preventDefault();
            var FieldArray = ResourceContainer.find("form").serializeArray(),
                Guid = jQuery('.btn-showMore').attr('data-ContainerGuid'),
                typeGuid = jQuery('.btn-showMore').attr('data-ContenttypeGuid');

            var MergeItems = INFORMA.Utils.serializeObject(FieldArray);

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid
            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceResult, null, null);
        })
    },

    RenderOnLoad = function() {
        

        BtnMore.on('click', function() {
            var FieldArray = ResourceContainer.find("form").serializeArray(),
                Guid = jQuery(this).attr('data-ContainerGuid'),
                typeGuid = jQuery(this).attr('data-ContenttypeGuid'),
                Count = ResourceListContainer.data('count');

            var MergeItems = INFORMA.Utils.serializeObject(FieldArray);

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid;
            MergeItems.PageSize = Count * pageNumber;
            pageNumber++;
            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceResult, null, null);

        })

        SubmitHandler();
    }
    

    init = function() {
        if (ResourceContainer.length > 0) {
            ResourceBindDropDown();
            RenderOnLoad();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());
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
        FilterList = $(".search-filter .filter-list"),
        SearchFilter = $(".search-container .search-filter"),
        SearchDropDown = $(".sector-search select"),
        SubSecDropDown = $(".sector-search select.sub-sector-list"),
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SubmitBtn = $(".product-finder .sector-search li.button"),
        RefineList = $(".search-container .refine-result"),
        // methods
        init, ReturnAllSelectVal, GetFilterData, ClearAllFilter, BindRefineEvents, MakeRefineSelected,
        MakeDropUnSelected, BindFilterEvents, UpdateSearchResult, RemoveFilter, GetRefineData;

        RemoveFilter = function(item, parent) {
            item.fadeOut("fast", function() {
                item.remove();
                var FilterLength = parent.find("li").size(),
                    NoFilter = FilterList.find("li"),
                    FilterData = GetFilterData(FilterList);
                if (FilterLength < 1) {
                    parent.parent('div').hide();
                }
                if (!NoFilter.length) {
                    SearchFilter.slideUp();
                }
                UpdateSearchResult(FilterData);
            });
        },
        MakeRefineSelected = function(FilterContainer) {
            var Filters = FilterContainer.find("ul"),
                RefineItems = RefineList.find("li input"),
                FilterData = {},
                FilterValue = [];

            $.each(Filters, function() {
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem = $(this).find("li a");
                $.each(ListItem, function() {
                    if (FilterID !== "sectors" && FilterID !== "subsectors") {
                        FilterValue.push($(this).data("value"));
                    }
                });
            });
            $.each(RefineItems, function(i, v) {
                if (($.inArray($(this).data("value"), FilterValue)) > -1) {
                    $(this).parent().trigger("click");
                }
            });
        },
        ClearAllFilter = function(Parent) {
            Parent.fadeOut("fast", function() {
                Parent.remove();
                var FilterData = GetFilterData(FilterList),
                    NoFilter = FilterList.find("li");
                if (!NoFilter.length) {
                    SearchFilter.slideUp();
                }
                UpdateSearchResult(FilterData);
            });
        },
        ReturnAllSelectVal = function(options) {
            var values = jQuery.map(options, function(option) {
                return option.value;
            });
            return values;
        },
        GetRefineData = function() {
            var AllFilterData = {},
                FilterData = GetFilterData(FilterList),
                RefineData = GetFilterData(RefineList);
            $.extend(AllFilterData, FilterData,RefineData);
            return AllFilterData;
        },
        GetFilterData = function(FilterContainer) {
            var Filters = FilterContainer.find("ul"),
                FilterData = {};
            $.each(Filters, function() {
                var FilterID = $(this).data("filterid").toLowerCase(),
                    ListItem = ($(this).find("li a").length) ? $(this).find("li a") : $(this).find("li input:checked"),
                    FilterValue = [];

                $.each(ListItem, function() {
                    FilterValue.push($(this).data("value"));
                });

                FilterData[FilterID] = FilterValue;
            });
            return FilterData;
        },
        UpdateSearchResult = function(filterData) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Urls.ProductSearch, {
                method: "Post",
                data: JSON.stringify(filterData),
                success_callback: INFORMA.SearchResults.RenderSearchResults
            });
        },
        BindRefineEvents = function() {
            var RefineCloseBtn = $(".refine-list .close-filter"),
                RefineContainer = $(".search-container .slider"),
                RefineBtn = $(".refine-list .btn");

            RefineCloseBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.slideUp();
                RefineCloseBtn.hide();
            });

            $(".refine-list").off("click").on("click", "a.refine", function(e) {
                e.preventDefault();
                RefineContainer.slideDown();
                RefineCloseBtn.show();
            });
            RefineBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.fadeOut();
                RefineCloseBtn.hide();
                var getFilterData = GetRefineData();
                UpdateSearchResult(getFilterData);
            });
            MakeRefineSelected(FilterList);
        },
        BindFilterEvents = function() {
            var RemoveLink = FilterList.find("a.remove"),
                ClearAll = FilterList.find("a.remove-all");

            RemoveLink.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parents("ul").eq(0),
                    ItemValue = $(this).data("value"),
                    FilterID = Parent.data("filterid").toLowerCase();

                RemoveFilter($(this).parent(), Parent);

                if (FilterID === "sectors") {
                    MakeDropUnSelected([ItemValue], $("select.sector-list"));
                }
                if (FilterID === "subsectors") {
                    MakeDropUnSelected([ItemValue], $("select.sub-sector-list"));
                }

            });

            ClearAll.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parent(),
                    ItemID = $(this).data("filterid").toLowerCase();
               
                ClearAllFilter(Parent);
               debugger;
                if (ItemID === "sectors") {
                    FilterList.find(".SubSectors").remove();
                    SearchDropDown.val("");
                    SubSecDropDown.parents("li.menu").addClass("disabled");
                    SearchDropDown.multiselect('rebuild');
                }
                if (ItemID === "subsectors") {
                    SubSecDropDown.val("");
                    SubSecDropDown.multiselect('rebuild');
                }
            });

        },
        MakeDropUnSelected = function(Arr, DrpDwn) {
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", false);
            });
            DrpDwn.multiselect('rebuild');
        },
        init = function() {};
    return {
        init: init,
        DoFilter: BindFilterEvents,
        DoRefine: BindRefineEvents
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
        ResultContainer = $(".search-container #results"),
        AllResults = ResultContainer.find(".search-results"),
        ProductFinder = $('#product-finder-section'),
        SectorSelect = $("select.sector-list"),
        SubSectorSelect = $("select.sub-sector-list"),
        SubmitBtn = $(".product-finder .sector-search li.button"),
        SearchSubmitBtn = $(".site-search li.button"),
        SearchField = $(".site-search input[type=text]"),
        SectorHidden = $("input.sector-list"),
        SearchHidden = $("input.search-hidden"),
        SearchTabHidden = $(".site-search input.search-tab"),
        SubSectorHidden = $("input.sub-sector-list"),
        FilterList = $(".search-filter .filter-list"),
        RefineContainer = $(".search-container .refine-result"),
        ResultCount, ResultInner, SectorData, SubSectorData,
        Config = INFORMA.Configs,
        PageSize = parseInt(Config.searchResult.pageSize),
        Urls = INFORMA.Configs.urls.webservices,
        Utils = INFORMA.Utils, SearchType = '',
        // methods
        init, ResetPageSize,
        equalHeight, BindPaginationEvents, GetPaginatedData, UpdateHtmlView, ShowFilter, GetSearchPaginatedData,
        LoadProducts, CreateFilterList, BindPageLoadEvents, BindTabOpenEvents, OpenTab, GetSearchArray,
        ParseSearchData, BindTileEvents, CreateSearchResult, UpdateResultPage, MakeDropPreSelected,SetSearchState;
        ResetPageSize = function(){
            PageSize = parseInt(Config.searchResult.pageSize);
        },
        equalHeight = function(container) {
            var ItemsList = container.find('.col-md-4'),
                MaxHeight = 0,
                Padding = 10;

            ItemsList.each(function() {
                var currentHeight = jQuery(this).height();
                if (currentHeight > MaxHeight) {
                    MaxHeight = currentHeight;
                }
            })
            ItemsList.css('height', MaxHeight + Padding);
            if (INFORMA.global.device.viewportN === 2) {
                ItemsList.css('height', 'auto');
            }
        },
        MakeDropPreSelected = function(Arr, DrpDwn) {
            DrpDwn.val("");
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", true);
            });
            DrpDwn.multiselect('rebuild');
        },
        LoadProducts = function(){
            INFORMA.DataLoader.GetServiceData(Urls.ProductSearch, {
                method:"Post",
                success_callback: ParseSearchData
            });
        },
        SetSearchState = function(sVal){
            if(sVal){
                SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinder.find("input[type=radio]").eq(1).trigger("click");
                //SearchSubmitBtn.trigger("click");
            }
        },
        GetSearchArray = function(){
            var SerializeArrays = ProductFinder.find("form").serializeArray(),
                Data = Utils.serializeObject(SerializeArrays);

            return Data;
        },
        UpdateResultPage = function(SecValue, SubSecValue) {

            var SectorArray = SecValue.split(","),
                SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                SectorIDs = 'SectorIDs=' + Utils.StrngToQryStrng(SecValue);

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
                        ProductFinder.slideDown();
                        SubmitBtn.trigger("click");
                    },
                    error_callback: function() {

                    }
                });
            }
        },
        GetPaginatedData = function(Url, Data, SCallBack, ErrCallack) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Url, {
                method: "Post",
                data: Data,
                success_callback: SCallBack,
                error_callback: ErrCallack
            });
        },
        GetSearchPaginatedData = function(TabName){
            var Data = GetSearchArray();
            PageSize = parseInt(Config.searchResult.pageSize);
            Data.pageSize =  PageSize;
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(Urls[SearchType], {
                method: "Post",
                data: JSON.stringify(Data),
                success_callback: function(data){
                    var results = {};
                    results.Results = data["Results"];
                    ParseSearchData(results);

                    var UpdateTab = setTimeout(function() {
                        clearTimeout(UpdateTab);
                        OpenTab(TabName);
                    }, 500);
                }
            });
        },
        BindPaginationEvents = function(Object,url) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();
                var TabName, SearchTab, Data;

                if(SearchType==='SearchResult'){
                    TabName = ($(this).attr("href")).toLowerCase();
                    SearchTab = TabName.replace("#",'');
                    SearchTabHidden.val(SearchTab);
                    ResultContainer.addClass('ShowLoadBtn');
                }

                Data = GetSearchArray();
                PageSize+=6;
                Data.pageSize =  PageSize;
                GetPaginatedData(Urls[url], JSON.stringify(Data), function(data){
                    if(SearchType ==='SearchResult'){
                        var results = {};
                        results.Results = data["Results"];
                        ParseSearchData(results);
                    }else{
                        ParseSearchData(data);
                    }
                });
            });
        },
        BindTabOpenEvents = function(Object) {
            Object.off('click').on("click", function(e) {
                e.preventDefault();
                var TabName = ($(this).attr("href")).toLowerCase(),
                    SearchTab = TabName.replace("#",''), Data;
            
                if(!$(this).parent().hasClass("selected")){
                    SearchTabHidden.val(SearchTab);
                    GetSearchPaginatedData(TabName);
                }
            });
        },
        OpenTab = function(TabName){
            var CurrentTab = ResultContainer.find(TabName),
                AllResultTab = ($(".tab-list li:first-child a").attr("href")).toLowerCase(),
                CurrentPos;

            if(TabName===AllResultTab){
                ResultContainer.removeClass('ShowLoadBtn');
                CurrentPos = ResultContainer.offset().top;
            }else{
                AllResults.hide();
                CurrentTab.show();
                ResultContainer.addClass('ShowLoadBtn');
                CurrentPos = CurrentTab.offset().top;
            }
            $("html, body").animate({ scrollTop: CurrentPos });
            $(".tab-list li").removeClass("selected");
                $(".tab-list li a").each(function(){
                    var TabLink = ($(this).attr("href")).toLowerCase();
                    if(TabLink===TabName){
                        $(this).parent().addClass("selected")
                    }
            });
        },
        ShowFilter = function(html, container,isDefaultShow) {
            if (html && container) {
                container.html(html);
                if(isDefaultShow){
                    container.parent().parent().delay(600).slideDown();
                }
            }
        },
        CreateSearchResult = function(DataObject) {

            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key) && DataObject[key]) {
                    var ResultName = key,
                        html = "",
                        Data = DataObject[key],
                        ResultCount, ShowMoreLink, RemainingCount,
                        TemplateName = (Templates[ResultName]) ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName),
                        ContainerID = "#" + (ResultName).toLowerCase();
                        
                    if((Templates[ResultName]) && (Data[ResultName+'List'])){
                        html = ListTemplate({ results: Data[ResultName+'List'] });
                        ShowMoreLink = $(ContainerID).find(".btn-container");

                        //Update Search Results
                        $(ContainerID).find(".row").html(html);
                        $(ContainerID).show();
                        ShowMoreLink.removeClass('hide');
                    }

                    //Update Record Counts
                    if (Data) {
                        ResultCount = (Data.Count) ? Data.Count:0;
                        RemainingCount = (Data.RemainingCount) ? Data.RemainingCount:0;

                        $(ContainerID).find(".count strong").text(ResultCount);

                        if(RemainingCount<1){
                            ShowMoreLink.addClass('hide');
                        }

                    } else {
                        $(ContainerID).find(".count strong").text("0");
                        ShowMoreLink.addClass('hide');
                    }
                }else{
                    var ResultName = key,
                        ContainerID = "#" + (ResultName).toLowerCase();
                    $(ContainerID).find(".row").html('');
                }
            }
            var UpddateHeight = setTimeout(function() {
                clearTimeout(UpddateHeight);
                UpdateHtmlView();
            }, 500);
        },
        CreateFilterList = function(DataObject,Template,labelsObject) {
            var html = "";
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        Data = DataObject[key],
                        ListTemplate = Handlebars.compile(Template);
                        if(Data.length > 0){
                            if(labelsObject){
                                Data.FilterName = labelsObject[ResultName];
                            }
                            Data.FilterID = ResultName;
                            html += ListTemplate({ results: Data });
                        }
                }
            }
            return html;
        },
        BindTileEvents = function() {
            INFORMA.Utils.flipTile(ResultInner);
        },
        BindPageLoadEvents = function(){
            ResultInner = $(".search-results");
            ResultInner.each(function() {
                equalHeight($(this));
            });
            BindTileEvents();
            var ShowMoreBtn = ResultContainer.find(".btn-ShowMore");

            if(SearchType==='ProductSearch'){
                BindPaginationEvents(ShowMoreBtn,SearchType);
            }
            if(SearchType==='SearchResult'){

                var TabsLink = $(".tab-list a"),
                    OpenTabBtn = ResultContainer.find(".open-tab"),
                    FilterMenu = $(".search-tabs select");
                
                OpenTabBtn.off("click").on("click",function(e){
                    e.preventDefault();
                    var TabName = ($(this).attr("href")).toLowerCase(),
                    TabToClick = jQuery('.tab-list a[href="'+TabName+'"]');
                    if(TabToClick){
                        TabToClick.trigger("click");
                        jQuery('.search-tabs select option[value="'+TabName+'"]').prop("selected",true);
                    }
                });

                if(FilterMenu){
                    FilterMenu.off("change").on("change", function(e) {
                        e.preventDefault();
                        var SelectedFilter = FilterMenu.val(),
                            TabToClick = jQuery('.tab-list a[href="'+SelectedFilter+'"]');
                        if(TabToClick){
                            TabToClick.trigger("click");
                        }
                    });
                }
                BindPaginationEvents(ShowMoreBtn,SearchType);
                BindTabOpenEvents(TabsLink);
            }
        },
        UpdateHtmlView = function() {
            if (ResultContainer.length) {
                ResultContainer
                    .hide()
                    .fadeIn(1000);
                BindPageLoadEvents();
            }
        },
        ParseSearchData = function(data, SearchType) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine = (data.ProductFacets !== undefined) ? data.ProductFacets : false,
                    FilterLabels = (data.FilterLabels !== undefined) ? data.FilterLabels : false,
                    ProductFilters = (data.ProductFilters !== undefined) ? data.ProductFilters : false,
                    SearchTabs = (data.SearchTabs !== undefined) ? data.SearchTabs : false;
                if (ProductFilters) {
                    var html = CreateFilterList(ProductFilters,Templates.ProductFilters,FilterLabels);
                    ShowFilter(html, FilterList,true);
                    INFORMA.SearchResultFilter.DoFilter();
                }
                if (Refine) { 
                   var html = CreateFilterList(Refine,Templates.ProductFacets,FilterLabels);
                   ShowFilter(html, RefineContainer ,false);
                   INFORMA.SearchResultFilter.DoRefine();
                }
                if(SearchTabs){
                    var Data = {} , html;
                        Data.SearchTabs = SearchTabs;
                        html = CreateFilterList(Data,Templates.SearchTabs);
                    $(".search-tabs").html(html);
                    $(".search-tabs li:first-child").addClass("selected");
                }
                if (Results && Object.keys(Results).length) {
                    AllResults.hide();
                    CreateSearchResult(Results);
                }else{
                    AllResults.hide();
                    $(".no-results").show();
                }
            }
        },

        init = function() {
            var IsProductPage = (ProductFinder.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinder.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            if (IsProductPage && SectorHidden.length > 0) {
                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (SVal) {
                    UpdateResultPage(SVal, SubSecVal);
                }else{
                    LoadProducts();
                }
            }

            if(IsSearchPage && SearchHidden.length >0){
                var SearchVal = SearchHidden.val();
                if (SearchVal) {
                    SetSearchState(SearchVal);
                }
            }

            if (ResultContainer.length > 0) {
                BindPageLoadEvents();
            }

    };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        UpdateResultPage: UpdateResultPage,
        ResetPageSize:ResetPageSize
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
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
        });
    }

    init = function() {
        if (_sectorList.length > 0) {
            _bindShowMore(_sectorList);
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
        _bindShowMore,
        _adjustHeigt, _checkElemnt;


    _checkElemnt = function () {
        var _vp = INFORMA.global.device.viewportN;

        if(_vp == 0) {
            var count = _sectorPageStrengths.data('desktop');
            _sectorPageStrengths.find('.marg1:nth-child(n+'+ (count + 1)+')').hide();
            if(_sectorPageStrengths.find('.marg1').length > (count+1)) {
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
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(n+'+ (_elements + 1) +')').toggle();
              $(this).parents('.sectorpage-strengths').toggleClass('showLess');

        });
    }

    init = function() {
        if (_sectorPageStrengths.length > 0) {
            _checkElemnt();
            _bindShowMore(_sectorPageStrengths);
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
        tabcontent = $('.tab-content .tab-pane'),
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
        _addOptions;

    _addOptions = function() {
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');

            if (_urlType == "youtube") {

                _youTubeId = $(this).attr('data-videoid');

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

                var playerVMElement = document.createElement('div');
                playerVMElement.id = "vimeoPlayer";
                $(this).append(playerVMElement);

                var options = {
                  id: _vimeoId,
                  autoplay: true,
                  loop: true
                };

                var vimeoPlayer = new Vimeo.Player('vimeoPlayer', options);
                vimeoPlayer.setVolume(0);

            } else if (_urlType == "wistia") {

                _wistiaUrl = $(this).attr('data-videourl')
                _wistiaId = $(this).attr('data-videoid');

                var iframeWSElement = document.createElement('iframe');
                iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=0";
                $(this).append(iframeWSElement);

            }
            /*_urlSrc = $(this).attr('src');
            _urlSrcOptions = _urlSrc;

            if (_urlType == "youtube") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=1&controls=0&showinfo=0&enablejsapi=1";
            } else if (_urlType == "vimeo") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&loop=true&setVolume=0";
            } else if (_urlType == "wistia") {
                _urlSrcOptions = _urlSrc + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=0";
            }

            $(this).attr('src', _urlSrcOptions);*/
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
        console.log("Youtube player is ready");
        event.target.playVideo();
        event.target.setVolume(0);
    }

    init = function() {
        _addOptions();
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
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg .attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            videoImg.replaceWith(video);
            $(this).remove();
        });
    }

    _playFullVideoWrapper = function() {
        _videoFullWrapper.click(function() {

            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            $(this).replaceWith(video);
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
