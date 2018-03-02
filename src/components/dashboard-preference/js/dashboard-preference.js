/*
 * Dashboard.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.PreferenceTab = (function(window, $, namespace) {
    'use strict';
    //variables
    var PreferenceCheckbox = $(".preference .panel-body li .custom-checkbox"),
         CheckBoxes = $(".preference .panel-body .custom-checkbox input"),
         SelectAll = $(".preference .panel-heading .custom-checkbox input"),
        init, BindCheckboxes, CheckParentSectorCheckBox, ReadPref,CreatePref, UpdatePref, Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    CheckParentSectorCheckBox = function() {
        $('.preference .panel-body').each(function() {
            var Items = $(this).find('input[type="checkbox"]').length,
                CheckedItems = $(this).find('input[type="checkbox"]:checked').length;
                
            if(Items > 0) {
                if(Items == CheckedItems) {
                    $(this).parents('.panel').find('.panel-heading').find('input[type="checkbox"]').attr('checked', 'checked');
                }
            }
        })
    },
    CreatePref = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/UpdateCookieAreaOfInterest", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadPref = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
    },
    UpdatePref = function(obj, isHeading){
                var ParentEle = obj.parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    CurrentCheckBoxs = ParentEle.find(".panel-body input[type=checkbox]"),
                    AllCheckBoxs = $(".preference .panel-body").find("input[type=checkbox]:checked"),
                    UserInterest = []; 

                if(!isHeading){
                    if(!obj.prop("checked")){
                          obj.parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);
                    }
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
                jQuery.each(AllCheckBoxs, function(e){
                    if($(this).prop("checked")===true){
                       UserInterest.push($(this).val());
                    }
                }); 
                if(!UserInterest){
                    UserInterest = null;
                }else{
                    UserInterest = UserInterest.join(",");
                }
                if(SelectedCount.length===CurrentCheckBoxs.length){
                    obj.parents(".panel").eq(0).find(".panel-heading input").prop("checked",true);
                }
                CreatePref("USR_DETAIL", UserInterest);
    },
    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
            if($(this).prop("checked")===true){
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).prop("checked",true);
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).prop("checked",false);
                }); 
            }
            UpdatePref($(this),true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            UpdatePref($(this),false);
        });
    },


    init = function() {
        if(PreferenceCheckbox.length){
            BindCheckboxes();
            CheckParentSectorCheckBox();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());
