_adjustHeigt=function(){var a=Math.max.apply(null,el.find(".sector-card h2").map(function(){return $(this).height()}).get()),b=Math.max.apply(null,el.find(".sector-card .content").map(function(){return $(this).height()}).get()),c=Math.max.apply(null,el.find(".sector-card .sector-list-products").map(function(){return $(this).height()}).get());Math.max.apply(null,el.find(".sector-card .btn-container").map(function(){return $(this).height()}).get());el.find(".sector-card h2").height(a),el.find(".sector-card .content").height(b),el.find(".sector-card .sector-list-products").height(c),el.find(".sector-card .btn-container").height(c)};var INFORMA=window.INFORMA||{};INFORMA.EventList=function(a,b,c){"use strict";var d,e,f=b(".analyst-profile-events .event-items"),g={autoplay:!1,autoplaySpeed:4e3,sliderDots:!0,sliderInfinite:!0,slidesScroll:1,slidesShow:1,speed:400};return e=function(a){a.slick({dots:g.sliderDots,infinite:g.sliderInfinite,speed:g.speed,autoplay:g.autoplay,autoplaySpeed:g.autoplaySpeed,slidesToShow:g.slidesShow,slidesToScroll:g.slidesScroll})},d=function(){f.length>0&&INFORMA.global.device.isMobile&&e(f)},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.EventList.init());var INFORMA=window.INFORMA||{};INFORMA.analystProfile=function(a,b,c){"use strict";var d,e;return e=function(a){var c=b(".show-options");c.click(function(){b(this).parents("#analyst-profile").find(".descriptions").toggleClass("show-content")})},d=function(){e()},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.analystProfile.init());var INFORMA=window.INFORMA||{};INFORMA.AnalystSearch=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m=b(".analyst-search"),n=m.find(".sector select"),o=m.find(".sub-sector select"),p=m.find(".submit-btn"),q=m.find("#name"),r=b(".product-analyst-results"),s=INFORMA.Configs.urls.webservices,t=INFORMA.Templates;return h=function(){var a=jQuery(".analyst-views");a.each(function(){var a=jQuery(this).find(".analyst-list-container .analyst-description"),b=0,c=50;a.each(function(){var a=jQuery(this).height();a>b&&(b=a)}),a.css("height",b+c)})},l=function(a,b){var c=a,d="";for(var e in c)if(c.hasOwnProperty(e)){var f=c[e],g=e,i="undefined"!==t.AnalystListTemplate?t.AnalystListTemplate:"",j=Handlebars.compile(i);f.header=g,d+=j({results:f})}return jQuery('a[data-fetch="'+b+'"]').parents(".analyst-views").find(".row").html(d),h(),jQuery('a[data-fetch="'+b+'"]').parents(".analyst-views").addClass("showLess"),jQuery('a[data-fetch="'+b+'"]').parents(".analyst-views").find(".analyst-list-container:nth-child(n+4)").slideToggle(),d},g=function(){q.on("keyup",function(){var a=jQuery(this).val().length,b=n.val();3>a&&"default"==b?p.addClass("disabled"):p.removeClass("disabled")}),n.chosen().on("change",function(){var a=jQuery(this).val(),b=jQuery(this).find("option:selected").text(),c=q.val().length;"default"===a&&3>c?p.addClass("disabled"):p.removeClass("disabled"),"default"==a?(o.parents(".sub-sector").addClass("disabled"),o.parents(".form-group").find("label").html("By Sub-Sector")):(o.parents(".sub-sector").removeClass("disabled"),o.parents(".form-group").find("label").html("By "+b)),e(s.AnalystSearchDropDown,"Post",a,i,null,null),INFORMA.Spinner.Show(o),o.trigger("chosen:updated")}),p.on("click",function(){var a=m.find("form").serializeArray();for(var b in a)"default"==a[b].value&&(a[b].value=null);var c=JSON.stringify(INFORMA.Utils.serializeObject(a));e(s.AnalystSearch,"Post",c,f,null,null)})},i=function(a){var b=jQuery(o.find("option")[0]);o.empty();var c="<option value="+b.val()+">"+b.text()+"</option>";for(var d in a)c+="<option value="+a[d].Value+">"+a[d].Text+"</option>";o.html(c),o.trigger("chosen:updated")},f=function(a){INFORMA.Spinner.Show(b("body"));var c=a.SearchDictionary,d="";for(var e in c)if(c.hasOwnProperty(e)){var f=c[e],g=e,i="undefined"!==t.AnalystList?t.AnalystList:"",k=Handlebars.compile(i);f.header=g,d+=k({results:f})}return r.html(d),h(),j(),d},k=function(a){var b=a.SearchDictionary,c="";for(var d in b)if(b.hasOwnProperty(d)){var e=b[d],f=d,g="undefined"!==t.AnalystList?t.AnalystList:"",i=Handlebars.compile(g);e.header=f,c+=i({results:e})}return r.html(c),h(),c},j=function(){var a=jQuery(".btn-plus");a.on("click",function(){var a=jQuery(this).data("fetch"),b=m.find("form").serializeArray(),c=JSON.stringify(INFORMA.Utils.serializeObject(b)),d=JSON.parse(c);d.SectorID=a;for(var f in d)"default"==d[f]&&(d[f]=null);jQuery('a[data-fetch="'+a+'"]').parents(".analyst-views").hasClass("showLess")?(jQuery('a[data-fetch="'+a+'"]').parents(".analyst-views").find(".analyst-list-container:nth-child(n+4)").slideUp(),jQuery('a[data-fetch="'+a+'"]').parents(".analyst-views").find(".analyst-list-container:nth-child(n+4)").remove(),jQuery('a[data-fetch="'+a+'"]').parents(".analyst-views").removeClass("showLess")):e(s.AnalystSearchAll,"Post",JSON.stringify(d),l,null,a)})},e=function(a,b,c,d,e,f){INFORMA.DataLoader.GetServiceData(a,{method:b,data:JSON.stringify({data:c}),success_callback:function(a){"function"==typeof d&&d.call(this,a,f)},error_callback:function(){"function"==typeof e&&e.call(this,c,f)}})},d=function(){m.length>0&&(g(),j())},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.AnalystSearch.init());var INFORMA=window.INFORMA||{};INFORMA.ArticleList=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m=b(".article-list .list-container"),n=b(".headline-list .list-container"),o=b(".category-filter-list .categoryFilter"),p=b(".article-list"),q=b(".headline-list"),r=(INFORMA.Templates,INFORMA.Configs.urls.webservices),s={autoplay:!1,autoplaySpeed:4e3,sliderDots:!0,sliderInfinite:!0,slidesScroll:3,slidesShow:3,speed:400};return f=function(a){var b=a.data(),c={};if("object"==typeof b){for(var d in b)if(b.hasOwnProperty(d)){var e=b[d];c[d]=null!==e&&void 0!==e?e:s[d]}return c}},l=function(a){var b=a.find("li").size();return b},g=function(a,b){var c=Handlebars.compile(a),d=c(b);return d},j=function(a,b){b.empty().html(a),e(b),b.show();var c=setTimeout(function(){clearTimeout(c),i()},500)},h=function(a){INFORMA.Spinner.Show(b(".article-list")),INFORMA.DataLoader.GetServiceData(r.GetArticles,{method:"GET",data:a,success_callback:function(a){if(void 0!==a.Articles&&a.Articles.length>0){var b=g(INFORMA.Templates.articleListItems,{Articles:a.Articles});m.slick("unslick"),p.show(),j(b,m)}else p.hide();if(void 0!==a.Articles&&a.Headlines.length>0){var b=g(INFORMA.Templates.HeadlinesListItems,{Headlines:a.Headlines});n.slick("unslick"),q.show(),j(b,n)}else q.hide()},error_callback:function(){}})},i=function(){b(".list-container").each(function(){var a=0;b(".columns",this).each(function(){b(this).height()>a&&(a=b(this).height())}),b(".columns",this).height(a)})},k=function(){o&&o.on("change",function(a){a.preventDefault();var b=o.val();h(b)}),i()},e=function(a){var b=l(a),c=f(a);a.slick({dots:c.sliderDots,infinite:c.sliderInfinite,speed:c.speed,autoplay:c.autoplay,autoplaySpeed:c.autoplaySpeed,slidesToShow:b>=c.slidesShow?c.slidesShow:b,slidesToScroll:c.slidesScroll,responsive:[{breakpoint:1024,settings:{slidesToShow:b>=2?2:b,slidesToScroll:2}},{breakpoint:600,settings:{slidesToShow:b>=2?2:b,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})},d=function(){m.length>0&&e(m),n.length>0&&e(n),o&&(b(".chosen-select").chosen({disable_search_threshold:10,width:"100%"}),k()),b(a).on("orientationchange",function(){i()})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.ArticleList.init());var INFORMA=window.INFORMA||{};INFORMA.brandList=function(a,b,c){"use strict";var d,e,f=b("#product-brands-list-section");return e=function(a){var c=b(".show-more-brands ");c.on("click",function(){var a=INFORMA.global.device.viewportN;2==a&&(b(".product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading").show(),b(".product-brands-list .view-all-mobile-container").hide())})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.brandList.init());var INFORMA=window.INFORMA||{};INFORMA.homeContactUs=function(a,b,c){"use strict";var d,e,f=b("#contactus-section"),g=(f.find(".panel-default"),f.find(".panel-heading"));return e=function(a){if(2===INFORMA.global.device.viewportN){var b=a.find(".panel-default");b.each(function(a,b){2>a?jQuery(this).find(".panel-heading").removeClass("collapsed"):jQuery(this).find(".collapse").collapse("hide")})}},g.on("click",function(){g.parent().find(".collapse").collapse("hide"),g.not(jQuery(this)).addClass("collapsed"),jQuery(this).parent().find(".collapse").collapse("hide"),jQuery(this).hasClass("collapsed")?jQuery(this).removeClass("collapsed"):jQuery(this).addClass("collapsed")}),d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.homeContactUs.init());var INFORMA=window.INFORMA||{};INFORMA.navbars=function(a,b,c){"use strict";var d,e=b(".tabs-row ul.nav li");return d=function(){jQuery(e[0]).addClass("active"),e.on("click",function(){e.removeClass("active"),jQuery(this).addClass("active")})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.navbars.init());var INFORMA=window.INFORMA||{};INFORMA.featureList=function(a,b,c){"use strict";var d,e,f=b("#feature-list");return e=function(a){var c=b(".btn-showMore",a),d=a.data(INFORMA.global.device.viewport)+1;b(".feature-list-container:nth-child(n+"+d+")").hide(),c.on("click",function(){var c=(INFORMA.global.device.viewport,a.data(INFORMA.global.device.viewport)+1);f.children().find(".feature-list-container:nth-child(n+"+c+")").slideToggle(),b(this).toggleClass("showLess")})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.featureList.init()),function(a){function b(a){try{var b=a.split("-"),c=parseInt(b[0]),d=parseInt(b[1]),e=b.length>2?parseInt(b[2]):1;return c>0&&d>=0?new Date(c,d-1,e):null}catch(f){}}function c(a){var b=a.getFullYear(),c=a.getMonth();return b+"-"+(c+1)+"-"+a.getDate()}a.fn.calendar=function(d){function e(a){var b=new Date(a);return b.setMonth(b.getMonth()+1),b.setDate(0),b.getDate()}function f(a){var c=b(g.find(".month").text());c.setMonth(c.getMonth()+a),g.update(c)}var g=this,h=a.extend({},a.fn.calendar.defaults,d),i=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],j=i.map(function(a){return"<th>"+a+"</th>"}).join("");g.init=function(){var b='<table class="cal"><caption>	<span class="prev"><a href="javascript:void(0);">&lt;</a></span>	<span class="next"><a href="javascript:void(0);">&gt;</a></span>	<span class="month"><span></caption><thead><tr>'+j+"</tr></thead><tbody></tbody></table>",c=a(b);g.append(c)},g.update=function(b){function d(d){var e=a('<td><a href="javascript:void(0);"></a></td>'),f=e.find("a");return f.text(d.getDate()),f.data("date",c(d)),b.getMonth()!=d.getMonth()?e.addClass("off"):g.data("date")==f.data("date")&&(e.addClass("active"),g.data("date",c(d))),e}var f=new Date(b);f.setDate(1);var h=f.getDay();f.setDate(f.getDate()-h);var i=g.find("tbody");i.empty();for(var j=Math.ceil((h+e(b))/7),k=0;j>k;k++){for(var l=a("<tr></tr>"),m=0;7>m;m++,f.setDate(f.getDate()+1))l.append(d(f));i.append(l)}var n=c(b).replace(/-\d+$/,"");g.find(".month").text(n)},g.getCurrentDate=function(){return g.data("date")},g.init();var k=h.date?h.date:new Date;return!h.date&&h.picker||g.data("date",c(k)),g.update(k),g.delegate("tbody td","click",function(){var c=a(this);g.find(".active").removeClass("active"),c.addClass("active"),g.data("date",c.find("a").data("date")),c.hasClass("off")&&g.update(b(g.data("date"))),h.picker&&g.hide()}),g.find(".next").click(function(){f(1)}),g.find(".prev").click(function(){f(-1)}),this},a.fn.calendar.defaults={date:new Date,picker:!1},a.fn.datePicker=function(){var c=this,d=a("<div></div>").addClass("picker-container").hide().calendar({date:b(c.val()),picker:!0});return c.after(d),a("body").click(function(){d.hide()}),c.click(function(){return d.show(),!1}),d.click(function(){return c.val(d.getCurrentDate()),!1}),this},a(window).load(function(){a(".jquery-calendar").each(function(){a(this).calendar()}),a(".date-picker:text").each(function(){a(this).datePicker()})})}(jQuery);var INFORMA=window.INFORMA||{};INFORMA.formComponents=function(a,b,c){"use strict";var d,e,f,g,h=b(".hasToolTip .icon.icon-info");return f=function(a){},g=function(){b("#requestDemoForm").validate({errorPlacement:function(a,b){"select"===b.attr("type")?a.insertAfter(b.closest(".chosen-container")):a.insertAfter(b)}}),b("#requestTrial").validate({ignore:[],errorPlacement:function(a,b){b.hasClass("chosen-select")?a.insertAfter(b.siblings(".chosen-container")):a.insertAfter(b)},submitHandler:function(){}})},d=function(){f(),e(),g()},e=function(){h.on("click",function(){b(this).toggleClass("active"),b(this).parent().parent().children(".tooltip-placeholder").slideToggle()})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.formComponents.init());var INFORMA=window.INFORMA||{};INFORMA.formRequestForDemo=function(a,b,c){"use strict";var d,e,f,g=b(".hasToolTip .icon.icon-info");return f=function(a){},d=function(){f(),e()},e=function(){g.on("click",function(){b(this).toggleClass("active"),b(this).parent().parent().children(".tooltip-placeholder").slideToggle()})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.formRequestForDemo.init());var INFORMA=window.INFORMA||{};INFORMA.global=function(a,b,c){"use strict";var d={},e={},f=b("html"),g=function(){var c=b(a).width();c>=1024?(d.isDesktop=!0,d.viewport="desktop",d.viewportN=0):c>=768?(d.isTablet=!0,d.viewport="tablet",d.viewportN=1):(d.isMobile=!0,d.viewport="mobile",d.viewportN=2),f.addClass(d.viewport),b("html").hasClass("preview-mode")?e.isPreview=!0:b("html").hasClass("experience-mode")&&(e.isExperience=!0)};return{init:g,device:d,siteCore:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.global.init());var INFORMA=window.INFORMA||{};INFORMA.globalFooter=function(a,b,c){"use strict";var d,e,f=b(".customers_list_slider");return e=function(a){var b=a.data("itemsperframe"),c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0,g=!1;INFORMA.global.siteCore.isPreview&&(c=!0),INFORMA.global.siteCore.isExperience&&(c=!1,f=!1),1==INFORMA.global.device.viewportN?(b=4,g=!0):2==INFORMA.global.device.viewportN&&(b=2,g=!0),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:g})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.globalFooter.init());var INFORMA=window.INFORMA||{};INFORMA.globalHeader=function(a,b,c){"use strict";var d,e,f,g,h,i,j=b("#mainNavigation"),k=j.height(),l=0,m="navbar-fixed-top",n=b("#pdp-navigation"),o=0,p=0,q=b(".product-detail-page"),r=b("#pdp-navigation .menuFollower"),s=!0,t=b("#pdp-navigation ul > li > a"),u=!1,v=[],w=[],x=[],y=!0;return n.length>0&&(o=n.height(),p=n.offset().top,r.css("width",b(t[0]).width()).css("left",b(t[0]).offset().left).show()),j.length>0&&(k=j.height(),l=j.offset().top),e=function(){b(a).on("scroll",function(){!u&&j.length>0&&!INFORMA.global.device.isMobile&&f(),n.length>0&&s&&h()})},f=function(){var c=b(a).scrollTop();c>l?(j.addClass(m),b("body").css("padding-top",k)):(j.removeClass(m),b("body").css("padding-top",0))},g=function(){for(var a=0;a<t.length;a++){var c="#"+b(t[a]).data("target");b(c).length>0||b(t[a]).addClass("JustGonnaStayThereAndWatchMeBurn")}b(".JustGonnaStayThereAndWatchMeBurn").parent().remove(),t=b("#pdp-navigation ul > li > a"),0==t.length&&(n.remove(),s=!1)},h=function(){var c=b(a).scrollTop();if(c>p-k){if(n.addClass(m),n.css("top",k+"px"),q.css("padding-top",o),u=!0,y){for(var d=0;d<t.length;d++){var e="#"+b(t[d]).data("target");v.push(b(e).offset().top),w.push(b(t[d]).width()),x.push(b(t[d]).parent().offset().left)}b("#pdp-navigation ul > li:first-child").addClass("selected"),INFORMA.global.device.isMobile&&n.addClass("cont"),y=!1}}else n.removeClass(m),q.css("padding-top",0),u=!1;for(var d=v.length-1;d>=0;d--)c+120>=v[d]&&(r.css("width",w[d]),r.css("left",x[d]),d=-1)},i=function(){t.on("click",function(a){a.preventDefault(),n.addClass("cont");var c=b(this).data("target");b("#pdp-navigation li").removeClass("selected"),b("html, body").stop().animate({scrollTop:b("#"+c).offset().top-(k+o)},1e3),INFORMA.global.device.isMobile&&(b(this).parent().addClass("selected"),setTimeout(function(){b('#pdp-navigation li:not(".selected")').slideUp(),n.addClass("cont")},100))})},d=function(){n.length>0&&(g(),i()),e(),INFORMA.global.device.isMobile&&b("#pdp-navigation ul").on("click",function(){b('#pdp-navigation li:not(".selected")').slideDown(),n.removeClass("cont")})},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.globalHeader.init()),Handlebars.registerHelper("compare",function(a,b,c){if(arguments.length<3)throw new Error("Handlerbars Helper 'compare' needs 2 parameters");var d=c.hash.operator||"==",e={"==":function(a,b){return a==b},"===":function(a,b){return a===b},"!=":function(a,b){return a!=b},"<":function(a,b){return b>a},">":function(a,b){return a>b},"<=":function(a,b){return b>=a},">=":function(a,b){return a>=b},"typeof":function(a,b){return typeof a==b}};if(!e[d])throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+d);var f=e[d](a,b);return f?c.fn(this):c.inverse(this)}),Handlebars.registerHelper("math",function(a,b,c,d){return a=parseFloat(a),c=parseFloat(c),{"+":a+c,"-":a-c,"*":a*c,"/":a/c,"%":a%c}[b]});var INFORMA=window.INFORMA||{};INFORMA.heroBanner=function(a,b,c){"use strict";var d,e,f=b("img[data-video]");return e=function(){var a=f.data("video");f.parent().html('<iframe width="100%" height="100%" src="'+a+'" allowfullscreen volume="0"></iframe>')},d=function(){f.length>0&&e()},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.heroBanner.init());var INFORMA=window.INFORMA||{};INFORMA.twitterFeed=function(a,b,c){"use strict";var d,e,f=b(".twitter-carousel");return e=function(b){var c,d=b.data("itemsperframe"),e=b.data("autorotate"),f=b.data("transitionspeed"),g=b.data("slideduration"),h=!0,i=Boolean(b.data("pagination"));void 0!=b.data("rtl")&&(c=b.data("rtl")),1==INFORMA.global.device.viewportN?d=2:2==INFORMA.global.device.viewportN&&(d=1,i=!0),c===!0&&e===!0&&b.on("init",function(){b.find(".slick-list");a.setInterval(function(){b.slick("slickPrev")},g)}),b.slick({infinite:h,autoplay:e,autoplaySpeed:g,slidesToShow:d,slidesToScroll:d,speed:f,dots:i,adaptiveHeight:!0})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.twitterFeed.init());var INFORMA=window.INFORMA||{};INFORMA.analystList=function(a,b,c){"use strict";var d,e,f,g=b("#pdp-analyst"),h=b(".analyst-views");return e=function(a){var c=b(".btn-showMore");c.on("click",function(){var a=INFORMA.global.device.viewportN;a=2==a?2:3==a?3:4,g.find(".analyst-list-container:nth-child(n+"+a+")").slideToggle(),b(this).toggleClass("showLess")})},f=function(a){var b=a.find(".analyst-description"),c=(jQuery(document).width(),jQuery(a.find(".analyst-description")[0]).width(),0);b.each(function(){var a=jQuery(this).height();a>c&&(c=a)}),b.css("height",c+50)},d=function(){g.length>0&&e(g),h.length>0&&h.each(function(){var a=jQuery(this).find(".analyst-list-container");f(a)})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.analystList.init());var INFORMA=window.INFORMA||{};INFORMA.pdp_customer_quote=function(a,b,c){"use strict";var d,e,f=b("#customer-quote-slider");return e=function(b){var c,d=1,e=b.data("autorotate"),f=b.data("transitionspeed"),g=b.data("slideduration"),h=!0,i=Boolean(b.data("dots"));void 0!=b.data("rtl")&&(c=b.data("rtl")),INFORMA.global.siteCore.isPreview&&(e=!0),INFORMA.global.siteCore.isExperience&&(e=!1,h=!1),c===!0&&e===!0&&b.on("init",function(){b.find(".slick-list");a.setInterval(function(){b.slick("slickPrev")},g)}),b.slick({infinite:h,autoplay:e,autoplaySpeed:g,slidesToShow:d,slidesToScroll:d,speed:f,dots:null!==i||void 0!==i?i:!0})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.pdp_customer_quote.init());var INFORMA=window.INFORMA||{};INFORMA.ProductFinder=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o=b("#product-finder-section"),p=b(".sector-search .sub-sector-list"),q=b(".product-finder li.button"),r=b(".custom-multiselect select"),s=b(".search-options .close-finder"),t=b(".navbar-default .search a"),u=b("#search-page"),v=INFORMA.Configs.urls.webservices,w=INFORMA.Templates;return i=function(){s.on("click",function(a){a.preventDefault(),o.slideUp("fast")}),t.on("click",function(a){a.preventDefault(),o.slideDown("slow")})},k=function(a){if(a.SubSectors.length>0){var c=Handlebars.compile(w.SubSectorList),d=c({SubSectors:a.SubSectors});b(".sector-search li").removeClass("disabled"),p.removeAttr("disabled").removeProp("disabled").html(d),p.multiselect("rebuild")}},j=function(a,b){INFORMA.SearchResults.RenderSearchResults(a,b)},l=function(a,b,c,d,e,f){INFORMA.DataLoader.GetServiceData(a,{method:b,data:c,success_callback:function(a){"function"==typeof d&&d.call(this,a,f)},error_callback:function(){"function"==typeof e&&e.call(this,c,f)}})},m=function(a){q.on("click",".btn",function(c){c.preventDefault();var d=o.find("form").serializeArray(),e=JSON.stringify(INFORMA.Utils.serializeObject(d));INFORMA.Spinner.Show(b("body")),l(v[a],"Post",e,j,null,a)})},n=function(){var a=o.data("product")===!0,b=u.data("search")===!0;a&&m("ProductSearch"),b&&m("SearchResult")},h=function(a){var c=b(a).data("show");b("ul.searchToggle").addClass("hidden"),o.find("ul."+c).removeClass("hidden").fadeIn("slow")},f=function(){i(),jQuery(".search-options input[type=radio]").on("change",function(a){a.preventDefault(),h(b(this))});var a=jQuery(".search-options input[type=radio]:checked");"object"==typeof a&&h(a)},e=function(a){var b=INFORMA.Utils.getUniqueArray(a).join("&");b="SectorIDs="+b,l(v.GetSubSectorList,"Get",b,k,null)},g=function(){var a=[];r.val(""),r.multiselect({maxHeight:200,buttonText:function(a,c){if(0===a.length)return b(c).data("placeholder");var d=1;return a.each(function(a){d=parseInt(1+a)}),d+" Selected"},onChange:function(c,d,f){if(b(c).parent().hasClass("sector-list")===!0){if(d)a.push(b(c).val());else{var g=a.indexOf(b(c).val());g>=0&&a.splice(g,1),p.parents("li").eq(0).addClass("disabled"),p.attr("disabled","disabled"),p.val(""),p.multiselect("rebuild"),q.addClass("disabled"),b("li.disabled .dropdown-toggle").attr("disabled","disabled")}a.length>0&&e(a)}}})},d=function(){o.length>0&&(g(),f(),n())},{init:d,UpdateSubSectorDropdown:k}}(this,jQuery,"INFORMA"),jQuery(INFORMA.ProductFinder.init());var INFORMA=window.INFORMA||{};INFORMA.SearchResultFilter=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n=(INFORMA.Templates,b(".search-filter .filter-list")),o=b(".search-container .search-filter"),p=(INFORMA.Utils,INFORMA.Configs.urls.webservices),q=(b(".product-finder .sector-search li.button"),b(".search-container .refine-result"));return l=function(a,b){a.fadeOut("fast",function(){a.remove();var c=b.find("li").size(),d=n.find("li"),e=f(n);1>c&&b.parent("div").hide(),d.length||o.slideUp(),k(e)})},g=function(a){a.fadeOut("fast",function(){a.remove();var b=f(n),c=n.find("li");c.length||o.slideUp(),k(b)})},e=function(a){var b=jQuery.map(a,function(a){return a.value});return b},m=function(){var a={},c=f(n),d=f(q);return b.extend(a,d,c),a},f=function(a){var c=a.find("ul"),d={};return b.each(c,function(){var a=b(this).data("filterid").toLowerCase(),c=b(this).find("li a").length?b(this).find("li a"):b(this).find("li input:checked"),e=[];b.each(c,function(){e.push(b(this).data("value"))}),d[a]=e}),d},k=function(a){INFORMA.Spinner.Show(b("body")),INFORMA.DataLoader.GetServiceData(p.ProductSearch,{method:"Post",data:JSON.stringify(a),success_callback:INFORMA.SearchResults.RenderSearchResults})},h=function(){var a=b(".refine-list .close-filter"),c=b(".search-container .slider"),d=b(".refine-list .btn");a.off("click").on("click",function(b){b.preventDefault(),c.slideUp(),a.hide()}),b(".refine-list").off("click").on("click","a.refine",function(b){b.preventDefault(),c.slideDown(),a.show()}),d.off("click").on("click",function(b){b.preventDefault(),c.fadeOut(),a.hide();var d=m();k(d)})},j=function(){var a=n.find("a.remove"),c=n.find("a.remove-all");a.on("click",function(a){a.preventDefault();var c=b(this).parents("ul").eq(0),d=b(this).data("value"),e=c.data("filterid").toLowerCase();l(b(this).parent(),c),"sectors"===e&&i([d],b("select.sector-list")),"subsectors"===e&&i([d],b("select.sub-sector-list"))}),c.on("click",function(a){a.preventDefault();var c=b(this).parent(),d=b(this).data("filterid").toLowerCase();"sectors"===d&&n.find(".SubSectors").remove(),g(c)})},i=function(a,c){b.each(a,function(a,b){c.find("option[value='"+b+"']").prop("selected",!1)}),c.multiselect("rebuild")},d=function(){},{init:d,DoFilter:j,DoRefine:h}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.SearchResultFilter.init());var INFORMA=window.INFORMA||{};INFORMA.SearchResults=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r=INFORMA.Templates,s=b(".search-container #results"),t=b("#product-finder-section"),u=b("select.sector-list"),v=b("select.sub-sector-list"),w=b(".product-finder .sector-search li.button"),x=b("input.sector-list"),y=b("input.sub-sector-list"),z=b(".search-filter .filter-list"),A=b(".search-container .refine-result"),B=INFORMA.Configs,C=1,D=INFORMA.Configs.urls.webservices,E=INFORMA.Utils;return f=function(a){var b=a.find(".col-md-4"),c=0,d=10;b.each(function(){var a=jQuery(this).height();a>c&&(c=a)}),b.css("height",c+d),2===INFORMA.global.device.viewportN&&b.css("height","auto")},q=function(a,c){c.val(""),b.each(a,function(a,b){c.find("option[value='"+b+"']").prop("selected",!0)}),c.multiselect("rebuild")},k=function(){INFORMA.DataLoader.GetServiceData(D.ProductSearch,{method:"Post",success_callback:m})},p=function(a,b){var c=a.split(","),d=b.split(","),e="SectorIDs="+E.StrngToQryStrng(a);u.length&&c&&(q(c,u),INFORMA.DataLoader.GetServiceData(D.GetSubSectorList,{method:"Get",data:e,success_callback:function(a){INFORMA.ProductFinder.UpdateSubSectorDropdown(a),d&&q(d,v),t.slideDown(),w.find("button").trigger("click")},error_callback:function(){}}))},h=function(a,c,d,e,f){INFORMA.Spinner.Show(b("body")),INFORMA.DataLoader.GetServiceData(a,{method:c,data:d,success_callback:e,error_callback:f})},g=function(a){a.off("click").on("click",function(a){a.preventDefault();var c=t.find("form").serializeArray(),d=E.serializeObject(c);d.pageSize=void 0!==b(this).data("pagesize")?b(this).data("pagesize"):B.searchResult.pageSize,d.PageNo=C++,h(D.ProductSearch,"Post",JSON.stringify(d),m,null)})},j=function(a,b,c){a&&b&&(b.html(a),c&&b.parent().parent().delay(600).slideDown())},o=function(a){for(var c in a)if(a.hasOwnProperty(c)){var d,e,f,g=c,h="",j=a[c],k="undefined"!==r[g]?r[g]:"",l=Handlebars.compile(k),m="#"+g.toLowerCase();h=l({results:j}),e=b(m).find(".btn-container"),b(m).find(".row").html(h),e.removeClass("hide"),j.length>0?(d=j[0].ProductCount?j[0].ProductCount:0,f=j[0].RemainingCount?j[0].RemainingCount:0,b(m).find(".count strong").text(d),1>f&&e.addClass("hide")):(b(m).find(".count strong").text("0"),e.addClass("hide"))}var n=setTimeout(function(){clearTimeout(n),i()},500)},l=function(a,b,c){var d="";for(var e in a)if(a.hasOwnProperty(e)){var f=e,g=a[e],h=Handlebars.compile(b);g.length>0&&(g.FilterName=c[f],g.FilterID=f,d+=h({results:g}))}return d},n=function(){INFORMA.Utils.flipTile(d)},i=function(){if(s.length){s.hide().fadeIn(1e3),d=b(".search-results"),d.each(function(){f(b(this))}),n();var a=s.find(".btn-ShowMore");g(a)}},m=function(a){if(Object.keys(a).length){var b=void 0!==a.Results?a.Results:!1,c=void 0!==a.ProductFacets?a.ProductFacets:!1,d=void 0!==a.FilterLabels?a.FilterLabels:!1,e=void 0!==a.ProductFilters?a.ProductFilters:!1;if(e){var f=l(e,r.ProductFilters,d);j(f,z,!0),INFORMA.SearchResultFilter.DoFilter()}if(c){var f=l(c,r.ProductFacets,d);j(f,A,!1),INFORMA.SearchResultFilter.DoRefine()}b&&o(b)}},e=function(){var a=t.data("product")===!0;if(a&&x.length>0){var b=x.val(),c=y.length?y.val():!1;b?p(b,c):k()}},{init:e,RenderSearchResults:m,UpdateResultPage:p}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.SearchResults.init());var INFORMA=window.INFORMA||{};INFORMA.sectorList=function(a,b,c){"use strict";var d,e,f=b("#sector-list-section");return e=function(a){var c=b(".view-all-sectors-btn");c.on("click",function(){b(".sector-list .container > .row + .row >.text-center:nth-child(n+3)").show(),b(".sector-list .view-all-sectors-btn-container").hide()})},d=function(){f.length>0&&e(f)},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.sectorList.init());var INFORMA=window.INFORMA||{};INFORMA.sectorPageStrengths=function(a,b,c){"use strict";var d,e,f,g=b(".sectorpage-strengths"),h=0;return f=function(){var a=INFORMA.global.device.viewportN;if(0==a){var b=g.data("desktop");g.find(".marg1:nth-child(n+"+(b+1)+")").hide(),g.find(".marg1").length>b+1?g.find(".view-all-sectors-btn-container").show():g.find(".view-all-sectors-btn-container").hide(),h=b}else 1==a?(g.find(".marg1:nth-child(n+5)").hide(),g.find(".marg1").length>4?g.find(".view-all-sectors-btn-container").show():g.find(".view-all-sectors-btn-container").hide(),h=4):(g.find(".marg1:nth-child(n+4)").hide(),h=3)},e=function(a){var c=b(".view-all-sectors-btn");c.on("click",function(){b(".sectorpage-strengths .container > .row + .row >.marg1:nth-child(n+"+(h+1)+")").toggle(),b(this).parents(".sectorpage-strengths").toggleClass("showLess")})},d=function(){g.length>0&&(f(),e(g))},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.sectorPageStrengths.init());var INFORMA=window.INFORMA||{};INFORMA.trainingMaterial=function(a,b,c){"use strict";var d,e,f=b(".slick-carousel");return e=function(a){var b=a.data("itemsperframe"),c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0,g=Boolean(a.data("pagination"));INFORMA.global.siteCore.isPreview&&(c=!0),INFORMA.global.siteCore.isExperience&&(c=!1,f=!1),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:g,adaptiveHeight:!0,arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:600,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}}]})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.trainingMaterial.init());