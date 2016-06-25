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
        NextButton = $('.fc-next-button'),


        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMMM YYYY'),
       _end = moment(_Start).add('months', 11).format('MMMM YYYY'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents,
        SetCalendarEvents, RenderParticularMonth, RenderChange,
        SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents;


    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        
        //INFORMA.Spinner.Show($('body'));
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
    },

    RenderChange = function(data) {
        CheckEvents(data);
        SetCalendarEvents(data);
        SetListEvents(data);
    },

    SetListEvents    = function(data) {
        var results = data.SearchDictionary,
              html = "";

          for (var key in results) {
              if (results.hasOwnProperty(key)) {
                  var Data = results[key],
                      HeaderText = key,
                      TemplateName = (Templates.EventpageListviewTemplate !== "undefined") ? Templates.EventpageListviewTemplate : "",
                      ListTemplate = Handlebars.compile(TemplateName);
                  Data.Month = HeaderText;
                  html += ListTemplate({ results: Data });
              }
          }
          List.html(html);
           // NoEventsFound();
           EqualHeight();
            
          CheckCount();
            
          var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date(ViewDateText)).format('MMMM YYYY');
                
          if(moment(ViewDate).format('MMMM YYYY') == _Start) {
            List.find('.previous').addClass('arrow-desabled');
          } else {
             List.find('.previous').removeClass('arrow-desabled');
          }

          if(ViewDate == _end) {
            List.find('.next').addClass('arrow-desabled');
          } else {
             List.find('.next').removeClass('arrow-desabled');
          }

          //RenderClickEvents();
    },
    CheckCount = function() {
        List.each(function() {
            
            var Count = jQuery(this).data('count'),
                Items = List.find('.events-section').length;

            if(Items > Count) {
                jQuery(this).find('.events-section:nth-child(n+'+(Count+1)+')').hide();
                jQuery(this).next('.more-events').show();
            } else {
                jQuery(this).next('.more-events').hide();
            }
        })
    },
    RenderOnLoad = function() {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY');
            EqualHeight();
        var obj = {
            MonthYear: DatePass
        }
        _previousDate = date;
        GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderLoadEvents, null, null);
        CheckCount();
    },

    RenderLoadEvents = function(data) {
        var _contentheight = null, _dayView = [],
            _vp = INFORMA.global.device.viewportN,
            header = null;

        if(_vp === 2) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else if(_vp === 1) {
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        } else {
            _contentheight = 1700;
            _dayView = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        if(_vp === 1 || _vp === 0) {
            header = {
                left: 'title',
                right: 'prev,next'
            }
        } else {
            header = {
                left: 'prev',
                center: 'title',
                right: 'next'
            }
        }

        List.find('.previous').addClass('arrow-desabled');
        //NoEventsFound(data);
        Calendar.html("");
        Calendar.fullCalendar({
                header: header,
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
                    console.log(_previousDate);

                        // if(moment(_previousDate).format('MMMM YYYY') != moment(viewDate).format('MMMM YYYY')) {                            
                        //     
                        //     RenderParticularMonth(viewDate);  
                        // }
                    

                    // _previousDate = null;
                    
                },
                dayNamesShort: _dayView,
                dayClick: function(date, jsEvent, view) {
                    var _vp = INFORMA.global.device.viewportN;

                    if(_vp === 2 || _vp === 1) {
                        var selectedDate = date.format(),
                            parentNode = $(this).parents('.fc-row.fc-widget-content'),
                            DateAttr = $(this).data('date'),
                            Container = $(this).parents('.fc-view-container'),
                            ItemList = null;
                        Container.find('.fc-widget-content').removeClass('open');
                        Container.toggleClass('open-event');
                        Container.find('.events-wrap').remove();
                        Container.find('.fc-day-number').css('color','#6a7285');
                        if($(this).hasClass('event-present')) {
                            ItemList = Container.find('.events[data-date="'+DateAttr+'"]').clone();
                            ItemList.addClass('cloned');
                            parentNode.after('<div class="events-wrap"></div>');
                        } else {
                            parentNode.after('');
                        }

                        if(Container.hasClass('open-event')) {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').addClass('open');
                            Container.find('.fc-day-number[data-date="'+DateAttr+'"]').css('color','#fff');
                            Container.find('.events-wrap').html(ItemList);
                        } else {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').removeClass('open');
                            Container.find('.events-wrap').remove();
                        }
                        
                        ItemList = "";
                        Container.find('.events-wrap').hide().slideDown();
                    }

                },
                eventAfterAllRender: function(view) {
                    var _vp = INFORMA.global.device.viewportN;
                    if(_vp === 2 || _vp === 1) {

                        var Events = $('.fc-event-container .events');

                        Events.each(function () {
                            var DateField = $(this).data('date');
                            $('td.fc-day-number[data-date="'+DateField+'"]').addClass('events-now');
                            $('td.fc-widget-content[data-date="'+DateField+'"]').addClass('event-present');
                        })
                    }

                    if(_vp === 0) {
                        var OtherMonths = $('.fc-day-number.fc-other-month');

                        OtherMonths.each(function() {
                            var DateView = $(this).data('date'),
                                Month = moment(new Date(DateView)).format('MMM'),
                                Dates = moment(new Date(DateView)).format('DD');
                                
                            $(this).html(Dates + '<sup>\/' +Month+ '</sup>');
                        })
                    }
                },
                eventRender: function(event, element, view) {
                    var CurrentDate = new Date(),
                        ItemDate = new Date(event.start._i),
                        DateAttr = moment(ItemDate).format('YYYY-MM-DD'),
                        CountryText = "";

                        if(event.Country != null) {
                            CountryText = event.Country;
                        }
                        
                    if(moment(CurrentDate).format('DD MMM YYYY') > moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    } else if(moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    } else {
                        return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                    }
                }
        });
        CheckEvents(data);
        SetCalendarEvents(data);
    },
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(date).format('MMMM YYYY'); 
                
                var obj = { 
                        MonthYear: NextMonth, 
                        SectorId: SectorSelect.val() 
                } 
        GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null); 

    },

    CheckEvents = function(data) {
            
        var results = data.SearchDictionary,
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
        var Month = Object.keys(list.SearchDictionary)[0],
            data = list.SearchDictionary[Month].ModelItem;

        var EventList = [];
        
        for(var key in data) {
            EventList.push({
                "title": data[key].Title,
                "start": new Date(data[key].EventDate),
                "State": data[key].State,
                "Country": data[key].Country
            })
        }
        jQuery('section[data-view="calendar-view"]').show();
        for(var key in EventList) {
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
            jQuery('body').attr('class', 'agri-theme');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);
            jQuery('section[data-view="'+ViewMode+'"]').show();
            
            //NoEventsFound();
            
        })

         

        MonthSelect.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date(value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
                MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                Country: Country.val()
            }
            
            _previousDate = new Date(value);

            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound();
        })
        Country.on('change', function() {
            var value = jQuery(this).val();
            var check = moment(new Date(value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var obj = {
                MonthYear: check.format('MMMM YYYY'),
                SectorId: SectorSelect.val(),
                Country: jQuery(this).val()
            }
            
            _previousDate = new Date(value);

            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound();
        })

        
        SectorSelect.on('change', function(){
            var obj = {
                MonthYear: MonthSelect.val(),
                SectorId: jQuery(this).val(),
                Country: Country.val()
            }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound(); 
        })

    },

    MoreEventsFunc = function() {
        MoreEvents.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.find('.container').data('count');
                // 
            Parent.find('.events-container').find('.events-section:nth-child(n+' + (Count + 1) + ')').slideToggle();
            jQuery(this).toggleClass('showLess');
        });
    },

    ListChangeEvents = function() {
        $(document).on('click', 'section[data-view="list-view"] .next', function() {
            var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');
                    
                    var obj = {
                        MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                        Country: Country.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

        })
        $(document).on('click','.fc-next-button, .fc-prev-button', function(){
            var currentMonth = jQuery(this).parents('.fc-toolbar').find('h2');
            RenderParticularMonth(currentMonth);
        })
        $(document).on('click', 'section[data-view="list-view"] .previous', function() {
            var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');
                    
                    var obj = {
                        MonthYear: prevMonth,
                        SectorId: SectorSelect.val(),
                        Country: Country.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(obj), RenderChange, null, null);

        })
    }

    init = function() {
        if(EventsLists.length > 0) {
            SwitchEvents();
            RenderOnLoad();
            MoreEventsFunc();
            ListChangeEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());