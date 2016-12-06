
var config = {
    gaConfig: [
        {
            "gaKey": "UA-81001424-2",
            "host": "int.pharmahub.com",
            "name": "Pharma Intelligence",
            "theme": "pharma",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "int.tmt.com",
            "name": "TMT Intelligence",
            "theme": "tmt",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "int.financialhub.com",
            "name": "Financial Intelligence",
            "theme": "financial",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.pharmahub.com",
            "name": "Pharma Intelligence",
            "theme": "pharma",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.agrihub.com",
            "name": "Agri Intelligence",
            "theme": "agri",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.maritimehub.com",
            "name": "Maritime Intelligence",
            "theme": "maritime",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.tmt.com",
            "name": "TMT Intelligence",
            "theme": "tmt",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.financialhub.com",
            "name": "Financial Intelligence",
            "theme": "financial",
            "google": true,
            "adobe": true
        },
         {
             "gaKey": "UA-81001424-1",
             "host": "istage-pharmaintelligence.informa.com",
             "name": "Pharma Intelligence",
             "theme": "pharma",
             "google": true,
             "adobe": true
         },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "theme": "tmt",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "theme": "financial",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-agriintelligence.informa.com",
            "name": "Agri Intelligence",
            "theme": "agri",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "theme": "maritime",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-pharmaintelligence.informa.com",
            "name": "Pharma Intelligence",
            "theme": "pharma",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "theme": "tmt",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "theme": "financial",
            "google": true,
            "adobe": true
        },
         {
             "gaKey": "UA-81001424-1",
             "host": "iprod-agriintelligence.informa.com",
             "name": "Agri Intelligence",
             "theme": "agri",
             "google": true,
             "adobe": true
         },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "theme": "maritime",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "pharmaintelligence.informa.com",
            "name": "Pharma Intelligence",
            "theme": "pharma",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "theme": "tmt",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "theme": "financial",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "agriintelligence.informa.com",
            "name": "Agri Intelligence",
            "theme": "agri",
            "google": true,
            "adobe": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "theme": "maritime",
            "google": true,
            "adobe": true
        }
    ]
}


var item = jQuery.grep(config.gaConfig, function (n, i) {
    return n.host === window.location.host;
});

var domain = item[0];

if (domain) {

    var url = ('https:' == document.location.protocol ? 'https://' : 'http://') + domain.host;

    //google analytics script
    if (domain.google) {
        var ga_key = domain.gaKey;
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', ga_key]);
        _gaq.push(['_trackPageview']);

        var ga = document.createElement('script');
        ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
    }
    else if (domain.adobe) { // adobe analytics script
        var adobeScript = document.createElement('script');
        adobeScript.type = 'text/javascript'; adobeScript.async = true;
        adobeScript.src = url + '/static/js/analytics.js';

        jQuery('body').append(adobeScript);

        s.pageName = document.title;
        s.server = window.location.host;
        s.channel = domain.name;
        var s_code = s.t(); if (s_code) document.write(s_code)
    }

    //theme 
    var theme = document.createElement("link");
    theme.href = url + '/static/css/' + domain.theme + '-theme.css';
    theme.type = "text/css";
    theme.rel = "stylesheet";
    jQuery('head').append(theme);

    jQuery('body').attr('class', ''); jQuery('body').addClass(domain.theme)

    //favicon
    var favIcon = document.createElement("link");
    favIcon.href = url + '/static/images/' + domain.theme + '/favicon.ico';
    favIcon.type = "image/x-icon";
    favIcon.rel = "shortcut icon";
    jQuery('head').append(favIcon);
}


