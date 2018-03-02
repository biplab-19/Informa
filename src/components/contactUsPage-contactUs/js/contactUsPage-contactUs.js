var INFORMA = window.INFORMA || {};
INFORMA.ContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var _updateRedirectUrl,
        _showSelectedTab,
        init;

    _showSelectedTab = function() {
        var sucessTabId = $('.contactUsPage-contactUs').find(".submit-status[data-status='success']").parents('.tab-pane').attr('id');
        $('.contactUsPage-contactUs .nav-tabs a[href!="#' + sucessTabId + '"]').removeClass('active')
        $('.contactUsPage-contactUs .nav-tabs a[href="#' + sucessTabId + '"]').tab('show').addClass('active');
        //_updateRedirectUrl();
    }
    _updateRedirectUrl = function() {
        var urlRedirectHidden = $('.contactUsPage-contactUs').find('.redirect-url-field');
        if (urlRedirectHidden.length > 0) {
            urlRedirectHidden.val(window.location.href);
        }
    }
    init = function() {
        _showSelectedTab();
        var hash = document.location.hash,
            prefix = "tab_";
        if (hash) {
            $('.contactUsPage-contactUs .nav-tabs a[href="' + hash.replace(prefix, "") + '"]').tab('show').addClass('active');
            _updateRedirectUrl();
        } else {
            $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
            _showSelectedTab();
            _updateRedirectUrl();
        }
        $('.contactUsPage-contactUs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            // To track Google Analytics on Open
            INFORMA.Analytics.trackFormEvents($(this), 'Open');
            window.location.hash = e.target.hash.replace("#", "#" + prefix);
            _updateRedirectUrl();
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ContactUs.init());
