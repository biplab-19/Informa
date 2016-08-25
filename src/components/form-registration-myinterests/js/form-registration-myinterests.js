var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init, _showProgressiveTabs,
    _renderMultiSelect,
    _showNextTab,
    _showPrevTab,
    _validateForm,
    _appendNextBtn,
    _appendBackBtn,
    _myinterestForm = $('.register-myinterests-form'),
    _myinterestFormContainer = $('.register-myinterests-form-container'),
    _myinterestFormTabContainer = _myinterestFormContainer.find('tab-content'),
    _stepOneContaner = _myinterestFormContainer.find('#step1'),
    _stepTwoContaner = _myinterestFormContainer.find('#step2'),
    _recommendedTips = $('.recommended-tips'),
    _recommendedTipsContainer = $('.recommended-tips-container'),
    _appendSteps,
    _appendStepTwo,
    _wrapFormContainer,
    _renderAllContainers,
    _renderRecommendedTips;

    //methods
    _renderRecommendedTips = function(){
      _recommendedTipsContainer.append(_recommendedTips).css('display', 'none');

    }
    _renderAllContainers = function(){
        _myinterestForm.append(_myinterestFormContainer);
        _myinterestForm.addClass('row');
        _renderMultiSelect();
    }
    _wrapFormContainer = function(){
      _myinterestFormContainer.before(_myinterestForm);
    }
    _appendSteps = function(){
        var step1Block =_myinterestForm.find('fieldset.step1'), step2Block = step1Block.nextAll();
        _stepOneContaner.prepend(step1Block);
        _stepTwoContaner.prepend(step2Block);
      //    aboutYouBlock.remove();
    }
    _appendStepTwo = function(){
        var step2Block =_myinterestForm.find('.step2');
        if(step2Block.length > 0 ){
          if($.isArray(step2Block)){
              $.each(step2Block, function(i){
                  _stepTwoContaner.prepend($(this));
              });
          }else{
            _stepTwoContaner.prepend(step2Block);
          }
        }

        var submitBlock = _myinterestForm.find('.form-submit-border');
       _stepTwoContaner.append(submitBlock);
    }
    _appendBackBtn = function(){
        var backBtn = $('.prev-step')[0], btnContainer = _myinterestForm.find(":submit").parent();
        btnContainer.append(backBtn);
    }
    _appendNextBtn = function(){
        var nextBtn = '<ul class="list-inline pull-right"><li><button type="button" class="btn btn-primary next-step">Next</button></li></ul>';
        $('.form-progressive-container').find('#step1').append(nextBtn);
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
                      maxHeight: 200
                    });
                }
            });
        }
    }

    _showProgressiveTabs = function() {
      //  $('.triangle-nav > li a[title]').tooltip();
        $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
            var $target = $(e.target);
            if($target.attr('href') == "#step2" && $target.parent().attr('class') == 'active'){
              _recommendedTipsContainer.css('display', 'block');
            }else{
              _recommendedTipsContainer.css('display', 'none');
            }
            if ($target.parent().hasClass('disabled')) {
                return false;
            }
        });

        $(".next-step").on('click', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            _validateForm();
            _showNextTab($active);

        });
        $(".prev-step").on('click', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }
    _validateForm = function() {
        _myinterestForm.validate({
            submitHandler: function() {
                console.log("submitted!");
            },
            failure: function() {
                console.log("Failure");
            },
            success: function() {
                console.log("Success");
            }
        });
    }

    init = function() {
        _showProgressiveTabs();
        // //_appendNextBtn();
         _appendBackBtn();
         _appendSteps();
        // _appendStepTwo();
         _wrapFormContainer();
         _renderAllContainers();
        //_renderMultiSelect();
        _renderRecommendedTips();
        //  _validateForm();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());
