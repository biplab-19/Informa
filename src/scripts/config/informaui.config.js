var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    var env = (window.location.href.indexOf("127") > -1) ? "local" : "dev",
        endPoints;
    INFORMA.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };

    endPoints = {
        "local":{
            "GetArticles": "/data/article_list.json",
            "GetSubSectorList" : "/data/product-finder.json",
            "ProductSearch":"/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json"
        },
        "dev":{
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList" : "/data/product-finder.json",
            "ProductSearch": "/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json"
        }
    };

    INFORMA.Configs = (function() {
        function _config() {
                this.urls = {
                    "webservices": endPoints[env]
                },
                this.activeClass = 'informaui-active',
                this.views = {
                    'small': 768,
                    'medium': 1024,
                    'large': 1400
                },
                this.debug = true,
                this.isMobile = {
                    Android: (function() {
                        return navigator.userAgent.match(/Android/i);
                    })(),
                    BlackBerry: (function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    })(),
                    iOS: (function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    })(),
                    Opera: (function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    })(),
                    Windows: (function() {
                        return navigator.userAgent.match(/IEMobile/i);
                    })()
                },
                this.init = function() {
                    return this;
                };
        }
        return new _config();

    }());
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

var logThis = function(throwLog) {
    if (INFORMA.Configs.debug) {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
    }
}
