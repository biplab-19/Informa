_adjustHeigt=function(){var a=Math.max.apply(null,el.find(".sector-card h2").map(function(){return $(this).height()}).get()),b=Math.max.apply(null,el.find(".sector-card .content").map(function(){return $(this).height()}).get()),c=Math.max.apply(null,el.find(".sector-card .sector-list-products").map(function(){return $(this).height()}).get());Math.max.apply(null,el.find(".sector-card .btn-container").map(function(){return $(this).height()}).get());el.find(".sector-card h2").height(a),el.find(".sector-card .content").height(b),el.find(".sector-card .sector-list-products").height(c),el.find(".sector-card .btn-container").height(c)};var INFORMA=window.INFORMA||{};INFORMA.EventList=function(a,b,c){"use strict";var d,e,f=b(".analyst-profile-events .event-items"),g={autoplay:!1,autoplaySpeed:4e3,sliderDots:!0,sliderInfinite:!0,slidesScroll:1,slidesShow:1,speed:400};return e=function(a){a.slick({dots:g.sliderDots,infinite:g.sliderInfinite,speed:g.speed,autoplay:g.autoplay,autoplaySpeed:g.autoplaySpeed,slidesToShow:g.slidesShow,slidesToScroll:g.slidesScroll})},d=function(){f.length>0&&INFORMA.global.device.isMobile&&e(f)},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.EventList.init());var INFORMA=window.INFORMA||{};INFORMA.analystProfile=function(a,b,c){"use strict";var d,e;return e=function(a){var c=b(".show-options");c.click(function(){b(this).parents("#analyst-profile").find(".descriptions").toggleClass("show-content")})},d=function(){e()},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.analystProfile.init());var INFORMA=window.INFORMA||{};INFORMA.AnalystSearch=function(a,b,c){"use strict";var d,e=b(".analyst-search"),f=(e.find(".sector select"),e.find(".sub-sector"));return f.chosen().on("change",function(){var a=jQuery(this).val();"All"===a?f.addClass("disabled"):f.removeClass("disabled")}),d=function(){},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.AnalystSearch.init());var INFORMA=window.INFORMA||{};INFORMA.ArticleList=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m=b(".article-list .list-container"),n=b(".headline-list .list-container"),o=b(".category-filter-list .categoryFilter"),p=(INFORMA.Templates,INFORMA.Configs.urls.webservices),q={autoplay:!1,autoplaySpeed:4e3,sliderDots:!0,sliderInfinite:!0,slidesScroll:3,slidesShow:3,speed:400};return f=function(a){var b=a.data(),c={};if("object"==typeof b){for(var d in b)if(b.hasOwnProperty(d)){var e=b[d];c[d]=null!==e&&void 0!==e?e:q[d]}return c}},l=function(a){var b=a.find("li").size();return b},g=function(a,b){var c=Handlebars.compile(a),d=c(b);return d},j=function(a,b){b.empty().html(a),e(b)},h=function(a){INFORMA.Spinner.Show(b(".article-list")),INFORMA.DataLoader.GetServiceData(p.GetArticles,{method:"GET",data:a,success_callback:function(a){if(void 0!==a.Articles&&a.Articles.length>0){var b=g(INFORMA.Templates.articleListItems,{Articles:a.Articles});m.slick("unslick"),j(b,m)}if(void 0!==a.Articles&&a.Headlines.length>0){var b=g(INFORMA.Templates.HeadlinesListItems,{Headlines:a.Headlines});n.slick("unslick"),j(b,n)}},error_callback:function(){}})},i=function(){b(".list-container").each(function(){var a=0;b(".columns",this).each(function(){b(this).height()>a&&(a=b(this).height())}),b(".columns",this).height(a)})},k=function(){o&&o.on("change",function(a){a.preventDefault();var b=o.val();h(b)}),i()},e=function(a){var b=l(a),c=f(a);a.slick({dots:c.sliderDots,infinite:c.sliderInfinite,speed:c.speed,autoplay:c.autoplay,autoplaySpeed:c.autoplaySpeed,slidesToShow:b>=c.slidesShow?c.slidesShow:b,slidesToScroll:c.slidesScroll,responsive:[{breakpoint:1024,settings:{slidesToShow:b>=2?2:b,slidesToScroll:2}},{breakpoint:600,settings:{slidesToShow:b>=2?2:b,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})},d=function(){m.length>0&&e(m),n.length>0&&e(n),o&&(b(".chosen-select").chosen({disable_search_threshold:10,width:"100%"}),k()),b(a).on("orientationchange",function(){i()})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.ArticleList.init());var INFORMA=window.INFORMA||{};INFORMA.brandList=function(a,b,c){"use strict";var d,e,f=b("#product-brands-list-section");return e=function(a){var c=b(".show-more-brands ");c.on("click",function(){var a=INFORMA.global.device.viewportN;2==a&&(b(".product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading").show(),b(".product-brands-list .view-all-mobile-container").hide())})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.brandList.init());var INFORMA=window.INFORMA||{};INFORMA.featureList=function(a,b,c){"use strict";var d,e,f=b("#feature-list");return e=function(a){var c=b(".btn-showMore",a),d=a.data(INFORMA.global.device.viewport)+1;b(".feature-list-container:nth-child(n+"+d+")").hide(),c.on("click",function(){var c=(INFORMA.global.device.viewport,a.data(INFORMA.global.device.viewport)+1);f.children().find(".feature-list-container:nth-child(n+"+c+")").slideToggle(),b(this).toggleClass("showLess")})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.featureList.init());var INFORMA=window.INFORMA||{};INFORMA.formRequestForDemo=function(a,b,c){"use strict";var d,e,f,g=b(".hasToolTip .icon.icon-info");return f=function(a){},d=function(){f(),e()},e=function(){g.on("click",function(){b(this).toggleClass("active"),b(this).parent().parent().children(".tooltip-placeholder").slideToggle()})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.formRequestForDemo.init());var INFORMA=window.INFORMA||{};INFORMA.global=function(a,b,c){"use strict";var d={},e={},f=b("html"),g=function(){var c=b(a).width();c>=1024?(d.isDesktop=!0,d.viewport="desktop",d.viewportN=0):c>=768?(d.isTablet=!0,d.viewport="tablet",d.viewportN=1):(d.isMobile=!0,d.viewport="mobile",d.viewportN=2),f.addClass(d.viewport),b("html").hasClass("preview-mode")?e.isPreview=!0:b("html").hasClass("experience-mode")&&(e.isExperience=!0)};return{init:g,device:d,siteCore:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.global.init());var INFORMA=window.INFORMA||{};INFORMA.globalFooter=function(a,b,c){"use strict";var d,e,f=b(".customers_list_slider");return e=function(a){var b=a.data("itemsperframe"),c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0,g=!1;INFORMA.global.siteCore.isPreview&&(c=!0),INFORMA.global.siteCore.isExperience&&(c=!1,f=!1),1==INFORMA.global.device.viewportN?(b=4,g=!0):2==INFORMA.global.device.viewportN&&(b=2,g=!0),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:g})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.globalFooter.init());var INFORMA=window.INFORMA||{};INFORMA.globalHeader=function(a,b,c){"use strict";var d,e,f,g,h,i,j=b("#mainNavigation"),k=j.height(),l=0,m="navbar-fixed-top",n=b("#pdp-navigation"),o=0,p=0,q=b(".product-detail-page"),r=b("#pdp-navigation .menuFollower"),s=!0,t=b("#pdp-navigation ul > li > a"),u=!1,v=[],w=[],x=[],y=!0;return n.length>0&&(o=n.height(),p=n.offset().top,r.css("width",b(t[0]).width()).css("left",b(t[0]).offset().left).show()),j.length>0&&(k=j.height(),l=j.offset().top),e=function(){b(a).on("scroll",function(){!u&&j.length>0&&!INFORMA.global.device.isMobile&&f(),n.length>0&&s&&h()})},f=function(){var c=b(a).scrollTop();c>l?(j.addClass(m),b("body").css("padding-top",k)):(j.removeClass(m),b("body").css("padding-top",0))},g=function(){for(var a=0;a<t.length;a++){var c="#"+b(t[a]).data("target");b(c).length>0||b(t[a]).addClass("JustGonnaStayThereAndWatchMeBurn")}b(".JustGonnaStayThereAndWatchMeBurn").parent().remove(),t=b("#pdp-navigation ul > li > a"),0==t.length&&(n.remove(),s=!1)},h=function(){var c=b(a).scrollTop();if(c>p-k){if(n.addClass(m),n.css("top",k+"px"),q.css("padding-top",o),u=!0,y){for(var d=0;d<t.length;d++){var e="#"+b(t[d]).data("target");v.push(b(e).offset().top),w.push(b(t[d]).width()),x.push(b(t[d]).parent().offset().left)}b("#pdp-navigation ul > li:first-child").addClass("selected"),INFORMA.global.device.isMobile&&n.addClass("cont"),y=!1}}else n.removeClass(m),q.css("padding-top",0),u=!1;for(var d=v.length-1;d>=0;d--)c+120>=v[d]&&(r.css("width",w[d]),r.css("left",x[d]),d=-1)},i=function(){t.on("click",function(a){a.preventDefault(),n.addClass("cont");var c=b(this).data("target");b("#pdp-navigation li").removeClass("selected"),b("html, body").stop().animate({scrollTop:b("#"+c).offset().top-(k+o)},1e3),INFORMA.global.device.isMobile&&(b(this).parent().addClass("selected"),setTimeout(function(){b('#pdp-navigation li:not(".selected")').slideUp(),n.addClass("cont")},100))})},d=function(){n.length>0&&(g(),i()),e(),INFORMA.global.device.isMobile&&b("#pdp-navigation ul").on("click",function(){b('#pdp-navigation li:not(".selected")').slideDown(),n.removeClass("cont")})},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.globalHeader.init());var INFORMA=window.INFORMA||{};INFORMA.heroBanner=function(a,b,c){"use strict";var d,e,f=b("img[data-video]");return e=function(){var a=f.data("video");f.parent().html('<iframe width="100%" height="100%" src="'+a+'" allowfullscreen volume="0"></iframe>')},d=function(){f.length>0&&e()},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.heroBanner.init());var INFORMA=window.INFORMA||{};INFORMA.twitterFeed=function(a,b,c){"use strict";var d,e,f=b(".twitter-carousel");return e=function(a){var b=a.data("itemsperframe"),c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0,g=Boolean(a.data("pagination"));1==INFORMA.global.device.viewportN?b=2:2==INFORMA.global.device.viewportN&&(b=1,g=!0),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:g,adaptiveHeight:!0})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.twitterFeed.init());var INFORMA=window.INFORMA||{};INFORMA.analystList=function(a,b,c){"use strict";var d,e,f,g=b("#pdp-analyst"),h=b(".analyst-views");return e=function(a){var c=b(".btn-showMore");c.on("click",function(){var a=INFORMA.global.device.viewportN;a=2==a?2:3==a?3:4,g.find(".analyst-list-container:nth-child(n+"+a+")").slideToggle(),b(this).toggleClass("showLess")})},f=function(a){var b=a.find(".analyst-description"),c=(jQuery(document).width(),jQuery(a.find(".analyst-description")[0]).width(),0);b.each(function(){var a=jQuery(this).height();a>c&&(c=a)}),b.css("height",c+50)},d=function(){g.length>0&&e(g),h.length>0&&h.each(function(){var a=jQuery(this).find(".analyst-list-container");f(a)})},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.analystList.init());var INFORMA=window.INFORMA||{};INFORMA.pdp_customer_quote=function(a,b,c){"use strict";var d,e,f=b("#customer-quote-slider");return e=function(a){var b=1,c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0;INFORMA.global.siteCore.isPreview&&(c=!0),INFORMA.global.siteCore.isExperience&&(c=!1,f=!1),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:!0})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.pdp_customer_quote.init());var INFORMA=window.INFORMA||{};INFORMA.ProductFinder=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o=b("#product-finder-section"),p=b(".sector-search .sub-sector-list"),q=b(".product-finder li.button"),r=b(".custom-multiselect select"),s=b(".search-options .close-finder"),t=b(".navbar-default .search a"),u=b("#search-page"),v=INFORMA.Configs.urls.webservices,w=INFORMA.Templates;return i=function(){s.on("click",function(a){a.preventDefault(),o.slideUp("fast")}),t.on("click",function(a){a.preventDefault(),o.slideDown("slow")})},k=function(a){if(a.SubSectors.length>0){var c=Handlebars.compile(w.SubSectorList),d=c({SubSectors:a.SubSectors});b(".sector-search li").removeClass("disabled"),p.removeAttr("disabled").removeProp("disabled").html(d),p.multiselect("rebuild")}},j=function(a,b){INFORMA.SearchResults.RenderSearchResults(a,b)},l=function(a,b,c,d,e,f){INFORMA.DataLoader.GetServiceData(a,{method:b,data:JSON.stringify(c),success_callback:function(a){"function"==typeof d&&d.call(this,a,f)},error_callback:function(){"function"==typeof e&&e.call(this,c,f)}})},m=function(a){q.on("click","a",function(c){c.preventDefault();var d=o.find("form").serializeArray(),e=INFORMA.Utils.serializeObject(d);INFORMA.Spinner.Show(b("body")),l(v[a],"Get",e,j,null,a)})},n=function(){var a=o.data("product")===!0,b=u.data("search")===!0;a&&m("ProductSearch"),b&&m("SearchResult")},h=function(a){var c=b(a).data("show");b("ul.searchToggle").addClass("hidden"),o.find("ul."+c).removeClass("hidden").fadeIn("slow")},f=function(){i(),jQuery(".search-options input[type=radio]").on("change",function(a){a.preventDefault(),h(b(this))});var a=jQuery(".search-options input[type=radio]:checked");"object"==typeof a&&h(a)},e=function(a){var b={};b.SectorIDs=INFORMA.Utils.getUniqueArray(a),l(v.GetSubSectorList,"Get",b,k,null)},g=function(){var a=[];r.val(""),r.multiselect({buttonText:function(a,c){if(0===a.length)return b(c).data("placeholder");var d=1;return a.each(function(a){d=parseInt(1+a)}),d+" Selected"},onChange:function(c,d,f){if(b(c).parent().hasClass("sector-list")===!0){if(d)a.push(b(c).val());else{var g=a.indexOf(b(c).val());g>=0&&a.splice(g,1),p.parents("li").eq(0).addClass("disabled"),p.attr("disabled","disabled"),p.multiselect("rebuild"),q.addClass("disabled"),b("li.disabled .dropdown-toggle").attr("disabled","disabled")}a.length>0&&e(a)}}})},d=function(){o.length>0&&(g(),f(),n())},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.ProductFinder.init());var INFORMA=window.INFORMA||{};INFORMA.SearchResultFilter=function(a,b,c){"use strict";var d,e,f=INFORMA.Templates;return e=function(a){if(Object.keys(a).length){var c,d,e=Handlebars.compile(f.SearchFilter),g=b(".search-filter .filter-list");a.Sector&&(c=e({results:a.Sector}),g.find(".sector ul").empty().html(c)),a.SubSector&&(d=e({results:a.SubSector}),g.find(".subsector ul").empty().html(d)),b(".search-filter").delay(600).slideDown()}},d=function(){},{init:d,CreateFilterList:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.SearchResultFilter.init());var INFORMA=window.INFORMA||{};INFORMA.SearchRefineResult=function(a,b,c){"use strict";var d,e,f,g=INFORMA.Templates;return f=function(a){var c=b(".search-container .refine-result"),d=b(".refine-result .close-filter");c.length&&(c.empty().html(a),c.parents(".refine-list").delay(1e3).slideDown()),d.off("click").on("click",function(a){a.preventDefault(),c.slideUp()}),b(".refine-list").off("click").on("click","a.refine",function(a){a.preventDefault(),c.slideToggle(),d.show()})},e=function(a){if(Object.keys(a).length){var b=Handlebars.compile(g.RefineResult),c=b({results:a.RefineResult});f(c)}},d=function(){},{init:d,CreateRefineList:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.SearchRefineResult.init());var INFORMA=window.INFORMA||{};INFORMA.SearchResults=function(a,b,c){"use strict";var d,e,f,g,h,i,j,k=INFORMA.Templates,l=b(".search-container #results");return f=function(a){var b=a.find(".col-md-4"),c=0,d=10;b.each(function(){var a=jQuery(this).height();a>c&&(c=a)}),b.css("height",c+d),2===INFORMA.global.device.viewportN&&b.css("height","auto")},j=function(a){for(var c in a)if(a.hasOwnProperty(c)){var d=c,e="",f=a[c],h="undefined"!==k[d]?k[d]:"",i=Handlebars.compile(h);e=i({results:f}),b("#"+d).find(".row").empty().html(e),b("#"+d).find(".count strong").empty().text(f.length)}var j=setTimeout(function(){clearTimeout(j),g()},500)},i=function(){INFORMA.Utils.flipTile(d)},g=function(){l.length&&(l.hide().fadeIn(1e3),d=b(".search-results"),d.each(function(){f(b(this))}),BindEvents())},h=function(a){if(Object.keys(a).length){var b=void 0!==a.Results?a.Results:!1,c=void 0!==a.RefineResult?a.RefineResult:!1,d=void 0!==a.SearchFilter?a.SearchFilter:!1;if(d&&INFORMA.SearchResultFilter.CreateFilterList(d),c){var e={RefineResult:c};INFORMA.SearchRefineResult.CreateRefineList(e)}b&&j(b)}},e=function(){},{init:e,RenderSearchResults:h}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.SearchResults.init());var INFORMA=window.INFORMA||{};INFORMA.sectorList=function(a,b,c){"use strict";var d,e,f=b("#sector-list-section");return e=function(a){var c=b(".view-all-sectors-btn");c.on("click",function(){var a=INFORMA.global.device.viewportN;2==a&&(b(".sector-list .container > .row + .row >.text-center:nth-child(n+3)").show(),b(".sector-list .view-all-sectors-btn-container").hide())})},d=function(){f.length>0&&e(f)},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.sectorList.init());var INFORMA=window.INFORMA||{};INFORMA.sectorPageStrengths=function(a,b,c){"use strict";var d,e,f=b(".sectorpage-strengths");return e=function(a){var c=b(".view-all-sectors-btn");c.on("click",function(){var a=INFORMA.global.device.viewportN;2==a&&(b(".sectorpage-strengths .container > .row + .row >.marg1:nth-child(2n+2)").toggle(),b(this).parents(".sectorpage-strengths").toggleClass("showLess"))})},d=function(){f.length>0&&e(f)},{init:d}}(this,jQuery,"INFORMA"),jQuery(INFORMA.sectorPageStrengths.init());var INFORMA=window.INFORMA||{};INFORMA.trainingMaterial=function(a,b,c){"use strict";var d,e,f=b(".slick-carousel");return e=function(a){var b=a.data("itemsperframe"),c=a.data("autorotate"),d=a.data("transitionspeed"),e=a.data("slideduration"),f=!0,g=Boolean(a.data("pagination"));INFORMA.global.siteCore.isPreview&&(c=!0),INFORMA.global.siteCore.isExperience&&(c=!1,f=!1),a.slick({infinite:f,autoplay:c,autoplaySpeed:e,slidesToShow:b,slidesToScroll:b,speed:d,dots:g,adaptiveHeight:!0,arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:600,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1,arrows:!0}}]})},d=function(){f.length>0&&e(f)},{init:d}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.trainingMaterial.init());