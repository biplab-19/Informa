var INFORMA = window.INFORMA || {};
INFORMA.ContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var Tabs = $('.pos ul.nav li'),
        tabcontent = $('.tab-content .tab-pane'),
        _updateRedirectUrl,
        init;
    _updateRedirectUrl = function() {
        var urlRedirectHidden = $('.contactUsPage-contactUs').find('.redirect-url-hidden');
        if (urlRedirectHidden.length > 0) {
            urlRedirectHidden.val(window.location.href);
        }
    }
    init = function() {
        var hash = document.location.hash,
            prefix = "tab_";
        if (hash) {
            $('.contactUsPage-contactUs .nav-tabs a[href="' + hash.replace(prefix, "") + '"]').tab('show').addClass('active');
            _updateRedirectUrl();
        } else {
            $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
            _updateRedirectUrl();
        }
        $('.contactUsPage-contactUs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            window.location.hash = e.target.hash.replace("#", "#" + prefix);
            _updateRedirectUrl();
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ContactUs.init());
