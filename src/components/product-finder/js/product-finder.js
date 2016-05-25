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
        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown,ShowHideSeach;

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
            SectorData.sector = INFORMA.Utils.getUniqueArray(arrayList);
            console.log(JSON.stringify(SectorData));
            INFORMA.DataLoader.GetServiceData("/client/search/getsubsector", {
                method: "GET",
                data: JSON.stringify(SectorData),
                success_callback: function(data) {

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
