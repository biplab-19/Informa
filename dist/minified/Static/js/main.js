var INFORMA=window.INFORMA||{};!function(a,b,c){"use strict";var d,e=a.location.href.indexOf("127.0.0.1")>-1?"local":"dev";INFORMA.getCookie=function(a){for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1);if(-1!=e.indexOf(b))return e.substring(b.length,e.length)}return""},d={local:{GetArticles:"/data/article_list.json",GetSubSectorList:"/data/product-finder.json",ProductSearch:"/data/product-results.json",SearchResult:"/data/search-results.json",AnalystSearch:"/data/analyst-search.json",AnalystSearchDropDown:"/data/analyst-search-dropdown.json",AnalystSearchAll:"/data/analyst-search-subsector.json",EventsSearch:"data/events-page.json",ResourceList:"data/resource-list.json"},dev:{GetArticles:"/client/search/getarticles",GetSubSectorList:"/client/search/GetSubSectors",ProductSearch:"/client/search/getproducts",SearchResult:"/client/search/GetSearchResults",AnalystSearch:"/client/search/GetSpecialists",AnalystSearchDropDown:"/client/search/GetSubSectorList",AnalystSearchAll:"/client/search/SeeAllSpecialists",EventsSearch:"/client/search/GetEventList",ResourceList:"/client/search/GetResourceListing",ResourceSubSectorList:"/client/search/GetSubSectors",GetFAQs:"/client/search/GetFAQs"}},INFORMA.Configs=function(){function a(){this.urls={webservices:d[e]},this.searchResult={pageSize:6},this.activeClass="informaui-active",this.views={small:768,medium:1024,large:1400},this.debug=!0,this.isMobile={Android:function(){return navigator.userAgent.match(/Android/i)}(),BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)}(),iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)}(),Opera:function(){return navigator.userAgent.match(/Opera Mini/i)}(),Windows:function(){return navigator.userAgent.match(/IEMobile/i)}()},this.init=function(){return this}}return new a}()}(this,$INFORMA=jQuery.noConflict(),"INFORMA");var logThis=function(a){if(INFORMA.Configs.debug)for(var b=0;b<arguments.length;b++);};!function(a,b,c,d){b.DataLoader=function(){function a(){this.GetContentOnlyFromURL=function(a,b){return c.ajax({url:a,dataType:"html",cache:!1})},this.GetServiceData=function(a,e){var f={},g={data:"",cache:!1,method:"POST",contentType:"application/json; charset=utf-8",dataType:"json",headers:{}};return c.extend(f,g,e),d[a]&&null!==d[a]&&d[a].abort(),d[a]=c.ajax({type:f.method,url:a,data:f.data,cache:f.cache,contentType:f.contentType,dataType:f.dataType,headers:f.headers,success:function(c){if(f.contentType.indexOf("xml")>-1)"undefined"!=typeof e&&"function"==typeof e.success_callback&&e.success_callback.call(this,c);else{var g=null;g=null!==c?c:!1,"undefined"!=typeof e&&"function"==typeof e.success_callback&&e.success_callback.call(this,g)}d[a]=null,b.Spinner.Hide()},error:function(a,b,c){"undefined"!=typeof e&&"function"==typeof e.error_callback&&e.error_callback.call(this,a,b,c)}}),d[a]}}var d={};return new a}()}(window,INFORMA,jQuery);var INFORMA=window.INFORMA||{};INFORMA.global=function(a,b,c){"use strict";var d={},e={},f=b("html"),g=function(){var c=b(a).width();c>=1024?(d.isDesktop=!0,d.viewport="desktop",d.viewportN=0):c>=768?(d.isTablet=!0,d.viewport="tablet",d.viewportN=1):(d.isMobile=!0,d.viewport="mobile",d.viewportN=2),f.addClass(d.viewport),b("html").hasClass("preview-mode")?e.isPreview=!0:b("html").hasClass("experience-mode")&&(e.isExperience=!0)};return{init:g,device:d,siteCore:e}}(this,$INFORMA=jQuery.noConflict(),"INFORMA"),jQuery(INFORMA.global.init()),function(a){"use strict";a(function(){var a,b,c=["Configs","Utils"];for(a in c)b=c[a],INFORMA[b]&&INFORMA[b].init();for(a in INFORMA.initUI)b=INFORMA.initUI[a],INFORMA[b]&&INFORMA[b].init(a)}())}($INFORMA),function(a){"use strict";a(function(){var a,b,c=["Configs","Utils"];for(a in c)b=c[a],INFORMA[b]&&INFORMA[b].init();for(a in INFORMA.initUI)b=INFORMA.initUI[a],INFORMA[b]&&INFORMA[b].init(a)}())}($INFORMA),function(a,b,c,d){b.Spinner=function(){function a(){var a,b,d=c(d),e={width:124,height:124};this.Hide=function(){"object"==typeof b&&b.find(".load-spinner").fadeOut("fast")},this.Show=function(e){b=e;var g=b.find(".load-spinner");g.length||(a=c("<div class='load-spinner'><span class='loading'><em>Loading...</em><img src='/Static/images/loader.svg' /></span></div>").hide(),a.prependTo(b),a.fadeIn("slow")),a.fadeIn("fast"),d.resize(function(){f()}),f()};var f=function(){b.find(".load-spinner .loading").css({left:(a.width()-e.width-5)/2,top:(a.height()-e.height-15)/2})}}return new a}()}(window,INFORMA,jQuery);var INFORMA=window.INFORMA||{};!function(a,b,c){"use strict";INFORMA.Templates={articleListItems:'{{#each Articles}}<li><div class="columns"><p class="category"><strong>{{SectorType}}</strong></p><h2 class="poduct-brand-subheading">{{Title}}</h2><span class="content-type">{{ContentType}}</span><p class="date">{{PublicationDate}}</p><div class="list-content">{{#if Description}}<p class="description">{{Description}}</p><span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span><span class="article-info"><em>Topic:</em><strong>{{Topic}}</strong></span>{{/if}}{{#if Video}}<div class="video-container"><a href="{{Video.url}}" class="video-link"><img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" /></a><span class="play-icon icon-play"></span></div>{{/if}}</div></div>{{#if LinkText}}<div class="btn-container"><a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a></div>{{/if}}</li>{{/each}}',HeadlinesListItems:'{{#each Headlines}}<li><p class="date">{{PublicationDate}}</p><div class="list-content"><h4 class="poduct-brand-subheading">{{Title}}</h4></div><div class="link"><a role="button" href="{{Link.Url}}" title="External Link" target="{{Link.Target}}"><span class="icon-external-link">{{Link.LinkText}}</span></a></div></li>{{/each}}',SubSectorList:'{{#each SubSectors}}<option value="{{SubSectorID}}">{{SubSectorName}}</option>{{/each}}',ProductFacets:'<div class="col-xs-12 col-sm-6 col-md-4"><p><strong>{{results.FilterName}}</strong></p><ul data-filterid="{{results.FilterID}}">{{#each results}}<li><span class="custom-checkbox"><label class="label" for="{{Key}}"><input type="checkbox" data-value={{Value}} value="{{Value}}" id="{{Key}}" name="{{Key}}" /><span>{{Key}}</span></label></span></li>{{/each}}</ul></div>',SearchTabs:'<div class="container clearfix"><ul class="tab-list">{{#each results}}<li><a href="#{{Value}}" class="">{{Key}}</a></li>{{/each}}</ul><div class="selectMenu"><select class="chosen-select">{{#each results}}<option value="#{{Value}}">{{Key}}</option>{{/each}}</select></div></div>',ProductFilters:'<div class="{{results.FilterName}}"><p>{{results.FilterName}}:</p><ul data-filterid="{{results.FilterID}}">{{#each results}}<li>{{Key}}<a href="#" class="remove" data-sector="{{Sector}}" data-value="{{Value}}">x</a></li>{{/each}}</ul><a class="remove-all" href="#" data-filterid="{{results.FilterID}}">Clear all x</a></div>',Products:'{{#each results}}<div class="col-xs-12 col-sm-6 col-md-4 search-tile"><div class="tile un-pinned"><div class="front"><div class="pin"></div><div class="header"><img src="{{Image}}" alt="{{ImageAlt}}" /></div><div class="content"><h2>{{Title}}</h2><p>{{Description}}</p><ul class="gray-bullets">{{#each SubSectors}}<li>{{this}}</li>{{/each}}</ul></div><div class="footer"></div></div><div class="back"><div class="header"><div class="header-content"><div class="pin"></div><h4>{{Title}}</h4></div></div><div class="content"><ul>{{#each Benefits}}<li><a href="#">{{this}}</a></li>{{/each}}</ul></div><div class="footer"><div class="footer-content clearfix"><div class="col-xs-6"><a href="{{FreeTrialLink}}" class="btn btn-default free-trial">Free Trial</a></div><div class="col-xs-6"><a href="{{MoreLink}}" class="btn btn-default orange more">More</a></div></div></div></div></div></div>{{/each}}',Resources:'<ul class="list-container">{{#each results}}<li class="col-xs-12 col-sm-6 col-md-4"><div class="columns"><p class="category"><strong>{{SectorType}}</strong></p><h2 class="poduct-brand-subheading">{{Title}}</h2><span class="content-type">{{ContentType}}</span><p class="date">{{PublicationDate}}</p><div class="list-content">{{#if Description}}<p class="description">{{Description}}</p><span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span><span class="article-info"><em>Topic:</em><strong>{{Topic}}</strong></span>{{/if}}{{#if Video}}<div class="video-container"><a href="{{Video.url}}" class="video-link"><img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" /></a><span class="play-icon"></span></div>{{/if}}</div></div>{{#if PageURL}}<div class="btn-container"><a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a></div>{{/if}}</li>{{/each}}</ul>',Events:'<ul class="event-items">{{#each results}}<li class="col-xs-12 col-sm-6 col-md-4"><div class="event-container"><div class="content"><div class="info"><p class="tag">{{EventType}}</p><span class="date"><span class="icon icon-calendar-day"></span>{{EventDate}}</span>{{#if Time}}<span class="time"><span class="icon icon-calendar-day"></span>{{Time}}</span>{{/if}}<h3>{{Title}}</h3><p><strong>{{DescriptionLabel}}: </strong>{{Description}}</p></div><div class="parent"><div class="child clearfix">{{#if FullDetail}}<a class="link" href="{{FullDetail.Url}}" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>{{/if}}{{#if Register}}<a class="btn btn-default" href="{{Register.Url}}" target="{{Register.Target}}">{{Register.LinkText}}</a>{{/if}}</div></div></div></div></li>{{/each}}</ul>',Others:'{{#each results}}<div class="col-xs-12 search-others"><h3>{{Title}}</h3><p>{{Description}}</p><div class="btn-container"><a href="{{ReadMoreLink}}" class="btn btn-default">{{ReadMoreText}}</a></div></div>{{/each}}',AnalystList:'<section class="analyst-views"><div class="container"><h2 class="header">{{results.header}}</h2><div class="row analyst-items">{{#each results.ModelItem}}<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}"><div class="meet-anlyst-section"><div class="anlyst-heading"><div class="analyst-heading-content"><div class="analyst-details"><span class="analyst-type">{{Type}}</span><h2>{{Name}}</h2><h3>{{Type}}, {{JobTitle}}</h3><p class="location">{{State}}, {{Country}}</p></div><div class="analyst-img"><img src="{{ProfileImage}}" alt="{{image}}" /></div></div></div><div class="analyst-description"><p class="heading"><i>{{FirstName}}</i> {{SpecializationText}}</p><ul class="yellow-bullets">{{#each Specialization}}<li>{{this}}</li>{{/each}}</ul><p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>{{#compare MultipleProducts 0 operator=">"}}<ul class="track-analyst clearfix">{{#each MultipleProducts}}<li><a href="#">{{this}}</a></li>{{/each}}</ul>{{/compare}}</div><div class="analyst-footer"><div class="analyst-footer-content clearfix"><ul class="nav-links">{{#compare TwitterLink null operator="!="}}<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>{{/compare}}{{#compare LinkedinLink null operator="!="}}<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>{{/compare}}{{#compare EmailAddress null operator="!="}}<li><a href="mailto:{{EmailAddress}}" class="icon-email"></a></li>{{/compare}}</ul><a href="#" class="btn btn-default pull-right">Full Profile</a></div></div></div></div>{{/each}}</div>{{#compare results.TotalCount 3 operator=">"}}<div class="btn-container text-center"><a href="javascript:void(0)" data-fetch="{{results.SectorID}}" class="btn-plus"><span class="more">See All {{results.TotalCount}} Analysts</span><span class="less">Hide Analysts</span></a></div>{{/compare}}</div></section>',Analysts:'{{#each results}}<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}"><div class="meet-anlyst-section"><div class="anlyst-heading"><div class="analyst-heading-content"><div class="analyst-details"><span class="analyst-type">{{Type}}</span><h2>{{Name}}</h2><h3>{{Type}}, {{JobTitle}}</h3><p class="location">{{State}}, {{Country}}</p></div><div class="analyst-img"><img src="{{ProfileImage}}" alt="{{image}}" /></div></div></div><div class="analyst-description"><p class="heading"><i>{{FirstName}}</i> {{SpecializationText}}</p><ul class="yellow-bullets">{{#each Specialization}}<li>{{this}}</li>{{/each}}</ul><p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>{{#compare MultipleProducts "0" operator=">"}}<ul class="track-analyst clearfix">{{#each MultipleProducts}}<li><a href="#">{{this}}</a></li>{{/each}}</ul>{{/compare}}</div><div class="analyst-footer"><div class="analyst-footer-content clearfix"><ul class="nav-links">{{#compare TwitterLink null operator="!="}}<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>{{/compare}}{{#compare LinkedinLink null operator="!="}}<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>{{/compare}}{{#compare EmailAddress null operator="!="}}<li><a href="mailto:{{EmailAddress}}" class="icon-email"></a></li>{{/compare}}</ul><a href="#" class="btn btn-default pull-right">Full Profile</a></div></div></div></div>{{/each}}',AnalystTemplate:'<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}"><div class="meet-anlyst-section"><div class="anlyst-heading"><div class="analyst-heading-content"><div class="analyst-details"><span class="analyst-type">{{Type}}</span><h2>{{results.Name}}</h2><h3>{{results.Type}}, {{results.JobTitle}}</h3><p class="location">{{results.State}}, {{results.Country}}</p></div><div class="analyst-img"><img src="{{results.ProfileImage}}" alt="{{results.image}}" /></div></div></div><div class="analyst-description"><p class="heading"><i>{{results.FirstName}}</i> {{results.SpecializationText}}</p><ul class="yellow-bullets">{{#each results.Specialization}}<li>{{this}}</li>{{/each}}</ul><p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>{{#compare results.MultipleProducts "0" operator=">"}}<ul class="track-analyst clearfix">{{#each results.MultipleProducts}}<li><a href="#">{{this}}</a></li>{{/each}}</ul>{{/compare}}</div><div class="analyst-footer"><div class="analyst-footer-content clearfix"><ul class="nav-links">{{#compare results.TwitterLink null operator="!="}}<li><a href="{{results.TwitterLink.Url}}" target="{{results.TwitterLink.Target}}" class="icon-twitter"></a></li>{{/compare}}{{#compare results.LinkedinLink null operator="!="}}<li><a href="{{results.LinkedinLink.Url}}" target="{{results.LinkedinLink.Target}}" class="icon-linked-in"></a></li>{{/compare}}{{#compare results.EmailAddress null operator="!="}}<li><a href="mailto:{{results.EmailAddress}}" class="icon-email"></a></li>{{/compare}}</ul><a href="#" class="btn btn-default pull-right">Full Profile</a></div></div></div></div>',EventpageListviewTemplate:'<div class="header clearfix"><a href="javascript:void(0)" class="arrows previous"></a><h2>{{results.Month}}</h2><a href="javascript:void(0)" class="arrows next"></a></div><div class="events-container row">{{#each results.ModelItem}}<div class="col-xs-12 col-sm-6 col-md-4 events-section {{DateType}}"><div class="events-wrap"><div class="header clearfix"><div class="date">{{DateField}}</div><p class="country">{{#compare State null operator="!="}}{{State}}{{/compare}} ,<strong>{{#compare Country null operator="!="}}{{Country}}{{/compare}}</strong></p></div><div class="content-wrap"><p><span class="type">{{EventType}}</span></p><h3 class="title">{{Title}}</h3>{{#compare Presenters.length 0 operator=">"}}<div class="content clearfix"><div class="title-content">{{PresentersLabel}}</div><div class="title-body"><ul class="clearfix">{{#each Presenters}}<li>{{this}}</li>{{/each}}</ul></div></div>{{/compare}}{{#compare Themes.length 0 operator=">"}}<div class="content clearfix"><div class="title-content">{{ThemeLabel}}</div><div class="title-body"><ul class="clearfix">{{#each Themes}}<li>{{this}}</li>{{/each}}</ul></div></div>{{/compare}}</div><div class="footer clearfix">{{#compare Register null operator="!="}}<a href="{{Register.Url}}" class="btn btn-default register {{EventText}}" target="{{Register.Target}}">{{EventStatus}}</a>{{/compare}}{{#compare FullDetail null operator="!="}}<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>{{/compare}}</div></div></div>{{/each}}',ResourceList:'<div class="col-xs-12 col-sm-6 col-md-4 list-item-container"><div class="list-item"><div class="columns">{{#if SectorType}}<p class="category"><strong>{{SectorType}}</strong></p>{{/if}}<h2 class="poduct-brand-subheading">{{Title}}</h2><span class="content-type">{{ContentType}}</span><p class="date">30.03.2016</p><div class="list-content">{{#if Description}}<p class="description">{{Description}}</p><span class="article-info"><em>Author:</em> <strong>{{Profiles}}</strong></span><span class="article-info"><em>Topic:</em> <strong>{{Topics}}</strong></span>{{/if}}{{#if Video}}<div class="video-container"><a href="{{Video.url}}" class="video-link"><img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" /><span class="play-icon icon-play"></span></a></div>{{/if}}</div></div>{{#if PageURL}}<div class="btn-container"><a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a></div>{{/if}}</div></div>',AccordianTemplate:'<div class="panel panel-default"><div class="panel-heading" role="tab"><h4 class="panel-title"><a class="collapsed" role="button" data-toggle="collapse" data-parent="#faqs-accordion" href="#{{collapsecontrol}}" aria-expanded="false" aria-controls="{{collapsecontrol}}">{{Title}}</a></h4></div><div id="{{collapsecontrol}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{id}}"><div class="panel-body">{{body}}</div></div></div>'}}(this,jQuery,"INFORMA"),function(a,b){a.Utils=function(){function c(){DoFlip=function(a,b){var c=a.parents(".tile");c.hasClass("un-pinned")&&("flip"===b?c.addClass("flip"):c.removeClass("flip"))},this.flipTile=function(c){var d=c.find(".front .header"),e=c.find(".back"),f=c.find(".front .header, .back"),g=c.find(".pin");0===a.global.device.viewportN?(d.mouseenter(function(){DoFlip(b(this),"flip")}),e.mouseleave(function(){DoFlip(b(this),"unflip")})):f.hover(function(){DoFlip(b(this),"flip")},function(){DoFlip(b(this),"unflip")}),g.click(function(){jQuery(this).parents(".tile").toggleClass("un-pinned")})},this.getUniqueArray=function(a){var c=[];return b.each(a,function(a,d){-1===b.inArray(d,c)&&c.push(d)}),c},this.RemoveArrayItem=function(a){for(var b,c,d=arguments,e=d.length;e>1&&a.length;)for(b=d[--e];-1!==(c=a.indexOf(b));)a.splice(c,1);return a},this.StrngToQryStrng=function(a){if(("object"==typeof a||"string"==typeof a)&&a){var b=a.toString().split(","),c=b.join("&");return c}},this.serializeObject=function(a){var c={},d=a;return b.each(d,function(){c[this.name]?(c[this.name].push||(c[this.name]=[c[this.name]]),c[this.name].push(this.value||"")):c[this.name]=this.value||""}),c},this.getIEVersion=function(){var a=navigator.userAgent,b=/MSIE\s?(\d+)(?:\.(\d+))?/i,c=a.match(b);return null!==c?{major:c[1],minor:c[2]}:{major:"-1",minor:"-1"}},this.getViewport=function(){var c,d=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e=Math.max(document.documentElement.clientHeight,window.innerHeight||0);return b("html").hasClass("lt-ie9")?c="large":(c=d<=a.Configs.views.xsmall?"xsmall":c,c=d>a.Configs.views.xsmall&&d<=a.Configs.views.small?"small":c,c=d>a.Configs.views.small?"medium":c,c=d>a.Configs.views.medium?"large":c,c=d>a.Configs.views.large?"xlarge":c),a.Configs.viewport={size:c,width:d,height:e},a.Configs.viewport},this.isMobileView=function(){return"small"==this.getViewport().size||"xsmall"==this.getViewport().size},this.isTabletView=function(){return"medium"==this.getViewport().size},this.init=function(){return this.getViewport(),"10"===this.getIEVersion().major&&b("html").addClass("ie10"),this}}return new c}()}(window.INFORMA="undefined"!=typeof INFORMA&&INFORMA instanceof Object?INFORMA:{},$INFORMA);var logThis=function(a){if(INFORMA.Configs.debug)for(var b=0;b<arguments.length;b++);};