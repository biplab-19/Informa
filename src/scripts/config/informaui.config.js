var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    var env = (window.location.href.indexOf("127.0.0.1") > -1) ? "local" : "dev",
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
        "local": {
            "GetArticles": "/data/article_list.json",
            "GetSubSectorList": "/data/product-finder.json",
            "ProductSearch": "/data/product-results.json",
            "GetRefineResults": "/data/product-results.json",
            "GetMoreProducts" :"/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json",
            "AnalystSearchDropDown": "/data/analyst-search-dropdown.json",
            "AnalystSearchAll": "/data/analyst-search-subsector.json",
            "EventsSearch": "data/events-page.json",
            "ResourceList": "data/resource-list.json",
            "ResourceResult" : "data/resource-list.json",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/data/form-data.json",
            "GetRecomendedItems": "/data/recomended-content.json",
            "GetProductAndVerticalNames": "/data/GetWffmHiddenItemsContent.json",
            "GetRecomendedProductItems": "/data/recomendedProducts.json",
            "BrandPortfolioSearch": "/data/brandPortfolio-page.json",
            "PieBarChartPageData": "/data/pie-bar-chart.json",
            "WorldChartPageData": "/data/world-chart.json"
        },
        "dev": {
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList": "/client/search/GetSubSectors",
            "ProductSearch": "/client/search/GetProductsSampleContent",
            "GetRefineResults": "/client/search/GetRefineProductResults",
            "GetMoreProducts" :"/client/search/GetMoreProducts",
            "SearchResult": "/client/search/GetSearchResults",
            "AnalystSearch": "/client/search/GetSpecialists",
            "AnalystSearchDropDown": "/client/search/GetSubSectorList",
            "AnalystSearchAll": "/client/search/SeeAllSpecialists",
            "EventsSearch": "/client/search/GetEventList",
            "ResourceList": "/client/search/GetResourceListing",
            "ResourceResult": "/client/search/GetResourceListing",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/client/ajax/GetModifiedWffmFormItems",
            "GetRecomendedItems": "/client/Account/GetRemainingContent",
            "GetProductAndVerticalNames": "/client/ajax/GetWffmHiddenItemsContent",
            "GetRecomendedProductItems": "/client/Account/GetUpdatedProduct",
            "SetFirstContentDisplayedCookie" :"/client/Ajax/SetFirstContentDisplayedCookie",
            "BrandPortfolioSearch": "/client/search/GetBrandPortfolioList",
            "PieBarChartPageData": "/api/Sitecore/shared/GetChartsDetail",
            "WorldChartPageData": "/api/Sitecore/shared/GetChartsDetail"
        }
    };

    INFORMA.Configs = (function() {
        function _config() {
            this.urls = {
                    "webservices": endPoints[env]
                },
                this.searchResult = {
                    "pageSize": 6
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
            //console.log(arguments[i])
        }
    }
}
