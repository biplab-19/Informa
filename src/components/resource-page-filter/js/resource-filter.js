/*
 * Resource Filter.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        ResourceContainer = $('.resource-filter'),
        CustomResourceSelect = ResourceContainer.find("select"),
        SectorSelect = ResourceContainer.find("select.resource-sector"),
        SubSectorSelect = ResourceContainer.find("select.resource-sub-sector"),
        BtnSubmit = ResourceContainer.find(".search-resource"),
        ResourceListContainer = $('.resource-list'),
        BtnMore = $('.btn-showMore'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        pageNumber = 2,
    // methods
        init,
        BindDropDown,
        ResourceBindDropDown,
        RenderResourceResult,
        RenderOnLoad,
        SubmitHandler,
        GetAjaxData,
        equalHeights,
        GetResourceSubSectorList,
        UpdateResourceSubSectorDropdown;

    equalHeights = function() {
        $('.list-container').each(function() {
            var highestBox = 0;
            $('.columns', this).each(function() {
                if ($(this).height() > highestBox) {
                    highestBox = $(this).height();
                }
            });
            $('.columns', this).height(highestBox);
        });
    },

    GetResourceSubSectorList = function(arrayList) {
        var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join("&");
            //SectorIDs = 'SectorIDs='+SectorIDs;
            
            var obj = {
                "SectorIDs": SectorIDs
            }
            GetAjaxData(Urls.ResourceSubSectorList, "Post", JSON.stringify(obj), UpdateResourceSubSectorDropdown, null, null);
    },

    UpdateResourceSubSectorDropdown = function(data) {

        if (data.SubSectors.length > 0) {
            var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                html = ListTemplate({ SubSectors: data.SubSectors });


            // $(".sector-search li").removeClass("disabled");
            SubSectorSelect.removeAttr("disabled")
                .removeProp("disabled")
                .html(html);
            SubSectorSelect.multiselect('rebuild');
        }
    },

    ResourceBindDropDown = function() {
        var SectorList = [];
        CustomResourceSelect.val("");
        CustomResourceSelect.multiselect({
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
                if ($(option).parent().hasClass("resource-sector") === true) {
                    if (checked) {
                        SectorList.push($(option).val());
                        SubSectorSelect.parents('li').removeClass('disabled');
                        SubSectorSelect.removeAttr('disabled');
                        SubSectorSelect.multiselect('rebuild');
                    } else {
                        var index = SectorList.indexOf($(option).val());
                        if (index >= 0) {
                            SectorList.splice(index, 1);
                        }
                        SubSectorSelect.parents('li').addClass('disabled');
                        SubSectorSelect.attr('disabled', 'disabled');
                        SubSectorSelect.multiselect();
                    }
                }
                if ($(option).parent().hasClass("resource-sector")) {
                    if (SectorList.length > 0) {
                        GetResourceSubSectorList(SectorList);
                    }
                }
            }

        });
    },

    RenderResourceResult = function(data) {
        INFORMA.Spinner.Show($("body"));
        
        var results = data.Resources,
            html = "";

        for (var key in results) {
            if (key === "Articles") {
                var Data = results[key],
                    TemplateName = (Templates.articleListItems !== "undefined") ? Templates.articleListItems : "",
                    ListTemplate = Handlebars.compile(TemplateName);

                html += ListTemplate({"Articles" : Data});
            }
        }
        if(data.ResourceRemainingCount < 1) {
            jQuery('.btn-showMore').hide();
        } else {
            jQuery('.btn-showMore').show();
        }
        ResourceListContainer.find('ul').html(html);

        //ResourceListContainer.find('ul').find('li:nth-child(n+'+(data.Resources.Articles.length - data.ResourceRemainingCount + 1)+')').hide();
        //ResourceListContainer.find('ul').find('li:nth-child(n+'+(data.Resources.Articles.length - data.ResourceRemainingCount + 1)+')').slideDown();
        RenderOnLoad();
        equalHeights();
    },

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        // INFORMA.Spinner.Show($("body"));
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

    SubmitHandler = function() {
        BtnSubmit.on('click', function(e) {
            e.preventDefault();
            var FieldArray = ResourceContainer.find("form").serializeArray(),
                Guid = jQuery('.btn-showMore').attr('data-ContainerGuid'),
                typeGuid = jQuery('.btn-showMore').attr('data-ContenttypeGuid');

            var MergeItems = INFORMA.Utils.serializeObject(FieldArray);

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid
            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceResult, null, null);
        })
    },

    RenderOnLoad = function() {
        

        BtnMore.on('click', function() {
            var FieldArray = ResourceContainer.find("form").serializeArray(),
                Guid = jQuery(this).attr('data-ContainerGuid'),
                typeGuid = jQuery(this).attr('data-ContenttypeGuid'),
                Count = ResourceListContainer.data('count');

            var MergeItems = INFORMA.Utils.serializeObject(FieldArray);

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid;
            MergeItems.PageSize = Count * pageNumber;
            pageNumber++;
            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceResult, null, null);

        })

        SubmitHandler();
    }
    

    init = function() {
        if (ResourceContainer.length > 0) {
            ResourceBindDropDown();
            RenderOnLoad();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());