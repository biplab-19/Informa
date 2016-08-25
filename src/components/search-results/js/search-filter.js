/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResultFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SelectAll = $(".refine-container .panel-heading .custom-checkbox input"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        RefineSection= $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        ClearAllLink = $(".refine-container a.clear-all"),

        // methods
        init, SelectAllCheckBox , BindRefineEvents, RefineSearchResult ,GetAjaxData,GetSelectedFilter;

        GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: SCallback,
                error_callback: Errcallback
            });
        },
        GetSelectedFilter = function(){
            var Data = {};
            if(RefineSection){
                $.each(RefineSection, function(){
                    var GetSectionID = $(this).parent().attr("id"),
                        SelectedCheckBox = $(this).find("input[type=checkbox]:checked"),
                        uniqueArr = [];

                    $.each(SelectedCheckBox, function(){
                        uniqueArr.push($(this).attr("value"));
                        Data[GetSectionID] = uniqueArr;
                    });
                });
                return Data;
            }
       },
        SelectAllCheckBox = function(){

            SelectAll.on("click",function(e){
                var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
                if($(this).prop("checked")===true){
                    jQuery.each(CurrentCheckBoxs, function(){
                        $(this).prop("checked","checked");
                    }); 
                } else{
                    jQuery.each(CurrentCheckBoxs, function(){
                        $(this).prop("checked",false);
                    }); 
                }
            });
        },
        BindRefineEvents = function(){
            $.each(RefineSection, function(){
                var DefaultCount= ($(this).data("defaultcount")!==null)? $(this).data("defaultcount"):5,
                    SectionCheckBox = $(this).find(".custom-checkbox input"),
                    CheckBoxCount = SectionCheckBox.length,
                    ShowMoreLink = $(this).find("a.show-more");

                    if(CheckBoxCount>DefaultCount){
                        ShowMoreLink.addClass("show");
                        $(this).find("ul").addClass("show-less");
                    }
            });

            RefineCheckBox.on("click", function(){
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox  =ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if(SelectedCheckBox && SelectedCheckBox.length === InputCount.length){
                    CurrentSelectAllCheckBox.prop("checked",true);
                }else{
                    CurrentSelectAllCheckBox.prop("checked",false);
                }
                GetAjaxData(Urls["ProductSearch"], "Get", JSON.stringify(Data),ParseSearchData, null);
            });

            ShowMoreLinks.on("click", function(e){
                e.preventDefault();
                $(this).parent().find("ul").removeClass("show-less");
                $(this).removeClass("show");
            });

            ClearAllLink.on("click", function(e){
                e.preventDefault();
                var AllCheckBox = $(".refine-container .custom-checkbox input");
                $.each(AllCheckBox, function(){
                    $(this).prop("checked",false);
                });
                
            });

        },
        init = function() {
            if(SelectAll && RefineCheckBox){
                SelectAllCheckBox();
                BindRefineEvents();
            }
        };
    return {
        init: init,
        GetRefineData:GetSelectedFilter

    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
