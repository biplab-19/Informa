var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _showProgressiveTabs,
        _renderMultiSelect,
        _showNextTab,
        _showPrevTab,
        _appendNextBtn,
        _appendBackBtn,
        _myinterestsSection = $('.register-myinterests-section'),
        _myinterestForm = $('.register-myinterests-form'),
        _myinterestFormContainer = $('.register-myinterests-form-container'),
        _myinterestFormTabContainer = _myinterestFormContainer.find('tab-content'),
        _myinterestFormSubmitBtn = _myinterestForm.find('input[type="submit"]'),
        _stepOneContaner = _myinterestFormContainer.find('#step1'),
        _stepTwoContaner = _myinterestFormContainer.find('#step2'),
        _recommendedTips = $('.recommended-tips'),
        _recommendedTipsContainer = $('.recommended-tips-container'),
        _recommendedTipCol = $('.recommended-tips-col'),
        _appendSteps,
        _wrapFormContainer,
        _renderAllContainers,
        _renderRecommendedTips,
        _updateMultiSelect,
        _multiselectonchange,
        _showSelectAll,
        _hideSelectAll,
        _yourinterestguid = [],
        _yourinterestitem = [],
        _validateMultiSelct,
        _showRegisterFormBtn = $('.show-register-form'),
        _showRegisterForm,
        _showRegisterFormPopup,
        _myinterestsModal = $('#registerMyinterestModal'),
        _myinterestsModalClose = $('.register-myinterests-close'),
        _validateEmail,
        _bindValidationLogic,
        _validateEmailDomainMsg,
        _getAjaxData, _SelectAll,
        _updateProductVertical,
        Urls = INFORMA.Configs.urls.webservices,
        _parseResults,
        _bindNumber,
        _clearFormInput,
        _bindToggleTab,
        _destroyMultiSelect,
        _addTabNumbers;

    //methods
    _clearFormInput = function(form) {
        form.find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
        form.find('.area-interests-guid').val('');
        form.find('.area-interests-text').val('');
        form.find(".field-validation-error span").hide();
    }
    _parseResults = function(data) {
        $('span.product-name-holder').html(data.ProductName);
        $('.product-name-holder').val(data.ProductName);
        $('.vertical-name-holder').val(data.VerticalName);
        $('.tc-product-name').html(data.ProductName);
        $('.tc-vertical-name').html(data.VerticalName);
        if (data.ProductName != null) {
            $('.tc-product-name').html(data.ProductName);
        } else {
            $('.tc-product-name').html(data.VerticalName);
        }
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }
    _updateProductVertical = function() {
        var productId = {
            'guid': $('.page-id').val()
        };
        _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseResults, null, null);
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
        },

        _validateEmail = function(email) {
            var domain = email.substring(email.lastIndexOf("@") + 1);
            if (INFORMA.validDomains.indexOf(domain) < 0)
                return false;
            return true;
        }

    _validateEmailDomainMsg = function(element) {
        //Email validation logic
        if (_validateEmail($(element).val()))
            if ($(element).next().children().length == 0)
                $(element).next().prepend("<span class='field-validation-error email-error'>E-mail is not in the valid domain list</span>");

    }

    _bindValidationLogic = function() {
        //Email message
        var  emailvalidator = $('form').find('.email-validation-error');         
        if  (emailvalidator.length > 0) {            
            $.extend($.validator.messages, {                  
                email: emailvalidator.html()            
            });         
        }
        //Email validation logic
        $('form.register-myinterests-form input[type=email]').blur(function() {
            _validateEmailDomainMsg(this);
        });

    }

    _addTabNumbers = function() {
            var progressiveTabs = $('.form-progressive-wizard a[data-toggle="tab"]');
            if (progressiveTabs.length > 0) {
                $.each(progressiveTabs, function(i) {
                    $(this).prepend('<span class="tab-numbers">' + (i + 1) + '</span>');
                });
            }
        },

        _bindToggleTab = function() {
            $('.form-progressive-wizard a[data-toggle="tab"]').on('show.bs.tab', function(e) {
                if (_myinterestForm.valid() == true) {
                    var $target = $(e.target);
                    if ($target.attr('href') == "#step2" && $target.parent().attr('class') == 'active') {
                        _recommendedTipCol.css('display', 'block');
                    } else {
                        _recommendedTipCol.css('display', 'none');
                    }
                    if ($target.parent().hasClass('disabled')) {
                        return false;
                    }
                } else {
                    e.preventDefault();
                }
            });
        }
    _showRegisterFormPopup = function() {
        _myinterestsModal.find('.modal-body').empty();
        _myinterestsModal.find('.modal-body').append(_myinterestsSection);
        _myinterestsModal.find('.modal-body .container').removeClass('container');
        _clearFormInput(_myinterestForm);
        _yourinterestguid = [];
        _yourinterestitem = [];
        var resetFormValidate = _myinterestForm.removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(resetFormValidate);
        var $active = $('.form-progressive-wizard .triangle-nav li.active');
        if ($active) {
            _showPrevTab($active);
        }
        _bindToggleTab();
        _destroyMultiSelect();
        _renderMultiSelect();

        $.each($('.custom-multiselect'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });

        $.each($('.select-wrapper'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });
        _myinterestsModal.modal('show');
    }

    _showRegisterForm = function() {
        $('body').on('click', '.show-register-form', function(e) {
            if ($(this).attr('data-show-register') == 'true') {
                e.preventDefault();
                e.stopPropagation();
                $('.redirect-url-field').val($(this).attr('data-url'));
                _showRegisterFormPopup();
            }
        });
    }

    _renderRecommendedTips = function() {
        _recommendedTipsContainer.append(_recommendedTips);
        _recommendedTipCol.css('display', 'none');
    }
    _destroyMultiSelect = function() {
        _myinterestForm.find('select[multiple="multiple"]').multiselect('rebuild');
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                }
            });
        }
    }
    _renderAllContainers = function() {
        _myinterestForm.append(_myinterestFormContainer);
        _myinterestForm.addClass('row');
        _addTabNumbers();
        _renderMultiSelect();
    }
    _wrapFormContainer = function() {
        _myinterestFormContainer.before(_myinterestForm);
    }
    _appendSteps = function() {
        var step1Block = _myinterestForm.find('fieldset.step1'),
            step2Block = step1Block.nextAll();
        _stepOneContaner.prepend(step1Block);
        _stepTwoContaner.prepend(step2Block);
        //    aboutYouBlock.remove();
    }

    _appendBackBtn = function() {
        var backBtn = $('.prev-step')[0],
            btnContainer = _myinterestForm.find(":submit").parent();
        btnContainer.append(backBtn);
    }
    _showNextTab = function(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
        _recommendedTipCol.css('display', 'block');
        _myinterestFormContainer.removeClass('background-pattern');
    }
    _showPrevTab = function(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
        $('.about-you-details').find(":input:not([type=hidden]):first").focus();
        _recommendedTipCol.css('display', 'none');
        _myinterestFormContainer.addClass('background-pattern');
    }

    _renderMultiSelect = function() {
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                    var placeHolder = $(this).attr('placeHolder');
                    $(this).multiselect({
                        buttonText: function(options, select) {
                            return placeHolder;
                        },
                        maxHeight: 140,
                        onChange: _updateMultiSelect,
                        onDropdownShow: _showSelectAll,
                        onDropdownHidden: _hideSelectAll,
                        numberDisplayed: 1,
                        onSelectAll: function() {
                            var CurrentSelect = $(".custom-multiselect select.active"),
                                CurrentVals = CurrentSelect.val(),
                                CurrentTxt = CurrentSelect.parent().find(".dropdown-toggle").attr("title");
                            _myinterestForm.find('.area-interests-guid').val(CurrentVals);
                            _myinterestForm.find('.area-interests-text').val(CurrentTxt);
                            IsAllSelected = true;
                        }
                    });
                    var placeHolderText = $(this).attr('placeHolder');
                    $(this).next().find('button.multiselect>.multiselect-selected-text').html(placeHolderText)
                    var mutiselectContainer = $(this).next().find('.multiselect-container');
                    if (!mutiselectContainer) {
                        var newMultiselectContainer = $(this).parent().find('.multiselect-container').detach();
                        $(this).next().append(newMultiselectContainer);
                    }
                    var selectAllDiv = $('<div class="select-all-bottom"><a class="multiselect-all" href="#">Select all</a></div>');
                    $(this).next().append(selectAllDiv);
                }
            });
            _SelectAll();
        }
        $('.multiselect-container').mCustomScrollbar();
    }

    _showSelectAll = function(select) {
        $(this.$container).parent().find("select").addClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'block');
    }
    _hideSelectAll = function() {
        $(this.$container).parent().find("select").removeClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'none');
    }
    _updateMultiSelect = function(option, checked, select) {
        if (option) {
            if (checked) {
                _yourinterestitem.push(option.text());
                _yourinterestguid.push(option.val());
            } else {
                _yourinterestitem.splice($.inArray(option.text(), _yourinterestitem), 1);
                _yourinterestguid.splice($.inArray(option.val(), _yourinterestguid), 1);
            }
            _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
            _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
        }

    }
    _SelectAll = function() {
        var Element = $(".select-all-bottom a"),
            IsAllSelected = false;
        if (Element) {
            Element.on("click", function(e) {
                e.preventDefault();
                if (!IsAllSelected) {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("selectAll", true);
                    var CurrentVals = CurrentSelect.val();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();

                    //  CurrentTxt = CurrentSelect.parent().find(".dropdown-toggle").attr("title");

                    _yourinterestitem.push(CurrentTxt);
                    _yourinterestguid.push(CurrentVals);

                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                    IsAllSelected = true;
                } else {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("deselectAll", false);
                    var CurrentVals = CurrentSelect.val();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();

                    _yourinterestitem.splice($.inArray(CurrentTxt, _yourinterestitem), 1);
                    _yourinterestguid.splice($.inArray(CurrentVals, _yourinterestguid), 1);
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                    IsAllSelected = false;
                }
                return false;
            });
        }
    }
    _showProgressiveTabs = function() {
        _bindToggleTab();
        $(document).on('click', '.next-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            var EmailTag = $('form.register-myinterests-form input[type=email]');
            _validateEmailDomainMsg(EmailTag);
            var emailError = $('form.register-myinterests-form').find('.email-error');
            $('form.register-myinterests-form').find('.field-validation-error span').css('display', 'block');
            if (emailError.length == 0) {
                if (_myinterestForm.valid() == true) {
                    var formSubmitBtn = $('form.register-myinterests-form').find('.form-submit-border .btn');
                    formSubmitBtn.removeAttr('disabled');
                    _showNextTab($active);
                }
            }
        });

        $(document).on('click', '.prev-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }

    _validateMultiSelct = function() {
        $.validator.setDefaults({
            ignore: ":hidden:not(.chosen-select)"
        });
    }

    init = function() {
        if (_myinterestForm.length > 0) {
            _showProgressiveTabs();
            _appendBackBtn();
            _appendSteps();
            _wrapFormContainer();
            _renderAllContainers();
            _bindNumber();
            //_renderMultiSelect();
            _renderRecommendedTips();
            _validateMultiSelct();
            _showRegisterForm();
            _bindValidationLogic();
            _updateProductVertical();
        } else {
            _myinterestsSection.css('display', 'none');

        }

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());
