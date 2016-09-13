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
          var hash = document.location.hash, prefix = "tab_";
          if (hash) {
              $('.contactUsPage-contactUs .nav-tabs a[href="'+hash.replace(prefix,"")+'"]').tab('show').addClass('active');
          }else{
              $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
          }
          $('.contactUsPage-contactUs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
              window.location.hash = e.target.hash.replace("#", "#" + prefix);
          });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navbars.init());
