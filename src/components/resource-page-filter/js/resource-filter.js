var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var ResourceContainer = $('#resource-finder-section'),
    	CustomSelect = ResourceContainer.find(".custom-multiselect select"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        ResourceSubSectorList = ResourceContainer.find('.SubSector'),
        ResourceSbmtBtn = ResourceContainer.find("li.button"),
    	//methods
    	init, BindDropDown, GetSubSectorList, UpdateSubSectorDropdown, GetAjaxData, BindResourceSbmt, GetProductFinderData;

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    GetProductFinderData = function(){
        var FieldArray = ResourceContainer.find("form").serializeArray(),
            Data = INFORMA.Utils.serializeObject(FieldArray);
        return Data ;
    },
    BindResourceSbmt = function() {
        ResourceSbmtBtn.on('click', function(){
            var ProductData = GetProductFinderData(),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                Data = INFORMA.ProductFinder.MergeData(ProductData,FilterData);
                Data.DefaultItemCount = $('input[name="DefaultItemCount"]').val();
                Data.MaxItemCount = $('input[name="MaxItemCount"]').val();
                Data.DefaultProductCount = $('input[name="DefaultProductCount"]').val();
                Data.SearchTexts = $('input[name="SearchTexts"]').val().split(",");
                Data.OrderOfContentType = $('input[name="OrderOfContentType"]').val().split(",");

            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null, null);
        });
    },
    UpdateSubSectorDropdown = function(data) {
        if (data.SubSectors.length > 0) {
            var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                html = ListTemplate({ SubSectors: data.SubSectors });


            ResourceSubSectorList.parents("li").removeClass("disabled");
            ResourceSubSectorList.removeAttr("disabled")
                .removeProp("disabled")
                .html(html);
            ResourceSubSectorList.multiselect('rebuild');
            ResourceSbmtBtn.removeClass('disabled');
        }
    },
    GetSubSectorList = function(arrayList) {
        var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
            SectorIDs = 'SectorIDs='+SectorIDs;
        GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null, null);
    },
    BindDropDown = function() {
        var SectorList = [];
        CustomSelect.val("");
        CustomSelect.multiselect({
            maxHeight: 200,
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
                if ($(option).parent().hasClass("Sector") === true) {
                    if (checked) {
                        SectorList.push($(option).val());
                    } else {
                        var index = SectorList.indexOf($(option).val());
                        if (index >= 0) {
                            SectorList.splice(index, 1);
                        }
                        //if(SectorList.length === 0) {	                    
                    }
                    if (SectorList.length > 0) {
                        GetSubSectorList(SectorList);
                    } else {
                        ResourceSubSectorList.parents("li").eq(0).addClass("disabled");
                        ResourceSubSectorList.attr("disabled", "disabled");
                        ResourceSubSectorList.val('');
                        ResourceSubSectorList.multiselect('rebuild');
                        ResourceSbmtBtn.addClass("disabled");
                        $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                    }
                }
            }
        });
    };

    init = function() {
    	if(ResourceContainer.length > 0) {
    		BindDropDown();
            BindResourceSbmt();
    	}
    }

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());