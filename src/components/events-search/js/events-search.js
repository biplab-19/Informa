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
        Calendar = $('#events .container'),
        MonthSelect = $('select[name="month"]'),
        NextButton = $('.fc-next-button'),
        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, SwitchEvents, GetAjaxData, RenderMonthResults, SetCalendarEvents, MobileEvents;

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
                            ItemList = null;

                        $('.fc-widget-content').removeClass('open');
                        $(this).addClass('open');
                        $('.events-wrap').remove();
                        $('.fc-day-number').css('color','#6a7285');
                        if($(this).hasClass('event-present')) {
                            parentNode.after('<div class="events-wrap"></div>');
                            ItemList = $('.events[data-date="'+DateAttr+'"]').clone();
                            ItemList.addClass('cloned');
                            $('.events-wrap').html(ItemList);
                        } else {
                            parentNode.after('');
                        }

                        if($(this).hasClass('open')) {
                            $('.fc-day-number[data-date="'+DateAttr+'"]').css('color','#fff');
                        } else {
                            $(this).removeClass('open');
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
                },
                events: eventList
        });

    },

    RenderMonthResults = function(data){
        var EventList = [];

        for(var key in data) {
            EventList.push({
                "title": data[key].Title,
                "start": data[key].EventStartDate,
                "location": data[key].Location
            })
        }
        // var Events = 
        SetCalendarEvents(EventList);
    },

    SwitchEvents = function() {
        Views.on('click', function() {
            Views.removeClass('active');
            jQuery(this).addClass('active');
        })
        CalendarView.on('click', function() {
            Views.removeClass('active');
            jQuery(this).addClass('active');
            //pass current month
            GetAjaxData(Urls.EventsSearch, "Get", null, RenderMonthResults, null, null);
        })
        MonthSelect.on('change', function() {
            var value = jQuery(this).val();

            var check = moment(value, 'YYYY/MM/DD');

            var month = check.format('M');
            var day   = check.format('D');
            var year  = check.format('YYYY');
            Calendar.fullCalendar('gotoDate', year, month);
        })
    }


    init = function() {
        if(EventsLists.length > 0) {
            SwitchEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsSearch.init());
