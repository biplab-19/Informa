var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
	'use strict';
    INFORMA.getCookie =function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
     };


     INFORMA.Configs = (function () {
        function _config() {
            this.urls = {
                "webservices" :{
                    "GetArticles" :"/client/search/getarticles",
                    "GetSubSectorList" :"/client/search/GetSubSectors",
                    //"GetSubSectorList" : "/data/product-finder.json",
                    //"ProductSearch":"/client/search/product-result.json",
                    "ProductSearch":"/client/search/GetSubSectors",
                    "SearchResult" :"/data/search-results.json",
                    "AnalystSearch"  :"/data/analyst-search.json"
                }
            },
            this.activeClass = 'informaui-active',
            this.views = {
                'small'  : 768,
                'medium' : 1024,
                'large'  : 1400
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
            this.init = function () {
                return this;
            };
        }
        return new _config();
     }());
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

var logThis = function(throwLog){
    if(INFORMA.Configs.debug){
        for(var i = 0 ; i < arguments.length; i++){
            console.log(arguments[i])
        }
    }
}
