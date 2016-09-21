/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-July-8
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.CookiePolicy = (function(window, $, namespace) {
    'use strict';
    //variables
    var dropCookie = true, // false disables the Cookie, allowing you to style the banner
        cookieDuration = 0, // Number of days before the cookie expires, banner reappears
        cookieName = 'cookiepolicyaccepted', // Name of our cookie
        cookieValue = 'yes', // Value of cookie
        // methods
        init,
        ShowBanner, CreateCookie, CheckCookie, EraseCookie, RemoveMe;


    ShowBanner = function(name, value, days) {
            $("body").find("#cookieBanner").show();
            $("#cookieBanner a.close").on("click", function(e) {
                RemoveMe();
                //CreateCookie(cookieName,cookieValue, cookieDuration); 
                INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
                    method: "Post",
                    data: JSON.stringify({"key":cookieName,"value":cookieValue ,"expires":cookieDuration}),
                    success_callback: function(data) {
                    }
                });
                    ///
            });
        },
        // CreateCookie = function(name,value,days) {
        //         if (days) {
        //             var date = new Date();
        //             date.setTime(date.getTime()+(days*24*60*60*1000)); 
        //             var expires = "; expires="+date.toGMTString(); 
        //         }
        //         else {
        //             var expires = "";
        //         }
        //         if(dropCookie) { 
        //             document.cookie = name+"="+value+expires+"; path=/"; 
        //         }
        // },
        CheckCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        EraseCookie = function(xhtml, ele) {
            CreateCookie(name, "", -1);
        },
        RemoveMe = function(data) {
            $("body").find("#cookieBanner").hide();
            if($('#cookieBanner:hidden')){
                $('.mobileNavigation').css('top',0);
                $('.mainNavigation').css('top',0);
            }
        },
        init = function() {
            var getCookieExpiryDate = ($("input.cookieDuration").val()) ? $("input.cookieDuration").val() : 365;
            cookieDuration = parseInt(getCookieExpiryDate);
            window.onload = function() {
                if (CheckCookie(cookieName) !== cookieValue) {
                    ShowBanner();
                }
            };
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.CookiePolicy.init());
