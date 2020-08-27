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
        init, InformaFilters, InformaEventTiles, InformaEventList, InformaFC, InformaEventsController, InformaEventQuery, getMomentDate, getDateString, isDev, EventSearchTextValue, _loadEventFilteredData,_bindAutoComplete;

    InformaFilters = {
        Container: $('.events-search'),
        FiltersUI: $('.filter-section'),
        ActiveFilters: [],
        FilterContainer: $('.filter-section .active-filters'),
        FilterCountElement: $('.filter-section .active-count'),
        FilterElement: $('<div class="filter"><span class="text"></span></div>'),
        FilterDeleteBtn: $('<span class="delete icon-close"></span>'),
        Selects: $('.events-search select'),
        CustomSelects: $('.events-search .custom-dd-menu'),
        HaveUpdated: false,
        AlwaysSelectedFilters: [],
        Init: function() {
            var that = this;

            this.PopulateAlwaysSelectedFilters();
            
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
                    // revert selected option to All
                    $this.children('option[value=""]').attr('selected', '').siblings().removeAttr('selected');
                    $this.trigger("chosen:updated");
                }
            });

            this.CustomSelects.each(function () {
                var $currCstmSelect = $(this),
                    $checks = $currCstmSelect.find('.input-checkbox');

                // add value method
                $currCstmSelect.data('addValues', function ($els) {
                    var $el,
                        textvalue,
                        values = $currCstmSelect.attr('data-values') === '' ? [] : $currCstmSelect.attr('data-values').split(',');
                    
                    $els.each(function () {
                        $el = $(this);
                        textvalue = $el.children('p').text();
                        if (!values.indexOf(textvalue) > -1) {
                            values.push(textvalue);
                        }
                    });

                    InformaEventQuery.AddProp($currCstmSelect.attr('name'), values);
                    $currCstmSelect.attr('data-values', values);
                });

                // remove value method
                $currCstmSelect.data('removeValues', function ($els) {
                    var $el,
                        textvalue,
                        values = $currCstmSelect.attr('data-values').split(','),
                        removedValues = [],
                        valueInd;
                        
                    $els.each(function () {
                        $el = $(this);
                        textvalue = $el.children('p').text();
                        valueInd = values.indexOf(textvalue);
                        if (valueInd > -1) {
                            values.splice(valueInd, 1);
                            removedValues.push(textvalue);
                        }
                        that.RemoveFilter($currCstmSelect.attr('name'), $el.attr('id'));
                    });

                    InformaEventQuery.RemoveProp($currCstmSelect.attr('name'), removedValues);
                    $currCstmSelect.attr('data-values', values);
                });
                
                // toggle dd listner
                $currCstmSelect.children('a').off().click(function (evt) {
                    // on open
                    if (!$currCstmSelect.hasClass('active')) {
                        // collapse all custom dds
                        that.CustomSelects.removeClass('active').children('.dropdown-content').removeClass('drop-content-active');
                        // add body listener for click outside
                        InformaEventsController.BodyContainer.off('click').on('click', function (e) {
                            // if clicked anywhere inside a dd, dont close
                            if ($(e.target).closest('.custom-dd-menu')[0] === $currCstmSelect[0] || 
                                $(e.target).attr('type') === 'checkbox' || $(e.target).attr('type') === 'radio') {
                                e.stopPropagation();
                                return;
                            }
                            
                            // collapse this custom dd
                            $currCstmSelect.removeClass('active').children('.dropdown-content').removeClass('drop-content-active');
                        });
                    } else {
                        // on close, remove body event listener
                        InformaEventsController.BodyContainer.off('click');
                    }
                    // expand current custom dd
                    $currCstmSelect.toggleClass('active').children('.dropdown-content').toggleClass('drop-content-active');
                    evt.stopPropagation();
                });

                // checkbox click listner
                $checks.off().change(function () {
                    var $parentLi = $(this).parent(".round-checkbox").parent(),
                        // if $parentLi has child UL then its a high level LI
                        isParent = $parentLi.children('ul').length > 0,
                        // if $parentLi is a all element select
                        isSelectAll = $parentLi.hasClass('selectall'),
                        isChecked = this.checked;

                    if (isParent) {
                        // toggle all children
                        $currCstmSelect.data(isChecked ? 'addValues' : 'removeValues')($parentLi.find('ul > li').not('.selectall'));
                        $parentLi.find('ul > li').not('.selectall').each(function () {
                            $(this).find('.input-checkbox')[0].checked = isChecked;
                        });
                    } else if (isSelectAll) {
                        $currCstmSelect.data(isChecked ? 'addValues' : 'removeValues')($parentLi.siblings('li'));
                        $parentLi.siblings('li').each(function () {
                            $(this).find('.input-checkbox')[0].checked = isChecked;
                        });
                    } else {
                        // toggle single
                        $currCstmSelect.data(isChecked ? 'addValues' : 'removeValues')($parentLi);
                    }
                });
            });
        },

        PopulateAlwaysSelectedFilters: function() {
            // combine preselected with defaults into AlwaysSelectedFilters
            var that = this;
            this.Selects.each(function () {
                var $select = $(this),
                    selectName = $select.attr('name'),
                    isPreselectioneDefined = false,
                    dataSelected = $select.data('selected'),
                    dataIgnore = $select.data('ignore'),
                    $selectedOpts = $select.find('option'),
                    optValue

                if (dataSelected && dataIgnore && dataSelected === dataIgnore) {
                    console.warn("Selected and Ignored filters match, therefore preselection will be ignored for: " + selectName);
                    return;
                }

                // filter options with selected data attribute
                if (dataSelected && dataSelected.length > 0) {
                    $selectedOpts = $selectedOpts.filter('[value="' + dataSelected + '"]');
                    isPreselectioneDefined = true;
                }

                // remove options that match ignore data attribute
                if (dataIgnore && dataIgnore.length > 0) {
                    $selectedOpts = $selectedOpts.not('[value="' + dataIgnore + '"]');
                    isPreselectioneDefined = true;
                    // remove element from options and update chosen
                    $select.find('option[value="' + dataIgnore + '"]').remove();
                    $select.trigger("chosen:updated");
                }

                // dont populate AlwaysSelectedFilters with all options, go to next select
                if (!isPreselectioneDefined) return;

                $selectedOpts.each(function () {
                    optValue = $(this).attr('value');
                    if (optValue !== '')
                        that.AlwaysSelectedFilters.push({ type: selectName, value: optValue });
                });
            });

            this.CustomSelects.each(function () {
                var $cselect = $(this),
                    selectName = $cselect.attr('name'),
                    isPreselectioneDefined = false,
                    dataSelected = $cselect.data('selected'),
                    dataIgnore = $cselect.data('ignore'),
                    $cselectedOpts = $cselect.find(".round-checkbox").parent(),
                    optValue

                if (dataSelected && dataIgnore && dataSelected === dataIgnore) {
                    console.warn("Selected and Ignored filters match, therefore preselection will be ignored for: " + selectName);
                    return;
                }

                // filter options with selected data attribute
                if (dataSelected && dataSelected.length > 0) {
                    $cselectedOpts = $cselectedOpts.filter('[id="' + dataSelected + '"]');
                    isPreselectioneDefined = true;
                }

                // remove options that match ignore data attribute
                if (dataIgnore && dataIgnore.length > 0) {
                    $cselectedOpts = $cselectedOpts.not('[id="' + dataIgnore + '"]');
                    isPreselectioneDefined = true;
                    // remove element from options and update chosen
                    $cselect.find('li[id="' + dataIgnore + '"]').remove();
                }

                // dont populate AlwaysSelectedFilters with all options, go to next select
                if (!isPreselectioneDefined) return;

                $cselectedOpts.each(function () {
                    optValue = $(this).attr('id');
                    if (optValue !== '')
                        that.AlwaysSelectedFilters.push({ type: selectName, value: optValue });
                });
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
                    filterObj.value = $selectedOption.attr('value');
                    return false
                }
            });

            this.CustomSelects.filter('[name="' + filterObj.type + '"]').find('li').each(function () {
                if ($(this).children('p').text() === filterObj.text) {
                    $selectedOption = $(this);
                    filterObj.value = $selectedOption.attr('id');
                    return false
                }
            });
            //GS: ignore if event search text provided
            if (filterObj.type != 'EventSearchText') {
                if (!$selectedOption || $selectedOption.length === 0) return;
            }
            //GS: Set filterobj if event search text added
            if (filterObj.type == 'EventSearchText') {
                    filterObj.value = filterObj.text;
                    EventSearchTextValue=filterObj.text;
            }
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
        AddClearFilter: function () {
            var that = this,
                $filterEl,
                $filterDelete;

            // create filter el
            $filterEl = this.FilterElement.clone();
            // populate text
            $filterEl.children('.text').text("Clear All Filters");
            // set attribute for future reference
            $filterEl.attr('data-type', "clearall");
            $filterEl.attr('data-value', "clearall");

            // create delete btn
            $filterDelete = this.FilterDeleteBtn.clone();
            // set event listener to remove filter;
            $filterDelete.click(function () {
                // clear all filters apart from month
                that.ActiveFilters = [that.ActiveFilters[0]];
                that.UpdateFilters();
                // clear event search
                $("#txtEventSearchText").val("");
                EventSearchTextValue = '';
                // reset URL param
                history.pushState({}, document.title, window.location.pathname);
                // load default events
                InformaEventQuery.PopulateWithDefaults();
            });
            $filterEl.append($filterDelete);
            // add elements to DOM
            this.FilterContainer.find("div:nth-child(1)").after($filterEl);
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
                        //GS: set empty "eventsearch" text variable when click on delete button						
                        if (type === 'EventSearchText') {
                            EventSearchTextValue = "";
							$("#txtEventSearchText").val("");//ISW-3912
                        }
                    // update filters
                    that.RemoveFilter(type, value);
                    InformaEventQuery.RemoveProp(type, $filterEl.children('.text').text());
                });
                $filterEl.append($filterDelete);
                // add elements to DOM
                this.FilterContainer.append($filterEl);
            }

        },
        UpdateFilters: function () {
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
                    //if (filterObj.type !== 'MonthYear')
                    if (filterObj.type !== 'MonthYear' && filterObj.type != 'EventSearchText')
                        that.DisableSelectOption(filterObj.type, filterObj.value);
                });
            }
            if (activeFilterLength > 1)
                this.AddClearFilter();

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
            this.CustomSelects.not('[name="MonthYear"]').each(function () {
                var $select = $(this);
                $select.find('li[id]').each(function () {
                    var $check = $(this).find('.input-checkbox');
                    // only uncheck if lowest level on multitier
                    if ($(this).children('ul').length === 0)
                        $check[0].checked = false;
                });
            });
        },
        DisableSelectOption: function(type, value) {
            var $select = this.Selects.filter('[name="' + type + '"]'),
                $cselect = this.CustomSelects.filter('[name="' + type + '"]');
            // disable current option and update chosen counterpart
            $select.children('option[value="' + value + '"]').attr('disabled', true);
            $select.trigger("chosen:updated");

            $cselect.find('li[id="' + value + '"] .input-checkbox')[0].checked = true;
        },
        PopulateMonthCustomSelect: function () {
            var $monthSelect = this.CustomSelects.filter('[name="MonthYear"]'),
                $monthSelectContainer = $monthSelect.find('.custom-drop-options'),
                loopLength = InformaEventsController.EndDate.diff(InformaEventsController.PreviousDate, 'months'),
                $monthOpt, monthCount, currMonth;

            // remove existing 
            $monthSelectContainer.empty();

            for (monthCount = 0; monthCount < loopLength; monthCount++) {
                currMonth = moment(InformaEventsController.PreviousDate).add(monthCount, 'month');

                $monthOpt = $('<li class="date-item" />');
                $monthOpt.attr('attr-index', monthCount);
                $monthOpt.attr('id', currMonth.format('MMMM YYYY'));

                $monthOpt.append('<label class="round-checkbox active"><input type="checkbox" class="input-checkbox"><span class="checkmark"></span></label>');
                $monthOpt.append('<p class="sub-seg single-level-dropdown">' + currMonth.format('MMMM YYYY') + '</p>');

                // append to select
                $monthSelectContainer.append($monthOpt);

                // event listner for checkbox
                $monthOpt.find('.input-checkbox').change(function () {
                    var $parentLi = $(this).parent(".round-checkbox").parent(),
                        isChecked = this.checked;
                    // set attribute for later
                    $monthSelect.attr('data-values', isChecked ? $parentLi.attr('id') : '');
                    // deselect others (radio behaviour)
                    $parentLi.siblings().find('.input-checkbox').each(function () {
                        this.checked = false;
                    });
                    
                    InformaEventQuery.AddProp('MonthYear', $parentLi.attr('id'));
                });

                // text triggers checkbox
                $monthOpt.children('p').click(function () {
                    $(this).closest('li').find('.input-checkbox').click();
                });
            }

            $monthSelect.children('a').click(function () {
                var $activeResults = $monthSelectContainer.children('li'),
                    $selected = $activeResults.filter('[id="' + $monthSelect.attr('data-values') + '"]'),
                    selectedInd = $activeResults.index($selected),
                    // selected option is 2 down from top of scroll
                    targInd = selectedInd > 2 ? selectedInd - 2 : 0,
                    $targ = $activeResults.eq(targInd);
    
                $monthSelectContainer.scrollTop(0).scrollTop($targ.position().top);
            });
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
            this.AddFilter({ type: 'MonthYear', text: $activeDateOption.text() });
        },
        setMonthCustomSelectDate: function () {
            var $monthSelect = this.CustomSelects.filter('[name="MonthYear"]'),
                $activeDateOption = $monthSelect.find('li[id="' + this.Date.format('MMMM YYYY') + '"]')
            
            // update month select field
            $activeDateOption.find('.input-checkbox').trigger('click');
            // add current month to active filters
            this.AddFilter({ type: 'MonthYear', text: this.Date.format('MMMM YYYY') });
        },
        set Date (momentDate) {
            this.Container.data('date', momentDate);
            // prerequisite for setting the select month date is that it needs to be populate
            if (!this.Selects.filter('[name="MonthYear"]').attr('populated'))
                this.PopulateMonthSelect();
                this.PopulateMonthCustomSelect();
            this.setMonthSelectDate();
            this.setMonthCustomSelectDate();
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
        MakeNoEvent: function() {
            return '<div class="col-xs-12 no-events"><p>There are no further events scheduled.</p></div>';
        },
        AddEvents: function(results) {
            var resultsLength = results.length,
                resultCount,
                evtObj,
                html = InformaEventsController.PageNum > 1 ? this.EventsContainer.html() : '';

            if (resultsLength > 0) {
                for (resultCount = 0; resultCount < resultsLength; resultCount++) {
                    evtObj = results[resultCount];
                    
                    evtObj.DateRange = getDateString(evtObj.EventStartDate, evtObj.EventEndDate);
                    evtObj.LocalTimeZone = new Date().getTimezoneOffset();
                    html += this.Template({ results: evtObj });
                }
            } else {
                html += this.MakeNoEvent();
            }
            this.EventsContainer.html(html);
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
        EventData: [],
        EventStartMonth: null,
        EventMonthRange: 0,
        Init: function() {
            this.Template = Handlebars.compile(this.TemplateName);
        },
        RenderView: function(data) {
            this.SetupData(data);
            this.CalculateMonthRange();
            this.RenderEvents();
        },
        SetupData: function(data) {
            // on first page reset
            if (InformaEventsController.PageNum === 1) {
                this.EventData = data.Events;
            } else {
                // append events
                this.EventData = this.EventData.concat(data.Events);
            }
            if (this.EventData.length > 0)
                this.EventStartMonth = getMomentDate(this.EventData[0].EventStartDate, 'event');
        },
        CalculateMonthRange: function() {
            var that = this,
                evtStartDate,
                prevEvtStartDate,
                evtMonthDiff;

            this.EventMonthRange = 0;
            // for each new month append month count
            this.EventData.forEach(function (evtObj) {
                evtStartDate = getMomentDate(evtObj.EventStartDate, 'event');
                if (!prevEvtStartDate) {
                    that.EventMonthRange++;
                } else {
                    evtMonthDiff = evtStartDate.startOf('month').diff(prevEvtStartDate.startOf('month'), 'month')
                    if (evtMonthDiff > 0) {
                        that.EventMonthRange += evtMonthDiff;
                    }
                }
                prevEvtStartDate = getMomentDate(evtObj.EventStartDate, 'event');
            });
        },
        RenderEvents: function() {
            var html = '',
                evtMonthCount,
                currMonth;
            for (evtMonthCount = 0; evtMonthCount < this.EventMonthRange; evtMonthCount++) {
                currMonth = moment(this.EventStartMonth).add(evtMonthCount, 'months');
                html += this.MakeMonthDivider(currMonth);
                html += this.MakeMonthEvents(currMonth);
            }
            this.EventsContainer.html(html);
        },
        MakeMonthDivider: function(momentDate) {
            return '<div class="col-xs-12 month-divider"><h3>' + momentDate.format('MMMM YYYY').toUpperCase()
            + '</h3></div>'
        },
        MakeNoEvent: function() {
            return '<div class="col-xs-12 no-events"><p>There are no further events scheduled.</p></div>';
        },
        MakeMonthEvents: function(momentDate) {
            var html = '',
                eventsFromMonth = this.EventData.filter(function (evtObj) {
                    return getMomentDate(evtObj.EventStartDate, 'event').isSame(momentDate, 'month');
                }),
                eventsLength = eventsFromMonth.length,
                eventCount,
                evtObj;

            if (eventsLength > 0) {
                for (eventCount = 0; eventCount < eventsLength; eventCount++) {
                    evtObj = eventsFromMonth[eventCount];
                    html += this.MakeEvent(evtObj);
                }
            } else {
                html += this.MakeNoEvent();
            }
            return html;
        },
        MakeEvent: function(evtObj) {
            // add to event date variation for single/multi/cross-month events
            evtObj.DateRange = getDateString(evtObj.EventStartDate, evtObj.EventEndDate);

            // Add local timezone offset
            evtObj.LocalTimeZone = new Date().getTimezoneOffset();

            // return template with evtObj as data source
            return this.Template({ results: evtObj });
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
        RenderView: function (data) {
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
                                results = that.EventData.Events,
                                mDate = getMomentDate(date).startOf('day'),
                                startOfStartDate,
                                endOfEndDate;
                            
                            for (var key in results) {
                                if (results.hasOwnProperty(key)) {
                                    evtObj = results[key];
                                    startOfStartDate = getMomentDate(evtObj.EventStartDate, 'event').startOf('day');
                                    endOfEndDate = getMomentDate(evtObj.EventEndDate, 'event').endOf('day');

                                    if (mDate >= startOfStartDate && mDate <= endOfEndDate) {
                                        evtObj.DateRange = getDateString(evtObj.EventStartDate, evtObj.EventEndDate);
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
                            INFORMA.Spinner.Hide();
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
                                $fcCal = $fcView.closest('.fccal'),
                                $firstEventEl = view.el.find('.fc-day.event-present'),
                                eventMoment;
                            
                            if ($firstEventEl.length > 0) {
                                eventMoment = getMomentDate($firstEventEl.attr('data-date'), 'fullcalendar');

                                // add data, class and click event to go to month view
                                if ($fcView.attr('click-added')) return;
                                $fcView.data('month', eventMoment).addClass('event-present').attr('click-added', true).on('click', function () {
                                    var targetDate = $(this).data('month');
                                    if (targetDate.isValid()) {
                                        INFORMA.Spinner.Show(InformaEventsController.BodyContainer);
                                        setTimeout(function() {
                                            // hear force done loadevents
                                            InformaEventQuery.AddProps({
                                                MonthYear: targetDate.format('MMMM YYYY'),
                                                ViewType: 'month',
                                            });
                                        }, 200);
                                    }
                                }).on('mouseenter', function () {
                                    $fcCal.addClass('hovered');
                                }).on('mouseleave', function () {
                                    $fcCal.removeClass('hovered');
                                });
                            } else {
                                $fcView.removeData('month').removeClass('event-present').removeAttr('click-added').off('click mouseenter mouseleave');
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
                INFORMA.Spinner.Show(InformaEventsController.BodyContainer);
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
        EventExportButton:$(".export"),
        EventsContainer: $('#events-calendar'),
        EventsListContainers: $('#events-calendar .events-list'),
        NoEventsContainer: $('#events-calendar .no-result'),
        ErrorContainer: null,
        DateArrows: $('.header .arrows'),
        HeaderDate: $('.header h2'),
        ViewBtns: $('.views-section .state-views .view a'),
        ViewTypeSwitch: $('.views-section .date-views [name=dview]'),
        CountText: $('.views-section .event-count .listed'),
        TotalText: $('.views-section .event-count .total'),
        MoreBtn: $('.more-events .btn-more-events'),
        InfiniteScrollLoadPoint: 0,
        StartDate: null,
        PreviousDate: moment().subtract(11, 'months'),
        EndDate: moment().add(11, 'months'),
        PageNum: 1,
		AutocompleteMinCharCount:4,
        EventSearchText:$("#txtEventSearchText"),
		BtnSearchCmd:$(".search-bar i.search-icon"),
        LoadCalled: false,
        ErrorTimeout: 0,
        Init: function () {
            var that = this;
            // create error container dynamically
            // TODO: move to BE
            this.ErrorContainer = $('<div class="container error hidden"><div class="row"><div class="col-12"><p>Something went wrong. Please try again later.</p></div></div></div>');
            this.ErrorContainer.insertAfter(this.NoEventsContainer);
            // events listeners
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
                var $this = $(this),
                    destinationDateVal;

                e.preventDefault();
                if (that.LoadCalled) return;

                // trigger select field as opposed to change date directly to address chosen-select bug (https://itmebusiness.atlassian.net/browse/SW-9062)
                if ($this.hasClass('previous')) {
                    destinationDateVal = (moment(that.Date).subtract(1, that.ViewType + 's')).format('MMMM YYYY');
                }
                if ($this.hasClass('next')) {
                    destinationDateVal = (moment(that.Date).add(1, that.ViewType + 's')).format('MMMM YYYY');
                }

                if (!destinationDateVal) return;
                InformaFilters.Selects.filter('[name="MonthYear"]').val(destinationDateVal).trigger('change');
                InformaFilters.CustomSelects.filter('[name="MonthYear"]').find('li[id="' + destinationDateVal + '"] .input-checkbox').click();
                that.UpdateArrows();
            });
            this.ViewTypeSwitch.change(function () {
                var val = this.value;
                InformaEventQuery.AddProp('ViewType', val);
            });
            
			this.BtnSearchCmd.click(function (){
				that._loadEventFilteredData($("#txtEventSearchText").val());
			});
            //GS:Handled enter key when "event search text" provide
            this.EventSearchText.on('input', function (event) {
                var keycode = (event.keyCode ? event.keyCode : event.which);
                var val = this.value;
				//ISW-3912
                if (val.length > 0) {
				    EventSearchTextValue = val;
                    if (keycode == '13') {
                        that._loadEventFilteredData(val);
                    }
                    else {
                        that._bindAutoComplete(val);
                    }
				}
            });
            this.MoreBtn.click(function () {
                that.LoadMoreEvents();
            });
            this.EventExportButton.click(function (){
				that.DownloadEvents();
			})
        },
        _bindAutoComplete : function(val){
            if (val != "" && val.length>0) {   
			//ISW-3912

				var sendDataObj=this.GetSendDataAutoComplete(val);			

                var obj = {
                        data: JSON.stringify({
                        SearchKeyword: sendDataObj.SearchKeyword,
						MonthYear:sendDataObj.MonthYear,
						EventsEndDate:sendDataObj.EventsEndDate,
						ViewMode:sendDataObj.ViewMode,
						ProductLineId:sendDataObj.ProductLineId,
						SegmentId:sendDataObj.SegmentId,
						Country:sendDataObj.Country,
						EventsStartDate:sendDataObj.EventsStartDate,
                        CurrentPage: $('#events-calendar').data("currentpage"),
                        PageNo: 1
                    })
                }
				
				
                $.ajax({
                url: "/client/search/GetAutocompleteListEvent",
                type: "POST",
                data: obj,
                success: function (result) {             
                            var dataArray = [];
                             $.each(result.Events, function (index, value) {
                             if($.inArray(value.Title,dataArray)==-1)
                             {
                                dataArray.push(value.Title);
                                }
                            });
                            $("#txtEventSearchText").closest('.search-bar').addClass('ui-front');
                            $("#txtEventSearchText").autocomplete({
                              source: dataArray,
							  minLength:InformaEventsController.AutocompleteMinCharCount,
                              select: function (event, ui) {
                                var label = ui.item.label;
                                var value = ui.item.value;
                                InformaEventsController._loadEventFilteredData(value);
                              },
                              open: function( event, ui ) {
                                if (INFORMA.global.device.viewportN === 2)
                                    $('#ui-id-1').css('width', event.target.offsetWidth);
                              }
                            }).on('input', function (e) {
								if(e.which === 13) {
									$("#ui-id-1").hide();
								}            
							}).off('focus blur').on('focus blur', function (e) {
                                var val = e.target.value;
                                if (val.length > 3) {
                                    $(e.target).autocomplete('search', val);
                                }
                            });

                            $('body').click(function (e) {
                                if (e.target !== $("#txtEventSearchText")[0])
                                    $("#txtEventSearchText").autocomplete('close');
                            });
                        },
                        error: function (error) {
                            INFORMA.Spinner.Hide();
                        },
                        complete: function (data) {					   
                            setTimeout(function () { INFORMA.Spinner.Hide(); }, 1000);
                        }
                })
            }
        },
        _loadEventFilteredData: function (val) {
            EventSearchTextValue = val;
            if (val != "") {
                if (InformaFilters.FilterContainer.children('[data-type="EventSearchText"]').length > 0) {
                    var eventSearchFilterObj = (InformaFilters.FilterContainer.children('[data-type="EventSearchText"]'));
                    var value = $(eventSearchFilterObj).attr("data-value");
                    var type = $(eventSearchFilterObj).attr("data-type");
                    InformaFilters.RemoveFilter(type, value);
                    InformaEventQuery.RemoveProp(type, value);
                }
                InformaEventQuery.AddProp('EventSearchText', val);
            }
        },
        
        AddInfiniteScrollEvent: function() {
            var that = this,
                $win = $(window);

            if (this.View === 'calendar-view') return;
            
            // reset load more point
            this.InfiniteScrollLoadPoint = this.MoreBtn.offset().top - $win.height() - $('#tech-main-header').height();
            
            // add listner if more events to come
            // if (this.ActualCount < this.TotalCount) {
                $win.on('scroll.events.infinite', function() {
                    if($win.scrollTop() >= that.InfiniteScrollLoadPoint && !that.LoadCalled) {
                        $win.off('scroll.events.infinite');
                        that.LoadMoreEvents();
                    }
                });
            // }
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
        LoadEvents: function(pageNum) {
            // console.log('LoadEvents')
            var that = this,
                sendData;

            this.PageNum = pageNum ? pageNum : 1;
            sendData = this.GetSendData();
            if (!sendData) {
                this.ShowError();
                return;
            }

            this.ErrorTimeout = setTimeout(function () {
                that.ShowError();
            }, 30000);

            this.LoadCalled = true;
            this.GetAjaxData(INFORMA.Configs.urls.webservices.EventsSearch, ajaxMethod, sendData, function(data) {
                var eventsCount,
                    totalCount;

                if (data) {
                    // console.log('data received', data);
                } else {
                    throw "data not detectable in callback";
                }

                // set local vars
                eventsCount = data.Events.length;
                totalCount = parseInt(data.TotalResults);
                that.LoadCalled = false;

                // undo error
                clearTimeout(that.ErrorTimeout);
                that.ErrorContainer.addClass('hidden');

                // display no events container if total is 0 and first page, show no event message
                if (totalCount === 0 && that.PageNum === 1) {
                    that.NoEventsContainer.removeClass('hidden');
                    that.EventsListContainers.filter('.active').addClass('hidden');
                } else {
                    that.NoEventsContainer.addClass('hidden');
                    that.EventsListContainers.filter('.active').removeClass('hidden');
                }
                
                // render list views regardless of event count (to show dedicated no-events msg if no events)
                InformaEventList.RenderView(data);
                InformaEventTiles.RenderView(data);

                // set props for header text and infinite loading check
                that.TotalCount = totalCount;
                that.ActualCount = that.PageNum > 1 ? that.ActualCount + eventsCount : eventsCount;
                if(eventsCount === 0 && that.ActualCount==0)
					that.EventExportButton.hide();

                // if actual events count = 0 then dont do anything else
                if (eventsCount === 0) { return;}
                if(that.ActualCount>0)
                that.EventExportButton.show();

                // render calendar after eventscount check because global no-events message handles no events
                InformaFC.RenderView(data);

                that.AddInfiniteScrollEvent();
            },function (data) {
                // on error
                // console.log('error', JSON.parse(JSON.parse(data).data));
                that.ShowError();
            });
        },
        ShowError: function() {
            INFORMA.Spinner.Hide();
            this.ErrorContainer.removeClass('hidden');
            this.NoEventsContainer.addClass('hidden');
            this.EventsListContainers.filter('.active').addClass('hidden');
        },
        DownloadEvents: function () {
            var that = this,
                sendData;
            sendData = this.GetSendData();
            $("#data").val(sendData);
            $("#formDownloadEvent").submit();
            if (!sendData) {
                this.ShowError();
                return;
            }
        },
        GetSendData: function() {
            var that = this,
                sendDataObj = {},
                selectIgnoreAttr,
                cselectIgnoreAttr,
                ignoreAlwaysActiveTypes = []

            // add filters as property name and push multiple filters of the same type into array
            InformaFilters.ActiveFilters.forEach(function (filterObj) {
                if (!sendDataObj[filterObj.type]) {
                    // if active filters has values from ignored select then prevent AlwaysSelectedFilters from being read
                    // for for every filterObj, check the select with matching name to its type, to see if it has data-ignore
                    selectIgnoreAttr = InformaFilters.Selects.filter('[name="' + filterObj.type + '"]').data('ignore');
                    if (selectIgnoreAttr && selectIgnoreAttr.length > 0) {
                        // then set a flag
                        ignoreAlwaysActiveTypes.push(filterObj.type);
                    }
                    cselectIgnoreAttr = InformaFilters.CustomSelects.filter('[name="' + filterObj.type + '"]').data('ignore');
                    if (cselectIgnoreAttr && cselectIgnoreAttr.length > 0) {
                        // then set a flag
                        ignoreAlwaysActiveTypes.push(filterObj.type);
                    }
                    sendDataObj[filterObj.type] = [];
                }
                sendDataObj[filterObj.type].push(filterObj.value);
            });
            //GS: set value for event search text
            sendDataObj.EventSearchText=EventSearchTextValue;
            InformaFilters.AlwaysSelectedFilters.forEach(function (filterObj) {
                // now ignore always selected if ignore flag is set
                if (ignoreAlwaysActiveTypes.indexOf(filterObj.type) === -1) {
                    if (!sendDataObj[filterObj.type])
                        sendDataObj[filterObj.type] = [];
                    sendDataObj[filterObj.type].push(filterObj.value);
                }
            });

            if (!sendDataObj.MonthYear) return null;

            // add non filter props
            sendDataObj.CurrentPage = this.EventsContainer.data('currentpage');
            sendDataObj.ViewMode = this.View === 'calendar-view' ? 'calendar' : 'list';

            // set endate to far in the future for list view for infinite scrolling
            if (this.View === 'calendar-view') {
                sendDataObj.EventsEndDate = moment(this.Date).add(1, this.ViewType + 's').format('MMMM YYYY');
            } else {
                sendDataObj.EventsEndDate = moment(this.Date).add(100, 'years').format('MMMM YYYY');
            }
            

            switch (this.View) {
                case 'list-view':
                case 'tile-view':
                    // add event listing specific non filter props
                    sendDataObj.PageNo = this.PageNum;
                    sendDataObj.PageSize = parseInt(this.EventsContainer.data('count'));
                case 'calendar-view':
                    // explicitly set MonthYear property to EventsStartDate
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
		GetSendDataAutoComplete: function(searchText) {
			//ISW-3912
            var that = this,
                sendDataObj = {},
                selectIgnoreAttr,
                cselectIgnoreAttr,
                ignoreAlwaysActiveTypes = []

            // add filters as property name and push multiple filters of the same type into array
            InformaFilters.ActiveFilters.forEach(function (filterObj) {
                if (!sendDataObj[filterObj.type]) {
                    // if active filters has values from ignored select then prevent AlwaysSelectedFilters from being read
                    // for for every filterObj, check the select with matching name to its type, to see if it has data-ignore
                    selectIgnoreAttr = InformaFilters.Selects.filter('[name="' + filterObj.type + '"]').data('ignore');
                    if (selectIgnoreAttr && selectIgnoreAttr.length > 0) {
                        // then set a flag
                        ignoreAlwaysActiveTypes.push(filterObj.type);
                    }
                    cselectIgnoreAttr = InformaFilters.CustomSelects.filter('[name="' + filterObj.type + '"]').data('ignore');
                    if (cselectIgnoreAttr && cselectIgnoreAttr.length > 0) {
                        // then set a flag
                        ignoreAlwaysActiveTypes.push(filterObj.type);
                    }
                    sendDataObj[filterObj.type] = [];
                }
                sendDataObj[filterObj.type].push(filterObj.value);
            });
            //GS: set value for event search text
            sendDataObj.SearchKeyword=searchText;
            InformaFilters.AlwaysSelectedFilters.forEach(function (filterObj) {
                // now ignore always selected if ignore flag is set
                if (ignoreAlwaysActiveTypes.indexOf(filterObj.type) === -1) {
                    if (!sendDataObj[filterObj.type])
                        sendDataObj[filterObj.type] = [];
                    sendDataObj[filterObj.type].push(filterObj.value);
                }
            });

            if (!sendDataObj.MonthYear) return null;

            // add non filter props
            sendDataObj.CurrentPage = $('#events-calendar').data("currentpage");
            sendDataObj.ViewMode = this.View === 'calendar-view' ? 'calendar' : 'list';

            // set endate to far in the future for list view for infinite scrolling
            if (this.View === 'calendar-view') {
                sendDataObj.EventsEndDate = moment(this.Date).add(1, this.ViewType + 's').format('MMMM YYYY');
            } else {
                sendDataObj.EventsEndDate = moment(this.Date).add(100, 'years').format('MMMM YYYY');
            }
            

            switch (this.View) {
                case 'list-view':
                case 'tile-view':
                    // add event listing specific non filter props
                    sendDataObj.PageNo = 1;
                case 'calendar-view':
                    // explicitly set MonthYear property to EventsStartDate
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
            }

            console.log('data sent (pre stringification)', sendDataObj);

            return sendDataObj;
        },
        GetAjaxData: function (url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.Spinner.Show(InformaEventsController.BodyContainer);
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
            this.EventsListContainers.filter('[data-view="' + view + '"]').addClass('active').siblings('.events-list').removeClass('active');
            this.BodyContainer.removeClass('list-view tile-view calendar-view').addClass(view);

            // reset active class for view buttons for styling
            this.ViewBtns.filter('.active').removeClass('active');
            this.ViewBtns.filter('[data-viewport="' + view + '"]').addClass('active');
        },
        get View() {
            if (!this.EventsContainer.attr('data-eview'))
                this.EventsContainer.attr('data-eview', this.EventsListContainers.filter('.active').data('view'));
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
            this.StartDate = momentDate;
            
            InformaFilters.Date = momentDate;
            InformaEventTiles.Date = momentDate;
            InformaEventList.Date = momentDate;
            InformaFC.Date = momentDate;
        },
        get Date() {
            return this.StartDate;
        },
        set ActualCount(count) {
            this.EventsContainer.data('actual-count', count);
            this.TotalText.text(count);
        },
        get ActualCount() {
            return parseInt(this.EventsContainer.data('actual-count'));
        },
        set TotalCount(count) {
            this.EventsContainer.attr('total-count', count);
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

            // if view changed to/from calendar, month/year view changed, or date has changed / filters have then to ajax
            if (!stillInCalView || hasViewTypeChanged || hasDateChanged || hasFiltersChanged) {
                this.LoadEvents();
            }
        }
    }

    InformaEventQuery = {
        ActiveQuery: '',
        SanitizedQueryProps: [],
        ActiveProperties: [],
        Defaults: [],
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
                this.PopulateWithDefaults();
            }
            // console.log(this.ActiveProperties);
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

            // set filters updated flag
            if (sanPropsArr.findIndex(function (sanitizedObj) { 
                return sanitizedObj.name !== 'MonthYear' && sanitizedObj.name !== 'View' && sanitizedObj.name !== 'ViewType'
            })) InformaFilters.HaveUpdated = true

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
                case 'EventSearchText'://GS: to maintain query string when its shared
					if(value!="")
                    isValid = true;
					else isValid ? {name: name, value: value} : null;
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

                        InformaFilters.CustomSelects.find('li[id]').each(function () {
                            if ($(this).children('p').text() === fvalue) {
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
        AddProp: function(name, value, isBulkHelper) {
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
                    if (Array.isArray(value)) {
                        value.forEach(function (v) {
                            existingValInd = existingEl.values.indexOf(v);
                            if (existingValInd >= 0) {
                                if (existingEl.values[existingValInd] !== v) {
                                    existingEl.values[existingValInd] = v;
                                    haveActivePropsChanged = true;
                                    InformaFilters.HaveUpdated = true;
                                }
                            } else {
                                existingEl.values.push(v);
                                haveActivePropsChanged = true;
                                InformaFilters.HaveUpdated = true;
                            }
                        });
                    } else {
                        // if val exists in values, override else add it
                        existingValInd = existingEl.values.indexOf(value);
                        if (existingValInd >= 0) {
                            if (existingEl.values[existingValInd] !== value) {
                                existingEl.values[existingValInd] = value;
                                haveActivePropsChanged = true;
                                InformaFilters.HaveUpdated = true;
                            }
                        } else {
                            existingEl.values.push(value);
                            haveActivePropsChanged = true;
                            InformaFilters.HaveUpdated = true;
                        }
                    }
                }
            } else {
                // new value
                this.ActiveProperties.push({ name: name, values: Array.isArray(value) ? value : [value] });
                haveActivePropsChanged = true;
                InformaFilters.HaveUpdated = true;
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
            var that = this,
                haveActivePropsChanged = false,
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
                    if (Array.isArray(value)) {
                        value.forEach(function (v) {
                            // if value exists in filters array remove it
                            existingValArr = that.ActiveProperties[existingElInd].values;
                            existingValInd = existingValArr.indexOf(v);
                            if (existingValInd >= 0) {
                                existingValArr.splice(existingValInd, 1);
                                // now remove whole filter obj if values are empty
                                if (existingValArr.length === 0) {
                                    that.ActiveProperties.splice(existingElInd, 1);
                                }
                                haveActivePropsChanged = true;
                                InformaFilters.HaveUpdated = true;
                            }
                        });
                    } else {
                        // if value exists in filters array remove it
                        existingValArr = that.ActiveProperties[existingElInd].values;
                        existingValInd = existingValArr.indexOf(value);
                        if (existingValInd >= 0) {
                            existingValArr.splice(existingValInd, 1);
                            // now remove whole filter obj if values are empty
                            if (existingValArr.length === 0) {
                                that.ActiveProperties.splice(existingElInd, 1);
                            }
                            haveActivePropsChanged = true;
                            InformaFilters.HaveUpdated = true;
                        }
                    }
                }
            }

            if (haveActivePropsChanged) {
                this.SetQueryFromProps();
                this.ApplyPropsToController();
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
        SetPropsFromQuery: function() {
            var that = this,
                query,
                queries = window.location.search.substring(1).split('&');
            
            queries.forEach(function (queryStr) { 
                query = queryStr.split('=');
                that.ActiveProperties[query[0]] = query[1];
            });
            console.log(that.ActiveProperties);
        },
        set query(searchStr) {
            // if (this.isqueried)
                history.pushState({}, document.title, searchStr);

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

    getDateString = function(startDateStr, endDateStr) {
        var returnDateStr = '',
            sDateMoment = getMomentDate(startDateStr, 'event'),
            eDateMoment = getMomentDate(endDateStr, 'event'),
            sDayStr = sDateMoment.format("DD"),
            sDayMonthStr = sDateMoment.format("DD[&nbsp;]MMM"),
            eDayMonthStr = eDateMoment.format("DD[&nbsp;]MMM")
        
        // if same day, single date type else date range type
        if (sDateMoment.isSame(eDateMoment, "day")) {
            returnDateStr = '<div class="date">' + sDayMonthStr + '</div>';
        } else {
            // if same month, same month range type else diff month range type
            if (sDateMoment.isSame(eDateMoment, "month")) {
                returnDateStr = '<div class="date">' + sDayStr + ' - ' + eDayMonthStr + '</div>';
            } else {
                returnDateStr = '<div class="date">' + sDayMonthStr + ' - ' + eDayMonthStr + '</div>';
            }
        }

        return returnDateStr;
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

        var $body = InformaEventsController.BodyContainer,
            $html = $('html'),
            $showFiltersBtn = $('.events-search #showFiltersBtn'),
            $closeFilterBtn = $('#closeFilterBtn'),
            filtersOpen = false
        
        // add event listner to close button
        $closeFilterBtn.click(function (evt) {
            evt.preventDefault();
            $body.removeClass('showfilters');
            $html.removeClass('showfilters');
            $showFiltersBtn.text("Select filters");
            $showFiltersBtn.attr('data-state', 'select');
            filtersOpen = false;
        });
        // add event listener to filters button
        $showFiltersBtn.click(function (evt) {
            evt.preventDefault();
            filtersOpen = !filtersOpen;
            if (filtersOpen) {
                $body.addClass('showfilters');
                $html.addClass('showfilters');
                $showFiltersBtn.text("Search");
                $showFiltersBtn.attr('data-state', 'search');
            } else {
                $body.removeClass('showfilters');
                $html.removeClass('showfilters');
                $showFiltersBtn.text("Select filters");
                $showFiltersBtn.attr('data-state', 'select');
                InformaEventsController._loadEventFilteredData($("#txtEventSearchText").val());
                

            }
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());