/*! 2016-05-31 */var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    var env = (window.location.href.indexOf("agrihub") > -1) ? "dev" : "local",
        endPoints;
    INFORMA.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };

    endPoints = {
        "local":{
            "GetArticles": "/data/article_list.json",
            "GetSubSectorList" : "/data/product-finder.json",
            "ProductSearch":"/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json"
        },
        "dev":{
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList" : "/client/search/GetSubSectors",
            "ProductSearch": "/client/search/getproducts",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json"
        }
    };

    INFORMA.Configs = (function() {
        function _config() {
                this.urls = {
                    "webservices": endPoints[env]
                },
                this.activeClass = 'informaui-active',
                this.views = {
                    'small': 768,
                    'medium': 1024,
                    'large': 1400
                },
                this.debug = true,
                this.isMobile = {
                    Android: (function() {
                        return navigator.userAgent.match(/Android/i);
                    })(),
                    BlackBerry: (function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    })(),
                    iOS: (function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    })(),
                    Opera: (function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    })(),
                    Windows: (function() {
                        return navigator.userAgent.match(/IEMobile/i);
                    })()
                },
                this.init = function() {
                    return this;
                };
        }
        return new _config();

    }());
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

var logThis = function(throwLog) {
    if (INFORMA.Configs.debug) {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
    }
}

(function(window, INFORMA, $, undefined) {
    INFORMA.DataLoader = (function() {

        var RunningCalls = {};

        function DATALOADER() {
            this.GetContentOnlyFromURL = function(url, content) {
                return $.ajax({
                    url: url,
                    dataType: "html",
                    cache: false
                });
            };


            this.GetServiceData = function(service, params) {
                var Settings = {},
                    Defaults = {
                        data: "",
                        cache: false,
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        headers: {}
                    };
                $.extend(Settings, Defaults, params);

                if (RunningCalls[service] && RunningCalls[service] !== null) {
                    RunningCalls[service].abort();
                }

                RunningCalls[service] = $.ajax({
                    type: Settings.method,
                    //url: INFORMA.config.webservices[service],
                    url:service,
                    data: Settings.data,
                    cache: Settings.cache,
                    contentType: Settings.contentType,  
                    dataType: Settings.dataType,
                    headers: Settings.headers,
                    success: function(msg) {

                        if (Settings.contentType.indexOf("xml") > -1) {
                            if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                                params.success_callback.call(this, msg);
                            }
                        } else {
                            var data = null;

                            if (msg!==null) { data = msg } else { data = false; }

                            if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                                params.success_callback.call(this, data);
                            }
                        }
                        RunningCalls[service] = null;
                        INFORMA.Spinner.Hide();

                    },
                    error: function(xhr, status, error) {
                        if (typeof params !== "undefined" && typeof params.error_callback === "function") {
                            params.error_callback.call(this, xhr, status, error);
                        }
                    }
                });

                return RunningCalls[service];
            };
        }
        return new DATALOADER();
    }());
}(window, INFORMA, jQuery));

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

(function ($) {
    'use strict';
	//==================================================
    // DOCUMENT READY & BootStraping init method for all modules loaded in the page...
    //--------------------------------------------------
    $(function () {
        var components, data, globalComponents = ['Configs', 'Utils'];
        for (components in globalComponents) {
            data = globalComponents[components];
            if (INFORMA[data]) {
                INFORMA[data].init();
            }
		}
		//Page Specific components
        for (components in INFORMA.initUI) {
            data = INFORMA.initUI[components];
            if (INFORMA[data]) {
                INFORMA[data].init(components);
            }
		}
    }());
    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}($INFORMA));

