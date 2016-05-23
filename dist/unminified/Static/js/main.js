/*! 2016-05-23 */var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
	'use strict';
    INFORMA.getCookie =function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
     };

     INFORMA.Configs = (function () {
        function _config() {
            this.activeClass = 'informaui-active',
            this.views = {
                'small'  : 768,
                'medium' : 1024,
                'large'  : 1400
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
            this.init = function () {
                return this;
            };
        }
        return new _config();
     }());
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

var logThis = function(throwLog){
    if(INFORMA.Configs.debug){
        for(var i = 0 ; i < arguments.length; i++){
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
                    width: 38,
                    height: 38
                };

            this.Hide = function() {
                objectContainer.find('.load-spinner').fadeOut("fast");

            };

            this.Show = function(container) {
            	objectContainer = container;
                var IsSpinnerExist = objectContainer.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div><img src='/images/puff.svg' /></div>");
                    control.addClass("load-spinner").prependTo(objectContainer);
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                objectContainer.find(".load-spinner img").css({
                    left: ((control.width()) / 2),
                    top: "50%"
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));

var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
	'use strict';
	//variables
  INFORMA.Templates = {
    'articleListItems':
    '{{#each articleListItems}}'+
            '<li>'+
                '<p class="category">{{ContentType}}'+
                  '<strong>{{SectorType}}</strong>'+
                '</p>'+
                '<img src="{{Image}}" alt="{{ImageAltText}}" />'+
                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                '<p class="date">30.03.2016</p>'+
                '<div class="list-content">'+
                    '{{#if Description}}'+
                        '<p class="description">{{Description}}</p>'+
                        '<span class="article-info"><em>Author:</em> <strong>{{Profiles}}</strong></span>'+
                            '<span class="article-info"><em>Topic:</em>'+
                                '<strong>{{Topics}}</strong>'+
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
                '{{#if ResourceLink}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{ResourceLink.url}}" class="btn btn-default" target="{{ResourceLink.target}}">{{ResourceLink.linkText}}</a>'+
                    '</div>'+
                '{{/if}}'+
            '</li>'+
          '{{/each}}'
  }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

(function (INFORMA, $) {
     INFORMA.Utils = (function () {
        function _utils() {
            this.getIEVersion = function(){
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
                if( $('html').hasClass('lt-ie9') ) {
                    size = 'large';
                } else {
                    size = ( w <= INFORMA.Configs.views.xsmall )? 'xsmall' : size;
                    size = ( w >  INFORMA.Configs.views.xsmall && w <= INFORMA.Configs.views.small  )? 'small'  : size;
                    size = ( w >  INFORMA.Configs.views.small  )? 'medium' : size;
                    size = ( w >  INFORMA.Configs.views.medium )? 'large'  : size;
                    size = ( w >  INFORMA.Configs.views.large  )? 'xlarge' : size;
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
			this.init = function () {
				var that = this; //to behave proxy
				this.getViewport();
				//--------------------------------------------------
				// Add IE10 Class
				//--------------------------------------------------
				if(this.getIEVersion().major === '10') {
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
}(window.INFORMA = ( typeof INFORMA !== 'undefined' && INFORMA instanceof Object ) ? INFORMA : {}, $INFORMA));

var logThis = function(throwLog){
    if(INFORMA.Configs.debug){
        for(var i = 0 ; i < arguments.length; i++){
            console.log(arguments[i])
        }
    }
}
