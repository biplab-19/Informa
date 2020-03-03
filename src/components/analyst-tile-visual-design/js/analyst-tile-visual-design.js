var INFORMA = window.INFORMA || {};
INFORMA.NewcoAnalystTiles = (function(window, $, namespace) {
    'use strict';
    //variables
    var $analystSection = $('.newco-analyst-views'),
        $tileContainer = $analystSection.find('.analyst-view-container'),
        //methods
        init, equalHeight;

    equalHeight = function() {
        var maxheight = 0,
            $profileDescr;
        $tileContainer.each(function() {
            $profileDescr = $(this).find('.profile-discription');
            if ($profileDescr.height() > maxheight)
                maxheight = $profileDescr.height();
        });
        $tileContainer.find('.profile-discription').css('height', maxheight);
    }

    init = function() {
        equalHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.NewcoAnalystTiles.init());
