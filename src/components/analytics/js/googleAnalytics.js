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
    bannerText = $('#banner').find("a");

    trackFormEvents = function(obj, action, label){
      if(typeof obj === 'object'){
        var dataModal,
          Parent,
          replaceValue,
          value,
          newReplaceValue,
          contactUsForm,
          singleStepRegistrationForm;
        if(action === 'Open'){
          dataModal = obj.data('modal');
          if(dataModal === '#Intelligence'){
            replaceValue = dataModal.replace(dataModal,'#formRequestADemo');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }else if(dataModal === '#Insight'){
            replaceValue = dataModal.replace(dataModal,'#formRequestATrial');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }else{
            replaceValue = dataModal.replace('#',''),
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1); 
          }  
        }
        else{
          Parent =  obj.parents('.modal');
          dataModal = Parent .attr('id');
          contactUsForm = obj.parents('.contactUsPage-contactUs');
          singleStepRegistrationForm = obj.parents('.registration-form-single-section');
          if(dataModal === 'Intelligence'){
            replaceValue = dataModal.replace(dataModal,'formRequestADemo');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(dataModal === 'Insight'){
            replaceValue = dataModal.replace(dataModal,'formRequestATrial');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(contactUsForm.length > 0){
             if(contactUsForm.find('.get-in-touch')){
                replaceValue = 'formHeaderGetInTouch';
                value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
             }
             else if(contactUsForm.find('.request-a-demo')){
                replaceValue = 'formRequestADemo';
                value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
             }
          }
          else if(singleStepRegistrationForm.length > 0){
              if(singleStepRegistrationForm.find('.register-myinterests-form')){
                replaceValue = 'formRegistration';
                value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
             }
          }
          else{
            value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
          }  
        }

        if(dataModal || contactUsForm){
          trackEvents('Form', action, value,1)
        }
      }
    }

    trackFormWithoutModal = function(obj, action, label){
        trackEvents('Form', action, obj.target.text.trim(), 1)
    }

    bannerText.click(function (event) {
        var text = $(this).text();
        if(text === 'Product login'){
           trackEvents('Form', 'Open', 'ProductLogin',1)
        }
    });

    $('body').on('click', '.register,.product-login', function(e) {
        if($(this).hasClass('EventRegister')){
           trackEvents('Form', 'Open', 'EventRegister',1)
        }
        else if($(this).hasClass('product-login')){
          trackEvents('Form', 'Open', 'ProductLogin',1)
        }
    })

    trackEvents = function( category, action, label,value){
      //check if ga is set (latest version)
      if (typeof ga !== 'undefined') {
        ga('send', {
          hitType: 'event',
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
          eventValue:value
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
