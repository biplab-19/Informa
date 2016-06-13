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
        Urls = INFORMA.Configs.urls.webservices,
        //methods
        init, SwitchEvents, GetAjaxData, RenderMonthResults, SetCalendarEvents;

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
        Calendar.html("");
        Calendar.fullCalendar({
                header: {
                    left: 'prev',
                    center: 'title',
                    right: 'next'
                },
                eventLimit: 2,
                contentHeight: 1000,
                eventRender: function(event, element, view) {
                    var CurrentDate = new Date(),
                        ItemDate = new Date(event.start._i);
                    if(CurrentDate > ItemDate) {
                        return $('<div class="events disabled"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
                    } else if(CurrentDate == ItemDate) {
                        return $('<div class="events current"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
                    } else {
                        return $('<div class="events"><p class="title"><a href="#">' + event.title + '</a></p><p class="country">' +event.location+ '</p></div>');
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
            GetAjaxData(Urls.EventsSearch, "Get", null, RenderMonthResults, null, null);
        })
        MonthSelect.on('change', function() {
            Calendar.fullCalendar('gotoDate', 2010, 6);
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
