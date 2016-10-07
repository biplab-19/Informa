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
        _cookieBanner =  $('#cookieBanner'),
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _cookieHeight =  $('#cookieBanner').outerHeight(),
        _fixed = 'navbar-fixed-top',
        _isHeaderFixed = false,
        _heroBannerHeading = $('#banner h1').text(),
        _marketingClose = $('.marketing-banner .close a'),

        // for sticky nav of pdp-navigation
        _pdpNavigation = $('#pdp-navigation'),
        _pdpNavigationScrollTo,
        _pdpSectionActions,
        _pdpNavigationHeight = 0,
        _pdpNavigationPos = 0,
        _pdpSectionsHeight = 0,
        _pdpWrapper = $('.product-detail-page'),
        _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
        _pdpSectionsButton = $('#pdp-navigation .nav-pdp-nondesktop'),
        _pdpMenuActive = true,

        _pdpLink = $('#pdp-navigation ul > li > a'),
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span'),
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],

        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _arrayFlag = true,
        _pdpFirst = true,
        _pdpStickyMobileFlag = false,
        _pdpStickyIconDesktopFlag = false,
        _pdpStickyHeadingDesktopFlag = false,
        _initialPdpHdrPos = 0,
        _expandedPdpNav = false,



        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        _servicesNavigationPos = 0,
        //_servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
        _servicesLinkSpan = $('#services-navigation ul > li > a > span'),
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
        _stickAnimation = $('.informaNav .hide-stick'),


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
        _PdpNavReArrange;



    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen
     
    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
        _pdpNavigationPos = _pdpNavigation.offset().top;

        $('#pdp-sections ul li').each(function(){
           var idname = '#' + $(this).find('a').data("target");
           if($(idname).length == 0) {
              $(this).remove();
           }
        });
        var _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                        .show();
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();
        _servicesNavigationPos = _servicesNavigation.offset().top;

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
                _mainNavigation.addClass(_fixed);
                _cookieBanner.addClass(_fixed);
                _mainNavigation.css('top', _cookieHeight);
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', _navHeight);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
                _mainNavigation.removeClass(_fixed);
                _cookieBanner.removeClass(_fixed);
                _mainNavigation.css('top', 0);
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
                $('body').css('padding-top', 0);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPosMobile > _headerPosMobile + _cookieHeight) {
            _mobileNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mobileNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeightMobile);
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _mobileNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mobileNavigation.css('top', 0);
            $('body').css('padding-top', 0);
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }
    };

    _pdpSectionActions = function(){
        _pdpSectionsButton.on('click', function(e) {
            e.preventDefault();
            var _pdpLinksCont = $('#pdp-navigation ul > li > a > span').length;
            if($("#pdp-sections:visible").length){
                $('#pdp-sections').slideUp();
              if(_pdpLinksCont>6){
                $('nav#pdp-navigation').removeClass('deviceactive');
                if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                $('body').removeClass('global-no-scroll');
              }
              }
            }else{
                $('#pdp-sections').slideDown();
                if(_pdpLinksCont>6){
                $('nav#pdp-navigation').addClass('deviceactive');
                if($('#pdp-navigation').hasClass('navbar-fixed-top')){
                $('body').addClass('global-no-scroll');
              }
              }
            }
        });
    }

    _initPdpMenuBarFollow = function() {
        _pdpLink = $('#pdp-navigation ul > li > a');

        if (_pdpLink.length == 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;
        }

    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop(),
            PdpNavTop = null;

        if (_pdpFirst) {
            _initialPdpHdrPos = _pdpNavigation.offset().top;
            _pdpFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
            _pdpNavigationHeight = $('#pdp-navigation').height();
        } else {
            _fixedNavHeight = _navHeightMobile;
            _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();
        }


        if (INFORMA.global.device.isDesktop){

            if(_tryStick.length > 0){

                _tryStickPosition = _tryStick.offset().top;
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
                _headingStickPosition = _headingStick.offset().top;
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                if (_windowPos > ((_headingStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyHeadingDesktopFlag) {
                      //debugger;
                        $('#pdp-sections-heading').text(_heroBannerHeading);
                        _pdpStickyHeadingDesktopFlag = true;
                        $('#pdp-sections-heading').addClass('move-left');
                        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                                        .show();

                    }
                }
                else{
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                    .css('left', $(_pdpLinkSpan[0]).offset().left)
                                    .show();
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

            if (!INFORMA.global.device.isDesktop && !_pdpStickyMobileFlag) {
              var leftOfPdpMover = _pdpMenuFollower.css('left');
                _tryStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _subscribeStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _pdpStickyMobileFlag = true;
                $('#pdp-sections-heading').text(_heroBannerHeading);
                $('#pdp-sections-heading').addClass('move-left');
                $('.nav-pdp-nondesktop-sticky').addClass('move-left');
                _pdpMenuFollower.css('left', leftOfPdpMover + $('#pdp-sections-heading').outerWidth());
            }

            if (_arrayFlag) {
                _pdpMenuPos = [];
                _pdpMenuWidth = [];
                _pdpMenuleft = [];
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = '#' + $(_pdpLink[i]).data('target');
                    if($(_sectionName).length > 0){
                        _pdpMenuPos.push($(_sectionName).offset().top);
                    }else{
                        _pdpMenuPos.push(0);
                    }
                    if($(_pdpLinkSpan[i]).length > 0) {
                    _pdpMenuWidth.push($(_pdpLinkSpan[i]).width());
                    _pdpMenuleft.push($(_pdpLinkSpan[i]).offset().left);
                    }
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

                if (!INFORMA.global.device.isDesktop){
                    _pdpStickyMobileFlag = false;
                    $('.nav-pdp-nondesktop-sticky').empty();
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    $('.nav-pdp-nondesktop').removeClass('move-left');
                }
            }

        }

        var _fixedHeights = _fixedNavHeight + _pdpNavigationHeight + 5;
        var i = _pdpMenuPos.length - 1;
        for (; i >= 0; i--) {
            if (_windowPos + _fixedHeights >= _pdpMenuPos[i]) {

                if (INFORMA.global.device.isDesktop) {
                    _pdpMenuFollower.css('width', _pdpMenuWidth[i]);
                    _pdpMenuFollower.css('left', _pdpMenuleft[i]);
                }
                i = -1;
            }
        }

    }

    _pdpNavigationScrollTo = function() {
        _pdpLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight;

            if (!INFORMA.global.device.isDesktop) {

                    var _target = $(this).data('target');

                    $('#pdp-sections').slideUp();
                    _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();

                    if(!_pdpFixed)
                        _pdpSectionsHeight = $('#pdp-sections').height();
                    else
                        _pdpSectionsHeight = 0;

                    _fixedNavHeight = _navHeightMobile;
                    var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _pdpSectionsHeight);

                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

            }else{
                var _target = $(this).data('target');
                $('#pdp-navigation li').removeClass('selected');
                $('#pdp-navigation li').addClass('select-options');
                _pdpNavigationHeight = _pdpNavigation.height();
                _fixedNavHeight = _navHeight;

                var _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
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
            _servicesFixed = true;

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

            $('.nav-links a').on('focus', function(e) {
                $(this).parent().trigger('mouseover');
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
       if($(idname).length == 0) {
          $(this).remove();
       }
      });
    }
    _selectDocClickEvents=function(){
      $(document).on('touchstart',function(event) {
        if(event.target.class != 'selectMenu' && !$('.selectMenu').find(event.target).length){
           $(".selectMenu .chosen-container").removeClass("container-active chosen-with-drop");
        }
       });
    }
    _PdpNavReArrange = function () {
      var _ArrayOfPdpElements = [],
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
              if(_ArrayOfPdpElements[i].Target == _Id) {
                  Html += '<li><a href="#" data-target="' +_ArrayOfPdpElements[i].Target+ '"><span>' +_ArrayOfPdpElements[i].Name+ '</span></a></li>';
              }
          }
      })
      $('#pdp-sections').find('.navbar-nav').html(Html);
    }
    init = function() {
        //if(INFORMA.global.device.viewport!='mobile'){
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
            _expandedPdpNav = false;

        }

    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());
