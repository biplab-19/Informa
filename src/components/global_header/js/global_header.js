/*
 * global-header.js
 * pdp-navigation.js
 * Because I dont want to create two on('scroll')
 * Update : Bad idea Man, move pdp nav to new file
 * Update 2: If this comment is still here, that means the code is not optimized.
 * Dont try to optimize unless you have absolutely no story to do
 * Already wasted 2 hrs
 *
 * @project:    Informa
 * @date:       2016-May-8
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalHeader = (function(window, $, namespace) {
    'use strict';
    var //_mainNavigation = $('#mainNavigation'),
        _mainNavigation = $('.mainNavigation'),
        _mobileNavigation = $('.mobileNavigation'),
        _mobileHeaderNavigation = $('#mobile-header-navigation'),
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _fixed = 'navbar-fixed-top',
        _isHeaderFixed = false,

        // for sticky nav of pdp-navigation
        _pdpNavigation = $('#pdp-navigation'),
        _pdpNavigationHeight = 0,
        _pdpNavigationPos = 0,
        _pdpWrapper = $('.product-detail-page'),
        _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
        _pdpMenuActive = true,
        // for scrolling purpose
        _pdpLink = $('#pdp-navigation ul > li > a'),
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],



        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        _servicesNavigationPos = 0,
        _servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
        _servicesFixed = false,
        _servicesMenuPos = [],
        _servicesMenuWidth = [],
        _servicesMenuleft = [],

        _initServicesMenuBarFollow,
        _activateServicesFixedHeader,
        _arrayServicesFlag = true,
        _servicesFirst = true,
        _initialServicesHdrPos = 0,
        _expandedServicesNav = false,


        _arrayFlag = true,
        _navlinks = $('.nav-links'),
        _subnavclose = $('.subnav-close'),
        _navtoggle = $('.navbar-toggle'),
        _navclose = $('.nav-close'),
        _navback = $('.nav-back'),
        _stickAnimation = $('.hide-stick'),
        //functions
        init,
        _whenScrolling,
        _activateMainFixedHeader,
        _activateMobileFixedHeader,
        //for sticky nav
        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _bindNavigationEvents,
        _pdpNavigationScrollTo;


    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen

    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
            _pdpNavigationPos = _pdpNavigation.offset().top;
        // To show the menu follower with right width and position, todo: remove harcode
        _pdpMenuFollower.css('width', $(_pdpLink[0]).width())
            .css('left', $(_pdpLink[0]).offset().left)
            .show();
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();
        _servicesNavigationPos = _servicesNavigation.offset().top;

        // To show the menu follower with right width and position, todo: remove harcode
        _servicesMenuFollower.css('width', $(_servicesLink[0]).width())
            .css('left', $(_servicesLink[0]).offset().left)
            .show();
    }

    if (_mainNavigation.length > 0) {
        _navHeight = _mainNavigation.height();
        _headerPos = _mainNavigation.offset().top;
    }

    if (_mobileNavigation.length > 0) {
        _navHeightMobile = _mobileNavigation.height();
        _headerPosMobile = _mobileNavigation.offset().top;
    }

    // both pdp nav and main nav handled here

    _whenScrolling = function() {
        $(window).on('scroll', function() {

            if (!_pdpFixed && _mainNavigation.length > 0 && INFORMA.global.device.isDesktop)
                _activateMainFixedHeader();
            if (!_pdpFixed && _mobileNavigation.length > 0 && !INFORMA.global.device.isDesktop)
                _activateMobileFixedHeader();
            if (_pdpNavigation.length > 0 && _pdpMenuActive)
                _activatePdpFixedHeader();
            if (_servicesNavigation.length > 0 && _servicesMenuActive)
                _activateServicesFixedHeader();

        });
    };

    _activateMainFixedHeader = function() {
        var _windowPos = $(window).scrollTop();

        if (_windowPos > _headerPos) {
            if (!_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.addClass(_fixed);
                $(".hide-stick").fadeOut("5000", "linear");
                $('.nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', _navHeight);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.removeClass(_fixed);
                $(".hide-stick").fadeIn("5000", "linear");
                $('.nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', 0);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();

        if (_windowPosMobile > _headerPosMobile) {
            _mobileNavigation.addClass(_fixed);
            $('body').css('padding-top', _navHeightMobile);
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _mobileNavigation.removeClass(_fixed);
            $('body').css('padding-top', 0);
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }

    };

    _initPdpMenuBarFollow = function() {
        for (var i = 0; i < _pdpLink.length; i++) {
            // id name comes as data attribute. construct the id
            var _sectionName = '#' + $(_pdpLink[i]).data('target');
            //console.log($(_sectionName))
            if ($(_sectionName).length > 0) {
                // all sections will be printed in navbar html, if the section
                // is not there, smack that
                // else push the offset value to array
                //_pdpMenuPos.push($(_sectionName).offset().top);
            } else {
                $(_pdpLink[i]).addClass('JustGonnaStayThereAndWatchMeBurn');
            }
        }
        $('.JustGonnaStayThereAndWatchMeBurn').parent().remove();
        _pdpLink = $('#pdp-navigation ul > li > a');
        //console.log(_pdpMenuPos);
        // todo: not a right place to add,so.. you know what to do
        if (_pdpLink.length == 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;

            // if there are pdp components, the li count will be 0
            // if the li count is zero, then remove the whole nav
        }
    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop();
        if (_windowPos > (_pdpNavigationPos - _navHeight)) {
            _pdpNavigation.addClass(_fixed);
            _pdpNavigation.css('top', _navHeight + 'px');
            _pdpWrapper.css('padding-top', _pdpNavigationHeight);
            _pdpFixed = true;
            if (_arrayFlag) {
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = '#' + $(_pdpLink[i]).data('target');
                    _pdpMenuPos.push($(_sectionName).offset().top);
                    _pdpMenuWidth.push($(_pdpLink[i]).width());
                    _pdpMenuleft.push($(_pdpLink[i]).parent().offset().left);
                }

                // Ilaiyaraja rocks, fix the hard code later
                $('#pdp-navigation ul > li:first-child').addClass('selected');
                if (INFORMA.global.device.isMobile) _pdpNavigation.addClass('cont');
                _arrayFlag = false;
            }

        } else {
            _pdpNavigation.removeClass(_fixed);
            _pdpWrapper.css('padding-top', 0);
            _pdpFixed = false;
        }
        // todo: should be moved to function, atleast for readability
        // line follower robot is something i shud ve built during my college days.
        var i = _pdpMenuPos.length - 1;
        for (; i >= 0; i--) {
            if (_windowPos + 120 >= _pdpMenuPos[i]) {
                _pdpMenuFollower.css('width', _pdpMenuWidth[i]);
                _pdpMenuFollower.css('left', _pdpMenuleft[i]);
                // .menuFollower { transform: translateX(100%)}
                i = -1;
            }
        }
        // todo: easily the worst code I have written, please optimize this
    };

    // when clicking the pdp-navigation
    _pdpNavigationScrollTo = function() {
        _pdpLink.on('click', function(e) {
            e.preventDefault();
            _pdpNavigation.addClass('cont');
            var _target = $(this).data('target');
            // todo, remove hardcoding
            $('#pdp-navigation li').removeClass('selected');
            $('html, body').stop().animate({
                scrollTop: $("#" + _target).offset().top - (_navHeight + _pdpNavigationHeight)
            }, 1000);

            if (INFORMA.global.device.isMobile) {
                // lesson learnt, hack is wrong.
                $(this).parent().addClass('selected');
                setTimeout(function() {
                    // i am sorry future Jack
                    $('#pdp-navigation li:not(".selected")').slideUp();
                    _pdpNavigation.addClass('cont');
                }, 100)

            }
        })
    };


    _initServicesMenuBarFollow = function() {
        _servicesLink = $('#services-navigation ul > li > a');

        if (_servicesLink.length == 0) {
            _servicesNavigation.remove();
            _servicesMenuActive = false;
        }
    };

    _activateServicesFixedHeader = function() {
        var _windowPos = $(window).scrollTop();

        if (_servicesFirst) {
            _initialServicesHdrPos = _servicesNavigation.offset().top;
            _servicesFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
        } else {
            _fixedNavHeight = _navHeightMobile;
        }
        _servicesNavigationHeight = _servicesNavigation.height();

        if (_windowPos > (_initialServicesHdrPos - _fixedNavHeight)) {
            _servicesNavigation.addClass(_fixed);
            _servicesNavigation.css('top', _fixedNavHeight + 'px');
            _servicesWrapper.css('padding-top', _servicesNavigationHeight);
            _servicesFixed = true;

            if (_arrayServicesFlag) {
                _servicesMenuPos = [];
                _servicesMenuWidth = [];
                _servicesMenuleft = [];
                for (var i = 0; i < _servicesLink.length; i++) {
                    var _sectionName = '#' + $(_servicesLink[i]).data('target');

                    _servicesMenuPos.push($(_sectionName).offset().top);
                    _servicesMenuWidth.push($(_servicesLink[i]).width());
                    _servicesMenuleft.push($(_servicesLink[i]).parent().offset().left);
                }
                _arrayServicesFlag = false;
            }
        } else {
            _servicesNavigation.removeClass(_fixed);
            _servicesNavigation.css('top', '0px');
            _servicesWrapper.css('padding-top', 0);
            _servicesFixed = false;
            _arrayServicesFlag = true;
            _initialServicesHdrPos = _servicesNavigation.offset().top;
        }

        var _fixedHeights = _fixedNavHeight + _servicesNavigationHeight + 7;

        var i = _servicesMenuPos.length - 1;
        for (; i >= 0; i--) {
            if (_windowPos + _fixedHeights >= _servicesMenuPos[i]) {

                if (INFORMA.global.device.isDesktop) {
                    _servicesMenuFollower.css('width', _servicesMenuWidth[i]);
                    _servicesMenuFollower.css('left', _servicesMenuleft[i]);
                } else {
                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $($('#services-navigation li')[i]).addClass('selected');
                }
                i = -1;
            }
        }
    };

    _servicesNavigationScrollTo = function() {
        _servicesLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight;

            if (!INFORMA.global.device.isDesktop) {

                if (_expandedServicesNav) {
                    var _target = $(this).data('target');

                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $('#services-navigation li:not(".selected")').slideUp();

                    $(this).parent().addClass('selected');

                    _servicesNavigationHeight = _servicesNavigation.height();
                    _fixedNavHeight = _navHeightMobile;

                    var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

                    _expandedServicesNav = false;
                } else {
                    $('#services-navigation li').addClass('select-options');
                    _expandedServicesNav = true;
                }

            } else {
                var _target = $(this).data('target');
                $('#services-navigation li').removeClass('selected');
                $('#services-navigation li').addClass('select-options');
                _servicesNavigationHeight = _servicesNavigation.height();
                _fixedNavHeight = _navHeight;

                var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }


        })
    };


    _bindNavigationEvents = function() {

        if (INFORMA.global.device.isDesktop) {
            _navlinks.on('click', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                $('.subnav-container').hide();
                _navlinks.removeClass('nav-active');
                $(this).addClass('nav-active');
                $('#' + navId).slideDown();
            });
            _subnavclose.on('click', function(e) {
                e.preventDefault();
                $('.subnav-container').hide();
                _navlinks.removeClass('nav-active');
            });
        } else {
            _navlinks.on('click', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                var navText = $(this).find('a').text();
                $('.subnav-container').hide();
                $('.nav-main').css('left', '-100%');
                //$('#sub-nav').css('right','0%');
                $('#' + navId).css('display', 'block');
                $('.nav-subnav-heading').text(navText);
                $('.nav-back').css('display', 'block');
            });
        }

        //For mobile toggle navigations
        _navtoggle.on('click', function(e) {
            e.preventDefault();
            $('#mobile-header-navigation').css('left', '0');
            $('.nav-main').css('left', '0');
            $('#sub-nav').css('left', '0');
            $('body').css('overflow-y', 'hidden');
            $('.nav-back').css('display', 'none');
            $('.nav-subnav-heading').text('');
        });

        _navclose.on('click', function(e) {
            $(".navbar-collapse").collapse('hide');
            $('#mobile-header-navigation').css('left', '-100%');
            $('.nav-main').css('left', '-100%');
            $('#sub-nav').css('left', '-100%');
            $('body').css('overflow-y', 'scroll');
        });

        _navback.on('click', function(e) {
            $('.nav-main').css('left', '0');
            //$('#sub-nav').css('right','-100%');
            $('.nav-subnav-heading').text('');
            $('.nav-back').css('display', 'none');
            $('body').css('overflow-y', 'hidden');
        });

    };

    init = function() {
        //if(INFORMA.global.device.viewport!='mobile'){
        if (_pdpNavigation.length > 0) {
            _initPdpMenuBarFollow();
            _pdpNavigationScrollTo();
        }

        if (_servicesNavigation.length > 0) {
            _initServicesMenuBarFollow();
            _servicesNavigationScrollTo();
        }

        _whenScrolling();
        //}
        _bindNavigationEvents();
        // hack for mobile viewport
        // most stupid hack ever, use bootstrap collapse
        // bootstrap collapse will disturb the offset().top, be careful
        //@eod, I think u r genius but code is so damned, clean it before review
        if (INFORMA.global.device.isMobile) {
            $('#pdp-navigation ul').on('click', function() {
                //todo stop hardcoding
                $('#pdp-navigation li:not(".selected")').slideDown();
                _pdpNavigation.removeClass('cont');
            });
        }

        if (INFORMA.global.device.isTablet) {
            $('#services-list section').each(function(i, obj) {
                var _id = this.id;
                $("#" + _id + " .image-thumbnail").prependTo("#" + _id + " .content");
            });
        }

        if (!INFORMA.global.device.isDesktop) {
            $('#services-navigation ul > li:first-child').addClass('selected');
            _expandedServicesNav = false;
        }

    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());
