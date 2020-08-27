var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _showProgressiveTabs,
        _renderMultiSelect,
        _renderSingleSelect,
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
        _isAllSelected = 'false',
        //_validateMultiSelct,
        _showRegisterFormBtn = $('.show-register-form'),
        _showRegisterForm,
        _showRegisterFormPopup,
        _myinterestsModal = $('#registerMyinterestModal'),
        _myinterestsModalClose = $('.register-myinterests-close'),
        _validateEmailDomainMsg,
        _getAjaxData, _SelectAll,
        Urls = INFORMA.Configs.urls.webservices,
        _parseResults,
        _bindNumber,
        _clearFormInput,
        _bindToggleTab,
        _destroyMultiSelect,
        _addTabNumbers,
        _closeMyInterestModal,
        _showRegisterFormPopupSingleStep,
        _validateCountry,
        _showContentFirstTime,
        Urls = INFORMA.Configs.urls.webservices,
        iOSversion,
        _loadPDFPopUp,
        _populateHiddenFields;

    //methods

    _clearFormInput = function(form) {
        form.find('input[type=text], input[type=password], input[type=number], input[type=email], input[type=tel], textarea').val('');
        form.find('.area-interests-guid').val('');
        form.find('.area-interests-text').val('');
        form.find(".field-validation-error span").hide();
        form.find('input[type=radio]').removeAttr('checked');
        form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        form.find('.preselected-checkbox input[type=checkbox]').prop('checked', true);
        form.find('select.chosen-select').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
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
                  var validator = _myinterestForm.validate();
                    validator.focusInvalid();
                    return false;
                }
            });
        }
    _showRegisterFormPopup = function() {
        _myinterestsModal.find('.modal-body').empty();
        _myinterestsModal.find('.modal-body').append(_myinterestsSection);
        var chosenSelect = $("form.register-myinterests-form .chosen-select"),
        chosenCotainer = $('form.register-myinterests-form .chosen-container');
        if(chosenCotainer.length > 0 ){
          chosenCotainer.remove();
        }
        if(chosenSelect.length > 0){
          chosenSelect.chosen('destroy');
          chosenSelect.chosen({
              disable_search_threshold: 10,
              width: "100%"
          });
        }
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
    _showContentFirstTime = function () {
        $('body').on('click', '.show-content-first-time', function (e) {
            var value = $(this).attr('href');
            var data = $(this).attr('data-firstcontent');
            if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                setTimeout(function () {
                    _getAjaxData(Urls.SetFirstContentDisplayedCookie, "Post", JSON.stringify({ "firstContent": data }), null, null, null);
                }, 100)
            }
            else {
                _getAjaxData(Urls.SetFirstContentDisplayedCookie, "Post", JSON.stringify({ "firstContent": data }), null, null, null);
            }

            if ($(this).attr('data-target') != "loadPDFComponentModal" && (typeof $(this).attr('download') == typeof undefined && $(this).attr('download') === false)) {
                e.preventDefault();
                window.location.href = value;
            }
        })
    }

    _populateHiddenFields = function (valObjectArray) {
        var $registerForm = $('#formRegistration form'),
            objCount,
            objCurr,
            objLength = valObjectArray.length;

        for (objCount = 0; objCount < objLength; objCount++) {
            objCurr = valObjectArray[objCount];
            $registerForm.find(objCurr.selector).val(objCurr.value);
        }
    }

    _showRegisterForm = function() {
        $('body').on('click', '.show-register-form', function(e) {
            if ($(this).attr('data-show-register') == 'true') {
                //check if anchor is meant to open a form to trigger a download
                var isDownloadAnchor = $(this).attr('data-enable-download') == 'true'

                if (isDownloadAnchor) {
                    $('#formRegistration form').attr('data-trigger-download','true');
                }
                
                _populateHiddenFields([
                    {
                        selector: '.resource-file-type',
                        value: $(this).attr('data-download-type') || 'NULL'
                    },
                    {
                        selector: '.resource-type',
                        value: $(this).attr('data-enable-download') == 'true' ? 'File Download' : 'Gated content viewed'
                    }
                ]);
                    
                // To track Google Analytics on Open
                INFORMA.Analytics.trackFormEvents($(this), 'Open');
                e.preventDefault();
                e.stopPropagation();

                $('.redirect-url-field').val($(this).attr('data-url'));
                //_showRegisterFormPopup();
                _showRegisterFormPopupSingleStep();

                if ($(this).attr('pdf-data-url')) {
                    var pdfCtaId = '';
                    if (typeof $(this).attr('download') != typeof undefined && $(this).attr('download') !== false) {
                        pdfCtaId = 'id@'+$(this).attr('id');
                    }
                    if (document.getElementsByClassName("showPdfUrl").length == 0) {
                        var x = document.createElement("INPUT");
                        x.setAttribute("type", "hidden");
                        x.setAttribute("value", $(this).attr('pdf-data-url')+pdfCtaId);
                        x.setAttribute("id", "showPdfUrl");
                        x.setAttribute("class", "showPdfUrl");
                        document.body.appendChild(x);
                    } else {
                        $("#showPdfUrl").val($(this).attr('pdf-data-url')+pdfCtaId);
                    }
                }
            }
            else if ($(this).attr('pdf-data-url')) {
                if (typeof $(this).attr('download') == typeof undefined && $(this).attr('download') === false){
                    $("#showPdfUrl").val($(this).attr('pdf-data-url'));
                    PDFJS.webViewerLoad($("#showPdfUrl").val());
                    //document.getElementById("PDFtoPrint").setAttribute("src", $("#showPdfUrl").val());
                }else{
                    $(this).attr('href', $(this).attr('pdf-data-url'));
                    $("#showPdfUrl").val($(this).attr('pdf-data-url')+"id@"+$(this).attr('id'));
                }
            } else {
                $(this).attr('href', $(this).attr('data-url'));
            }
        });
    }

    iOSversion = function(){
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var appVer = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(appVer[1], 10), parseInt(appVer[2], 10), parseInt(appVer[3] || 0, 10)];
        }
    }

    _showRegisterFormPopupSingleStep = function(){
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };  
        _clearFormInput(_myinterestForm);
        var chosenSelect = $("form.register-myinterests-form .chosen-select"),
        chosenCotainer = $('form.register-myinterests-form .chosen-container');
        if(chosenCotainer.length > 0 ){
          chosenCotainer.remove();
        }
        if(chosenSelect.length > 0){
          chosenSelect.chosen('destroy');
          chosenSelect.chosen({
              disable_search_threshold: 10,
              width: "100%"
          });
        }
        var version = iOSversion();
        if (version !== undefined) {
            if(version[0] >= 11){
                $('#formRegistration').on('show.bs.modal', function () {
                    $('body').addClass('body-fixed');
                });
                $('#formRegistration').modal({
                    show: 'true'
                })
                $('#formRegistration').on('hide.bs.modal', function () {
                    $('body').removeClass('body-fixed');
                });
            }
        }
        else {
            if($('.show-register-form').attr('data-show-register') == 'true')
               $('#formRegistration').modal('show');
        }

        // var a = Math.ceil(Math.random() * 9)+ '';
        // var b = Math.ceil(Math.random() * 9)+ '';
        // var c = Math.ceil(Math.random() * 9)+ '';
        // var d = Math.ceil(Math.random() * 9)+ '';
        // var e = Math.ceil(Math.random() * 9)+ '';
        // var code = a + b + c + d + e;
        // $('.txtCaptcha').val(code);
        // $(".CaptchaDiv").html(code);
        _validateCountry();
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
        _renderSingleSelect();
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
                    var placeHolder = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).multiselect({
                        buttonText: function(options, select) {
                            return placeHolder;
                        },
                        maxHeight: 220,
                        onChange: _updateMultiSelect,
                        onDropdownShow: _showSelectAll,
                        onDropdownHidden: _hideSelectAll,
                        numberDisplayed: 1
                    });
                    var placeHolderText = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).next().find('button.multiselect>.multiselect-selected-text').html(placeHolderText)
                    var mutiselectContainer = $(this).next().find('.multiselect-container');
                    if (!mutiselectContainer) {
                        var newMultiselectContainer = $(this).parent().find('.multiselect-container').detach();
                        $(this).next().append(newMultiselectContainer);
                    }
                    var selectAllDiv = $('<div class="select-all-bottom"><a class="multiselect-all" data-selectall="false" href="#">Select all</a></div>');
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
            _yourinterestguid = $.unique(_yourinterestguid);
            _yourinterestitem = $.unique(_yourinterestitem);
            _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
            _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
        }

    }
    _SelectAll = function() {
        var Element = $(".select-all-bottom a");
        if (Element.length > 0 ) {
          $.each(Element, function(){
            $(this).on("click", function(e) {
                _isAllSelected = $(this).attr('data-selectall');
                e.preventDefault();
                if (_isAllSelected == 'false') {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("selectAll", true);
                    var CurrentVals = CurrentSelect.val();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                    $.each(CurrentTxt,function(index, value){
                      if ($.inArray(value, _yourinterestitem)==-1){
                        _yourinterestitem.push(value);
                      }
                    });
                    $.each(CurrentVals,function(index, value){
                        if ($.inArray(value, _yourinterestguid)==-1){
                          _yourinterestguid.push(value);
                        }
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                    $(this).attr('data-selectall', 'true');
                  //  _isAllSelected = true;
                } else {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("deselectAll", false);
                    var CurrentVals = CurrentSelect.find('option').map(function() {
                        return $(this).val();
                    }).get();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                     _yourinterestitem = $.grep(_yourinterestitem, function(value) {
                        return $.inArray(value, CurrentTxt) < 0;
                    });
                     _yourinterestguid = $.grep(_yourinterestguid, function(value) {
                        return $.inArray(value, CurrentVals) < 0;
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                  //  _isAllSelected = false;
                    $(this).attr('data-selectall', 'false');
                }
                return false;
            });
          });

        }
    }
    _showProgressiveTabs = function() {
        _bindToggleTab();
        $(document).on('click', '.next-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            var emailError = $('form.register-myinterests-form .email-field').parent().find('.email-validation-message.show');
            $('form.register-myinterests-form').find('.field-validation-error span').css('display', 'block');
            if (emailError.length == 0) {
                if (_myinterestForm.valid() == true) {
                    var formSubmitBtn = $('form.register-myinterests-form').find('.form-submit-border .btn');
                    formSubmitBtn.removeAttr('disabled');
                    _showNextTab($active);
                }else{
                  var validator = _myinterestForm.validate();
                    validator.focusInvalid();
                    return false;
                }
            }
        });

        $(document).on('click', '.prev-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }

    // _validateMultiSelct = function() {
    //     $.validator.setDefaults({
    //         ignore: ":hidden:not(.chosen-select)"
    //     });
    //     $("form.register-myinterests-form .chosen-select").on('change', function() {
    //         $(this).valid();
    //     });
    // }

    _renderSingleSelect = function() {
        $("form.register-myinterests-form .chosen-select").chosen({
            disable_search_threshold: 10,
            width: "100%"
        });
    }

    _closeMyInterestModal = function() {
        _myinterestsModalClose.click(function() {
            $("form.register-myinterests-form .chosen-select").chosen('destroy');
        });
    }
    _loadPDFPopUp = function () {
        var urlpath,urlParameters, pdf_url,isIE = false, isEdge = false;
        if(/*@cc_on!@*/false || !!document.documentMode){
          isIE = true
        }
        if( !isIE && !!window.StyleMedia) {
            isEdge = true;
        }

        if(isIE || isEdge){
            urlParameters = window.location.href;
        if(urlParameters.split('?')['1']){
            var pdf_Url_Param  = urlParameters.split('?')['1'].split('&')['0'].split('=')[1];
            if(pdf_Url_Param != undefined && pdf_Url_Param.indexOf('pdf')!=-1)
                pdf_url = pdf_Url_Param;
        }
        }else{
            urlParameters = new URLSearchParams(window.location.search);
            pdf_url = urlParameters.get('pdf-url')

        }
        if ( pdf_url) {
            if(pdf_url.indexOf('%60') != -1)
                pdf_url = pdf_url.replace(/%60/g, '~');
            if($('a[href$="'+pdf_url+'"]')[0]){
                $('a[href$="'+pdf_url+'"]')[0].click();
            }else{
                $("#loadPDFComponentModal").modal("show");
                PDFJS.webViewerLoad(pdf_url);
            }
            urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.pushState({ path: urlpath }, '', urlpath);

        }
    }


    init = function() {
        if (_myinterestForm.length > 0) {
            // _showProgressiveTabs();
            // _appendBackBtn();
            // _appendSteps();
            // _wrapFormContainer();
            // _renderAllContainers();
             _bindNumber();
            // _renderRecommendedTips();
            //_validateMultiSelct();
            _showRegisterForm();
            _closeMyInterestModal();
            _validateCountry();
            _showContentFirstTime();

        } else {
            _myinterestsSection.css('display', 'none');

        }

        _loadPDFPopUp();

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());
