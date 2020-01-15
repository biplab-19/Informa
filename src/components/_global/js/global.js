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
INFORMA.global = (function (window, $, namespace) {
    'use strict';
    //variables
    var device = {},
        siteCore = {},
        _html = $('html');


    var init = function () {
        // viewport properties
        var _viewportWidth = $(window).width();
        if (_viewportWidth > 1024) {
            device.isDesktop = true;
            device.viewport = 'desktop';
            device.viewportN = 0;
        }
        else if (_viewportWidth >= 768) {
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
        if ($('html').hasClass('preview-mode')) {
            siteCore.isPreview = true;
        }
        else if ($('html').hasClass('experience-mode')) {
            siteCore.isExperience = true;
        }

        //Creating session cookies to maintain referral 
        $(document).ready(function () {
            var docCookies = document.cookie;
            var docCookiesArray = docCookies.split(';');
            var hasDocReferrerCookie = docCookiesArray.filter(function (item) {
                return item.trim().indexOf('document-referrer=') == 0
            }).length;
            if (!hasDocReferrerCookie) {
                var docReferrer = document.referrer;
                var docReferrerValue = window.location.hostname;
                if (docReferrer) {
                    var referrerUrl = new URL(docReferrer);
                    docReferrerValue = referrerUrl.hostname;
                }
                document.cookie = 'document-referrer=' + docReferrerValue;
            }
        });
    }

    return {
        init: init,
        device: device,
        siteCore: siteCore
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.global.init());
