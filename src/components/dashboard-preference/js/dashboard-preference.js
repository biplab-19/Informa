/*
 * global-footer.js
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
        init, BindCheckboxes,ReadCookies,BakeCookies, CookieValue = {},Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    
    BakeCookies = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadCookies = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
    },

    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
            console.log(CurrentCheckBoxs);
            if($(this).prop("checked")===true){
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).trigger("click");
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).trigger("click");
                }); 
            }
            BakeCookies("PrefernceUpdated", true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
                var getCookie = ReadCookies("USR_DETAIL"),
                    CheckBoxVal = $(this).val(),
                    ExistingInterest = (getCookie!==null && getCookie.AreaOfInterest) ? getCookie.AreaOfInterest : [],
                    ParentEle = $(this).parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    UserInterest = [] , MergedJson; 

                if($(this).prop("checked")){
                    UserInterest.push(CheckBoxVal);
                    MergedJson = INFORMA.Utils.ArrayUnique(UserInterest.concat(ExistingInterest));
                }else{
                    var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                    MergedJson = INFORMA.Utils.RemoveArrayItem(tempArray,CheckBoxVal);
                    $(this).parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);

                }
                
                if(MergedJson && getCookie!==null){
                    getCookie.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", getCookie);
                }else{
                    CookieValue.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", CookieValue);
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
            BakeCookies("PrefernceUpdated", true);
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
/*
 * global-footer.js
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
        init, BindCheckboxes,ReadCookies,BakeCookies, CookieValue = {},Count=0,
    


    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    
    BakeCookies = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadCookies = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
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
                       $(this).trigger("click");
                       $(this).prop("checked",false);
                }); 
            }
            BakeCookies("PrefernceUpdated", true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
                var getCookie = ReadCookies("USR_DETAIL"),
                    CheckBoxVal = $(this).val(),
                    ExistingInterest = (getCookie!==null && getCookie.AreaOfInterest) ? getCookie.AreaOfInterest : [],
                    ParentEle = $(this).parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    UserInterest = [] , MergedJson; 

                if($(this).prop("checked")){
                    UserInterest.push(CheckBoxVal);
                    MergedJson = INFORMA.Utils.ArrayUnique(UserInterest.concat(ExistingInterest));
                }else{
                    var tempArray = (ExistingInterest.length) ? (ExistingInterest).split(','):[];
                    MergedJson = INFORMA.Utils.RemoveArrayItem(tempArray,CheckBoxVal);
                    $(this).parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);

                }
                
                if(MergedJson && getCookie!==null){
                    getCookie.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", getCookie);
                }else{
                    CookieValue.AreaOfInterest = MergedJson.join(',');
                    BakeCookies("USR_DETAIL", CookieValue);
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
            BakeCookies("PrefernceUpdated", true);
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
