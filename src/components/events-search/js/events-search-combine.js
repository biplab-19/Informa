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
        NextButton = $('.fc-next-button'),
        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMM YYYY'),
       _end = moment(_Start).add('months', 11).format('MMM YYYY'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        //methods
        init, RenderOnLoad, GetAjaxData, RenderResults, CalendarRender, ListRender, 
        SetCalendarEvents, RenderEvents, RenderListClickEvents, RenderCalendarEvents, 
        SwitchEvents, RenderChange, RenderChangeCalendar, RenderChangeList, RenderParticularMonth, MoreEventsList, NoEventsFound,
        EqualHeight;
        
        EqualHeight = function(){ 
           var highestBox = 0, 
            EachItem = List.find(".content-wrap"),
            padding = 30; 
            
            jQuery('section[data-view="list-view"]').show();
          EachItem.each(function(){ 
                  if(jQuery(this).height() > highestBox){ 
                  highestBox = jQuery(this).height(); 
                } 
          }); 
          if(jQuery('section[data-view="calendar-view"]:visible').length > 0) {
              jQuery('section[data-view="list-view"]').hide();
          }
          EachItem.height(highestBox + padding); 
        }

        
        MoreEventsList = function () {
            var List = jQuery('section[data-view="list-view"]'),
                Count = List.data('count');
                
                
                MoreEvents.on('click', function() {
                    List.find('.events-section:nth-child(n+'+(Count+1)+')').slideToggle();
                    jQuery(this).toggleClass('showLess');
                });
        }

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

    RenderOnLoad = function () {

        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMM YYYY');
        var obj = {
            MonthYear: DatePass
        }
        _previousDate = DatePass;
        GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderResults, null, null);
    },

    RenderResults = function(data) {
        CalendarRender(data);
        ListRender(data);
    },

    CalendarRender = function(data) {
        SetCalendarEvents(data);
    },

    ListRender = function(data) {
            var results = data.SearchDictionary, 
              html = ""; 
          

          var ViewDate = moment(results.Month).format('MMM YYYY'),
                Count = jQuery('section[data-view="list-view"]').data('count'),
                Items = jQuery('section[data-view="list-view"]').find('.events-section').length;
                debugger;
                if(Count > Items) {
                    
                    jQuery('.btn-more-events').addClass('hidden');
                } else {
                    
                    jQuery('.btn-more-events').removeClass('hidden');
                }
                jQuery('section[data-view="list-view"]').find('.events-section:nth-child(n+'+(Count+1)+')').hide(); 
                jQuery('.btn-more-events').removeClass('showLess');

         MoreEventsList();
        NoEventsFound();
        EqualHeight();

          if(ViewDate == _Start) {
            List.find('.previous').addClass('arrow-desabled');
          } else {
             List.find('.previous').removeClass('arrow-desabled');
          }

          if(ViewDate == _end) {
            List.find('.next').addClass('arrow-desabled');
          } else {
             List.find('.next').removeClass('arrow-desabled');
          }
          RenderListClickEvents();
    },

    RenderListClickEvents = function() {
        var NextBtn = List.find('.next'),
              PreviousBtn =  List.find('.previous');

    
              $(document).on('click','.next', function () {
                  
                var DateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                    ViewDate = new Date(DateText),
                    nextMonth = moment(ViewDate).add('months', 1).format('MMM YYYY');
                    
                    var obj = {
                        MonthYear: nextMonth,
                        SectorId: SectorSelect.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);
              })

              $(document).on('click','.previous', function () {
                var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    prevMonth = moment(ViewDate).add('months', -1).format('MMM YYYY');
                    
                    var obj = {
                        MonthYear: prevMonth,
                        SectorId: SectorSelect.val()
                    }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);
              })
    }

    SetCalendarEvents = function(eventList) {
        var _contentheight = null, _dayView = [];

        if(INFORMA.global.device.viewportN === 2 ) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else {
            _contentheight = 1700;
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
                titleFormat: 'MMM YYYY',
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
                    
                        if(moment(_previousDate).format('MMM YYYY') != moment(viewDate).format('MMM YYYY')) {
                            setTimeout(function() {
                            
                                RenderParticularMonth(viewDate);  
                            }, 50);                             
                        }
                    

                    _previousDate = null;
                    
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
                        DateAttr = moment(ItemDate).format('YYYY-MM-DD');
                        
                    if(moment(CurrentDate).format('DD MMM YYYY') > moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p></div>');
                    } else if(moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                        return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p></div>');
                    } else {
                        return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="javascript:void(0)">' + event.title + '</a></p></div>');
                    }

                    if(event.Country != null) {
                        jQuery('.events[data-date="'+DateAttr+'"]').append('<p class="country"><strong>' +event.Country+ '</strong></p>');
                    }
                }
        });
        RenderCalendarEvents(eventList);
        jQuery('section[data-view="calendar-view"]').hide();
    },
    
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(date).format('MMM YYYY'); 
                
                var obj = { 
                        MonthYear: NextMonth, 
                        SectorId: SectorSelect.val() 
                } 
        GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null); 
    },

    RenderCalendarEvents = function(list) {
        //debugger;
        Calendar.fullCalendar('removeEvents');
        var Month = Object.keys(list.SearchDictionary)[0],
            data = list.SearchDictionary[Month].ModelItem;

        var EventList = [];
        
        for(var key in data) {
            EventList.push({
                "title": data[key].Title,
                "start": data[key].EventStartDate,
                "State": data[key].State,
                "Country": data[key].Country
            })
        }
        for(var key in EventList) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
    },

    RenderChange = function(data) {
        
        RenderChangeCalendar(data);
        RenderChangeList(data);
    },

    RenderChangeCalendar = function(list) {
        Calendar.fullCalendar('removeEvents');
        var Month = Object.keys(list.SearchDictionary)[0],
            data = list.SearchDictionary[Month].ModelItem;

        var EventList = [];
        
        for(var key in data) {
            EventList.push({
                "title": data[key].Title,
                "start": data[key].EventStartDate,
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
    },
    
    NoEventsFound = function () {
            var List = jQuery('section[data-view="list-view"]'),
                Count = List.data('count'),
                Items = List.find('.events-section').length;
                
                debugger;
        if(jQuery('body').hasClass('list-view')) {
                if (List.find('.events-section').length > 0) { 
                        jQuery('.no-result').addClass('hidden'); 
                        if(Count < Items) {
                            jQuery('.btn-more-events').removeClass('hidden'); 
                        }
                        else{
                            jQuery('.btn-more-events').addClass('hidden'); 
                        }
                    } else { 
                        jQuery('.no-result').removeClass('hidden'); 
                        jQuery('.btn-more-events').addClass('hidden'); 
                    }
        } else {
            jQuery('.no-result').addClass('hidden'); 
            if(Count < Items) {
                jQuery('.btn-more-events').removeClass('hidden'); 
            }
            else{
                jQuery('.btn-more-events').addClass('hidden'); 
            }
        }
        setTimeout(function() {
            EqualHeight();
        }, 100);
        
    },

    RenderChangeList = function(data) {
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
            NoEventsFound();
            
            var Count = List.data('count'); 
                List.find('.events-section:nth-child(n+'+(Count+1)+')').hide(); 
                jQuery('.btn-more-events').removeClass('showLess');
            
          var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date(ViewDateText)).format('MMM YYYY');
            
          if(ViewDate == _Start) {
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

    SwitchEvents = function() {
        Views.on('click', function() {
            
            var ViewMode = jQuery(this).data('viewport');
            Views.removeClass('active');
            jQuery(this).addClass('active');
            jQuery('body').attr('class', 'agri-theme');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);
            jQuery('section[data-view="'+ViewMode+'"]').show();
            
            NoEventsFound();
            
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
                MonthYear: check.format('MMM YYYY'),
                SectorId: SectorSelect.val()
            }
            
            _previousDate = new Date(value);

            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound();
        })
        
        SectorSelect.on('change', function(){
            var obj = {
                MonthYear: MonthSelect.val(),
                SectorId: jQuery(this).val()
            }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            // NoEventsFound(); 
        })

    },

    init = function() {
        if(EventsLists.length > 0) {
            SwitchEvents();
            RenderOnLoad();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());