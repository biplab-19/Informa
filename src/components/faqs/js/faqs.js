/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.FAQs = (function(window, $, namespace) {
    'use strict';
    //variables
    var FaqMoreBtn = $('.btn-faq-more'),
        pageNo = 1,
        AccordianWrapper = $('.accordian-structure'),
        PanelWrapper = AccordianWrapper.find('.panel-group'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        init, BindMore, ResetAccordian, GetAjaxData, GetFaqIds, RenderFaqs;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    RenderFaqs = function (data) {
        
        var Results = data,
            List = Results.FaqList,
            AccordianId = Results.FaqAccordionId,
            Html = "";

        for(var key in List) {
            var Data = List[key],
            TemplateName = (Templates.AccordianTemplate !== "undefined") ? Templates.AccordianTemplate : "",
            ListTemplate = Handlebars.compile(TemplateName);
            Data.FaqAccordionId = AccordianId;
            Html += ListTemplate({ results: Data });
        }

        $('.panel-group#'+AccordianId).append(Html);

        if (Results.FaqRemainingCount < 1) {
            FaqMoreBtn.hide();
        } else {
            FaqMoreBtn.show();
        }
    },

    GetFaqIds = function (Parent) {
        var panels = Parent.find('.panel-collapse'),
            ids = [];

            panels.each(function () {
                var Current = $(this).attr('id');
                ids.push(Current);
            })

            return ids.join(',');
    },

    ResetAccordian = function () {
        var Items = AccordianWrapper.find('.panel-group');
        Items.each(function () {
            $(this).attr('data-pageno', pageNo);
        });
    },

    BindMore = function () {
        FaqMoreBtn.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.accordian-wrap'),
                CurrentPage = Parent.find('.panel-group').attr('data-pageno'),
                HelpDropdown = Parent.find('.help-faq-select'),
                Count = Parent.find('.panel-group').attr('data-count'),
                CurrentPageItemGuid = Parent.attr('data-CurrentPageItemGuid'),
                _Object = {
                    PageNo: CurrentPage,
                    PageSize: Count,
                    CurrentPageItemGuid: CurrentPageItemGuid
                };

                _Object.ExcludedFAQItemIds = GetFaqIds(Parent);

                if(HelpDropdown.length > 0) {
                    _Object.FAQTypeItemGuid = HelpDropdown.val();
                }
                Parent.find('.panel-group').attr('data-pageno', (parseInt(CurrentPage)+1));
                
                GetAjaxData(Urls.GetFAQs, "Post", JSON.stringify(_Object), RenderFaqs, null, null);
        })
    },

    init = function () {
        if(FaqMoreBtn.length > 0) {
            ResetAccordian();
            BindMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.FAQs.init());
