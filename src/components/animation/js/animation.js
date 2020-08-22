var INFORMA = window.INFORMA || {};
INFORMA.animation = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        wow

    function getDataAttributes(el) {
      var data = {};
      var animationType = "";
      var animationDirection = "";
      el.className += " wow ";
      for(var i=0; i<el.attributes.length;i++) {
        var attributeValue = el.attributes[i].value,
            attributeName = el.attributes[i].name.substr(15).replace(/-(.)/g);
        if (attributeName == "direction") {
          animationDirection = attributeValue
        } else if(attributeName == "type") {
          animationType = attributeValue
        }
      }

      if(animationDirection) {
        el.className += animationType + animationDirection;
      } else {
        el.className += animationType;
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

    function applyAnimationAttributes() {
      $(".initialize-swanimate").each(function() {
        var json = $.parseJSON($(this).val());
        $(json).each(function(i, obj) {
          $("."+obj.itemidentifier).attr("data-swanimate-type",obj["data-swanimate-type"]);
          $("."+obj.itemidentifier).attr("data-swanimate-direction",obj["data-swanimate-direction"]);
          if(obj.data == true) {
            var delayInitial = Number(obj["data-swanimate-delay"]);
            var delayValue = delayInitial;
            $("."+obj.itemidentifier).each(function() {
              $(this).attr("data-swanimate-delay",delayValue);
              delayValue += delayInitial;
            });
          } else {
            $("."+obj.itemidentifier).attr("data-swanimate-delay",obj["data-swanimate-delay"]);
          }
        })
      })
    }
    setTimeout(function () {
      $(".campaign-animation").css("visibility", "visible");
      wow = new WOW(
        {
          animateClass: 'animated',
          offset: 100,
          mobile: true
        }
      );
      wow.init();
    }, 700);

    init = function(e) {
      setTimeout(function () {
        applyAnimationAttributes();
        var elem = $('*[data-swanimate-type]');
        var i = 0;
        elem.each(function () {
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





