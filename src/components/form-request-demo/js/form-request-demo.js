/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.formRequestForDemo = (function(window, $, namespace) {
    'use strict';
     var _toolTip = $('.hasToolTip .icon.icon-info'),

//functions
     init,
      _bindToolTip,
        _showOverlay;

    _showOverlay = function(container){

      //alert(1);
    }

    init = function() {
          //todo: No null check, dont execute these bindings if forms are not there

            _showOverlay();
            _bindToolTip();

    };

    _bindToolTip = function(){
          _toolTip.on('click',function(){
                $(this).toggleClass('active');
                $(this).parent().parent() // .hasToolTip
                        .children('.tooltip-placeholder').slideToggle();
          })
   }


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formRequestForDemo.init());
