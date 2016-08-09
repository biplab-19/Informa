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
INFORMA.RecomendedContent = (function(window, $, namespace) {
    'use strict';
    //variables
    var RecomendedWrapper = $('.recomended-content'),
        BtnMore = RecomendedWrapper.find('.btn-showMore'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        equalHeight, init, ShowMore, GetIds, GetAjaxData, RenderRecomendResult;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
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

    RenderRecomendResult = function (data) {
        var results = data,
            html = "",
            Articles = results.Articles;

            for(var key in Articles) {
                var Data = Articles[key],
                    TemplateName = (Templates.RecomendedContent !== "undefined") ? Templates.RecomendedContent : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                html += ListTemplate({ results: Data });
            }

        RecomendedWrapper.find('.row').append(html);

        equalHeight(RecomendedWrapper);

        if(results.ArticleRemainingCount < 1) {
            BtnMore.addClass('hidden');
        } else {
            BtnMore.removeClass('hidden');
        }
    },

    GetIds = function (Parent) {
        var items = Parent.find('.recomended-wrapper'),
            ids = [];

        items.each(function () {
            var id = $(this).attr('data-fetch');
            ids.push(id);
        })

        return ids;
    }

    ShowMore = function () {
        BtnMore.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.recomended-content'),
                ViewPort = INFORMA.global.device.viewport,
                Count = Parent.attr('data-' + ViewPort),
                Ids = GetIds(Parent),
                _Object = {
                    ExcludeContentGuids: Ids,
                    PageSize: Count
                };

            GetAjaxData(Urls.GetRecomendedItems, "Post", _Object, RenderRecomendResult, null, null);
        })
    }

    equalHeight = function (Parent) {
        var Items = Parent.find('.recomended-wrapper'),
            MaxHeight = 0;

        Items.each(function () {
            var ContentHeight = $(this).find('.content').height();
            if(ContentHeight > MaxHeight) {
                MaxHeight = ContentHeight;
            }
        })
        Items.find('.content').height(MaxHeight);

    }

    init = function () {
        if(RecomendedWrapper.length > 0) {
            equalHeight(RecomendedWrapper);
            ShowMore();
        }
    }
    return {
        init: init
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedContent.init());
