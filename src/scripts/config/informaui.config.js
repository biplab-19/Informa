var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    var env = (window.location.href.indexOf("agrihub") > -1) ? "dev" : "local",
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
            "AnalystSearch": "/data/analyst-search.json",
            "AnalystSearchDropDown": "/data/analyst-search-dropdown.json",
            "AnalystSearchAll": "/data/analyst-search-subsector.json",
            "EventsSearch": "data/events-page.json"
        },
        "dev":{
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList" : "/client/search/getsubsectors",
            "ProductSearch": "/client/search/getproducts",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/client/search/GetSpecialists",
            "AnalystSearchDropDown": "/client/search/GetSubSectorList",
            "AnalystSearchAll": "/client/search/SeeAllSpecialists",
            "EventsSearch": "/client/search/GetEventList"
            
        }
    };

    INFORMA.Configs = (function() {
        function _config() {
                this.urls = {
                    "webservices": endPoints[env]
                },
                this.searchResult ={
                    "pageSize" : 6
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
