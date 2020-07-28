var animationType,
    animationDirection;

setTimeout(function () {
  wow = new WOW(
    {
      animateClass: 'animated',
      offset: 100,
      mobile: true
    }
  );
  wow.init();
}, 700);


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
  el.className += animationType + animationDirection;
      
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
onload = function (e) {
  var elem = document.querySelectorAll('[data-swanimate-type]');
  var i = 0;
  elem.forEach(function () {
    var data = getDataAttributes(elem[i]);
    i++;
  });
};