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
INFORMA.EventsViews = (function(window, $, namespace) {
    'use strict';
    //variables
    var EventsLists = $('.events-search'),
        Views = EventsLists.find('.views a'),
        CalendarView = EventsLists.find('.views a.icon-calendar'),
        ListView = EventsLists.find('.views a.icon-list-view'),
        Calendar = $('section[data-view="calendar-view"] .container'),
        List = $('section[data-view="list-view"] .container'),
        MonthSelect = $('select[name="month"]'),
        SectorSelect = $('select[name="sector"]'),
        Country = $('select[name="country"]'),
        Type = $('select[name="eventType"]'),
        NextButton = $('.fc-next-button'),
        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMMM YYYY'),
        _end = moment(_Start).add(11, 'months').format('MMMM YYYY'),
        _previous = moment(_Start).add(-11, 'months').format('MMMM YYYY'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        PageNo = 2,
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents,LoadMoreEvents,
        SetCalendarEvents, RenderParticularMonth, RenderChange, GetEventData, GetDefaultEventData,
        SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents, UnbindEvent, disabledEvent,SetLoadMoreEvents;

    disabledEvent = function(){
        $('.register.disabled').click(function(e){
            e.preventDefault();
        });
    },
    
    UnbindEvent = function() {
        $('.register.disabled').on('keydown', function(e) {
            if (e.keyCode === 13 || e.which===13) {
                e.preventDefault();
            }   
        })
    },
            
    GetEventData = function(monthType) {
        var eventID = $("section#events"),
            eventsEndDate = $("select[name='month'] option:last-child")[0].value,
            obj;
            if($('body').hasClass('list-view')){
                obj = {
                    data:JSON.stringify({ EventsStartDate:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       PageNo: 1,
                       EventsEndDate: eventsEndDate,
                       PageSize: List.data('count'),
                       ViewMode: 'list'
                    })
                }
            }    
            else{
                obj = {
                   data:JSON.stringify({ MonthYear:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       ViewMode: 'calendar'
                    })
                }
            }   
            return obj;        
    },
    
    GetDefaultEventData  = function(monthType) {
        var eventID = $("section#events"),
            eventsEndDate = $("select[name='month'] option:last-child")[0].value,
            obj;
            if($('body').hasClass('list-view')){
                obj = {
                   data:JSON.stringify({ 
                       EventsStartDate:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       PageNo: PageNo,
                       EventsEndDate: eventsEndDate,
                       PageSize: List.data('count'),
                       ViewMode: 'list'
                    })
                }
            }    
            else{
                obj = {
                   data:JSON.stringify({ 
                       MonthYear:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       ViewMode: 'calendar'
                    })
                }
            }   
        return obj;        
    },
    
    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($('body'));
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

    EqualHeight = function(){
       var highestBox = 0,
        EachItem = List.find(".content-wrap"),
        padding = 0;
        jQuery('section[data-view="list-view"]').show();
        EachItem.each(function(){
            if(jQuery(this).height() > highestBox){
                highestBox = jQuery(this).height();
            }
        });
        if(jQuery('body').hasClass('calendar-view')) {
            jQuery('section[data-view="list-view"]').hide();
        }

        EachItem.height(highestBox + padding);
        if(INFORMA.global.device.viewportN == 2) {
            EachItem.height("auto");
        }
    },
    
    RenderChange = function(data) {
        CheckEvents(data);
        SetCalendarEvents(data);
        SetListEvents(data);
        UnbindEvent();
        disabledEvent();
        PageNo = 2;
    },

    LoadMoreEvents = function(data){
        CheckEvents(data);
        SetCalendarEvents(data);
        SetLoadMoreEvents(data);
        UnbindEvent();
        disabledEvent();
        PageNo++;
    },

    SetLoadMoreEvents = function(data){
        var results = data.Events,
            html = "";
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
            NoEventsFound();
            EqualHeight();
            List.attr('total-count',data.TotalResults);
            CheckCount();

            var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date('1 '+ViewDateText));

            if(ViewDate.format('MMMM YYYY') == _previous) {
                List.find('.previous').addClass('arrow-desabled');
            } else {
                List.find('.previous').removeClass('arrow-desabled');
            }

            if(ViewDate.format('MMMM YYYY') == _end) {
                List.find('.next').addClass('arrow-desabled');
            } else {
                List.find('.next').removeClass('arrow-desabled');
            }
    }

    SetListEvents    = function(data) {
        var results = data.Events,
              html = "";

            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    var Data = results[key],
                        HeaderText = key,
                        TemplateName = (Templates.EventListingPage !== "undefined") ? Templates.EventListingPage : "",
                    ListTemplate = Handlebars.compile(TemplateName),
                    sDateMoment = moment(Data.EventStartDate),
                    eDateMoment = moment(Data.EventEndDate)
                
                // TODO: move to dedicated method if used elsewhere
                // if same day, single date type else date range type
                if (sDateMoment.isSame(eDateMoment, "day")) {
                    Data.DateRange = '<div class="date">' + sDateMoment.format("DD") + ' ' + sDateMoment.format("MMM") + '</div>';
                } else {
                    // if same month, same month range type else diff month range type
                    if (sDateMoment.isSame(eDateMoment, "month")) {
                        Data.DateRange = '<div class="date">' + sDateMoment.format("DD") + '&nbsp;-&nbsp;' + eDateMoment.format("DD") + ' ' + sDateMoment.format("MMM") + '</div>';
                    } else {
                        Data.DateRange = '<div class="date">' + sDateMoment.format("DD MMM") + ' ' + eDateMoment.format("DD MMM") + '</div>';
                    }
                }
                
                        html += ListTemplate({ results: Data });
                }
            }
            List.find('.events-container').html(html);
            NoEventsFound();
            EqualHeight();
            List.attr('total-count',data.TotalResults);
            CheckCount();
            var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date('1 '+ViewDateText));

            if(ViewDate.format('MMMM YYYY') == _previous) {
                List.find('.previous').addClass('arrow-desabled');
            } else {
                List.find('.previous').removeClass('arrow-desabled');
            }

            if(ViewDate.format('MMMM YYYY') == _end) {
                List.find('.next').addClass('arrow-desabled');
            } else {
                List.find('.next').removeClass('arrow-desabled');
            }
          //RenderClickEvents();
    },

    CheckCount = function() {
        List.each(function() {

            var Count = $(this).data('count'),
                Items = parseInt($(this).attr('total-count')),
                listCount = $(this).find('.events-section').length;

            if(Items > Count) {
                $(this).next('.more-events').find('.btn-more-events').removeClass('hidden');
            } else {
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
            if(Items === 0){
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            } 
            if(Items === listCount){
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
        })
    },

    RenderOnLoad = function() {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY'),
            PageTemplate = $("section#events").data("currentpage"),
            MonthYear = MonthSelect.val(),
            obj = GetEventData(MonthYear);
            EqualHeight();
            CheckCount();
            _previousDate = date;
            GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderLoadEvents, null, null);
    },

    RenderLoadEvents = function(data) {
        var _contentheight = null, _dayView = [],
            _vp = INFORMA.global.device.viewportN,
            header = {
                left: 'prev',
                center: 'title',
                right: 'next'
            };

        if(_vp === 2) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else if(_vp === 1) {
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        } else {
            _contentheight = 1700;
            _dayView = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        // if(_vp === 1 || _vp === 0) {
        //     header = {
        //         left: 'title',
        //         right: 'prev,next'
        //     }
        // } else {
        //     header = {
        //         left: 'prev',
        //         center: 'title',
        //         right: 'next'
        //     }
        // }

        // List.find('.previous').addClass('arrow-desabled');
        NoEventsFound();
        Calendar.html("");
        Calendar.fullCalendar({
            // defaultView: 'year',
            header: header, // Defines the buttons and title at the top of the calendar.
            eventLimit: true, // Limits the number of events displayed on a day. The rest will show up in a popover.
            contentHeight: _contentheight, // Sets the height of the view area of the calendar.
            weekMode: 'liquid', //Determines the number of weeks displayed in a month view. Also determines each week’s height.
            // firstDay: 1, // The day that each week begins.
            dayNamesShort: _dayView, // Abbreviated names of days-of-week.
            viewRender: function (view) { // Triggered when a new date-range is rendered, or when the view type switches.
                    var Current = moment(new Date()).format('MMMM YYYY'),
                        ViewDate = moment(view.title).format('MMMM YYYY'),
                        End = moment(new Date()).add(11, 'months').format('MMMM YYYY');
                        //
                    // if(view.title == Current) {
                    //     jQuery('.fc-prev-button').addClass('disabled');
                    // } else {
                    //     jQuery('.fc-prev-button').removeClass('disabled');

                    // }
                    // if(view.title === End) {
                    //     jQuery('.fc-next-button').addClass('disabled');
                    // } else {
                    //     jQuery('.fc-next-button').removeClass('disabled');
                    // }
                },
            dayClick: function (date, jsEvent, view) { // Triggered when the user clicks on a date or a time.
                    var _vp = INFORMA.global.device.viewportN;

                // if (_vp === 2 || _vp === 1) {
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
                // }

                },
            eventAfterAllRender: function (view) { // Triggered after all events have finished rendering.
                    var _vp = INFORMA.global.device.viewportN;
                if (_vp === 2 || _vp === 1) {

                        var Events = $('.fc-view-container .events');

                        Events.each(function () {
                            var DateField = $(this).data('date');
                        $('td.fc-day-number[data-date="' + DateField + '"]').addClass('events-now');
                        $('td.fc-widget-content[data-date="' + DateField + '"]').addClass('event-present');
                        })
                    }

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
        });
        CheckEvents(data);
        SetCalendarEvents(data);
    },
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(new Date('1 ' +date)).format('MMMM YYYY');
//      PageTemplate = $("section#events").data("CurrentPage");
//             var obj = { 
//                data:JSON.stringify({MonthYear: NextMonth, 
//                              SectorId: SectorSelect.val(),
//                  eventType: Type.val(),
//                  CurrentPage:PageTemplate
//               })
//             } 
//         GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null); 
        $('#Eventmonth').val(NextMonth);
        $('#Eventmonth').trigger("chosen:updated");
        var MonthYear = NextMonth,
        obj = GetEventData(NextMonth);
        GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null); 
    },

    CheckEvents = function(data) {

        var results = data.Events,
            List = [];

        for(var key in results) {
            List = results[key];
        }

        if(List.length > 0) {
            jQuery('.no-results').hide();
        } else {
            jQuery('.no-results').show();
        }
    },

    SetCalendarEvents = function(list) {
        Calendar.fullCalendar('removeEvents');
        var data = list.Events,
            _vp = INFORMA.global.device.viewportN;

        var EventList = [];

        for(var key = 0; key < data.length ; key++) {
            EventList.push({
                "title": data[key].Title,
                "start": new Date(data[key].EventDate),
                "State": data[key].State,
                "Country": data[key].Country,
                "Link": (data[key].FullDetail != null) ? (data[key].FullDetail.Url): null,
                "Target": (data[key].FullDetail != null) ? (data[key].FullDetail.Target): null,
                "EventText": (data[key].EventText == "FullyBooked") ? true: false
            })
        }
        if(_vp === 1 || _vp === 2) {
            $('td.fc-day-number').removeClass('events-now');
            $('td.fc-widget-content').removeClass('event-present');
        }
        jQuery('section[data-view="calendar-view"]').show();
        for(var key = 0; key < EventList.length ; key++) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
        if(jQuery('body').hasClass('list-view')) {
            jQuery('section[data-view="calendar-view"]').hide();
        }
    }

    SwitchEvents = function() {
        Views.on('click', function(e) {
            e.preventDefault();
            var ViewMode = jQuery(this).data('viewport');
            Views.removeClass('active');
            jQuery(this).addClass('active');
            jQuery('body').removeClass('list-view');
            jQuery('body').removeClass('calendar-view');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);

            var date = new Date(),
                DatePass = moment(date).format('MMMM YYYY'),
                PageTemplate = $("section#events").data("currentpage"),
                MonthYear = MonthSelect.val();
                EqualHeight();
                CheckCount();
                var obj = GetEventData(MonthYear);
                _previousDate = date;
                GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);
                NoEventsFound();
        })



        MonthSelect.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear); 
            GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);
            NoEventsFound();
        });

        Country.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: Type.val(),
            //    Country: jQuery(this).val()})
            // }

            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear);

            GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        });

        Type.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }

            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear);

            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: jQuery(this).val(),
            //    Country: Country.val()})
            // }

            GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })


        SectorSelect.on('change', function(){

            var MonthYear = MonthSelect.val(),
                obj = GetEventData(MonthYear);

            // var obj = {
            //   data:JSON.stringify({  MonthYear: MonthSelect.val(),
            //     SectorId: jQuery(this).val(),
            //     eventType: Type.val(),
            //   Country: Country.val()})
            // }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })

    },
     NoEventsFound = function() {
        var Container = jQuery('.events-container'),
            Items = Container.find('.events-section');

            if(Items.length > 0) {
                jQuery('.no-result').addClass('hidden');
                $('.fc-view-container').removeClass('hidden');
            } else {
                jQuery('.no-result').removeClass('hidden');
                $('.fc-view-container').addClass('hidden');
            }
    },
    MoreEventsFunc = function() {
        MoreEvents.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.find('.container').data('count'),
                MonthYear = MonthSelect.val(),
                obj = GetDefaultEventData(MonthYear);
                GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), LoadMoreEvents, null, $(this));
        });
    },
    
    ListChangeEvents = function() {
        $(document).on('click', 'section[data-view="list-view"] .next', function() {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
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
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);

        });
        $(document).on('click','.fc-next-button, .fc-prev-button', function(){
            var currentMonth = jQuery(this).parents('.fc-toolbar').find('h2').text();
            RenderParticularMonth(currentMonth);
        });
        $(document).on('click', 'section[data-view="list-view"] .previous', function() {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
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
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "GET", JSON.stringify(obj), RenderChange, null, null);

        });
    },

    isDev = function () {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    init = function() {
        if(EventsLists.length > 0) {
            RenderOnLoad();
            SwitchEvents();
            MoreEventsFunc();
            ListChangeEvents();
            UnbindEvent();
            disabledEvent();

            if(isDev()) {
                window.cal = Calendar;
            }
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());