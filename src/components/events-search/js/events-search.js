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
INFORMA.EventsSearch = (function(window, $, namespace) {
    'use strict';
    //variables
    var EventsLists = $('.events-search'),
        Views = EventsLists.find('.views a'),
        CalendarView = EventsLists.find('.views a.icon-calendar'),
        Calendar = $('section[data-view="calendar-view"] .container'),
        MonthSelect = $('select[name="month"]'),
        NextButton = $('.fc-next-button'),
        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, SwitchEvents, GetAjaxData, RenderMonthResults, SetCalendarEvents, MobileEvents, RenderCalendar, RenderEvents, RenderParticularMonth;

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

    RenderParticularMonth = function(date) {
        var NextMonth = moment(date).format('MMM-YYYY');
        GetAjaxData(Urls.EventsSearch, "Get", NextMonth, RenderEvents, null, null);
    },

    SetCalendarEvents = function(eventList) {
        var _contentheight = null, _dayView = [];

        if(INFORMA.global.device.viewportN === 2 ) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else {
            _contentheight = 1200;
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
        }
        Calendar.html("");
        Calendar.fullCalendar({
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                eventLimit: true,
                contentHeight: _contentheight,
                viewRender: function(view) {
                    var date = new Date(),
                        momentdate = moment(date),
                        currentMonth = date.getMonth(),
                        currentYear = date.getYear(),
                        viewDate = new Date(view.title),
                        viewMonth = viewDate.getMonth(),
                        viewYear = viewDate.getYear(),
                        endDate = momentdate.add('months', 11).toDate(),
                        endMonth = endDate.getMonth(),
                        endYear = endDate.getYear(),
                        nextMonth = moment(viewDate).add('months', 1).toDate(),
                        nextDetails = moment(nextMonth).format('MMM-YYYY');

                    if(currentMonth === viewMonth && currentYear === viewYear) {
                        jQuery('.fc-prev-button').addClass('disabled');
                    } else {
                        jQuery('.fc-prev-button').removeClass('disabled');
                        RenderParticularMonth(viewDate);
                    }
                    
                    if(viewMonth === endMonth) {
                        jQuery('.fc-next-button').addClass('disabled');
                    } else {
                        jQuery('.fc-next-button').removeClass('disabled');
                    }
                    

                    // GetAjaxData(Urls.EventsSearch, "Get", null, RenderMonthResults, null, null);
                },
                dayNamesShort: _dayView,
                dayClick: function(date, jsEvent, view) {
                    if(INFORMA.global.device.viewportN === 2) {
                        var selectedDate = date.format(),
                            parentNode = $(this).parents('.fc-row.fc-widget-content'),
                            DateAttr = $(this).data('date'),
                            Container = $(this).parents('.fc-view-container'),
                            ItemList = null;
                        $('.fc-widget-content').removeClass('open');
                        Container.toggleClass('open-event');
                        $('.events-wrap').remove();
                        $('.fc-day-number').css('color','#6a7285');
                        if($(this).hasClass('event-present')) {
                            ItemList = $('.events[data-date="'+DateAttr+'"]').clone();
                            ItemList.addClass('cloned');
                            parentNode.after('<div class="events-wrap"></div>');
                        } else {
                            parentNode.after('');
                        }

                        if(Container.hasClass('open-event')) {
                            $('.fc-widget-content[data-date="'+DateAttr+'"]').addClass('open');
                            $('.fc-day-number[data-date="'+DateAttr+'"]').css('color','#fff');
                            $('.events-wrap').html(ItemList);
                        } else {
                            $('.fc-widget-content[data-date="'+DateAttr+'"]').removeClass('open');
                            $('.events-wrap').remove();
                        }
                        
                        ItemList = "";
                        $('.events-wrap').hide().slideDown();
                    }

                },
                eventAfterAllRender: function(view) {
                    if(INFORMA.global.device.viewportN === 2) {
                        view.dayNamesShort= ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

                        var Events = $('.fc-event-container .events');

                        Events.each(function () {
                            var DateField = $(this).data('date');
                            $('td.fc-day-number[data-date="'+DateField+'"]').addClass('events-now');
                            $('td.fc-widget-content[data-date="'+DateField+'"]').addClass('event-present');
                        })
                    }
                },
                eventRender: function(event, element, view) {
                    var CurrentDate = new Date(),
                        ItemDate = new Date(event.start._i),
                        DateAttr = moment(ItemDate).add('days',-1).format('YYYY-MM-DD');
                        // debugger;
                    if(CurrentDate > ItemDate) {
                        return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
                    } else if(CurrentDate == ItemDate) {
                        return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
                    } else {
                        return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
                    }
                }
        });
        RenderEvents(eventList);

    },

    RenderEvents = function(list) {
        var EventList = [];

        for(var key in list) {
            EventList.push({
                "title": list[key].Title,
                "start": list[key].EventStartDate,
                "location": list[key].Location
            })
        }
        for(var key in EventList) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
    },

    RenderMonthResults = function(data){
        
        SetCalendarEvents(data);
    },

    RenderCalendar = function() {
        //Fetch Current Month
        var date = new Date(),
            DatePass = moment(date).format('MMM-YYYY');

        GetAjaxData(Urls.EventsSearch, "Get", DatePass, RenderMonthResults, null, null);
    },

    SwitchEvents = function() {
        Views.on('click', function() {
            var ViewMode = jQuery(this).data('view');
            Views.removeClass('active');
            jQuery(this).addClass('active');

            jQuery('.events-list').hide();

            jQuery('section[data-view="'+ViewMode+'"]').show();
        })

        MonthSelect.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date(value));
            Calendar.fullCalendar('gotoDate', check);
            RenderParticularMonth(check);        

        })
    }


    init = function() {
        if(EventsLists.length > 0) {
            SwitchEvents();
            RenderCalendar();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsSearch.init());
