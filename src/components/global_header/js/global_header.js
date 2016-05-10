/*
 * global-header.js
 *
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
      _headerPos,
      _fixed = 'navbar-fixed-top',
      _isHeaderFixed = false,
      // for sticky nav of pdp-navigation
      _pdpNavigation = $('#pdp-navigation'),
      _pdpNavigationHeight = _pdpNavigation.height(),
      _pdpNavigationPos,
      _pdpWrapper = $('.product-detail-page'),
      _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
      // for scrolling purpose
      _pdpLink = $('#pdp-navigation ul > li > a'),
      _pdpFixed = false,
      _pdpMenuObj = [],

      //functions
      init,
      _whenScrolling,
      _activateMainFixedHeader,
      //for sticky nav
      _initPdpMenuBarFollow,
      _activatePdpFixedHeader,
      _pdpNavigationScrollTo;

      if(_pdpNavigation.length > 0) _pdpNavigationPos = _pdpNavigation.offset().top;
      if(_mainNavigation.length > 0) _headerPos = _mainNavigation.offset().top;

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
                        // else push the offset value to top
                        _pdpMenuObj.push($(_sectionName).offset().top - 120 );
                  }
                  else {
                        $(_pdpLink[i]).addClass('JustGonnaStayThereAndWatchMeBurn');
                  }
                  $('.JustGonnaStayThereAndWatchMeBurn').parent().remove();
            }
            console.log(_pdpMenuObj);
            // todo: not a right place to add,so.. you know what to do

      };

      _activatePdpFixedHeader = function(){
             var _windowPos = $(window).scrollTop();
               if(_windowPos > (_pdpNavigationPos - _navHeight)){
                     _pdpNavigation.addClass(_fixed);
                     _pdpNavigation.css('top',_navHeight+'px');
                     _pdpWrapper.css('padding-top',_navHeight);
                     _pdpFixed = true;
               }
               else {
                     _pdpNavigation.removeClass(_fixed);
                     _pdpWrapper.css('padding-top',0);
                     _pdpFixed = false;
               }
               // todo: should be moved to function, atleast for readability
               var i= _pdpMenuObj.length - 1;
               for(; i>=0;i--){
                     if( _windowPos >= _pdpMenuObj[i] ){
                           _pdpMenuFollower.css('transform','translateX('+(100*i)+'%)')
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
                  $('html, body').animate({
                        scrollTop: $("#"+_target).offset().top - 120
                  }, 1000);
            })
      };

      init = function() {
            if(INFORMA.global.device.viewport!='mobile'){
                  if(_pdpNavigation.length > 0){
                        //_initPdpMenuBarFollow();
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
