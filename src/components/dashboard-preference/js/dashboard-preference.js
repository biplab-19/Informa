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
        var date = new Date() ,expires ,cookie ;
            date.setTime(date.getTime()+(365*24*60*60*1000)); 
            expires = "; expires="+date.toGMTString(); 
            cookie = name+'='+JSON.stringify(value)+expires+'; path=/';
         document.cookie = cookie;
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
                       $(this).trigger("click");
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).trigger("click");
                }); 
            }
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
            
        });
    },


    init = function() {

        //CookieValue.AreaOfInterest = "{635F6C24-872F-4FF4-80E0-8BECBA5FC89A},{164C3D41-2D5D-4D46-8747-524EB407DF80},{D235FBF1-DE60-412C-96C7-83AAAA4841DA},{E8FE3971-4219-43A8-8A84-E4CFCB92516B},{EA816F9D-B585-4761-A808-44DF11B80C0E}";
        if(PreferenceCheckbox.length){
            BindCheckboxes();
        }
        //BakeCookies("USR_DETAIL", CookieValue);
        //console.log(CookieValue);
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());
