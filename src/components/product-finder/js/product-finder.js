/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
        SubSectorList = $(".sector-search .sub-sector-list"),
        SubmitBtn = $(".product-finder li.button"),
        CustomSelect = $(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchIcon = $(".navbar-default .search a"),
        ResultContainer = $(".product-finder-results"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,

        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSeach,
        ToggleProductFinder, RenderProductSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler;

    ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
                ProductFinderSection.slideDown("slow");
            });
        },
        UpdateSubSectorDropdown = function(data) {
            if (data.SubSectors.length > 0) {
                var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                    html = ListTemplate({ SubSectors: data.SubSectors });


                $(".sector-search li").removeClass("disabled");
                SubSectorList.removeAttr("disabled")
                    .removeProp("disabled")
                    .html(html);
                SubSectorList.multiselect('rebuild');
            }
        },
        RenderProductSearchResult = function(data) {
            if (data.results && data.results.length > 0) {
                var ListTemplate = Handlebars.compile(Templates.ProductListingSearch),
                    html = ListTemplate({ results: data.results });
                    if(ResultContainer.length){
                        ResultContainer.find(".row")
                            .hide()
                            .empty()
                            .html(html)
                            .fadeIn(1000);
                    }
            }
        },
        GetAjaxData = function(url, method, data, success_callback, error_callback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function(data) {
                    if (typeof success_callback === "function") {
                        success_callback.call(this, data);
                    }
                },
                error_callback: function() {
                    if (typeof error_callback === "function") {
                        error_callback.call(this, data);
                    }
                }
            });
        },
        SubmitHandler = function() {

            if (ProductFinderSection.data("product") === true) {
                SubmitBtn.on("click", "a", function(e) {
                    e.preventDefault();
                    var fieldArray = ProductFinderSection.find("form").serializeArray(),
                        getSerilizeData = INFORMA.Utils.serializeObject(fieldArray);
                    INFORMA.Spinner.Show($("body"));
                    GetAjaxData(Urls.ProductSearch, "Get", getSerilizeData, RenderProductSearchResult, null);
                });
            }
        },
        ShowHideSeach = function(ele) {
            var ShowOption = $(ele).data('show');
            $("ul.searchToggle").addClass('hidden');
            ProductFinderSection.find("ul." + ShowOption).removeClass("hidden").fadeIn("slow");
        },
        ToggleSearchOption = function() {
            ToggleProductFinder();
            jQuery(".search-options input[type=radio]").on('change', function(e) {
                e.preventDefault();
                ShowHideSeach($(this));
            });
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSeach(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {

            var SectorData = {};
            SectorData.SectorIDs = INFORMA.Utils.getUniqueArray(arrayList);
            GetAjaxData(Urls.GetSubSectorList, "Get", SectorData, UpdateSubSectorDropdown, null);
        },
        BindDropDown = function() {
            var SectorList = [];
            CustomSelect.val("");
            CustomSelect.multiselect({
                buttonText: function(o, s) {

                    if (o.length === 0) {
                        return $(s).data('placeholder');
                    } else {
                        var labels = 1;
                        o.each(function(i) {
                            labels = parseInt(1 + i);
                        });
                        return labels + ' Selected';
                    }
                },
                onChange: function(option, checked, select) {
                    if ($(option).parent().hasClass("sector-list") === true) {
                        if (checked) {
                            SectorList.push($(option).val());
                        } else {
                            var index = SectorList.indexOf($(option).val());
                            if (index >= 0) {
                                SectorList.splice(index, 1);
                            }
                            SubSectorList.parents("li").eq(0).addClass("disabled");
                            SubSectorList.attr("disabled", "disabled");
                            SubSectorList.multiselect('rebuild');
                            SubmitBtn.addClass("disabled");
                            $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                        }
                        if (SectorList.length > 0) {
                            GetSubSectorList(SectorList);
                        }
                    }
                }
            });
        };
    init = function() {

        if (ProductFinderSection.length > 0) {
            BindDropDown();
            ToggleSearchOption();
            SubmitHandler();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
