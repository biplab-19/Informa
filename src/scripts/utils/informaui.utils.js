(function(INFORMA, $) {
    INFORMA.Utils = (function() {
        function _utils() {
            if (!Array.prototype.find) {
                Object.defineProperty(Array.prototype, 'find', {
                  value: function(predicate) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                      throw TypeError('"this" is null or not defined');
                    }
              
                    var o = Object(this);
              
                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;
              
                    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                    if (typeof predicate !== 'function') {
                      throw TypeError('predicate must be a function');
                    }
              
                    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    var thisArg = arguments[1];
              
                    // 5. Let k be 0.
                    var k = 0;
              
                    // 6. Repeat, while k < len
                    while (k < len) {
                      // a. Let Pk be ! ToString(k).
                      // b. Let kValue be ? Get(O, Pk).
                      // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                      // d. If testResult is true, return kValue.
                      var kValue = o[k];
                      if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                      }
                      // e. Increase k by 1.
                      k++;
                    }
              
                    // 7. Return undefined.
                    return undefined;
                  },
                  configurable: true,
                  writable: true
                });
            }
            if (!Array.prototype.findIndex) {
                Object.defineProperty(Array.prototype, 'findIndex', {
                  value: function(predicate) {
                   // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                      throw new TypeError('"this" is null or not defined');
                    }
              
                    var o = Object(this);
              
                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;
              
                    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                    if (typeof predicate !== 'function') {
                      throw new TypeError('predicate must be a function');
                    }
              
                    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    var thisArg = arguments[1];
              
                    // 5. Let k be 0.
                    var k = 0;
              
                    // 6. Repeat, while k < len
                    while (k < len) {
                      // a. Let Pk be ! ToString(k).
                      // b. Let kValue be ? Get(O, Pk).
                      // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                      // d. If testResult is true, return k.
                      var kValue = o[k];
                      if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                      }
                      // e. Increase k by 1.
                      k++;
                    }
              
                    // 7. Return -1.
                    return -1;
                  },
                  configurable: true,
                  writable: true
                });
            }
                Array.prototype.contains = function ( needle ) {
                   for (i in this) {
                       if (this[i] == needle) return true;
                   }
                   return false;
                }
                Array.prototype.remove = function(){
                    var args = Array.apply(null, arguments);
                    var indices = [];
                    for(var i = 0; i < args.length; i++){
                        var arg = args[i];
                        var index = this.indexOf(arg);
                        while(index > -1){
                            indices.push(index);
                            index = this.indexOf(arg, index + 1);
                        }
                    }
                    indices.sort();
                    for(var i = 0; i < indices.length; i++){
                        var index = indices[i] - i;
                        this.splice(index, 1);
                    }    
                }
                this.getUniqueArray = function(arrayList) {
                    var uniqueArray = [];
                    $.each(arrayList, function(i, el) {
                        if ($.inArray(el, uniqueArray) === -1) {
                            uniqueArray.push(el);
                        }
                    });
                    return uniqueArray;
                }
                this.RemoveArrayItem = function(Arry) {
                    var what, a = arguments,
                        L = a.length,
                        ax;
                    while (L > 1 && Arry.length) {
                        what = a[--L];
                        while ((ax = Arry.indexOf(what)) !== -1) {
                            Arry.splice(ax, 1);
                        }
                    }
                    return Arry;
                }
                this.ArrayUnique = function (array) {
                    var a = array.concat();
                    for (var i = 0; i < a.length; ++i) {
                        for (var j = i + 1; j < a.length; ++j) {
                            if (a[i] === a[j])
                                a.splice(j--, 1);
                        }
                    }

                    return a;
                }
            this.StrngToQryStrng = function(strng) {
                if ((typeof strng === "object" || typeof strng === "string") && strng) {
                    var Arry = strng.toString().split(","),
                        QryStrng = Arry.join("&");
                    return QryStrng;
                }
            }
            this.serializeObject = function(array) {
                var o = {},
                    a = array;
                $.each(a, function() {
                    if (o[this.name]) {
                        if (!o[this.name].push) {
                            o[this.name] = [o[this.name]];
                        }
                        o[this.name].push(this.value || '');
                    } else {
                        o[this.name] = this.value || '';
                    }
                });
                return o;
            }
            this.getIEVersion = function() {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return { major: matches[1], minor: matches[2] };
                }
                return { major: '-1', minor: '-1' };
            }
            this.getViewport = function() {
                    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                    var size;
                    if ($('html').hasClass('lt-ie9')) {
                        size = 'large';
                    } else {
                        size = (w <= INFORMA.Configs.views.xsmall) ? 'xsmall' : size;
                        size = (w > INFORMA.Configs.views.xsmall && w <= INFORMA.Configs.views.small) ? 'small' : size;
                        size = (w > INFORMA.Configs.views.small) ? 'medium' : size;
                        size = (w > INFORMA.Configs.views.medium) ? 'large' : size;
                        size = (w > INFORMA.Configs.views.large) ? 'xlarge' : size;
                    }

                    INFORMA.Configs.viewport = {
                        size: size,
                        width: w,
                        height: h
                    };

                    return INFORMA.Configs.viewport;
                },
                this.isMobileView = function() {
                    return (this.getViewport().size == 'small' || this.getViewport().size == 'xsmall');
                },
                this.isTabletView = function() {
                    return (this.getViewport().size == 'medium');
                };
            this.appendEloquaCookieId = function(url) {
                var eloquaId = $("body").attr('data-eloqua-customerid');
                return eloquaId ? url + '&eloquacookieid=' + eloquaId : url;
            }
            this.init = function() {
                var that = this; //to behave proxy
                this.getViewport();
                //--------------------------------------------------
                // Add IE10 Class
                //--------------------------------------------------
                if (this.getIEVersion().major === '10') {
                    $('html').addClass('ie10');
                }
                //--------------------------------------------------
                //--------------------------------------------------
                // RESIZE EVENT
                // Fires "windowResize" on $(window)
                //Custom resize on particular breakpoints
                //--------------------------------------------------
                return this;
            };
        }
        return new _utils();
    }());
}(window.INFORMA = (typeof INFORMA !== 'undefined' && INFORMA instanceof Object) ? INFORMA : {}, $INFORMA));

var logThis = function(throwLog) {
    if (INFORMA.Configs.debug) {
        for (var i = 0; i < arguments.length; i++) {
            //console.log(arguments[i])
        }
    }
}
