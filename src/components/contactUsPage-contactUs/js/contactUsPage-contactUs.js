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
        // jQuery(Tabs[0]).addClass('active');
        // Tabs.on('click', function() {
        //     Tabs.removeClass('active');
        //     jQuery(this).addClass('active');
        //     var tabpane = jQuery(this).find('a').attr('href');
        //     tabcontent.removeClass('active');
        //     jQuery(tabpane).addClass('active');
        // })
        $('.contactUsPage-contactUs a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            localStorage.setItem('activeTab', $(e.target).attr('href'));
        });
        var activeTab = localStorage.getItem('activeTab');
        if (activeTab) {
            $('.contactUsPage-contactUs a[data-toggle="tab"]').removeClass('active');
            $('.contactUsPage-contactUs a[href="' + activeTab + '"]').tab('show').addClass('active');
        }else{
          $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navbars.init());
