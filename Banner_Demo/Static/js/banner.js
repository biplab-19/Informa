(function ($) {
    'use strict';
    //==================================================
    // DOCUMENT READY 
    //--------------------------------------------------
    var BannerURL = $("#banner").data("url");
    /* Funciton for updating banner on html page*/
    function updateBanner(html){
        var bannerContainer = $("body").find("#banner");
        if(bannerContainer.length){
            bannerContainer.html(html);
        }
    }
    /* Funciton for updating banner on html page*/

    alert("sdfsf");

    //Cross Domain Ajax Call for consuming Rest Services
    $.ajax({
        type: "Get", // This will be Get request 
        url:BannerURL, // here will Rest Service url
        cache: "false", // To avoid cache on ajax content
        headers: { 'Access-Control-Request-Headers':'X-Custom-Header','Access-Control-Request-Method':"GET"}, // Default header passing request
        crossDomain : true, // Cross domain parameters to define reuqest if CORS.
        success: function(html) {
            updateBanner(html);
        },
        error:function(error){
            console.log("Error Response :", error);
        }
    });

    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}(jQuery));
