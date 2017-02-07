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
        _parseVerticalName,
        _bindProductId,
        _bindToolTip,
        _bindCalendar,
        _bindSelectOptions,
        _bindValidationLogic,
        _showOverlay,
        _showOverlayQueryString,
        _validateAllForms,
        _reCaptchaHandler,
        _disableSubmit,
        _showHideInlineForm,
        _HideOverlay,
        _showFormIntro,
        _bindNumber,
        _updateProductVerticalName,
        _validateChoosenSelect,
        _destroyChosenInDevice,
        _customPhoneErrorMsg,
        _reCaptchaAccessbility,
        _updateHiddenProductVerticalName,
        _resetFormOnRefresh,
        _resetDefaultTitle,
        _UpdateHiddenFields,
        _RemoveStatus,
        RemoveParameterFromUrl,
        _productDropdownUpdate,
        _setFormModalFocus,
         _UpdateProductName,
        _changeProductDropdown,
        _validateCountry;

    _validateChoosenSelect = function() {
        $.validator.setDefaults({
            ignore: ":hidden:not(.chosen-select)"
        });
        $(document).on('change','.wffm-form .chosen-select', function() {
            $(this).valid();
        });
    }

    _setFormModalFocus = function(){
          $(".wffm-form .product-list").on('change', function() {
            $('body').scrollTop(300);
            $('.wffm-form').filter(':input:first').focus();
          });
          $(".wffm-form .country-list").on('change', function() {
              $('body').scrollTop(300);
              $('.wffm-form').filter(':input:first').focus();
          });
    };

     _changeProductDropdown = function() {
        $('.product-list').on('change', function() {
            var Parent = $(this).parents('form'),
                Value = $(this).val();

            Parent.find('.tc-product-name').html(Value);
        })
    };

    RemoveParameterFromUrl = function( url, parameter ) {

        if( typeof parameter == "undefined" || parameter == null || parameter == "" ) throw new Error( "parameter is required" );
        var regex =new RegExp( "\\b" + parameter + "=[^&;]+[&;]?", "gi" );

        url = url.replace(regex, "" );

        // remove any leftover crud
        url = url.replace( /[&;]$/, "" );

        var NewUrl = url.split('?');

        if(NewUrl.length === 1) {
            url = NewUrl;
        }

        return url;
    };

    _resetDefaultTitle = function(elem) {
        var SecondaryHeading = $('.form-secondary-title');

        if(SecondaryHeading.length > 0) {
            SecondaryHeading.each(function() {
                var GetTitle = $(this).val();
                var Parent = $(this).parents('.modal');
                var ParentId = $(elem).attr('data-modal');
                if(Parent.length > 0) {
                    // var isHeading = Parent.find('.product-name-holder').text();
                    // if(isHeading.length === 0) {
                     Parent.find('h2').text(GetTitle);
                    // }
                    var Product = $(ParentId).find('.product-list').val();
                    $(ParentId).find('.tc-product-name').text(Product);
                }
            });
        }
    },
    _updateHiddenProductVerticalName = function() {
        $(document).ready(function() {
            var ProductName = $('.product-name').val(),
                VerticalName = $('.vertical-name').val();
            if (ProductName || VerticalName) {
                $('span.product-name-holder').html(ProductName);
                $('.product-name-holder').val(ProductName);
                $('.vertical-name-holder').val(VerticalName);
                $('.tc-product-name').html(ProductName);
                $('.tc-vertical-name').html(VerticalName);
                if (ProductName.length > 0) {
                    $('.tc-product-name').html(ProductName);
                } else {
                    $('.tc-product-name').html(VerticalName);
                }
            }
             _UpdateProductName();
        });
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }

    _HideOverlay = function() {
        $('.form-modal').on('hidden.bs.modal', function() {
            var Parent = $(this),
                Status = Parent.find('.submit-status');

            Status.attr('data-status', '');

            Parent.find('.submit-response, .error-response').addClass('hide');

            Parent.find('form').removeClass('hide');
            _RemoveStatus();
        })
    }

    _RemoveStatus = function() {
        //Updating the status of the url
        var url = window.location.href,
            Title = document.title,
            RemoveStatus = RemoveParameterFromUrl(url, "sc_wffm_status"),
            NewUrl = RemoveParameterFromUrl(RemoveStatus, "sc_wffm_clientid");

        window.history.pushState('', Title, NewUrl);
    }

    _reCaptchaHandler = function() {
        $("form.get-in-touch, form.request-a-demo, form.single-step-form").submit(function() {
            var widgetId, captcha_response, g_captchaId = $(this).find('.g-recaptcha').attr('id');
            if (window.gRecaptchaWidget) {
                widgetId = $.grep(window.gRecaptchaWidget, function(obj) {
                    return obj.captchaElementId === g_captchaId;
                })
            }
            if (widgetId) {
                captcha_response = grecaptcha.getResponse(widgetId[0].captchaWidgetId);
            }
            var captchaMsgContainer = $(this).find('.captcha-wrapper .field-validation-valid');
            // To track Google Analytics on Submit
            if(($(this).parents('.modal').attr('id') == 'formRegistration') || ($(this).parents('.registration-form-single-section').find('.form-inline-container').attr('data-modal') == 'formRegistration')){
                if($('form.register-myinterests-form').find('.field-validation-error').length === 1 && captcha_response.length > 0){
                    INFORMA.Analytics.trackFormEvents($(this), 'Submit');
                }
            }

            if (captcha_response.length == 0) {
                // Captcha failed
                captchaMsgContainer.css('display', 'block').html('The captcha field is required.').addClass('field-validation-error');
                return false;
            } else {
                // Captcha is passed
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
                backdrop: "static"
            });
        }
    }

    _resetForm = function($form) {
        $form.find('input[type=text], input[type=password], input[type=number], input[type=email], input[type=tel], select, textarea').val('');
        $form.find('input[type=radio]').removeAttr('checked');
        $form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        $form.find('.preselected-checkbox input[type=checkbox]').attr('checked', 'checked');
        $form.find('select.chosen-select').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
        var preselected = $form.find('.preselected-checkbox input[type=checkbox]');
        if(preselected.length > 0){
          $.each(preselected, function(){
            $(this).val(this.checked ? true : false);
          });
        }
    }

    _showHideInlineForm = function() {
        var formInlineActiveTab = $('.contactUsPage-contactUs .tab-pane.active'),
            _formSubmitStatus = $('.contactUsPage-contactUs .tab-pane .submit-status');
        if (formInlineActiveTab.length > 0) {
            var inlineTabError = formInlineActiveTab.find('.error-response'),
                inlineTabErrorForm = inlineTabError.parents('.tab-pane.active').find('form');
            if (inlineTabError.length > 0) {
                inlineTabErrorForm.addClass('hide');
            } else {
                inlineTabErrorForm.removeClass('hide');
            }
            var inlineTabSucess = formInlineActiveTab.find('.submit-response'),
                inlineTabSucessForm = inlineTabSucess.parents('.tab-pane.active').find('form');
            if (inlineTabSucess.length > 0) {
                inlineTabSucessForm.addClass('hide');
            } else {
                inlineTabSucessForm.removeClass('hide');
            }

            _formSubmitStatus.each(function() {
                var Status = $(this).attr('data-status'),
                    Parent = $(this).parents('.tab-pane');
                if (Status.length > 0) {
                    Parent.find('form').addClass('hide');
                    if (Status == 'success') {
                        Parent.find('.submit-response').removeClass('hide');
                        Parent.find('.error-response').addClass('hide');
                    } else {
                        Parent.find('.error-response').removeClass('hide');
                        Parent.find('.submit-response').addClass('hide');
                    }

                } else {
                    Parent.find('form').removeClass('hide');
                    Parent.find('.submit-response, .error-response').addClass('hide');
                }
            })
        }
    }

    _showOverlay = function() {
        var formSubmitResponseModal;
        if (_formSubmitStatus.length > 0) {
            if (_formSubmitStatus.attr('data-status') == "") {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {
                    formSubmitResponseModal.find('form').removeClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').addClass('hide');
                    formSubmitResponseModal.removeClass('centreAlign');
                }
            } else if (_formSubmitStatus.attr('data-status').length > 0) {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {

                    formSubmitResponseModal.find('form').addClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').removeClass('hide');
                    formSubmitResponseModal.addClass('centreAlign');
                    _resetForm(formSubmitResponseModal.find('form'));
                    formSubmitResponseModal.modal({
                        show: true
                    })

                }

                //Checking The status and Displaying that section
                if (_formSubmitStatus.attr('data-status') == 'success') {
                    $('.submit-response').removeClass('hide');
                    $('.error-response').addClass('hide');
                } else {
                    $('.error-response').removeClass('hide');
                    $('.submit-response').addClass('hide');
                }

            }
            _formSubmitStatus.each(function() {
                var Status = $(this).attr('data-status'),
                    Parent = $(this).parents('.modal');
                if (Status.length > 0) {
                    Parent.find('form').addClass('hide');
                    Parent.modal({
                        show: true,
                        backdrop: "static"
                    })
                    if (Status == 'success') {
                        // To track Google Analytics on Submit
                        INFORMA.Analytics.trackFormEvents(_formSubmitStatus, 'Submit');
                        Parent.find('.submit-response').removeClass('hide');
                        Parent.find('.error-response').addClass('hide');
                    } else {
                        Parent.find('.error-response').removeClass('hide');
                        Parent.find('.submit-response').addClass('hide');
                    }

                } else {
                    Parent.find('.submit-response, .error-response').addClass('hide');
                }
            })

        }

    }


    _validateAllForms = function() {
        // $('form.get-in-touch').validate();
        // $('form.request-a-demo').validate();
        $('.wffm-form').find(':submit').on('click', function() {
            if ($('.get-in-touch ').valid() == true) {
                return true;
            } else {
                return false;
            }
        });
    }

    _bindToolTip = function() {
        $('form.get-in-touch legend, form.request-a-demo legend, form.wffm-form legend').on("click", function(e) {
            $(this).toggleClass('active');
            $(this).parent().children('p').toggleClass('show');
        });

        $('form.get-in-touch legend, form.request-a-demo legend, form.wffm-form legend').each(function() {
            if ($(this).next().is('p'))
                $(this).addClass('tool_tip');
        });
    }

    _parseVerticalName = function(data) {
        $('span.product-name-holder').html(data.ProductName);
        $('.product-name-holder').val(data.ProductName);
        $('.tc-product-name').html(data.ProductName);
        if (data.ProductName != null) {
            $('.tc-product-name').html(data.ProductName);
        }
        // Listing product dropdown update
        if($('.product-finder-results .search-container').length > 0 || $('.recom-prod-carousel').length > 0) {
            _productDropdownUpdate(data.ProductName);
        }
    }

    _parseResults = function(data) {
        var results = data,
            _inputId = $(_formId + ' .area-interests input').first().attr("id"),
            _inputName = $(_formId + ' .area-interests input').first().attr("name"),
            _interestValue = '',
            _interestText = '',
            _presentHeading,
            _tmpElement;
        if (_inputId) {
            _inputId = _inputId.replace("Id", "Value");
        }
        if (_inputName) {
            _inputName = _inputName.replace("Id", "Value");
        }

        $(_formId + " .area-interests .form-group .checkbox").remove();
        $(_formId + " .area-interests").addClass('dynamic-interests');
        $(_formId + ' .page-header h2').find('.product-name').text(results.ProductName);

        $(_formId + ' .page-header h2').text(formHeading);

        var hiddenProdcutName = $(_formId + " .form-additional-fields .product-name-field");
        if (hiddenProdcutName.length > 0) {
            hiddenProdcutName.val(results.Title);
        }

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

    _getAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
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
    }

    _bindSelectOptions = function() {
        $(document).on('change', 'form.get-in-touch .hide-title .checkbox input, form.request-a-demo .hide-title .checkbox input', function(e) {
            $(this).parent().parent().toggleClass('active');
        });
    }

    _validateEmail = function(email) {
        var domain = email.substring(email.lastIndexOf("@") + 1);
        if (INFORMA.validDomains.indexOf(domain) < 0)
            return false;
        return true;
    }

    _bindValidationLogic = function() {
        //Email validation logic
        $('.wffm-form').find('.email-field').each(function() {
            $(this).blur(function() {
                var emailDomainMsg = $(this).parent().find('span.email-validation-message'),
                    emailValidMsg = $(this).parent().find('span.field-validation-error');
                if (_validateEmail($(this).val())) {
                    if (emailDomainMsg.length > 0 && emailValidMsg.length == 0) {
                        emailDomainMsg.removeClass('hide').addClass('show');
                    } else {
                        emailDomainMsg.addClass('hide').removeClass('show');
                    }
                } else {
                    if (emailDomainMsg.length > 0) {
                        emailDomainMsg.addClass('hide').removeClass('show');
                    }
                }
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
        var formDOM = $("form.wffm-form");
        if (formDOM.length > 0) {
            $.each(formDOM, function() {
                var formSubmitBtn = $(this).find('.form-submit-border .btn');
                formSubmitBtn.attr('disabled', true);
                $(this).on('change', 'input, textarea, select', function() {
                    formSubmitBtn.removeAttr('disabled');
                    if ($(this).is('textarea') || $(this).is('input[type="email"]') || $(this).is('input[type="text"]') || $(this).is('input[type="number"]') || $(this).is('input[type="tel"]')) {
                        $(this).val($(this).val().trim());
                    }
                });

                $(this).on('change', '.terms-and-conditions input[type=checkbox]', function() {
                    $(this).val(this.checked ? true : false);
                    if(this.checked){
                      $(this).attr('checked', 'checked');
                    }else{
                      $(this).removeAttr('checked');
                    }
                });
            });
        }
    }

    _showModal = function(el) {
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        _formId = $(el).data('modal');
        _resetForm($(_formId).find('form'));
        if ($(el).attr('data-productid')) {
            productId = {
                'guid': $(el).attr('data-productid')
            };
            _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
        } else {
            _resetDefaultTitle(el);
        }
        $(_formId).modal({
            show: 'true'
        })
        _showOverlay();

    };
    _productDropdownUpdate = function(name) {
        var ProductDropdown = jQuery('.form-modal select.product-list');
        ProductDropdown.append('<option val="' +name+ '">' +name+ '</option>');
        ProductDropdown.val(name);
        ProductDropdown.trigger('chosen:updated');
        ProductDropdown.parents('.form-group').addClass('disable-dropdown');

    };

    _bindProductId = function() {
        $(document).on('click', '.wffm-elq-form-btn', function() {
            // To track Google Analytics on Open
            INFORMA.Analytics.trackFormEvents($(this), 'Open');
            _showModal(this);
        });
    }

    _showFormIntro = function() {
        var contactUsGetinTouchForm = $('.contactUsPage-contactUs'),
            formIntroText = contactUsGetinTouchForm.find('.form-introduction'),
            tabform = contactUsGetinTouchForm.find('.tab-content'),
            formHeaderText = contactUsGetinTouchForm.find('.page-header');
        if (formIntroText.length > 0) {
            formIntroText.addClass('show');
        }
        if (tabform.length > 0) {
            formHeaderText.addClass('hide');
        }

    }

    _updateProductVerticalName = function() {
        var productId = {
            'guid': $('.page-id').val()
        };
        _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
    }

    _destroyChosenInDevice = function() {
        if (INFORMA.global.device.isTablet || INFORMA.global.device.isMobile) {
            if ($('form.wffm-form .chosen-select').length > 0) {
                $('form.wffm-form .chosen-select').chosen('destroy');
                $("form.get-in-touch .form-group .chosen-select, form.request-a-demo .form-group .chosen-select, form.register-myinterests-form .form-group .chosen-select").wrap("<div class='select-wrapper'></div>");
            }
        }
    }

    _customPhoneErrorMsg = function() {
        var phoneErorrMsg = $('form.wffm-form input[type="number"]').attr('data-val-regex');
        if (phoneErorrMsg) {
            $.extend($.validator.messages, {
                number: phoneErorrMsg
            });
        }
    }

    _validateCountry = function() {
        $('.wffm-form .chosen-container').on('click mousedown', function(e) {
            e.preventDefault();
            var selectform = $(this).find('.select-default');
            if(selectform.text()){
                selectform.css('display','none');
            }
        });    
    }

    _reCaptchaAccessbility = function() {
        $(window).load(function() {
            $('.g-recaptcha-response').attr('aria-labelledby', 'g-recaptcha-response');
        });
    }

    _resetFormOnRefresh = function() {
        $(window).bind("pageshow", function() {
            var form = $('.wffm-form');
            if (form.length > 0) {
                $.each(form, function() {
                    _resetForm($(this));
                });
            }
        });
    }

    _UpdateHiddenFields = function() {
        if($('.wffm-form').length > 0) {
            $('.wffm-form').each(function() {
                var clientId = $(this).attr('id')
                var inputClientIdEl = $(this).find('.form-clientid');
                if(inputClientIdEl.length){
                    inputClientIdEl.val(clientId); 
                }
             });
        }
    }

    _UpdateProductName = function() {
        var ProductList = $('.product-list');
        ProductList.each(function() {
            var Parent = $(this).parents('form'),
                SelectedItem = $(this).val();

            Parent.find('.tc-product-name').text(SelectedItem);
        })
    }

    init = function() {
        //Update hidden fields on load

        _UpdateHiddenFields();

        //todo: No null check, dont execute these bindings if forms are not there
        _destroyChosenInDevice();
        _bindNumber();
        _showOverlay();
        _showOverlayQueryString()
        _reCaptchaHandler();
        //  _validateAllForms();
        _bindToolTip();
        _bindCalendar();
        _bindProductId();
        _bindSelectOptions();
        _bindValidationLogic();
        _disableSubmit();
        _showHideInlineForm();
        _HideOverlay();
        _showFormIntro();
        //_updateProductVerticalName();
        _updateHiddenProductVerticalName();
        _validateChoosenSelect();
        _customPhoneErrorMsg();
        _reCaptchaAccessbility();
        _resetFormOnRefresh();
        //_resetDefaultTitle();
        _setFormModalFocus();
        _changeProductDropdown();
        _validateCountry();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.forms.init());
