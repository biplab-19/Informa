/*
 * Anlayst Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystSearch = (function(window, $, namespace) {
    'use strict';
    //variables
    var AnalystSearch = $('.analyst-search'),
    	Sector = AnalystSearch.find('.sector select'),
    	SubSector = AnalystSearch.find('.sub-sector'),
    	submitBtn = AnalystSearch.find('.submit-btn'),
    	txtField = AnalystSearch.find('#name'),
    	Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
    init, GetAjaxData;

    txtField.on('keyup', function() {
    	var calcLength = jQuery(this).val().length;

    	if(calcLength > 3) {
    		submitBtn.removeClass('disabled');
    	} else {
    		submitBtn.addClass('disabled');
    	}
    })

    Sector.chosen().on('change', function() {
    	var _value = jQuery(this).val();
    	if(_value === 'All') {
    		SubSector.addClass('disabled');
    			submitBtn.addClass('disabled');
    	} else {
    		SubSector.removeClass('disabled');
    		submitBtn.removeClass('disabled');
    	}
    })

    submitBtn.on('click', function() {

    })

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
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

    init = function() {
        //alert('hi');
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
