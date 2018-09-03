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
        productSearchCTA = $('button[data-submit="sector-search"]'),
        resourceProductSearchCTA = $('.resource-sector-search button[data-submit="sector-search"]'),
        getProductSearchParams, getResourceResultParams, productSearchString, newSearch = false, sectorCookie, subSectorCookie,
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
            var Data = {},
                ParamData = [];

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
                            parameters.push(parameter.replace(/&/g, 'and'));
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

            if (SearchType === "SearchResult") {
                if (newURL)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText + "&" + newURL;
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText;

                window.history.pushState({ path: urlpath }, '', urlpath);
            } else if (SearchType === "ProductSearch") {
                var cookieParams = [];
                if (newSearch)
                    cookieParams = getProductSearchParams();
                else {
                    if (sectorCookie)
                        cookieParams.push(sectorCookie);
                    if (subSectorCookie)
                        cookieParams.push(subSectorCookie);
                }
                if (newURL && cookieParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + cookieParams.join("&") + '&' + newURL;
                else if (newURL && cookieParams.length == 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newURL;
                else if (!newURL && cookieParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + cookieParams.join("&");
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?PageRequest=' + productSearchString;

                window.history.pushState({ path: urlpath }, '', urlpath);
            } else if (SearchType === "ResourceResult") {
                var resourceSearchParams = getResourceResultParams();
                if (newURL && resourceSearchParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + resourceSearchParams.join("&") + "&" + newURL;
                else if (newURL && resourceSearchParams.length == 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newURL;
                else if (!newURL && resourceSearchParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + resourceSearchParams.join("&");
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.pushState({ path: urlpath }, '', urlpath);

            }

        },

        getProductSearchParams = function () {
            var parameter, cookieParams = [];
            if ($('#SectorNames').val()) {
                parameter = $("#SectorNames").val().trim().replace(/ /g, '-').toLowerCase();
                cookieParams.push("Sector=" + parameter.replace(/&/g, '%26'));
                productSearchString = "Sector"
            }
            if ($('#SubSectorNames').val() && ($('#SubSector2').parent().find("button").attr("title") != "Please Select")) {
                parameter = $("#SubSectorNames").val().trim().replace(/ /g, '-').toLowerCase();
                cookieParams.push("subsector=" + parameter.replace(/&/g, '%26'));
                productSearchString = "subsector"
            }
            return cookieParams;
        },

        getResourceResultParams = function () {
            var resourceSearchParams = [], SubSectorNames = [], SectorNames = [];
            $("#Sector :selected").map(function (i, el) {
                SectorNames.push($(el).text().trim().replace(/ /g, '-').toLowerCase().replace(/&/g, '%26'));
            });
            $("#sub-sector-list :selected").map(function (i, el) {
                SubSectorNames.push($(el).text().trim().replace(/ /g, '-').toLowerCase().replace(/&/g, '%26'));
            });
            if (SectorNames.length != 0) {
                resourceSearchParams.push("Sector=" + SectorNames.toString())
            }
            if (SubSectorNames.length != 0) {
                resourceSearchParams.push("subsector=" + SubSectorNames.toString())
            }

            return resourceSearchParams;
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
                productSearchCTA.on("click", function () {
                    newSearch = true;
                    ClearAllLink.click();
                    var urlpath, cookieParams = getProductSearchParams();
                    if(cookieParams.length==0){
                        newSearch = false;
                        if (sectorCookie)
                            cookieParams.push(sectorCookie);
                        if (subSectorCookie)
                            cookieParams.push(subSectorCookie);
                    }
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+cookieParams.join("&");
                    window.history.pushState({ path: urlpath }, '', urlpath);
                });

            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
                siteSearch.on("click", function () {
                    ClearAllLink.click();
                });
            }

            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
                resourceProductSearchCTA.on("click", function () {
                    newSearch = true;
                    ClearAllLink.click();
                    var urlpath, cookieParams = getResourceResultParams();
                    if(cookieParams.length==0){
                        newSearch = false;
                        if (sectorCookie)
                            cookieParams.push(sectorCookie);
                        if (subSectorCookie)
                            cookieParams.push(subSectorCookie);
                    }
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + cookieParams.join("&");
                    window.history.pushState({ path: urlpath }, '', urlpath);
                });

            }
            if (IsSearchPage || IsProductPage || IsResourcePage) {
                var QueryString, selectedFilterOptions, filterOptionsList, facets, newFacets, filterOptions, groupid, searchQueryStrings, subQuery, siteUrl = window.location.href;
                QueryString = siteUrl.split("?");
                if (QueryString[1]) {
                    searchQueryStrings = QueryString[1].split("&");
                    if (searchQueryStrings) {
                        if (searchQueryStrings[0] && (searchQueryStrings[0].split("=")[0] == "Sector" || searchQueryStrings[0].split("=")[0] == "sector")) {
                            sectorCookie = searchQueryStrings[0];
                        }
                        if (searchQueryStrings[1] && (searchQueryStrings[1].split("=")[0] == "subsector" || searchQueryStrings[1].split("=")[0] == "subSector")) {
                            subSectorCookie = searchQueryStrings[1];
                        }
                    }
                    $.each(searchQueryStrings, function () {
                        if (this) {
                            subQuery = this.split("=");
                            groupid = subQuery[0];
                            facets = subQuery[1].split(",");
                            newFacets = [];
                            $.each(facets, function () {
                                newFacets.push(this.replace(/-/g, " ").replace(/%26/g, "&"));
                            });

                            filterOptionsList = $("#" + groupid).find("input[type='checkbox']");
                            filterOptions = $("#" + groupid).find("input[type='checkbox']").not(":disabled");
                            filterOptionsList.filter(function () {
                                if (newFacets.includes($(this).next().text().toLowerCase())) {
                                    $(this).prop("checked", true);
                                }
                            });
                            selectedFilterOptions = $("#" + groupid.cap).find("input:checked").not(":disabled");
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

            $(document).on('change', '.custom-multiselect input', function () {
                var SubSectorNames = [], SectorNames = [];
                $("#Sector2 :selected").map(function (i, el) {
                    SectorNames.push($(el).text());
                });
                $("#SubSector2 :selected").map(function (i, el) {
                    SubSectorNames.push($(el).text());
                });
                $("#SectorNames").val(SectorNames.toString());
                $("#SubSectorNames").val(SubSectorNames.toString());
            });
        };
    return {
        init: init,
        GetRefineData: GetSelectedFilter,
        BindRefineEvents: BindRefineEvents

    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
