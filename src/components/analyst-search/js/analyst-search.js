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
    	SubSector = AnalystSearch.find('.sub-sector select'),
    	submitBtn = AnalystSearch.find('.submit-btn'),
    	txtField = AnalystSearch.find('#name'),
        productAnalystResults = $('.product-analyst-results'),
    	Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, equalHeight, RenderChangeResult;

    equalHeight = function() {
        var EachView = jQuery('.analyst-views');
            EachView.each(function() {
                var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                    _maxHeight = 0,
                    _padding = 50;
                Items.each(function() {
                    var Height = jQuery(this).height();
                    if(Height > _maxHeight) {
                        _maxHeight = Height;
                    }
                })
                Items.css('height', _maxHeight+ _padding);
            })
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
        		SubSector.parents('.sub-sector').addClass('disabled');
        		submitBtn.addClass('disabled');
                SubSector.parents('.form-group').find('label').html('By All');
        	} else {
        		SubSector.parents('.sub-sector').removeClass('disabled');
        		submitBtn.removeClass('disabled');
                SubSector.parents('.form-group').find('label').html('By '+_value);
        	}
            SubSector.empty();
            var newOption = ['<option value="1">test</option>'];
              GetAjaxData(Urls.AnalystSearchDropDown, "Get", null, RenderChangeResult, null);
              INFORMA.Spinner.Show(SubSector);
              SubSector.trigger("chosen:updated");

        })

        submitBtn.on('click', function() {
            var FieldArray = AnalystSearch.find("form").serializeArray(),
                GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
            INFORMA.Spinner.Show($("body"));
        	GetAjaxData(Urls.AnalystSearch, "Get", GetSerializeData, RenderSearchResult, null);
        })
    }

    RenderChangeResult = function(data) {
        var html = "",
            options = data.options;

        for(var key in data.options) {
            html += '<option value='+data.options[key].value+'>'+data.options[key].name+'</option>';
        }
        SubSector.html(html);
        SubSector.trigger("chosen:updated");
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
        equalHeight();
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
