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
        RecomendedCount = $(".tab-content .recomended-content").data("maximumnumberofarticles"),
        MaxArticleCount = (RecomendedCount !=="") ? RecomendedCount : 0,
        BtnMore = RecomendedWrapper.find('.btn-showMore'),
        VViewPort = INFORMA.global.device.viewport,
        DefaultArticleCount = $(".tab-content .recomended-content").attr('data-' + VViewPort),
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
                ArticleCounts = results.ArticleCount,
                Articles = results.Articles;

                if(Articles != null) {
                    $('#tabs-1 .recomended-content').removeClass('hidden');
                    $('#tabs-1 .recommended-products').removeClass('hidden');
                    $('#tabs-1 .dashboard-no-record').addClass('hidden');
                    for(var key = 0; key < Articles.length; key++) {
                        var Data = Articles[key],
                            TemplateName = (Templates.SampleContent !== "undefined") ? Templates.SampleContent : "",
                            ListTemplate = Handlebars.compile(TemplateName);
                            if($('.recommendation-tabs').length > 0) {
                                if($('.welcome-description').hasClass('Authenticated')) {
                                    Data.IsAuthenticatedUser = true;
                                } else {
                                    Data.IsAuthenticatedUser = false;
                                }
                            }
                        html += ListTemplate({ results: Data });
                    }
                    if(Articles.length > 0) {
                        $('#tabs-1 section.recomended-content').removeClass('hidden');
                        $('#tabs-1 section.dashboard-no-record').addClass('hidden');
                    } else {
                        $('#tabs-1 section.recomended-content').addClass('hidden');
                        $('#tabs-1 section.dashboard-no-record').removeClass('hidden');
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


                    if(ArticleCounts > DefaultArticleCount && RecomendedWrapper.find('.recomended-wrapper').length < MaxArticleCount) {
                        BtnMore.removeClass('hidden');
                    } else {
                        BtnMore.addClass('hidden');
                    }

                    if($('#tabs-1 .recommended-products').length > 0) {
                        var _DashBoardObject = {
                            SearchTexts: ($('.SearchTextsPDPTemplateIds').length) ? $('.SearchTextsPDPTemplateIds').val().split('|') : "",
                            PageSize: $('.recomended-content').data('maximumnumberofarticles'),
                            SubSubSectorFlagForRecomendations: $('input.SubSubSectorFlagForRecomendations').val()
                        }
                        GetAjaxData(Urls.GetRecomendedProductItems, "Post", _DashBoardObject, INFORMA.RecomendedTabs.RenderDashboardProduct, null, null);
                    }
                } else {
                    $('#tabs-1 .recomended-content').addClass('hidden');
                    $('#tabs-1 .recommended-products').addClass('hidden');
                    $('#tabs-1 .dashboard-no-record').removeClass('hidden');
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
            MaxTopicHeight = 0,
            MaxSubSectorHeight = 0;
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
                var TopicHeight = $(this).find('.SubSectors').outerHeight();
                if(TopicHeight > MaxSubSectorHeight) {
                    MaxSubSectorHeight = TopicHeight;
                }
            })
            Items.find('.SubSectors').height(MaxSubSectorHeight);
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