/*
 * newco-header.js
 *
 *
 * @project:    Shop Window
 * @date:       2020-January-29
 * @author:     Jawaad Shahid
 * @licensor:   INFORMA
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.NewcoHeader = (function (window, $, namespace) {
    'use strict';
    var $body = $('body'),
        
        $cookieBanner = $('#cookieBanner'),
        $mainHeader = $('#informa-main-header'),
        $closecookie = $mainHeader.find('.icon-close'),
        $newcoHeader,
        $hamburger,
        $searchicon,
        $navsearch,
        $newcoNav,
        $menuItems,
        $menuItemWWithSubs,
        $banner,
        $pdpNav,
        headerHeight,
        DESIRED_HEADER_HEIGHT,
        bannerHeight,
        pdpNavThreshold,
        pdpNavTop,
        pdpNavHeight,
        headerHeightChangeTimerEvent,
        $newcotextbox=$(".newco-search-header .textbox"),
        $newcoclose=$(".newco-search-header .newco-gobtn-2 i.fa-times"),
        $newcosearch=$(".newco-search-header .newco-gobtn-2 i.fa-search"),
        // methods
        OffsetParentHeight, repositionPdpNav, init;

    OffsetParentHeight = function($menuItemsContainer, action) {
        var $menuItem = $menuItemsContainer.closest('.menu-item'),
            $parent = $menuItem.closest('.menu-items')

        if ($parent.length === 0) return;

        if (action === 'add')
            $parent.css('height', $parent.height() + parseInt($menuItemsContainer.attr('data-height')));

        if (action === 'subtract')
            $parent.css('height', $parent.height() - parseInt($menuItemsContainer.attr('data-height')));
    }

    repositionPdpNav = function(scroll) {
        // on threshold, set top css, which should be the calculated header height
        if (scroll >= pdpNavThreshold) {
            if (!$pdpNav.hasClass('navbar-fixed-top')) {
                $pdpNav.css('top', pdpNavTop).addClass('navbar-fixed-top');
                // console.log('headerHeight', headerHeight);
            }
        } else {
            // reset back to "in body" position
            $pdpNav.removeClass('navbar-fixed-top').css('top', '')// .next().css('padding-top', '');
        }
    }

    init = function() {
        // don't run if we're not in newco
        if (!$body.hasClass('tmt-newco')) return;

        // set variable values
        $newcoHeader = $mainHeader.find('.newco-header');
        $hamburger = $newcoHeader.find('.hamburger');
        $searchicon = $newcoHeader.find('button#mobile-search');
        $navsearch = $newcoHeader.find('.newco-search-header');
        $newcoNav = $newcoHeader.find('.newco-nav');
        $menuItems = $newcoNav.find('.menu-items');
        $menuItemWWithSubs = $newcoNav.find('.menu-item.hassub');
        $banner = $('#banner');
        $pdpNav = $('#pdp-navigation');
        headerHeight = $mainHeader.height();
        DESIRED_HEADER_HEIGHT = 80;
        bannerHeight = $banner.height();
        pdpNavThreshold = headerHeight + bannerHeight;
        pdpNavTop = 0;
        pdpNavHeight = 0;
        headerHeightChangeTimerEvent = 0;
        // set listner for burger button
        $hamburger.click(function() {
            $newcoHeader.toggleClass('nav-closed');
            $newcotextbox.removeClass("active");
            $newcoclose.removeClass("active");
            $newcosearch.addClass("active");
            if (!$newcoHeader.hasClass('nav-closed'))
                $newcoHeader.addClass('search-closed');
        });
        // set listner for burger button
        $navsearch.click(function() {
            $newcoHeader.toggleClass('search-closed');
            if (!$newcoHeader.hasClass('search-closed'))
                $newcoHeader.addClass('nav-closed');
        });
        // set listner for submenus
        $menuItemWWithSubs.click(function(e) {
            var $menuItem = $(this),
                $childMenuItemsContainer = $menuItem.children('.menu-items');

            // dont collapse if a tag with href is clicked
            if (e.target.nodeName === 'A' && !$(e.target).hasClass('disable')) return;
            
            $childMenuItemsContainer.toggleClass('nav-closed');
            $menuItem.toggleClass('subnav-open');
            
            if($childMenuItemsContainer.hasClass('nav-closed')) {
                // close children
                $childMenuItemsContainer.find('.menu-items').addClass('nav-closed').css('height', '');
                $childMenuItemsContainer.find('.menu-item').removeClass('subnav-open');
                // set height 
                $childMenuItemsContainer.css('height', '');
                // if has parent menu, then remove it's height too
                OffsetParentHeight($childMenuItemsContainer, 'subtract');
            } else {
                // set height 
                $childMenuItemsContainer.css('height', parseInt($childMenuItemsContainer.attr('data-height')));
                // if has parent menu, then append it's height too
                OffsetParentHeight($childMenuItemsContainer, 'add');
            }

            e.stopPropagation();
        });

        // prevents the menu from closing on click
        $newcoNav.find('a').each(function() {
            var $this = $(this),
                hrefAttr = $this.attr('href'),
                hasURL = hrefAttr && hrefAttr.length > 0;
            
            // if no URL, disable click of Anchor to prevent action
            if (!hasURL) {
                $this.addClass('disable');
            }
                
        });

        //mobile searchbox show on click
        $searchicon.click(function(e){
            var hasclassactive=$newcotextbox.hasClass("active");
            var cookeieslength= $cookieBanner.length,
                cookiedisplay=$cookieBanner.is(":visible")
            if(!(cookeieslength>0 && cookiedisplay)){
                $newcotextbox.removeAttr("style");
            }
            $hamburger.trigger("click");
            if(hasclassactive) {
                $newcotextbox.removeClass("active");
                $newcoclose.removeClass("active");
                $newcosearch.addClass("active");
            }
            else {
                $newcotextbox.addClass("active");
                $newcoclose.addClass("active");
                $newcosearch.removeClass("active");
            }
            
            
        });

        $closecookie.click(function(e){
            $newcotextbox.removeAttr("style");
        });
        
        // emit custom event on header height change
        headerHeightChangeTimerEvent = setInterval(function() {
            if ($mainHeader.height() != headerHeight) {
                $mainHeader.trigger('heightchanged');
            }
        }, 100);

        // on height change event, store header height for use in scroll event
        $mainHeader.on('heightchanged', function() {
            var cbHeight = $cookieBanner.is(':visible') ? $cookieBanner.outerHeight() : 0;
            headerHeight = $mainHeader.height();
            // set banner height for pdp-nav scroll threshold
            bannerHeight = $banner.outerHeight();
            // set threshold so pdp-nav sticky threshold occurs in the correct place
            // replaced headerHeight with 80 because of animation, if scrolled height changes this will have to
            pdpNavThreshold = (bannerHeight - $mainHeader.next().offset().top - cbHeight) + DESIRED_HEADER_HEIGHT;
            pdpNavTop = DESIRED_HEADER_HEIGHT + cbHeight;
            repositionPdpNav($(window).scrollTop());
            // add cookiebanner height to the next element to ensure that its not covered by menu
            $mainHeader.next().css('margin-top', cbHeight > 0 ? cbHeight : '');
        });
        $mainHeader.trigger('heightchanged');
    }
    
    $(window).on('load', function() {
        if($menuItems != undefined){
            // set calculated height for animations
            $menuItems.each(function(itemInd, el) {
                var $el = $(el),
                    $descendentMenus = $el.find('.menu-item.hassub .menu-items');

                $descendentMenus.css('height', 0);
                $el.attr('data-height', el.clientHeight).addClass('ready');
                $descendentMenus.css('height', '');
            });

            // store pdpnav height, if it exists, for later use
            if ($pdpNav.length > 0)
                pdpNavHeight = $pdpNav.outerHeight(true);
            
            // add ready class to make menu visible after preload
            $newcoNav.addClass('ready');
        }
    });

    $(window).scroll(function() {    
        if (!$body.hasClass('tmt-newco')) return;
        var scroll = $(window).scrollTop();
    
        if (scroll > 50) {
            $mainHeader.addClass('scrolled');
        } else {
            $mainHeader.removeClass('scrolled');
        }

        // reposition pdpnav if it exists
        if ($pdpNav.length > 0)
            repositionPdpNav(scroll);
    });
    

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.NewcoHeader.init());
