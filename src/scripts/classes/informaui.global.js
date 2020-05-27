var INFORMA = window.INFORMA || {};
INFORMA.global = (function(window, $, namespace) {
	'use strict';
	//variables
	var device = {},
		siteCore = {},
		_html = $('html'),
		getInternetExplorerVersion = function() {
			var rv = -1;
			if (navigator.appName == 'Microsoft Internet Explorer') {
			  var ua = navigator.userAgent;
			  var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
			  if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
			} else if (navigator.appName == 'Netscape') {
			  var ua = navigator.userAgent;
			  var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
			  if (re.exec(ua) != null)
				rv = parseFloat( RegExp.$1 );
			}
			return rv;
		}

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
	if (getInternetExplorerVersion() > 0) {
		window.URLSearchParams = window.URLSearchParams || function (searchString) {
			var self = this;
			self.searchString = searchString;
			self.get = function (name) {
				var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
				if (results == null) {
					return null;
				}
				else {
					return decodeURI(results[1]) || 0;
				}
			};
		}
	}

	return {
		init: init,
		device: device,
		siteCore: siteCore
	};
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.global.init());