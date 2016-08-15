/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedTabs = (function(window, $, namespace) {
    'use strict';
    var RecomendedTab = $('.recommendation-tabs'),
        RecomendedResults = $('.recommended-results'),
        Tabs = RecomendedTab.find('a[data-toggle="tab"]'),
        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, LargeDeviceFunction, SmallDeviceFunction, GetAjaxData, GetItemsDefault, RenderItems;

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {

        //INFORMA.Spinner.Show($('body'));
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
    GetItemsDefault = function (target) {
        console.log('hi');
        var object = null,
            DefaultCount = RecomendedResults.find('.recomended-content');
        if(target === '#Dashboard') {
            debugger;
            object = {
                defaultCount: DefaultCount
            }

            GetAjaxData(Urls.GetRecomendedItems, "Post", object, RenderItems, null, null);
        }
    },

    RenderItems = function (data) {
        // body...
    }

    SmallDeviceFunction = function (Parent) {
        var Select = Parent.find('select[name="RecommendTabs"]'),
            SelectFirst = $(Select.find('option')[0]);

        Select.val('#Dashboard').trigger('change');

        Select.on('change', function () {
            var Value = $(this).val();
            RecomendedResults.find('.tab-pane').removeClass('active');

            $(Value).addClass('active');

            GetItemsDefault(Value);
        })
    }

    LargeDeviceFunction = function (Parent) {
        Parent.find('.nav-tabs li:first-child a').trigger('click');

        Tabs.on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href");

            GetItemsDefault(target);
        });
    },

    init = function () {
        if(RecomendedTab.length > 0) {
            var Viewport = INFORMA.global.device.viewport;

            if(Viewport == "mobile") {
                SmallDeviceFunction(RecomendedTab);
            } else {
                LargeDeviceFunction(RecomendedTab);
            }
        }
    }
    return {
        init: init
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedTabs.init());
