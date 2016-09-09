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
        RefineSection = $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        ClearAllLink = $(".refine-container a.clear-all"),
        ProductFinderSection = $('#product-finder-section'),
        SearchType = '',

        // methods
        init, SelectAllCheckBox, BindRefineEvents, ClearAllLinkBinding, DoRefine, RefineSearchResult, GetAjaxData, GetSelectedFilter;

    GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: SCallback,
                error_callback: Errcallback
            });
            INFORMA.SearchResults.ResetPaging();
        },
        GetSelectedFilter = function() {
            var Data = {};
            if (RefineSection) {
                $.each(RefineSection, function() {
                    var GetSectionID = $(this).parent().attr("id"),
                        SelectedCheckBox = $(this).find("input[type=checkbox]:checked").not(":disabled"),
                        EnabledCheckBox = $(this).find('input[type="checkbox"]').not(":disabled"),
                        uniqueArr = [];

                    if (SelectedCheckBox.length) {
                        $.each(SelectedCheckBox, function() {
                            uniqueArr.push($(this).attr("value"));
                            Data[GetSectionID] = uniqueArr;
                        });
                    } else {
                        //Specific To Resource Listing Page
                        if (GetSectionID && (SearchType === "ResourceResult")) {
                            if (GetSectionID.toLowerCase() === "contenttype") {
                                if (!SelectedCheckBox.length) {
                                    var UArray = [];
                                    $.each(EnabledCheckBox, function() {
                                        UArray.push($(this).attr("value"));
                                        Data[GetSectionID] = UArray;
                                    });
                                }
                            }
                        }
                    }

                });
                return Data;
            }
        },
        DoRefine = function() {
            var ProductData = INFORMA.ProductFinder.GetProductData(),
                FilterData = GetSelectedFilter(),
                DefaultData = INFORMA.SearchResults.DefaultParameters(),
                Data = INFORMA.ProductFinder.MergeData(ProductData, FilterData, DefaultData);

            Data.PageNo = 1;
            if (SearchType === "ResourceResult") {
                Data.IsResourceListing = true;
            }
            if (SearchType === "SearchResult") {
                Data.IsSearch = true;
            }
            if (SearchType === "ProductSearch") {
                Data.IsProduct = true;
            }
            GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null);
        },
        SelectAllCheckBox = function() {

            SelectAll.on("click", function(e) {
                var ParentEle = $(this).parents(".panel").eq(0).find(".panel-body"),
                    CurrentCheckBoxs = ParentEle.find('input[type="checkbox"]').not(":disabled"),
                    CurrentShowMoreLink = ParentEle.find("a.show-more");

                if ($(this).prop("checked") === true) {
                    jQuery.each(CurrentCheckBoxs, function() {
                        $(this).prop("checked", "checked");
                        $(this).attr("checked", "checked");
                    });
                } else {
                    jQuery.each(CurrentCheckBoxs, function() {
                        $(this).removeAttr("checked", false);
                        $(this).removeProp("checked", false);
                    });
                }
                if (CurrentShowMoreLink) {
                    CurrentShowMoreLink.trigger("click");
                }
                DoRefine();
            });
        },
        ClearAllLinkBinding = function(obj){
            obj.on("click", function(e) {
                e.preventDefault();
                var AllCheckBox = $(".refine-container .custom-checkbox input");
                if($('#hdnSearchType').length > 0) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                $.each(AllCheckBox, function() {
                    $(this).prop("checked", false);
                });
                DoRefine();
            });

        },
        BindRefineEvents = function() {
            $.each(RefineSection, function() {
                var DefaultCount = ($(this).attr("data-defaultcount") !== null) ? $(this).attr("data-defaultcount") : 5,
                    SectionCheckBox = $(this).find(".custom-checkbox input"),
                    CurrentList = $(this).find("ul li"),
                    CheckBoxCount = SectionCheckBox.length,
                    ShowMoreLink = $(this).find("a.show-more");

                if (CheckBoxCount > DefaultCount) {
                    ShowMoreLink.addClass("show");
                    $.each(CurrentList, function(i) {
                        var currentIndex = i + 1;
                        if (currentIndex > DefaultCount) {
                            $(this).addClass("hidden");
                        }
                    });
                }
            });
            var RefineCheckBoxes = $(".refine-container .panel-body .custom-checkbox input");
            RefineCheckBoxes.on("click", function() {
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox = ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if (SelectedCheckBox && SelectedCheckBox.length === InputCount.length) {
                    CurrentSelectAllCheckBox.prop("checked", true);
                } else {
                    CurrentSelectAllCheckBox.prop("checked", false);
                }
                DoRefine();
            });

            ShowMoreLinks.on("click", function(e) {
                e.preventDefault();
                $(this).parent().find("ul li").removeClass("hidden");
                $(this).removeClass("show");
            });
            ClearAllLinkBinding(ClearAllLink);
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }

            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
            }

            if (SelectAll && RefineCheckBox) {
                var ViewPort = INFORMA.global.device.viewportN;

                if(ViewPort===1|| ViewPort===2){
                    var AllRefineText = $(".refine-container").find("p.heading"),
                        ClearAll = $(".refine-container").find("a.clear-all"),
                        ClearHtml = $('<div class="clear-mobile"><a href="#" class="clear-all">'+ClearAll.html()+'</a></div>');

                    $("body").find(".refine-container").after(ClearHtml);
                    if(AllRefineText.hasClass("heading-collapsed")!==true){
                        ClearHtml.show();
                    };

                    AllRefineText.off().on("click", function(){
                        var RefineContent = $(this).parent().find("#refine-list");
                        if($(this).hasClass("heading-collapsed")!==true){
                            RefineContent.slideUp("slow");
                             $(this).addClass("heading-collapsed");
                             ClearHtml.hide();
                        }else{
                             RefineContent.slideDown("slow");
                            $(this).removeClass("heading-collapsed");
                            ClearHtml.show();
                        }
                    });
                }
                SelectAllCheckBox();
                BindRefineEvents();
                var ClearMobileLink = $("body").find(".refine-container clear-mobile a");
                if(ClearMobileLink){
                    ClearAllLinkBinding(ClearMobileLink);
                }
            }
        };
    return {
        init: init,
        GetRefineData: GetSelectedFilter,
        BindRefineEvents: BindRefineEvents

    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
