var INFORMA = window.INFORMA || {};
INFORMA.AnalystTileVisualDesign = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
    equalHeight;

    
    equalHeight = function() {
        var EachView = jQuery('.newco-analyst-views.griid-view');
        EachView.each(function() {
            var Items = jQuery(this).find('.griid-view .analyst-view-container .profile-discription'),
                ItemsHeader = jQuery(this).find('.griid-view .analyst-view-container .profile-discription'),
                ItemsFooter = jQuery(this).find('.griid-view .analyst-view-container .analyst-footer-content'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _maxHeightFooter = 0,
                _padding = 50;
            ItemsHeader.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
            ItemsFooter.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightFooter) {
                    _maxHeightFooter = Height;
                }
            })
            ItemsFooter.css('height', _maxHeightFooter);
        })
    }
    init = function() {
        equalHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystTileVisualDesign.init());
