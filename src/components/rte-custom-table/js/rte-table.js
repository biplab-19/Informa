var INFORMA = window.INFORMA || {};
INFORMA.RTETable = (function(window, $, namespace) {
    'use strict';
    //variables
    var titles = [],
        tablevalues = [],
        count, i,
        rteTable = $('table.table'),
        rteTableLength = rteTable.find("tr:first-child").children('td').length,
        responsiveContainer = $(".responsiveTable"),
        init, _RTEOnLoad;

    _RTEOnLoad = function() {
        for (count = 2; count <= rteTableLength; count++) {
            $(".table tr td:nth-child(" + count + ")").each(function() {
                tablevalues.push("<tr><td>" + $(this).html() + "</td></tr>");
            });
            responsiveContainer.append('<table class="mobileTable">' + tablevalues.join(' ') + '</table>');
            tablevalues.length = 0;
        }
        $(".table tr td:nth-child(1)").each(function() {
            titles.push("<td>" + $(this).html() + "</td>");
        });
        $(".mobileTable").each(function() {
            for (i = 0; i <= titles.length; i++) {
                $(this).find('tr').eq(i).prepend(titles[i]);
            }
        });
        $(".mobileTable tr:first-child td:first-child").remove();
        $(".mobileTable tr:first-child td").attr('colspan', '2');
    }

    init = function() {
        _RTEOnLoad();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RTETable.init());
