/*
 * Events Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.EventsViews = (function (window, $, namespace) {
    'use strict';
    //variables
    var EventsLists = $('.events-search'),
        Views = EventsLists.find('.views a'),
        CalendarView = EventsLists.find('.views a.icon-calendar'),
        ListView = EventsLists.find('.views a.icon-list-view'),
        Calendar = $('section[data-view="calendar-view"] .container[data-datetype="month"]'),
        Tile = $('section[data-view="tile-view"] .container'),
        List = $('section[data-view="list-view"] .container'),
        MonthSelect = $('select[name="month"]'),
        SectorSelect = $('select[name="sector"]'),
        Country = $('select[name="country"]'),
        Type = $('select[name="eventType"]'),
        NextButton = $('.fc-next-button'),
        MoreEvents = $('.btn-more-events'),
        _Start = moment(new Date()),
        _end = moment(_Start).add(1, 'years'),
        _previous = moment(_Start).subtract(1, 'years'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        PageNo = 1,
        ajaxMethod = 'POST',
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents, LoadMoreEvents, SetCalendarEvents, RenderParticularMonth, RenderChange, GetEventData, SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents, UnbindEvent, disabledEvent, SetLoadMoreEvents, mddmenu, setCurrentDate, populateMonthSelect, initFCYearView, initFCMonthView, getDayFormat, initCalendar, InformaEventTiles, InformaEventList, InformaFC, isDev;

    disabledEvent = function () {
        $('.register.disabled').click(function (e) {
            e.preventDefault();
        });
    },

    UnbindEvent = function () {
        $('.register.disabled').on('keydown', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
            }
        })
    },

    GetEventData = function (monthType) {
        var eventID = $("section#events"),
            eventsEndDate = $("select[name='month'] option:last-child")[0].value,
            obj;
        
        // TODO: efficiency: replace class check with data/variable
        if ($('body').hasClass('list-view') || $('body').hasClass('tile-view')) {
            obj = {
                data: JSON.stringify({
                    EventsStartDate: monthType,
                    SectorId: SectorSelect.val(),
                    eventType: Type.val(),
                    Country: Country.val(),
                    CurrentPage: eventID.data("currentpage"),
                    PageNo: PageNo,
                    EventsEndDate: eventsEndDate,
                    PageSize: List.data('count'),
                    ViewMode: 'list'
                })
            }
        } else {
            obj = {
                data: JSON.stringify({
                    MonthYear: monthType,
                    SectorId: SectorSelect.val(),
                    eventType: Type.val(),
                    Country: Country.val(),
                    CurrentPage: eventID.data("currentpage"),
                    ViewMode: 'calendar'
                })
            }
        }
        return obj;
    },

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($('body'));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
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

    EqualHeight = function () {
        var highestBox = 0,
            EachItem = Tile.find(".content-wrap"),
            padding = 0;
        // jQuery('section[data-view="list-view"]').show();
        EachItem.each(function () {
            if (jQuery(this).height() > highestBox) {
                highestBox = jQuery(this).height();
            }
        });
        // if (jQuery('body').hasClass('calendar-view')) {
        //     jQuery('section[data-view="list-view"]').hide();
        // }

        EachItem.height(highestBox + padding);
        if (INFORMA.global.device.viewportN == 2) {
            EachItem.height("auto");
        }
    },

    RenderChange = function (data) {
        CheckEvents(data);
        // SetCalendarEvents(data);
        // SetListEvents(data);
        InformaFC.EventData = data;
        InformaEventList.RenderView(data);
        InformaEventTiles.RenderView(data);
        NoEventsFound();
        UnbindEvent();
        disabledEvent();
        PageNo = 2;
    },

    LoadMoreEvents = function (data) {
        CheckEvents(data);
        // SetCalendarEvents(data);
        // SetLoadMoreEvents(data);
        InformaFC.EventData = data;
        InformaEventList.RenderView(data);
        InformaEventTiles.RenderView(data);
        NoEventsFound();
        UnbindEvent();
        disabledEvent();
        PageNo++;
    },

    // TODO: remove
    SetLoadMoreEvents = function (data) {
        var results = data.Events,
            html = "";

        // <list events: addevents>
        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.EventListingPage !== "undefined") ? Templates.EventListingPage : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.Month = HeaderText;
                Data.MonthField = Data.MonthYearField.split(" ")[0];
                html += ListTemplate({ results: Data });
            }
        }
        List.find('.events-container').append(html);
        // </list events>

        // no event check
        NoEventsFound();

        // equalise height for tiles
        EqualHeight();

        // <list events: setcount>
        List.attr('total-count', data.TotalResults);

        // <list events: updateviewmore>
        CheckCount();

        // <list events: updatenavigation>
        var ViewDateText = _Start,
            ViewDate = moment(new Date('1 ' + ViewDateText));

        if (ViewDate.format('MMMM YYYY') == _previous) {
            List.find('.previous').addClass('arrow-desabled');
        } else {
            List.find('.previous').removeClass('arrow-desabled');
        }

        if (ViewDate.format('MMMM YYYY') == _end) {
            List.find('.next').addClass('arrow-desabled');
        } else {
            List.find('.next').removeClass('arrow-desabled');
        }
    }

    // TODO: remove
    SetListEvents = function (data) {
        var results = data.Events,
            html = "";

        // <list events: addevents>
        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    TemplateName = (Templates.EventListingPage !== "undefined") ? Templates.EventListingPage : "",
                    ListTemplate = Handlebars.compile(TemplateName),
                    sDateMoment = moment(Data.EventStartDate),
                    eDateMoment = moment(Data.EventEndDate)
                
                // TODO: move to dedicated method if used elsewhere
                // if same day, single date type else date range type
                if (sDateMoment.isSame(eDateMoment, "day")) {
                    Data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '</div>';
                } else {
                    // if same month, same month range type else diff month range type
                    if (sDateMoment.isSame(eDateMoment, "month")) {
                        Data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '&nbsp;-&nbsp;' + eDateMoment.format("DD") + '</div>';
                    } else {
                        Data.DateRange = '<div class="date">' + sDateMoment.format("DD MMM") + '&nbsp;-&nbsp;' + eDateMoment.format("DD MMM") + '</div>';
                    }
                }
                
                html += ListTemplate({ results: Data });
            }
        }
        List.find('.events-container').html(html);
        // <list events>

        // no event check
        NoEventsFound();

        // equalise height for tiles
        EqualHeight();

        // <list events: setcount>
        List.attr('total-count', data.TotalResults);
        
        // <list events: updateviewmore>
        CheckCount();

        // <list events: updatenavigation>
        var ViewDateText = _Start,
            ViewDate = moment(new Date('1 ' + ViewDateText));

        if (ViewDate.format('MMMM YYYY') == _previous) {
            List.find('.previous').addClass('arrow-desabled');
        } else {
            List.find('.previous').removeClass('arrow-desabled');
        }

        if (ViewDate.format('MMMM YYYY') == _end) {
            List.find('.next').addClass('arrow-desabled');
        } else {
            List.find('.next').removeClass('arrow-desabled');
        }
    },

    CheckCount = function () {
        List.each(function () {

            var Count = $(this).data('count'),
                Items = parseInt($(this).attr('total-count')),
                listCount = $(this).find('.events-section').length;

            if (Items > Count) {
                $(this).next('.more-events').find('.btn-more-events').removeClass('hidden');
            } else {
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
            if (Items === 0) {
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
            if (Items === listCount) {
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
        })
    },

    RenderOnLoad = function () {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY'),
            PageTemplate = $("section#events").data("currentpage"),
            MonthYear = _Start.format('MMMM YYYY'),
            obj = GetEventData(MonthYear);
        // EqualHeight();
        CheckCount();
        _previousDate = _Start.toDate();
        GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderLoadEvents, null, null);
    },

    RenderLoadEvents = function (data) {
        CheckEvents(data);
        NoEventsFound();
        // SetCalendarEvents(data);
        InformaFC.EventData = data;
    },

    RenderParticularMonth = function (date) {
        var NextMonth = moment(new Date('1 ' + date)).format('MMMM YYYY');
        //      PageTemplate = $("section#events").data("CurrentPage");
        //             var obj = { 
        //                data:JSON.stringify({MonthYear: NextMonth, 
        //                              SectorId: SectorSelect.val(),
        //                  eventType: Type.val(),
        //                  CurrentPage:PageTemplate
        //               })
        //             } 
        //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null); 
        $('#Eventmonth').val(NextMonth);
        $('#Eventmonth').trigger("chosen:updated");
        var MonthYear = NextMonth,
            obj = GetEventData(NextMonth);
        GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
    },

    CheckEvents = function (data) {

        var results = data.Events,
            List = [];

        for (var key in results) {
            List = results[key];
        }

        if (List.length > 0) {
            jQuery('.no-results').hide();
        } else {
            jQuery('.no-results').show();
        }
    },

    // TODO: remove
    SetCalendarEvents = function (list) {
        Calendar.fullCalendar('removeEvents');
        var data = list.Events,
            _vp = INFORMA.global.device.viewportN;

        var EventList = [];

        for (var key = 0; key < data.length; key++) {
            EventList.push({
                "title": data[key].Title,
                // "start": new Date(data[key].EventDate),
                "start": moment(data[key].EventStartDate),
                "end": moment(data[key].EventEndDate),
                "State": data[key].State,
                "Country": data[key].Country,
                "Link": (data[key].FullDetail != null) ? (data[key].FullDetail.Url) : null,
                "Target": (data[key].FullDetail != null) ? (data[key].FullDetail.Target) : null,
                "EventText": (data[key].EventText == "FullyBooked") ? true : false
            })
        }
        if (_vp === 1 || _vp === 2) {
            $('td.fc-day-number').removeClass('events-now');
            $('td.fc-widget-content').removeClass('event-present');
        }
        // jQuery('section[data-view="calendar-view"]').show();
        // $('.date-views').show();
        Calendar.fullCalendar('gotoDate', _Start);
        for (var key = 0; key < EventList.length; key++) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
        // if (jQuery('body').hasClass('list-view')) {
        //     jQuery('section[data-view="calendar-view"]').hide();
        //     $('.date-views').hide();
        // }
    }

    SwitchEvents = function () {
        // TODO: this should just be a state change, ajax call should have already happened
        Views.on('click', function (e) {
            e.preventDefault();
            
            var ViewMode = jQuery(this).data('viewport');
            // Views.removeClass('active');
            // jQuery(this).addClass('active');
            jQuery('body').removeClass('list-view tile-view calendar-view').addClass(ViewMode);
            // $('.date-views').hide();
            // jQuery('.events-list').hide();

            // jQuery('section[data-view="' + ViewMode + '"]').show().siblings('section[data-view]').hide();

            // do calendar render on User action because FC requires visibility to populate
            if (ViewMode === 'calendar-view') InformaFC.RenderView();
            if (ViewMode === 'tile-view') InformaEventTiles.EqualHeight();

            // var date = new Date(),
            //     DatePass = moment(date).format('MMMM YYYY'),
            //     PageTemplate = $("section#events").data("currentpage"),
            //     MonthYear = _Start.format('MMMM YYYY');
            // EqualHeight();
            CheckCount();
            // var obj = GetEventData(_Start.format('MMMM YYYY'));
            // _previousDate = _Start.toDate();
            // GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
            NoEventsFound();
        });

        // $('.date-views input[type=radio][name=dview]').change(function() {
        //     Calendar.hide();
        //     Calendar = $('section[data-view="calendar-view"] .container[data-datetype="' + this.value + '"');
        //     Calendar.show();
        //     // if (this.value === 'year') {
        //     //     initFCYearView();
        //     // }
        // });



        MonthSelect.on('change', function () {
            setCurrentDate();
        });

        Country.on('change', function () {
            // var value = jQuery(this).val(),
            //     check = moment(new Date('1 ' + MonthSelect.val()));
            // jQuery('section[data-view="calendar-view"]').show();
            // $('.date-views').show();
            // Calendar.fullCalendar('gotoDate', _Start);
            // if (jQuery('body').hasClass('list-view')) {
            //     jQuery('section[data-view="calendar-view"]').hide();
            //     $('.date-views').hide();
            // }
            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: Type.val(),
            //    Country: jQuery(this).val()})
            // }

            var MonthYear = _Start,
                obj = GetEventData(MonthYear);

            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        });

        Type.on('change', function () {
            // var value = jQuery(this).val(),
            //     check = moment(new Date('1 ' + MonthSelect.val()));
            // jQuery('section[data-view="calendar-view"]').show();
            // $('.date-views').show();
            // Calendar.fullCalendar('gotoDate', _Start);
            // if (jQuery('body').hasClass('list-view')) {
            //     jQuery('section[data-view="calendar-view"]').hide();
            //     $('.date-views').hide();
            // }

            var MonthYear = _Start,
                obj = GetEventData(MonthYear);

            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: jQuery(this).val(),
            //    Country: Country.val()})
            // }

            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })


        SectorSelect.on('change', function () {

            var MonthYear = MonthSelect.val(),
                obj = GetEventData(_Start);

            // var obj = {
            //   data:JSON.stringify({  MonthYear: MonthSelect.val(),
            //     SectorId: jQuery(this).val(),
            //     eventType: Type.val(),
            //   Country: Country.val()})
            // }

            _previousDate = _Start.toDate();
            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })

    },

    NoEventsFound = function () {
        // TODO: code cleanup: why the explicit references to jQuery?
        var Container = jQuery('.events-container'),
            Items = Container.find('.events-section');

        if (Items.length > 0) {
            jQuery('.no-result').addClass('hidden');
            $('.fc-view-container').removeClass('hidden');
        } else {
            jQuery('.no-result').removeClass('hidden');
            $('.fc-view-container').addClass('hidden');
        }
    },

    // TODO: remove
    MoreEventsFunc = function () {
        MoreEvents.on('click', function () {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.find('.container').data('count'),
                MonthYear = MonthSelect.val(),
                obj = GetEventData(MonthYear);
            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), LoadMoreEvents, null, $(this));
        });
    },

    ListChangeEvents = function () {
        $(document).on('click', 'section[data-view="list-view"] .next', function () {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                ViewDate = new Date('1 ' + DateText),
                prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');
            $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
            $('#Eventmonth').val(prevMonth);
            $('#Eventmonth').trigger("chosen:updated");
            var MonthYear = prevMonth,
                obj = GetEventData(MonthYear);
            // var obj = {
            //    data:JSON.stringify({  MonthYear: prevMonth,
            //     SectorId: SectorSelect.val(),
            //    Country: Country.val(),
            //     eventType: Type.val()})
            // }
            // jQuery('section[data-view="calendar-view"]').show();
            // Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
            // jQuery('section[data-view="calendar-view"]').hide();
            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

        });
        $(document).on('click', '.fc-next-button, .fc-prev-button', function () {
            var currentMonth = _Start;
            RenderParticularMonth(currentMonth);
        });
        $(document).on('click', 'section[data-view="list-view"] .previous', function () {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                ViewDate = new Date('1 ' + DateText),
                prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');
            $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
            $('#Eventmonth').val(prevMonth);
            $('#Eventmonth').trigger("chosen:updated");
            var MonthYear = prevMonth,
                obj = GetEventData(MonthYear);

            // var obj = {
            //   data:JSON.stringify({   MonthYear: prevMonth,
            //     SectorId: SectorSelect.val(),
            //   Country: Country.val(),
            //     eventType: Type.val()})
            // }
            // jQuery('section[data-view="calendar-view"]').show();
            // Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
            // jQuery('section[data-view="calendar-view"]').hide();
            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

        });
    },

    /* mddmenu = {
        els: $('.mddmenu'),
        Init: function () {
            this.els.each(function () {
                var $el = $(this)

                // usage $('#id').data('selected').innerText
                $el.data('selected', $el.find('.mddselected')[0]);

                $(document).on('click', function (evt) {
                    if($el.data('selected') === evt.target) {
                        $el.toggleClass('open');
                    } else {
                        $el.removeClass('open');
                    }
                });

                
            });
        }
    }, */

    setCurrentDate = function (dateVal = null) {
        if (!dateVal) dateVal = $('select#Eventmonth').val();
        _Start = moment(dateVal);
        _end = moment(_Start).add(1, 'years');
        _previous = moment(_Start).subtract(1, 'years');
        // var value = jQuery(this).val(),
        //     check = moment(new Date('1 ' + value));
        // jQuery('section[data-view="calendar-view"]').show();
        // $('.date-views').show();
        // Calendar.fullCalendar('gotoDate', _Start);
        // if (jQuery('body').hasClass('list-view')) {
        //     jQuery('section[data-view="calendar-view"]').hide();
        //     $('.date-views').hide();
        // }
        var obj = GetEventData(_Start);
        GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
        NoEventsFound();
    }

    populateMonthSelect = function () {
        var $monthSelect = $('select#Eventmonth'),
            PrevMonthCount = _Start.diff(_previous, 'months'),
            loopLength = _end.diff(_previous, 'months'),
            $monthOpt, monthCount, currMonth;

        // remove existing 
        $monthSelect.chosen('destroy');
        $monthSelect.empty();

        for (monthCount = 0; monthCount < loopLength; monthCount++) {
            // new option tag
            $monthOpt = $('<option />');

            // define and populate month value
            currMonth = moment(_previous).add(monthCount, 'month');
            $monthOpt.attr('value', currMonth.format('MMMM YYYY'));
            $monthOpt.text(currMonth.format('MMMM YYYY'));

            // if current month, define as selected
            if (monthCount === PrevMonthCount) {
                $monthOpt.attr('selected', true);
            }

            // append to select
            $monthSelect.append($monthOpt);
        }

        // re setup chosen to remove search function
        $monthSelect.chosen({
            width: '100%',
            disable_search: true
        });

        // scroll chosen drowpdown to selected option + 2, on open
        $monthSelect.chosen().on('chosen:showing_dropdown', function (evt, params) {
            var $resultContainer = params.chosen.dropdown.children('.chosen-results'),
                $activeResults = $resultContainer.children('.active-result'),
                $selected = $activeResults.filter('.result-selected'),
                selectedInd = $activeResults.index($selected),
                targInd = selectedInd > 2 ? selectedInd - 2 : 0,
                $targ = $activeResults.eq(targInd);

            $resultContainer.scrollTop(0).scrollTop($targ.position().top);
        });

        // update chosen field
        $monthSelect.trigger('chosen:updated');
    }

    // TODO: remove
    initFCYearView = function () {
        // create a mini FCs month view for each month, feed in each the data for each month, layout, click through to month view
        // refactor, get current month from date select field
        var $rowContainer = $('<div class="row" />'),
            loopLength = _end.diff(_Start, 'months'),
            monthCount, $monthContainer, currMonth;
        
        Calendar.empty();
        Calendar.append($rowContainer);
        for (monthCount = 0; monthCount < loopLength; monthCount++) {
            currMonth = moment(_Start).add(monthCount, 'month');
            $monthContainer = $('<div class="month col-xs-12 col-sm-6 col-md-4" data-month="' + currMonth.format('MMMM YYYY') + '" />');

            $rowContainer.append($monthContainer);

            $monthContainer.fullCalendar({
                defaultDate: currMonth,
                header: {left: '', center: 'title', right: ''},
                titleFormat: 'MMMM YYYY',
                dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
            });
        }

        Calendar.addClass("year-ready");
    }


    // TODO: remove
    initFCMonthView = function () {
        // put code from "RenderLoadEvents" here, refactor? or is old function redundant?
    }

    // TODO: remove
    initCalendar = function (activeView = 'month') {
        var $activeView = Calendar.children('[data-datetype="' + activeView + '"]');

        // set data on global var for external re-reference
        Calendar.data('view', $activeView);


    }

    // TODO: efficieny: combine with InformaEventList Object. Prerequisites: add switch method, update HTML
    InformaEventTiles = {
        Container: $('section[data-view="tile-view"] .container'),
        TemplateName: (Templates.EventpageTileviewTemplate !== "undefined") ? Templates.EventpageTileviewTemplate : "",
        MoreBtn: null,
        Template: null,
        Init: function() {
            this.MoreBtn = this.Container.next('.more-events').find('.btn-more-events');
            this.Template = Handlebars.compile(this.TemplateName);

            // listeners
            this.MoreBtn.click(function () {
                var MonthYear = MonthSelect.val(),
                    obj = GetEventData(MonthYear);
                GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), LoadMoreEvents, null, $(this));
            });
        },
        RenderView: function(data) {
            this.AddEvents(data.Events);
            this.count = data.TotalResults;
            this.UpdateMoreBtn();
            this.UpdateNav();
        },
        AddEvents: function(results) {
            var evtObj,
                html = ''

            // TODO: efficiency: replace with for i loop for better performance
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    evtObj = results[key];
                    
                    this.AddDateToEvent(evtObj);
                    html += this.Template({ results: evtObj });
                }
            }
            this.Container.find('.events-container').append(html);
        },
        AddDateToEvent: function(data) {
            var sDateMoment = moment(data.EventStartDate),
                eDateMoment = moment(data.EventEndDate)
            
            // if same day, single date type else date range type
            if (sDateMoment.isSame(eDateMoment, "day")) {
                data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '</div>';
            } else {
                // if same month, same month range type else diff month range type
                if (sDateMoment.isSame(eDateMoment, "month")) {
                    data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '&nbsp;-&nbsp;' + eDateMoment.format("DD") + '</div>';
                } else {
                    data.DateRange = '<div class="date">' + sDateMoment.format("DD MMM") + '&nbsp;-&nbsp;' + eDateMoment.format("DD MMM") + '</div>';
                }
            }
        },
        UpdateMoreBtn: function() {
            var dataCount = this.Container.data('count'),
                elActualCount = this.Container.find('.events-section').length;

            if (this.count > dataCount) {
                this.MoreBtn.removeClass('hidden');
            } else {
                this.MoreBtn.addClass('hidden');
            }
            if (this.count === 0) {
                this.MoreBtn.addClass('hidden');
            }
            if (this.count === elActualCount) {
                this.MoreBtn.addClass('hidden');
            }
            
        },
        UpdateNav: function() {
            // var ViewDateText = _Start,
            //     ViewDate = moment(new Date('1 ' + ViewDateText));

            if (_Start.isSame(_previous, 'month')) {
                this.Container.find('.previous').addClass('arrow-desabled');
            } else {
                this.Container.find('.previous').removeClass('arrow-desabled');
            }

            if (_Start.isSame(_end, 'month')) {
                this.Container.find('.next').addClass('arrow-desabled');
            } else {
                this.Container.find('.next').removeClass('arrow-desabled');
            }
        },
        EqualHeight: function () {
            var highestBox = 0,
                EachItem = this.Container.find(".events-section"),
                padding = 0;
            // jQuery('section[data-view="list-view"]').show();
            EachItem.each(function () {
                if (jQuery(this).height() > highestBox) {
                    highestBox = jQuery(this).height();
                }
            });
            // if (jQuery('body').hasClass('calendar-view')) {
            //     jQuery('section[data-view="list-view"]').hide();
            // }
    
            EachItem.height(highestBox + padding);
            if (INFORMA.global.device.viewportN == 2) {
                EachItem.height("auto");
            }
        },
        set count(cVal) {
            // set total-count attr
            this.Container.attr('total-count', cVal);
            // this.UpdateMoreBtn();
            // this.UpdateNav();
        },
        get count() {
            return parseInt(this.Container.attr('total-count'));
        }
    }

    InformaEventList = {
        Container: $('section[data-view="list-view"] .container'),
        TemplateName: (Templates.EventpageListviewTemplate !== "undefined") ? Templates.EventpageListviewTemplate : "",
        MoreBtn: null,
        Template: null,
        Init: function() {
            this.MoreBtn = this.Container.next('.more-events').find('.btn-more-events');
            this.Template = Handlebars.compile(this.TemplateName);

            // listeners
            this.MoreBtn.click(function () {
                var MonthYear = MonthSelect.val(),
                    obj = GetEventData(MonthYear);
                GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), LoadMoreEvents, null, $(this));
            });
        },
        RenderView: function(data) {
            this.AddEvents(data.Events);
            this.count = data.TotalResults;
            this.UpdateMoreBtn();
            this.UpdateNav();
        },
        AddEvents: function(results) {
            var evtObj,
                html = ''

            // TODO: efficiency: replace with for i loop for better performance
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    evtObj = results[key];
                    
                    this.AddDateToEvent(evtObj);
                    html += this.Template({ results: evtObj });
                }
            }
            this.Container.find('.events-container').append(html);
        },
        AddDateToEvent: function(data) {
            var sDateMoment = moment(data.EventStartDate),
                eDateMoment = moment(data.EventEndDate)
            
            // if same day, single date type else date range type
            if (sDateMoment.isSame(eDateMoment, "day")) {
                data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '</div>';
            } else {
                // if same month, same month range type else diff month range type
                if (sDateMoment.isSame(eDateMoment, "month")) {
                    data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '&nbsp;-&nbsp;' + eDateMoment.format("DD") + '</div>';
                } else {
                    data.DateRange = '<div class="date">' + sDateMoment.format("DD MMM") + '&nbsp;-&nbsp;' + eDateMoment.format("DD MMM") + '</div>';
                }
            }
        },
        UpdateMoreBtn: function() {
            var dataCount = this.Container.data('count'),
                elActualCount = this.Container.find('.events-section').length;

            if (this.count > dataCount) {
                this.MoreBtn.removeClass('hidden');
            } else {
                this.MoreBtn.addClass('hidden');
            }
            if (this.count === 0) {
                this.MoreBtn.addClass('hidden');
            }
            if (this.count === elActualCount) {
                this.MoreBtn.addClass('hidden');
            }
            
        },
        UpdateNav: function() {
            // var ViewDateText = _Start,
            //     ViewDate = moment(new Date('1 ' + ViewDateText));

            if (_Start.isSame(_previous, 'month')) {
                this.Container.find('.previous').addClass('arrow-desabled');
            } else {
                this.Container.find('.previous').removeClass('arrow-desabled');
            }

            if (_Start.isSame(_end, 'month')) {
                this.Container.find('.next').addClass('arrow-desabled');
            } else {
                this.Container.find('.next').removeClass('arrow-desabled');
            }
        },
        set count(cVal) {
            // set total-count attr
            this.Container.attr('total-count', cVal);
            // this.UpdateMoreBtn();
            // this.UpdateNav();
        },
        get count() {
            return parseInt(this.Container.attr('total-count'));
        }
    }

    InformaFC = {
        EventData: null,
        ActiveContainer: null,
        ViewElements: null,
        Container: $('section[data-view="calendar-view"] .container'),
        ViewSwitch: $('.date-views'),
        // setup year and month view switch
        Init: function () {
            var that = this;
            // set default
            that.ViewType = 'month';
            // init switch listener
            that.ViewSwitch.find('[name=dview]').change(function () {
                that.SwitchYearMonthView(this.value);
            });
        },
        SwitchYearMonthView: function (type) {
            this.ViewType = type;
            this.RenderView();
        },
        RenderView: function () {
            this.InitFC();
            this.RenderFCEvents();
            this.GoToStartDate();
        },
        InitFC: function () {
            var that = this,
                initOptions,
                _vp = INFORMA.global.device.viewportN,
                vmLenInd;

            // if FC rendered then just update the date, else build it (build once)
            if (that.ActiveContainer.attr('rendered')) return;

            switch (that.ViewType) {
                case 'month':
                    initOptions = {
                        header: { left: 'prev', center: 'title', right: 'next' },
                        eventLimit: true, // Limits the number of events displayed on a day. The rest will show up in a popover.
                        contentHeight: _vp === 2 ? 100 : 805, // Sets the height of the view area of the calendar.
                        weekMode: 'liquid', //Determines the number of weeks displayed in a month view. Also determines each week’s height.
                        // firstDay: 1, // The day that each week begins.
                        dayNamesShort: _vp === 2 ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : _vp === 1 ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'] : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], // Abbreviated names of days-of-week.
                        dayClick: function (date, jsEvent, view) { // Triggered when the user clicks on a date or a time.
                            var _vp = INFORMA.global.device.viewportN;
            
                            if (_vp === 2 || _vp === 1) {
                                var selectedDate = date.format(),
                                    parentNode = $(this).parents('.fc-row.fc-widget-content'),
                                    DateAttr = $(this).data('date'),
                                    Container = $(this).parents('.fc-view-container'),
                                    ItemList = null;
            
                                Container.find('.fc-widget-content').removeClass('open');
                                Container.toggleClass('open-event');
                                Container.find('.events-wrap').remove();
                                Container.find('.fc-day-number').css('color', '#6a7285');
                                if ($(this).hasClass('event-present')) {
                                    ItemList = Container.find('.events[data-date="' + DateAttr + '"]').clone();
                                    ItemList.addClass('cloned');
                                    parentNode.after('<div class="events-wrap"></div>');
                                } else {
                                    parentNode.after('');
                                }
            
                                if (Container.hasClass('open-event')) {
                                    Container.find('.fc-widget-content[data-date="' + DateAttr + '"]').addClass('open');
                                    Container.find('.fc-day-number[data-date="' + DateAttr + '"]').css('color', '#fff');
                                    Container.find('.events-wrap').html(ItemList);
                                } else {
                                    Container.find('.fc-widget-content[data-date="' + DateAttr + '"]').removeClass('open');
                                    Container.find('.events-wrap').remove();
                                }
            
                                ItemList = "";
                                Container.find('.events-wrap').hide().slideDown();
                            }
            
                        },
                        eventAfterAllRender: function (view) { // Triggered after all events have finished rendering.
                            var _vp = INFORMA.global.device.viewportN;

                            // add classes for day click in mobile
                            if (_vp === 2 || _vp === 1) {
            
                                var Events = $('.fc-view-container .events');
            
                                Events.each(function () {
                                    var DateField = $(this).data('date');
                                    $('td.fc-day-number[data-date="' + DateField + '"]').addClass('events-now');
                                    $('td.fc-widget-content[data-date="' + DateField + '"]').addClass('event-present');
                                })
                            }
            
                            // add month short month text to other month for desktop
                            if (_vp === 0) {
                                var OtherMonths = $('.fc-day-number.fc-other-month');
            
                                OtherMonths.each(function () {
                                    var DateView = $(this).data('date'),
                                        Month = moment(new Date(DateView)).format('MMM'),
                                        Dates = moment(new Date(DateView)).format('DD');
            
                                    $(this).html(Dates + '<sup>\/' + Month + '</sup>');
                                })
                            }
                        },
                        eventRender: function (event, element, view) { // Triggered while an event is being rendered. A hook for modifying its DOM.
                            var CurrentDate = new Date(),
                                ItemDate = new Date(event.start._i),
                                DateAttr = moment(ItemDate).format('YYYY-MM-DD'),
                                CountryText = "",
                                ViewDate = view;
            
                            if (event.Country != null) {
                                CountryText = event.Country;
                            }
            
                            if (!event.EventText && event.Link !== null) {
            
                                if (moment(CurrentDate) > moment(ItemDate)) {
                                    if (moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                                        return $('<div data-date="' + DateAttr + '" class="events current"><p class="title"><a href="' + event.Link + '" target="' + event.Target + '">' + event.title + '</a></p><p class="country">' + CountryText + '</p></div>');
                                    } else {
                                        return $('<div data-date="' + DateAttr + '" class="events disabled"><p class="title"><a href="' + event.Link + '" target="' + event.Target + '">' + event.title + '</a></p><p class="country">' + CountryText + '</p></div>');
                                    }
                                } else {
                                    return $('<div data-date="' + DateAttr + '" class="events"><p class="title"><a href="' + event.Link + '" target="' + event.Target + '">' + event.title + '</a></p><p class="country">' + CountryText + '</p></div>');
                                }
                            } else {
                                return $('<div data-date="' + DateAttr + '" class="events disabled"><p class="title"><a href="' + event.Link + '" target="' + event.Target + '">' + event.title + '</a></p><p class="country">' + CountryText + '</p></div>');
                            }
                        }
                    }
                    break;
                case 'year':
                    initOptions = {
                        header: { left: '', center: 'title', right: '' },
                        eventLimit: true,
                        titleFormat: 'MMM YYYY',
                        dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        eventAfterRender: function (event, element, view) {
                            var $fcView = view.el,
                                eventDate = event.start.format('YYYY-MM-DD'),
                                $activeDayCell = element.closest('.fc-content-skeleton').find('.fc-day-number[data-date=' + eventDate + ']');

                            // add classes for styling on month + days that contain an event
                            // add active class to mini month fc
                            $fcView.addClass('active');
                            // add class to day
                            $activeDayCell.addClass('active');

                            if ($fcView.attr('click-added')) return;
                            $fcView.click(function () {
                                console.log('do month view for ' + event.start.format('MMM YYYY'));
                            });
                            $fcView.attr('click-added', true);
                        }
                    }
                    break;
            }
            // loop for year view, will run once for month view
            vmLenInd = that.ViewElements.length - 1;
            that.ViewElements.each(function (index) {
                // set the start date for each FC
                initOptions.defaultDate = moment(_Start).add(index, 'months');
                $(this).fullCalendar(initOptions);

                // apply rendered attribute on last loop
                if (index === vmLenInd) 
                    that.ActiveContainer.attr('rendered', 'true');
            });
        },
        GoToStartDate: function () {
            var fcStartDate = this.ViewElements.fullCalendar('getDate');
            // if the date already matches _Start dont set
            if (fcStartDate.isSame(_Start, 'month')) return;
            // set all FCs based on _Start, for month view loop runs once
            this.ViewElements.each(function (index) {
                var currMonth = moment(_Start).add(index, 'months');
                $(this).fullCalendar('gotoDate', currMonth);
            });
        },
        // replaces SetCalendarEvents
        // TODO: cant happen on page init because fullcalendar doesnt exist, need to set data post render AND when even data changes
        RenderFCEvents () {
            var that = this,
                events = this.EventData.Events,
                evtLength = events.length,
                eventCount = 0,
                eventObj = {},
                eventFCObj = {},
                evtStartDate,
                evtEndDate,
                startEndDiff,
                multiDayCount,
                yvMonthDate,
                vmLenInd;

            if (that.ActiveContainer.attr('events-loaded')) return;

            // setAllEvents to each element
            vmLenInd = that.ViewElements.length - 1;
            that.ViewElements.each(function (index) {
                $(this).fullCalendar('removeEvents');
                // TODO: efficiency: granulate logic into seperate methods
                for (eventCount = 0; eventCount < evtLength; eventCount++) {
                    eventObj = events[eventCount];
                    evtStartDate = moment(eventObj.EventStartDate);
                    evtEndDate = moment(eventObj.EventEndDate);
                    
                    // for multiday events, create a new event for each day
                    if (evtStartDate.isSame(evtEndDate, 'day')) {
                        eventFCObj = {
                            "title": eventObj.Title,
                            "start": evtStartDate,
                            "State": eventObj.State,
                            "Country": eventObj.Country,
                            "Link": (eventObj.FullDetail != null) ? (eventObj.FullDetail.Url) : null,
                            "Target": (eventObj.FullDetail != null) ? (eventObj.FullDetail.Target) : null,
                            "EventText": (eventObj.EventText == "FullyBooked") ? true : false
                        };

                        // only add events in month of mini month FC in year view
                        if (that.ViewType === 'year') {
                            // TODO: efficiency: set as data obj to reduce FC calls
                            yvMonthDate = $(this).fullCalendar('getDate');
                            if (evtStartDate.isSame(yvMonthDate, 'month')) {
                                $(this).fullCalendar('renderEvent', eventFCObj, true);
                            }
                        } else {
                            $(this).fullCalendar('renderEvent', eventFCObj, true);
                        }
                    } else {
                        startEndDiff = evtEndDate.diff(evtStartDate, 'day');
                        for (multiDayCount = 0; multiDayCount <= startEndDiff; multiDayCount++) {
                            eventFCObj = {
                                "title": eventObj.Title,
                                "start": moment(evtStartDate).add(multiDayCount, 'days'),
                                "State": eventObj.State,
                                "Country": eventObj.Country,
                                "Link": (eventObj.FullDetail != null) ? (eventObj.FullDetail.Url) : null,
                                "Target": (eventObj.FullDetail != null) ? (eventObj.FullDetail.Target) : null,
                                "EventText": (eventObj.EventText == "FullyBooked") ? true : false
                            };

                            // only add events in month of mini month FC in year view
                            if (that.ViewType === 'year') {
                                yvMonthDate = $(this).fullCalendar('getDate');
                                if (evtStartDate.isSame(yvMonthDate, 'month')) {
                                    $(this).fullCalendar('renderEvent', eventFCObj, true);
                                }
                            } else {
                                $(this).fullCalendar('renderEvent', eventFCObj, true);
                            }
                        }
                    }
                }

                if (index === vmLenInd) {
                    that.ActiveContainer.attr('events-loaded', 'true');
                }
            });

        },
        set ViewType (type) {
            // disable the current ActiveContainer if already set
            if (this.ActiveContainer && this.ActiveContainer.length > 0) {
                this.ActiveContainer.removeClass('active');
            }
            // set active view container based on data-datetype attr
            this.ActiveContainer = this.Container.filter('[data-datetype="' + type + '"]');
            this.ActiveContainer.addClass('active');
            // then children of above
            this.ViewElements = this.ActiveContainer.find('.fccal');
        },
        get ViewType () {
            return this.ActiveContainer.attr('data-datetype');
        }
    }

    isDev = function () {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    init = function () {
        if(isDev()) {
            ajaxMethod = 'GET';
            setCurrentDate('July 2019');
        }

        if (EventsLists.length > 0) {
            RenderOnLoad();
            populateMonthSelect();
            InformaEventList.Init();
            InformaEventTiles.Init();
            InformaFC.Init();
            // initCalendar();
            SwitchEvents();
            GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(GetEventData(_Start.format('MMMM YYYY'))), RenderChange, null, null);
            MoreEventsFunc();
            ListChangeEvents();
            UnbindEvent();
            disabledEvent();
            // mddmenu.Init();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());