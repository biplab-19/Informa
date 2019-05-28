// {{compare unicorns ponies operator="<"}}
// 	I knew it, unicorns are just low-quality ponies!
// {{/compare}}

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) {

  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    '==':		function(l,r) { return l === r; },
    '===':	function(l,r) { return l === r; },
    '!=':		function(l,r) { return l !== r; },
    '<':		function(l,r) { return l < r; },
    '>':		function(l,r) { return l > r; },
    '<=':		function(l,r) { return l <= r; },
    '>=':		function(l,r) { return l >= r; },
    'typeof':	function(l,r) { return typeof l === r; }
  }

  if (!operators[operator])
    throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

  var result = operators[operator](lvalue,rvalue);

  if( result ) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }

});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

Handlebars.registerHelper('splitURL', function(string, substring) {
  if(string){
    var u = string.split("?");
    var s = u[0].toString().split("/");
    var i = s.lastIndexOf(substring);
    if(i == -1){  
      return false;
    }else{
      return true;
    }
  }else{
    return false;
  }
});

Handlebars.registerHelper('AnalystData', function(profile) {
  if(profile){
    var u = profile.split("#");
    if(profile.indexOf('#')!== -1 && u[1]){
          return "<a href="+u[1]+">"+u[0]+"</a>";
    }else{
      return profile;
    }
  }
});