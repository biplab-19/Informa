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

    RenderRecomendResult = function (data, SearchType) {

        if(data != null) {
            var results = data,
                html = "",
                Articles = results.Articles;

                for(var key in Articles) {
                    var Data = Articles[key],
                        TemplateName = (Templates.RecomendedContent !== "undefined") ? Templates.RecomendedContent : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                    html += ListTemplate({ results: Data });
                }

            if(SearchType == null) {
                RecomendedWrapper.find('.row').append(html);
            } else {
                RecomendedWrapper.find('.row').html(html);
                equalHeight(RecomendedWrapper);
                var name = "PrefernceUpdated";
                var cookie = name+"="+false+'; path=/';
                document.cookie = cookie;
            }

            equalHeight(RecomendedWrapper);



            if(results.ArticleRemainingCount < 1) {
                BtnMore.addClass('hidden');
            } else {
                BtnMore.removeClass('hidden');
            }
        } else {
            BtnMore.addClass('hidden');
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
                ItemDisplayed = Parent.find('.recomended-wrapper').length,
                MaximumCount = Parent.attr('data-MaximumNumberOfArticles'),
                _Object = null;

                if((MaximumCount - ItemDisplayed) <= Count) {
                    Count = (MaximumCount - ItemDisplayed);
                }

                _Object = {
                    ExcludeContentGuids: Ids,
                    PageSize: Count
                };

            GetAjaxData(Urls.GetRecomendedItems, "Post", _Object, RenderRecomendResult, null, null);
        })
    }

    equalHeight = function (Parent) {
        var Items = Parent.find('.recomended-wrapper'),
            MaxHeight = 0,
            MaxWrapperHeight = 0,
            Padding = 20;

        Items.each(function () {
            var WrapperHeight = $(this).find('.recomend-content').height(),
                ContentHeight = $(this).find('.content').height();

            if(WrapperHeight > MaxWrapperHeight) {
                MaxWrapperHeight = WrapperHeight;
            }

            if(ContentHeight > MaxHeight) {
                MaxHeight = ContentHeight;
            }
            
        })
        Items.find('.content').height(MaxHeight);
        Items.find('.recomend-content').height(MaxWrapperHeight + Padding);
    }

    init = function () {
        if(RecomendedWrapper.length > 0) {
            $('#tabs-1').addClass('active');
            equalHeight(RecomendedWrapper);
            ShowMore();
        }
    }
    return {
        init: init,
        RenderRecomendResult: RenderRecomendResult
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedContent.init());