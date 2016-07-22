var INFORMA = window.INFORMA || {};
INFORMA.forms = (function(window, $, namespace) {
    'use strict';
    var _formModal = $('.form-modal'),
        _formModalBtn = $('.form-btn-container .form-modal-btn'),
        _formSubmitStatus = $('.submit-status'),
        _formInlineContiner,
        months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthName = '',
        monthNbr = '',
        Urls = INFORMA.Configs.urls.webservices,
        formHeading,
        productId,
        _formId,

        //functions
        init,
        _validateEmail,
        _showModal,
        _resetForm,
        _getAjaxData,
        _parseResults,
        _bindProductId,
        _bindToolTip,
        _bindCalendar,
        _bindSelectOptions,
        _bindValidationLogic,
        _showOverlay,
        _showOverlayQueryString,
        _validateAllForms,
        _reCaptchaHandler,
        _disableSubmit;

    _reCaptchaHandler = function() {
        $("form.get-in-touch, form.request-a-demo").submit(function() {
            var captchaMsgContainer = $(this).find('.captcha-wrapper .field-validation-valid'),
                captcha_response = grecaptcha.getResponse();
            if (captcha_response.length == 0) {
                // Captcha failed
                captchaMsgContainer.css('display', 'block').html('The captcha field is required.').addClass('field-validation-error');
                return false;
            } else {
                // Captcha is Passed
                captchaMsgContainer.css('display', 'none');
                return true;
            }
        });

        // grecaptcha.render('captcha-wrapper', {
        //     'sitekey': '6LezlCQTAAAAALwyoWgTPjpFlBYTWy7pfSAXbPfn', //enter sitekey here
        //     'callback': function(e) {
        //         if (e.length > 0) {
        //             $('#hiddenRecaptcha-error').hide();
        //         }
        //     }
        // });
        //
        // $('#hiddenRecaptcha').rules('add', {
        //     required: function() {
        //         if (grecaptcha.getResponse().length !== 0) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     },
        //     messages: {
        //         required: "Enter valid captcha"
        //     }
        // });
    }

    _showOverlayQueryString = function(container) {
        var url = window.location.href;
        if (url.indexOf('?ResponseStatus=Success') != -1 || url.indexOf('/ResponseStatus/Success') != -1) {
            _formModal.modal({
                show: true,
                keyboard: false,
                backdrop: "static"
            });
        }
    }

    _resetForm = function($form) {
        $form.find('input[type=text], input[type=password], input[type=number], input[type=email], select, textarea').val('');
        $form.find('input[type=radio], input[type=checkbox]')
             .removeAttr('checked').removeAttr('selected');
    }

    _showOverlay = function() {
        var formSubmitResponseModal, 
            formSubmitResponseHTML;

        if (_formSubmitStatus.attr('data-status') == "") {
            formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
            if (formSubmitResponseModal.length > 0) {

                formSubmitResponseModal.find('form').removeClass('hide');
                formSubmitResponseModal.find('.submit-response, .error-response').addClass('hide');
                /*formSubmitResponseModal.modal({
                    show: true,
                    keyboard: false,
                    backdrop: "static"
                })*/
            }
            formSubmitResponseHTML = _formSubmitStatus.parents('form:first');
            if (formSubmitResponseHTML.length > 0) {
               formSubmitResponseHTML.find('form').removeClass('hide');
            }
        }else if(_formSubmitStatus.attr('data-status') > ""){
            formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
            if (formSubmitResponseModal.length > 0) {

                formSubmitResponseModal.find('form').addClass('hide');
                formSubmitResponseModal.find('.submit-response, .error-response').removeClass('hide');
                _resetForm(formSubmitResponseModal.find('form'));
                formSubmitResponseModal.modal({
                    show: true,
                    keyboard: false,
                    backdrop: "static"
                })

                formSubmitResponseModal.find('.form-modal-close').on("click",function(){
                    _formSubmitStatus.attr("data-status","");
                })
            }
            formSubmitResponseHTML = _formSubmitStatus.parents('form:first');
            if (formSubmitResponseHTML.length > 0) {
               formSubmitResponseHTML.find('form').addClass('hide');
               _resetForm(formSubmitResponseHTML.find('form'));
            }
        }
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
        $('form.get-in-touch legend, form.request-a-demo legend').on("click", function(e) {
            if (e.offsetX > $(this).outerWidth() + 15) {
                $(this).toggleClass('active');
                $(this).parent().children('p').slideToggle();
            }
        });

        $('form.get-in-touch legend, form.request-a-demo legend').each(function() {
            if ($(this).next().is('p'))
                $(this).addClass('tool_tip');
        });
    }

    _parseResults = function (data) {
        var results = data,
            _inputId = $(_formId + ' .area-interests input').first().attr("id"),
            _inputName = $(_formId + ' .area-interests input').first().attr("name"),
            _interestValue = '',
            _interestText = '',
            _presentHeading,
            _tmpElement;

        _inputId = _inputId.replace("Id","Value");
        _inputName = _inputName.replace("Id","Value");
        _presentHeading = $(_formId + ' .page-header h1').text();
        $(_formId + " .area-interests .form-group .checkbox").remove();
        $(_formId + " .area-interests").addClass('dynamic-interests');

        formHeading = _presentHeading.replace('#',results.Title);
        $(_formId + ' .page-header h1').text(formHeading);

        for (var key in results.Items) {
            if (results.Items.hasOwnProperty(key)) {
                _interestText = results.Items[key].Text;
                _interestValue = results.Items[key].Value;

                _tmpElement = $('<input>').attr({
                        type: 'checkbox',
                        value: _interestValue,
                        id: _inputId,
                        name: _inputName
                    });

                $(_formId + ' .area-interests .form-group').append(_tmpElement);
                $(_formId + ' .area-interests .form-group input[type=checkbox]').last().wrap('<div class="checkbox"></div>').wrap('<label>' + _interestText + '</label>');
            }
        }

    }

    _getAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
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

    _bindSelectOptions = function() {
        $(document).on('change', 'form.get-in-touch .hide-title .checkbox input, form.request-a-demo .hide-title .checkbox input', function(e) {
            $(this).parent().parent().toggleClass('active');
        });
        $("form.get-in-touch .form-group select, form.request-a-demo .form-group select").wrap("<div class='select-wrapper'></div>");
    }

    _validateEmail = function(email) {
        var domain = email.substring(email.lastIndexOf("@") + 1);
        if (INFORMA.validDomains.indexOf(domain) < 0)
            return false;
        return true;
    }

    _bindValidationLogic = function() {
        //Email message
        var emailvalidator = $('form').find('.email-validation-error'); 
        
        if (emailvalidator.length > 0) { 
           $.extend($.validator.messages, { 
                  email: emailvalidator.html() 
           }); 
        }

        //Email validation logic
        $('form.get-in-touch .contact-details .scfEmailBorder, form.request-a-demo .contact-details .scfEmailBorder').each(function() {
            $(this).blur(function() {
                if (_validateEmail($(this).val()))
                    if ($(this).next().children().length == 0)
                        $(this).next().prepend("<span class='field-validation-error'>E-mail is not in the valid domain list</span>");
            });
        });

    }

    function strToDate(str) {
        try {
            var array = str.split('-');
            var year = parseInt(array[0]);
            var month = parseInt(array[1]);
            var day = array.length > 2 ? parseInt(array[2]) : 1;
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

    $.fn.calendar = function(options) {
        var _this = this;
        var opts = $.extend({}, $.fn.calendar.defaults, options);
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var tHead = week.map(function(day) {
            return "<th>" + day + "</th>";
        }).join("");

        _this.init = function() {
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

        _this.update = function(date) {
            var mDate = new Date(date);
            mDate.setDate(1); /* start of the month */

            var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
            mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

            function dateToTag(d) {
                var tag = $('<td><a href="javascript:void(0);"></a></td>');
                var a = tag.find('a');
                a.text(d.getDate());
                a.data('date', moment(d).format('YYYY-MM-DD'));
                if (date.getMonth() != d.getMonth()) { // the bounday month
                    tag.addClass('off');
                } else if (_this.data('date') == a.data('date')) { // the select day
                    tag.addClass('active');
                    _this.data('date', dateToStr(d));
                } else if (d.toDateString() == date.toDateString()) {
                    tag.addClass('active');
                }
                return tag;
            };

            var tBody = _this.find('tbody');
            tBody.empty(); /* clear previous first */
            var cols = Math.ceil((day + daysInMonth(date)) / 7);
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

        _this.getCurrentDate = function() {
            return _this.data('date');
        }

        _this.init();
        /* in date picker mode, and input date is empty,
         * should not update 'data-date' field (no selected).
         */
        var initDate = opts.date ? opts.date : new Date();
        if (opts.date || !opts.picker) {
            _this.data('date', dateToStr(initDate));
        }
        _this.update(initDate);

        /* event binding */
        _this.delegate('tbody td', 'click', function() {
            var $this = $(this);
            _this.find('.active').removeClass('active');
            $this.addClass('active');
            _this.data('date', $this.find('a').data('date'));
            /* if the 'off' tag become selected, switch to that month */
            if ($this.hasClass('off')) {
                _this.update(strToDate(_this.data('date')));
            }
            if (opts.picker) { /* in picker mode, when date selected, panel hide */
                _this.hide();
            }
        });

        function updateTable(monthOffset) {
            var date = strToDate(_this.find('.month').data('date'));
            date.setMonth(date.getMonth() + monthOffset);
            _this.update(date);
        };

        _this.find('.next').click(function() {
            updateTable(1);
        });

        _this.find('.prev').click(function() {
            updateTable(-1);
        });

        return this;
    };

    $.fn.calendar.defaults = {
        date: new Date(),
        picker: false,
    };

    $.fn.datePicker = function() {
        var _this = this;
        var picker = $('<div></div>')
            .addClass('picker-container')
            .hide()
            .calendar({
                'date': strToDate(_this.val()),
                'picker': true
            });

        _this.after(picker);

        /* event binding */
        // click outside area, make calendar disappear
        $('body').click(function() {
            picker.hide();
        });

        // click input should make calendar appear
        _this.click(function() {
            picker.show();
            return false; // stop sending event to docment
        });

        // click on calender, update input
        picker.click(function() {
            _this.val(moment(picker.getCurrentDate()).format('DD/MMM/YYYY'));
            return false;
        });

        return this;
    };

    _bindCalendar = function() {
        $("form.request-a-demo .three-column .date-picker").wrap("<div class='right-inner'></div>");
        $("form.request-a-demo .three-column .right-inner").prepend("<i class='icon-calender'></i>");

        $('form.request-a-demo .date-picker:text').each(function() {
            $(this).datePicker({
                dateFormat: "dd-mm-yy"
            });
        });
    }

    _disableSubmit = function() {
        var formDOM = $("form.get-in-touch, form.request-a-demo"),
            formSubmitBtn = $('form.get-in-touch, form.request-a-demo').find('.form-submit-border .btn');
            formSubmitBtn.attr('disabled', true);
            formDOM.on('change', 'input, textarea, select', function() {
            formSubmitBtn.removeAttr('disabled');
            // if ($('.field-validation-error').length == 0 && $('.captcha-wrapper .field-validation-error').css('display') == "none" && $('.captcha-wrapper .field-validation-valid').html() == "") {
            //     formSubmitBtn.removeAttr('disabled');
            // } else {
            //     formSubmitBtn.attr('disabled', true);
            // }
        });
    }

    _showModal = function(el) 
    { 
        _formId = $(el).data('modal');
        productId = { 'guid' : $(el).data('productid') };

        //productId = "{8DE4EC3E-5039-492C-8D04-2D4499CCD026}";
        _getAjaxData(Urls.GetFormItems, "Get", productId, _parseResults, null, null);
        $(_formId).modal({ 
            show : 'true' 
        })
        _showOverlay();
    };

    _bindProductId = function(){
        $(document).on('click', '.wffm-elq-form-btn', function(){
            _showModal(this);
        });
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there

        _showOverlay();
        _showOverlayQueryString()
        _reCaptchaHandler();
        //_validateAllForms();
        _bindToolTip();
        _bindCalendar();

        _bindProductId();

        _bindSelectOptions();
        _bindValidationLogic();
        _disableSubmit();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.forms.init());
