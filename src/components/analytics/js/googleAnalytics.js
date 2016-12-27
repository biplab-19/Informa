/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-Dec-26
 * @author:     Nupur Goyal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.Analytics = (function(window, $, namespace) {
    'use strict';
    //variables
    var trackFormEvents;
    
    trackFormEvents = function( category, action, label){
      //check if _gaq is set too
      if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackEvent', category, action, label]);
      }
    }
    return {
        trackFormEvents: trackFormEvents
    };
}(this, jQuery, 'INFORMA'));
