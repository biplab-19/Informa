
var config = {
    gaConfig: [
        {
            "gaKey": "UA-81001424-2",
            "host": "int.pharmahub.com",
            "name": "Pharma Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "int.tmt.com",
            "name": "TMT Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "int.financialhub.com",
            "name": "Financial Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.pharmahub.com",
            "name": "Pharma Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.agrihub.com",
            "name": "Agri Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.maritimehub.com",
            "name": "Maritime Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.tmt.com",
            "name": "TMT Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-2",
            "host": "qa.financialhub.com",
            "name": "Financial Intelligence",
            "enable": true
        },
         {
             "gaKey": "UA-81001424-1",
             "host": "istage-pharmaintelligence.informa.com",
             "name": "Pharma Intelligence",
             "enable": true
         },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "enable": true
        },
        {
             "gaKey": "UA-81001424-1",
             "host": "istage-agriintelligence.informa.com",
             "name": "Agri Intelligence",
             "enable": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "istage-maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-pharmaintelligence.informa.com",
            "name": "Pharma Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "enable": true
        },
         {
             "gaKey": "UA-81001424-1",
             "host": "iprod-agriintelligence.informa.com",
             "name": "Agri Intelligence",
             "enable": true
         },
        {
            "gaKey": "UA-81001424-1",
            "host": "iprod-maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "pharmaintelligence.informa.com",
            "name": "Pharma Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "tmtintelligence.informa.com",
            "name": "TMT Intelligence",
            "enable": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "financialintelligence.informa.com",
            "name": "Financial Intelligence",
            "enable": true
        },
        {
             "gaKey": "UA-81001424-3",
             "host": "agriintelligence.informa.com",
             "name": "Agri Intelligence",
             "enable": true
        },
        {
            "gaKey": "UA-81001424-3",
            "host": "maritimeintelligence.informa.com",
            "name": "Maritime Intelligence",
            "enable": true
        }
    ]
}




var itemFound = jQuery.grep(config.gaConfig, function (n, i) {
    return n.host === window.location.host;
});

if (itemFound.length > 0) {
    var ga_key = itemFound.gaKey;
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', ga_key]);
    _gaq.push(['_trackPageview']);

    var ga = document.createElement('script');
    ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    s.pageName = document.title;
    s.server = window.location.host;
    s.channel = itemFound.name;
    var s_code = s.t(); if (s_code) document.write(s_code)
}

