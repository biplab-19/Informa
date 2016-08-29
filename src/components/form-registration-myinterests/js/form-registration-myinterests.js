var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _showProgressiveTabs,
        _renderMultiSelect,
        _showNextTab,
        _showPrevTab,
        _validateForm,
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
        _validateOnSubmit,
        _showRegisterFormBtn = $('.show-register-form'),
        _showRegisterForm,
        _showRegisterFormPopup,
        _myinterestsModal = $('#registerMyinterestModal'),
        _myinterestsModalClose = $('.register-myinterests-close'),
        _validateEmail,
        _bindValidationLogic,
        _validateEmailDomainMsg;

    //methods
    _validateEmail = function(email) {
        var domain = email.substring(email.lastIndexOf("@") + 1);
        if (INFORMA.validDomains.indexOf(domain) < 0)
            return false;
        return true;
    }

    _validateEmailDomainMsg = function(element){
      //Email validation logic
      if (_validateEmail($(element).val()))
          if ($(element).next().children().length == 0)
              $(element).next().prepend("<span class='field-validation-error'>E-mail is not in the valid domain list</span>");

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
    _showRegisterFormPopup = function(){
        _myinterestsModal.find('.modal-body').append(_myinterestsSection);
        _myinterestsModal.find('.modal-body .container').removeClass('container');
        _myinterestsModal.modal('show');
    }
    _showRegisterForm = function() {
      _showRegisterFormBtn.on('click', function(e){
        if($(this).attr('data-show-register') == 'true'){
          e.preventDefault();
          e.stopPropagation();
          _showRegisterFormPopup();
        }

      });
    }
    _updateMultiSelect = function() {
        console.log('_updateMultiSelect');
    }
    _renderRecommendedTips = function() {
        _recommendedTipsContainer.append(_recommendedTips).css('display', 'none');

    }
    _renderAllContainers = function() {
        _myinterestForm.append(_myinterestFormContainer);
        _myinterestForm.addClass('row');
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
        _recommendedTipsContainer.css('display', 'block');
    }
    _showPrevTab = function(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
        _recommendedTipsContainer.css('display', 'none');
    }

    _renderMultiSelect = function() {
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect({
                        includeSelectAllOption: true,
                        maxHeight: 140,
                        onChange: _updateMultiSelect,
                        onDropdownShow : _showSelectAll,
                        onDropdownHidden : _hideSelectAll
                    });
                    var placeHolderText = $(this).attr('placeHolder');
                    $(this).next().find('button.multiselect>.multiselect-selected-text').html(placeHolderText)
                    var mutiselectContainer = $(this).next().find('.multiselect-container');
                    if(!mutiselectContainer){
                        var newMultiselectContainer = $(this).parent().find('.multiselect-container').detach();
                        $(this).next().append(newMultiselectContainer);
                    }
                    var selectAllTag = $(this).next().find('li:first.multiselect-item').detach(),
                    selectAllDiv = $('<ul class="select-all-bottom"></ul>').append(selectAllTag.find('a'));
                    if(selectAllTag){
                        $(this).next().append(selectAllDiv);
                    }
                }
            });
        }
    }

    _showSelectAll = function(select){
        $(this.$container).find('.select-all-bottom').css('display', 'block');
      }
    _hideSelectAll = function(){
      $(this.$container).find('.select-all-bottom').css('display', 'none');
    }
    _updateMultiSelect = function(option, checked, select) {
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
    _showProgressiveTabs = function() {
        //  $('.triangle-nav > li a[title]').tooltip();
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);
            if ($target.attr('href') == "#step2" && $target.parent().attr('class') == 'active') {
                _recommendedTipsContainer.css('display', 'block');
            } else {
                _recommendedTipsContainer.css('display', 'none');
            }
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });

        $(".next-step").on('click', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            var EmailTag = $('form.register-myinterests-form input[type=email]');
            _validateEmailDomainMsg(EmailTag);
            //_validateForm();
            if(_myinterestForm.valid() == true){
              var formSubmitBtn = $('form.register-myinterests-form').find('.form-submit-border .btn');
                  formSubmitBtn.removeAttr('disabled');
              _showNextTab($active);
            }
        });
        $(".prev-step").on('click', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }
    _validateForm = function() {
        //    _myinterestForm.validate();
        // _myinterestForm.validate({
        //   invalidHandler: function(form, validator) {
        //         var errors = validator.numberOfInvalids();
        //         if (errors) {
        //             alert(5);
        //         }
        //     },
        //     submitHandler: function(form) {
        //       alert(6);
        //     }
        // });
    }

    _validateMultiSelct = function(){
      //alert(2);
      // $.validator.addMethod("needsSelection", function(value, element) {
      //    return $(element).multiselect("getChecked").length > 0;
      // });
      // $.validator.messages.needsSelection = 'Select.';
    }

    _validateOnSubmit = function(){
      // _myinterestFormSubmitBtn.on('click', function(e){
      //   e.preventDefault();
      //       // $('select[name=multiselect1]').rules('add',{
      //       //   required: true,
      //       //   messages: {
      //       //     required: 'required'
      //       //   }
      //       // });
      //       // $.validator.addMethod("needsSelection", function (value, element) {
      //       //     var count = $(element).find('option:selected').length;
      //       //     return count > 0;
      //       // });
      //       // $.validator.messages.needsSelection = 'please select';
      //
      //   //     _myinterestForm.validate({
      //   //       rules: {
      //   //         multiselect1: "required"
      //   //       },
      //   //       ignore: ':hidden:not(".multiselect")',
      //   //       submitHandler: function() {
      //   //     alert('valid form');
      //   //     return false;
      //   // }
      //   //     });
      //   // if(_myinterestForm.valid() == true){
      //   //     alert(11);
      //   // }
      // });

    }

    init = function() {
        _showProgressiveTabs();
        _appendBackBtn();
        _appendSteps();
        _wrapFormContainer();
        _renderAllContainers();
        _validateForm();
        _renderRecommendedTips();
        _validateMultiSelct();
        _validateOnSubmit();
        _showRegisterForm();
        _bindValidationLogic();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());
