(function(INFORMA, $) {
    INFORMA.Utils = (function() {
        function _utils() {

                DoFlip = function(obj, className) {
                    var Container = obj.parents('.tile');
                    if (className === "flip") {
                        Container.addClass('flip');
                    } else {
                        Container.removeClass('flip');
                    }
                },
                this.flipTile = function(Object) {
                    var TileFront = Object.find('.front .triangle'),
                        TileBack  = Object.find('.back .triangle');

                        TileFront.on("click",function() {
                            DoFlip($(this), 'flip');
                        });

                        TileBack.on("click",function() {
                            DoFlip($(this), 'unflip');
                        });
                },
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
            console.log(arguments[i])
        }
    }
}
