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
        jQuery(Tabs[0]).addClass('active');
        Tabs.on('click', function() {
            Tabs.removeClass('active');
            jQuery(this).addClass('active');
            var tabpane = jQuery(this).find('a').attr('href');
            tabcontent.removeClass('active');
            jQuery(tabpane).addClass('active');
        })
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navbars.init());
