/*
 * Events Search.js
 *
 *
 * @project:    Informa
 * @date:       2019-Aug-19
 * @author:     Jawaad Shahid
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.EventsViews = (function (window, $, namespace) {
    'use strict';
    //variables
    var EventsContainer = $('#events'),
        EventsLists = $('.events-search'),
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
        MoreEvents = $('.btn-more-events'),
        _Start = moment(new Date()),
        _end = moment(_Start).add(1, 'years'),
        _previous = moment(_Start).subtract(1, 'years'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        PageNo = 1,
        ajaxMethod = 'POST',
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents, LoadMoreEvents, SetCalendarEvents, RenderParticularMonth, RenderChange, GetEventData, SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents, UnbindEvent, disabledEvent, SetLoadMoreEvents, mddmenu, setCurrentDate, populateMonthSelect, initFCYearView, initFCMonthView, getDayFormat, initCalendar, InformaFilters, InformaEventTiles, InformaEventList, InformaFC, InformaEventsController, isDev;

    InformaFilters = {
        Container: $('.events-search'),
        FiltersUI: $('.filter-section'),
        ActiveFilters: [],
        FilterContainer: $('.filter-section .active-filters'),
        FilterCountElement: $('.filter-section .active-count'),
        FilterElement: $('<div class="filter"><span class="text"></span></div>'),
        FilterDeleteBtn: $('<span class="delete icon-close"></span>'),
        Selects: $('.events-search select'),
        Init: function() {
            var that = this;

            this.PopulateMonthSelect();

            // event listners for all dd filters
            this.Selects.change(function () {
                var $this = $(this);

                if (!this.value) return;

                // if month let InformaEventsController handle it
                if (this.name === 'MonthYear') {
                    InformaEventsController.Date = moment(this.value);
                } else {
                    // add value to filters
                    that.AddFilter({
                        type: this.name,
                        value: this.value,
                        text: $this.children('option:selected').text()
                    });
                    
                    // switch(this.name) {
                    //     case 'month':
                    //         break;
                    //     case 'sector':
                    //         break;
                    //     case 'eventType':
                    //         break;
                    //     case 'country':
                    //         break;
                    //     default:
                    //         console.warn('InformaFilters change event for selects: not handled');
                    // }

                    // revert selected option to All
                    $this.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                    $this.trigger("chosen:updated");
                }
            });
        },
        AddFilter: function(filterObj) {
            // remove if month to limit 1 selected month at a time
            if (filterObj.type === 'MonthYear') 
                this.RemoveFilter('MonthYear');
            this.ActiveFilters.push(filterObj);
            this.UpdateFilters();
        },
        RemoveFilter: function(type, value) {
            // set ActiveFilters array based on params passed
            // filter out matched params
            if (type && value) {
                this.ActiveFilters = this.ActiveFilters.filter(function (filterObject) {
                    return filterObject.type !== type && filterObject.value !== value;
                });
            } else {
                if (type) {
                    this.ActiveFilters = this.ActiveFilters.filter(function (filterObject) {
                        return filterObject.type !== type;
                    });
                }
                if (value) {
                    this.ActiveFilters = this.ActiveFilters.filter(function (filterObject) {
                        filterObject.value !== value;
                    });
                }
            }
            this.UpdateFilters();
        },
        AddFilterElement: function(filterObj) {
            var that = this,
                $filterEl,
                $filterDelete;

            // create filter el
            $filterEl = this.FilterElement.clone();
            // populate text
            $filterEl.children('.text').text(filterObj.text);
            // set attribute for future reference
            $filterEl.attr('data-type', filterObj.type);
            $filterEl.attr('data-value', filterObj.value);

            // if month close not added
            if (filterObj.type !== 'MonthYear') {
                // create delete btn
                $filterDelete = this.FilterDeleteBtn.clone();
                // set event listener to remove filter;
                $filterDelete.click(function () {
                    var $filterEl = $(this).closest('.filter'),
                        type = $filterEl.attr('data-type'),
                        value = $filterEl.attr('data-value');

                    // update filters
                    that.RemoveFilter(type, value);
                });
                $filterEl.append($filterDelete);
            }

            // add elements to DOM
            this.FilterContainer.append($filterEl);
        },
        UpdateFilters: function() {
            var that = this,
                activeFilterLength = this.ActiveFilters.length;

            // repopulate DOM and re-enable all select options
            this.FilterContainer.empty();
            this.EnableAllSelectOptions();
            // now add elements in ActiveFilters array and disable them in selects
            if (activeFilterLength > 0) {
                this.ActiveFilters.forEach(function (filterObj) {
                    that.AddFilterElement(filterObj);
                    // dont disable if month so we can scroll to view
                    if (filterObj.type !== 'MonthYear')
                        that.DisableSelectOption(filterObj.type, filterObj.value);
                });
            }

            // update UI
            this.FiltersUI.attr('data-count', activeFilterLength);
            this.FilterCountElement.text(activeFilterLength);

            InformaEventsController.LoadEvents();
        },
        EnableAllSelectOptions: function() {
            this.Selects.each(function () {
                var $select = $(this);
                $select.children('option').each(function () {
                    $(this).removeAttr('disabled');
                });
                $select.trigger("chosen:updated");
            });
        },
        DisableSelectOption: function(type, value) {
            var $select = this.Selects.filter('[name="' + type + '"]');
            // disable current option and update chosen counterpart
            $select.children('option[value="' + value + '"]').attr('disabled', true);
            $select.trigger("chosen:updated");
        },
        PopulateMonthSelect: function () {
            var $monthSelect = this.Selects.filter('[name="MonthYear"]'),
                loopLength = InformaEventsController.EndDate.diff(InformaEventsController.PreviousDate, 'months'),
                $monthOpt, monthCount, currMonth;
    
            // remove existing 
            $monthSelect.chosen('destroy');
            $monthSelect.empty();
            
            for (monthCount = 0; monthCount < loopLength; monthCount++) {
                // new option tag
                $monthOpt = $('<option />');
    
                // define and populate month value
                currMonth = moment(InformaEventsController.PreviousDate).add(monthCount, 'month');
                $monthOpt.attr('value', currMonth.format('MMMM YYYY'));
                $monthOpt.text(currMonth.format('MMMM YYYY'));
    
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
                    // selected option is 2 down from top of scroll
                    targInd = selectedInd > 2 ? selectedInd - 2 : 0,
                    $targ = $activeResults.eq(targInd);
    
                $resultContainer.scrollTop(0).scrollTop($targ.position().top);
            });
    
            // update chosen field
            $monthSelect.trigger('chosen:updated');

            // set current date and add active month to filters
            this.setMonthSelectDate();

            // set populate flag for state check later
            $monthSelect.attr('populated', true);
        },
        setMonthSelectDate: function () {
            var $monthSelect = this.Selects.filter('[name="MonthYear"]'),
                $activeDateOption = $monthSelect.children('option[value="' + this.Date.format('MMMM YYYY') + '"]')
            
            // update month select field
            $activeDateOption.attr('selected', '').siblings().removeAttr('selected');
            $monthSelect.trigger("chosen:updated");
            // add current month to active filters
            this.AddFilter({
                type: 'MonthYear',
                value: $activeDateOption.attr('value'),
                text: $activeDateOption.text()
            });
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
            if (this.Selects.filter('[name="MonthYear"]').attr('populated'))
                this.setMonthSelectDate();
        },
        get Date () {
            return this.Container.data('date');
        }
    }

    // RenderChange = function (data) {
    //     CheckEvents(data);
    //     InformaFC.EventData = data;
    //     InformaEventList.RenderView(data);
    //     InformaEventTiles.RenderView(data);
    //     NoEventsFound();
    //     // UnbindEvent();
    //     // disabledEvent();
    //     PageNo = 2;
    // },

    // LoadMoreEvents = function (data) {
    //     CheckEvents(data);
    //     InformaFC.EventData = data;
    //     InformaEventList.RenderView(data);
    //     InformaEventTiles.RenderView(data);
    //     NoEventsFound();
    //     // UnbindEvent();
    //     // disabledEvent();
    //     PageNo++;
    // },

    // CheckCount = function () {
    //     List.each(function () {

    //         var Count = $(this).data('count'),
    //             Items = parseInt($(this).attr('total-count')),
    //             listCount = $(this).find('.events-section').length;

    //         if (Items > Count) {
    //             $(this).next('.more-events').find('.btn-more-events').removeClass('hidden');
    //         } else {
    //             $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
    //         }
    //         if (Items === 0) {
    //             $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
    //         }
    //         if (Items === listCount) {
    //             $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
    //         }
    //     })
    // },

    // RenderOnLoad = function () {
    //     jQuery('body').addClass('list-view');
    //     var MonthYear = _Start.format('MMMM YYYY'),
    //         obj = InformaEventsController.GetSendData(MonthYear);

    //     CheckCount();
    //     GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderLoadEvents, null, null);
    // },

    // RenderLoadEvents = function (data) {
    //     CheckEvents(data);
    //     NoEventsFound();
    //     // SetCalendarEvents(data);
    //     InformaFC.EventData = data;
    // },

    // RenderParticularMonth = function (date) {
    //     var NextMonth = moment(new Date('1 ' + date)).format('MMMM YYYY');
    //     //      PageTemplate = $("section#events").data("CurrentPage");
    //     //             var obj = { 
    //     //                data:JSON.stringify({MonthYear: NextMonth, 
    //     //                              SectorId: SectorSelect.val(),
    //     //                  eventType: Type.val(),
    //     //                  CurrentPage:PageTemplate
    //     //               })
    //     //             } 
    //     //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null); 
    //     $('#Eventmonth').val(NextMonth);
    //     $('#Eventmonth').trigger("chosen:updated");
    //     var MonthYear = NextMonth,
    //         obj = InformaEventsController.GetSendData(NextMonth);
    //     GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
    // },

    // CheckEvents = function (data) {

    //     var results = data.Events,
    //         List = [];

    //     for (var key in results) {
    //         List = results[key];
    //     }

    //     if (List.length > 0) {
    //         jQuery('.no-results').hide();
    //     } else {
    //         jQuery('.no-results').show();
    //     }
    // },


    // SwitchEvents = function () {
    //     Views.on('click', function (e) {
    //         e.preventDefault();
            
    //         var ViewMode = jQuery(this).data('viewport');
    //         jQuery('body').removeClass('list-view tile-view calendar-view').addClass(ViewMode);
            
    //         if (ViewMode === 'calendar-view') InformaFC.RenderView();
    //         if (ViewMode === 'tile-view') InformaEventTiles.EqualHeight();
    //         CheckCount();
    //         NoEventsFound();
    //     });



    //     MonthSelect.on('change', function () {
    //         setCurrentDate();
    //     });

    //     Country.on('change', function () {
    //         var MonthYear = _Start,
    //             obj = InformaEventsController.GetSendData(MonthYear);

    //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

    //         NoEventsFound();
    //     });

    //     Type.on('change', function () {
    //         var MonthYear = _Start,
    //             obj = InformaEventsController.GetSendData(MonthYear);

    //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

    //         NoEventsFound();
    //     })


    //     SectorSelect.on('change', function () {
    //         var MonthYear = _Start,
    //             obj = InformaEventsController.GetSendData(MonthYear);

    //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);

    //         NoEventsFound();
    //     })

    // },

    // NoEventsFound = function () {
    //     // TODO: code cleanup: why the explicit references to jQuery?
    //     var Container = jQuery('.events-container'),
    //         Items = Container.find('.events-section');

    //     if (Items.length > 0) {
    //         jQuery('.no-result').addClass('hidden');
    //         $('.fc-view-container').removeClass('hidden');
    //     } else {
    //         jQuery('.no-result').removeClass('hidden');
    //         $('.fc-view-container').addClass('hidden');
    //     }
    // },

    // ListChangeEvents = function () {
    //     // click events for page nav arrows
    //     $(document).on('click', 'section[data-view="list-view"] .next', function () {
    //         var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
    //             ViewDate = new Date('1 ' + DateText),
    //             prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');
            
    //         $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
    //         $('#Eventmonth').val(prevMonth);
    //         $('#Eventmonth').trigger("chosen:updated");

    //         var MonthYear = prevMonth,
    //             obj = InformaEventsController.GetSendData(MonthYear);
    //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
    //     });

    //     $(document).on('click', 'section[data-view="list-view"] .previous', function () {
    //         var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
    //             ViewDate = new Date('1 ' + DateText),
    //             prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');

    //         $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
    //         $('#Eventmonth').val(prevMonth);
    //         $('#Eventmonth').trigger("chosen:updated");

    //         var MonthYear = prevMonth,
    //             obj = InformaEventsController.GetSendData(MonthYear);
    //         GetAjaxData(Urls.EventsSearch, ajaxMethod, JSON.stringify(obj), RenderChange, null, null);
    //     });

    //     // click events for FC nav arrows
    //     $(document).on('click', '.fc-next-button, .fc-prev-button', function () {
    //         var currentMonth = _Start;
    //         RenderParticularMonth(currentMonth);
    //     });
    // },

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


    // TODO: efficieny: combine with InformaEventList Object. Prerequisites: add switch method, update HTML
    InformaEventTiles = {
        Container: $('.events-list[data-view="tile-view"]'),
        EventsContainer: $('.events-list[data-view="tile-view"] .events-container'),
        // DateArrows: $('#events > .header .arrows'),
        TemplateName: (Templates.EventpageTileviewTemplate !== "undefined") ? Templates.EventpageTileviewTemplate : "",
        Template: null,
        Init: function() {
            this.Template = Handlebars.compile(this.TemplateName);
        },
        RenderView: function(data) {
            this.AddEvents(data.Events);
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
            this.EventsContainer.html(html);
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
        EqualHeight: function () {
            var highestBox = 0,
                EachItem = this.EventsContainer.children('.events-section'),
                padding = 0;
            
            EachItem.each(function () {
                var height = $(this).height()
                if (height > highestBox) {
                    highestBox = height;
                }
            });
    
            EachItem.height(highestBox + padding);
            if (INFORMA.global.device.viewportN == 2) {
                EachItem.height("auto");
            }
        },
        set ViewType (type) {
            this.Container.attr('data-datetype', type);
        },
        get ViewType () {
            return this.Container.attr('data-datetype');
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
        },
        get Date () {
            return this.Container.data('date');
        }
    }

    InformaEventList = {
        Container: $('.events-list[data-view="list-view"]'),
        EventsContainer: $('.events-list[data-view="list-view"] .events-container'),
        // DateArrows: $('#events > .header .arrows'),
        TemplateName: (Templates.EventpageListviewTemplate !== "undefined") ? Templates.EventpageListviewTemplate : "",
        MoreBtn: $('.more-events .btn-more-events'),
        Template: null,
        Init: function() {
            this.Template = Handlebars.compile(this.TemplateName);
        },
        RenderView: function(data) {
            this.AddEvents(data.Events);
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
            this.EventsContainer.html(html);
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
        set ViewType (type) {
            this.Container.attr('data-datetype', type);
        },
        get ViewType () {
            return this.Container.attr('data-datetype');
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
        },
        get Date () {
            return this.Container.data('date');
        }
    }

    InformaFC = {
        EventData: null,
        ActiveContainer: null,
        ViewElements: null,
        Container: $('.events-list[data-view="calendar-view"]'),
        Init: function () {
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
                initOptions.defaultDate = moment(that.Date).add(index, 'months');
                $(this).fullCalendar(initOptions);

                // apply rendered attribute on last loop
                if (index === vmLenInd) 
                    that.ActiveContainer.attr('rendered', 'true');
            });
        },
        GoToStartDate: function () {
            var that = this,
                currFCDate = this.ViewElements.first().fullCalendar('getDate');
            // if the date already matches this.Date dont set
            if (currFCDate.isSame(this.Date, 'month')) return;
            // set all FCs based on this.Date, for month view loop runs once
            this.ViewElements.each(function (index) {
                var currMonth = moment(that.Date).add(index, 'months');
                $(this).fullCalendar('gotoDate', currMonth);
            });
        },
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
            this.ActiveContainer = this.Container.children('[data-datetype="' + type + '"]');
            this.ActiveContainer.addClass('active');
            // then children of above
            this.ViewElements = this.ActiveContainer.find('.fccal');
        },
        get ViewType () {
            return this.ActiveContainer.attr('data-datetype');
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
        },
        get Date () {
            return this.Container.data('date');
        }
    }

    InformaEventsController = {
        BodyContainer: $('body'),
        EventsContainer: $('#events'),
        DateArrows: $('.header .arrows'),
        HeaderDate: $('.header h2'),
        ViewBtns: $('.views-section .state-views .view a'),
        ViewTypeSwitch: $('.views-section .date-views [name=dview]'),
        CountText: $('.views-section .event-count .listed'),
        TotalText: $('.views-section .event-count .total'),
        MoreBtn: $('.more-events .btn-more-events'),
        StartDate: moment(new Date()),
        EndDate: moment(new Date()).add(11, 'months'),
        PreviousDate: moment(new Date()).subtract(11, 'months'),
        PageNum: 1,
        Init: function () {
            var that = this;
            this.ViewBtns.click(function (e) {
                that.View = $(this).data('viewport');
                that.ViewType = 'month';
                e.preventDefault();
            });
            this.DateArrows.click(function (e) {
                var $this = $(this);
                if ($this.hasClass('previous')) {
                    that.Date = (moment(that.StartDate).subtract(1, that.ViewType + 's'));
                }
                if ($this.hasClass('next')) {
                    that.Date = (moment(that.StartDate).add(1, that.ViewType + 's'));
                }
                that.UpdateArrows();
                e.preventDefault();
            });
            this.ViewTypeSwitch.change(function () {
                that.ViewType = this.value;
            });
            this.MoreBtn.click(function () {
                that.LoadMoreEvents();
            });
            // set defaults
            this.Count = this.EventsContainer.data('count');
            this.View = 'list-view';
            this.ViewType = 'month';
            this.Date = moment('July 2019');
        },
        UpdateArrows: function() {
            if (this.StartDate.isSameOrBefore(this.PreviousDate, 'month')) {
                this.DateArrows.filter('.previous').addClass('arrow-desabled');
            } else {
                this.DateArrows.filter('.previous').removeClass('arrow-desabled');
            }
            if (this.StartDate.isSameOrAfter(moment(this.EndDate).subtract(1, 'months'), 'month')) {
                this.DateArrows.filter('.next').addClass('arrow-desabled');
            } else {
                this.DateArrows.filter('.next').removeClass('arrow-desabled');
            }
        },
        UpdateMoreBtn: function() {
            if (this.TotalCount > this.Count) {
                this.MoreBtn.removeClass('hidden');
            } else {
                this.MoreBtn.addClass('hidden');
            }
        },
        LoadMoreEvents: function() {
            this.LoadEvents(this.PageNum++);
        },
        LoadEvents: function(pageNum = 1) {
            var that = this;
            this.PageNum = pageNum;
            this.GetAjaxData(Urls.EventsSearch, ajaxMethod, this.GetSendData(), function (data) {
                that.EventData = data;
            });
        },
        GetSendData: function() {
            var that = this,
                // check date type (year / month), set to EndDate if year else set to startdata + 1 month if month
                eventsEndDate = this.ViewType === 'year' ? this.EndDate.format('MMMM YYYY') : 
                                moment(this.StartDate).add(1, 'months').format('MMMM YYYY'),
                sendDataObj = {}

            // add filters as property name and push multiple filters of the same type into array
            InformaFilters.ActiveFilters.forEach(function (filterObj) {
                if (!sendDataObj[filterObj.type])
                    sendDataObj[filterObj.type] = [];
                sendDataObj[filterObj.type].push(filterObj.value);
            });

            // add non filter props
            sendDataObj.CurrentPage = this.EventsContainer.data('currentpage');
            sendDataObj.ViewMode = this.View.substring(0, this.View.indexOf('-'));

            switch(this.View) {
                case 'list-view':
                case 'tile-view':
                    // if event listing explicitly set MonthYear property to EventsStartDate
                    sendDataObj.EventsStartDate = sendDataObj.MonthYear;
                    delete sendDataObj.MonthYear;

                    // add event listing specific non filter props
                    sendDataObj.PageNo = this.PageNum;
                    sendDataObj.EventsEndDate = eventsEndDate;
                    sendDataObj.PageSize = this.Count;
                    break;
                case 'calendar-view':
                    break;
            }

            return JSON.stringify(sendDataObj);
        },
        GetAjaxData: function (url, method, data, SCallback, Errcallback, SearchType) {
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
        UpdateHeaderDate: function() {
            // update header text based on viewtype
            if (this.ViewType === 'year') {
                this.HeaderDate.text(this.StartDate.format('MMM YYYY') + ' - ' + this.EndDate.format('MMM YYYY'));
            } else {
                this.HeaderDate.text(this.StartDate.format('MMMM YYYY'));
            }
        },
        set View(view) {
            // set container attributes for future reference
            this.EventsContainer.attr('data-eview', view);
            this.BodyContainer.removeClass('list-view tile-view calendar-view').addClass(view);

            // reset active class for view buttons for styling
            this.ViewBtns.filter('.active').removeClass('active');
            this.ViewBtns.filter('[data-viewport="' + view + '"]').addClass('active');

            // render calendar on view switch
            // if (view === 'calendar-view') 
            //     InformaFC.RenderView();
            this.LoadEvents();

            // rest tile heights because we are expecting new tiles
            if (view === 'tile-view')
                InformaEventTiles.EqualHeight();
        },
        get View() {
            if (!this.EventsContainer.attr('data-eview'))
                this.EventsContainer.attr('data-eview', this.ViewBtns.filter('.active').data('viewport'));
            return this.EventsContainer.attr('data-eview');
        },
        set ViewType (type) {
            //if active radio not set, set it
            this.ViewTypeSwitch.filter('[value="' + type + '"]').trigger("click");

            // set container attributes for future reference
            this.EventsContainer.attr('data-edatetype', type);
            this.BodyContainer.removeClass('month year').addClass(type);

            // set viewtypes for all states
            InformaFC.ViewType = type;
            InformaEventList.ViewType = type;
            InformaEventTiles.ViewType = type;

            // render calendar on view switch
            if (this.View === 'calendar-view') 
                InformaFC.RenderView();
        },
        get ViewType () {
            return this.EventsContainer.attr('data-edatetype');
        },
        set Date(momentDate) {
            // set date in all states if date is different
            if (!momentDate.isSame(InformaFilters.Date, 'month')) 
                InformaFilters.Date = momentDate;
            if (!momentDate.isSame(InformaEventTiles.Date, 'month')) 
                InformaEventTiles.Date = momentDate;
            if (!momentDate.isSame(InformaEventList.Date, 'month')) 
                InformaEventList.Date = momentDate;
            if (!momentDate.isSame(InformaFC.Date, 'month')) 
                InformaFC.Date = momentDate;
            
            this.StartDate = momentDate;

            // load when date is set
            this.LoadEvents();
        },
        get Date() {
            return this.StartDate;
        },
        set EventData(data) {
            this.TotalCount = parseInt(data.TotalResults);
            this.UpdateHeaderDate();
            // TODO: add this.RenderView() > this.UpdateHeaderDate(); this.updateCountText
            InformaEventList.RenderView(data);
            InformaEventTiles.RenderView(data);

            if (this.View === 'calendar-view') 
                InformaFC.RenderView();
            
            // equal height new content
            if (this.View === 'tile-view')
                InformaEventTiles.EqualHeight();
            InformaFC.EventData = data;
        },
        set Count(count) {
            this.EventsContainer.data('count', count);
            this.CountText.text(count);
        },
        get Count() {
            return this.EventsContainer.data('count');
        },
        set TotalCount(count) {
            this.EventsContainer.attr('total-count', count);
            this.TotalText.text(count);
            this.UpdateMoreBtn();
        },
        get TotalCount() {
            return parseInt(this.EventsContainer.attr('total-count'));
        },
    }

    isDev = function () {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    init = function () {
        if(isDev()) {
            ajaxMethod = 'GET';
        }

        // url search func
        // ?fname=Jawaad&lname=sadasd = [{fname: "Jawaad"}, {lname: "sadasd"}]
        var locsearch = location.search.substr(1),
            keyValObj = {},
            searchValues = []
            console.log(locsearch);
            
            locsearch.split('&').forEach(function (kvPairStr) {
                console.log(kvPairStr);
                var keyValObj = {},
                    key = kvPairStr.split('=')[0],
                    val = kvPairStr.split('=')[1]
                keyValObj[key] = val;
                searchValues.push(keyValObj);
            });

            console.log(searchValues);
        InformaEventsController.Init();
        InformaFilters.Init();
        InformaEventList.Init();
        InformaEventTiles.Init();
        InformaFC.Init();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());