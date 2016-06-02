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
INFORMA.AnalystSearch = (function (window, $, namespace) {
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
        _template = "",
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, equalHeight, RenderChangeResult, ajaxCallonSector, AppendItems, AppendSearchResult, RenderAllSubSectorResults;

    equalHeight = function () {
        var EachView = jQuery('.analyst-views');
        EachView.each(function () {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                _maxHeight = 0,
                _padding = 50;
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }

    RenderAllSubSectorResults = function (data, sectorId) {
        var results = data,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystListTemplate !== "undefined") ? Templates.AnalystListTemplate : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }

        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.row').html(html);
        equalHeight();
       

        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').addClass('showLess');

        
        jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').slideToggle();
        return html;
    }

    EventsFunctions = function () {
        txtField.on('keyup', function () {
            var calcLength = jQuery(this).val().length,
                SectorValue = Sector.val();
            if (calcLength < 3 || SectorValue != 'default') {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
            }
        })

        Sector.chosen().on('change', function () {
            var _value = jQuery(this).val(),
                _text = jQuery(this).find("option:selected").text(),
                _txtField = txtField.val().length;
            if (_value === 'default' && _txtField < 3) {
                SubSector.parents('.sub-sector').addClass('disabled');
                submitBtn.addClass('disabled');
                SubSector.parents('.form-group').find('label').html('By Sub-Sector');
            } else {
                SubSector.parents('.sub-sector').removeClass('disabled');
                submitBtn.removeClass('disabled');
                SubSector.parents('.form-group').find('label').html('By ' + _text);
            }

            GetAjaxData(Urls.AnalystSearchDropDown, "Post", _value, RenderChangeResult, null, null);
            INFORMA.Spinner.Show(SubSector);
            SubSector.trigger("chosen:updated");

        })

        submitBtn.on('click', function () {
            var FieldArray = AnalystSearch.find("form").serializeArray();
            for (var key in FieldArray) {
                if (FieldArray[key].value == "default") {
                    FieldArray[key].value = null;
                }
            }
            var GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray));
            GetAjaxData(Urls.AnalystSearch, "Post", GetSerializeData, RenderSearchResult, null, null);
        })
    }

    RenderChangeResult = function (data) {
        var defaultValue = jQuery(SubSector.find('option')[0]);
        SubSector.empty();

        var html = '<option value=' + defaultValue.val() + '>' + defaultValue.text() + '</option>';

        for (var key in data) {
            html += '<option value=' + data[key].Value + '>' + data[key].Text + '</option>';
        }
        SubSector.html(html);
        SubSector.trigger("chosen:updated");
    }

    RenderSearchResult = function (data) {
        //INFORMA.SearchResults.RenderSearchResults(data);
        INFORMA.Spinner.Show($("body"));
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }
        productAnalystResults.html(html);
        equalHeight();
        ajaxCallonSector();
        return html;
    }

    AppendSearchResult = function (data) {
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }
        productAnalystResults.html(html);
        equalHeight();
        return html;
    }

    ajaxCallonSector = function () {
        var SectorBtn = jQuery('.btn-plus');

        SectorBtn.on('click', function () {
            var sectorId = jQuery(this).data('fetch');
            var FieldArray = AnalystSearch.find("form").serializeArray(),
                GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray)),
                _Object = JSON.parse(GetSerializeData);
            _Object.SectorID = sectorId;
            for (var key in _Object) {
                if (_Object[key] == "default") {
                    _Object[key] = null;
                }
            }
            if (!jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').hasClass('showLess')) {
                GetAjaxData(Urls.AnalystSearchAll, "Post", JSON.stringify(_Object), RenderAllSubSectorResults, null, sectorId);
            } else {
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').slideUp();
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').find('.analyst-list-container:nth-child(n+4)').remove();
                jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views').removeClass('showLess');
            }


        })
    },

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
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

    init = function () {
        //alert('hi');
        if (AnalystSearch.length > 0) {
            EventsFunctions();
            ajaxCallonSector();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
