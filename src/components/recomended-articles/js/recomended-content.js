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

                for(var key = 0; key < Articles.length; key++) {
                    var Data = Articles[key],
                        TemplateName = (Templates.SampleContent !== "undefined") ? Templates.SampleContent : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                        if(Data.Price != null){
                            if(Data.Price){
                                var replacezeroWidthSpace = Data.Price.replace(/\u200B/g,'');
                                Data.Price = (replacezeroWidthSpace.length > 0) ? replacezeroWidthSpace : null;
                            }
                        }
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



            if(results.ArticleRemainingCount > 0 && RecomendedWrapper.find('.recomended-wrapper').length < 30) {
                BtnMore.removeClass('hidden');
            } else {
                BtnMore.addClass('hidden');
            }
        } else {
            BtnMore.addClass('hidden');
        }
    },

    GetIds = function (Parent) {
        var items = Parent.find('.list-items'),
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
                    PageSize: Count,
                    SearchTexts: $('.SearchTextsSampleContent').val().split('|'),
                    ExcludeContentTypeGuids: $('.ExcludeContentTypeGuids').val().split('|')
                };

            GetAjaxData(Urls.GetRecomendedItems, "Post", _Object, RenderRecomendResult, null, null);
        })
    }

    equalHeight = function (Parent) {
        var Items = Parent.find('.recomended-wrapper'),
            MaxHeight = 0,
            MaxWrapperHeight = 0,
            MaxTopicHeight = 0;
            Items.each(function () {
                var ContentHeight = $(this).find('.content').height();
                if(ContentHeight > MaxHeight) {
                    MaxHeight = ContentHeight;
                }
            })
            Items.find('.content').height(MaxHeight);
            Items.each(function(){
                var TopicHeight = $(this).find('.topics').outerHeight();
                if(TopicHeight > MaxTopicHeight) {
                    MaxTopicHeight = TopicHeight;
                }
            })
            Items.find('.topics').height(MaxTopicHeight);
            Items.each(function(){
                var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                if(WrapperHeight > MaxWrapperHeight) {
                    MaxWrapperHeight = WrapperHeight;
                }
            })
            Items.find('.recomend-content').height(MaxWrapperHeight);
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