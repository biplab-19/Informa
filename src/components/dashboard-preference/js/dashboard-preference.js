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
        init, BindCheckboxes,ReadPref,CreatePref, UpdatePref, PrefValue = {},Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    
    CreatePref = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
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
    UpdatePref = function(obj, isHeading, SelectedSector){
                var getCookie = ReadPref("USR_DETAIL"),
                    CheckBoxVal = obj.val(),
                    ExistingInterest = (getCookie!==null && getCookie.AreaOfInterest) ? getCookie.AreaOfInterest : [],
                    ParentEle = obj.parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    UserInterest = [] , MergedJson; 

                if(!isHeading){
                    if(obj.prop("checked")){
                        UserInterest.push(CheckBoxVal);
                        MergedJson = INFORMA.Utils.ArrayUnique(UserInterest.concat(ExistingInterest));
                    }else{
                        var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                        MergedJson = INFORMA.Utils.RemoveArrayItem(tempArray,CheckBoxVal);
                        obj.parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);

                    }
                }
                if(isHeading){
                    if(obj.prop("checked")){
                        MergedJson = INFORMA.Utils.ArrayUnique(SelectedSector.concat(ExistingInterest));
                    }else{
                        var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                        tempArray.remove(SelectedSector.join(','));
                        MergedJson = tempArray;
                    }
                }
                
                if(MergedJson && getCookie!==null){
                    getCookie.AreaOfInterest = MergedJson.join(',');
                    CreatePref("USR_DETAIL", getCookie.AreaOfInterest);
                }else{
                    PrefValue.AreaOfInterest = MergedJson.join(',');
                    CreatePref("USR_DETAIL", PrefValue.AreaOfInterest);
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
                CreatePref("PrefernceUpdated", true);
    },
    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input"),
                uniqueArray = [];
            if($(this).prop("checked")===true){
                var localArray = [];
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).prop("checked",true);
                       localArray.push($(this).val());
                    }
                }); 
                uniqueArray = localArray;
            } else{
                var localArray = [];
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).prop("checked",false);
                       localArray.push($(this).val());
                }); 
                uniqueArray = localArray;
            }
            UpdatePref($(this),true,uniqueArray);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            UpdatePref($(this),false,null)
        });
    },


    init = function() {
        if(PreferenceCheckbox.length){
            BindCheckboxes();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());
