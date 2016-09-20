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
        resetBtn = AnalystSearch.find('.btn-reset'),
        txtField = AnalystSearch.find('#name'),
        productAnalystResults = $('.product-analyst-results'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _template = "",
    //methods
    init, GetAjaxData, RenderSearchResult, EventsFunctions, checkButtonMore, equalHeight, RenderChangeResult, ajaxCallonSector, AppendItems, AppendSearchResult, RenderAllSubSectorResults;

    equalHeight = function () {
        var EachView = jQuery('.analyst-views');
        EachView.each(function () {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                ItemsHeader = jQuery(this).find('.analyst-list-container .analyst-details'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _padding = 50;
            ItemsHeader.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function () {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
        })
    }

    checkButtonMore = function () {
        var _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp),
            Items = productAnalystResults.find('.analyst-views');

            Items.each(function () {
                var Data = $(this).find('.btn-plus').attr('data-count');

                if(Data <= _limit) {
                    $(this).find('.btn-plus').addClass('hidden');
                }
            })


    }

    RenderAllSubSectorResults = function (data, sectorId) {
        var results = data,
            html = "",
            Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
            _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp) + 1;

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystTemplate !== "undefined") ? Templates.AnalystTemplate : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }

        Parent.find('.row').html(html);
        equalHeight();
        Parent.addClass('showLess');
        Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideToggle();
        return html;
    }

    EventsFunctions = function () {
        txtField.on('keyup', function () {
            var calcLength = jQuery(this).val().length,
                SectorValue = Sector.val();
            if (calcLength < 3 && SectorValue == 'default') {
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
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
            }

            if (_value == "default") {
                SubSector.parents('.sub-sector').addClass('disabled');
                SubSector.parents('.form-group').find('label').html('By Sub-Sector');
            }
            else {
                SubSector.parents('.sub-sector').removeClass('disabled');
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

        resetBtn.on('click', function (e) {
            e.preventDefault();
            var _Object = {
                "Name": null,
                "Sector": null
            }
            AnalystSearch.find('#name').val('');
            //$('select[name="Sector"]').prop('selectedIndex',0);
            Sector.prop('selectedIndex',0).trigger('chosen:updated').trigger('change');
            //$('select[name="SubSector"]').prop('selectedIndex',0);
            GetAjaxData(Urls.AnalystSearch, "Post", JSON.stringify(_Object), RenderSearchResult, null, null);
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
        if(Object.getOwnPropertyNames(results).length === 0) {
            $('.NoRecords').removeClass('hidden');
        } else {
            $('.NoRecords').addClass('hidden');
        }
        productAnalystResults.html(html);
        checkButtonMore();
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
                _Object = JSON.parse(GetSerializeData),
                Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
                _vp = INFORMA.global.device.viewport,
                _limit = parseInt(productAnalystResults.data(_vp)) + 1;

            _Object.SectorID = sectorId;
            for (var key in _Object) {
                if (_Object[key] == "default") {
                    _Object[key] = null;
                }
            }
            if (!Parent.hasClass('showLess')) {
                GetAjaxData(Urls.AnalystSearchAll, "Post", JSON.stringify(_Object), RenderAllSubSectorResults, null, sectorId);
            } else {
                Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideUp();
                Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').remove();
                Parent.removeClass('showLess');
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
            checkButtonMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
