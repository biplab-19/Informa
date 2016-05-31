/*! 2016-05-31 */_adjustHeigt = function(){
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
INFORMA.AnalystSearch = (function(window, $, namespace) {
    'use strict';
    //variables
    var AnalystSearch = $('.analyst-search'),
    	Sector = AnalystSearch.find('.sector select'),
    	SubSector = AnalystSearch.find('.sub-sector'),
    	submitBtn = AnalystSearch.find('.submit-btn'),
    	txtField = AnalystSearch.find('#name'),
    	Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
    init, GetAjaxData, RenderSearchResult;

    txtField.on('keyup', function() {
    	var calcLength = jQuery(this).val().length;

    	if(calcLength > 3) {
    		submitBtn.removeClass('disabled');
    	} else {
    		submitBtn.addClass('disabled');
    	}
    })

    Sector.chosen().on('change', function() {
    	var _value = jQuery(this).val();
    	if(_value === 'All') {
    		SubSector.addClass('disabled');
    			submitBtn.addClass('disabled');
    	} else {
    		SubSector.removeClass('disabled');
    		submitBtn.removeClass('disabled');
    	}
    })

    submitBtn.on('click', function() {
        var FieldArray = AnalystSearch.find("form").serializeArray(),
            GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
        INFORMA.Spinner.Show($("body"));
    	GetAjaxData(Urls[AnalystSearch], "Get", GetSerializeData, RenderSearchResult, null);
    })

    RenderSearchResult = function(data) {
        debugger;
        INFORMA.SearchResults.RenderSearchResults(data);
    }

    GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
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

    init = function() {
        //alert('hi');
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
        Templates = INFORMA.Templates,
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
                        RenderCarousel(html, _ArticleLists);
                    }
                    if (data.Articles !== undefined && data.Headlines.length > 0) {
                        var html = GetCarouselUpdatedHtml(INFORMA.Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        RenderCarousel(html, _HeadlinesLists);
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
        _bindShowMore;

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
            _bindShowMore(_brandList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());

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
INFORMA.formComponents = (function(window, $, namespace) {
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
            $("#Sapient_API_Test_Form").validate(

              
            );
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
    var _mainNavigation = $('#mainNavigation'),
      _navHeight = _mainNavigation.height(),
      _headerPos = 0,
      _fixed = 'navbar-fixed-top',
      _isHeaderFixed = false,
      // for sticky nav of pdp-navigation
      _pdpNavigation = $('#pdp-navigation'),
      _pdpNavigationHeight = 0,
      _pdpNavigationPos = 0,
      _pdpWrapper = $('.product-detail-page'),
      _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
      _pdpMenuActive = true,
      // for scrolling purpose
      _pdpLink = $('#pdp-navigation ul > li > a'),
      _pdpFixed = false,
      _pdpMenuPos = [],
      _pdpMenuWidth = [],
      _pdpMenuleft = [],

      _arrayFlag = true,

      //functions
      init,
      _whenScrolling,
      _activateMainFixedHeader,
      //for sticky nav
      _initPdpMenuBarFollow,
      _activatePdpFixedHeader,
      _pdpNavigationScrollTo;


      // if header or pdp is present then only we calc the values.
      // so that even if the elements are not present, the calc will happen

      if(_pdpNavigation.length > 0) {
            _pdpNavigationHeight = _pdpNavigation.height(),
            _pdpNavigationPos = _pdpNavigation.offset().top;
            // To show the menu follower with right width and position, todo: remove harcode
            _pdpMenuFollower.css('width',$(_pdpLink[0]).width())
                           .css('left',$(_pdpLink[0]).offset().left)
                           .show(); 
      }
      if(_mainNavigation.length > 0) {
            _navHeight = _mainNavigation.height();
            _headerPos = _mainNavigation.offset().top;
      }

      // both pdp nav and main nav handled here

      _whenScrolling = function(){
         $(window).on('scroll',function(){
               // little savings here, the first function will not be executed when pdp nav is sticky
             if(!_pdpFixed && _mainNavigation.length >0 && !INFORMA.global.device.isMobile) _activateMainFixedHeader();
             if(_pdpNavigation.length > 0 && _pdpMenuActive) _activatePdpFixedHeader();
         });
      };

      _activateMainFixedHeader = function(){
          var _windowPos = $(window).scrollTop();
            if(_windowPos > _headerPos){
                  _mainNavigation.addClass(_fixed);
                  $('body').css('padding-top',_navHeight);
                  //console.log('main');
            }
            else {
                  _mainNavigation.removeClass(_fixed);
                  $('body').css('padding-top',0);
            }
      };

      _initPdpMenuBarFollow = function(){
            for(var i=0;i<_pdpLink.length;i++){
                  // id name comes as data attribute. construct the id
                  var _sectionName = '#'+$(_pdpLink[i]).data('target');
                  //console.log($(_sectionName))
                  if($(_sectionName).length > 0){
                        // all sections will be printed in navbar html, if the section
                        // is not there, smack that
                        // else push the offset value to array
                        //_pdpMenuPos.push($(_sectionName).offset().top);
                  }
                  else {
                        $(_pdpLink[i]).addClass('JustGonnaStayThereAndWatchMeBurn');
                  }
            }
            $('.JustGonnaStayThereAndWatchMeBurn').parent().remove();
            _pdpLink = $('#pdp-navigation ul > li > a');
            //console.log(_pdpMenuPos);
            // todo: not a right place to add,so.. you know what to do
            if(_pdpLink.length == 0) {
                  _pdpNavigation.remove();
                  _pdpMenuActive = false;

                  // if there are pdp components, the li count will be 0
                  // if the li count is zero, then remove the whole nav
            }

      };

      _activatePdpFixedHeader = function(){
             var _windowPos = $(window).scrollTop();
               if(_windowPos > (_pdpNavigationPos - _navHeight)){
                     _pdpNavigation.addClass(_fixed);
                     _pdpNavigation.css('top',_navHeight+'px');
                    _pdpWrapper.css('padding-top',_pdpNavigationHeight);
                     _pdpFixed = true;
                     if(_arrayFlag){
                           for(var i=0;i<_pdpLink.length;i++){
                                 var _sectionName = '#'+$(_pdpLink[i]).data('target');
                                 _pdpMenuPos.push($(_sectionName).offset().top);
                                 _pdpMenuWidth.push($(_pdpLink[i]).width());
                                 _pdpMenuleft.push($(_pdpLink[i]).parent().offset().left);
                           }

                           // Ilaiyaraja rocks, fix the hard code later
                           $('#pdp-navigation ul > li:first-child').addClass('selected');
                           if(INFORMA.global.device.isMobile) _pdpNavigation.addClass('cont');
                           _arrayFlag = false;
                     }

               }
               else {
                     _pdpNavigation.removeClass(_fixed);
                     _pdpWrapper.css('padding-top',0);
                     _pdpFixed = false;
               }
               // todo: should be moved to function, atleast for readability
               // line follower robot is something i shud ve built during my college days.
               var i= _pdpMenuPos.length - 1;
               for(; i>=0;i--){
                     if( _windowPos + 120 >= _pdpMenuPos[i]  ){
                           _pdpMenuFollower.css('width',_pdpMenuWidth[i]);
                           _pdpMenuFollower.css('left',_pdpMenuleft[i]);
                              // .menuFollower { transform: translateX(100%)}
                           i=-1;
                     }
               }
            // todo: easily the worst code I have written, please optimize this
      };
      // when clicking the pdp-navigation
      _pdpNavigationScrollTo = function(){
            _pdpLink.on('click',function(e){
                  e.preventDefault();
                  _pdpNavigation.addClass('cont');
                  var _target = $(this).data('target');
                  // todo, remove hardcoding
                  $('#pdp-navigation li').removeClass('selected');
                  $('html, body').stop().animate({
                        scrollTop: $("#"+_target).offset().top - (_navHeight + _pdpNavigationHeight)
                  }, 1000);

                  if(INFORMA.global.device.isMobile) {
                        // lesson learnt, hack is wrong.
                        $(this).parent().addClass('selected');
                        setTimeout(function(){
                              // i am sorry future Jack
                              $('#pdp-navigation li:not(".selected")').slideUp();
                              _pdpNavigation.addClass('cont');
                        },100)

                  }
            })
      };

      init = function() {
            //if(INFORMA.global.device.viewport!='mobile'){
                  if(_pdpNavigation.length > 0){
                        _initPdpMenuBarFollow();
                        _pdpNavigationScrollTo();
                  }
                  _whenScrolling();
            //}

            // hack for mobile viewport
            // most stupid hack ever, use bootstrap collapse
            // bootstrap collapse will disturb the offset().top, be careful
            //@eod, I think u r genius but code is so damned, clean it before review
            if(INFORMA.global.device.isMobile){
                  $('#pdp-navigation ul').on('click',function(){
                        //todo stop hardcoding
                        $('#pdp-navigation li:not(".selected")').slideDown();
                        _pdpNavigation.removeClass('cont');
                  });
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
        _videoElem.parent().html('<iframe width="100%" height="100%" src="'+videoUrl+'" allowfullscreen volume="0"></iframe>');
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
            _dots = Boolean(container.data('pagination'));
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
           _infinite = true;

     //chk for sitecore preview
      if(INFORMA.global.siteCore.isPreview) {
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
           dots: true
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
        SubmitBtn = $(".product-finder li.button"),
        CustomSelect = $(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchIcon = $(".navbar-default .search a"),
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
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
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
        SubmitHandler = function(SearchType) {
            SubmitBtn.on("click", ".btn", function(e) {
                e.preventDefault();
                var FieldArray = ProductFinderSection.find("form").serializeArray(),
                    GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
                INFORMA.Spinner.Show($("body"));
                GetAjaxData(Urls[SearchType], "Get", GetSerializeData, RenderSearchResult, null, SearchType);
            });
        },
        BindAjaxHandler = function() {

            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (SearchPage.data("search") === true) ? true : false;

            if (IsProductPage) {
                SubmitHandler("ProductSearch");
            }
            if (IsSearchPage) {
                SubmitHandler("SearchResult");
            }
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
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());

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
        // methods
        init,
        CreateFilterList;

        CreateFilterList = function(DataObject) {
            if (Object.keys(DataObject).length) {
                var ListTemplate = Handlebars.compile(Templates.ProductFilters),
                    SectorHtml, SubSectorHtml,
                    FilterCont = $(".search-filter .filter-list");

                if (DataObject.Sectors) {
                    SectorHtml = ListTemplate({ results: DataObject.Sectors });
                    FilterCont.find(".sector ul").empty().html(SectorHtml);
                }
                if (DataObject.SubSectors) {
                    SubSectorHtml = ListTemplate({ results: DataObject.SubSectors });
                    FilterCont.find(".subsector ul").empty().html(SubSectorHtml);
                }
                $(".search-filter").delay(600).slideDown();
            }
        },

    init = function() {};
    return {
        init: init,
        CreateFilterList:CreateFilterList
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
INFORMA.SearchRefineResult = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        // methods
        init,
        CreateRefineList, BindRefineEvents;

        BindRefineEvents = function(html) {
            var RefineContainer = $(".search-container .refine-result"),
                RefineCloseBtn = $(".refine-result .close-filter");

            if (RefineContainer.length) {
                RefineContainer
                    .empty()
                    .html(html);
                RefineContainer.parents(".refine-list").delay(1000).slideDown();
            }

            RefineCloseBtn.off("click").on("click", function(e) {
                e.preventDefault();
                RefineContainer.slideUp();
            });

            $(".refine-list").off("click").on("click", "a.refine", function(e) {
                e.preventDefault();
                RefineContainer.slideToggle();
                RefineCloseBtn.show();
            });
        },
        CreateRefineList = function(DataObject) {
            if (Object.keys(DataObject).length) {
                var ListTemplate = Handlebars.compile(Templates.RefineResult),
                    html = ListTemplate({ results: DataObject.RefineResult });
                    BindRefineEvents(html);
            }

        },

    init = function() {};
    return {
        init: init,
        CreateRefineList:CreateRefineList
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchRefineResult.init());

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
    //variables
    var Templates = INFORMA.Templates,
        ResultContainer = $(".search-container #results"),
        ResultCount, ResultInner,
        // methods
        init,
        equalHeight, UpdateHtmlView, ParseSearchData, BindTileEvents, CreateSearchResult;

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
        CreateSearchResult = function(DataObject) {
            for (var key in DataObject) {
                if (DataObject.hasOwnProperty(key)) {
                    var ResultName = key,
                        html = "",
                        Data = DataObject[key],
                        TemplateName = (Templates[ResultName] !== "undefined") ? Templates[ResultName] : "",
                        ListTemplate = Handlebars.compile(TemplateName),
                        ContainerID ="#"+(ResultName).toLowerCase();
                    
                    html = ListTemplate({ results: Data });

                    //Update Search Results
                    $(ContainerID).find(".row").empty().html(html);

                    //Update Record Counts
                    $(ContainerID).find(".count strong").empty().text(Data.length);
                }
            }
            var UpddateHeight = setTimeout(function() {
                clearTimeout(UpddateHeight);
                UpdateHtmlView();
            }, 500);
        },
        BindTileEvents = function() {
            INFORMA.Utils.flipTile(ResultInner);
        },
        UpdateHtmlView = function() {
            if (ResultContainer.length) {
                ResultContainer
                    .hide()
                    .fadeIn(1000);
                ResultInner = $(".search-results");
                ResultInner.each(function() {
                    equalHeight($(this));
                });
                BindTileEvents();
            }
        },
        ParseSearchData = function(data) {
            if (Object.keys(data).length) {
                var Results = (data.Results !== undefined) ? data.Results : false,
                    Refine = (data.RefineResult !== undefined) ? data.RefineResult : false,
                    ProductFilters = (data.ProductFilters !== undefined) ? data.ProductFilters : false;
                if (ProductFilters) {
                    INFORMA.SearchResultFilter.CreateFilterList(ProductFilters);
                }
                if (Refine) {
                    var Data = { "RefineResult": Refine };
                    INFORMA.SearchRefineResult.CreateRefineList(Data);
                }
                if (Results) {
                    CreateSearchResult(Results);
                }
            }
        };

    //Resize
    // $(window).resize(function() {
    //     if (SearchResults.length > 0) {
    //         equalHeight(SearchResults);
    //     }
    // });

    init = function() {};
    return {
        init: init,
        RenderSearchResults: ParseSearchData
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
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
            }
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
 * feature-list.js
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
    // methods
        init,
        _bindShowMore,
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(2n+2)').toggle();
              $(this).parents('.sectorpage-strengths').toggleClass('showLess');
            }
        });
    }

    init = function() {
              if (_sectorPageStrengths.length > 0) {
            _bindShowMore(_sectorPageStrengths);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());

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
            arrows: false,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: true
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
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
