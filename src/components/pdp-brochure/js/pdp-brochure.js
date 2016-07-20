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
    var section = $('.pdp-brochure'),
        anchorParent = section.find('brochure-btn'),
        anchor = section.find('cta1'),
        _formSubmitStatus = $('.form-status[data-successsubmit=True]'),
    // methods
        init,
        _pdpBrochure,
        _showResponse;

        _showResponse = function() {
            if (_formSubmitStatus.length > 0) {
                var formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                var url = $('.form-submit-border').attr("");
                if (formSubmitResponseModal.length > 0) {
                    formSubmitResponseModal.find('.page-header').addClass('hide');
                    formSubmitResponseModal.modal({
                        show: true,
                        keyboard: false,
                        backdrop: "static"
                    })
                    window.open("url", "_blank");
                }
                var formSubmitResponseHTML = _formSubmitStatus.parents('form:first');
                if (formSubmitResponseHTML.length > 0) {
                    formSubmitResponseHTML.find('.page-header').addClass('hide');
                }
            }
        }
//     $(document).ready(function(){
//     $("button").click(function(){
//         var x = $("form").serializeArray();
//         $.each(x, function(i, field){
//             $("#results").append(field.name + ":" + field.value + " ");
//         });
//     });
// });
init = function() {
    _showResponse();
};
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());
