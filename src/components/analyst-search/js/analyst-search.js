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
        productAnalystResults = $('.product-analyst-results'),
        EachView = $('.analyst-view .analyst-list-container'),
    	Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, equalHeight;

    equalHeight = function() {
        var _maxHeight = 0;
            EachView.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            EachView.css('height', _maxHeight);
    }

    EventsFunctions = function() {
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
            var FieldArray = AnalystSearch.find("form").serializeArray(),
                GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
            INFORMA.Spinner.Show($("body"));
        	GetAjaxData(Urls.AnalystSearch, "Get", GetSerializeData, RenderSearchResult, null);
        })
    }

    RenderSearchResult = function(data) {
        //INFORMA.SearchResults.RenderSearchResults(data);
        console.log(data);
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                    Data.header = HeaderText;
                    html+= ListTemplate({ results: Data });

            }
        }
        productAnalystResults.html(html);
        return html;
    }

    GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },

    init = function() {
        //alert('hi');
        if(AnalystSearch.length > 0) {
            EventsFunctions();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
