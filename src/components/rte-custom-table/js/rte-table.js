var INFORMA = window.INFORMA || {};
INFORMA.RTETable = (function(window, $, namespace) {
    'use strict';
    //variables
    var titles = [],
        tablevalues = [],
        count, i,
        rteTable = $('.rte-custom-table table.table'),
        rteTableLength = rteTable.find("tr:first-child").children('td').length,
        responsiveContainer = $(".rte-custom-table .responsiveTable"),
        init, _RTEOnLoad;

    _RTEOnLoad = function() {
        for (count = 2; count <= rteTableLength; count++) {
            $(".rte-custom-table .table tr td:nth-child(" + count + ")").each(function() {
                tablevalues.push("<tr><td>" + $(this).html() + "</td></tr>");
            });
            responsiveContainer.append('<table class="mobileTable">' + tablevalues.join(' ') + '</table>');
            tablevalues.length = 0;
        }
        $(".rte-custom-table .table tr td:nth-child(1)").each(function() {
            titles.push("<td>" + $(this).html() + "</td>");
        });
        $(".rte-custom-table .mobileTable").each(function() {
            for (i = 0; i <= titles.length; i++) {
                $(this).find('tr').eq(i).prepend(titles[i]);
            }
        });
        $(".rte-custom-table .mobileTable tr:first-child td:first-child").remove();
        $(".rte-custom-table .mobileTable tr:first-child td").attr('colspan', '2');
    }

    init = function() {
        _RTEOnLoad();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RTETable.init());
