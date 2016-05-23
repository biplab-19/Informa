var INFORMA=window.INFORMA||{};!function(a,b,c){"use strict";INFORMA.getCookie=function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1);if(-1!=e.indexOf(b))return e.substring(b.length,e.length)}return""},INFORMA.Configs=function(){function a(){this.activeClass="informaui-active",this.views={small:768,medium:1024,large:1400},this.debug=!0,this.isMobile={Android:function(){return navigator.userAgent.match(/Android/i)}(),BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)}(),iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)}(),Opera:function(){return navigator.userAgent.match(/Opera Mini/i)}(),Windows:function(){return navigator.userAgent.match(/IEMobile/i)}()},this.init=function(){return this}}return new a}()}(this,$INFORMA=jQuery.noConflict(),"INFORMA");var logThis=function(a){if(INFORMA.Configs.debug)for(var b=0;b<arguments.length;b++);};!function(a,b,c,d){b.DataLoader=function(){function a(){this.GetContentOnlyFromURL=function(a,b){return c.ajax({url:a,dataType:"html",cache:!1})},this.GetServiceData=function(a,e){var f={},g={data:"",cache:!1,method:"POST",contentType:"application/json; charset=utf-8",dataType:"json",headers:{}};return c.extend(f,g,e),d[a]&&null!==d[a]&&d[a].abort(),d[a]=c.ajax({type:f.method,url:a,data:f.data,cache:f.cache,contentType:f.contentType,dataType:f.dataType,headers:f.headers,success:function(c){if(f.contentType.indexOf("xml")>-1)"undefined"!=typeof e&&"function"==typeof e.success_callback&&e.success_callback.call(this,c);else{var g=null;g=null!==c?c:!1,"undefined"!=typeof e&&"function"==typeof e.success_callback&&e.success_callback.call(this,g)}d[a]=null,b.Spinner.Hide()},error:function(a,b,c){"undefined"!=typeof e&&"function"==typeof e.error_callback&&e.error_callback.call(this,a,b,c)}}),d[a]}}var d={};return new a}()}(window,INFORMA,jQuery);var INFORMA=window.INFORMA||{};INFORMA.global=function(a,b,c){"use strict";var d={},e={},f=b("html"),g=function(){var c=b(a).width();c>=1024?(d.isDesktop=!0,d.viewport="desktop",d.viewportN=0):c>=768?(d.isTablet=!0,d.viewport="tablet",d.viewportN=1):(d.isMobile=!0,d.viewport="mobile",d.viewportN=2),f.addClass(d.viewport),b("html").hasClass("preview-mode")?e.isPreview=!0:b("html").hasClass("experience-mode")&&(e.isExperience=!0)};return{init:g,device:d,siteCore:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.global.init()),function(a){"use strict";a(function(){var a,b,c=["Configs","Utils"];for(a in c)b=c[a],INFORMA[b]&&INFORMA[b].init();for(a in INFORMA.initUI)b=INFORMA.initUI[a],INFORMA[b]&&INFORMA[b].init(a)}())}($INFORMA),function(a){"use strict";a(function(){var a,b,c=["Configs","Utils"];for(a in c)b=c[a],INFORMA[b]&&INFORMA[b].init();for(a in INFORMA.initUI)b=INFORMA.initUI[a],INFORMA[b]&&INFORMA[b].init(a)}())}($INFORMA),function(a,b,c,d){b.Spinner=function(){function a(){var a,b,d=c(d),e={width:124,height:124};this.Hide=function(){b.find(".load-spinner").fadeOut("fast")},this.Show=function(e){b=e;var g=b.find(".load-spinner");g.length||(a=c("<div class='load-spinner'><img src='/Static/images/puff.svg' /></div>").hide(),a.prependTo(b),a.fadeIn("slow")),a.fadeIn("fast"),d.resize(function(){f()}),f()};var f=function(){b.find(".load-spinner img").css({left:(a.width()-e.width-5)/2,top:(a.height()-e.height-15)/2})}}return new a}()}(window,INFORMA,jQuery);var INFORMA=window.INFORMA||{};!function(a,b,c){"use strict";INFORMA.Templates={articleListItems:'{{#each Articles}}<li><p class="category">{{ContentType.[0]}}<strong>{{SectorType}}</strong></p><img src="{{ContentType.[1]}}" alt="{{ContentType.[2]}}" /><h2 class="poduct-brand-subheading">{{Title}}</h2><p class="date">{{PublicationDate}}</p><div class="list-content">{{#if Description}}<p class="description">{{Description}}</p><span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span><span class="article-info"><em>Topic:</em><strong>{{Topic}}</strong></span>{{/if}}{{#if Video}}<div class="video-container"><a href="{{Video.url}}" class="video-link"><img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" /></a><span class="play-icon"></span></div>{{/if}}</div>{{#if Link}}<div class="btn-container"><a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a></div>{{/if}}</li>{{/each}}',HeadlinesListItems:'{{#each Headlines}}<li><p class="date">{{PublicationDate}}</p><div class="list-content"><h4 class="poduct-brand-subheading">{{Title}}</h4></div><div class="link"><a role="button" href="{{Link.Url}}" title="External Link" target="{{Link.Target}}"><span class="icon-external-link">{{Link.LinkText}}</span></a></div></li>{{/each}}'}}(this,jQuery,"INFORMA"),function(a,b){a.Utils=function(){function c(){this.getIEVersion=function(){var a=navigator.userAgent,b=/MSIE\s?(\d+)(?:\.(\d+))?/i,c=a.match(b);return null!==c?{major:c[1],minor:c[2]}:{major:"-1",minor:"-1"}},this.getViewport=function(){var c,d=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e=Math.max(document.documentElement.clientHeight,window.innerHeight||0);return b("html").hasClass("lt-ie9")?c="large":(c=d<=a.Configs.views.xsmall?"xsmall":c,c=d>a.Configs.views.xsmall&&d<=a.Configs.views.small?"small":c,c=d>a.Configs.views.small?"medium":c,c=d>a.Configs.views.medium?"large":c,c=d>a.Configs.views.large?"xlarge":c),a.Configs.viewport={size:c,width:d,height:e},a.Configs.viewport},this.isMobileView=function(){return"small"==this.getViewport().size||"xsmall"==this.getViewport().size},this.isTabletView=function(){return"medium"==this.getViewport().size},this.init=function(){return this.getViewport(),"10"===this.getIEVersion().major&&b("html").addClass("ie10"),this}}return new c}()}(window.INFORMA="undefined"!=typeof INFORMA&&INFORMA instanceof Object?INFORMA:{},$INFORMA);var logThis=function(a){if(INFORMA.Configs.debug)for(var b=0;b<arguments.length;b++);};