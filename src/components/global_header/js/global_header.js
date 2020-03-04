/*
 * global-header.js - 1
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
        _mainNavLink = $('.informaNav .mainNavigation .header-links'),
        _cookieBanner =  $('#cookieBanner'),
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _cookieHeight =  $('#cookieBanner').outerHeight(),
        _fixed = 'navbar-fixed-top',
        _heroBannerHeading = $('#banner h1').text(),
        _marketingClose = $('.marketing-banner .close a'),
        _isNewco = $('body').hasClass('tmt-newco'),
        // _newcoHeaderHeight = $('.newco-header').height(),
        _newcoHeaderHeight = 80,

        // for sticky nav of pdp-navigation
        _pdpNavigation = $('#pdp-navigation'),
        _pdpNavigationScrollTo,
        _pdpSectionActions,
        _pdpNavigationHeight = 0,
        _pdpSectionsHeight = 0,
        _isPdpPage = _pdpNavigation.data("productpage"),
        _pdpWrapper = $('.product-detail-page'),
        _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
        _pdpSectionsButton = $('#pdp-navigation .nav-pdp-nondesktop'),
        _pdpMenuActive = true,

        _pdpLink = $('#pdp-navigation ul > li > a'),
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span'),
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuPosBottom = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],
        _pdpMenuDefaultIndex = 0,
        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _arrayFlag = true,
        _pdpFirst = true,
        _pdpStickyMobileFlag = false,
        _pdpStickyIconDesktopFlag = false,
        _pdpStickyHeadingDesktopFlag = false,
        _initialPdpHdrPos = 0,



        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        //_servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
        _servicesLinkSpan = $('#services-navigation ul > li > a > span'),
        _servicesMenuPos = [],
        _servicesMenuWidth = [],
        _servicesMenuleft = [],

        _initServicesMenuBarFollow,
        _activateServicesFixedHeader,
        _arrayServicesFlag = true,
        _servicesFirst = true,
        _initialServicesHdrPos = 0,
        _expandedServicesNav = false,


        _tryStick = $('#banner .try-stick'),
        _subscribeStick = $('#banner .subscribe-stick'),
        _headingStick = $('#banner h1'),
        _tryStickPosition = 0,
        _headingStickPosition = 0,


        _navlinks = $('.informaNav .nav-links'),
        _subnavclose = $('#sub-nav .subnav-close'),
        _navtoggle = $('.informaNav .navbar-toggle'),
        _navclose = $('#mobile-header-navigation .nav-close'),
        _navback = $('#mobile-header-navigation .nav-back'),


        //functions
        init,
        _whenScrolling,
        _activateMainFixedHeader,
        _activateMobileFixedHeader,
        _pdpsectionSubnavigationInit,
        _selectDocClickEvents,
        _bindClickEvents,
        _bindNavigationEvents,
        _cookieBannerExist,
        _PdpNavReArrange,
        _addClassFixed,
        _removeClassFixed,
        _pdpListItemScroll;



    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen

    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
            $('#pdp-sections ul li').each(function(){
                var idname = $(this).find('a').data("target");
                if($('#' + idname).length == 0) {
                    $(this).remove();
                }else{
                    var targetindex = $(this).find('a').data("target-index");
                    if(targetindex != 0){
                        var anchorTargetElementArray = $("[id='" + idname + "']");
                        if(anchorTargetElementArray.length - 1 < targetindex){
                            $(this).remove();
                        }
                    }
                }
            });
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
        var firstElementOnPage;
        $('#pdp-navigation ul > li > a').each(function (index) {
            var anchorTarget = $(this).data('target');
            var anchorTargetIndex = $(this).data('target-index');
            if (firstElementOnPage) {
                var currentElementTop = Math.round($($("[id='" + anchorTarget + "']")[anchorTargetIndex]).offset().top);
                var firstElementTop = Math.round(firstElementOnPage.offset().top);
                if (currentElementTop < firstElementTop) {
                    firstElementOnPage = $($("[id='" + anchorTarget + "']")[anchorTargetIndex]);
                    _pdpMenuDefaultIndex = index;
                }
            } else {
                firstElementOnPage = $($("[id='" + anchorTarget + "']")[anchorTargetIndex]);
            }
        });
        if ($(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset()) {
            _pdpMenuFollower.css('width', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).width())
                .css('left', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset().left)
                .show();
        }
    }

    // resize _pdpMenuFollower width once fonts are loaded 
    if (document.fonts) {
        document.fonts.ready.then(function () {
            if (_pdpNavigation.length > 0) {
                if ($(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset()) {
                    _pdpMenuFollower.css('width', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).width())
                        .css('left', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset().left)
                        .show();
                }
                _pdpLink.removeClass('active');
                $(_pdpLink[_pdpMenuDefaultIndex]).addClass('active');
            }
        });
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();

        // To show the menu follower with right width and position, todo: remove harcode
        _servicesMenuFollower.css('width', $(_servicesLinkSpan[0]).width())
            .css('left', $(_servicesLinkSpan[0]).offset().left)
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

    //Check whether cookie banner exists or not
    _cookieBannerExist = function(){
        if($('#cookieBanner:visible').length){
            _cookieHeight =  $('#cookieBanner').outerHeight();
        }else{
            _cookieHeight =  0;
        }
    }

    //Add fixed class for Desktop Mobile and Tablet
    _addClassFixed = function(){
        if (!INFORMA.global.device.isDesktop){
            _mobileNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mobileNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeightMobile);
        }
        else{
            _mainNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mainNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeight);
        }
    }

    //Remove fixed class for Desktop Mobile and Tablet
    _removeClassFixed = function(){
        if (!INFORMA.global.device.isDesktop){
            _mobileNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mobileNavigation.css('top', 0);
            $('body').css('padding-top', 0);
        }
        else{
            _mainNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mainNavigation.css('top', 0);
            $('body').css('padding-top', 0);
        }
    }

    //scroll pdp list item
    _pdpListItemScroll = function(){
        var pdpListHeight = $('#pdp-sections ul li').height()*$('#pdp-sections ul li').length;
        var pdpSectionheight = $(window).height() - _navHeightMobile - $('#pdp-navigation .nav-pdp-nondesktop').outerHeight() - _cookieHeight;
        var pdpHeadingHeight = $('#pdp-sections-heading').height();
        if((pdpListHeight + pdpHeadingHeight) > pdpSectionheight){
            $('#pdp-sections').height(pdpSectionheight);
            $('#pdp-sections').css('overflow' , 'auto');
        }
        else{
            $('#pdp-sections').css({
                'height':'auto',
                'overflow':'hidden'
            })
        }
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
        _cookieBannerExist();
        if (_windowPos > _headerPos + _cookieHeight) {
            if (!_mainNavigation.hasClass(_fixed)) {
                _addClassFixed();
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
                _removeClassFixed();
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPosMobile > _headerPosMobile + _cookieHeight) {
            _addClassFixed();
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _removeClassFixed();
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }
    };

    _pdpSectionActions = function(){
        _pdpSectionsButton.on('click', function(e) {
            e.preventDefault();
            //var _pdpLinksCont = $('#pdp-navigation ul > li > a > span').length;
            if($("#pdp-sections:visible").length){
                $('#pdp-sections').slideUp();
                // if(_pdpLinksCont>6){
                //   //$('nav#pdp-navigation').removeClass('deviceactive');
                //   if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                //   $('body').removeClass('global-no-scroll');
                // }
                // }
            }else{
                $('#pdp-sections').slideDown(function() {
                    if(!INFORMA.global.device.isDesktop){
                        if(_pdpNavigation.hasClass(_fixed)){
                            _pdpListItemScroll();
                            $('#pdp-sections').animate({
                                scrollTop: 0
                            }, 500);
                        }
                    }
                });


                //   if(_pdpLinksCont>6){
                //   //$('nav#pdp-navigation').addClass('deviceactive');
                //   if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                //   $('body').addClass('global-no-scroll');
                // }
                // }
            }
        });
    }

    _initPdpMenuBarFollow = function() {
        _pdpLink = $('#pdp-navigation ul > li > a');

        if (_pdpLink.length === 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;
        }

    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop();

        if (_pdpFirst) {
            _initialPdpHdrPos = _isNewco ? _newcoHeaderHeight : _pdpNavigation.offset().top;
            _pdpFirst = false;
        }

        var _fixedNavHeight;
        if (_isNewco) {
            _fixedNavHeight = _newcoHeaderHeight;
        } else {
            if (INFORMA.global.device.isDesktop) {
                _fixedNavHeight = _navHeight;
                _pdpNavigationHeight = $('#pdp-navigation').outerHeight();
            } else {
                _fixedNavHeight = _navHeightMobile;
                _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();
            }
        }


        if (INFORMA.global.device.isDesktop || _isNewco){

            if(_tryStick.length > 0){

                _tryStickPosition = _isNewco ? _fixedNavHeight : _tryStick.offset().top;
                if (_windowPos > ((_tryStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyIconDesktopFlag) {
                        _tryStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _subscribeStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _pdpStickyIconDesktopFlag = true;
                        $('.nav-pdp-desktop-sticky').addClass('move-left');
                    }
                }
                else{
                    _pdpStickyIconDesktopFlag = false;
                    $('.nav-pdp-desktop-sticky').empty();
                }
            }

            if(_headingStick.length > 0){
                _headingStickPosition =  _isNewco ? _fixedNavHeight : _headingStick.offset().top;
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                if (_windowPos > ((_headingStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyHeadingDesktopFlag) {
                        //debugger;
                        if(_isPdpPage){
                            $('#pdp-sections-heading').text(_heroBannerHeading);
                            $('#pdp-sections-heading').addClass('move-left');
                        }
                        _pdpStickyHeadingDesktopFlag = true;
                        _pdpMenuFollower.css('width', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).width())
                            .css('left', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset().left)
                            .show();
                        
                        _pdpLink.removeClass('active');
                        $(_pdpLink[_pdpMenuDefaultIndex]).addClass('active');
                    }
                }
                else{
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    _pdpMenuFollower.css('width', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).width())
                        .css('left', $(_pdpLinkSpan[_pdpMenuDefaultIndex]).offset().left)
                        .show();
                    _pdpLink.removeClass('active');
                    $(_pdpLink[_pdpMenuDefaultIndex]).addClass('active');
                    _pdpStickyHeadingDesktopFlag = false;
                }
            }

        }


        //For fixing the Product Detail Header: Desktop + Tablet + Mobile
        _cookieBannerExist();
        if (_windowPos > (_initialPdpHdrPos - _fixedNavHeight) - _cookieHeight) {
            _pdpNavigation.addClass(_fixed);
            _pdpNavigation.css('top', _fixedNavHeight + _cookieHeight + 'px');
            _pdpWrapper.css('padding-top', _pdpNavigationHeight);
            _pdpFixed = true;
            $('.nav-pdp-nondesktop').addClass('move-left');
            _addClassFixed();
            if (!INFORMA.global.device.isDesktop && !_pdpStickyMobileFlag) {
                var leftOfPdpMover = _pdpMenuFollower.css('left');
                _tryStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _subscribeStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _pdpStickyMobileFlag = true;
                if(_isPdpPage){
                    $('#pdp-sections-heading').text(_heroBannerHeading);
                    $('#pdp-sections-heading').addClass('move-left');
                }
                $('.nav-pdp-nondesktop-sticky').addClass('move-left');
                _pdpMenuFollower.css('left', leftOfPdpMover + $('#pdp-sections-heading').outerWidth());
                _pdpListItemScroll();
            }

            if (_arrayFlag) {
                _pdpMenuPos = [];
                _pdpMenuPosBottom = [];
                _pdpMenuWidth = [];
                _pdpMenuleft = [];
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = $(_pdpLink[i]).data('target');
                    var _sectionIndex = $(_pdpLink[i]).data('target-index');
                    var currSection = $($("[id='" + _sectionName + "']")[_sectionIndex]);
                    var currSectionTopPos = currSection.offset().top;
                    var currSectionHeight = currSection.height();

                    if(_isNewco) {
                        currSectionTopPos -= (_fixedNavHeight + 10)
                    }

                    if ($('#' + _sectionName).length > 0) {
                        _pdpMenuPos.push(currSectionTopPos);
                        
                        if(_isNewco) {
                            _pdpMenuPosBottom.push(currSectionTopPos + currSectionHeight + _fixedNavHeight);
                        } else {
                            _pdpMenuPosBottom.push(currSectionTopPos + currSectionHeight);
                        }
                    } else {
                        _pdpMenuPos.push(0);
                    }
                    if ($(_pdpLinkSpan[i]).length > 0) {
                        _pdpMenuWidth.push($(_pdpLinkSpan[i]).width());
                        _pdpMenuleft.push($(_pdpLinkSpan[i]).offset().left);}
                }
                _arrayFlag = false;
            }

        } else {
            if(_pdpFixed){
                _pdpNavigation.removeClass(_fixed);
                _pdpNavigation.css('top', '0px');
                _pdpWrapper.css('padding-top', 0);
                _pdpFixed = false;
                _arrayFlag = true;
                _initialPdpHdrPos = _pdpNavigation.offset().top;
                _removeClassFixed();
                if (!INFORMA.global.device.isDesktop){
                    _pdpStickyMobileFlag = false;
                    $('.nav-pdp-nondesktop-sticky').empty();
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    $('.nav-pdp-nondesktop').removeClass('move-left');
                    $('#pdp-sections').css({
                        'height':'auto',
                        'overflow':'hidden'
                    })
                }
            }

        }

        if (INFORMA.global.device.isDesktop || _isNewco) {
            var j = _pdpMenuPos.length - 1;
            var windowPostion = _windowPos + _fixedNavHeight + _pdpNavigationHeight + _cookieHeight;
            var finalIndex = -1;
            for (; j >= 0; j--) {
                if(windowPostion >=  _pdpMenuPos[j] && windowPostion <= _pdpMenuPosBottom[j]){
                    finalIndex = j;
                }
            }
            if(finalIndex!= -1) {
                _pdpMenuFollower.css('width', _pdpMenuWidth[finalIndex]);
                _pdpMenuFollower.css('left', _pdpMenuleft[finalIndex]);
                _pdpLink.removeClass('active');
                $(_pdpLink[finalIndex]).addClass('active');
            }
        }
    }

    // Ben-2018-TODO-clean
    // Will need refactoring some variables moved and some optimization
    _pdpNavigationScrollTo = function () {
        _pdpLink.on('click', function (e) {
            e.preventDefault();
            var _fixedNavHeight, _target, _target_index, _scrollTopPixels;

            if (!INFORMA.global.device.isDesktop) {

                _target = $(this).data('target');
                _target_index = $(this).data('target-index');

                $('#pdp-sections').slideUp();
                _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();


                if (!_pdpFixed)
                    _pdpSectionsHeight = $('#pdp-sections').height();
                else
                    _pdpSectionsHeight = 0;

                _fixedNavHeight = _isNewco ? _newcoHeaderHeight : _navHeightMobile;
                var anchorElementArray = $("[id='" + _target + "']");

                console.log(anchorElementArray[_target_index]);

                if (anchorElementArray.length >= [_target_index]) {
                    //Fix ben-2018-onscroll
                    _scrollTopPixels = $(anchorElementArray[_target_index]).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _pdpSectionsHeight);
                    //End
                } else {
                    _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _pdpSectionsHeight);
                }

            } else {
                $('#pdp-navigation li').removeClass('selected');
                $('#pdp-navigation li').addClass('select-options');
                _pdpNavigationHeight = _pdpNavigation.outerHeight();
                _target = $(this).data('target');
                _target_index = $(this).data('target-index');
                _fixedNavHeight = _isNewco ? _newcoHeaderHeight : _navHeightMobile;
                var anchorElementArrayDesk = $("[id='" + _target + "']");

                if (anchorElementArrayDesk.length >= [_target_index]) {
                    //Fix ben-2018-onscroll
                    _scrollTopPixels = $(anchorElementArrayDesk[_target_index]).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _cookieHeight);
                    //End
                } else {
                    _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _cookieHeight);
                }
            }
                
            if(_isNewco && $(window).scrollTop() <= 50) {
                _scrollTopPixels -= (_fixedNavHeight);
            }
            $('html, body').stop().animate({
                scrollTop: _scrollTopPixels
            }, 1000);
        });
    };
    // END-Ben-2018-TODO-clean



    _initServicesMenuBarFollow = function() {
        _servicesLink = $('#services-navigation ul > li > a');

        if (_servicesLink.length === 0) {
            _servicesNavigation.remove();
            _servicesMenuActive = false;
        }
    };

    _activateServicesFixedHeader = function() {
        var _windowPos = $(window).scrollTop(),
            _servicesWrapper = $('#services-list').parent();
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
            /* removed unused variable _servicesFixed*/

            if (_arrayServicesFlag) {
                _servicesMenuPos = [];
                _servicesMenuWidth = [];
                _servicesMenuleft = [];
                for (var i = 0; i < _servicesLink.length; i++) {
                    var _sectionName = '#' + $(_servicesLink[i]).data('target');

                    _servicesMenuPos.push($(_sectionName).offset().top);
                    _servicesMenuWidth.push($(_servicesLinkSpan[i]).width());
                    _servicesMenuleft.push($(_servicesLinkSpan[i]).offset().left);
                }
                _arrayServicesFlag = false;
            }
        } else {
            _servicesNavigation.removeClass(_fixed);
            _servicesNavigation.css('top', '0px');
            _servicesWrapper.css('padding-top', 0);
            /* removed unused variable _servicesFixed*/
            _arrayServicesFlag = true;
            _initialServicesHdrPos = _servicesNavigation.offset().top;
        }

        var _fixedHeights = _fixedNavHeight + _servicesNavigationHeight + 7;

        var j = _servicesMenuPos.length - 1;
        for (; j >= 0; j--) {
            if (_windowPos + _fixedHeights >= _servicesMenuPos[j]) {

                if (INFORMA.global.device.isDesktop) {
                    _servicesMenuFollower.css('width', _servicesMenuWidth[j]);
                    _servicesMenuFollower.css('left', _servicesMenuleft[j]);
                } else {
                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $($('#services-navigation li')[j]).addClass('selected');
                }
                j = -1;
            }
        }
    };

    _servicesNavigationScrollTo = function() {
        _servicesLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight, _target, _scrollTopPixels;

            if (!INFORMA.global.device.isDesktop) {

                if (_expandedServicesNav) {
                    _target = $(this).data('target');

                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $('#services-navigation li:not(".selected")').slideUp();

                    $(this).parent().addClass('selected');

                    _servicesNavigationHeight = _servicesNavigation.height();
                    _fixedNavHeight = _navHeightMobile;

                    _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                    $('html, body').stop().animate({
                        scrollTop: $(this).parents('section').offset().top
                    }, 1000);

                    _expandedServicesNav = false;
                } else {
                    $('#services-navigation li').addClass('select-options');
                    _expandedServicesNav = true;
                }

            } else {
                _target = $(this).data('target');
                $('#services-navigation li').removeClass('selected');
                $('#services-navigation li').addClass('select-options');
                _servicesNavigationHeight = _servicesNavigation.height();
                _fixedNavHeight = _navHeight;

                _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }


        })
    };

    _bindClickEvents = function(){
        _marketingClose.on('click', function(e) {
            e.preventDefault();
            $(this).closest('section').hide();
        });
    };

    _bindNavigationEvents = function() {

        if (INFORMA.global.device.isDesktop) {

            _navlinks.on('mouseover', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav'),
                    SubNav =  $('#sub-nav'),
                    SubContainer = $("#sub-nav").find(".subnav-container");
                SubNav.css({ 'left': 0});
                SubContainer.hide();
                _navlinks.removeClass('nav-active');
                $(this).addClass('nav-active');
                SubNav.show();
                $('#' + navId).show();
                SubContainer.removeClass("active");
                SubNav.find('#'+navId).addClass("active");
            });

            $('.nav-links a').on('keydown', function(e) {
                if (e.keyCode === 13 || e.which===13) {
                    $(this).parent().trigger('mouseover');
                    var Id = $(this).data('subnav');
                    $($('#' + Id).find('a')[0]).focus();
                    return false;
                }

            });

            $('.subnav-close a').on('focusout', function() {
                var ParentId = $(this).parents('.subnav-container').attr('id');
                $('.nav-links a[data-subnav="' +ParentId+ '"]').parent('li').next('li').find('a').focus();
                $(this).find('a').unbind('click');
            });
            $('#sub-nav').hover(
                function() {
                    $(this).show();
                    $('#sub-nav').css({ 'left': 0});
                    var ActiveId = $('#sub-nav').find(".active").attr("id"),
                        ParentEle = _navlinks.find('a[data-subnav='+ActiveId+']').parent();
                    _navlinks.removeClass('nav-active');
                    ParentEle.addClass('nav-active');
                },
                function() {
                    $(this).hide();
                    _navlinks.removeClass('nav-active');
                }
            );
            _navlinks.on('mouseout', function(e) {
                e.preventDefault();
                $('#sub-nav').hide();
                $('#sub-nav').css({'left': 0});
                _navlinks.removeClass('nav-active');
            });
            _subnavclose.on('click', function(e) {
                e.preventDefault();
                $('#sub-nav .subnav-container').hide();
                $('#sub-nav').css({ 'left': 0});
                _navlinks.removeClass('nav-active');
                $(this).unbind('focusout');
                $(this).find('a').unbind('focusout');
            });
        } else {
            _navlinks.on('click', function(e) {
                //e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                var navText = $(this).find('a').text();
                if($('#' + navId).length > 0) {
                    $('#sub-nav .subnav-container').hide();
                    //$('.informaNav .nav-main').css('left', '-100%');
                    $('#sub-nav').css('left', '0');
                    $('#' + navId).css('display', 'block');
                    $('#mobile-header-navigation .nav-subnav-heading').text(navText);
                    $('#mobile-header-navigation .nav-back').css('display', 'block');
                }
            });
        }

        //For mobile toggle navigations
        _navtoggle.on('click', function(e) {
            e.preventDefault();
            $('#mobile-header-navigation').css('left', '0');
            $('.informaNav .nav-main').css('left', '0');
            //$('#sub-nav').css('left', '0');
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
            //$('html, body').addClass('global-no-scroll');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
        });

        _navclose.on('click', function(e) {
            $(".navbar-collapse").collapse('hide');
            $('#mobile-header-navigation').css('left', '-100%');
            $('.informaNav .nav-main').css('left', '-100%');
            $('#sub-nav').css('left', '-100%');
            //$('html, body').removeClass('global-no-scroll');
            $('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'scroll');
            //$('body').css('height', 'auto');
        });

        _navback.on('click', function(e) {
            $('.informaNav .nav-main').css('left', '0');
            $('#sub-nav').css('left', '-100%');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            //$('html, body').addClass('global-no-scroll');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
            //$('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
        });

    };
    _pdpsectionSubnavigationInit = function(){
        $('#pdp-sections ul li').each(function(){
            var idname = '#' + $(this).find('a').data("target");
            if($(idname).length === 0) {
                $(this).remove();
            }
        });
    }
    _selectDocClickEvents=function(){
        $(document).on('touchstart',function(event) {
            if(event.target.class !== 'selectMenu' && !$('.selectMenu').find(event.target).length){
                $(".selectMenu .chosen-container").removeClass("container-active chosen-with-drop");
            }
        });
    }
    _PdpNavReArrange = function () {
        /*var _ArrayOfPdpElements = [],
            Html = "";
        _pdpLink.each(function () {
            var Target = $(this).data('target'),
                _Element = {};
            if($('#'+Target).length > 0) {
                _Element["Name"] = $(this).text();
                _Element["Target"] = Target;
                _ArrayOfPdpElements.push(_Element);
                $('#'+Target).addClass('pdp-item-id');
            }
        });
        $('.pdp-item-id').each(function() {
            var _Id = $(this).attr("id");
            for(var i = 0; i < _ArrayOfPdpElements.length; i++) {
                if(_ArrayOfPdpElements[i].Target === _Id) {
                    Html += '<li><a href="#" data-target="' +_ArrayOfPdpElements[i].Target+ '"><span>' +_ArrayOfPdpElements[i].Name+ '</span></a></li>';
                }
            }
        })
        $('#pdp-sections').find('.navbar-nav').html(Html);*/
    }
    init = function() {
        if(_mainNavLink.length > 0){
            if(INFORMA.global.device.isMobile || INFORMA.global.device.isTablet){
                if(_mainNavLink.length === 1){
                    $(_mainNavLink).addClass('one')
                }
                else if(_mainNavLink.length === 3){
                    $(_mainNavLink).addClass('three')
                }
                else if(_mainNavLink.length === 4){
                    $(_mainNavLink).addClass('four')
                }
                else{
                    $(_mainNavLink).addClass('two')
                }
            }
        }

        if (_pdpNavigation.length > 0) {
            _pdpsectionSubnavigationInit();
            if (!INFORMA.global.siteCore.isExperience) {
                _PdpNavReArrange();
            }
            _initPdpMenuBarFollow();
            _pdpNavigationScrollTo();
            _pdpSectionActions();
        }

        if (_servicesNavigation.length > 0) {
            _initServicesMenuBarFollow();
            _servicesNavigationScrollTo();
        }

        $('[data-toggle="popover"]').popover();

        _whenScrolling();
        //}
        _bindNavigationEvents();
        _bindClickEvents();
        _selectDocClickEvents();
        /*if (INFORMA.global.device.isMobile) {
            $('#pdp-navigation ul').on('click', function() {
                //todo stop hardcoding
                $('#pdp-navigation li:not(".selected")').slideDown();
                _pdpNavigation.removeClass('cont');
            });
        }*/

        if (INFORMA.global.device.isTablet) {
            $('#services-list section').each(function(i, obj) {
                var _id = this.id;
                $("#" + _id + " .image-thumbnail").prependTo("#" + _id + " .content");
            });
        }

        if (!INFORMA.global.device.isDesktop) {
            $('#services-navigation ul > li:first-child').addClass('selected');
            _expandedServicesNav = false;

            //$('#pdp-navigation ul > li:first-child').addClass('selected');
            /* removed unused _expandedPdpNav variab */
        }

    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());
