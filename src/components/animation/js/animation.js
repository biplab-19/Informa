var INFORMA = window.INFORMA || {};
INFORMA.animation = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        animationType,
        animationDirection,
        wow

    setTimeout(function () {
      wow = new WOW(
        {
          animateClass: 'animated',
          offset: 100,
          mobile: true
        }
      );
      wow.init();
    }, 1500);

    function getDataAttributes(el) {
      var data = {};
      el.className += " wow ";
      for(var i=0; i<el.attributes.length;i++) {
        var attributeValue = el.attributes[i].value,
            attributeName = el.attributes[i].name.substr(15).replace(/-(.)/g);
        switch (el.attributes[i].value) {
        case "fadein":
          animationType = "fadeIn";
          break;
        case "bouncein":
          animationType = "bounceIn";
          break;
        case "zoomin":
          animationType = "zoomIn";
          break;
        case "zoomout":
          animationType = "zoomOut";
          break;
        case "shake":
          animationType = "shake";
          break;
        case "slidein":
          animationType = "slideIn";
          break;
        case "backin":
          animationType = "backIn";
          break;
        case "left":
          animationDirection = "Left";
          break;
        case "right":
          animationDirection = "Right";
          break;
        case "up":
          animationDirection = "Up";
          break;
        case "down":
          animationDirection = "Down";
          break;   
        }
        animationEffect(attributeValue,attributeName);
      }
      if(animationType == "shake") {
        el.className += animationType;
      } else {
        el.className += animationType + animationDirection;
      }
          
      [].forEach.call(el.attributes, function (attr) {
        if (/^data-swanimate-/.test(attr.name)) {
          var animationAttributes = attr.name.substr(15).replace(/-(.)/g, function ($0, $1) {
            return $1.toUpperCase();
          });
          data[animationAttributes] = attr.value;
          
          if (animationAttributes == "repeat") {
            if (attr.value == -1) {
              attr.value = "infinite";
            }
          }
          
          switch (animationAttributes) {
            case "duration":
              el.setAttribute("data-wow-duration", attr.value + "ms");
              break;
            case "repeat":
              el.setAttribute("data-wow-iteration", attr.value);
              break;
            case "delay":
              el.setAttribute("data-wow-delay", attr.value + "ms");
              break;
            }
        }
      });
      return data;
    }

    function animationEffect(attributeValue, attributeName) {
      switch (true) {
        case attributeName == "type":
          switch (attributeValue) {
            case "fadein":
              animationType = "fadeIn" ;
              break;
            case "bouncein":
              animationType = "bounceIn" ;
              break;
            case "zoomin":
              animationType = "zoomIn" ;
              break;
            case "zoomout":
              animationType = "zoomOut" ;
              break;
            case "shake":
              animationType = "shake" ;
              break;
            case "slidein":
              animationType = "slideIn" ;
              break;
            case "backin":
              animationType = "backIn" ;
              break;
            default:
              animationType = "fadeIn";
          }
        break;
        case attributeName =="diretion":
          switch (attributeValue) {
            case "left":
              animationDirection = "Left" ;
              break;
            case "bouncein":
              animationDirection = "Right" ;
              break;
            case "zoomin":
              animationDirection = "Up" ;
              break;
            case "zoomout":
              animationDirection = "Down" ;
              break;
            default:
              animationDirection = "Left" ;
          }
        break;
      }
    
    }

    function applyAnimationAttributes() {
      $(".initialize-swanimate").each(function(){
        var json = $.parseJSON($(this).val());
        $(json).each(function(i, obj){
          $("."+obj.itemidentifier).attr("data-swanimate-type",obj["data-swanimate-type"])
          $("."+obj.itemidentifier).attr("data-swanimate-direction",obj["data-swanimate-direction"])
          if(obj.data == true){
            var delayInitial = Number(obj["data-swanimate-delay"]);
            var delayValue = delayInitial;
            $("."+obj.itemidentifier).each(function() {
              $(this).attr("data-swanimate-delay",delayValue)
              delayValue += delayInitial
            })
          } else {
            $("."+obj.itemidentifier).attr("data-swanimate-delay",obj["data-swanimate-delay"])
          }
        })
      })
    }
    
    init = function(e) { 

      setTimeout(function () {

        applyAnimationAttributes();

        var elem = document.querySelectorAll('[data-swanimate-type]');
        var i = 0;
        elem.forEach(function () {
          var data = getDataAttributes(elem[i]);
          i++;
        });
        
      }, 500);
      
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.animation.init());





