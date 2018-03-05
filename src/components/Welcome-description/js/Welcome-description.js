
/*
 * welcome-description
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.welcome_description= (function(window, $, namespace) {
    'use strict';
    //variables
    var _welcomedescription = $('.welcome-description'),
        // _tooltip = _welcomedescription.find('.anonymous,.registered'),
    // methods
        init,
        _closeTip = function(){
          var closetip = $('#closetip');
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
jQuery(INFORMA.welcome_description.init());
