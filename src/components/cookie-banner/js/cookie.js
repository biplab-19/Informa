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
    var dropCookie = true,                 // false disables the Cookie, allowing you to style the banner
        cookieDuration = 365,              // Number of days before the cookie expires, banner reappears
        cookieName = 'cookiepolicy',       // Name of our cookie
        cookieValue = 'on',               // Value of cookie
        // methods
        init,
        ShowBanner,CreateCookie,CheckCookie,EraseCookie,RemoveMe;


        ShowBanner = function(name,value,days) {
                $("body").find("#cookieBanner").show();
                $("#cookieBanner a.close").on("click",function(e){
                    alert("sfsf");
                    createCookie(cookieName,cookieValue, cookieDuration); 
                });
        },
        CreateCookie = function(name,value,days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime()+(days*24*60*60*1000)); 
                    var expires = "; expires="+date.toGMTString(); 
                }
                else var expires = "";
                if(dropCookie) { 
                    document.cookie = name+"="+value+expires+"; path=/"; 
                }
        },
        CheckCookie = function(name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for(var i=0;i < ca.length;i++) {
                    var c = ca[i];
                    while (c.charAt(0)==' ') c = c.substring(1,c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
                }
                return null;
        },
        EraseCookie = function(xhtml, ele) {
                CreateCookie(name,"",-1);
        },
        RemoveMe = function(data) {
            $("body").find("#cookieBanner").hide();
        },
        init = function() {
            window.onload = function(){ 
                if(CheckCookie(cookieName) !== cookieValue){
                    ShowBanner(); 
                }
            }
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.CookiePolicy.init());
