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
        FilterList = $(".search-filter .filter-list"),
        Utils = INFORMA.Utils,
        Urls = INFORMA.Configs.urls.webservices,
        SubmitBtn = $(".product-finder .sector-search li.button"),
        SectorList = FilterList.find(".sector ul"),
        SubSectorList = FilterList.find(".subsector ul"),
        // methods
        init,
        CreateFilterList, MakeDropUnSelected, BindFilterEvents,UpdateSearchResult,RemoveFilterItems;

    RemoveFilterItems = function(item,parent){
        item.fadeOut("slow",function(){
            item.remove();
            var FilterLength = parent.find("li").size();
            if(FilterLength<1){
                parent.parent('div').hide();
                //INFORMA.SearchResults.UpdateResultPage();
            }
        });
    },
    UpdateSearchResult = function(SectorIDs){

        INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
            method: "Get",
            data: SectorIDs,
            success_callback: function(data) {
                INFORMA.ProductFinder.UpdateSubSectorDropdown(data);
                SubmitBtn.find("button").trigger("click");
            },
            error_callback: function() {

            }
        });
    },
    BindFilterEvents = function() {
        var RemoveLink = FilterList.find("a.remove");

        RemoveLink.on("click", function(e) {
            e.preventDefault();
            var SectorName = $(this).data("value"),
                parent = $(this).parents("ul").eq(0),
                FilterID = parent.data("filterid"), 
                SectorIDs , SubSectorIDs =[]; 

                if(SectorName !==null && FilterID !==null){
                    RemoveFilterItems($(this).parent(),parent);
                    //MakeDropUnSelected([SectorName],$("#"+FilterID));

                    if($("#"+FilterID).hasClass("sector-list")===true){
                        var Sectors = $("#"+FilterID).val(),
                            SubSectorItems = SubSectorList.find("li a");

                        if(Sectors!==null){
                            SectorIDs = (Utils.RemoveArrayItem(Sectors,SectorName)).toString();

                            if(SubSectorItems.length){
                                $.each(SubSectorItems,function(){
                                    var CurrentSector = $(this).data("sector");
                                    if(CurrentSector===SectorName){
                                       $(this).trigger("click");
                                    }else{
                                        SubSectorIDs.push($(this).data("value"));
                                    }

                                });
                            }else{
                               SubSectorIDs = null; 
                            }      
                            INFORMA.SearchResults.UpdateResultPage(SectorIDs , SubSectorIDs.toString());
                        }
                    }
                }

        });
    },
    MakeDropUnSelected = function(Arr,DrpDwn){
        $.each(Arr, function(i, e) {
           DrpDwn.find("option[value='" + e + "']").prop("selected", false);
        });
        DrpDwn.multiselect('rebuild');
    },
    CreateFilterList = function(DataObject) {
        if (Object.keys(DataObject).length) {
            var ListTemplate = Handlebars.compile(Templates.ProductFilters),
                SectorHtml, SubSectorHtml,
                FilterCont = $(".search-filter .filter-list");

            if (DataObject.Sectors) {
                SectorHtml = ListTemplate({ results: DataObject.Sectors });
                FilterCont.find(".sector ul").empty().html(SectorHtml);
            }
            if (DataObject.SubSectors) {
                SubSectorHtml = ListTemplate({ results: DataObject.SubSectors });
                FilterCont.find(".subsector ul").empty().html(SubSectorHtml);
            }
            $(".search-filter").delay(600).slideDown();
        }
    },

    init = function() {};
    return {
        init: init,
        CreateFilterList: CreateFilterList,
        DoFilter:BindFilterEvents
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());
