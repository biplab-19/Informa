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
    var trackFormEvents,
    trackEvents,
    trackFormWithoutModal,
    url;

    trackFormEvents = function(obj, action, label, url){
      url = window.location.href;
      if(typeof obj === 'object'){
        var dataModal,
          Parent;
        if(action === 'Open'){
          dataModal = obj.data('modal');
          var replaceValue = dataModal.replace('#',''),
              value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
        }
        else{
          Parent =  obj.parents('.modal');
          dataModal = Parent .attr('id');
          var value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
        }

        if(dataModal){
          trackEvents('Form', action, value, url)
        }
      }
    }

    trackFormWithoutModal = function(obj, action, label, url){
        url = window.location.href;
        trackEvents('Form', action, obj.target.text, url)
    }

    $('body').on('click', '.register,.product-login', function(e) {
        url = window.location.href;
        if($(this).hasClass('EventRegister')){
           trackEvents('Form', 'Open', 'EventRegister', url)
        }
        else if($(this).hasClass('product-login')){
          trackEvents('Form', 'Open', 'ProductLogin', url)
        }
    })

    trackEvents = function( category, action, label, url){
      //check if ga is set (latest version)
      if (typeof ga !== 'undefined') {
        ga('send', {
          hitType: 'event',
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
          eventValue: url
        });
      }

      //check if _gaq is set (legacy version)
      if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackEvent', category, action, label]);
      }
     
    }
    return {
        trackFormEvents: trackFormEvents,
        trackFormWithoutModal: trackFormWithoutModal
    };
}(this, jQuery, 'INFORMA'));
