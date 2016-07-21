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
INFORMA.pdpBrochure = (function(window, $, namespace) {
    'use strict';
    //variables
   var downloadBrochure = $('.pdp-brochure'),
       submitResponse = $('.submit-response'),
       _formSubmitStatus = $('.form-status[data-successsubmit=True]'),
    //methods
        init;

    init = function() {

      if(submitResponse.length > 0){
        window.open("https://www.agra-net.com/agra/foodnews/pdf-archive/market-reviews/article511004.ece/BINARY/FN-Juice-2016.pdf", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=100,width=1000,height=600");
      }

    }
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.pdpBrochure.init());
