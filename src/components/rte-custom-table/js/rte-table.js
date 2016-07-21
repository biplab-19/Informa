var INFORMA = window.INFORMA || {};
INFORMA.RTETable = (function(window, $, namespace) {
    'use strict';
    //variables
    var titles = [],i,init, _RTEOnLoad,
        responsiveContainer = $(".rte-custom-table .responsiveTable"),
        Clonedtable = $(".rte-custom-table .table-responsive .table").clone(true);

    _RTEOnLoad = function() {
        Clonedtable.appendTo(responsiveContainer);
        $('.rte-custom-table .table tr:first-child td').each(function() {
            titles.push('<div class="rteTitles">'+$(this).html()+'</div>');
        });
        responsiveContainer.find('table.table tr').each(function() {
            for (i = 1; i <= titles.length; i++) {
                $(this).find('td').eq(i).wrapInner('<div class="rteValues" />').prepend(titles[i]);
            }
        });
        responsiveContainer.find('table.table tr:first-child').remove();
    }
    init = function() {
        _RTEOnLoad();
    };
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RTETable.init());
