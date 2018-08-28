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
INFORMA.SearchResultFilter = (function (window, $, namespace) {
    'use strict';
    //variables
    var Urls = INFORMA.Configs.urls.webservices,
        SelectAll = $(".refine-container .panel-heading .custom-checkbox input"),
        RefineSection = $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        CheckedRefineCheckBox = $(".refine-container .panel-body .custom-checkbox input:checked"),
        ClearAllLink,
        ProductFinderSection = $('#product-finder-section'),
        SearchType = '',
        newURL,
        siteSearch = $('button[data-submit="site-search"]'),
        // methods
        init, SelectAllCheckBox, BindRefineEvents, ClearAllLinkBinding, DoRefine, RefineSearchResult, GetAjaxData, GetSelectedFilter;

    GetAjaxData = function (url, method, data, SCallback, Errcallback) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: SCallback,
            error_callback: Errcallback
        });
        INFORMA.SearchResults.ResetPaging();
    },
        GetSelectedFilter = function () {
            var Data = {};
            var ParamData = [];
            if (RefineSection) {
                $.each(RefineSection, function () {
                    var GetSectionID = $(this).parent().attr("id"),
                        SelectedCheckBox = $(this).find("input[type=checkbox]:checked").not(":disabled"),
                        uniqueArr = [],
                        parameters = [],
                        parameter;

                    if (SelectedCheckBox.length) {
                        $.each(SelectedCheckBox, function () {
                            uniqueArr.push($(this).attr("value"));
                            parameter = $(this).next().text().replace(/ /g, '-').toLowerCase();
                            parameters.push(parameter.replace(/&/g,'%26'));
                            Data[GetSectionID] = uniqueArr;
                        });
                        if (parameters.length > 0) {
                            ParamData.push(GetSectionID + "=" + parameters.toString());
                        }
                    }
                });
                newURL = ParamData.join("&");
                if (Data.Brand === undefined) {
                    Data.Brand = ($('input[name="Brand"]')) ? $('input[name="Brand"]').val() : null
                } else {
                    Data.Brand.push($('input[name="Brand"]').val());
                }
                return Data;
            }
        },
        DoRefine = function () {
            var ProductData, searchText, urlpath;
            if (SearchType === "ResourceResult") {
                ProductData = INFORMA.ResourceFilter.GetResourceData();
            } else {
                ProductData = INFORMA.ProductFinder.GetProductData();
            }
            var FilterData = GetSelectedFilter(),
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
            if (Data.SearchText) {
                searchText = Data.SearchText;
            }
            GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null);
            if (newURL)
                urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText + "&" + newURL;
            else
                urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText;

            window.history.pushState({ path: urlpath }, '', urlpath);

        },
        SelectAllCheckBox = function () {

            SelectAll.on("click", function (e) {
                var ParentEle = $(this).parents(".panel").eq(0).find(".panel-body"),
                    CurrentCheckBoxs = ParentEle.find('input[type="checkbox"]').not(":disabled"),
                    CurrentShowMoreLink = ParentEle.find("a.show-more");

                if ($(this).prop("checked") === true) {
                    jQuery.each(CurrentCheckBoxs, function () {
                        $(this).prop("checked", "checked");
                        $(this).attr("checked", "checked");
                    });
                } else {
                    jQuery.each(CurrentCheckBoxs, function () {
                        $(this).removeAttr("checked", false);
                        $(this).removeProp("checked", false);
                    });
                }
                if (CurrentShowMoreLink) {
                    CurrentShowMoreLink.trigger("click");
                }
                var IsAnyCheckBoxChecked = $(".refine-container .panel-body input[type=checkbox]:checked"),
                    isLinkFilterExist = jQuery(".search-container .items-found li").size();
                if (IsAnyCheckBoxChecked.length > 0 || isLinkFilterExist === 1) {
                    ClearAllLink.addClass("noOpaque");
                } else {
                    ClearAllLink.removeClass("noOpaque");
                }
                DoRefine();
            });
            SelectAll.on("focus", function (e) {
                $(this).parents('span').eq(0).addClass("active");
            });
            SelectAll.on("focusout", function (e) {
                $(this).parents('span').eq(0).removeClass("active");
            });
        },
        ClearAllLinkBinding = function (obj) {
            obj.on("click", function (e) {
                e.preventDefault();
                var AllCheckBox = $(".refine-container .custom-checkbox input"),
                    UnfilterCheckbox = ($(".UnFilterCheckbox").length > 0) ? $(".UnFilterCheckbox").val() : "";
                if ($('#hdnSearchType').length > 0) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                $(this).removeClass("noOpaque");
                $.each(AllCheckBox, function () {
                    $(this).prop("checked", false);
                });
                if (UnfilterCheckbox.length > 0) {
                    $(".refine-container .custom-checkbox input#" + UnfilterCheckbox).prop("checked", true);
                }
                DoRefine();
            });

        },
        BindRefineEvents = function () {
            $.each(RefineSection, function () {
                var DefaultCount = ($(this).attr("data-defaultcount") !== null) ? $(this).attr("data-defaultcount") : 5,
                    SectionCheckBox = $(this).find(".custom-checkbox input"),
                    CurrentList = $(this).find("ul li"),
                    CheckBoxCount = SectionCheckBox.length,
                    ShowMoreLink = $(this).find("a.show-more");

                if (CheckBoxCount > DefaultCount) {
                    ShowMoreLink.addClass("show");
                    $.each(CurrentList, function (i) {
                        var currentIndex = i + 1;
                        if (currentIndex > DefaultCount) {
                            $(this).addClass("hidden");
                        }
                    });
                }
            });
            var RefineCheckBoxes = $(".refine-container .panel-body .custom-checkbox input");
            RefineCheckBoxes.on("click", function () {
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox = ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if (SelectedCheckBox && SelectedCheckBox.length === InputCount.length) {
                    CurrentSelectAllCheckBox.prop("checked", true);
                } else {
                    CurrentSelectAllCheckBox.prop("checked", false);
                }
                var IsAnyCheckBoxChecked = $(".refine-container .panel-body input[type=checkbox]:checked"),
                    isLinkFilterExist = jQuery(".search-container .items-found li").size();
                if (IsAnyCheckBoxChecked.length > 0 || isLinkFilterExist === 1) {
                    ClearAllLink.addClass("noOpaque");
                } else {
                    ClearAllLink.removeClass("noOpaque");
                }
                DoRefine();
            });
            //Accsisbility fix for custom
            RefineCheckBoxes.on("focus", function () {
                $(this).parents('li').eq(0).addClass("active");
            });
            RefineCheckBoxes.on("focusout", function () {
                $(this).parents('li').eq(0).removeClass("active");
            });


            ShowMoreLinks.on("click", function (e) {
                e.preventDefault();
                var text, defaultCount, listItem;
                if ($(this).hasClass("SeeLess") !== true) {
                    text = $(this).data("lesstext");
                    $(this).parent().find("ul li").removeClass("hidden");
                    $(this).addClass("SeeLess");
                    $(this).text(text);
                } else {
                    text = $(this).data("moretext"),
                        defaultCount = $(this).parent().data('defaultcount'),
                        listItem = $(this).parent().find("li");
                    $(this).removeClass("SeeLess");
                    $(this).text(text);
                    listItem.addClass("hidden");

                    $.each(listItem, function (i) {
                        var Index = i + 1;
                        if (Index <= defaultCount) {
                            $(this).removeClass("hidden");
                        }
                    });
                }

            });
            ClearAllLinkBinding(ClearAllLink);
        },
        init = function () {
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
            if (IsSearchPage) {
                var QueryString, selectedFilterOptions, facets, newFacets, filterOptions, groupid, searchQueryStrings, subQuery, siteUrl = window.location.href;
                QueryString = siteUrl.split("?");
                if (QueryString[1]) {
                    searchQueryStrings = QueryString[1].split("&");
                    $.each(searchQueryStrings, function () {
                        if (this) {
                            subQuery = this.split("=");
                            groupid = subQuery[0];
                            facets = subQuery[1].split(",");
                            newFacets = [];
                            $.each(facets, function () {
                                newFacets.push(this.replace(/-/g, " ").replace(/%26/g,"&"));
                            });

                            filterOptions = $("#" + groupid).find("input[type='checkbox']").not(":disabled");
                            filterOptions.filter(function () {
                                if (newFacets.includes($(this).next().text().toLowerCase())) {
                                    $(this).prop("checked", true);
                                }
                            });
                            selectedFilterOptions = $("#" + groupid).find("input:checked").not(":disabled");
                            if (filterOptions.length == selectedFilterOptions.length) {
                                $("#" + groupid + "1").prop("checked", true);
                            }
                        }
                    });

                }
            }
            if (CheckedRefineCheckBox.length > 0) {
                //DoRefine();
            }
            if (SelectAll && RefineCheckBox) {
                var ViewPort = INFORMA.global.device.viewportN;

                if (ViewPort === 1 || ViewPort === 2) {
                    var AllRefineText = $(".refine-container").find("p.heading"),
                        ClearAll = $(".refine-container").find("a.clear-all"),
                        ClearHtml = $('<div class="clear-mobile"><a href="#" class="clear-all">' + ClearAll.html() + '</a></div>');

                    $("body").find(".refine-container").after(ClearHtml);

                    // By default on mobile and tabet refine need to close
                    AllRefineText.addClass("heading-collapsed");
                    $("#refine-list").hide();

                    if (AllRefineText.hasClass("heading-collapsed") !== true) {
                        ClearHtml.show();
                    };

                    AllRefineText.off().on("click", function () {
                        var RefineContent = $(this).parent().find("#refine-list");
                        if ($(this).hasClass("heading-collapsed") !== true) {
                            RefineContent.slideUp("slow");
                            $(this).addClass("heading-collapsed");
                            ClearHtml.hide();
                        } else {
                            RefineContent.slideDown("slow");
                            $(this).removeClass("heading-collapsed");
                            ClearHtml.show();
                        }
                    });
                    $(".refine-container").addClass("showRefine");
                }
                ClearAllLink = $(".product-finder-results a.clear-all");
                SelectAllCheckBox();
                BindRefineEvents();
                var ClearMobileLink = $("body").find(".clear-mobile a");
                if (ClearMobileLink) {
                    ClearAllLinkBinding(ClearMobileLink);
                }
            }
            siteSearch.on("click", function(){
                ClearAllLink.click();
            });

        };
    return {
        init: init,
        GetRefineData: GetSelectedFilter,
        BindRefineEvents: BindRefineEvents

    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
