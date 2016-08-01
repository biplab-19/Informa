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
    var init,LoadAdobeAnalytics , LoadGoogleAnalytics, Config;

    LoadAdobeAnalytics = function(c){
      var s=s_gi(c.AdobeUserKey);
      s.trackDownloadLinks=true
      s.trackExternalLinks=true
      s.trackInlineStats=true
      s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
      s.linkInternalFilters="javascript:" //optional: add your internal domain here
      s.linkLeaveQueryString=false
      s.linkTrackVars="None"
      s.linkTrackEvents="None"
      s.pageName=document.title
      s.server= window.location.host
      s.channel=c.Channel
      s.pageType="Main"
    },
    LoadGoogleAnalytics = function(key){
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', key]);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script'); 
        ga.type = 'text/javascript'; ga.async = true;
        ga.src = 'https://ssl.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(ga, s);
    },
    init = function() {
        Config = AnalyticsSettings;
        if(Config.GAEnabled){
            LoadGoogleAnalytics(Config.GAProfileKey);
        }
        if(Config.AdobeEnabled){
          LoadAdobeAnalytics(Config);
        }

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.Analytics.init());
