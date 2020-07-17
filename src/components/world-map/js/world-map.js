var INFORMA = window.INFORMA || {};
INFORMA.WorldMap= (function(window, $, namespace) {
    'use strict';
      var  init,_closeTip;
      
        _closeTip = function(){
           $('#closetip').on('click', function(){
		            $('.tool').remove();
		        });
        }


    init = function() {
        _closeTip();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.WorldMap.init());
