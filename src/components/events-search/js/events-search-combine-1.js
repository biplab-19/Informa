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
    var Templates = INFORMA.Templates,
        ajaxMethod = 'POST',
        //methods
        init, InformaFilters, InformaEventTiles, InformaEventList, InformaFC, InformaEventsController, InformaEventQuery, getMomentDate, isDev;

    InformaFilters = {
        Container: $('.events-search'),
        FiltersUI: $('.filter-section'),
        ActiveFilters: [],
        FilterContainer: $('.filter-section .active-filters'),
        FilterCountElement: $('.filter-section .active-count'),
        FilterElement: $('<div class="filter"><span class="text"></span></div>'),
        FilterDeleteBtn: $('<span class="delete icon-close"></span>'),
        Selects: $('.events-search select'),
        HaveUpdated: false,
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

                InformaEventQuery.AddProp(this.name, $this.children('option:selected').text());
                
                if (this.name !== 'MonthYear') {
                    // add value to filter
                    that.AddFilter({ type: this.name, text: $this.children('option:selected').text() });
                    
                    // revert selected option to All
                    $this.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                    $this.trigger("chosen:updated");
                }
            });
        },
        AddFilter: function(filterObj) {
            var $selectedOption;
            // if the value is not empty and it exists as an option element
            if (filterObj.value === '') return;

            // does text match an option? // match via contained text, ugh!
            this.Selects.filter('[name="' + filterObj.type + '"]').children('option').each(function () {
                if ($(this).text() === filterObj.text) {
                    $selectedOption = $(this);
                    return false
                }
            });
            if (!$selectedOption || $selectedOption.length === 0) return;
            filterObj.value = $selectedOption.attr('value');

            // does FilterContainer have it already? if so dont add it
            if (this.FilterContainer.children('[data-value="' + filterObj.value + '"]').length > 0) return;

            // remove if month to limit 1 selected month at a time
            if (filterObj.type === 'MonthYear') 
                this.ActiveFilters = this.ActiveFilters.filter(function (filterObject) {
                    return filterObject.type !== 'MonthYear';
                });
            
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

            // if MonthYear, close not added and filter prepended
            if (filterObj.type === 'MonthYear') {
                // add elements to DOM
                this.FilterContainer.prepend($filterEl);
            } else {
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
                // add elements to DOM
                this.FilterContainer.append($filterEl);
            }

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

            this.HaveUpdated = this.FiltersUI.attr('data-count') !== activeFilterLength;
            this.FiltersUI.attr('data-count', activeFilterLength);

            // update UI
            this.FilterCountElement.text(activeFilterLength);
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
                html = InformaEventsController.PageNum > 1 ? this.EventsContainer.html() : '';

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
            var sDateMoment = getMomentDate(data.EventStartDate, 'event'),
                eDateMoment = getMomentDate(data.EventEndDate, 'event')
            
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
    
            if (INFORMA.global.device.viewportN !== 2) {
                EachItem.height(highestBox + padding);
                EachItem.addClass('heightset');
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
                html = InformaEventsController.PageNum > 1 ? this.EventsContainer.html() : '',
                prevEventDate, currEventDate

            // TODO: efficiency: replace with for i loop for better performance
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    evtObj = results[key];

                    // if new month, append a new divider
                    currEventDate = getMomentDate(evtObj.EventStartDate, 'event');
                    if (!currEventDate.isSame(prevEventDate, 'month'))
                        html += '<div class="col-12 month-divider"><h3>' + currEventDate.format('MMMM YYYY').toUpperCase()
                        + '</h3></div>'
                    prevEventDate = getMomentDate(evtObj.EventStartDate, 'event');
                    
                    this.AddDateToEvent(evtObj);
                    
                    html += this.Template({ results: evtObj });
                }
            }
            this.EventsContainer.html(html);
        },
        AddDateToEvent: function(data) {
            var sDateMoment = getMomentDate(data.EventStartDate, 'event'),
                eDateMoment = getMomentDate(data.EventEndDate, 'event')
            
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
        EventData: [],
        FCEventData: [],
        ActiveContainer: null,
        ViewElements: null,
        Container: $('.events-list[data-view="calendar-view"]'),
        Modal: $((Templates.EventpageModalTemplate !== "undefined") ? Templates.EventpageModalTemplate : ""),
        Init: function () {
            this.ViewType = 'year';
            this.ViewType = 'month';
        },
        RenderView: function (data = null) {
            this.InitFC();
            this.GoToStartDate();

            if (data) {
                this.EventData = data;
                this.FCEventData = [];
                this.ProcessEventData();

                // remove events-loaded flag so events can load
                this.ActiveContainer.removeAttr('events-loaded')
            }

            // only attempt to load events if event data is set
            if (this.FCEventData.length > 0) {
                this.RenderEventData();
            }
        },
        InitFC: function () {
            var that = this,
                initOptions,
                _vp = INFORMA.global.device.viewportN,
                vmLenInd;

            // if FC rendered then just update the date, else build it (build once)
            if (this.ActiveContainer.attr('rendered')) {
                INFORMA.Spinner.Hide();
                return;
            }

            switch (that.ViewType) {
                case 'month':
                    initOptions = {
                        header: { left: 'prev', center: 'title', right: 'next' },
                        eventLimit: true, // Limits the number of events displayed on a day. The rest will show up in a popover.
                        eventLimitText: 'More',
                        contentHeight: _vp === 2 ? 100 : 805, // Sets the height of the view area of the calendar.
                        dayNamesShort: _vp === 2 ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : _vp === 1 ? ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'] : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'], // Abbreviated names of days-of-week.
                        showNonCurrentDates: false,
                        dayClick: function (date, jsEvent, view) { // Triggered when the user clicks on a date or a time.
                            // do popup with list view template
                            var evtObj,
                                html = '',
                                results = that.EventData.Events;
                            for (var key in results) {
                                if (results.hasOwnProperty(key)) {
                                    evtObj = results[key];

                                    if (date.isBetween(getMomentDate(evtObj.EventStartDate, 'event'), getMomentDate(evtObj.EventEndDate, 'event'), 'day', '[]')) {
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
                        // dayRender: function(date, cell) {
                        //     cell.append('<span class="more">More</span>');
                        // },
                        eventAfterAllRender: function (view) { // Triggered after all events have finished rendering.
                            // var _vp = INFORMA.global.device.viewportN,
                            //     $activeFcDays,
                            //     $activeFcDay,
                            //     $events,
                            //     datAttr,
                            //     dayCellTotalHeight,
                            //     accumEventsCellHeight;
                            
                            // if (_vp === 0) {
                            //     $activeFcDays = view.el.find('.fc-day.event-present');
                            //     $activeFcDays.each(function() {
                            //         $activeFcDay = $(this);
                            //         // match the height of :before pseudo (- 30) and More span height
                            //         dayCellTotalHeight = $activeFcDay.height() - 30 - $activeFcDay.children('span').height();
                            //         // console.log($activeFcDay.data('events-height') + ' > ' + dayCellTotalHeight);
                            //         if ($activeFcDay.data('events-height') > dayCellTotalHeight) {
                            //             // set the class to show 'more'
                            //             $activeFcDay.addClass('congested');
                            //             $activeFcDay.data('max-height', dayCellTotalHeight);
                            //         }
                            //     });
                            //     // reloop to look for events and hide them once overflowed
                            //     $activeFcDays.filter('.congested').each(function() {
                            //         $activeFcDay = $(this);
                            //         datAttr = $activeFcDay.data('date');
                            //         $events = view.el.find('.events[data-date="' + datAttr + '"]');
                            //         accumEventsCellHeight = 0;
                            //         $events.each(function() {
                            //             accumEventsCellHeight += $(this).height();
                            //             // if event is overflowed hide it
                            //             if (accumEventsCellHeight > $activeFcDay.data('max-height')) {
                            //                 $(this).addClass('hidden');
                            //             } 
                            //         });
                            //     });
                            // }
                            INFORMA.Spinner.Hide();
                        },
                        eventDestroy: function (event, element, view) {
                            // var $elSkeleton = element.closest('.fc-content-skeleton'),
                            //     datAttr = event.start.format('YYYY-MM-DD'),
                            //     $fcDay = $elSkeleton.siblings('.fc-bg').find('.fc-day[data-date=' + datAttr + ']');

                            // $fcDay.data('events-height', 0);
                        },
                        eventAfterRender: function (event, element, view) {
                            // add active class to cell for event indicator
                            var $elSkeleton = element.closest('.fc-content-skeleton'),
                                datAttr = event.start.format('YYYY-MM-DD'),
                                $fcDayNum = $elSkeleton.find('.fc-day-top[data-date=' + datAttr + ']'),
                                $fcDay = $elSkeleton.siblings('.fc-bg').find('.fc-day[data-date=' + datAttr + ']'),
                                fcDayTotalEventHeight = $fcDay.data('events-height') || 0;
                            
                            $fcDayNum.addClass('event-now');
                            $fcDay.addClass('event-present');
                            
                            // if(element.data('date') === datAttr && !element[0].hasAttribute('height-recorded')) {
                            //     $fcDay.data('events-height', fcDayTotalEventHeight + element.height());
                            //     element.attr('height-recorded', '');
                            // }
                        },
                        eventRender: function (event, element, view) { // Triggered while an event is being rendered. A hook for modifying its DOM.
                            var datAttr = event.start.format('YYYY-MM-DD');
                            
                            // at the moment past and future dates are styled the same, else we need to add classes to the return element
                            return $('<div data-date="' + datAttr + '" class="events"><p class="title">' + event.title + '</p></div>');
                        }
                    }
                    break;
                case 'year':
                    initOptions = {
                        header: { left: '', center: 'title', right: '' },
                        eventLimit: true,
                        titleFormat: 'MMM YYYY',
                        dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        showNonCurrentDates: false,
                        eventAfterRender: function (event, element, view) {
                            var $elSkeleton = element.closest('.fc-content-skeleton'),
                                datAttr = event.start.format('YYYY-MM-DD');
                            $elSkeleton.find('.fc-day-top[data-date=' + datAttr + ']').addClass('event-now');
                            $elSkeleton.siblings('.fc-bg').find('.fc-day[data-date=' + datAttr + ']').addClass('event-present');
                        },
                        eventAfterAllRender: function (view) {
                            var $fcView = view.el,
                                $firstEventEl = view.el.find('.fc-day.event-present'),
                                eventMoment;
                            
                            if ($firstEventEl.length > 0) {
                                eventMoment = getMomentDate($firstEventEl.attr('data-date'), 'fullcalendar');

                                // add data, class and click event to go to month view
                                if ($fcView.attr('click-added')) return;
                                $fcView.data('month', eventMoment).addClass('event-present').attr('click-added', true).on('click', function () {
                                    var targetDate = $(this).data('month');
                                    if (targetDate.isValid()) {
                                        INFORMA.Spinner.Show($('body'));
                                        setTimeout(function() {
                                            // hear force done loadevents
                                            InformaEventQuery.AddProps({
                                                MonthYear: targetDate.format('MMMM YYYY'),
                                                ViewType: 'month',
                                            });
                                            // InformaEventQuery.AddProp('MonthYear', targetDate.format('MMMM YYYY'));
                                            // InformaEventQuery.AddProp('ViewType', 'month');
                                        }, 200);
                                    }
                                });
                            } else {
                                $fcView.removeData('month').removeClass('event-present').removeAttr('click-added').off('click');
                            }
                            INFORMA.Spinner.Hide();
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
            if (!this.Date || this.Date.isSame(currFCDate, 'month')) return;

            // set all FCs based on this.Date, for month view loop runs once
            this.ViewElements.each(function (index) {
                var currMonth = moment(that.Date).add(index, 'months');
                $(this).fullCalendar('gotoDate', currMonth);
            });

            // remove events loaded flag to reload them
            this.ActiveContainer.removeAttr('events-loaded');
        },
        ProcessEventData: function() {
            var evtLength = this.EventData.Events.length,
                eventCount,
                evtDataObj = {},
                evtStartDate,
                evtEndDate,
                startEndDiff,
                multiDayCount,
                startOfStartDate,
                endOfMultiDayStartDate,
                endOfEndDate,
                multiDayStartDate

            for (eventCount = 0; eventCount < evtLength; eventCount++) {
                evtDataObj = this.EventData.Events[eventCount];
                evtStartDate = getMomentDate(evtDataObj.EventStartDate, 'event');
                evtEndDate = getMomentDate(evtDataObj.EventEndDate, 'event');
                
                // single day
                // populate
                if (evtStartDate.isSame(evtEndDate, 'day')) {
                    this.FCEventData.push({
                        title: evtDataObj.Title,
                        start: evtStartDate,
                        end: evtEndDate
                    });
                } 
                // multiday
                else {
                    // create new eventobj for each day of event 
                    // get diff from start of start date and end of end date to ensure partial days are populated
                    startOfStartDate = moment(evtStartDate).startOf('day');
                    endOfEndDate = moment(evtEndDate).endOf('day');
                    startEndDiff = endOfEndDate.diff(startOfStartDate, 'day');
                    // loop to create an event obj for each day
                    for (multiDayCount = 0; multiDayCount <= startEndDiff; multiDayCount++) {
                        // set start day of event obj by adding loop's index number of days
                        multiDayStartDate = moment(startOfStartDate).add(multiDayCount, 'days');
                        // set end of event obj based on endof start date
                        endOfMultiDayStartDate = moment(multiDayStartDate).endOf('day');
                        // populate
                        this.FCEventData.push({
                            title: evtDataObj.Title,
                            start: multiDayStartDate,
                            end: endOfMultiDayStartDate
                        });
                    }
                }
            }
        },
        RenderEventData: function () {
            var that = this,
                viewEl,
                events = this.FCEventData,
                evtLength = events.length,
                eventCount = 0,
                eventObj = {},
                vmLenInd;

            if (this.ActiveContainer.attr('events-loaded')) return;

            // setAllEvents to each element
            vmLenInd = that.ViewElements.length - 1;
            that.ViewElements.each(function (index) {
                viewEl = $(this);

                // set date in data abj for reference
                viewEl.data('date', viewEl.fullCalendar('getDate'));

                // kill all existing events
                viewEl.fullCalendar('removeEvents');

                for (eventCount = 0; eventCount < evtLength; eventCount++) {
                    eventObj = events[eventCount];

                    // add the event if its within the same month of the current FC
                    if (eventObj.start.isSame(viewEl.data('date'), 'month') || eventObj.end.isSame(viewEl.data('date'), 'month')) {
                        $(this).fullCalendar('renderEvent', eventObj);
                    }
                }

                if (index === vmLenInd) {
                    that.ActiveContainer.attr('events-loaded', 'true');
                }
            });
        },
        set ViewType (type) {
            var doRender = true;
            // disable the current ActiveContainer if already set
            if (this.ActiveContainer && this.ActiveContainer.length > 0) {
                this.ActiveContainer.removeClass('active');
                // only do render if the viewtype has changed from before
                doRender = this.ActiveContainer.attr('data-datetype') !== type;
            }
            // set active view container based on data-datetype attr
            this.ActiveContainer = this.Container.children('[data-datetype="' + type + '"]');
            this.ActiveContainer.addClass('active');
            // then children of above
            this.ViewElements = this.ActiveContainer.find('.fccal');

            if (doRender)
                INFORMA.Spinner.Show($('body'));
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
        InfiniteScrollLoadPoint: 0,
        StartDate: null,
        EndDate: null,
        PreviousDate: null,
        PageNum: 1,
        Init: function () {
            var that = this;
            this.ViewBtns.click(function (e) {
                InformaEventQuery.AddProps({
                    View: $(this).data('viewport'),
                    ViewType: 'month',
                });
                // InformaEventQuery.AddProp('View', $(this).data('viewport'));
                // InformaEventQuery.AddProp('ViewType', 'month');
                e.preventDefault();
            });
            this.DateArrows.click(function (e) {
                var $this = $(this);
                if ($this.hasClass('previous')) {
                    InformaEventQuery.AddProp('MonthYear', (moment(that.Date).subtract(1, that.ViewType + 's')).format('MMMM YYYY'));
                }
                if ($this.hasClass('next')) {
                    InformaEventQuery.AddProp('MonthYear', (moment(that.Date).add(1, that.ViewType + 's')).format('MMMM YYYY'));
                }
                that.UpdateArrows();
                e.preventDefault();
            });
            this.ViewTypeSwitch.change(function () {
                var val = this.value;
                InformaEventQuery.AddProp('ViewType', val);
            });
            this.MoreBtn.click(function () {
                that.LoadMoreEvents();
            });
        },
        AddInfiniteScrollEvent: function() {
            var that = this,
                $win = $(window);
            
            // reset load more point
            this.InfiniteScrollLoadPoint = this.MoreBtn.offset().top - $win.height() - $('#tech-main-header').height();
            
            // add listner if more events to come and not in calendar-view
            if (this.Count < this.TotalCount && this.View !== 'calendar-view') {
                $win.on('scroll.events.infinite', function() {
                    if($win.scrollTop() >= that.InfiniteScrollLoadPoint) {
                        that.LoadMoreEvents();
                        $win.off('scroll.events.infinite');
                    }
                });
            }
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
        LoadMoreEvents: function() {
            this.PageNum++;
            this.LoadEvents(this.PageNum);
        },
        LoadEvents: function(pageNum = 1) {
            // console.log('LoadEvents')
            var that = this,
                sendData = this.GetSendData();

            if (!sendData) return;

            this.PageNum = pageNum;
            this.GetAjaxData(INFORMA.Configs.urls.webservices.EventsSearch, ajaxMethod, sendData, function(data) {

                if (data) {
                    console.log('data received', data);
                } else {
                    throw "data not detectable in callback";
                }

                that.Count = data.Events.length;
                that.TotalCount = parseInt(data.TotalResults);
                that.UpdateHeaderDate();
                
                InformaEventList.RenderView(data);
                InformaEventTiles.RenderView(data);
                InformaFC.RenderView(data);

                that.AddInfiniteScrollEvent()
            });
        },
        GetSendData: function() {
            var that = this,
                eventsEndDate,
                sendDataObj = {}

            // add filters as property name and push multiple filters of the same type into array
            InformaFilters.ActiveFilters.forEach(function (filterObj) {
                if (!sendDataObj[filterObj.type])
                    sendDataObj[filterObj.type] = [];
                sendDataObj[filterObj.type].push(filterObj.value);
            });


            if (!sendDataObj.MonthYear) return null;

            // check date type (year / month), set to EndDate if year else set to startdata + 1 month if month
            eventsEndDate = this.ViewType === 'year' ? this.EndDate.format('MMMM YYYY') : 
                            moment(this.Date).add(1, 'months').format('MMMM YYYY');

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
                    sendDataObj.EventsStartDate = sendDataObj.MonthYear[0];
                    delete sendDataObj.MonthYear;
                    break;
                default:
                    console.log('View : ' + this.View + ' is invalid. Essential senddata props are not set, headsup errors are coming!');
            }

            if (!sendDataObj.EventsStartDate || typeof sendDataObj.EventsStartDate !== 'string')
                throw "EventsStartDate not valid : " + sendDataObj.EventsStartDate;
            
            if (!sendDataObj.EventsEndDate || typeof sendDataObj.EventsEndDate !== 'string')
                throw "EventsEndDate not valid : " + sendDataObj.EventsEndDate;
            
            if (!sendDataObj.CurrentPage || typeof sendDataObj.CurrentPage !== 'string')
                throw "CurrentPage not valid : " + sendDataObj.CurrentPage;

            if (this.View !== 'calendar-view') {
                if (isNaN(sendDataObj.PageNo))
                    throw "PageNo not valid : " + sendDataObj.PageNo;
                    
                if (isNaN(sendDataObj.PageSize))
                    throw "PageSize not valid : " + sendDataObj.PageSize;
            }

            console.log('data sent (pre stringification)', sendDataObj);

            return JSON.stringify({data: JSON.stringify(sendDataObj)});
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
            
            // potentially set the infinte scroll incase user is swithing to list/tile view from calendar
            this.AddInfiniteScrollEvent();
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
            
            InformaFilters.Date = momentDate;
            InformaEventTiles.Date = momentDate;
            InformaEventList.Date = momentDate;
            InformaFC.Date = momentDate;
        },
        get Date() {
            return this.StartDate;
        },
        set Count(count) {
            this.EventsContainer.data('count', count);
            this.CountText.text(count);
        },
        get Count() {
            return parseInt(this.EventsContainer.data('count'));
        },
        set TotalCount(count) {
            this.EventsContainer.attr('total-count', count);
            this.TotalText.text(count);
        },
        get TotalCount() {
            return parseInt(this.EventsContainer.attr('total-count'));
        },
        UpdateViewsFromQuery: function(activePropsObj) {
            var hasDateChanged = false,
                hasViewChanged = false,
                hasViewTypeChanged = false,
                hasFiltersChanged = false,
                stillInCalView = false,
                newView;

            // set property from default if not present with warning
            if (activePropsObj.hasOwnProperty('MonthYear')) {
                if (!this.Date || !this.Date.isSame(getMomentDate(activePropsObj['MonthYear'][0], 'select'), 'month')) {
                    this.Date = getMomentDate(activePropsObj['MonthYear'][0], 'select');
                    hasDateChanged = true;
                }
            } else {
                console.warn("MonthYear properties missing, reverting to detault");
                if (!this.Date || !this.Date.isSame(InformaEventQuery.GetDefaultProp('MonthYear')[0], 'month')) {
                    this.Date = getMomentDate(InformaEventQuery.GetDefaultProp('MonthYear')[0], 'select');
                    hasDateChanged = true;
                }
            }
            

            
            // set property from default if not present with warning
            if (activePropsObj.hasOwnProperty('View')) {
                // if (this.View !== activePropsObj['View'][0]) {
                    newView = activePropsObj['View'][0];
                //     hasViewChanged = true;
                // }
            } else {
                console.warn("View properties missing, reverting to detault");
                // if (this.View !== InformaEventQuery.GetDefaultProp('View')[0]) {
                    newView = InformaEventQuery.GetDefaultProp('View')[0];
                //     hasViewChanged = true;
                // }
            }
            stillInCalView = (this.View === 'calendar-view' && newView === 'calendar-view');
            this.View = newView;
            
            // set property from default if not present with warning
            if (activePropsObj.hasOwnProperty('ViewType')) {
                // if its already defined and its changed
                hasViewTypeChanged = !!this.ViewType && this.ViewType !== activePropsObj['ViewType'][0];
                // if (this.ViewType !== activePropsObj['ViewType'][0]) {
                    this.ViewType = activePropsObj['ViewType'][0];
                    // hasViewTypeChanged = true;
                // }
            } else {
                console.warn("ViewType properties missing, reverting to detault");
                // if (this.ViewType !== InformaEventQuery.GetDefaultProp('ViewType')[0]) {
                    this.ViewType = InformaEventQuery.GetDefaultProp('ViewType')[0];
                //     hasViewTypeChanged = true;
                // }
            }
            
            // filters
            if (InformaFilters.HaveUpdated) {
                for (var key in activePropsObj) {
                    if (activePropsObj.hasOwnProperty(key) && key !== 'MonthYear' && key !== 'View' && key !== 'ViewType') {
                        // else assume filter
                        activePropsObj[key].forEach(function (filterText) {
                            InformaFilters.AddFilter({ type: key, text: filterText });
                        });
                    }
                }
                hasFiltersChanged = true;
                InformaFilters.HaveUpdated = false;
            }

            // calendar view hasnt changed, or date has changed / filters have then to ajax
            if (!stillInCalView || hasDateChanged || hasFiltersChanged) {
                this.LoadEvents();
            }
        }
    }

    InformaEventQuery = {
        ActiveQuery: '',
        SanitizedQueryProps: [],
        ActiveProperties: [],
        Defaults: [],
        Preselected: [],
        Init: function() {
            this.Defaults = [
                { name: 'MonthYear', values: [moment().format('MMMM YYYY')] },
                { name: 'View', values: [InformaEventsController.ViewBtns.filter('.active').data('viewport') || 'list-view'] },
                { name: 'ViewType', values: [InformaEventsController.ViewTypeSwitch.filter('[checked]').attr('value') || 'month'] },
                // { name: 'SectorId', values: ['foo', 'foo'] },
                // { name: 'EventType', values: ['foo', 'foo'] },
                // { name: 'Country', values: ['foo', 'foo'] },
                // { name: 'SegmentId', values: ['foo', 'foo'] },
                // { name: 'RegionId', values: ['foo', 'foo'] },
                // { name: 'ProductId', values: ['foo', 'foo'] }
            ]
            
            if (this.isqueried) {
                this.PopulateWithQuery();
            } else {
                // this.PopulateWithDefaults();
                this.PopulateWithSelectedFilters();
            }
            // console.log(this.ActiveProperties);
        },
        PopulateWithSelectedFilters: function() {
            // combine preselected with defaults into Preselected
            var that = this;
            this.Preselected = this.Defaults.slice(0);
            InformaFilters.Selects.each(function () {
                var $select = $(this),
                    selectName = $select.attr('name'),
                    $selectedOpts = $select.find('[selected]'),
                    isFilterSet = false

                // add selected options to defaults
                $selectedOpts.each(function () {
                    if (isFilterSet) {
                        // assume its the last one (to avoid lookup)
                        that.Preselected[that.Preselected.length - 1].values.push($selectedOpts.text());
                    } else {
                        that.Preselected.push({ name: selectName, values: [$selectedOpts.text()] })
                        isFilterSet = true;
                    }
                });

                // revert selected option to All
                $select.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                $select.trigger("chosen:updated");
            });
            this.ApplyPropsToController(this.Preselected);
            this.ActiveProperties = this.Preselected.slice(0);
        },
        PopulateWithQuery: function() {
            this.SanitizeQuery();
            this.ApplyPropsToController();
            this.SetQueryFromProps();
        },
        PopulateWithDefaults: function() {
            this.ActiveProperties = this.Defaults.slice(0);
            this.ApplyPropsToController();
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
            sanPropsArr = sanPropsArr.map(function (sanitizedObj) { return that.ValidateQueryObj(sanitizedObj.name, sanitizedObj.values) });
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
        ValidateQueryObj: function(name, value) {
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
                    isValid = getMomentDate(value, 'select').isValid();
                    break;
                default:
                    // assume filter, check texts for values, if any are invalid return false
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
        AddProps: function(kvObj) {
            var haveActivePropsChanged = false,
                key;
            for (key in kvObj) {
                if (this.AddProp(key, kvObj[key], true)) {
                    haveActivePropsChanged = true;
                }
            }
            if (haveActivePropsChanged) {
                this.SetQueryFromProps();
                this.ApplyPropsToController();
            }
        },
        AddProp: function(name, value, isBulkHelper = false) {
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

            if (isBulkHelper) {
                return haveActivePropsChanged;
            } else {
                if (haveActivePropsChanged) {
                    this.SetQueryFromProps();
                    this.ApplyPropsToController();
                }
            }
        },
        RemoveProp: function(name, value) {
            var haveActivePropsChanged = false,
                existingElInd = this.ActiveProperties.findIndex(function (activeObj) { return activeObj.name === name }),
                existingValArr,
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
                    existingValArr = this.ActiveProperties[existingElInd].values;
                    existingValInd = existingValArr.indexOf(value);
                    if (existingValInd >= 0) {
                        existingValArr.splice(existingValInd, 1);
                        // now remove whole filter obj if values are empty
                        if (existingValArr.length === 0) {
                            this.ActiveProperties.splice(existingElInd, 1);
                        }
                        haveActivePropsChanged = true;
                    }
                }
            }

            if (haveActivePropsChanged) {
                this.SetQueryFromProps();
                this.ApplyPropsToController();
            }
        },
        ApplyPropsToController: function(targArr = this.ActiveProperties) {
            var activePropsObj = {}
            targArr.forEach(function(kvPairObj) {
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
        },
        GetDefaultProp: function (name) {
            return this.Defaults.find(function(defaultObj) { return defaultObj.name === name});
        }
    }

    getMomentDate = function (dateStr, dateType) {
        var expectedFormat;

        switch (dateType) {
            case 'event' :
                expectedFormat = moment.ISO_8601;
                break;
            case 'select':
                expectedFormat = 'MMMM YYYY';
                break;
            case 'fullcalendar':
                expectedFormat = 'YYYY-MM-DD';
                break;
                break;
            default:
                console.warn('dateType not handled : ' + dateType);
        }

        if (expectedFormat) {
            return moment(dateStr, expectedFormat);
        } else {
            return moment(dateStr);
        }
    }

    isDev = function () {
        return (location.hostname === "localhost" || location.hostname === "127.0.0.1");
    }

    init = function () {
        // only run if necessary elements exist
        if (InformaFilters.Container.length === 0 || InformaEventsController.EventsContainer.length === 0) return;
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