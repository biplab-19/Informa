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
    // methods
        init,
        BindDropDown,
        ResourceBindDropDown,
        RenderResourceResult,
        RenderOnLoad,
        SubmitHandler,
        GetAjaxData,
        equalHeights;

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

    ResourceBindDropDown = function() {
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
                        SubSectorSelect.parents('li').removeClass('disabled');
                        SubSectorSelect.removeAttr('disabled');
                        SubSectorSelect.multiselect('rebuild');
                    } else {
                        SubSectorSelect.parents('li').addClass('disabled');
                        SubSectorSelect.attr('disabled', 'disabled');
                        SubSectorSelect.multiselect();
                    }
                }
            }
        });
    },

    RenderResourceResult = function(data) {
        INFORMA.Spinner.Show($("body"));
        
        var results = data.Results,
            html = "";

        for (var key in results) {
            if (key === "Articles") {
                var Data = results[key],
                    TemplateName = (Templates.articleListItems !== "undefined") ? Templates.articleListItems : "",
                    ListTemplate = Handlebars.compile(TemplateName);

                html += ListTemplate({"Articles" : Data});
            }
        }
        ResourceListContainer.find('ul').html(html);
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
                GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
              debugger;  
            GetAjaxData(Urls.ResourceList, "Get", null, RenderResourceResult, null, null);
        })
    },

    RenderOnLoad = function() {
        
        ResourceListContainer.each(function() {
            var oThis = jQuery(this),
                Count = oThis.data('count'),
                Items = oThis.find('li').length;

            if(Items> Count) {
                oThis.find('li:nth-child(n+'+ (Count+1) +')').hide();
                oThis.find('.btn-showMore').show();
            } else {
                oThis.find('.btn-showMore').hide();
            }

        })

        BtnMore.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.data('count');
                Parent.find('li:nth-child(n+'+ (Count+1) +')').slideToggle();

                jQuery(this).toggleClass('showLess');
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
