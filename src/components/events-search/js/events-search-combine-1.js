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
    var Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        ajaxMethod = 'POST',
        //methods
        init, InformaFilters, InformaEventTiles, InformaEventList, InformaFC, InformaEventsController, InformaEventQuery, isDev;

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
            
            // init chosen my way :P
            this.Selects.each(function () {
                var $this = $(this);
                $this.chosen('destroy');
                $this.chosen({
                    width: '100%',
                    disable_search: true
                });
            });

            // event listners for all dd filters
            this.Selects.change(function () {
                var $this = $(this);

                if (!this.value) return;

                // if month let InformaEventsController handle it
                if (this.name === 'MonthYear') {
                    InformaEventsController.Date = moment(this.value);
                } else {
                    // add value to filter
                    that.AddFilter({ type: this.name, text: $this.children('option:selected').text() });
                    InformaEventQuery.AddProp(this.name, $this.children('option:selected').text());

                    // revert selected option to All
                    $this.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                    $this.trigger("chosen:updated");
                }
            });
        },
        ProcessPreselectedFilters: function() {
            this.Selects.each(function () {
                var $select = $(this),
                    selectName = $select.attr('name'),
                    $selectedOpts = $select.find('[selected]'),
                    isFilterSet = false

                // add selected options to defaults
                $selectedOpts.each(function () {
                    if (isFilterSet) {
                        // assume its the last one (to avoid lookup)
                        InformaEventQuery.Defaults[InformaEventQuery.Defaults.length - 1].values.push($selectedOpts.text());
                    } else {
                        InformaEventQuery.Defaults.push({ name: selectName, values: [$selectedOpts.text()] })
                        isFilterSet = true;
                    }
                });

                // revert selected option to All
                $select.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                $select.trigger("chosen:updated");
            });
            // console.log(InformaEventQuery.Defaults);
        },
        AddFilter: function(filterObj) {
            var $selectedOption;
            // if the value is not empty and it exists as an option element
            if (filterObj.value === '') return;

            // match via contained text, ugh!
            this.Selects.filter('[name="' + filterObj.type + '"]').children('option').each(function () {
                if ($(this).text() === filterObj.text) {
                    $selectedOption = $(this);
                    return false
                }
            });
            if (!$selectedOption || $selectedOption.length === 0) return;
            filterObj.value = $selectedOption.attr('value');

            // remove if month to limit 1 selected month at a time
            if (filterObj.type === 'MonthYear') 
                this.RemoveFilter('MonthYear');
            
            // add it
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
                    InformaEventQuery.RemoveProp(type, $filterEl.children('.text').text());
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
            this.AddFilter({ type: 'MonthYear', text: $activeDateOption.attr('value') });
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
            // prerequisite for setting the select month date is that it needs to be populate
            if (!this.Selects.filter('[name="MonthYear"]').attr('populated'))
                this.PopulateMonthSelect();
            this.setMonthSelectDate();
        },
        get Date () {
            return this.Container.data('date');
        }
    }

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
        TemplateName: (Templates.EventpageTileviewTemplate !== "undefined") ? Templates.EventpageTileviewTemplate : "",
        Template: null,
        Init: function() {
            this.Template = Handlebars.compile(this.TemplateName);
        },
        RenderView: function(data) {
            this.AddEvents(data.Events);
            this.EqualHeight();
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
                html = '',
                prevEventDate, currEventDate

            // TODO: efficiency: replace with for i loop for better performance
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    evtObj = results[key];

                    // if new month, append a new divider
                    currEventDate = moment(evtObj.EventStartDate);
                    if (!currEventDate.isSame(prevEventDate, 'month'))
                        html += '<div class="col-12 month-divider"><h3>' + currEventDate.format('MMMM YYYY').toUpperCase()
                        + '</h3></div>'
                    prevEventDate = moment(evtObj.EventStartDate);
                    
                    this.AddDateToEvent(evtObj);
                    // TODO: add date subheading when event is next month
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
        Modal: $((Templates.EventpageModalTemplate !== "undefined") ? Templates.EventpageModalTemplate : ""),
        Init: function () {
        },
        RenderView: function (data = null) {
            this.InitFC();
            this.GoToStartDate();

            if (data) {
                this.EventData = data;
                // remove events-loaded flag so events can load
                this.ActiveContainer.removeAttr('events-loaded')
            }

            // only attempt to load events if event data is set
            if (this.EventData) {
                this.RenderEventData();
            }
        },
        InitFC: function () {
            var that = this,
                initOptions,
                _vp = INFORMA.global.device.viewportN,
                vmLenInd;

            // if FC rendered then just update the date, else build it (build once)
            if (this.ActiveContainer.attr('rendered')) return;

            switch (that.ViewType) {
                case 'month':
                    initOptions = {
                        header: { left: 'prev', center: 'title', right: 'next' },
                        eventLimit: false, // Limits the number of events displayed on a day. The rest will show up in a popover.
                        contentHeight: _vp === 2 ? 100 : 805, // Sets the height of the view area of the calendar.
                        weekMode: 'liquid', //Determines the number of weeks displayed in a month view. Also determines each week’s height.
                        // firstDay: 1, // The day that each week begins.
                        dayNamesShort: _vp === 2 ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : _vp === 1 ? ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'] : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'], // Abbreviated names of days-of-week.
                        dayClick: function (date, jsEvent, view) { // Triggered when the user clicks on a date or a time.
                            // do popup with list view template
                            var evtObj,
                                html = '',
                                results = that.EventData.Events
                            for (var key in results) {
                                if (results.hasOwnProperty(key)) {
                                    evtObj = results[key];

                                    if (date.isBetween(moment(evtObj.EventStartDate), moment(evtObj.EventEndDate), null, '[]')) {
                                        InformaEventList.AddDateToEvent(evtObj);
                                        html += InformaEventList.Template({ results: evtObj });
                                    }
                                }
                            }
                            if (!html) return;
                            that.Modal.find('.modal-body').attr('data-view', 'list-view').html(html);
                            InformaEventsController.EventsContainer.append(that.Modal);

                            that.Modal.modal('show');
                        },
                        eventAfterAllRender: function (view) { // Triggered after all events have finished rendering.
                            // var _vp = INFORMA.global.device.viewportN;

                            // // add classes for day click in mobile
                            // // if (_vp === 2) {
            
                            //     var Events = $('.fc-view-container .events');
            
                            //     Events.each(function () {
                            //         var DateField = $(this).data('date');
                            //         $('td.fc-day-number[data-date="' + DateField + '"]').addClass('events-now');
                            //         $('td.fc-widget-content[data-date="' + DateField + '"]').addClass('event-present');
                            //     })
                            // // }
            
                            // add short month text to non-active month for desktop
                            // if (_vp === 0) {
                            //     var OtherMonths = $('.fc-day-number.fc-other-month');
            
                            //     OtherMonths.each(function () {
                            //         var DateView = $(this).data('date'),
                            //             Month = moment(new Date(DateView)).format('MMM'),
                            //             Dates = moment(new Date(DateView)).format('DD');
            
                            //         $(this).html(Dates + '<sup>\/' + Month + '</sup>');
                            //     })
                            // }
                        },
                        eventAfterRender: function (event, element, view) {
                            // add active class to cell for event indicator
                            var $elSkeleton = element.closest('.fc-content-skeleton'),
                                datAttr = event.start.format('YYYY-MM-DD');
                            $elSkeleton.find('.fc-day-number[data-date=' + datAttr + ']').addClass('event-now');
                            $elSkeleton.siblings('.fc-bg').find('.fc-day[data-date=' + datAttr + ']').addClass('event-present');
                        },
                        eventRender: function (event, element, view) { // Triggered while an event is being rendered. A hook for modifying its DOM.
                            var CurrentDate = new Date(),
                                ItemDate = new Date(event.start._i),
                                DateAttr = moment(ItemDate).format('YYYY-MM-DD'),
                                CountryText = ""
                            // console.log('event', event);
                            // console.log('element', element);
                            // console.log('view', view);
                            // console.log(view.start.format('YYYY-MM-DD'))

                            if (event.Country != null) {
                                CountryText = event.Country;
                            }
            
                            // at the moment past and future dates are styled the same, so ignore
                            // if (!event.EventText && event.Link !== null) {
            
                            //     if (moment(CurrentDate) > moment(ItemDate)) {
                            //         if (moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                            //             return $('<div data-date="' + DateAttr + '" class="events current"><p class="title">' + event.title + '</p></div>');
                            //         } else {
                            //             return $('<div data-date="' + DateAttr + '" class="events disabled"><p class="title">' + event.title + '</p></div>');
                            //         }
                            //     } else {
                            //         return $('<div data-date="' + DateAttr + '" class="events"><p class="title">' + event.title + '</p></div>');
                            //     }
                            // } else {
                                // return $('<div data-date="' + DateAttr + '" class="events disabled"><p class="title">' + event.title + '</p></div>');
                                return $('<div data-date="' + DateAttr + '" class="events"><p class="title">' + event.title + '</p></div>');
                            // }
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
                            var $elSkeleton = element.closest('.fc-content-skeleton'),
                                datAttr = event.start.format('YYYY-MM-DD');
                            $elSkeleton.find('.fc-day-number[data-date=' + datAttr + ']').addClass('event-now');
                            $elSkeleton.siblings('.fc-bg').find('.fc-day[data-date=' + datAttr + ']').addClass('event-present');
                            // add event-present class to cell for event indicator
                            // element.closest('.fc-content-skeleton').find('.fc-day-number[data-date=' + event.start.format('YYYY-MM-DD') + ']').addClass('event-present');
                        },
                        eventAfterAllRender: function (view) {
                            var $fcView = view.el,
                                $firstEventEl = view.el.find('.fc-day.event-present'),
                                eventMoment;
                            
                            if ($firstEventEl.length > 0) {
                                eventMoment = moment($firstEventEl.attr('data-date'), 'YYYY-MM-DD');

                                // add data, class and click event to go to month view
                                if ($fcView.attr('click-added')) return;
                                $fcView.data('month', eventMoment).addClass('event-present').attr('click-added', true).on('click', function () {
                                    var targetDate = $(this).data('month');
                                    if (targetDate.isValid()) {
                                        InformaEventsController.Date = targetDate;
                                        InformaEventsController.ViewType = 'month';
                                    }
                                });
                            } else {
                                $fcView.removeData('month').removeClass('event-present').removeAttr('click-added').off('click');
                            }
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
                if (index === vmLenInd) {
                    that.ActiveContainer.attr('rendered', 'true');
                }
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
        RenderEventData: function () {
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

            if (this.ActiveContainer.attr('events-loaded')) return;

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
                            // console.log('isSame', evtStartDate.isSame(yvMonthDate, 'month'));
                            if (evtStartDate.isSame(yvMonthDate, 'month')) {
                                $(this).fullCalendar('renderEvent', eventFCObj, false);
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
                                // console.log('isSame', evtStartDate.isSame(yvMonthDate, 'month'));
                                if (evtStartDate.isSame(yvMonthDate, 'month')) {
                                    $(this).fullCalendar('renderEvent', eventFCObj, false);
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

            this.RenderView();
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
        EventsContainer: $('#events-calendar'),
        DateArrows: $('.header .arrows'),
        HeaderDate: $('.header h2'),
        ViewBtns: $('.views-section .state-views .view a'),
        ViewTypeSwitch: $('.views-section .date-views [name=dview]'),
        CountText: $('.views-section .event-count .listed'),
        TotalText: $('.views-section .event-count .total'),
        MoreBtn: $('.more-events .btn-more-events'),
        StartDate: null,
        EndDate: null,
        PreviousDate: null,
        PageNum: 1,
        Init: function () {
            var that = this;
            this.ViewBtns.click(function (e) {
                that.View = $(this).data('viewport');
                that.ViewType = 'month';
                InformaEventQuery.AddProp('View', $(this).data('viewport'));
                InformaEventQuery.AddProp('ViewType', 'month');
                e.preventDefault();
            });
            this.DateArrows.click(function (e) {
                var $this = $(this);
                if ($this.hasClass('previous')) {
                    InformaEventQuery.AddProp('MonthYear', (moment(that.Date).subtract(1, that.ViewType + 's')).format('MMMM YYYY'));
                    that.Date = (moment(that.Date).subtract(1, that.ViewType + 's'));
                }
                if ($this.hasClass('next')) {
                    InformaEventQuery.AddProp('MonthYear', (moment(that.Date).add(1, that.ViewType + 's')).format('MMMM YYYY'));
                    that.Date = (moment(that.Date).add(1, that.ViewType + 's'));
                }
                that.UpdateArrows();
                e.preventDefault();
            });
            this.ViewTypeSwitch.change(function () {
                that.ViewType = this.value;
                InformaEventQuery.AddProp('ViewType', this.value);
            });
            this.MoreBtn.click(function () {
                that.LoadMoreEvents();
            });

            // set local prop from container
            this.Count = this.EventsContainer.data('count');
        },
        UpdateArrows: function() {
            if (this.Date.isSameOrBefore(this.PreviousDate, 'month')) {
                this.DateArrows.filter('.previous').addClass('arrow-desabled');
            } else {
                this.DateArrows.filter('.previous').removeClass('arrow-desabled');
            }
            if (this.Date.isSameOrAfter(moment(this.EndDate).subtract(1, 'months'), 'month')) {
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
            // console.log('LoadEvents')
            var that = this;
            this.PageNum = pageNum;
            this.GetAjaxData(Urls.EventsSearch, ajaxMethod, this.GetSendData(), function(data) {
                that.TotalCount = parseInt(data.TotalResults);
                that.UpdateHeaderDate();
                // TODO: add that.RenderView() > that.UpdateHeaderDate(); that.updateCountText
                
                switch (that.View) {
                    case 'list-view':
                        InformaEventList.RenderView(data);
                        break;
                    case 'tile-view':
                        InformaEventTiles.RenderView(data);
                        break;
                    case 'calendar-view':
                        InformaFC.RenderView(data);
                        break;
                }
            });
        },
        GetSendData: function() {
            var that = this,
                // check date type (year / month), set to EndDate if year else set to startdata + 1 month if month
                eventsEndDate = this.ViewType === 'year' ? this.EndDate.format('MMMM YYYY') : 
                                moment(this.Date).endOf('month').format('MMMM YYYY'),
                sendDataObj = {}

            // add filters as property name and push multiple filters of the same type into array
            InformaFilters.ActiveFilters.forEach(function (filterObj) {
                if (!sendDataObj[filterObj.type])
                    sendDataObj[filterObj.type] = [];
                sendDataObj[filterObj.type].push(filterObj.value);
            });

            // add non filter props
            sendDataObj.CurrentPage = this.EventsContainer.data('currentpage');
            sendDataObj.ViewMode = this.View === 'calendar-view' ? 'calendar' : 'list';

            switch (this.View) {
                case 'list-view':
                case 'tile-view':
                    // add event listing specific non filter props
                    sendDataObj.PageNo = this.PageNum;
                    sendDataObj.PageSize = this.Count;
                case 'calendar-view':
                    // explicitly set MonthYear property to EventsStartDate
                    sendDataObj.EventsEndDate = eventsEndDate;
                    sendDataObj.EventsStartDate = sendDataObj.MonthYear;
                    delete sendDataObj.MonthYear;
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
            var _vp = INFORMA.global.device.viewportN,
                monthViewDateFormat = _vp === 2 ? 'MMM YYYY' : 'MMMM YYYY';
            // update header text based on viewtype
            if (this.ViewType === 'year') {
                this.HeaderDate.text(this.Date.format('MMM YYYY') + ' - ' + moment(this.Date).add(11, 'months').format('MMM YYYY'));
            } else {
                this.HeaderDate.text(this.Date.format(monthViewDateFormat));
            }
        },
        set View(view) {
            // set container attributes for future reference
            this.EventsContainer.attr('data-eview', view);
            this.BodyContainer.removeClass('list-view tile-view calendar-view').addClass(view);

            // reset active class for view buttons for styling
            this.ViewBtns.filter('.active').removeClass('active');
            this.ViewBtns.filter('[data-viewport="' + view + '"]').addClass('active');
            
            this.LoadEvents();
        },
        get View() {
            if (!this.EventsContainer.attr('data-eview'))
                this.EventsContainer.attr('data-eview', this.ViewBtns.filter('.active').data('viewport'));
            return this.EventsContainer.attr('data-eview');
        },
        set ViewType (viewtype) {
            //if active radio not set, set it
            this.ViewTypeSwitch.filter('[value="' + viewtype + '"]').trigger("click");

            // set container attributes for future reference
            this.EventsContainer.attr('data-edatetype', viewtype);
            this.BodyContainer.removeClass('month year').addClass(viewtype);

            // set viewtypes for all states
            if (this.View === 'calendar-view') {
                InformaFC.Date = this.Date;
                InformaFC.ViewType = viewtype;
            }
            // InformaEventList.ViewType = viewtype;
            // InformaEventTiles.ViewType = viewtype;
            
            this.UpdateHeaderDate();
        },
        get ViewType () {
            return this.EventsContainer.attr('data-edatetype');
        },
        set Date(momentDate) {
            // set date limits, first time StartDate is set
            if (!this.StartDate) {
                this.PreviousDate = moment(momentDate).subtract(11, 'months');
                this.EndDate = moment(momentDate).add(11, 'months');
            }
            this.StartDate = momentDate;

            // set date in all states if date is different
            // if (!momentDate.isSame(InformaFilters.Date, 'month')) 
                InformaFilters.Date = momentDate;
            // if (!momentDate.isSame(InformaEventTiles.Date, 'month')) 
                InformaEventTiles.Date = momentDate;
            // if (!momentDate.isSame(InformaEventList.Date, 'month')) 
                InformaEventList.Date = momentDate;
            // if (!momentDate.isSame(InformaFC.Date, 'month')) 
                InformaFC.Date = momentDate;
            
            // load when date is set
            this.LoadEvents();
        },
        get Date() {
            return this.StartDate;
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
        UpdateViewsFromQuery: function(activePropsObj) {
            if (!activePropsObj.hasOwnProperty('MonthYear') || !activePropsObj.hasOwnProperty('View') || !activePropsObj.hasOwnProperty('ViewType')) {
                console.warn("essential properties missing!")
                return;
            }
            // explicitly set essential props in required order
            this.Date = moment(activePropsObj['MonthYear'][0]);
            this.View = activePropsObj['View'][0];
            this.ViewType = activePropsObj['ViewType'][0];

            // filters
            for (var key in activePropsObj) {
                if (activePropsObj.hasOwnProperty(key) && key !== 'MonthYear' && key !== 'View' && key !== 'ViewType') {
                    // else assume filter
                    activePropsObj[key].forEach(function (filterText) {
                        InformaFilters.AddFilter({ type: key, text: filterText });
                    });
                }
            }

            this.LoadEvents();
        }
    }

    InformaEventQuery = {
        ActiveQuery: '',
        SanitizedQueryProps: [],
        ActiveProperties: [],
        Defaults: [],
        Init: function() {
            this.Defaults = [
                { name: 'MonthYear', values: [moment(new Date()).format('MMMM YYYY')] },
                { name: 'View', values: [InformaEventsController.ViewBtns.filter('.active').data('viewport') || 'list-view'] },
                { name: 'ViewType', values: ['month'] },
                // { name: 'SectorId', values: ['foo', 'foo'] },
                // { name: 'EventType', values: ['foo', 'foo'] },
                // { name: 'Country', values: ['foo', 'foo'] },
                // { name: 'SegmentId', values: ['foo', 'foo'] },
                // { name: 'RegionId', values: ['foo', 'foo'] },
                // { name: 'ProductId', values: ['foo', 'foo'] }
            ]
            InformaFilters.ProcessPreselectedFilters();
            if (this.isqueried) {
                this.SanitizeQuery();
                // this.ActiveProperties = this.SanitizedQueryProps.slice(0);
            } else {
                this.ActiveProperties = this.Defaults.slice(0);
            }
            // console.log(this.ActiveProperties);
            this.ApplyPropsToController();
            this.SetQueryFromProps();
        },
        SanitizeQuery: function() {
            var that = this,
                rawQueryArr = location.search.substr(1).split('&'),
                rQLength = rawQueryArr.length,
                rQCount,
                rQItem,
                sanPropsArr = this.SanitizedQueryProps
            
            // loop query
            for (rQCount = 0; rQCount < rQLength; rQCount++) {
                rQItem = { name: unescape(rawQueryArr[rQCount].split('=')[0]), values: unescape(rawQueryArr[rQCount].split('=')[1]) };
                // prevent addition of dupes
                if (!sanPropsArr.find(function (sanitizedObj) { return sanitizedObj.name === rQItem.name })) {
                    // console.log(rQItem.values)
                    sanPropsArr.push({ name: rQItem.name, values: rQItem.values });
                }
            }

            // validate
            sanPropsArr = sanPropsArr.map(function (sanitizedObj) { return that.ValidateObject(sanitizedObj.name, sanitizedObj.values) });
            // remove nulls
            sanPropsArr = sanPropsArr.filter(function (sanitizedObj) { return !!sanitizedObj });
            // turn values into array
            sanPropsArr = sanPropsArr.map(function (sanitizedObj) { return { name: sanitizedObj.name, values: sanitizedObj.value.split(',') } });

            // console.log('sanPropsArr', sanPropsArr);

            // fill in defaults
            this.Defaults.forEach(function(defaultObj) {
                var sanitizedObj = sanPropsArr.find(function (sanitizedObj) { return sanitizedObj.name === defaultObj.name })
                // console.log('notdetault', !sanPropsArr.find(function (sanitizedObj) { return sanitizedObj.name === defaultObj.name }));
                if (sanitizedObj) {
                    // combine defaults and queried filters
                    if (defaultObj.name !== 'MonthYear' && defaultObj.name !== 'View' && defaultObj.name !== 'ViewType') {
                        // concat unique
                        defaultObj.values.forEach(function (defaultValue) {
                            if (sanitizedObj.values.indexOf(defaultValue) === -1)
                                sanitizedObj.values.push(defaultValue);
                        })
                        
                    }
                } else {
                    sanPropsArr.push(defaultObj);
                }
            });

            // console.log('sanPropsArr', sanPropsArr);

            this.ActiveProperties = sanPropsArr;
        },
        ValidateObject: function(name, value) {
            var isValid = false,
                filterValueArr,
                fvLength,
                fvCount,
                fvalue,
                isFvalueValid = false;
            
            switch (name) {
                case 'View':
                    isValid = (value === 'list-view' || value === 'tile-view' || value === 'calendar-view');
                    break;
                case 'ViewType':
                    isValid = (value === 'month' || value === 'year');
                    break;
                case 'MonthYear':
                    isValid = moment(value).isValid();
                    break;
                default:
                    // assume filter, check texts for values, if any are invalid return false
                    // TODO: should this be in filters?
                    filterValueArr = value.split(',');
                    fvLength = filterValueArr.length;
                    for (fvCount = 0; fvCount < fvLength; fvCount++) {
                        fvalue = filterValueArr[fvCount];
                        isFvalueValid = false;
                        // console.log(fvalue);
                        InformaFilters.Selects.children('option').each(function () {
                            if ($(this).text() === fvalue) {
                                isFvalueValid = true;
                                return false;
                            }
                        });
                        
                        // remove if invalid
                        if (!isFvalueValid) {
                            filterValueArr.splice(fvCount, 1);
                            fvCount--;
                            fvLength = filterValueArr.length;
                        }
                    }

                    // prop only valid if values havent all been removed
                    isValid = filterValueArr.length > 0;

                    // modify the original value with valid props
                    if (isValid)
                        value = filterValueArr.join(',');
            }
            // console.log(name, 'is valid', isValid);
            return isValid ? {name: name, value: value} : null;
        },
        AddProp: function(name, value) {
            var haveActivePropsChanged = false,
                existingEl = this.ActiveProperties.find(function (activeObj) { return activeObj.name === name }),
                existingValInd

            // if the element already exists, then drill down for further checks
            if (existingEl) {
                // for filters, check for through valus array, for non-filter props set first element
                if (name === 'View' || name === 'ViewType' || name === 'MonthYear') {
                    if (existingEl.values[0] !== value) {
                        existingEl.values[0] = value;
                        haveActivePropsChanged = true;
                    }
                } else {
                    // if val exists in values, override else add it
                    existingValInd = existingEl.values.indexOf(value);
                    if (existingValInd >= 0) {
                        if (existingEl.values[existingValInd] !== value) {
                            existingEl.values[existingValInd] = value;
                            haveActivePropsChanged = true;
                        }
                    } else {
                        existingEl.values.push(value);
                        haveActivePropsChanged = true;
                    }
                }
            } else {
                // new value
                this.ActiveProperties.push({ name: name, values: [value] });
                haveActivePropsChanged = true;
            }

            if (haveActivePropsChanged) {
                this.SetQueryFromProps();
            }
        },
        RemoveProp: function(name, value) {
            var haveActivePropsChanged = false,
                existingElInd = this.ActiveProperties.findIndex(function (activeObj) { return activeObj.name === name }),
                existingValInd

            // if the element already exists, then drill down for further checks
            if (existingElInd >= 0) {
                // for filters, check for through valus array, for non-filter props set first element
                // technically redundant because these props are always set
                if (name === 'View' || name === 'ViewType' || name === 'MonthYear') {
                    this.ActiveProperties.splice(existingElInd, 1);
                    haveActivePropsChanged = true;
                } else {
                    // if value exists in filters array remove it
                    existingValInd = this.ActiveProperties[existingElInd].values.indexOf(value);
                    if (existingValInd >= 0) {
                        this.ActiveProperties[existingElInd].values.splice(existingElInd, 1);
                        // now remove whole filter obj if values are empty
                        if (this.ActiveProperties[existingElInd].values.length === 0) {
                            this.ActiveProperties.splice(existingElInd, 1);
                        }
                        haveActivePropsChanged = true;
                    }
                }
            }

            if (haveActivePropsChanged) {
                this.SetQueryFromProps();
            }
        },
        ApplyPropsToController: function() {
            var activePropsObj = {}
            this.ActiveProperties.forEach(function(kvPairObj) {
                activePropsObj[kvPairObj.name] = kvPairObj.values;
            });
            InformaEventsController.UpdateViewsFromQuery(activePropsObj);
        },
        SetQueryFromProps: function() {
            var searchStr = '';
            this.ActiveProperties.forEach(function(kvPairObj, kvCount) {
                searchStr += kvCount > 0 ? '&' : '?';
                searchStr += escape(kvPairObj.name) + '=' + escape(kvPairObj.values.join(','))
            });
            // history.pushState({}, '', searchStr);
            this.query = searchStr;
        },
        set query(searchStr) {
            // if (this.isqueried)
                history.pushState({}, '', searchStr);

            this.ActiveQuery = searchStr;
        },
        get isqueried() {
            return !!location.search;
        }
    }

    isDev = function () {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    init = function () {
        if(isDev()) {
            ajaxMethod = 'GET';
        }
        InformaEventsController.Init();
        InformaFilters.Init();
        InformaEventList.Init();
        InformaEventTiles.Init();
        InformaFC.Init();
        InformaEventQuery.Init();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());