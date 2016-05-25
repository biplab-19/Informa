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
        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSeach,
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates;

    ShowHideSeach = function(ele) {
            var ShowOption = $(ele).data('show');
            $("ul.searchToggle").addClass('hidden');
            ProductFinderSection.find("ul." + ShowOption).removeClass("hidden").fadeIn("slow");
        },
        ToggleSearchOption = function() {
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
            INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                method: "GET",
                data: JSON.stringify(SectorData),
                success_callback: function(data) {

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
                error_callback: function() {

                }
            });
        },
        BindDropDown = function() {
            var SectorList = [];
            jQuery(".custom-multiselect select").multiselect({
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
                    if ($(option).parent().hasClass("sector-list")===true) {
                        if (checked) {
                            SectorList.push($(option).val());
                        } else {
                            var index = SectorList.indexOf($(option).val());
                            if (index >= 0) {
                                SectorList.splice(index, 1);
                            }
                        }
                        if (SectorList.length > 0) {
                            GetSubSectorList(SectorList);
                        }else{
                            SubSectorList.parents("li").eq(0).addClass("disabled");
                            SubSectorList.attr("disabled","disabled");
                            SubSectorList.prop("disabled","disabled");
                            SubSectorList.multiselect('rebuild');
                        }
                    }
                }
            });
        };
    init = function() {

        if (ProductFinderSection.length > 0) {
            BindDropDown();
            ToggleSearchOption();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
