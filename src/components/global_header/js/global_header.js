/*
* global-header.js
* pdp-navigation.js
* Because I dont want to create two on('scroll')
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
    var _mainNavigation = $('#mainNavigation'),
      _navHeight = _mainNavigation.height(),
      _headerPos = 0,
      _fixed = 'navbar-fixed-top',
      _isHeaderFixed = false,
      // for sticky nav of pdp-navigation
      _pdpNavigation = $('#pdp-navigation'),
      _pdpNavigationHeight = 0,
      _pdpNavigationPos = 0,
      _pdpWrapper = $('.product-detail-page'),
      _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
      // for scrolling purpose
      _pdpLink = $('#pdp-navigation ul > li > a'),
      _pdpFixed = false,
      _pdpMenuPos = [],
      _pdpMenuWidth = [],
      _pdpMenuleft = [],

      _arrayFlag = true,

      //functions
      init,
      _whenScrolling,
      _activateMainFixedHeader,
      //for sticky nav
      _initPdpMenuBarFollow,
      _activatePdpFixedHeader,
      _pdpNavigationScrollTo;


      // if header or pdp is present then only we calc the values.
      // so that even if the elements are not present, the calc will happen

      if(_pdpNavigation.length > 0) {
            _pdpNavigationHeight = _pdpNavigation.height(),
            _pdpNavigationPos = _pdpNavigation.offset().top;
      }
      if(_mainNavigation.length > 0) {
            _navHeight = _mainNavigation.height();
            _headerPos = _mainNavigation.offset().top;
      }

      // both pdp nav and main nav handled here

      _whenScrolling = function(){
         $(window).on('scroll',function(){
               // little savings here, the first function will not be executed when pdp nav is sticky
             if(!_pdpFixed && _mainNavigation.length >0) _activateMainFixedHeader();
             if(_pdpNavigation.length > 0) _activatePdpFixedHeader();
         });
      };

      _activateMainFixedHeader = function(){
          var _windowPos = $(window).scrollTop();
            if(_windowPos > _headerPos){
                  _mainNavigation.addClass(_fixed);
                  $('body').css('padding-top',_navHeight);
                  console.log('main');
            }
            else {
                  _mainNavigation.removeClass(_fixed);
                  $('body').css('padding-top',0);
            }
      };

      _initPdpMenuBarFollow = function(){
            for(var i=0;i<_pdpLink.length;i++){
                  // id name comes as data attribute. construct the id
                  var _sectionName = '#'+$(_pdpLink[i]).data('target');
                  console.log($(_sectionName))
                  if($(_sectionName).length > 0){
                        // all sections will be printed in navbar html, if the section
                        // is not there, smack that
                        // else push the offset value to array
                        //_pdpMenuPos.push($(_sectionName).offset().top);
                  }
                  else {
                        $(_pdpLink[i]).addClass('JustGonnaStayThereAndWatchMeBurn');
                  }
            }
            $('.JustGonnaStayThereAndWatchMeBurn').parent().remove();
            _pdpLink = $('#pdp-navigation ul > li > a');
            //console.log(_pdpMenuPos);
            // todo: not a right place to add,so.. you know what to do

      };

      _activatePdpFixedHeader = function(){
             var _windowPos = $(window).scrollTop();
               if(_windowPos > (_pdpNavigationPos - _navHeight)){
                     _pdpNavigation.addClass(_fixed);
                     _pdpNavigation.css('top',_navHeight+'px');
                    _pdpWrapper.css('padding-top',_navHeight);
                     _pdpFixed = true;
                     if(_arrayFlag){
                           for(var i=0;i<_pdpLink.length;i++){
                                 var _sectionName = '#'+$(_pdpLink[i]).data('target');
                                 _pdpMenuPos.push($(_sectionName).offset().top);
                                 _pdpMenuWidth.push($(_pdpLink[i]).parent().width());
                                 _pdpMenuleft.push($(_pdpLink[i]).parent().offset().left);
                           }
                           _pdpMenuFollower.show();
                           _arrayFlag = false;
                     }

               }
               else {
                     _pdpNavigation.removeClass(_fixed);
                     _pdpWrapper.css('padding-top',0);
                     _pdpFixed = false;
               }
               // todo: should be moved to function, atleast for readability
               // line follower robot is something i shud ve built during my college days.
               var i= _pdpMenuPos.length - 1;
               for(; i>=0;i--){
                     if( _windowPos + 120 >= _pdpMenuPos[i]  ){
                           _pdpMenuFollower.css('width',_pdpMenuWidth[i]);
                           _pdpMenuFollower.css('left',_pdpMenuleft[i]);
                              // .menuFollower { transform: translateX(100%)}
                           i=-1;
                     }
               }
      };
      // when clicking the pdp-navigation
      _pdpNavigationScrollTo = function(){
            _pdpLink.on('click',function(e){
                  e.preventDefault();
                  var _target = $(this).data('target');
                  $('html, body').stop().animate({
                        scrollTop: $("#"+_target).offset().top - (_navHeight + _pdpNavigationHeight)
                  }, 1000);
            })
      };

      init = function() {
            if(INFORMA.global.device.viewport!='mobile'){
                  if(_pdpNavigation.length > 0){
                        _initPdpMenuBarFollow();
                        _pdpNavigationScrollTo();
                  }
                  _whenScrolling();
            }
      };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());
