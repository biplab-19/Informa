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
        RefineSection= $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        ClearAllLink = $(".refine-container a.clear-all"),
        ProductFinderSection = $('#product-finder-section'),
        SearchType='',

        // methods
        init, SelectAllCheckBox , BindRefineEvents, DoRefine, RefineSearchResult ,GetAjaxData,GetSelectedFilter;

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
       DoRefine = function(){
         var ProductData = INFORMA.ProductFinder.GetProductData(),
            FilterData = INFORMA.SearchResultFilter.GetRefineData(),
            Data = JSON.stringify(INFORMA.ProductFinder.MergeData(ProductData,FilterData));
                
            GetAjaxData(Urls[SearchType], "Get", Data,INFORMA.SearchResults.RenderSearchResults, null);
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
                DoRefine();
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
            var RefineCheckBoxes = $(".refine-container .panel-body .custom-checkbox input");
            RefineCheckBoxes.on("click", function(){
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox  =ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if(SelectedCheckBox && SelectedCheckBox.length === InputCount.length){
                    CurrentSelectAllCheckBox.prop("checked",true);
                }else{
                    CurrentSelectAllCheckBox.prop("checked",false);
                }
                DoRefine();
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
                DoRefine();
            });

        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }

            if(SelectAll && RefineCheckBox){
                SelectAllCheckBox();
                BindRefineEvents();
            }
        };
    return {
        init: init,
        GetRefineData:GetSelectedFilter,
        BindRefineEvents:BindRefineEvents

    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
