var INFORMA = window.INFORMA || {};
INFORMA.freearticle = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _setFreearticlePadding;
    _setFreearticlePadding = function() {
        var freearticleSection = $('.product-detail-page section.articlepage-freearticle');
        if (freearticleSection.length > 0) {
            if (INFORMA.global.device.viewportN == 1) {
                freearticleSection.first().css('padding-top', '40px');
                freearticleSection.last().css('padding-bottom', '40px');
            } else if (INFORMA.global.device.viewportN == 2) {
                freearticleSection.first().css('padding-top', '30px');
                freearticleSection.last().css('padding-bottom', '30px');
            } else {
                freearticleSection.first().css('padding-top', '50px');
                freearticleSection.last().css('padding-bottom', '50px');
            }
        }
    }
    init = function() {
        _setFreearticlePadding();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.freearticle.init());
