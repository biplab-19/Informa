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

INFORMA.Analytics = (function(window, $, namespace) {
    'use strict';
    var init,LoadAdobeAnalytics , LoadGoogleAnalytics;

    LoadAdobeAnalytics = function(){
      var s=s_gi("informashopwindowpharmadev");
      s.trackDownloadLinks=true
      s.trackExternalLinks=true
      s.trackInlineStats=true
      s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
      s.linkInternalFilters="javascript:" //optional: add your internal domain here
      s.linkLeaveQueryString=false
      s.linkTrackVars="None"
      s.linkTrackEvents="None"
      s.pageName="Test"
      s.server= window.location.host
      s.channel="Agri"
      s.pageType="Main"
    },
    LoadGoogleAnalytics = function(){
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-81001424-2']);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    },
    init = function() {
        LoadAdobeAnalytics();
        LoadGoogleAnalytics();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.Analytics.init());
