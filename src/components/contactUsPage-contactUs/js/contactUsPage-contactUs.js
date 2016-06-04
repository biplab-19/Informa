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
    var Tabs = $('ul.nav li'),
        init;
    init = function() {

        Tabs.on('click', function() {
            Tabs.removeClass('active');
            jQuery(this).addClass('active');
        })
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navbars.init());
