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
    var $newcoHeader = $('.newco-header'),
        $hamburger = $newcoHeader.find('.hamburger'),
        $navsearch = $newcoHeader.find('.navsearch'),
        $newcoNav = $newcoHeader.find('.newco-nav'),
        $menuItems = $newcoNav.find('.menu-items'),
        $menuItemWWithSubs = $newcoNav.find('.menu-item.hassub > a'),
        // methods
        OffsetParentHeight, init;

    OffsetParentHeight = function($menuItemsContainer, action) {
        var $menuItem = $menuItemsContainer.closest('.menu-item'),
            $parent = $menuItem.closest('.menu-items')

        if ($parent.length === 0) return;

        if (action === 'add')
            $parent.css('height', $parent.height() + parseInt($menuItemsContainer.attr('data-height')));

        if (action === 'subtract')
            $parent.css('height', $parent.height() - parseInt($menuItemsContainer.attr('data-height')));
    }

    init = function() {
        
        // set listner for burger button
        $hamburger.click(function() {
            $newcoHeader.toggleClass('nav-closed');
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
            var $menuItem = $(this).closest('.menu-item'),
                $childMenuItemsContainer = $menuItem.children('.menu-items');
            
            $childMenuItemsContainer.toggleClass('nav-closed');
            $menuItem.toggleClass('subnav-open');
            
            if($childMenuItemsContainer.hasClass('nav-closed')) {
                // close children
                $childMenuItemsContainer.find('.menu-items').addClass('nav-closed').css('height', '');
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
    }
    
    $(window).on('load', function() {
        // set calculated height for animations
        $menuItems.each(function(itemInd, el) {
            var $el = $(el),
                $descendentMenus = $el.find('.menu-item.hassub .menu-items');

            $descendentMenus.css('height', 0);
            $el.attr('data-height', el.clientHeight).addClass('ready');
            $descendentMenus.css('height', '');
        });
        
        // add ready class to make menu visible after preload
        $newcoNav.addClass('ready');
    });

    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll > 100) {
            $newcoHeader.addClass('scrolled');
        } else {
            $newcoHeader.removeClass('scrolled');
        }
    });
    
    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.NewcoHeader.init());
