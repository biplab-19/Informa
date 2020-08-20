/*
 * google-analytics.js
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
    bannerText = $('#banner').find("a.subscribe-stick");

    trackFormEvents = function(obj, action, label){
      if(typeof obj === 'object'){
        var dataModal,
          Parent,
          replaceValue,
          value,
          newReplaceValue,
          contactUsForm = obj.parents('.contactUsPage-contactUs'),
          singleStepRegistrationForm = obj.parents('.registration-form-single-section');
        if(action === 'Open'){
          dataModal = obj.data('modal');
          if(dataModal === '#Intelligence'){
            replaceValue = dataModal.replace(dataModal,'#formRequestADemo');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }
          else if(dataModal === '#Insight'){
            replaceValue = dataModal.replace(dataModal,'#formRequestATrial');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }
          else if(contactUsForm.length > 0){
            value = trackFormWithoutModal(contactUsForm);
          }
          else{
            replaceValue = dataModal.replace('#',''),
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1); 
          }  
        }
        else{
          Parent =  obj.parents('.modal.in form');
          dataModal = Parent.data('formcapture');
          if(dataModal === 'Intelligence'){
            replaceValue = dataModal.replace(dataModal,'formRequestADemo');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(dataModal === 'Insight'){
            replaceValue = dataModal.replace(dataModal,'formRequestATrial');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(contactUsForm.length > 0){
            value = trackFormWithoutModal(contactUsForm);
          }
          else if(singleStepRegistrationForm.length > 0){
            dataModal = singleStepRegistrationForm.find('.form-inline-container form').data('formcapture');
            value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
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

    trackFormWithoutModal = function(contactUsForm){
      var dataModal = contactUsForm.find('.tab-pane.active').find('.form-inline-container form').data('formcapture');
      if(dataModal){
        var value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
      }
      return value;
    }

 

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

    bannerText.click(function (event) {
      var input = $(this).text();
      var output = input.replace(/\w+/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      }).replace(/\s/g, '');
      trackEvents('Form', 'Open', output,1)
    });

    jQuery(document).on("click",".trigger-sc-event",function(){ 
        var goalid = $(this).data("goal-id");
        if (goalid) {

            $.ajax({
                url: '/client/ajax/triggerpageevent',
                dataType: 'json',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify({ "eventId": goalid }),
                processData: false,
                success: function (data, textStatus, jQxhr) {
                    console.log(JSON.stringify(data));
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    });

    $('body').on('click', '.register,.product-login', function(e) {
      if($(this).hasClass('register')){
         trackEvents('Form', 'Open', 'EventRegister',1)
      }
      else if($(this).hasClass('product-login')){
        trackEvents('Form', 'Open', 'ProductLogin',1)
      }
    })
    return {
        trackFormEvents: trackFormEvents,
        trackEvents: trackEvents
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.Analytics);

