var INFORMA = window.INFORMA || {};
INFORMA.FAQs = (function (window, $, namespace) {
    'use strict';
    //variables
    var FaqMoreBtn = $('.btn-faq-more'),
        pageNo = 0,
        AccordianWrapper = $('.accordian-structure'),
        PanelWrapper = AccordianWrapper.find('.panel-group'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        init, BindMore, ResetAccordian, GetAjaxData, GetFaqIds, RenderFaqs;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify(data),
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

        for (var key in List) {
            var Data = List[key],
            TemplateName = (Templates.AccordianTemplate !== "undefined") ? Templates.AccordianTemplate : "",
            ListTemplate = Handlebars.compile(TemplateName);
            Data.FaqAccordionId = AccordianId;
            Html += ListTemplate({ results: Data });
        }

        $('.panel-group#' + AccordianId).append(Html);

        if (Results.FaqRemainingCount < 1) {
            $('.panel-group#' + AccordianId).parent().find('.btn-faq-more').hide();
        } else {
            $('.panel-group#' + AccordianId).parent().find('.btn-faq-more').show();
        }
    },

    GetFaqIds = function (Parent) {
        var panels = Parent.find('.panel-collapse'),
            ids = [];

        panels.each(function () {
            var Current = $(this).attr('id');
            ids.push(Current);
        })

        return ids;
    },

    ResetAccordian = function () {
        var Items = AccordianWrapper.find('.panel-group');
        if($('.help-faq-wrapper').length > 0) {
            $('.help-faq-wrapper .accordian-wrap').addClass('hide');
            $('.help-faq-wrapper .accordian-wrap:first-child').removeClass('hide').addClass('show');
        }
        Items.each(function () {
            $(this).attr('data-pageno', pageNo);
        });
    },

    BindMore = function () {
        FaqMoreBtn.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.accordian-wrap'),
                CurrentPage = Parent.find('.panel-group').attr('data-pageno'),
                HelpDropdown = Parent.parents('.accordian-structure').find('.help-faq-select'),
                Count = Parent.parents('.accordian-structure').attr('data-count'),
                CurrentPageItemGuid = Parent.parents('.accordian-structure').attr('data-CurrentPageItemGuid'),
                _Object = {
                    PageNo: 0,
                    PageSize: Count,
                    CurrentPageItemGuid: CurrentPageItemGuid
                };

            _Object.ExcludedFAQItemIds = GetFaqIds(Parent);

            if (HelpDropdown.length > 0) {
                _Object.FAQTypeItemGuid = HelpDropdown.val();
            } else {
                _Object.FAQTypeItemGuid = null;
            }
            Parent.find('.panel-group').attr('data-pageno', (parseInt(CurrentPage) + 1));

            GetAjaxData(Urls.GetFAQs, "Post", _Object, RenderFaqs, null, null);
        })
    },

    init = function () {
        if (FaqMoreBtn.length > 0) {
            ResetAccordian();
            BindMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.FAQs.init());