(function ($) {
    'use strict';
	//==================================================
    // DOCUMENT READY & BootStraping init method for all modules loaded in the page...
    //--------------------------------------------------
    $(function () {
        var components, data, globalComponents = ['Configs', 'Utils'];
        for (components in globalComponents) {
            data = globalComponents[components];
            if (INFORMA[data]) {
                INFORMA[data].init();
            }
		}
		//Page Specific components
        for (components in INFORMA.initUI) {
            data = INFORMA.initUI[components];
            if (INFORMA[data]) {
                INFORMA[data].init(components);
            }
		}
    }());
    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}($INFORMA));

(function(window, INFORMA, $, undefined) {

    INFORMA.Spinner = (function() {

        function SPINNER() {
            var spinner,
                rePosition = null,
                control,
                objectContainer,
                window = $(window),
                loader = {
                    width: 124,
                    height: 124
                };

            this.Hide = function() {
                if(typeof objectContainer ==="object"){
                    objectContainer.find('.load-spinner').fadeOut("fast");
                }
            };

            this.Show = function(container) {
            	objectContainer = container;
                var IsSpinnerExist = objectContainer.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div class='load-spinner'><span class='loading'><em>Loading...</em><img src='/Static/images/loader.svg' /></span></div>").hide();
                    control.prependTo(objectContainer);
                    control.fadeIn("slow");
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                objectContainer.find(".load-spinner .loading").css({
                    left: ((control.width()-loader.width-5) / 2),
                    top: ((control.height()-loader.height-15) / 2)
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));

/*
 * global.js
 *
 *
 * @project:   Informa
 * @date:      2016-April-25
 * @author:    Santosh
 * @licensor:  SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    //variables
  INFORMA.Templates = {
    'articleListItems':
    '{{#each Articles}}'+
            '<li>'+
                '<p class="category">{{ContentType.[0]}}'+
                  '<strong>{{SectorType}}</strong>'+
                '</p>'+
                '<img src="{{ContentType.[1]}}" alt="{{ContentType.[2]}}" />'+
                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                '<p class="date">{{PublicationDate}}</p>'+
                '<div class="list-content">'+
                    '{{#if Description}}'+
                        '<p class="description">{{Description}}</p>'+
                        '<span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span>'+
                            '<span class="article-info"><em>Topic:</em>'+
                                '<strong>{{Topic}}</strong>'+
                            '</span>'+
                    '{{/if}}'+
                    '{{#if Video}}'+
                        '<div class="video-container">'+
                            '<a href="{{Video.url}}" class="video-link">'+
                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                            '</a>'+
                            '<span class="play-icon"></span>'+
                        '</div>'+
                    '{{/if}}'+
                '</div>'+
                '{{#if Link}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a>'+
                    '</div>'+
                '{{/if}}'+
            '</li>'+
          '{{/each}}',
        'HeadlinesListItems':
            '{{#each Headlines}}'+
                '<li>'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '<div class="list-content">'+
                        '<h4 class="poduct-brand-subheading">{{Title}}</h4>'+
                    '</div>'+
                    '<div class="link">'+
                        '<a role="button" href="{{Link.Url}}" title="External Link" target="{{Link.Target}}">'+
                        '<span class="icon-external-link">{{Link.LinkText}}</span></a>'+
                    '</div>'+
                '</li>'+
            '{{/each}}',
        'SubSectorList':
            '{{#each SubSectors}}'+
                '<option value="{{SubSectorID}}">{{SubSectorName}}</option>'+
            '{{/each}}',
        'RefineResult' :
            '{{#each results}}'+
                '<div class="col-xs-12 col-sm-6 col-md-4">'+
                    '<p><strong>{{RefineText}}</strong></p>'+
                    '<ul>'+
                        '{{#each Items}}'+
                        '<li>'+
                            '<span class="custom-checkbox">'+
                                '<label class="label" for="{{Key}}">'+
                                  '<input type="checkbox" value="{{Value}}" id="{{Key}}" name="{{Key}}" />'+
                                  '<span>{{Key}}</span>'+
                                '</label>'+
                            '</span>'+
                        '</li>'+
                        '{{/each}}'+
                    '</ul>'+
                '</div>'+
            '{{/each}}',
        'ProductFilters':
        '{{#each results}}'+
                '<li>{{Key}}<a href="#" class="remove" data-name="{{Value}}">x</a></li>'+
        '{{/each}}',
        'Products' :
                '{{#each results}}'+
                '<div class="col-xs-12 col-sm-6 col-md-4 search-tile">'+
                    '<div class="tile un-pinned">'+
                        '<div class="front">'+
                            '<div class="pin"></div>'+
                            '<div class="header">'+
                                '<img src="{{Image}}" alt="{{ImageAlt}}" />'+
                            '</div>'+
                            '<div class="content">'+
                                '<h2>{{Title}}</h2>'+
                                '<p>{{Description}}</p>'+
                                '<ul class="gray-bullets">'+
                                    '{{#each SubSectors}}'+
                                        '<li>{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                            '</div>'+
                        '</div>'+
                        '<div class="back">'+
                            '<div class="header">'+
                                '<div class="header-content">'+
                                    '<div class="pin"></div>'+
                                    '<h4>{{Title}}</h4>'+
                                '</div>'+
                            '</div>'+
                            '<div class="content">'+
                                '<ul>'+
                                    '{{#each Benefits}}'+
                                        '<li><a href="#">{{this}}</a></li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                                '<div class="footer-content clearfix">'+
                                    '<div class="col-xs-6">'+
                                        '<a href="{{FreeTrialLink}}" class="btn btn-default free-trial">Free Trial</a>'+
                                    '</div>'+
                                    '<div class="col-xs-6">'+
                                        '<a href="{{FreeTrialLink}}" class="btn btn-default orange more">More</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+  
                '{{/each}}',
    'Resources':
            '<ul class="list-container">'+
            '{{#each results}}'+
                '<li class="col-xs-12 col-sm-6 col-md-4">'+
                    '<p class="category">{{ContentType.[0]}}'+
                      '<strong>{{SectorType}}</strong>'+
                    '</p>'+
                    '<img src="{{ContentType.[1]}}" alt="{{ContentType.[2]}}" />'+
                    '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '<div class="list-content">'+
                        '{{#if Description}}'+
                            '<p class="description">{{Description}}</p>'+
                            '<span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span>'+
                                '<span class="article-info"><em>Topic:</em>'+
                                    '<strong>{{Topic}}</strong>'+
                                '</span>'+
                        '{{/if}}'+
                        '{{#if Video}}'+
                            '<div class="video-container">'+
                                '<a href="{{Video.url}}" class="video-link">'+
                                    '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                                '</a>'+
                                '<span class="play-icon"></span>'+
                            '</div>'+
                        '{{/if}}'+
                    '</div>'+
                    '{{#if Link}}'+
                        '<div class="btn-container">'+
                          '<a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a>'+
                        '</div>'+
                    '{{/if}}'+
                '</li>'+
            '{{/each}}'+
        '</ul>',
        'AnalystList': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container">'+
                        '<div class="meet-anlyst-section">'+
                            '<div class="anlyst-heading">'+
                                '<div class="analyst-heading-content">'+
                                    '<div class="analyst-details">'+
                                        '<h2>{{Name}}</h2>'+
                                        '<h3>{{analystdesc}}</h3>'+
                                        '<p class="location">{{location}}</p>'+
                                    '</div>'+
                                    '<div class="analyst-img">'+
                                        '<img src="{{image}}" alt="{{image}}" />'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="analyst-description">'+
                                '<p class="heading">{{question}}</p>'+
                                '<ul class="yellow-bullets">'+
                                    '{{#each MultipleProducts}}'+
                                        '<li>{{name}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                                '<p class="heading">{{experience}}</p>'+
                                '<ul class="track-analyst clearfix">'+
                                    '{{#each products}}'+
                                        '<li><a href="#">{{name}}</a></li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="analyst-footer">'+
                                '<div class="analyst-footer-content clearfix">'+
                                    '<ul class="nav-links">'+
                                        '<li><a href="#" class="icon-twitter"></a></li>'+
                                        '<li><a href="#" class="icon-linked-in"></a></li>'+
                                        '<li><a href="#" class="icon-facebook"></a></li>'+
                                    '</ul>'+
                                    '<a href="#" class="btn btn-default pull-right">Full Profile</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
}
}(this, jQuery, 'INFORMA'));

(function(INFORMA, $) {
    INFORMA.Utils = (function() {
        function _utils() {

                DoFlip = function(obj,className) {
                    var Container = obj.parents('.tile');
                    if (Container.hasClass('un-pinned')) {
                        if(className==="flip"){
                            Container.addClass('flip');
                        }else{
                            Container.removeClass('flip');
                        }
                    }
                },
                this.flipTile = function(Object) {
                    var TileFront = Object.find('.front .header'),
                        TileBack = Object.find('.back'),
                        CompleteTile = Object.find('.front .header, .back'),
                        Pins = Object.find('.pin');

                    if (INFORMA.global.device.viewportN === 0) {
                        TileFront.mouseenter(function() {
                            DoFlip($(this), 'flip');
                        });

                        TileBack.mouseleave(function() {
                            DoFlip($(this),'unflip');
                        });
                    } else {
                        CompleteTile.hover(function() {
                            DoFlip($(this),'flip');
                        }, function() {
                            DoFlip($(this),'unflip');
                        });
                    }
                    Pins.click(function() {
                        jQuery(this).parents('.tile').toggleClass('un-pinned');
                    })
                },
                this.getUniqueArray = function(arrayList) {
                    var uniqueArray = [];
                    $.each(arrayList, function(i, el) {
                        if ($.inArray(el, uniqueArray) === -1) {
                            uniqueArray.push(el);
                        }
                    });
                    return uniqueArray;
                }
            this.serializeObject = function(array) {
                var o = {},
                    a = array;
                $.each(a, function() {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            }
            this.getIEVersion = function() {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return { major: matches[1], minor: matches[2] };
                }
                return { major: '-1', minor: '-1' };
            }
            this.getViewport = function() {
                    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                    var size;
                    if ($('html').hasClass('lt-ie9')) {
                        size = 'large';
                    } else {
                        size = (w <= INFORMA.Configs.views.xsmall) ? 'xsmall' : size;
                        size = (w > INFORMA.Configs.views.xsmall && w <= INFORMA.Configs.views.small) ? 'small' : size;
                        size = (w > INFORMA.Configs.views.small) ? 'medium' : size;
                        size = (w > INFORMA.Configs.views.medium) ? 'large' : size;
                        size = (w > INFORMA.Configs.views.large) ? 'xlarge' : size;
                    }

                    INFORMA.Configs.viewport = {
                        size: size,
                        width: w,
                        height: h
                    };

                    return INFORMA.Configs.viewport;
                },
                this.isMobileView = function() {
                    return (this.getViewport().size == 'small' || this.getViewport().size == 'xsmall');
                },
                this.isTabletView = function() {
                    return (this.getViewport().size == 'medium');
                };
            this.init = function() {
                var that = this; //to behave proxy
                this.getViewport();
                //--------------------------------------------------
                // Add IE10 Class
                //--------------------------------------------------
                if (this.getIEVersion().major === '10') {
                    $('html').addClass('ie10');
                }
                //--------------------------------------------------
                //--------------------------------------------------
                // RESIZE EVENT
                // Fires "windowResize" on $(window)
                //Custom resize on particular breakpoints
                //--------------------------------------------------
                return this;
            };
        }
        return new _utils();
    }());
}(window.INFORMA = (typeof INFORMA !== 'undefined' && INFORMA instanceof Object) ? INFORMA : {}, $INFORMA));

var logThis = function(throwLog) {
    if (INFORMA.Configs.debug) {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
    }
}
