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
        //methods
        init, LargeDeviceFunction, SmallDeviceFunction;

    SmallDeviceFunction = function (Parent) {
        var Select = Parent.find('select[name="RecommendTabs"]'),
            SelectFirst = $(Select.find('option')[0]);

        Select.val('#Dashboard').trigger('change');

        Select.on('change', function () {
            var Value = $(this).val();
            RecomendedResults.find('.tab-pane').removeClass('active');

            $(Value).addClass('active');
        })
    }

    LargeDeviceFunction = function (Parent) {
        Parent.find('.nav-tabs li:first-child a').trigger('click');
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