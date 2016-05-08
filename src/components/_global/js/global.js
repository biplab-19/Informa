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
        _html = $('html');

    var init = function(){
        // viewport properties
        var _viewportWidth = $(window).width();
        if(_viewportWidth >= 1142){
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
    }

	return {
        init: init,
	device: device
	};
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.global.init());

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
