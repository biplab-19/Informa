/*
 * Anlayst Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystSearch = (function(window, $, namespace) {
    'use strict';
    //variables
    var _analystSearch = $('.analyst-search'),
    	_sector = _analystSearch.find('.sector select'),
    	_subsector = _analystSearch.find('.sub-sector'),
    	_submitBtn = _analystSearch.find('.submit-btn'),
    	_txtField = _analystSearch.find('#name'),
    //methods
    init;

    _txtField.on('keyup', function() {
    	var calcLength = jQuery(this).val().length;

    	if(calcLength > 3) {
    		_submitBtn.removeClass('disabled');
    	} else {
    		_submitBtn.addClass('disabled');
    	}
    })

    _sector.chosen().on('change', function() {
    	var _value = jQuery(this).val();
    	if(_value === 'All') {
    		_subsector.addClass('disabled');
    		if()
    			_submitBtn.addClass('disabled');
    	} else {
    		_subsector.removeClass('disabled');
    		_submitBtn.removeClass('disabled');
    	}
    })

    _submitBtn.on('click', function() {

    })

    init = function() {
        //alert('hi');
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
