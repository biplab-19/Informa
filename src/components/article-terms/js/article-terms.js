var INFORMA = window.INFORMA || {};
INFORMA.freearticle = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _setFreearticlePadding;
    _setFreearticlePadding = function() {
        var freearticleSection = $('#productDetails').find('.articlepage-freearticle'),
            freearticleH2 = freearticleSection.find('h2'),
            freearticleH3 = freearticleSection.find('h3');
        if (freearticleSection.length > 0) {
            if (INFORMA.global.device.viewportN === 1) {
                freearticleSection.first().css('padding-top', '35px');
                freearticleSection.last().css('padding-bottom', '35px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '35px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '25px');
            } else if (INFORMA.global.device.viewportN === 2) {
                freearticleSection.first().css('padding-top', '25px');
                freearticleSection.last().css('padding-bottom', '25px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '25px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '20px');
            } else {
                freearticleSection.first().css('padding-top', '45px');
                freearticleSection.last().css('padding-bottom', '45px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '45px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '30px');
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
