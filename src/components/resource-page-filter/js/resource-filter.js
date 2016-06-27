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
        TagsContainer = ResourceContainer.find('.tags-display'),
        RefineContainer = ResourceContainer.find('.refine-list'),
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
        UpdateResourceSubSectorDropdown, RenderResourceTilesResult,updateResourcesRefine,
        CreateTags, UpdateSearchResult, ClearAllResourceFilter, MakeRefineSelected,GetRefineData,
        BindRefineEvents, BindFilterEvents, RemoveResourceFilter, MakeDropUnSelected, GetFilterData;

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

    UpdateSearchResult = function(filterData) {
        INFORMA.Spinner.Show($("body"));
        var Guid = BtnMore.attr('data-ContainerGuid'),
            typeGuid = BtnMore.attr('data-Contenttypeguid'),
            InformationType = jQuery(this).attr('data-InformationType'),
                Role = jQuery(this).attr('data-Role'),
                Brand = jQuery(this).attr('data-Brand');

        filterData.ContainerGuid = Guid;
        filterData.ContenttypeGuid = typeGuid;
        filterData.InformationType = InformationType;
        filterData.Role = Role;
        filterData.Brand = Brand;
        INFORMA.DataLoader.GetServiceData(Urls.ResourceList, {
            method: "Post",
            data: JSON.stringify(filterData),
            success_callback: RenderResourceResult
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

        RenderOnLoad();
        equalHeights();
        CreateTags(data);
        updateResourcesRefine(data);
    },

    updateResourcesRefine = function(data) {
        var AllFacets = data.ProductFacets,
            AllLabels = data.FilterLabels,
            Html = "";

        for(var key in AllFacets) {
            var Result = AllFacets[key];
                        
                Result.FilterName = AllLabels[key];
                Result.FilterID = key;
            var TemplateName = (Templates.ProductFacets !== "undefined") ? Templates.ProductFacets : "",
                ListTemplate = Handlebars.compile(TemplateName);

                if(Result.length > 0)
                Html += ListTemplate({"results" : Result});
        }
        var RefineData = GetFilterData(jQuery('.resource-filter-wrap .refine-data'));
        jQuery('.resource-filter-wrap').find('.slider').find('.refine-data').html(Html);
        MakeRefineSelected(jQuery('.resource-filter-wrap .refine-data'), RefineData);
    }

    CreateTags = function(data) {
        var AllTags = data.ProductFilters,
            AllLabels = data.FilterLabels,
            Htmltags = "",
            HtmlRefine = "";

        if(AllTags !== null) {
            for(var key in AllTags) {
                 var Result = AllTags[key];
                     if(Result.length > 0) {   
                        Result.FilterName = AllLabels[key];
                        Result.FilterID = key;
                       var TemplateName = (Templates.ProductFilters !== "undefined") ? Templates.ProductFilters : "",
                            ListTemplate = Handlebars.compile(TemplateName);
                        Htmltags += ListTemplate({"results" : Result});
                    }
            }
            TagsContainer.html(Htmltags);
            RefineContainer.find('.refine-result').html(HtmlRefine);
            BindFilterEvents();
        }
    },

    BindRefineEvents = function() {
            var RefineCloseBtn = $(".refine-list .close-filter"),
                RefineContainer = $(".search-container .slider"),
                RefineBtn = $(".refine-list .btn");

            RefineCloseBtn.off("click").on("click", function(e) {
                e.preventDefault();
                jQuery(this).parents('.refine-list').find('.slider').slideUp();
                jQuery(this).hide();
            });

            $(".resource-filter .refine-list").off("click").on("click", "a.refine", function(e) {
                e.preventDefault();
                jQuery(this).parents('.refine-list').find('.slider').slideDown();
                RefineCloseBtn.show();
            });
            RefineBtn.off("click").on("click", function(e) {
                e.preventDefault();
                jQuery(this).parents('.refine-list').find('.slider').fadeOut();
                RefineCloseBtn.hide();
                var getFilterData = GetRefineData();
                
                UpdateSearchResult(getFilterData);
            });
            //MakeRefineSelected(TagsContainer);
    },

    GetRefineData = function() {
        var AllFilterData = {},
            FilterData = GetFilterData(TagsContainer),
            RefineData = GetFilterData(jQuery('.resource-filter-wrap .refine-data'));
        $.extend(AllFilterData, FilterData,RefineData);
        
        return AllFilterData;
    },

    MakeRefineSelected = function(FilterContainer, data) {
        debugger;
        var Filters = FilterContainer.find("ul"),
            RefineItems = jQuery(".resource-filter-wrap .refine-data").find("input"),
            FilterData = {},
            FilterValue = [];
        
        for(var key in data) {
            var Results = data[key];
            
            for(var i in Results) {
                FilterValue.push(Results[i]);
            }
        }
        
        $.each(Filters, function() {
            var FilterID = $(this).data("filterid").toLowerCase(),
                ListItem = $(this).find("li").find("input:checked");
                //debugger;
            $.each(ListItem, function() {
                if (FilterID !== "sectors" && FilterID !== "subsectors") {
                    FilterValue.push($(this).data("value"));
                }
            });
        });
        //debugger;
        $.each(RefineItems, function(i, v) {
            if (($.inArray($(this).data("value"), FilterValue)) > -1) {
                $(this).prop('checked', true);
            }
        });
    },

    GetFilterData = function(FilterContainer) {
        var Filters = FilterContainer.find("ul"),
            FilterData = {};
        $.each(Filters, function() {
            var FilterID = $(this).data("filterid").toLowerCase(),
                ListItem = ($(this).find("li a").length) ? $(this).find("li a") : $(this).find("li input:checked"),
                FilterValue = [];

            $.each(ListItem, function() {
                FilterValue.push($(this).data("value"));
            });

            FilterData[FilterID] = FilterValue;
        });
        return FilterData;
    },

    RemoveResourceFilter = function(item, parent) {
        item.fadeOut("fast", function() {
            item.remove();
            var FilterLength = parent.find("li").size(),
                NoFilter = TagsContainer.find("li"),
                FilterData = GetFilterData(TagsContainer);
            if (FilterLength < 1) {
                parent.parent('div').hide();
            }
            if (!NoFilter.length) {
                jQuery('.resource-filter-wrap .refine-data').slideUp();
            }
            UpdateSearchResult(FilterData);
        });
    },
    MakeDropUnSelected = function(Arr, DrpDwn) {
        $.each(Arr, function(i, e) {
            DrpDwn.find("option[value='" + e + "']").prop("selected", false);
        });
        DrpDwn.multiselect('rebuild');
    },
    BindFilterEvents = function() {
            var RemoveLink = TagsContainer.find("a.remove"),
                ClearAll = TagsContainer.find("a.remove-all");

            RemoveLink.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parents("ul").eq(0),
                    ItemValue = $(this).data("value"),
                    FilterID = Parent.data("filterid").toLowerCase();

                RemoveResourceFilter($(this).parent(), Parent);

                if (FilterID === "sectors") {
                    MakeDropUnSelected([ItemValue], jQuery("select[name='resourceSectors']"));
                }
                if (FilterID === "subsectors") {
                    MakeDropUnSelected([ItemValue], jQuery("select[name='resourceSubSectors']"));
                }

                if(Parent.find('li').length === 0) {
                    Parent.remove();
                }

            });

            ClearAll.on("click", function(e) {
                e.preventDefault();
                var Parent = $(this).parent(),
                    ItemID = $(this).data("filterid").toLowerCase(),
                    AllIds = Parent.find('a.remove'),
                    DrpItems = [];
                    
                for(var x in AllIds) {
                    DrpItems.push(AllIds.attr('data-value'));
                }
               
                ClearAllResourceFilter(Parent);
                
                if (ItemID === "sectors") {
                    TagsContainer.find(".SubSectors").remove();
                    CustomResourceSelect.val("");
                    SubSectorSelect.parents("li.menu").addClass("disabled");
                    SubSectorSelect.multiselect('rebuild');
                    MakeDropUnSelected(DrpItems, jQuery('select[name="resourceSectors"]'));
                }
                if (ItemID === "subsectors") {
                    SubSectorSelect.val("");
                    MakeDropUnSelected(DrpItems, jQuery('select[name="resourceSubSectors"]'));
                    SubSectorSelect.multiselect('rebuild');
                }
            });

    },

    ClearAllResourceFilter = function(Parent) {
        Parent.fadeOut("fast", function() {
            Parent.remove();
            var FilterData = GetFilterData(TagsContainer),
                NoFilter = TagsContainer.find("li");
            if (!NoFilter.length) {
                $(".refine-filter-wrap .refine-data").slideUp();
            }
            UpdateSearchResult(FilterData);
        });
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
                InformationType = jQuery(this).attr('data-InformationType'),
                Role = jQuery(this).attr('data-Role'),
                Brand = jQuery(this).attr('data-Brand'),
                typeGuid = jQuery('.btn-showMore').attr('data-ContenttypeGuid');
                pageNumber = 2;
            var MergeItems = INFORMA.Utils.serializeObject(FieldArray);

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid;
            MergeItems.InformationType = InformationType;
            MergeItems.Role = Role;
            MergeItems.Brand = Brand;

            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceResult, null, null);
        })
    },

    RenderResourceTilesResult = function(data) {
        INFORMA.Spinner.Show($("body"));
        pageNumber++;
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
        ResourceListContainer.find('ul').append(html);
    },

    RenderOnLoad = function() {
        
        BtnMore.on('click', function() {
            var FieldArray = ResourceContainer.find("form").serializeArray(),
                Guid = jQuery(this).attr('data-ContainerGuid'),
                typeGuid = jQuery(this).attr('data-ContenttypeGuid'),
                Role = jQuery(this).attr('data-Role'),
                InformationType = jQuery(this).attr('data-InformationType'),
                Brand = jQuery(this).attr('data-Brand'),
                Count = ResourceListContainer.data('count');

            var MergeItems = GetFilterData();

            MergeItems.ContainerGuid = Guid;
            MergeItems.ContenttypeGuid = typeGuid;
            MergeItems.PageNo = pageNumber;
            MergeItems.Role = Role;
            MergeItems.Brand = Brand;
            MergeItems.InformationType = InformationType;
            pageNumber++;
            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(MergeItems), RenderResourceTilesResult, null, null);

        })

        SubmitHandler();
    }
    

    init = function() {
        if (ResourceContainer.length > 0) {
            ResourceBindDropDown();
            RenderOnLoad();
            BindRefineEvents();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());