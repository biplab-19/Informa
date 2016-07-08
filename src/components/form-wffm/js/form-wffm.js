var INFORMA = window.INFORMA || {};
INFORMA.formGetInTouch = (function(window, $, namespace) {
    'use strict';
    var _formModal = $('.form-modal'),
        _formModalBtn = $('.form-btn-container .form-modal-btn'),
        _formInlineContiner,
        months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthName = '',
        monthNbr = '',

        //functions
        init,
        _bindToolTip,
        _bindCalendar,
        _bindSelectOptions,
        _showOverlay,
        _attachInlineForm,
        _validateAllForms;

    _showOverlay = function(container) {
        /*_formModalBtn.click(function() {

            var _formName = $(this).data('form');
            _formInlineContiner = $('.' + _formName).parent();

            var formHTML = _formInlineContiner.html();
            _formModal.find('.modal-body .form-popup-container').html(formHTML);
            _formInlineContiner.find('form').remove();


            $('.form-popup-container form').css('display', 'block');
            _formModal.modal({
                show: true,
                keyboard: false,
                backdrop: "static"
            });

        })*/
        //_validateAllForms();
        _bindToolTip();
        _bindCalendar();
        _bindSelectOptions();
    }

    _attachInlineForm = function() {
        $('.form-modal-close').click(function() {
            var formHTML = _formModal.find('.modal-body .form-popup-container').html();
            _formInlineContiner.html(formHTML);
            $('.form-inline-container form').css('display', 'none');
            _validateAllForms();
            $('.form-popup-container').find('form').remove();
        });
    }

    _validateAllForms = function() {
        $('form.get-in-touch').validate({
            submitHandler: function() {
                alert("submitted!");
            },
            failure: function() {
                console.log("Failure");
            },
            success: function() {
                console.log("Success");
            }
        });
        $('form.request-a-demo').validate();
    }

    _bindToolTip = function() {
        $('.form-modal legend').on("click", function(e){
            if (e.offsetX > $(this).outerWidth() + 15) {
                $(this).toggleClass('active');
                $(this).parent().children('p').slideToggle();
            }
        });

        $('.form-modal legend').each(function () {
            if($(this).next().is('p'))
                $(this).addClass('tool_tip');
        });
    }

    _bindSelectOptions = function(){
        $('.form-modal .hide-title .checkbox input').change(function(e){
            $(this).parent().parent().toggleClass('active');
        });
        $(".form-modal .modal-body .form-group select").wrap("<div class='select-wrapper'></div>");
    }

    function strToDate(str) {
        try {
            var array = str.split('-');
            var year = parseInt(array[0]);
            var month = parseInt(array[1]);
            var day = array.length > 2? parseInt(array[2]): 1 ;
            if (year > 0 && month >= 0) {
                return new Date(year, month - 1, day);
            } else {
                return null;
            }
        } catch (err) {}; // just throw any illegal format
    };

    /* Date => "YYYY-MM-DD" */
    function dateToStr(d) {
        /* fix month zero base */
        var year = d.getFullYear();
        var month = d.getMonth();
        return year + "-" + (month + 1) + "-" + d.getDate();
    };

    $.fn.calendar = function (options) {
        var _this = this;
        var opts = $.extend({}, $.fn.calendar.defaults, options);
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var tHead = week.map(function (day) {
            return "<th>" + day + "</th>";
        }).join("");

        _this.init = function () {
            var tpl = '<table class="cal">' +
            '<caption>' +
            '   <span class="prev"><a href="javascript:void(0);">&lt;</a></span>' +
            '   <span class="next"><a href="javascript:void(0);">&gt;</a></span>' +
            '   <span class="month" data-date=""><span>' +
            "</caption>" +
            "<thead><tr>" +
            tHead +
            "</tr></thead>" +
            "<tbody>" +
            "</tbody>" + "</table>";
            var html = $(tpl);
            _this.append(html);
        };

        function daysInMonth(d) {
            var newDate = new Date(d);
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(0);
            return newDate.getDate();
        }

        _this.update = function (date) {
            var mDate = new Date(date);
            mDate.setDate(1); /* start of the month */

            var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
            mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

            function dateToTag(d) {
                var tag = $('<td><a href="javascript:void(0);"></a></td>');
                var a = tag.find('a');
                a.text(d.getDate());
                a.data('date', dateToStr(d));
                if (date.getMonth() != d.getMonth()) { // the bounday month
                    tag.addClass('off');
                } else if (_this.data('date') == a.data('date')) { // the select day
                    tag.addClass('active');
                    _this.data('date', dateToStr(d));
                }
                else if(d.toDateString() == date.toDateString()){
                    tag.addClass('active');
                }
                return tag;
            };

            var tBody = _this.find('tbody');
            tBody.empty(); /* clear previous first */
            var cols = Math.ceil((day + daysInMonth(date))/7);
            for (var i = 0; i < cols; i++) {
                var tr = $('<tr></tr>');
                for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
                    tr.append(dateToTag(mDate));
                }
                tBody.append(tr);
            }

            /* set month head */
            var monthStr = dateToStr(date).replace(/-\d+$/, '');
            monthNbr = date.getMonth();
            monthName = months[monthNbr];
            _this.find('.month').text(monthName);
            _this.find('.month').data("date", monthStr);
        };

        _this.getCurrentDate = function () {
            return _this.data('date');
        }

        _this.init();
        /* in date picker mode, and input date is empty,
         * should not update 'data-date' field (no selected).
         */
        var initDate = opts.date? opts.date: new Date();
        if (opts.date || !opts.picker) {
            _this.data('date', dateToStr(initDate));
        }
        _this.update(initDate);

        /* event binding */
        _this.delegate('tbody td', 'click', function () {
            var $this = $(this);
            _this.find('.active').removeClass('active');
            $this.addClass('active');
            _this.data('date', $this.find('a').data('date'));
            /* if the 'off' tag become selected, switch to that month */
            if ($this.hasClass('off')) {
                _this.update(strToDate(_this.data('date')));
            }
            if (opts.picker) {  /* in picker mode, when date selected, panel hide */
                _this.hide();
            }
        });

        function updateTable(monthOffset) {
            var date = strToDate(_this.find('.month').data('date'));
            date.setMonth(date.getMonth() + monthOffset);
            _this.update(date);
        };

        _this.find('.next').click(function () {
            updateTable(1);
        });

        _this.find('.prev').click(function () {
            updateTable(-1);
        });

        return this;
    };

    $.fn.calendar.defaults = {
        date: new Date(),
        picker: false,
    };

    $.fn.datePicker = function () {
        var _this = this;
        var picker = $('<div></div>')
            .addClass('picker-container')
            .hide()
            .calendar({'date': strToDate(_this.val()), 'picker': true});

        _this.after(picker);

        /* event binding */
        // click outside area, make calendar disappear
        $('body').click(function () {
            picker.hide();
        });

        // click input should make calendar appear
        _this.click(function () {
            picker.show();
            return false; // stop sending event to docment
        });

        // click on calender, update input
        picker.click(function () {
            _this.val(moment(picker.getCurrentDate()).format('DD/MMM/YYYY'));
            return false;
        });

        return this;
    };

    _bindCalendar = function(){
      //  $(".modal-body .three-column input:text").addClass('date-picker');
        $(".modal-body .three-column .date-picker").wrap("<div class='right-inner'></div>");
        $(".modal-body .three-column .right-inner" ).prepend("<i class='icon-calender'></i>");

        $('.modal-body .date-picker:text').each(function () {
            $(this).datePicker({dateFormat: "dd-mm-yy"});
        });
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        _showOverlay();
        //_bindToolTip();
        _attachInlineForm();
      //  _validateGetInTouchForm();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formGetInTouch.init());
