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
    //methods
    init;

    _subsector.chosen().on('change', function() {
    	debugger;
    	var _value = jQuery(this).val();
    	if(_value === 'All') {
    		_subsector.addClass('disabled');
    	} else {
    		_subsector.removeClass('disabled');
    	}
    })

    init = function() {
        //alert('hi');
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());
