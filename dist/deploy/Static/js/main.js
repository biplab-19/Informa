/*! 2016-08-16 */s = new AppMeasurement()
s.account="informashopwindowpharmadev"
//var s_account="informashopwindowpharmadev"
//var s=s_gi(s_account)

s.trackingServer="informa.122.2o7.net"

/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"
s.linkInternalFilters="javascript:" //optional: add your internal domain here
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"


/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,n;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(n=0;n<b.length&&(c=b[n++]);)if(-1<a.indexOf(c))return null;p=1;return a}function q(a,d,b,c,e){var g,h;if(a.dataset&&(h=a.dataset[d]))g=h;else if(a.getAttribute)if(h=a.getAttribute("data-"+b))g=h;else if(h=a.getAttribute(b))g=h;if(!g&&f.useForcedLinkTracking&&e&&(g="",d=a.onclick?""+a.onclick:"")){b=d.indexOf(c);var l,k;if(0<=b){for(b+=10;b<d.length&&0<="= \t\r\n".indexOf(d.charAt(b));)b++;
if(b<d.length){h=b;for(l=k=0;h<d.length&&(";"!=d.charAt(h)||l);)l?d.charAt(h)!=l||k?k="\\"==d.charAt(h)?!k:0:l=0:(l=d.charAt(h),'"'!=l&&"'"!=l&&(l=0)),h++;if(d=d.substring(b,h))a.e=new Function("s","var e;try{s.w."+c+"="+d+"}catch(e){}"),a.e(f)}}}return g||e&&f.w[c]}function r(a,d,b){var c;return(c=e[d](a,b))&&(p?(p=0,c):g(k(c),e[d+"Exclusions"]))}function s(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&t[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||
b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)s(c[a],d,b)}function k(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
"mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}","mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var m=window;m.s_c_in||(m.s_c_il=[],m.s_c_in=0);e._il=m.s_c_il;e._in=m.s_c_in;e._il[e._in]=e;m.s_c_in++;e._c="s_m";e.c={};var p=0,t={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=r(e,"link",f.linkName))&&(b=r(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,
255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(k(d),e.linkExclusions);else if((b=a)&&!(b=q(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(k(a.innerText||a.textContent),e.linkExclusions))||(s(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(k(c.join(""))))||(f=g(k(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():
"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(k(a.value)):"IMAGE"==c&&a.src&&(f=g(k(a.src)))));b=f}return b};e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=q(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
/* End ActivityMap Module */
/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.6.3
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(){var a=this;a.version="1.6.3";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.Jb;q||(q=null);var r=k,n,t;try{for(n=r.parent,t=r.location;n&&n.location&&t&&""+n.location!=""+t&&r.location&&""+n.location!=""+r.location&&n.location.host==t.host;)r=n,n=r.parent}catch(u){}a.yb=function(a){try{console.log(a)}catch(b){}};a.Ha=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.pb=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.cookieDomain&&
!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.cookieDomain=0<d?c.substring(d):c}return a.cookieDomain};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.pb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=
e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1==d&&(d=new Date,g=d.getYear(),d.setYear(g+5+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=c+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toGMTString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.K=[];a.ha=function(c,b,d){if(a.Aa)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,m=["webkitvisibilitychange","visibilitychange"];
g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ia)for(a.ia=1,d=0;d<m.length;d++)a.d.addEventListener(m[d],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&(a.ia=0,a.delayReady())});f=1;e=0}else d||a.p("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ia||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.p("_d")?b=1:a.va();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);setTimeout(a.delayReady,
parseInt(a.maxDelay/2));break}a.Aa=1;a[d.m].apply(a,d.a);a.Aa=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.ha("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,m="";e=f="";if(a.lightProfileID)d=a.O,(m=a.lightTrackVars)&&(m=","+m+","+a.ma.join(",")+",");else{d=a.g;if(a.pe||a.linkType)m=a.linkTrackVars,
f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(m=a[e].Hb,f=a[e].Gb));m&&(m=","+m+","+a.G.join(",")+",");f&&m&&(m+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!m||0<=m.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.r=function(c,b,d,f,e){var g="",m,p,k,w,n=0;"contextData"==c&&(c="c");if(b){for(m in b)if(!(Object.prototype[m]||e&&m.substring(0,e.length)!=e)&&b[m]&&(!d||0<=d.indexOf(","+(f?f+".":"")+m+","))){k=!1;if(n)for(p=
0;p<n.length;p++)m.substring(0,n[p].length)==n[p]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),p=b[m],e&&(m=m.substring(e.length)),0<m.length))if(k=m.indexOf("."),0<k)p=m.substring(0,k),k=(e?e:"")+p+".",n||(n=[]),n.push(k),g+=a.r(p,b,d,f,k);else if("boolean"==typeof p&&(p=p?"true":"false"),p){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(k=m.substring(0,4),w=m.substring(4),m){case "transactionID":m="xact";break;case "channel":m="ch";break;case "campaign":m="v0";break;default:a.Ha(w)&&("prop"==
k?m="c"+w:"eVar"==k?m="v"+w:"list"==k?m="l"+w:"hier"==k&&(m="h"+w,p=p.substring(0,255)))}g+="&"+a.escape(m)+"="+a.escape(p)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.sb=function(){var c="",b,d,f,e,g,m,p,k,n="",r="",s=e="";if(a.lightProfileID)b=a.O,(n=a.lightTrackVars)&&(n=","+n+","+a.ma.join(",")+",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,r=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Hb,r=a[e].Gb));n&&(n=","+n+","+a.G.join(",")+",");
r&&(r=","+r+",",n&&(n+=",events,"));a.events2&&(s+=(""!=s?",":"")+a.events2)}if(a.visitor&&1.5<=parseFloat(a.visitor.version)&&a.visitor.getCustomerIDs){e=q;if(g=a.visitor.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState));e&&(c+=a.r("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.r("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);m=e.substring(4);
!g&&"events"==e&&s&&(g=s,s="");if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,
255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e=
"cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":s&&(g+=(""!=g?",":"")+s);if(r)for(m=
g.split(","),g="",f=0;f<m.length;f++)p=m[f],k=p.indexOf("="),0<=k&&(p=p.substring(0,k)),k=p.indexOf(":"),0<=k&&(p=p.substring(0,k)),0<=r.indexOf(","+p+",")&&(g+=(g?",":"")+m[f]);break;case "events2":g="";break;case "contextData":c+=a.r("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e=
"mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.r("mts",a[e],n,e));g="";break;default:a.Ha(m)&&("prop"==f?e="c"+m:"eVar"==f?e="v"+m:"list"==f?e="l"+m:"hier"==f&&(e="h"+m,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}return c};a.D=function(a){var b=a.tagName;if("undefined"!=""+a.Mb||"undefined"!=""+a.Cb&&"HTML"!=(""+a.Cb).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||
"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Da=function(a){var b=a.href?a.href:"",d,f,e;d=b.indexOf(":");f=b.indexOf("?");e=b.indexOf("/");b&&(0>d||0<=f&&d>f||0<=e&&d>e)&&(f=a.protocol&&1<a.protocol.length?a.protocol:l.protocol?l.protocol:"",d=l.pathname.lastIndexOf("/"),b=(f?f+"//":"")+(a.host?a.host:l.host?l.host:"")+("/"!=h.substring(0,1)?l.pathname.substring(0,0>d?0:d)+"/":"")+b);return b};a.L=function(c){var b=a.D(c),d,f,e="",g=0;return b&&
(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Da(c),e)?{id:e.substring(0,100),type:g}:0};a.Kb=function(c){for(var b=a.D(c),d=a.L(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.D(c),d=a.L(c);
d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Bb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,m;a.na=1;d||(a.na=0,d=a.clickObject);if(d){c=a.D(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.D(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var p=d.onclick?""+d.onclick:"";if(0<=p.indexOf(".tl(")||0<=p.indexOf(".trackLink("))d=0}}else a.na=1;!e&&d&&(e=a.Da(d));e&&
!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var n=0,r=0,q;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(p=e.toLowerCase(),g=p.indexOf("?"),m=p.indexOf("#"),0<=g?0<=m&&m<g&&(g=m):g=m,0<=g&&(p=p.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),m=0;m<g.length;m++)(q=g[m])&&p.substring(p.length-(q.length+1))=="."+q&&(f="d");if(a.trackExternalLinks&&!f&&(p=e.toLowerCase(),a.Ga(p)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),
g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),n=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(m=0;m<g.length;m++)q=g[m],0<=p.indexOf(q)&&(r=1);r?n&&(f="e"):n||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+
"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.tb=function(){var c=a.na,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.ActivityMap){var b={},d=0,e=a.cookieRead("s_sq"),g=e?e.split("&"):0,m,p,k,e=0;if(g)for(m=0;m<g.length;m++)p=g[m].split("="),f=a.unescape(p[0]).split(","),p=a.unescape(p[1]),
b[p]=f;f=a.account.split(",");m={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(m[k]=a.contextData[k],a.contextData[k]="");a.e=a.r("c",m)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(p in b)if(!Object.prototype[p])for(k=0;k<f.length;k++)for(e&&(g=b[p].join(","),g==a.account&&(a.e+=("&"!=p.charAt(0)?"&":"")+p,b[p]=[],d=1)),m=0;m<b[p].length;m++)g=b[p][m],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=p.charAt(0)?"&":"")+p+"&u=0"),b[p].splice(m,1),d=1);c||(d=1);if(d){e=
"";m=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),m=1);for(p in b)!Object.prototype[p]&&0<m&&0<b[p].length&&(e+=(e?"&":"")+a.escape(b[p].join(","))+"="+a.escape(p),m--);a.cookieWrite("s_sq",e)}}}return c};a.ub=function(){if(!a.Fb){var c=new Date,b=r.location,d,f,e=f=d="",g="",m="",k="1.2",n=a.cookieWrite("s_cc","true",0)?"Y":"N",q="",s="";if(c.setUTCDate&&(k="1.3",(0).toPrecision&&(k="1.5",c=[],c.forEach))){k="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(k="1.7",c.reduce&&(k="1.8",k.trim&&
(k="1.8.1",Date.parse&&(k="1.8.2",Object.create&&(k="1.8.5")))))}catch(t){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;m=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),q=a.b.Lb(b)?"Y":"N"}catch(u){}try{a.b.addBehavior("#default#clientCaps"),s=a.b.connectionType}catch(x){}a.resolution=d;a.colorDepth=
f;a.javascriptVersion=k;a.javaEnabled=e;a.cookiesEnabled=n;a.browserWidth=g;a.browserHeight=m;a.connectionType=s;a.homepage=q;a.Fb=1}};a.P={};a.loadModule=function(c,b){var d=a.P[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.P[c]=a[c]=d;d.Xa=function(){return d.ab};d.bb=function(b){if(d.ab=b)a[c+"_onLoad"]=b,a.ha(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.Xa,set:d.bb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=
b,a.ha(c+"_onLoad",[a,d],1)||b(a,d))};a.p=function(c){var b,d;for(b in a.P)if(!Object.prototype[b]&&(d=a.P[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.wb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>v)return 0}return 1};a.Q=function(c,b){var d,
f,e,g,m,k;for(d=0;2>d;d++)for(f=0<d?a.wa:a.g,e=0;e<f.length;e++)if(g=f[e],(m=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])m[k]||(m[k]=a[g][k]);a[g]=m}};a.Qa=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.wa:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.ob=function(a){var b,d,f,e,g,k=0,p,n="",q="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(p=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,
7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(k=",p,ei,"),k&&p)))){if((a=p.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?n+=(n?"&":"")+e:q+=(q?"&":"")+e;n&&q?p=n+"&"+q:q=""}d=253-(p.length-q.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+p}return a};a.Wa=function(c){var b=
a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.da=!1;a.I=!1;a.eb=function(){a.I=!0;a.j()};a.ba=!1;a.U=!1;a.$a=function(c){a.marketingCloudVisitorID=c;a.U=!0;a.j()};a.ea=!1;a.V=!1;a.fb=function(c){a.visitorOptedOut=c;a.V=!0;a.j()};a.Y=!1;a.R=!1;a.Sa=function(c){a.analyticsVisitorID=
c;a.R=!0;a.j()};a.aa=!1;a.T=!1;a.Ua=function(c){a.audienceManagerLocationHint=c;a.T=!0;a.j()};a.Z=!1;a.S=!1;a.Ta=function(c){a.audienceManagerBlob=c;a.S=!0;a.j()};a.Va=function(c){a.maxDelay||(a.maxDelay=250);return a.p("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.ca=!1;a.H=!1;a.va=function(){a.H=!0;a.j()};a.isReadyToTrack=function(){var c=!0,b=a.visitor,d,f,e;a.da||a.I||(a.Wa(a.eb)?a.I=!0:a.da=!0);if(a.da&&!a.I)return!1;b&&b.isAllowed()&&(a.ba||a.marketingCloudVisitorID||!b.getMarketingCloudVisitorID||
(a.ba=!0,a.marketingCloudVisitorID=b.getMarketingCloudVisitorID([a,a.$a]),a.marketingCloudVisitorID&&(a.U=!0)),a.ea||a.visitorOptedOut||!b.isOptedOut||(a.ea=!0,a.visitorOptedOut=b.isOptedOut([a,a.fb]),a.visitorOptedOut!=q&&(a.V=!0)),a.Y||a.analyticsVisitorID||!b.getAnalyticsVisitorID||(a.Y=!0,a.analyticsVisitorID=b.getAnalyticsVisitorID([a,a.Sa]),a.analyticsVisitorID&&(a.R=!0)),a.aa||a.audienceManagerLocationHint||!b.getAudienceManagerLocationHint||(a.aa=!0,a.audienceManagerLocationHint=b.getAudienceManagerLocationHint([a,
a.Ua]),a.audienceManagerLocationHint&&(a.T=!0)),a.Z||a.audienceManagerBlob||!b.getAudienceManagerBlob||(a.Z=!0,a.audienceManagerBlob=b.getAudienceManagerBlob([a,a.Ta]),a.audienceManagerBlob&&(a.S=!0)),c=a.ba&&!a.U&&!a.marketingCloudVisitorID,b=a.Y&&!a.R&&!a.analyticsVisitorID,d=a.aa&&!a.T&&!a.audienceManagerLocationHint,f=a.Z&&!a.S&&!a.audienceManagerBlob,e=a.ea&&!a.V,c=c||b||d||f||e?!1:!0);a.ca||a.H||(a.Va(a.va)?a.H=!0:a.ca=!0);a.ca&&!a.H&&(c=!1);return c};a.o=q;a.u=0;a.callbackWhenReadyToTrack=
function(c,b,d){var f;f={};f.jb=c;f.ib=b;f.gb=d;a.o==q&&(a.o=[]);a.o.push(f);0==a.u&&(a.u=setInterval(a.j,100))};a.j=function(){var c;if(a.isReadyToTrack()&&(a.cb(),a.o!=q))for(;0<a.o.length;)c=a.o.shift(),c.ib.apply(c.jb,c.gb)};a.cb=function(){a.u&&(clearInterval(a.u),a.u=0)};a.Ya=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Qa(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.qb=function(){var c=a.cookieRead("s_fid"),
b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+
" "+f.getDay()+" "+f.getTimezoneOffset());a.visitor&&(a.visitor.getAuthState&&(a.authState=a.visitor.getAuthState()),!a.supplementalDataID&&a.visitor.getSupplementalDataID&&(a.supplementalDataID=a.visitor.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)));a.p("_s");a.Ya(c)||(b&&a.Q(b),c&&(d={},a.Qa(d,0),a.Q(c)),a.wb()&&!a.visitorOptedOut&&(a.analyticsVisitorID||a.marketingCloudVisitorID||(a.fid=a.qb()),a.Bb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||
(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||(a.pageURL=f.href?f.href:f),a.referrer||a.Ra||(a.referrer=r.document.referrer),a.Ra=1,a.referrer=a.ob(a.referrer),a.p("_g")),a.tb()&&!a.abort&&(a.ub(),g+=a.sb(),a.Ab(e,g),a.p("_t"),a.referrer=""))),c&&a.Q(d,1));a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.tl=a.trackLink=
function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.l=c,a.A=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==
b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.Ab=function(c,b){var d,f=a.trackingServer;d="";var e=a.dc,g="sc.",k=a.visitorNamespace;f?a.trackingServerSecure&&a.ssl&&(f=a.trackingServerSecure):(k||(k=a.account,f=k.indexOf(","),0<=f&&(k=k.substring(0,f)),k=k.replace(/[^A-Za-z0-9]/g,"")),d||(d="2o7.net"),e=e?(""+e).toLowerCase():"d1","2o7.net"==d&&("d1"==e?e="112":"d2"==e&&(e="122"),g=""),f=k+"."+e+"."+g+d);d=a.ssl?"https://":"http://";e=a.AudienceManagement&&a.AudienceManagement.isReady()||
0!=a.usePostbacks;d+=f+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(e?"10":"1")+"/JS-"+a.version+(a.Eb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")+"/"+c+"?AQB=1&ndh=1&pf=1&"+(e?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.mb(d);a.ja()};a.Pa=/{(%?)(.*?)(%?)}/;a.Ib=RegExp(a.Pa.source,"g");a.nb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b)if(o=c.dests[b],"string"==typeof o.c&&"aa."==o.id.substr(0,3))for(var d=o.c.match(a.Ib),b=0;b<d.length;++b){match=
d[b];var f=match.match(a.Pa),e="";"%"==f[1]&&"timezone_offset"==f[2]?e=(new Date).getTimezoneOffset():"%"==f[1]&&"timestampz"==f[2]&&(e=a.rb());o.c=o.c.replace(match,a.escape(e))}};a.rb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};
a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.ra={};a.doPostbacks=function(c){if("object"==typeof c)if(a.nb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b)dest=c.dests[b],"object"==typeof dest&&"string"==typeof dest.c&&"string"==typeof dest.id&&
"aa."==dest.id.substr(0,3)&&(a.ra[dest.id]=new Image,a.ra[dest.id].alt="",a.ra[dest.id].src=dest.c)};a.mb=function(c){a.i||a.vb();a.i.push(c);a.la=a.C();a.Na()};a.vb=function(){a.i=a.xb();a.i||(a.i=[])};a.xb=function(){var c,b;if(a.qa()){try{(b=k.localStorage.getItem(a.oa()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.qa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ea=function(){var c=0;a.i&&(c=a.i.length);a.q&&c++;return c};a.ja=function(){if(a.q&&
(a.B&&a.B.complete&&a.B.F&&a.B.ua(),a.q))return;a.Fa=q;if(a.pa)a.la>a.N&&a.La(a.i),a.ta(500);else{var c=a.hb();if(0<c)a.ta(c);else if(c=a.Ba())a.q=1,a.zb(c),a.Db(c)}};a.ta=function(c){a.Fa||(c||(c=0),a.Fa=setTimeout(a.ja,c))};a.hb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.C()-a.Ka;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ba=function(){if(0<a.i.length)return a.i.shift()};a.zb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");
var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.yb(b)}};a.Za=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.X=!1;var s;try{s=JSON.parse('{"x":"y"}')}catch(x){s=null}s&&"y"==s.x?(a.X=!0,a.W=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.W=function(a){return k.$.parseJSON(a)},a.X=!0):a.W=function(){return null};a.Db=function(c){var b,d,f;a.Za()&&2047<c.length&&("undefined"!=typeof XMLHttpRequest&&(b=new XMLHttpRequest,"withCredentials"in b?d=1:b=0),b||"undefined"==
typeof XDomainRequest||(b=new XDomainRequest,d=2),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.X?b.xa=!0:b=0));!b&&a.Oa&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===
typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.za=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.ua=function(){b.za();a.lb();a.fa();a.q=0;a.ja();if(b.xa){b.xa=!1;try{a.doPostbacks(a.W(b.responseText))}catch(c){}}};b.onabort=b.onerror=b.Ca=function(){b.za();(a.trackOffline||a.pa)&&a.q&&a.i.unshift(a.kb);a.q=0;a.la>a.N&&a.La(a.i);a.fa();a.ta(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.ua():b.Ca())};a.Ka=a.C();if(1==d||2==d){var e=c.indexOf("?");
f=c.substring(0,e);e=c.substring(e+1);e=e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,"");1==d?(b.open("POST",f,!0),b.send(e)):2==d&&(b.open("POST",f),b.send(e))}else if(b.src=c,3==d){if(a.Ia)try{f.removeChild(a.Ia)}catch(g){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Ia=a.B}b.F=setTimeout(function(){b.F&&(b.complete?b.ua():(a.trackOffline&&b.abort&&b.abort(),b.Ca()))},5E3);a.kb=c;a.B=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.A)a.forcedLinkTrackingTimeout||
(a.forcedLinkTrackingTimeout=250),a.ga=setTimeout(a.fa,a.forcedLinkTrackingTimeout)};a.lb=function(){if(a.qa()&&!(a.Ja>a.N))try{k.localStorage.removeItem(a.oa()),a.Ja=a.C()}catch(c){}};a.La=function(c){if(a.qa()){a.Na();try{k.localStorage.setItem(a.oa(),k.JSON.stringify(c)),a.N=a.C()}catch(b){}}};a.Na=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ba()}};a.forceOffline=function(){a.pa=!0};a.forceOnline=function(){a.pa=!1};a.oa=
function(){return a.offlineFilename+"-"+a.visitorNamespace+a.account};a.C=function(){return(new Date).getTime()};a.Ga=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Eb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.Q(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],
f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d){var f;b||(b=a.pageURL?a.pageURL:k.location);d||(d="&");return c&&
b&&(b=""+b,f=b.indexOf("?"),0<=f&&(b=d+b.substring(f+1)+d,f=b.indexOf(d+c+"="),0<=f&&(b=b.substring(f+d.length+c.length+1),f=b.indexOf(d),0<=f&&(b=b.substring(0,f)),0<b.length)))?a.unescape(b):""}};a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ma="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.ma.slice(0);a.wa="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks AudienceManagement".split(" ");
for(n=0;250>=n;n++)76>n&&(a.g.push("prop"+n),a.O.push("prop"+n)),a.g.push("eVar"+n),a.O.push("eVar"+n),6>n&&a.g.push("hier"+n),4>n&&a.g.push("list"+n);n="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest".split(" ");a.g=a.g.concat(n);a.G=a.G.concat(n);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=0;a.offlineFilename=
"AppMeasurement.offline";a.Ka=0;a.la=0;a.N=0;a.Ja=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Oa=!1,navigator){var y=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=y.indexOf("MSIE ")||0<=y.indexOf("Trident/")&&0<=y.indexOf("Windows NT 6"))a.Oa=!0}}catch(z){}a.fa=function(){a.ga&&(k.clearTimeout(a.ga),a.ga=q);a.l&&a.J&&a.l.dispatchEvent(a.J);a.A&&("function"==typeof a.A?a.A():a.l&&a.l.href&&(a.d.location=
a.l.href));a.l=a.J=a.A=0};a.Ma=function(){a.b=a.d.body;a.b?(a.v=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.ya)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.v,!1);else{a.b.removeEventListener("click",a.v,!0);a.ya=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var m=a.M=a.clickObject;a.ka&&(clearTimeout(a.ka),a.ka=0);a.ka=setTimeout(function(){a.M==m&&(a.M=0)},1E4);f=a.Ea();a.track();if(f<a.Ea()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Ga(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(n){b=new k.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(q){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.l=c.target,a.J=b)}}}}}catch(r){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.v):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&
k.MouseEvent)&&(a.ya=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.v,!0)),a.b.addEventListener("click",a.v,!1))):setTimeout(a.Ma,30)};a.Ma();a.loadModule("ActivityMap")}
function s_gi(a){var k,q=window.s_c_il,r,n,t=a.split(","),u,s,x=0;if(q)for(r=0;!x&&r<q.length;){k=q[r];if("s_c"==k._c&&(k.account||k.oun))if(k.account&&k.account==a)x=1;else for(n=k.account?k.account:k.oun,n=k.allAccounts?k.allAccounts:n.split(","),u=0;u<t.length;u++)for(s=0;s<n.length;s++)t[u]==n[s]&&(x=1);r++}x||(k=new AppMeasurement);k.setAccount?k.setAccount(a):k.sa&&k.sa(a);return k}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var a=window,k=a.s_giq,q,r,n;if(k)for(q=0;q<k.length;q++)r=k[q],n=s_gi(r.oun),n.setAccount(r.un),n.setTagContainer(r.tagContainerName);a.s_giq=0}s_pgicq();

var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    var env = (window.location.href.indexOf("127.0.0.1") > -1) ? "local" : "dev",
        endPoints;
    INFORMA.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };

    endPoints = {
        "local": {
            "GetArticles": "/data/article_list.json",
            "GetSubSectorList": "/data/product-finder.json",
            "ProductSearch": "/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json",
            "AnalystSearchDropDown": "/data/analyst-search-dropdown.json",
            "AnalystSearchAll": "/data/analyst-search-subsector.json",
            "EventsSearch": "data/events-page.json",
            "ResourceList": "data/resource-list.json",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/data/form-data.json",
            "GetRecomendedItems": "/data/recomended-content.json"
        },
        "dev": {
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList": "/client/search/GetSubSectors",
            "ProductSearch": "/client/search/getproducts",
            "SearchResult": "/client/search/GetSearchResults",
            "AnalystSearch": "/client/search/GetSpecialists",
            "AnalystSearchDropDown": "/client/search/GetSubSectorList",
            "AnalystSearchAll": "/client/search/SeeAllSpecialists",
            "EventsSearch": "/client/search/GetEventList",
            "ResourceList": "/client/search/GetResourceListing",
            "ResourceSubSectorList": "/client/search/GetSubSectors",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/client/ajax/GetModifiedWffmFormItems",
            "GetRecomendedItems": "/client/Account/GetRemainingContent"
        }
    };

    INFORMA.Configs = (function() {
        function _config() {
            this.urls = {
                    "webservices": endPoints[env]
                },
                this.searchResult = {
                    "pageSize": 6
                },
                this.activeClass = 'informaui-active',
                this.views = {
                    'small': 768,
                    'medium': 1024,
                    'large': 1400
                },
                this.debug = true,
                this.isMobile = {
                    Android: (function() {
                        return navigator.userAgent.match(/Android/i);
                    })(),
                    BlackBerry: (function() {
                        return navigator.userAgent.match(/BlackBerry/i);
                    })(),
                    iOS: (function() {
                        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                    })(),
                    Opera: (function() {
                        return navigator.userAgent.match(/Opera Mini/i);
                    })(),
                    Windows: (function() {
                        return navigator.userAgent.match(/IEMobile/i);
                    })()
                },
                this.init = function() {
                    return this;
                };
        }
        return new _config();

    }());

    INFORMA.validDomains = ["1033edge.com",
        "11mail.com",
        "123.com",
        "123box.net",
        "123india.com",
        "123mail.cl",
        "123qwe.co.uk",
        "150ml.com",
        "15meg4free.com",
        "163.com",
        "1coolplace.com",
        "1freeemail.com",
        "1funplace.com",
        "1internetdrive.com",
        "1mail.net",
        "1me.net",
        "1mum.com",
        "1musicrow.com",
        "1netdrive.com",
        "1nsyncfan.com",
        "1under.com",
        "1webave.com",
        "1webhighway.com",
        "212.com",
        "24horas.com",
        "2911.net",
        "2bmail.co.uk",
        "2d2i.com",
        "2die4.com",
        "3000.it",
        "321media.com",
        "37.com",
        "3ammagazine.com",
        "3dmail.com",
        "3email.com",
        "3xl.net",
        "444.net",
        "4email.com",
        "4email.net",
        "4mg.com",
        "4newyork.com",
        "4x4man.com",
        "5iron.com",
        "5star.com",
        "88.am",
        "8848.net",
        "888.nu",
        "97rock.com",
        "aaamail.zzn.com",
        "aamail.net",
        "aaronkwok.net",
        "abbeyroadlondon.co.uk",
        "abcflash.net",
        "abdulnour.com",
        "aberystwyth.com",
        "abolition-now.com",
        "about.com",
        "academycougars.com",
        "acceso.or.cr",
        "access4less.net",
        "accessgcc.com",
        "ace-of-base.com",
        "acmecity.com",
        "acmemail.net",
        "acninc.net",
        "adelphia.net",
        "adexec.com",
        "adfarrow.com",
        "adios.net",
        "ados.fr",
        "advalvas.be",
        "aeiou.pt",
        "aemail4u.com",
        "aeneasmail.com",
        "afreeinternet.com",
        "africamail.com",
        "agoodmail.com",
        "ahaa.dk",
        "aichi.com",
        "aim.com",
        "airforce.net",
        "airforceemail.com",
        "airpost.net",
        "ajacied.com",
        "ak47.hu",
        "aknet.kg",
        "albawaba.com",
        "alex4all.com",
        "alexandria.cc",
        "algeria.com",
        "alhilal.net",
        "alibaba.com",
        "alive.cz",
        "allmail.net",
        "alloymail.com",
        "allracing.com",
        "allsaintsfan.com",
        "alltel.net",
        "alskens.dk",
        "altavista.com",
        "altavista.net",
        "altavista.se",
        "alternativagratis.com",
        "alumnidirector.com",
        "alvilag.hu",
        "amele.com",
        "america.hm",
        "ameritech.net",
        "amnetsal.com",
        "amrer.net",
        "amuro.net",
        "amuromail.com",
        "ananzi.co.za",
        "ancestry.com",
        "andylau.net",
        "anfmail.com",
        "angelfan.com",
        "angelfire.com",
        "animal.net",
        "animalhouse.com",
        "animalwoman.net",
        "anjungcafe.com",
        "anote.com",
        "another.com",
        "anotherwin95.com",
        "anti-social.com",
        "antisocial.com",
        "antongijsen.com",
        "antwerpen.com",
        "anymoment.com",
        "anytimenow.com",
        "aol.com",
        "apexmail.com",
        "apmail.com",
        "apollo.lv",
        "approvers.net",
        "arabia.com",
        "arabtop.net",
        "arcademaster.com",
        "archaeologist.com",
        "arcor.de",
        "arcotronics.bg",
        "argentina.com",
        "aristotle.org",
        "army.net",
        "arnet.com.ar",
        "artlover.com",
        "artlover.com.au",
        "as-if.com",
        "asean-mail.com",
        "asheville.com",
        "asia-links.com",
        "asia.com",
        "asiafind.com",
        "asianavenue.com",
        "asiancityweb.com",
        "asiansonly.net",
        "asianwired.net",
        "asiapoint.net",
        "assala.com",
        "assamesemail.com",
        "astroboymail.com",
        "astrolover.com",
        "astrosfan.com",
        "astrosfan.net",
        "asurfer.com",
        "athenachu.net",
        "atina.cl",
        "atl.lv",
        "atlaswebmail.com",
        "atlink.com",
        "ato.check.com",
        "atozasia.com",
        "att.net",
        "attglobal.net",
        "attymail.com",
        "au.ru",
        "ausi.com",
        "austin.rr.com",
        "australia.edu",
        "australiamail.com",
        "austrosearch.net",
        "autoescuelanerja.com",
        "automotiveauthority.com",
        "avh.hu",
        "awsom.net",
        "axoskate.com",
        "ayna.com",
        "azimiweb.com",
        "bachelorboy.com",
        "bachelorgal.com",
        "backpackers.com",
        "backstreet-boys.com",
        "backstreetboysclub.com",
        "bagherpour.com",
        "bangkok.com",
        "bangkok2000.com",
        "bannertown.net",
        "baptistmail.com",
        "baptized.com",
        "barcelona.com",
        "baseballmail.com",
        "basketballmail.com",
        "batuta.net",
        "baudoinconsulting.com",
        "bboy.zzn.com",
        "bcvibes.com",
        "beeebank.com",
        "beenhad.com",
        "beep.ru",
        "beer.com",
        "beethoven.com",
        "belice.com",
        "belizehome.com",
        "bellsouth.net",
        "berkscounty.com",
        "berlin.com",
        "berlin.de",
        "berlinexpo.de",
        "bestmail.us",
        "bettergolf.net",
        "bharatmail.com",
        "bigassweb.com",
        "bigblue.net.au",
        "bigboab.com",
        "bigfoot.com",
        "bigfoot.de",
        "bigger.com",
        "bigmailbox.com",
        "bigpond.com",
        "bigpond.com.au",
        "bigpond.net.au",
        "bigramp.com",
        "bikemechanics.com",
        "bikeracer.com",
        "bikeracers.net",
        "bikerider.com",
        "billsfan.com",
        "billsfan.net",
        "bimamail.com",
        "bimla.net",
        "birdowner.net",
        "bisons.com",
        "bitmail.com",
        "bitpage.net",
        "bizhosting.com",
        "bla-bla.com",
        "blackburnmail.com",
        "blackplanet.com",
        "blazemail.com",
        "bluehyppo.com",
        "bluemail.ch",
        "bluemail.dk",
        "bluesfan.com",
        "blushmail.com",
        "bmlsports.net",
        "boardermail.com",
        "boatracers.com",
        "bol.com.br",
        "bolando.com",
        "bollywoodz.com",
        "bolt.com",
        "boltonfans.com",
        "bombdiggity.com",
        "bonbon.net",
        "boom.com",
        "bootmail.com",
        "bornnaked.com",
        "bossofthemoss.com",
        "bostonoffice.com",
        "bounce.net",
        "box.az",
        "boxbg.com",
        "boxemail.com",
        "boxfrog.com",
        "boyzoneclub.com",
        "bradfordfans.com",
        "brasilia.net",
        "brazilmail.com.br",
        "breathe.com",
        "bresnan.net",
        "brfree.com.br",
        "bright.net",
        "britneyclub.com",
        "brittonsign.com",
        "broadcast.net",
        "btopenworld.co.uk",
        "buffymail.com",
        "bullsfan.com",
        "bullsgame.com",
        "bumerang.ro",
        "bunko.com",
        "buryfans.com",
        "business-man.com",
        "businessman.net",
        "businessweekmail.com",
        "busta-rhymes.com",
        "busymail.com",
        "buyersusa.com",
        "bvimailbox.com",
        "byteme.com",
        "c2i.net",
        "c3.hu",
        "c4.com",
        "cabacabana.com",
        "cableone.net",
        "caere.it",
        "cairomail.com",
        "callnetuk.com",
        "callsign.net",
        "caltanet.it",
        "camidge.com",
        "canada-11.com",
        "canada.com",
        "canadianmail.com",
        "canoemail.com",
        "canwetalk.com",
        "caramail.com",
        "care2.com",
        "careerbuildermail.com",
        "carioca.net",
        "cartestraina.ro",
        "casablancaresort.com",
        "casino.com",
        "catcha.com",
        "catholic.org",
        "catlover.com",
        "catsrule.garfield.com",
        "ccnmail.com",
        "cd2.com",
        "celineclub.com",
        "celtic.com",
        "centoper.it",
        "centralpets.com",
        "centrum.cz",
        "centrum.sk",
        "centurytel.net",
        "cfl.rr.com",
        "cgac.es",
        "chaiyomail.com",
        "chance2mail.com",
        "chandrasekar.net",
        "charmedmail.com",
        "charter.net",
        "chat.ru",
        "chattown.com",
        "chauhanweb.com",
        "check.com",
        "check1check.com",
        "cheerful.com",
        "chek.com",
        "chemist.com",
        "chequemail.com",
        "cheyenneweb.com",
        "chez.com",
        "chickmail.com",
        "china.net.vg",
        "chinalook.com",
        "chirk.com",
        "chocaholic.com.au",
        "christianmail.net",
        "churchusa.com",
        "cia-agent.com",
        "cia.hu",
        "ciaoweb.it",
        "cicciociccio.com",
        "cincinow.net",
        "citeweb.net",
        "citlink.net",
        "city-of-bath.org",
        "city-of-birmingham.com",
        "city-of-brighton.org",
        "city-of-cambridge.com",
        "city-of-coventry.com",
        "city-of-edinburgh.com",
        "city-of-lichfield.com",
        "city-of-lincoln.com",
        "city-of-liverpool.com",
        "city-of-manchester.com",
        "city-of-nottingham.com",
        "city-of-oxford.com",
        "city-of-swansea.com",
        "city-of-westminster.com",
        "city-of-westminster.net",
        "city-of-york.net",
        "city2city.com",
        "cityofcardiff.net",
        "cityoflondon.org",
        "claramail.com",
        "classicalfan.com",
        "classicmail.co.za",
        "clerk.com",
        "cliffhanger.com",
        "close2you.net",
        "club4x4.net",
        "clubalfa.com",
        "clubbers.net",
        "clubducati.com",
        "clubhonda.net",
        "clubvdo.net",
        "cluemail.com",
        "cmpmail.com",
        "cnnsimail.com",
        "codec.ro",
        "coder.hu",
        "coid.biz",
        "coldmail.com",
        "collectiblesuperstore.com",
        "collegebeat.com",
        "collegeclub.com",
        "collegemail.com",
        "colleges.com",
        "columbus.rr.com",
        "columbusrr.com",
        "columnist.com",
        "comcast.net",
        "comic.com",
        "communityconnect.com",
        "comprendemail.com",
        "compuserve.com",
        "computer-freak.com",
        "computermail.net",
        "conexcol.com",
        "conk.com",
        "connect4free.net",
        "connectbox.com",
        "conok.com",
        "consultant.com",
        "cookiemonster.com",
        "cool.br",
        "coolgoose.ca",
        "coolgoose.com",
        "coolkiwi.com",
        "coollist.com",
        "coolmail.com",
        "coolmail.net",
        "coolsend.com",
        "cooooool.com",
        "cooperation.net",
        "cooperationtogo.net",
        "copacabana.com",
        "cornells.com",
        "cornerpub.com",
        "corporatedirtbag.com",
        "correo.terra.com.gt",
        "cortinet.com",
        "cotas.net",
        "counsellor.com",
        "countrylover.com",
        "cox.net",
        "coxinet.net",
        "cpaonline.net",
        "cracker.hu",
        "crazedanddazed.com",
        "crazysexycool.com",
        "cristianemail.com",
        "critterpost.com",
        "croeso.com",
        "crosshairs.com",
        "crosswinds.net",
        "crwmail.com",
        "cry4helponline.com",
        "cs.com",
        "csinibaba.hu",
        "cuemail.com",
        "curio-city.com",
        "cute-girl.com",
        "cuteandcuddly.com",
        "cutey.com",
        "cww.de",
        "cyber-africa.net",
        "cyber4all.com",
        "cyberbabies.com",
        "cybercafemaui.com",
        "cyberdude.com",
        "cyberforeplay.net",
        "cybergal.com",
        "cybergrrl.com",
        "cyberinbox.com",
        "cyberleports.com",
        "cybermail.net",
        "cybernet.it",
        "cyberspace-asia.com",
        "cybertrains.org",
        "cyclefanz.com",
        "cynetcity.com",
        "dabsol.net",
        "dadacasa.com",
        "daha.com",
        "dailypioneer.com",
        "dallas.theboys.com",
        "dangerous-minds.com",
        "dansegulvet.com",
        "data54.com",
        "davegracey.com",
        "dawnsonmail.com",
        "dawsonmail.com",
        "dazedandconfused.com",
        "dbzmail.com",
        "dcemail.com",
        "deadlymob.org",
        "deal-maker.com",
        "dearriba.com",
        "death-star.com",
        "dejanews.com",
        "deliveryman.com",
        "deneg.net",
        "depechemode.com",
        "deseretmail.com",
        "desertmail.com",
        "desilota.com",
        "deskmail.com",
        "deskpilot.com",
        "destin.com",
        "detik.com",
        "deutschland-net.com",
        "devotedcouples.com",
        "dfwatson.com",
        "di-ve.com",
        "digibel.be",
        "diplomats.com",
        "dirtracer.com",
        "discofan.com",
        "discovery.com",
        "discoverymail.com",
        "disinfo.net",
        "dmailman.com",
        "dnsmadeeasy.com",
        "doctor.com",
        "dog.com",
        "doglover.com",
        "dogmail.co.uk",
        "dogsnob.net",
        "doityourself.com",
        "doneasy.com",
        "donjuan.com",
        "dontgotmail.com",
        "dontmesswithtexas.com",
        "doramail.com",
        "dostmail.com",
        "dotcom.fr",
        "dott.it",
        "dplanet.ch",
        "dr.com",
        "dragoncon.net",
        "dragracer.com",
        "dropzone.com",
        "drotposta.hu",
        "dubaimail.com",
        "dublin.com",
        "dublin.ie",
        "dunlopdriver.com",
        "dunloprider.com",
        "duno.com",
        "dwp.net",
        "dygo.com",
        "dynamitemail.com",
        "e-apollo.lv",
        "e-mail.dk",
        "e-mail.ru",
        "e-mailanywhere.com",
        "e-mails.ru",
        "e-tapaal.com",
        "earthalliance.com",
        "earthcam.net",
        "earthdome.com",
        "earthling.net",
        "earthlink.net",
        "earthonline.net",
        "eastcoast.co.za",
        "eastmail.com",
        "easy.to",
        "easypost.com",
        "eatmydirt.com",
        "ecardmail.com",
        "ecbsolutions.net",
        "echina.com",
        "ecompare.com",
        "edmail.com",
        "ednatx.com",
        "edtnmail.com",
        "educacao.te.pt",
        "educastmail.com",
        "ehmail.com",
        "eircom.net",
        "elsitio.com",
        "elvis.com",
        "email-london.co.uk",
        "email.com",
        "email.cz",
        "email.ee",
        "email.it",
        "email.nu",
        "email.ro",
        "email.ru",
        "email.si",
        "email.women.com",
        "email2me.net",
        "emailacc.com",
        "emailaccount.com",
        "emailchoice.com",
        "emailcorner.net",
        "emailem.com",
        "emailengine.net",
        "emailforyou.net",
        "emailgroups.net",
        "emailpinoy.com",
        "emailplanet.com",
        "emails.ru",
        "emailuser.net",
        "emailx.net",
        "ematic.com",
        "embarqmail.com",
        "emumail.com",
        "end-war.com",
        "enel.net",
        "engineer.com",
        "england.com",
        "england.edu",
        "epatra.com",
        "epix.net",
        "epost.de",
        "eposta.hu",
        "eqqu.com",
        "eramail.co.za",
        "eresmas.com",
        "eriga.lv",
        "estranet.it",
        "ethos.st",
        "etoast.com",
        "etrademail.com",
        "eudoramail.com",
        "europe.com",
        "euroseek.com",
        "every1.net",
        "everyday.com.kh",
        "everyone.net",
        "examnotes.net",
        "excite.co.jp",
        "excite.com",
        "excite.it",
        "execs.com",
        "expressasia.com",
        "extenda.net",
        "extended.com",
        "eyou.com",
        "ezcybersearch.com",
        "ezmail.egine.com",
        "ezmail.ru",
        "ezrs.com",
        "f1fans.net",
        "fan.com",
        "fan.theboys.com",
        "fansonlymail.com",
        "fantasticmail.com",
        "farang.net",
        "faroweb.com",
        "fastem.com",
        "fastemail.us",
        "fastemailer.com",
        "fastermail.com",
        "fastimap.com",
        "fastmail.fm",
        "fastmailbox.net",
        "fastmessaging.com",
        "fatcock.net",
        "fathersrightsne.org",
        "fbi-agent.com",
        "fbi.hu",
        "federalcontractors.com",
        "felicity.com",
        "felicitymail.com",
        "femenino.com",
        "fetchmail.co.uk",
        "fetchmail.com",
        "feyenoorder.com",
        "ffanet.com",
        "fiberia.com",
        "filipinolinks.com",
        "financemail.net",
        "financier.com",
        "findmail.com",
        "finebody.com",
        "finfin.com",
        "fire-brigade.com",
        "fishburne.org",
        "flashemail.com",
        "flashmail.com",
        "flashmail.net",
        "flipcode.com",
        "fmail.co.uk",
        "fmailbox.com",
        "fmgirl.com",
        "fmguy.com",
        "fnbmail.co.za",
        "fnmail.com",
        "folkfan.com",
        "foodmail.com",
        "football.theboys.com",
        "footballmail.com",
        "for-president.com",
        "forfree.at",
        "forpresident.com",
        "fortuncity.com",
        "fortunecity.com",
        "forum.dk",
        "free-org.com",
        "free.com.pe",
        "free.fr",
        "freeaccess.nl",
        "freeaccount.com",
        "freeandsingle.com",
        "freedom.usa.com",
        "freedomlover.com",
        "freegates.be",
        "freeghana.com",
        "freeler.nl",
        "freemail.c3.hu",
        "freemail.com.au",
        "freemail.com.pk",
        "freemail.de",
        "freemail.et",
        "freemail.gr",
        "freemail.hu",
        "freemail.it",
        "freemail.lt",
        "freemail.nl",
        "freemail.org.mk",
        "freenet.de",
        "freenet.kg",
        "freeola.com",
        "freeola.net",
        "freeserve.co.uk",
        "freestamp.com",
        "freestart.hu",
        "freesurf.fr",
        "freesurf.nl",
        "freeuk.com",
        "freeuk.net",
        "freeukisp.co.uk",
        "freeweb.org",
        "freewebemail.com",
        "freeyellow.com",
        "freezone.co.uk",
        "fresnomail.com",
        "friends-cafe.com",
        "friendsfan.com",
        "from-africa.com",
        "from-america.com",
        "from-argentina.com",
        "from-asia.com",
        "from-australia.com",
        "from-belgium.com",
        "from-brazil.com",
        "from-canada.com",
        "from-china.net",
        "from-england.com",
        "from-europe.com",
        "from-france.net",
        "from-germany.net",
        "from-holland.com",
        "from-israel.com",
        "from-italy.net",
        "from-japan.net",
        "from-korea.com",
        "from-mexico.com",
        "from-outerspace.com",
        "from-russia.com",
        "from-spain.net",
        "fromalabama.com",
        "fromalaska.com",
        "fromarizona.com",
        "fromarkansas.com",
        "fromcalifornia.com",
        "fromcolorado.com",
        "fromconnecticut.com",
        "fromdelaware.com",
        "fromflorida.net",
        "fromgeorgia.com",
        "fromhawaii.net",
        "fromidaho.com",
        "fromillinois.com",
        "fromindiana.com",
        "fromiowa.com",
        "fromjupiter.com",
        "fromkansas.com",
        "fromkentucky.com",
        "fromlouisiana.com",
        "frommaine.net",
        "frommaryland.com",
        "frommassachusetts.com",
        "frommiami.com",
        "frommichigan.com",
        "fromminnesota.com",
        "frommississippi.com",
        "frommissouri.com",
        "frommontana.com",
        "fromnebraska.com",
        "fromnevada.com",
        "fromnewhampshire.com",
        "fromnewjersey.com",
        "fromnewmexico.com",
        "fromnewyork.net",
        "fromnorthcarolina.com",
        "fromnorthdakota.com",
        "fromohio.com",
        "fromoklahoma.com",
        "fromoregon.net",
        "frompennsylvania.com",
        "fromrhodeisland.com",
        "fromru.com",
        "fromsouthcarolina.com",
        "fromsouthdakota.com",
        "fromtennessee.com",
        "fromtexas.com",
        "fromthestates.com",
        "fromutah.com",
        "fromvermont.com",
        "fromvirginia.com",
        "fromwashington.com",
        "fromwashingtondc.com",
        "fromwestvirginia.com",
        "fromwisconsin.com",
        "fromwyoming.com",
        "front.ru",
        "frontier.com",
        "frontiernet.net",
        "frostbyte.uk.net",
        "fsmail.net",
        "ftml.net",
        "fullmail.com",
        "funkfan.com",
        "fuorissimo.com",
        "furnitureprovider.com",
        "fuse.net",
        "fut.es",
        "fwnb.com",
        "fxsmails.com",
        "galamb.net",
        "galaxy5.com",
        "gamebox.net",
        "gamegeek.com",
        "gamespotmail.com",
        "garbage.com",
        "gardener.com",
        "gawab.com",
        "gaybrighton.co.uk",
        "gaza.net",
        "gazeta.pl",
        "gazibooks.com",
        "gci.net",
        "gee-wiz.com",
        "geecities.com",
        "geek.com",
        "geek.hu",
        "geeklife.com",
        "general-hospital.com",
        "geocities.com",
        "geologist.com",
        "geopia.com",
        "gh2000.com",
        "ghanamail.com",
        "ghostmail.com",
        "giantsfan.com",
        "giga4u.de",
        "gigileung.org",
        "givepeaceachance.com",
        "glay.org",
        "glendale.net",
        "globalfree.it",
        "globalpagan.com",
        "globalsite.com.br",
        "gmail.com",
        "gmx.at",
        "gmx.de",
        "gmx.li",
        "gmx.net",
        "gnwmail.com",
        "go.com",
        "go.ro",
        "go.ru",
        "go2.com.py",
        "go2net.com",
        "gocollege.com",
        "gocubs.com",
        "gofree.co.uk",
        "goldenmail.ru",
        "goldmail.ru",
        "golfemail.com",
        "golfmail.be",
        "gonavy.net",
        "goodstick.com",
        "googlemail.com",
        "goplay.com",
        "gorontalo.net",
        "gospelfan.com",
        "gothere.uk.com",
        "gotmail.com",
        "gotomy.com",
        "govolsfan.com",
        "gportal.hu",
        "grabmail.com",
        "graffiti.net",
        "gramszu.net",
        "grapplers.com",
        "gratisweb.com",
        "grungecafe.com",
        "gtemail.net",
        "gtmc.net",
        "gua.net",
        "guessmail.com",
        "guju.net",
        "gurlmail.com",
        "guy.com",
        "guy2.com",
        "guyanafriends.com",
        "gyorsposta.com",
        "gyorsposta.hu",
        "hackermail.net",
        "hailmail.net",
        "hairdresser.net",
        "hamptonroads.com",
        "handbag.com",
        "handleit.com",
        "hang-ten.com",
        "hanmail.net",
        "happemail.com",
        "happycounsel.com",
        "happypuppy.com",
        "hardcorefreak.com",
        "hawaii.rr.com",
        "hawaiiantel.net",
        "headbone.com",
        "heartthrob.com",
        "heerschap.com",
        "heesun.net",
        "hehe.com",
        "hello.hu",
        "hello.net.au",
        "hello.to",
        "helter-skelter.com",
        "hempseed.com",
        "herediano.com",
        "heremail.com",
        "herono1.com",
        "hey.to",
        "hhdevel.com",
        "highmilton.com",
        "highquality.com",
        "highveldmail.co.za",
        "hiphopfan.com",
        "hispavista.com",
        "hitthe.net",
        "hkg.net",
        "hkstarphoto.com",
        "hockeymail.com",
        "hollywoodkids.com",
        "home-email.com",
        "home.no.net",
        "home.ro",
        "home.se",
        "homeart.com",
        "homelocator.com",
        "homemail.com",
        "homestead.com",
        "homeworkcentral.com",
        "hongkong.com",
        "hookup.net",
        "hoopsmail.com",
        "horrormail.com",
        "host-it.com.sg",
        "hot-shot.com",
        "hot.ee",
        "hotbot.com",
        "hotbrev.com",
        "hotepmail.com",
        "hotfire.net",
        "hotletter.com",
        "hotmail.co.il",
        "hotmail.co.uk",
        "hotmail.com",
        "hotmail.fr",
        "hotmail.kg",
        "hotmail.kz",
        "hotmail.ru",
        "hotpop.com",
        "hotpop3.com",
        "hotvoice.com",
        "housefancom",
        "housemail.com",
        "hsuchi.net",
        "html.tou.com",
        "hughes.net",
        "hunsa.com",
        "hushmail.com",
        "hypernautica.com",
        "i-connect.com",
        "i-france.com",
        "i-mail.com.au",
        "i-p.com",
        "i.am",
        "i12.com",
        "iamawoman.com",
        "iamwaiting.com",
        "iamwasted.com",
        "iamyours.com",
        "icestorm.com",
        "icmsconsultants.com",
        "icq.com",
        "icqmail.com",
        "icrazy.com",
        "id-base.com",
        "ididitmyway.com",
        "idirect.com",
        "iespana.es",
        "ifoward.com",
        "ig.com.br",
        "ignazio.it",
        "ignmail.com",
        "ihateclowns.com",
        "iinet.net.au",
        "ijustdontcare.com",
        "ilovechocolate.com",
        "ilovejesus.com",
        "ilovethemovies.com",
        "ilovetocollect.net",
        "ilse.nl",
        "imaginemail.com",
        "imail.org",
        "imail.ru",
        "imailbox.com",
        "imel.org",
        "imneverwrong.com",
        "imposter.co.uk",
        "imstressed.com",
        "imtoosexy.com",
        "in-box.net",
        "iname.com",
        "inbox.net",
        "inbox.ru",
        "incamail.com",
        "incredimail.com",
        "indexa.fr",
        "india.com",
        "indiatimes.com",
        "indo-mail.com",
        "indocities.com",
        "indomail.com",
        "indyracers.com",
        "info-media.de",
        "info66.com",
        "infohq.com",
        "infomail.es",
        "infomart.or.jp",
        "infospacemail.com",
        "infovia.com.ar",
        "inicia.es",
        "inmail.sk",
        "innocent.com",
        "inorbit.com",
        "insidebaltimore.net",
        "insight.rr.com",
        "insurer.com",
        "interburp.com",
        "interfree.it",
        "interia.pl",
        "interlap.com.ar",
        "intermail.co.il",
        "internet-club.com",
        "internet-police.com",
        "internetbiz.com",
        "internetdrive.com",
        "internetegypt.com",
        "internetemails.net",
        "internetmailing.net",
        "investormail.com",
        "inwind.it",
        "iobox.com",
        "iobox.fi",
        "iol.it",
        "iowaemail.com",
        "ip3.com",
        "iprimus.com.au",
        "iqemail.com",
        "irangate.net",
        "iraqmail.com",
        "ireland.com",
        "irj.hu",
        "isellcars.com",
        "islamonline.net",
        "isleuthmail.com",
        "ismart.net",
        "isonfire.com",
        "isp9.net",
        "itloox.com",
        "itmom.com",
        "ivebeenframed.com",
        "ivillage.com",
        "iwan-fals.com",
        "iwmail.com",
        "iwon.com",
        "izadpanah.com",
        "jahoopa.com",
        "jakuza.hu",
        "japan.com",
        "jaydemail.com",
        "jazzandjava.com",
        "jazzfan.com",
        "jazzgame.com",
        "jerusalemmail.com",
        "jetemail.net",
        "jewishmail.com",
        "jippii.fi",
        "jmail.co.za",
        "joinme.com",
        "jokes.com",
        "jordanmail.com",
        "journalist.com",
        "jovem.te.pt",
        "joymail.com",
        "jpopmail.com",
        "jubiimail.dk",
        "jump.com",
        "jumpy.it",
        "juniormail.com",
        "juno.com",
        "justemail.net",
        "justicemail.com",
        "kaazoo.com",
        "kaixo.com",
        "kalpoint.com",
        "kansascity.com",
        "kapoorweb.com",
        "karachian.com",
        "karachioye.com",
        "karbasi.com",
        "katamail.com",
        "kayafmmail.co.za",
        "kbjrmail.com",
        "kcks.com",
        "keg-party.com",
        "keko.com.ar",
        "kellychen.com",
        "keromail.com",
        "keyemail.com",
        "kgb.hu",
        "khosropour.com",
        "kickassmail.com",
        "killermail.com",
        "kimo.com",
        "kinki-kids.com",
        "kittymail.com",
        "kitznet.at",
        "kiwibox.com",
        "kiwitown.com",
        "kmail.com.au",
        "konx.com",
        "korea.com",
        "kozmail.com",
        "krongthip.com",
        "krunis.com",
        "ksanmail.com",
        "ksee24mail.com",
        "kube93mail.com",
        "kukamail.com",
        "kumarweb.com",
        "kuwait-mail.com",
        "la.com",
        "ladymail.cz",
        "lagerlouts.com",
        "lahoreoye.com",
        "lakmail.com",
        "lamer.hu",
        "land.ru",
        "lankamail.com",
        "laposte.net",
        "latemodels.com",
        "latinmail.com",
        "latino.com",
        "law.com",
        "lawyer.com",
        "leehom.net",
        "legalactions.com",
        "legislator.com",
        "leonlai.net",
        "letsgomets.net",
        "letterbox.com",
        "levele.com",
        "levele.hu",
        "lex.bg",
        "lexis-nexis-mail.com",
        "liberomail.com",
        "lick101.com",
        "linkmaster.com",
        "linktrader.com",
        "linuxfreemail.com",
        "linuxmail.org",
        "lionsfan.com.au",
        "liontrucks.com",
        "liquidinformation.net",
        "list.ru",
        "littleblueroom.com",
        "live.com",
        "liverpoolfans.com",
        "llandudno.com",
        "llangollen.com",
        "lmxmail.sk",
        "lobbyist.com",
        "localbar.com",
        "london.com",
        "loobie.com",
        "looksmart.co.uk",
        "looksmart.com",
        "looksmart.com.au",
        "lopezclub.com",
        "louiskoo.com",
        "love.cz",
        "loveable.com",
        "lovelygirl.net",
        "lovemail.com",
        "lover-boy.com",
        "lovergirl.com",
        "lovingjesus.com",
        "lowandslow.com",
        "luso.pt",
        "luukku.com",
        "lycos.co.uk",
        "lycos.com",
        "lycos.es",
        "lycos.it",
        "lycos.ne.jp",
        "lycosemail.com",
        "lycosmail.com",
        "m-a-i-l.com",
        "m-hmail.com",
        "m4.org",
        "mac.com",
        "macbox.com",
        "macfreak.com",
        "machinecandy.com",
        "macmail.com",
        "madcreations.com",
        "madrid.com",
        "maffia.hu",
        "magicmail.co.za",
        "mahmoodweb.com",
        "mail-awu.de",
        "mail-box.cz",
        "mail-center.com",
        "mail-central.com",
        "mail-page.com",
        "mail.austria.com",
        "mail.az",
        "mail.be",
        "mail.bulgaria.com",
        "mail.byte.it",
        "mail.co.za",
        "mail.com",
        "mail.ee",
        "mail.entrepeneurmag.com",
        "mail.freetown.com",
        "mail.gr",
        "mail.hitthebeach.com",
        "mail.kmsp.com",
        "mail.md",
        "mail.nu",
        "mail.org.uk",
        "mail.pf",
        "mail.pharmacy.com",
        "mail.pt",
        "mail.r-o-o-t.com",
        "mail.ru",
        "mail.salu.net",
        "mail.sisna.com",
        "mail.spaceports.com",
        "mail.theboys.com",
        "mail.usa.com",
        "mail.vasarhely.hu",
        "mail15.com",
        "mail1st.com",
        "mail2007.com",
        "mail2aaron.com",
        "mail2abby.com",
        "mail2abc.com",
        "mail2actor.com",
        "mail2admiral.com",
        "mail2adorable.com",
        "mail2adoration.com",
        "mail2adore.com",
        "mail2adventure.com",
        "mail2aeolus.com",
        "mail2aether.com",
        "mail2affection.com",
        "mail2afghanistan.com",
        "mail2africa.com",
        "mail2agent.com",
        "mail2aha.com",
        "mail2ahoy.com",
        "mail2aim.com",
        "mail2air.com",
        "mail2airbag.com",
        "mail2airforce.com",
        "mail2airport.com",
        "mail2alabama.com",
        "mail2alan.com",
        "mail2alaska.com",
        "mail2albania.com",
        "mail2alcoholic.com",
        "mail2alec.com",
        "mail2alexa.com",
        "mail2algeria.com",
        "mail2alicia.com",
        "mail2alien.com",
        "mail2allan.com",
        "mail2allen.com",
        "mail2allison.com",
        "mail2alpha.com",
        "mail2alyssa.com",
        "mail2amanda.com",
        "mail2amazing.com",
        "mail2amber.com",
        "mail2america.com",
        "mail2american.com",
        "mail2andorra.com",
        "mail2andrea.com",
        "mail2andy.com",
        "mail2anesthesiologist.com",
        "mail2angela.com",
        "mail2angola.com",
        "mail2ann.com",
        "mail2anna.com",
        "mail2anne.com",
        "mail2anthony.com",
        "mail2anything.com",
        "mail2aphrodite.com",
        "mail2apollo.com",
        "mail2april.com",
        "mail2aquarius.com",
        "mail2arabia.com",
        "mail2arabic.com",
        "mail2architect.com",
        "mail2ares.com",
        "mail2argentina.com",
        "mail2aries.com",
        "mail2arizona.com",
        "mail2arkansas.com",
        "mail2armenia.com",
        "mail2army.com",
        "mail2arnold.com",
        "mail2art.com",
        "mail2artemus.com",
        "mail2arthur.com",
        "mail2artist.com",
        "mail2ashley.com",
        "mail2ask.com",
        "mail2astronomer.com",
        "mail2athena.com",
        "mail2athlete.com",
        "mail2atlas.com",
        "mail2atom.com",
        "mail2attitude.com",
        "mail2auction.com",
        "mail2aunt.com",
        "mail2australia.com",
        "mail2austria.com",
        "mail2azerbaijan.com",
        "mail2baby.com",
        "mail2bahamas.com",
        "mail2bahrain.com",
        "mail2ballerina.com",
        "mail2ballplayer.com",
        "mail2band.com",
        "mail2bangladesh.com",
        "mail2bank.com",
        "mail2banker.com",
        "mail2bankrupt.com",
        "mail2baptist.com",
        "mail2bar.com",
        "mail2barbados.com",
        "mail2barbara.com",
        "mail2barter.com",
        "mail2basketball.com",
        "mail2batter.com",
        "mail2beach.com",
        "mail2beast.com",
        "mail2beatles.com",
        "mail2beauty.com",
        "mail2becky.com",
        "mail2beijing.com",
        "mail2belgium.com",
        "mail2belize.com",
        "mail2ben.com",
        "mail2bernard.com",
        "mail2beth.com",
        "mail2betty.com",
        "mail2beverly.com",
        "mail2beyond.com",
        "mail2biker.com",
        "mail2bill.com",
        "mail2billionaire.com",
        "mail2billy.com",
        "mail2bio.com",
        "mail2biologist.com",
        "mail2black.com",
        "mail2blackbelt.com",
        "mail2blake.com",
        "mail2blind.com",
        "mail2blonde.com",
        "mail2blues.com",
        "mail2bob.com",
        "mail2bobby.com",
        "mail2bolivia.com",
        "mail2bombay.com",
        "mail2bonn.com",
        "mail2bookmark.com",
        "mail2boreas.com",
        "mail2bosnia.com",
        "mail2boston.com",
        "mail2botswana.com",
        "mail2bradley.com",
        "mail2brazil.com",
        "mail2breakfast.com",
        "mail2brian.com",
        "mail2bride.com",
        "mail2brittany.com",
        "mail2broker.com",
        "mail2brook.com",
        "mail2bruce.com",
        "mail2brunei.com",
        "mail2brunette.com",
        "mail2brussels.com",
        "mail2bryan.com",
        "mail2bug.com",
        "mail2bulgaria.com",
        "mail2business.com",
        "mail2buy.com",
        "mail2ca.com",
        "mail2california.com",
        "mail2calvin.com",
        "mail2cambodia.com",
        "mail2cameroon.com",
        "mail2canada.com",
        "mail2cancer.com",
        "mail2capeverde.com",
        "mail2capricorn.com",
        "mail2cardinal.com",
        "mail2cardiologist.com",
        "mail2care.com",
        "mail2caroline.com",
        "mail2carolyn.com",
        "mail2casey.com",
        "mail2cat.com",
        "mail2caterer.com",
        "mail2cathy.com",
        "mail2catlover.com",
        "mail2catwalk.com",
        "mail2cell.com",
        "mail2chad.com",
        "mail2champaign.com",
        "mail2charles.com",
        "mail2chef.com",
        "mail2chemist.com",
        "mail2cherry.com",
        "mail2chicago.com",
        "mail2chile.com",
        "mail2china.com",
        "mail2chinese.com",
        "mail2chocolate.com",
        "mail2christian.com",
        "mail2christie.com",
        "mail2christmas.com",
        "mail2christy.com",
        "mail2chuck.com",
        "mail2cindy.com",
        "mail2clark.com",
        "mail2classifieds.com",
        "mail2claude.com",
        "mail2cliff.com",
        "mail2clinic.com",
        "mail2clint.com",
        "mail2close.com",
        "mail2club.com",
        "mail2coach.com",
        "mail2coastguard.com",
        "mail2colin.com",
        "mail2college.com",
        "mail2colombia.com",
        "mail2color.com",
        "mail2colorado.com",
        "mail2columbia.com",
        "mail2comedian.com",
        "mail2composer.com",
        "mail2computer.com",
        "mail2computers.com",
        "mail2concert.com",
        "mail2congo.com",
        "mail2connect.com",
        "mail2connecticut.com",
        "mail2consultant.com",
        "mail2convict.com",
        "mail2cook.com",
        "mail2cool.com",
        "mail2cory.com",
        "mail2costarica.com",
        "mail2country.com",
        "mail2courtney.com",
        "mail2cowboy.com",
        "mail2cowgirl.com",
        "mail2craig.com",
        "mail2crave.com",
        "mail2crazy.com",
        "mail2create.com",
        "mail2croatia.com",
        "mail2cry.com",
        "mail2crystal.com",
        "mail2cuba.com",
        "mail2culture.com",
        "mail2curt.com",
        "mail2customs.com",
        "mail2cute.com",
        "mail2cutey.com",
        "mail2cynthia.com",
        "mail2cyprus.com",
        "mail2czechrepublic.com",
        "mail2dad.com",
        "mail2dale.com",
        "mail2dallas.com",
        "mail2dan.com",
        "mail2dana.com",
        "mail2dance.com",
        "mail2dancer.com",
        "mail2danielle.com",
        "mail2danny.com",
        "mail2darlene.com",
        "mail2darling.com",
        "mail2darren.com",
        "mail2daughter.com",
        "mail2dave.com",
        "mail2dawn.com",
        "mail2dc.com",
        "mail2dealer.com",
        "mail2deanna.com",
        "mail2dearest.com",
        "mail2debbie.com",
        "mail2debby.com",
        "mail2deer.com",
        "mail2delaware.com",
        "mail2delicious.com",
        "mail2demeter.com",
        "mail2democrat.com",
        "mail2denise.com",
        "mail2denmark.com",
        "mail2dennis.com",
        "mail2dentist.com",
        "mail2derek.com",
        "mail2desert.com",
        "mail2devoted.com",
        "mail2devotion.com",
        "mail2diamond.com",
        "mail2diana.com",
        "mail2diane.com",
        "mail2diehard.com",
        "mail2dilemma.com",
        "mail2dillon.com",
        "mail2dinner.com",
        "mail2dinosaur.com",
        "mail2dionysos.com",
        "mail2diplomat.com",
        "mail2director.com",
        "mail2dirk.com",
        "mail2disco.com",
        "mail2dive.com",
        "mail2diver.com",
        "mail2divorced.com",
        "mail2djibouti.com",
        "mail2doctor.com",
        "mail2doglover.com",
        "mail2dominic.com",
        "mail2dominica.com",
        "mail2dominicanrepublic.com",
        "mail2don.com",
        "mail2donald.com",
        "mail2donna.com",
        "mail2doris.com",
        "mail2dorothy.com",
        "mail2doug.com",
        "mail2dough.com",
        "mail2douglas.com",
        "mail2dow.com",
        "mail2downtown.com",
        "mail2dream.com",
        "mail2dreamer.com",
        "mail2dude.com",
        "mail2dustin.com",
        "mail2dyke.com",
        "mail2dylan.com",
        "mail2earl.com",
        "mail2earth.com",
        "mail2eastend.com",
        "mail2eat.com",
        "mail2economist.com",
        "mail2ecuador.com",
        "mail2eddie.com",
        "mail2edgar.com",
        "mail2edwin.com",
        "mail2egypt.com",
        "mail2electron.com",
        "mail2eli.com",
        "mail2elizabeth.com",
        "mail2ellen.com",
        "mail2elliot.com",
        "mail2elsalvador.com",
        "mail2elvis.com",
        "mail2emergency.com",
        "mail2emily.com",
        "mail2engineer.com",
        "mail2english.com",
        "mail2environmentalist.com",
        "mail2eos.com",
        "mail2eric.com",
        "mail2erica.com",
        "mail2erin.com",
        "mail2erinyes.com",
        "mail2eris.com",
        "mail2eritrea.com",
        "mail2ernie.com",
        "mail2eros.com",
        "mail2estonia.com",
        "mail2ethan.com",
        "mail2ethiopia.com",
        "mail2eu.com",
        "mail2europe.com",
        "mail2eurus.com",
        "mail2eva.com",
        "mail2evan.com",
        "mail2evelyn.com",
        "mail2everything.com",
        "mail2exciting.com",
        "mail2expert.com",
        "mail2fairy.com",
        "mail2faith.com",
        "mail2fanatic.com",
        "mail2fancy.com",
        "mail2fantasy.com",
        "mail2farm.com",
        "mail2farmer.com",
        "mail2fashion.com",
        "mail2fat.com",
        "mail2feeling.com",
        "mail2female.com",
        "mail2fever.com",
        "mail2fighter.com",
        "mail2fiji.com",
        "mail2filmfestival.com",
        "mail2films.com",
        "mail2finance.com",
        "mail2finland.com",
        "mail2fireman.com",
        "mail2firm.com",
        "mail2fisherman.com",
        "mail2flexible.com",
        "mail2florence.com",
        "mail2florida.com",
        "mail2floyd.com",
        "mail2fly.com",
        "mail2fond.com",
        "mail2fondness.com",
        "mail2football.com",
        "mail2footballfan.com",
        "mail2found.com",
        "mail2france.com",
        "mail2frank.com",
        "mail2frankfurt.com",
        "mail2franklin.com",
        "mail2fred.com",
        "mail2freddie.com",
        "mail2free.com",
        "mail2freedom.com",
        "mail2french.com",
        "mail2freudian.com",
        "mail2friendship.com",
        "mail2from.com",
        "mail2fun.com",
        "mail2gabon.com",
        "mail2gabriel.com",
        "mail2gail.com",
        "mail2galaxy.com",
        "mail2gambia.com",
        "mail2games.com",
        "mail2gary.com",
        "mail2gavin.com",
        "mail2gemini.com",
        "mail2gene.com",
        "mail2genes.com",
        "mail2geneva.com",
        "mail2george.com",
        "mail2georgia.com",
        "mail2gerald.com",
        "mail2german.com",
        "mail2germany.com",
        "mail2ghana.com",
        "mail2gilbert.com",
        "mail2gina.com",
        "mail2girl.com",
        "mail2glen.com",
        "mail2gloria.com",
        "mail2goddess.com",
        "mail2gold.com",
        "mail2golfclub.com",
        "mail2golfer.com",
        "mail2gordon.com",
        "mail2government.com",
        "mail2grab.com",
        "mail2grace.com",
        "mail2graham.com",
        "mail2grandma.com",
        "mail2grandpa.com",
        "mail2grant.com",
        "mail2greece.com",
        "mail2green.com",
        "mail2greg.com",
        "mail2grenada.com",
        "mail2gsm.com",
        "mail2guard.com",
        "mail2guatemala.com",
        "mail2guy.com",
        "mail2hades.com",
        "mail2haiti.com",
        "mail2hal.com",
        "mail2handhelds.com",
        "mail2hank.com",
        "mail2hannah.com",
        "mail2harold.com",
        "mail2harry.com",
        "mail2hawaii.com",
        "mail2headhunter.com",
        "mail2heal.com",
        "mail2heather.com",
        "mail2heaven.com",
        "mail2hebe.com",
        "mail2hecate.com",
        "mail2heidi.com",
        "mail2helen.com",
        "mail2hell.com",
        "mail2help.com",
        "mail2helpdesk.com",
        "mail2henry.com",
        "mail2hephaestus.com",
        "mail2hera.com",
        "mail2hercules.com",
        "mail2herman.com",
        "mail2hermes.com",
        "mail2hespera.com",
        "mail2hestia.com",
        "mail2highschool.com",
        "mail2hindu.com",
        "mail2hip.com",
        "mail2hiphop.com",
        "mail2holland.com",
        "mail2holly.com",
        "mail2hollywood.com",
        "mail2homer.com",
        "mail2honduras.com",
        "mail2honey.com",
        "mail2hongkong.com",
        "mail2hope.com",
        "mail2horse.com",
        "mail2hot.com",
        "mail2hotel.com",
        "mail2houston.com",
        "mail2howard.com",
        "mail2hugh.com",
        "mail2human.com",
        "mail2hungary.com",
        "mail2hungry.com",
        "mail2hygeia.com",
        "mail2hyperspace.com",
        "mail2hypnos.com",
        "mail2ian.com",
        "mail2ice-cream.com",
        "mail2iceland.com",
        "mail2idaho.com",
        "mail2idontknow.com",
        "mail2illinois.com",
        "mail2imam.com",
        "mail2in.com",
        "mail2india.com",
        "mail2indian.com",
        "mail2indiana.com",
        "mail2indonesia.com",
        "mail2infinity.com",
        "mail2intense.com",
        "mail2iowa.com",
        "mail2iran.com",
        "mail2iraq.com",
        "mail2ireland.com",
        "mail2irene.com",
        "mail2iris.com",
        "mail2irresistible.com",
        "mail2irving.com",
        "mail2irwin.com",
        "mail2isaac.com",
        "mail2israel.com",
        "mail2italian.com",
        "mail2italy.com",
        "mail2jackie.com",
        "mail2jacob.com",
        "mail2jail.com",
        "mail2jaime.com",
        "mail2jake.com",
        "mail2jamaica.com",
        "mail2james.com",
        "mail2jamie.com",
        "mail2jan.com",
        "mail2jane.com",
        "mail2janet.com",
        "mail2janice.com",
        "mail2japan.com",
        "mail2japanese.com",
        "mail2jasmine.com",
        "mail2jason.com",
        "mail2java.com",
        "mail2jay.com",
        "mail2jazz.com",
        "mail2jed.com",
        "mail2jeffrey.com",
        "mail2jennifer.com",
        "mail2jenny.com",
        "mail2jeremy.com",
        "mail2jerry.com",
        "mail2jessica.com",
        "mail2jessie.com",
        "mail2jesus.com",
        "mail2jew.com",
        "mail2jeweler.com",
        "mail2jim.com",
        "mail2jimmy.com",
        "mail2joan.com",
        "mail2joann.com",
        "mail2joanna.com",
        "mail2jody.com",
        "mail2joe.com",
        "mail2joel.com",
        "mail2joey.com",
        "mail2john.com",
        "mail2join.com",
        "mail2jon.com",
        "mail2jonathan.com",
        "mail2jones.com",
        "mail2jordan.com",
        "mail2joseph.com",
        "mail2josh.com",
        "mail2joy.com",
        "mail2juan.com",
        "mail2judge.com",
        "mail2judy.com",
        "mail2juggler.com",
        "mail2julian.com",
        "mail2julie.com",
        "mail2jumbo.com",
        "mail2junk.com",
        "mail2justin.com",
        "mail2justme.com",
        "mail2kansas.com",
        "mail2karate.com",
        "mail2karen.com",
        "mail2karl.com",
        "mail2karma.com",
        "mail2kathleen.com",
        "mail2kathy.com",
        "mail2katie.com",
        "mail2kay.com",
        "mail2kazakhstan.com",
        "mail2keen.com",
        "mail2keith.com",
        "mail2kelly.com",
        "mail2kelsey.com",
        "mail2ken.com",
        "mail2kendall.com",
        "mail2kennedy.com",
        "mail2kenneth.com",
        "mail2kenny.com",
        "mail2kentucky.com",
        "mail2kenya.com",
        "mail2kerry.com",
        "mail2kevin.com",
        "mail2kim.com",
        "mail2kimberly.com",
        "mail2king.com",
        "mail2kirk.com",
        "mail2kiss.com",
        "mail2kosher.com",
        "mail2kristin.com",
        "mail2kurt.com",
        "mail2kuwait.com",
        "mail2kyle.com",
        "mail2kyrgyzstan.com",
        "mail2la.com",
        "mail2lacrosse.com",
        "mail2lance.com",
        "mail2lao.com",
        "mail2larry.com",
        "mail2latvia.com",
        "mail2laugh.com",
        "mail2laura.com",
        "mail2lauren.com",
        "mail2laurie.com",
        "mail2lawrence.com",
        "mail2lawyer.com",
        "mail2lebanon.com",
        "mail2lee.com",
        "mail2leo.com",
        "mail2leon.com",
        "mail2leonard.com",
        "mail2leone.com",
        "mail2leslie.com",
        "mail2letter.com",
        "mail2liberia.com",
        "mail2libertarian.com",
        "mail2libra.com",
        "mail2libya.com",
        "mail2liechtenstein.com",
        "mail2life.com",
        "mail2linda.com",
        "mail2linux.com",
        "mail2lionel.com",
        "mail2lipstick.com",
        "mail2liquid.com",
        "mail2lisa.com",
        "mail2lithuania.com",
        "mail2litigator.com",
        "mail2liz.com",
        "mail2lloyd.com",
        "mail2lois.com",
        "mail2lola.com",
        "mail2london.com",
        "mail2looking.com",
        "mail2lori.com",
        "mail2lost.com",
        "mail2lou.com",
        "mail2louis.com",
        "mail2louisiana.com",
        "mail2lovable.com",
        "mail2love.com",
        "mail2lucky.com",
        "mail2lucy.com",
        "mail2lunch.com",
        "mail2lust.com",
        "mail2luxembourg.com",
        "mail2luxury.com",
        "mail2lyle.com",
        "mail2lynn.com",
        "mail2madagascar.com",
        "mail2madison.com",
        "mail2madrid.com",
        "mail2maggie.com",
        "mail2mail4.com",
        "mail2maine.com",
        "mail2malawi.com",
        "mail2malaysia.com",
        "mail2maldives.com",
        "mail2mali.com",
        "mail2malta.com",
        "mail2mambo.com",
        "mail2man.com",
        "mail2mandy.com",
        "mail2manhunter.com",
        "mail2mankind.com",
        "mail2many.com",
        "mail2marc.com",
        "mail2marcia.com",
        "mail2margaret.com",
        "mail2margie.com",
        "mail2marhaba.com",
        "mail2maria.com",
        "mail2marilyn.com",
        "mail2marines.com",
        "mail2mark.com",
        "mail2marriage.com",
        "mail2married.com",
        "mail2marries.com",
        "mail2mars.com",
        "mail2marsha.com",
        "mail2marshallislands.com",
        "mail2martha.com",
        "mail2martin.com",
        "mail2marty.com",
        "mail2marvin.com",
        "mail2mary.com",
        "mail2maryland.com",
        "mail2mason.com",
        "mail2massachusetts.com",
        "mail2matt.com",
        "mail2matthew.com",
        "mail2maurice.com",
        "mail2mauritania.com",
        "mail2mauritius.com",
        "mail2max.com",
        "mail2maxwell.com",
        "mail2maybe.com",
        "mail2mba.com",
        "mail2me4u.com",
        "mail2mechanic.com",
        "mail2medieval.com",
        "mail2megan.com",
        "mail2mel.com",
        "mail2melanie.com",
        "mail2melissa.com",
        "mail2melody.com",
        "mail2member.com",
        "mail2memphis.com",
        "mail2methodist.com",
        "mail2mexican.com",
        "mail2mexico.com",
        "mail2mgz.com",
        "mail2miami.com",
        "mail2michael.com",
        "mail2michelle.com",
        "mail2michigan.com",
        "mail2mike.com",
        "mail2milan.com",
        "mail2milano.com",
        "mail2mildred.com",
        "mail2milkyway.com",
        "mail2millennium.com",
        "mail2millionaire.com",
        "mail2milton.com",
        "mail2mime.com",
        "mail2mindreader.com",
        "mail2mini.com",
        "mail2minister.com",
        "mail2minneapolis.com",
        "mail2minnesota.com",
        "mail2miracle.com",
        "mail2missionary.com",
        "mail2mississippi.com",
        "mail2missouri.com",
        "mail2mitch.com",
        "mail2model.com",
        "mail2moldova.commail2molly.com",
        "mail2mom.com",
        "mail2monaco.com",
        "mail2money.com",
        "mail2mongolia.com",
        "mail2monica.com",
        "mail2montana.com",
        "mail2monty.com",
        "mail2moon.com",
        "mail2morocco.com",
        "mail2morpheus.com",
        "mail2mors.com",
        "mail2moscow.com",
        "mail2moslem.com",
        "mail2mouseketeer.com",
        "mail2movies.com",
        "mail2mozambique.com",
        "mail2mp3.com",
        "mail2mrright.com",
        "mail2msright.com",
        "mail2museum.com",
        "mail2music.com",
        "mail2musician.com",
        "mail2muslim.com",
        "mail2my.com",
        "mail2myboat.com",
        "mail2mycar.com",
        "mail2mycell.com",
        "mail2mygsm.com",
        "mail2mylaptop.com",
        "mail2mymac.com",
        "mail2mypager.com",
        "mail2mypalm.com",
        "mail2mypc.com",
        "mail2myphone.com",
        "mail2myplane.com",
        "mail2namibia.com",
        "mail2nancy.com",
        "mail2nasdaq.com",
        "mail2nathan.com",
        "mail2nauru.com",
        "mail2navy.com",
        "mail2neal.com",
        "mail2nebraska.com",
        "mail2ned.com",
        "mail2neil.com",
        "mail2nelson.com",
        "mail2nemesis.com",
        "mail2nepal.com",
        "mail2netherlands.com",
        "mail2network.com",
        "mail2nevada.com",
        "mail2newhampshire.com",
        "mail2newjersey.com",
        "mail2newmexico.com",
        "mail2newyork.com",
        "mail2newzealand.com",
        "mail2nicaragua.com",
        "mail2nick.com",
        "mail2nicole.com",
        "mail2niger.com",
        "mail2nigeria.com",
        "mail2nike.com",
        "mail2no.com",
        "mail2noah.com",
        "mail2noel.com",
        "mail2noelle.com",
        "mail2normal.com",
        "mail2norman.com",
        "mail2northamerica.com",
        "mail2northcarolina.com",
        "mail2northdakota.com",
        "mail2northpole.com",
        "mail2norway.com",
        "mail2notus.com",
        "mail2noway.com",
        "mail2nowhere.com",
        "mail2nuclear.com",
        "mail2nun.com",
        "mail2ny.com",
        "mail2oasis.com",
        "mail2oceanographer.com",
        "mail2ohio.com",
        "mail2ok.com",
        "mail2oklahoma.com",
        "mail2oliver.com",
        "mail2oman.com",
        "mail2one.com",
        "mail2onfire.com",
        "mail2online.com",
        "mail2oops.com",
        "mail2open.com",
        "mail2ophthalmologist.com",
        "mail2optometrist.com",
        "mail2oregon.com",
        "mail2oscars.com",
        "mail2oslo.com",
        "mail2painter.com",
        "mail2pakistan.com",
        "mail2palau.com",
        "mail2pan.com",
        "mail2panama.com",
        "mail2paraguay.com",
        "mail2paralegal.com",
        "mail2paris.com",
        "mail2park.com",
        "mail2parker.com",
        "mail2party.com",
        "mail2passion.com",
        "mail2pat.com",
        "mail2patricia.com",
        "mail2patrick.com",
        "mail2patty.com",
        "mail2paul.com",
        "mail2paula.com",
        "mail2pay.com",
        "mail2peace.com",
        "mail2pediatrician.com",
        "mail2peggy.com",
        "mail2pennsylvania.com",
        "mail2perry.com",
        "mail2persephone.com",
        "mail2persian.com",
        "mail2peru.com",
        "mail2pete.com",
        "mail2peter.com",
        "mail2pharmacist.com",
        "mail2phil.com",
        "mail2philippines.com",
        "mail2phoenix.com",
        "mail2phonecall.com",
        "mail2phyllis.com",
        "mail2pickup.com",
        "mail2pilot.com",
        "mail2pisces.com",
        "mail2planet.com",
        "mail2platinum.com",
        "mail2plato.com",
        "mail2pluto.com",
        "mail2pm.com",
        "mail2podiatrist.com",
        "mail2poet.com",
        "mail2poland.com",
        "mail2policeman.com",
        "mail2policewoman.com",
        "mail2politician.com",
        "mail2pop.com",
        "mail2pope.com",
        "mail2popular.com",
        "mail2portugal.com",
        "mail2poseidon.com",
        "mail2potatohead.com",
        "mail2power.com",
        "mail2presbyterian.com",
        "mail2president.com",
        "mail2priest.com",
        "mail2prince.com",
        "mail2princess.com",
        "mail2producer.com",
        "mail2professor.com",
        "mail2protect.com",
        "mail2psychiatrist.com",
        "mail2psycho.com",
        "mail2psychologist.com",
        "mail2qatar.com",
        "mail2queen.com",
        "mail2rabbi.com",
        "mail2race.com",
        "mail2racer.com",
        "mail2rachel.com",
        "mail2rage.com",
        "mail2rainmaker.com",
        "mail2ralph.com",
        "mail2randy.com",
        "mail2rap.com",
        "mail2rare.com",
        "mail2rave.com",
        "mail2ray.com",
        "mail2raymond.com",
        "mail2realtor.com",
        "mail2rebecca.com",
        "mail2recruiter.com",
        "mail2recycle.com",
        "mail2redhead.com",
        "mail2reed.com",
        "mail2reggie.com",
        "mail2register.com",
        "mail2rent.com",
        "mail2republican.com",
        "mail2resort.com",
        "mail2rex.com",
        "mail2rhodeisland.com",
        "mail2rich.com",
        "mail2richard.com",
        "mail2ricky.com",
        "mail2ride.com",
        "mail2riley.com",
        "mail2rita.com",
        "mail2rob.com",
        "mail2robert.com",
        "mail2roberta.com",
        "mail2robin.com",
        "mail2rock.com",
        "mail2rocker.com",
        "mail2rod.com",
        "mail2rodney.com",
        "mail2romania.com",
        "mail2rome.com",
        "mail2ron.com",
        "mail2ronald.com",
        "mail2ronnie.com",
        "mail2rose.com",
        "mail2rosie.com",
        "mail2roy.com",
        "mail2rudy.com",
        "mail2rugby.com",
        "mail2runner.com",
        "mail2russell.com",
        "mail2russia.com",
        "mail2russian.com",
        "mail2rusty.com",
        "mail2ruth.com",
        "mail2rwanda.com",
        "mail2ryan.com",
        "mail2sa.com",
        "mail2sabrina.com",
        "mail2safe.com",
        "mail2sagittarius.com",
        "mail2sail.com",
        "mail2sailor.com",
        "mail2sal.com",
        "mail2salaam.com",
        "mail2sam.com",
        "mail2samantha.com",
        "mail2samoa.com",
        "mail2samurai.com",
        "mail2sandra.com",
        "mail2sandy.com",
        "mail2sanfrancisco.com",
        "mail2sanmarino.com",
        "mail2santa.com",
        "mail2sara.com",
        "mail2sarah.com",
        "mail2sat.com",
        "mail2saturn.com",
        "mail2saudi.com",
        "mail2saudiarabia.com",
        "mail2save.com",
        "mail2savings.com",
        "mail2school.com",
        "mail2scientist.com",
        "mail2scorpio.com",
        "mail2scott.com",
        "mail2sean.com",
        "mail2search.com",
        "mail2seattle.com",
        "mail2secretagent.com",
        "mail2senate.com",
        "mail2senegal.com",
        "mail2sensual.com",
        "mail2seth.com",
        "mail2sevenseas.com",
        "mail2sexy.com",
        "mail2seychelles.com",
        "mail2shane.com",
        "mail2sharon.com",
        "mail2shawn.com",
        "mail2ship.com",
        "mail2shirley.com",
        "mail2shoot.com",
        "mail2shuttle.com",
        "mail2sierraleone.com",
        "mail2simon.com",
        "mail2singapore.com",
        "mail2single.com",
        "mail2site.com",
        "mail2skater.com",
        "mail2skier.com",
        "mail2sky.com",
        "mail2sleek.com",
        "mail2slim.com",
        "mail2slovakia.com",
        "mail2slovenia.com",
        "mail2smile.com",
        "mail2smith.com",
        "mail2smooth.com",
        "mail2soccer.com",
        "mail2soccerfan.com",
        "mail2socialist.com",
        "mail2soldier.com",
        "mail2somalia.com",
        "mail2son.com",
        "mail2song.com",
        "mail2sos.com",
        "mail2sound.com",
        "mail2southafrica.com",
        "mail2southamerica.com",
        "mail2southcarolina.com",
        "mail2southdakota.com",
        "mail2southkorea.com",
        "mail2southpole.com",
        "mail2spain.com",
        "mail2spanish.com",
        "mail2spare.com",
        "mail2spectrum.com",
        "mail2splash.com",
        "mail2sponsor.com",
        "mail2sports.com",
        "mail2srilanka.com",
        "mail2stacy.com",
        "mail2stan.com",
        "mail2stanley.com",
        "mail2star.com",
        "mail2state.com",
        "mail2stephanie.com",
        "mail2steve.com",
        "mail2steven.com",
        "mail2stewart.com",
        "mail2stlouis.com",
        "mail2stock.com",
        "mail2stockholm.com",
        "mail2stockmarket.com",
        "mail2storage.com",
        "mail2store.com",
        "mail2strong.com",
        "mail2student.com",
        "mail2studio.com",
        "mail2studio54.com",
        "mail2stuntman.com",
        "mail2subscribe.com",
        "mail2sudan.com",
        "mail2superstar.com",
        "mail2surfer.com",
        "mail2suriname.com",
        "mail2susan.com",
        "mail2suzie.com",
        "mail2swaziland.com",
        "mail2sweden.com",
        "mail2sweetheart.com",
        "mail2swim.com",
        "mail2swimmer.com",
        "mail2swiss.com",
        "mail2switzerland.com",
        "mail2sydney.com",
        "mail2sylvia.com",
        "mail2syria.com",
        "mail2taboo.com",
        "mail2taiwan.com",
        "mail2tajikistan.com",
        "mail2tammy.com",
        "mail2tango.com",
        "mail2tanya.com",
        "mail2tanzania.com",
        "mail2tara.com",
        "mail2taurus.com",
        "mail2taxi.com",
        "mail2taxidermist.com",
        "mail2taylor.com",
        "mail2taz.com",
        "mail2teacher.com",
        "mail2technician.com",
        "mail2ted.com",
        "mail2telephone.com",
        "mail2teletubbie.com",
        "mail2tenderness.com",
        "mail2tennessee.com",
        "mail2tennis.com",
        "mail2tennisfan.com",
        "mail2terri.com",
        "mail2terry.com",
        "mail2test.com",
        "mail2texas.com",
        "mail2thailand.com",
        "mail2therapy.com",
        "mail2think.com",
        "mail2tickets.com",
        "mail2tiffany.com",
        "mail2tim.com",
        "mail2time.com",
        "mail2timothy.com",
        "mail2tina.com",
        "mail2titanic.com",
        "mail2toby.com",
        "mail2todd.com",
        "mail2togo.com",
        "mail2tom.com",
        "mail2tommy.com",
        "mail2tonga.com",
        "mail2tony.com",
        "mail2touch.com",
        "mail2tourist.com",
        "mail2tracey.com",
        "mail2tracy.com",
        "mail2tramp.com",
        "mail2travel.com",
        "mail2traveler.com",
        "mail2travis.com",
        "mail2trekkie.com",
        "mail2trex.com",
        "mail2triallawyer.com",
        "mail2trick.com",
        "mail2trillionaire.com",
        "mail2troy.com",
        "mail2truck.com",
        "mail2trump.com",
        "mail2try.com",
        "mail2tunisia.com",
        "mail2turbo.com",
        "mail2turkey.com",
        "mail2turkmenistan.com",
        "mail2tv.com",
        "mail2tycoon.com",
        "mail2tyler.com",
        "mail2u4me.com",
        "mail2uae.com",
        "mail2uganda.com",
        "mail2uk.com",
        "mail2ukraine.com",
        "mail2uncle.com",
        "mail2unsubscribe.com",
        "mail2uptown.com",
        "mail2uruguay.com",
        "mail2usa.com",
        "mail2utah.com",
        "mail2uzbekistan.com",
        "mail2v.com",
        "mail2vacation.com",
        "mail2valentines.com",
        "mail2valerie.com",
        "mail2valley.com",
        "mail2vamoose.com",
        "mail2vanessa.com",
        "mail2vanuatu.com",
        "mail2venezuela.com",
        "mail2venous.com",
        "mail2venus.com",
        "mail2vermont.com",
        "mail2vickie.com",
        "mail2victor.com",
        "mail2victoria.com",
        "mail2vienna.com",
        "mail2vietnam.com",
        "mail2vince.com",
        "mail2virginia.com",
        "mail2virgo.com",
        "mail2visionary.com",
        "mail2vodka.com",
        "mail2volleyball.com",
        "mail2waiter.com",
        "mail2wallstreet.com",
        "mail2wally.com",
        "mail2walter.com",
        "mail2warren.com",
        "mail2washington.com",
        "mail2wave.com",
        "mail2way.com",
        "mail2waycool.com",
        "mail2wayne.com",
        "mail2webmaster.com",
        "mail2webtop.com",
        "mail2webtv.com",
        "mail2weird.com",
        "mail2wendell.com",
        "mail2wendy.com",
        "mail2westend.com",
        "mail2westvirginia.com",
        "mail2whether.com",
        "mail2whip.com",
        "mail2white.com",
        "mail2whitehouse.com",
        "mail2whitney.com",
        "mail2why.com",
        "mail2wilbur.com",
        "mail2wild.com",
        "mail2willard.com",
        "mail2willie.com",
        "mail2wine.com",
        "mail2winner.com",
        "mail2wired.com",
        "mail2wisconsin.com",
        "mail2woman.com",
        "mail2wonder.com",
        "mail2world.com",
        "mail2worship.com",
        "mail2wow.com",
        "mail2www.com",
        "mail2wyoming.com",
        "mail2xfiles.com",
        "mail2xox.com",
        "mail2yachtclub.com",
        "mail2yahalla.com",
        "mail2yemen.com",
        "mail2yes.com",
        "mail2yugoslavia.com",
        "mail2zack.com",
        "mail2zambia.com",
        "mail2zenith.com",
        "mail2zephir.com",
        "mail2zeus.com",
        "mail2zipper.com",
        "mail2zoo.com",
        "mail2zoologist.com",
        "mail2zurich.com",
        "mail3000.com",
        "mail333.com",
        "mailandftp.com",
        "mailandnews.com",
        "mailas.com",
        "mailasia.com",
        "mailbolt.com",
        "mailbomb.net",
        "mailboom.com",
        "mailbox.as",
        "mailbox.co.za",
        "mailbox.gr",
        "mailbox.hu",
        "mailbr.com.br",
        "mailc.net",
        "mailcan.com",
        "mailcc.com",
        "mailchoose.co",
        "mailcity.com",
        "mailclub.fr",
        "mailclub.net",
        "mailexcite.com",
        "mailforce.net",
        "mailftp.com",
        "mailgate.gr",
        "mailgenie.net",
        "mailhaven.com",
        "mailhood.com",
        "mailingweb.com",
        "mailisent.com",
        "mailite.com",
        "mailme.dk",
        "mailmight.com",
        "mailmij.nl",
        "mailnew.com",
        "mailops.com",
        "mailoye.com",
        "mailpanda.com",
        "mailpost.zzn.com",
        "mailpride.com",
        "mailpuppy.com",
        "mailroom.com",
        "mailru.com",
        "mailsent.net",
        "mailshuttle.com",
        "mailstart.com",
        "mailstartplus.com",
        "mailsurf.com",
        "mailtag.com",
        "mailto.de",
        "mailup.net",
        "mailwire.com",
        "maktoob.com",
        "malayalamtelevision.net",
        "manager.de",
        "mantrafreenet.com",
        "mantramail.com",
        "mantraonline.com",
        "marchmail.com",
        "mariah-carey.ml.org",
        "mariahc.com",
        "marijuana.nl",
        "marketing.lu",
        "married-not.com",
        "marsattack.com",
        "martindalemail.com",
        "masrawy.com",
        "matmail.com",
        "mauimail.com",
        "mauritius.com",
        "maxleft.com",
        "maxmail.co.uk",
        "mbox.com.au",
        "me-mail.hu",
        "me.com",
        "medical.net.au",
        "medmail.com",
        "medscape.com",
        "meetingmall.com",
        "megago.com",
        "megamail.pt",
        "megapoint.com",
        "mehrani.com",
        "mehtaweb.com",
        "mekhong.com",
        "melodymail.com",
        "meloo.com",
        "members.student.com",
        "message.hu",
        "messages.to",
        "metacrawler.com",
        "metalfan.com",
        "metta.lk",
        "miatadriver.com",
        "miesto.sk",
        "mighty.co.za",
        "miho-nakayama.com",
        "mikrotamanet.com",
        "millionaireintraining.com",
        "milmail.com",
        "mindless.com",
        "mindspring.com",
        "mini-mail.com",
        "misery.net",
        "mittalweb.com",
        "mixmail.com",
        "mjfrogmail.com",
        "ml1.net",
        "mobilbatam.com",
        "mochamail.com",
        "mohammed.com",
        "moldova.cc",
        "moldova.com",
        "moldovacc.com",
        "money.net",
        "montevideo.com.uy",
        "moonman.com",
        "moose-mail.com",
        "mortaza.com",
        "mosaicfx.com",
        "most-wanted.com",
        "mostlysunny.com",
        "motormania.com",
        "movemail.com",
        "movieluver.com",
        "mp4.it",
        "mr-potatohead.com",
        "mrpost.com",
        "mscold.com",
        "msgbox.com",
        "msn.com",
        "mttestdriver.com",
        "mundomail.net",
        "munich.com",
        "music.com",
        "musician.org",
        "musicscene.org",
        "mybox.it",
        "mycabin.com",
        "mycampus.com",
        "mycity.com",
        "mycool.com",
        "mydomain.com",
        "mydotcomaddress.com",
        "myfamily.com",
        "mygo.com",
        "myiris.com",
        "mynamedot.com",
        "mynetaddress.com",
        "myownemail.com",
        "myownfriends.com",
        "mypad.com",
        "mypersonalemail.com",
        "myplace.com",
        "myrealbox.com",
        "myremarq.com",
        "myself.com",
        "mystupidjob.com",
        "mythirdage.com",
        "myway.com",
        "myworldmail.com",
        "n2.com",
        "n2business.com",
        "n2mail.com",
        "n2software.com",
        "nabc.biz",
        "nafe.com",
        "nagpal.net",
        "nakedgreens.com",
        "name.com",
        "nameplanet.com",
        "nandomail.com",
        "naplesnews.net",
        "naseej.com",
        "nativestar.net",
        "nativeweb.net",
        "naui.net",
        "navigator.lv",
        "navy.org",
        "naz.com",
        "nchoicemail.com",
        "neeva.net",
        "nemra1.com",
        "nenter.com",
        "neo.rr.com",
        "nervhq.org",
        "net-pager.net",
        "net4b.pt",
        "net4you.at",
        "netbounce.com",
        "netbroadcaster.com",
        "netby.dk",
        "netcenter-vn.net",
        "netcourrier.com",
        "netexecutive.com",
        "netexpressway.com",
        "netgenie.com",
        "netian.com",
        "netizen.com.ar",
        "netlane.com",
        "netlimit.com",
        "netmanor.com",
        "netmongol.com",
        "netnet.com.sg",
        "netpiper.com",
        "netposta.net",
        "netradiomail.com",
        "netralink.com",
        "netscape.net",
        "netscapeonline.co.uk",
        "netspeedway.com",
        "netsquare.com",
        "netster.com",
        "nettaxi.com",
        "netzero.com",
        "netzero.net",
        "newmail.com",
        "newmail.net",
        "newmail.ru",
        "newyork.com",
        "nexxmail.com",
        "nfmail.com",
        "nhmail.com",
        "nicebush.com",
        "nicegal.com",
        "nicholastse.net",
        "nicolastse.com",
        "nightmail.com",
        "nikopage.com",
        "nimail.com",
        "nirvanafan.com",
        "noavar.com",
        "norika-fujiwara.com",
        "norikomail.com",
        "northgates.net",
        "nospammail.net",
        "ntscan.com",
        "ny.com",
        "nyc.com",
        "nycmail.com",
        "nzoomail.com",
        "o-tay.com",
        "o2.co.uk",
        "oaklandas-fan.com",
        "oceanfree.net",
        "oddpost.com",
        "odmail.com",
        "office-email.com",
        "officedomain.com",
        "offroadwarrior.com",
        "oicexchange.com",
        "okbank.com",
        "okhuman.com",
        "okmad.com",
        "okmagic.com",
        "okname.net",
        "okuk.com",
        "oldies1041.com",
        "oldies104mail.com",
        "ole.com",
        "olemail.com",
        "olympist.net",
        "omaninfo.com",
        "onebox.com",
        "onenet.com.ar",
        "onet.pl",
        "oninet.pt",
        "online.ie",
        "onlinewiz.com",
        "onmilwaukee.com",
        "onobox.com",
        "onvillage.com",
        "operafan.com",
        "operamail.com",
        "optician.com",
        "optonline.net",
        "optusnet.com.au",
        "orbitel.bg",
        "orgmail.net",
        "osite.com.br",
        "oso.com",
        "otakumail.com",
        "our-computer.com",
        "our-office.com",
        "our.st",
        "ourbrisbane.com",
        "ournet.md",
        "outel.com",
        "outgun.com",
        "over-the-rainbow.com",
        "ownmail.net",
        "ozbytes.net.au",
        "ozemail.com.au",
        "pacbell.net",
        "pacific-re.com",
        "packersfan.com",
        "pagina.de",
        "pagons.org",
        "pakistanoye.com",
        "palestinemail.com",
        "parkjiyoon.com",
        "parrot.com",
        "parsmail.com",
        "partlycloudy.com",
        "partynight.at",
        "parvazi.com",
        "passwordmail.com",
        "pathfindermail.com",
        "pconnections.net",
        "pcpostal.com",
        "pcsrock.com",
        "peachworld.com",
        "pediatrician.com",
        "pemail.net",
        "penpen.com",
        "peoplepc.com",
        "peopleweb.com",
        "perfectmail.com",
        "personal.ro",
        "personales.com",
        "petml.com",
        "pettypool.com",
        "pezeshkpour.com",
        "phayze.com",
        "phreaker.net",
        "pickupman.com",
        "picusnet.com",
        "pigpig.net",
        "pinoymail.com",
        "piracha.net",
        "pisem.net",
        "planet-mail.com",
        "planetaccess.com",
        "planetall.com",
        "planetarymotion.net",
        "planetdirect.com",
        "planetearthinter.net",
        "planetout.com",
        "plasa.com",
        "playersodds.com",
        "playful.com",
        "plusmail.com.br",
        "pmail.net",
        "pobox.hu",
        "pobox.sk",
        "pochta.ru",
        "poczta.fm",
        "poetic.com",
        "polbox.com",
        "policeoffice.com",
        "pool-sharks.com",
        "poond.com",
        "popaccount.com",
        "popmail.com",
        "popsmail.com",
        "popstar.com",
        "populus.net",
        "portableoffice.com",
        "portugalmail.com",
        "portugalmail.pt",
        "portugalnet.com",
        "positive-thinking.com",
        "post.com",
        "post.cz",
        "post.sk",
        "posta.net",
        "posta.ro",
        "postaccesslite.com",
        "postafree.com",
        "postaweb.com",
        "postinbox.com",
        "postino.ch",
        "postmark.net",
        "postmaster.co.uk",
        "postpro.net",
        "pousa.com",
        "powerfan.com",
        "praize.com",
        "premiumservice.com",
        "presidency.com",
        "press.co.jp",
        "priest.com",
        "primposta.com",
        "primposta.hu",
        "pro.hu",
        "probemail.com",
        "prodigy.net",
        "progetplus.it",
        "programmer.net",
        "programozo.hu",
        "proinbox.com",
        "project2k.com",
        "prolaunch.com",
        "promessage.com",
        "prontomail.com",
        "psv-supporter.com",
        "ptd.net",
        "public.usa.com",
        "publicist.com",
        "pulp-fiction.com",
        "punkass.com",
        "qatarmail.com",
        "qprfans.com",
        "qrio.com",
        "quackquack.com",
        "quakemail.com",
        "qudsmail.com",
        "quepasa.com",
        "quickwebmail.com",
        "quiklinks.com",
        "quikmail.com",
        "qwest.net",
        "qwestoffice.net",
        "r-o-o-t.com",
        "raakim.com",
        "racedriver.com",
        "racefanz.com",
        "racingfan.com.au",
        "racingmail.com",
        "radicalz.com",
        "ragingbull.com",
        "ranmamail.com",
        "rastogi.net",
        "ratt-n-roll.com",
        "rattle-snake.com",
        "ravearena.com",
        "ravemail.com",
        "razormail.com",
        "rccgmail.org",
        "realemail.net",
        "reallyfast.biz",
        "realradiomail.com",
        "recycler.com",
        "rediffmail.com",
        "rediffmailpro.com",
        "rednecks.com",
        "redseven.de",
        "redsfans.com",
        "reggafan.com",
        "registerednurses.com",
        "repairman.com",
        "reply.hu",
        "representative.com",
        "rescueteam.com",
        "resumemail.com",
        "rezai.com",
        "richmondhill.com",
        "rickymail.com",
        "rin.ru",
        "riopreto.com.br",
        "rn.com",
        "roadrunner.com",
        "roanokemail.com",
        "rock.com",
        "rocketmail.com",
        "rockfan.com",
        "rodrun.com",
        "rome.com",
        "roosh.com",
        "rotfl.com",
        "roughnet.com",
        "rr.com",
        "rrohio.com",
        "rsub.com",
        "rubyridge.com",
        "runbox.com",
        "rushpost.com",
        "ruttolibero.com",
        "rvshop.com",
        "s-mail.com",
        "sabreshockey.com",
        "sacbeemail.com",
        "safarimail.com",
        "safe-mail.net",
        "sagra.lu",
        "sailormoon.com",
        "saintly.com",
        "saintmail.net",
        "sale-sale-sale.com",
        "salehi.net",
        "samerica.com",
        "samilan.net",
        "sammimail.com",
        "sanfranmail.com",
        "sanook.com",
        "sapo.pt",
        "sativa.ro.org",
        "saudia.com",
        "sayhi.net",
        "sbcglobal.net",
        "scandalmail.com",
        "schizo.com",
        "schoolemail.com",
        "schoolmail.com",
        "schoolsucks.com",
        "schweiz.org",
        "sci.fi",
        "science.com.au",
        "scientist.com",
        "scifianime.com",
        "scottishmail.co.uk",
        "scubadiving.com",
        "seanet.com",
        "searchwales.com",
        "sebil.com",
        "secret-police.com",
        "secretservices.net",
        "seductive.com",
        "seekstoyboy.com",
        "seguros.com.br",
        "send.hu",
        "sendme.cz",
        "sent.com",
        "sentrismail.com",
        "serga.com.ar",
        "servemymail.com",
        "sesmail.com",
        "sexmagnet.com",
        "seznam.cz",
        "shahweb.net",
        "shaniastuff.com",
        "sharewaredevelopers.com",
        "sharmaweb.com",
        "she.com",
        "shootmail.com",
        "shotgun.hu",
        "shuf.com",
        "sialkotcity.com",
        "sialkotian.com",
        "sialkotoye.com",
        "sify.com",
        "silkroad.net",
        "sinamail.com",
        "singapore.com",
        "singmail.com",
        "singnet.com.sg",
        "singpost.com",
        "skafan.com",
        "skim.com",
        "skizo.hu",
        "slamdunkfan.com",
        "slingshot.com",
        "slo.net",
        "slotter.com",
        "smapxsmap.net",
        "smileyface.comsmithemail.net",
        "smoothmail.com",
        "snail-mail.net",
        "snail-mail.ney",
        "snakemail.com",
        "sndt.net",
        "sneakemail.com",
        "snet.net",
        "sniper.hu",
        "snoopymail.com",
        "snowboarding.com",
        "snowdonia.net",
        "socamail.com",
        "socceramerica.net",
        "soccermail.com",
        "soccermomz.com",
        "sociologist.com",
        "softhome.net",
        "sol.dk",
        "soldier.hu",
        "soon.com",
        "soulfoodcookbook.com",
        "sp.nl",
        "space-bank.com",
        "space-man.com",
        "space-ship.com",
        "space-travel.com",
        "space.com",
        "spaceart.com",
        "spacebank.com",
        "spacemart.com",
        "spacetowns.com",
        "spacewar.com",
        "spamex.com",
        "spartapiet.com",
        "spazmail.com",
        "speedemail.net",
        "speedpost.net",
        "speedrules.com",
        "speedrulz.com",
        "spils.com",
        "spinfinder.com",
        "sportemail.com",
        "sportsmail.com",
        "sporttruckdriver.com",
        "spray.no",
        "spray.se",
        "spymac.com",
        "srilankan.net",
        "st-davids.net",
        "stade.fr",
        "stalag13.com",
        "stargateradio.com",
        "starmail.com",
        "starmail.org",
        "starmedia.com",
        "starplace.com",
        "starspath.com",
        "start.com.au",
        "starting-point.com",
        "startrekmail.com",
        "stealthmail.com",
        "stockracer.com",
        "stones.com",
        "stopdropandroll.com",
        "storksite.com",
        "stribmail.com",
        "strompost.com",
        "strongguy.com",
        "studentcenter.org",
        "subnetwork.com",
        "subram.com",
        "sudanmail.net",
        "suhabi.com",
        "suisse.org",
        "sukhumvit.net",
        "sunpoint.net",
        "sunrise-sunset.com",
        "sunsgame.com",
        "sunumail.sn",
        "superdada.com",
        "supereva.it",
        "supermail.ru",
        "surat.com",
        "surf3.net",
        "surfree.com",
        "surfy.net",
        "surimail.com",
        "survivormail.com",
        "swbell.net",
        "sweb.cz",
        "swiftdesk.com",
        "swingeasyhithard.com",
        "swingfan.com",
        "swipermail.zzn.com",
        "swirve.com",
        "swissinfo.org",
        "swissmail.net",
        "switchboardmail.com",
        "switzerland.org",
        "sx172.com",
        "syom.com",
        "syriamail.com",
        "t2mail.com",
        "takuyakimura.com",
        "talk21.com",
        "talkcity.com",
        "tamil.com",
        "tampabay.rr.com",
        "tatanova.com",
        "tbwt.com",
        "tds.net",
        "teamdiscovery.com",
        "teamtulsa.net",
        "tech4peace.org",
        "techemail.com",
        "techie.com",
        "technisamail.co.za",
        "technologist.com",
        "techpointer.com",
        "techscout.com",
        "techseek.com",
        "techspot.com",
        "teenagedirtbag.com",
        "telebot.com",
        "telebot.net",
        "teleline.es",
        "telerymd.com",
        "teleserve.dynip.com",
        "telinco.net",
        "telkom.net",
        "telpage.net",
        "temtulsa.net",
        "tenchiclub.com",
        "tenderkiss.com",
        "tennismail.com",
        "terra.cl",
        "terra.com",
        "terra.com.ar",
        "terra.com.br",
        "terra.es",
        "tfanus.com.er",
        "tfz.net",
        "thai.com",
        "thaimail.com",
        "thaimail.net",
        "the-african.com",
        "the-airforce.com",
        "the-aliens.com",
        "the-american.com",
        "the-animal.com",
        "the-army.com",
        "the-astronaut.com",
        "the-beauty.com",
        "the-big-apple.com",
        "the-biker.com",
        "the-boss.com",
        "the-brazilian.com",
        "the-canadian.com",
        "the-canuck.com",
        "the-captain.com",
        "the-chinese.com",
        "the-country.com",
        "the-cowboy.com",
        "the-davis-home.com",
        "the-dutchman.com",
        "the-eagles.com",
        "the-englishman.com",
        "the-fastest.net",
        "the-fool.com",
        "the-frenchman.com",
        "the-galaxy.net",
        "the-genius.com",
        "the-gentleman.com",
        "the-german.com",
        "the-gremlin.com",
        "the-hooligan.com",
        "the-italian.com",
        "the-japanese.com",
        "the-lair.com",
        "the-madman.com",
        "the-mailinglist.com",
        "the-marine.com",
        "the-master.com",
        "the-mexican.com",
        "the-ministry.com",
        "the-monkey.com",
        "the-newsletter.net",
        "the-pentagon.com",
        "the-police.com",
        "the-prayer.com",
        "the-professional.com",
        "the-quickest.com",
        "the-russian.com",
        "the-snake.com",
        "the-spaceman.com",
        "the-stock-market.com",
        "the-student.net",
        "the-whitehouse.net",
        "the-wild-west.com",
        "the18th.com",
        "thecoolguy.com",
        "thecriminals.com",
        "thedoghousemail.com",
        "thedorm.com",
        "theend.hu",
        "theglobe.com",
        "thegolfcourse.com",
        "thegooner.com",
        "theheadoffice.com",
        "thelanddownunder.com",
        "themillionare.net",
        "theoffice.net",
        "thepokerface.com",
        "thepostmaster.net",
        "theraces.com",
        "theracetrack.com",
        "thestreetfighter.com",
        "theteebox.com",
        "thewatercooler.com",
        "thewebpros.co.uk",
        "thewizzard.com",
        "thewizzkid.com",
        "thezhangs.net",
        "thirdage.com",
        "thisgirl.com",
        "thoic.com",
        "thundermail.com",
        "tidni.com",
        "timein.net",
        "tiscali.at",
        "tiscali.be",
        "tiscali.co.uk",
        "tiscali.lu",
        "tiscali.se",
        "tkcity.com",
        "toolsource.com",
        "topchat.com",
        "topgamers.co.uk",
        "topletter.com",
        "topmail.com.ar",
        "topsurf.com",
        "topteam.bg",
        "torchmail.com",
        "totalmusic.net",
        "toughguy.net",
        "tpg.com.au",
        "travel.li",
        "trialbytrivia.com",
        "tritium.net",
        "trmailbox.com",
        "tropicalstorm.com",
        "truckers.com",
        "truckerz.com",
        "truckracer.com",
        "trust-me.com",
        "tsamail.co.za",
        "ttml.co.in",
        "tunisiamail.com",
        "turkey.com",
        "twinstarsmail.com",
        "tycoonmail.com",
        "typemail.com",
        "u2club.com",
        "uae.ac",
        "uaemail.com",
        "ubbi.com",
        "ubbi.com.br",
        "uboot.com",
        "uk2k.com",
        "uk2net.com",
        "uk7.net",
        "uk8.net",
        "ukbuilder.com",
        "ukcool.com",
        "ukdreamcast.com",
        "ukmail.org",
        "ukmax.com",
        "ukr.net",
        "uku.co.uk",
        "ultapulta.com",
        "ultrapostman.com",
        "ummah.org",
        "umpire.com",
        "unbounded.com",
        "unforgettable.com",
        "uni.de",
        "unican.es",
        "unihome.com",
        "universal.pt",
        "uno.ee",
        "uno.it",
        "unofree.it",
        "unomail.com",
        "uol.com.ar",
        "uol.com.br",
        "uol.com.co",
        "uol.com.mx",
        "uol.com.ve",
        "uole.com",
        "uole.com.ve",
        "uolmail.com",
        "uomail.com",
        "upf.org",
        "ureach.com",
        "urgentmail.biz",
        "usa.com",
        "usa.net",
        "usaaccess.net",
        "usanetmail.com",
        "usermail.com",
        "usma.net",
        "usmc.net",
        "uswestmail.net",
        "uymail.com",
        "uyuyuy.com",
        "v-sexi.com",
        "vahoo.com",
        "varbizmail.com",
        "vcmail.com",
        "velnet.co.uk",
        "velocall.com",
        "verizon.net",
        "verizonmail.com",
        "veryfast.biz",
        "veryspeedy.net",
        "violinmakers.co.uk",
        "vip.gr",
        "vipmail.ru",
        "virgilio.it",
        "virgin.net",
        "virtualactive.com",
        "virtualmail.com",
        "visitmail.com",
        "visitweb.com",
        "visto.com",
        "visualcities.com",
        "vivavelocity.com",
        "vivianhsu.net",
        "vjmail.com",
        "vjtimail.com",
        "vlmail.com",
        "vnn.vn",
        "volcanomail.com",
        "vote-democrats.com",
        "vote-hillary.com",
        "vote-republicans.com",
        "vote4gop.org",
        "votenet.com",
        "vr9.com",
        "w3.to",
        "wahoye.com",
        "wales2000.net",
        "wam.co.za",
        "wanadoo.es",
        "warmmail.com",
        "warpmail.net",
        "warrior.hu",
        "waumail.com",
        "wbdet.com",
        "wearab.net",
        "web-mail.com.ar",
        "web-police.com",
        "web.de",
        "webave.com",
        "webcammail.com",
        "webcity.ca",
        "webdream.com",
        "webinbox.com",
        "webindia123.com",
        "webjump.com",
        "webmail.bellsouth.net",
        "webmail.co.yu",
        "webmail.co.za",
        "webmail.hu",
        "webmails.com",
        "webprogramming.com",
        "webstation.com",
        "websurfer.co.za",
        "webtopmail.com",
        "weedmail.com",
        "weekmail.com",
        "weekonline.com",
        "wehshee.com",
        "welsh-lady.com",
        "whale-mail.com",
        "whartontx.com",
        "wheelweb.com",
        "whipmail.com",
        "whoever.com",
        "whoopymail.com",
        "wickedmail.com",
        "wideopenwest.com",
        "wildmail.com",
        "windrivers.net",
        "windstream.net",
        "wingnutz.com",
        "winmail.com.au",
        "winning.com",
        "witty.com",
        "wiz.cc",
        "wkbwmail.com",
        "woh.rr.com",
        "wolf-web.com",
        "wombles.com",
        "wonder-net.com",
        "wongfaye.com",
        "wooow.it",
        "workmail.com",
        "worldemail.com",
        "worldmailer.com",
        "worldnet.att.net",
        "wosaddict.com",
        "wouldilie.com",
        "wowgirl.com",
        "wowmail.com",
        "wowway.com",
        "wp.pl",
        "wptamail.com",
        "wrestlingpages.com",
        "wrexham.net",
        "writeme.com",
        "writemeback.com",
        "wrongmail.com",
        "wtvhmail.com",
        "wwdg.com",
        "www.com",
        "www2000.net",
        "wx88.net",
        "wxs.net",
        "wyrm.supernews.com",
        "x-mail.net",
        "x-networks.net",
        "x5g.com",
        "xmastime.com",
        "xmsg.com",
        "xoom.com",
        "xoommail.com",
        "xpressmail.zzn.com",
        "xsmail.com",
        "xuno.com",
        "xzapmail.com",
        "yada-yada.com",
        "yaho.com",
        "yahoo.ca",
        "yahoo.co.in",
        "yahoo.co.jp",
        "yahoo.co.kr",
        "yahoo.co.nz",
        "yahoo.co.uk",
        "yahoo.com",
        "yahoo.com.ar",
        "yahoo.com.au",
        "yahoo.com.br",
        "yahoo.com.cn",
        "yahoo.com.hk",
        "yahoo.com.is",
        "yahoo.com.mx",
        "yahoo.com.ru",
        "yahoo.com.sg",
        "yahoo.de",
        "yahoo.dk",
        "yahoo.es",
        "yahoo.fr",
        "yahoo.ie",
        "yahoo.it",
        "yahoo.jp",
        "yahoo.ru",
        "yahoo.se",
        "yahoofs.com",
        "yalla.com",
        "yalla.com.lb",
        "yalook.com",
        "yam.com",
        "yandex.ru",
        "yapost.com",
        "yawmail.com",
        "yclub.com",
        "yebox.com",
        "yehaa.com",
        "yehey.com",
        "yemenmail.com",
        "yepmail.net",
        "yesbox.net",
        "yifan.net",
        "ymail.com",
        "ynnmail.com",
        "yogotemail.com",
        "yopolis.com",
        "youareadork.com",
        "youpy.com",
        "your-house.com",
        "yourinbox.com",
        "yourlover.net",
        "yourname.ddns.org",
        "yourname.freeservers.com",
        "yournightmare.com",
        "yours.com",
        "yourssincerely.com",
        "yoursubdomain.findhere.com",
        "yoursubdomain.zzn.com",
        "yourteacher.net",
        "yourwap.com",
        "youvegotmail.net",
        "yuuhuu.net",
        "yyhmail.com",
        "zahadum.com",
        "zcities.com",
        "zdnetmail.com",
        "zeeks.com",
        "zeepost.nl",
        "zensearch.net",
        "zhaowei.net",
        "zionweb.org",
        "zip.net",
        "zipido.com",
        "ziplip.com",
        "zipmail.com",
        "zipmail.com.br",
        "zipmax.com",
        "zmail.ru",
        "zonnet.nl",
        "zoominternet.net",
        "zubee.com",
        "zuvio.com",
        "zuzzurello.com",
        "zwallet.com",
        "zybermail.com",
        "zydecofan.com",
        "zzn.com",
        "zzom.co.uk"
    ]


}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));

var logThis = function(throwLog) {
    if (INFORMA.Configs.debug) {
        for (var i = 0; i < arguments.length; i++) {
            console.log(arguments[i])
        }
    }
}

(function(window, INFORMA, $, undefined) {
    INFORMA.DataLoader = (function() {

        var RunningCalls = {};

        function DATALOADER() {
            this.GetContentOnlyFromURL = function(url, content) {
                return $.ajax({
                    url: url,
                    dataType: "html",
                    cache: false
                });
            };


            this.GetServiceData = function(service, params) {
                var Settings = {},
                    Defaults = {
                        data: "",
                        cache: false,
                        method: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        headers: {}
                    };
                $.extend(Settings, Defaults, params);

                if (RunningCalls[service] && RunningCalls[service] !== null) {
                    RunningCalls[service].abort();
                }

                RunningCalls[service] = $.ajax({
                    type: Settings.method,
                    //url: INFORMA.config.webservices[service],
                    url:service,
                    data: Settings.data,
                    cache: Settings.cache,
                    contentType: Settings.contentType,  
                    dataType: Settings.dataType,
                    headers: Settings.headers,
                    success: function(msg) {

                        if (Settings.contentType.indexOf("xml") > -1) {
                            if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                                params.success_callback.call(this, msg);
                            }
                        } else {
                            var data = null;

                            if (msg!==null) { data = msg } else { data = false; }

                            if (typeof params !== "undefined" && typeof params.success_callback === "function") {
                                params.success_callback.call(this, data);
                            }
                        }
                        RunningCalls[service] = null;
                        INFORMA.Spinner.Hide();

                    },
                    error: function(xhr, status, error) {
                        if (typeof params !== "undefined" && typeof params.error_callback === "function") {
                            params.error_callback.call(this, xhr, status, error);
                        }
                    }
                });

                return RunningCalls[service];
            };
        }
        return new DATALOADER();
    }());
}(window, INFORMA, jQuery));

var INFORMA = window.INFORMA || {};
INFORMA.global = (function(window, $, namespace) {
	'use strict';
	//variables
	var device = {},
		siteCore = {},
		_html = $('html');

	var init = function(){
		// viewport properties
		var _viewportWidth = $(window).width();
		if(_viewportWidth >= 1024){
			device.isDesktop = true;
			device.viewport = 'desktop';
			device.viewportN = 0;
		}
		else if(_viewportWidth >= 768){
			device.isTablet = true;
			device.viewport = 'tablet';
			device.viewportN = 1;
		}
		else {
			device.isMobile = true;
			device.viewport = 'mobile';
			device.viewportN = 2;
		}
		_html.addClass(device.viewport);

		// siteCore properties
		if( $('html').hasClass('preview-mode')){
			siteCore.isPreview = true;
		}
		else if($('html').hasClass('experience-mode')){
			siteCore.isExperience = true;
		}
	}

	return {
		init: init,
		device: device,
		siteCore: siteCore
	};
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.global.init());

(function ($) {
    'use strict';
	//==================================================
    // DOCUMENT READY & BootStraping init method for all modules loaded in the page...
    //--------------------------------------------------
    $(function () {
        var components, data, globalComponents = ['Configs', 'Utils'];
        for (components in globalComponents) {
            data = globalComponents[components];
            if (INFORMA[data]) {
                INFORMA[data].init();
            }
		}
		//Page Specific components
        for (components in INFORMA.initUI) {
            data = INFORMA.initUI[components];
            if (INFORMA[data]) {
                INFORMA[data].init(components);
            }
		}
    }());
    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}($INFORMA));

(function ($) {
    'use strict';
	//==================================================
    // DOCUMENT READY & BootStraping init method for all modules loaded in the page...
    //--------------------------------------------------
    $(function () {
        var components, data, globalComponents = ['Configs', 'Utils'];
        for (components in globalComponents) {
            data = globalComponents[components];
            if (INFORMA[data]) {
                INFORMA[data].init();
            }
		}
		//Page Specific components
        for (components in INFORMA.initUI) {
            data = INFORMA.initUI[components];
            if (INFORMA[data]) {
                INFORMA[data].init(components);
            }
		}
    }());
    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================
}($INFORMA));

(function(window, INFORMA, $, undefined) {

    INFORMA.Spinner = (function() {

        function SPINNER() {
            var spinner,
                rePosition = null,
                control,
                objectContainer,
                window = $(window),
                loader = {
                    width: 124,
                    height: 124
                };

            this.Hide = function() {
                if(typeof objectContainer ==="object"){
                    objectContainer.find('.load-spinner').fadeOut("fast");
                }
            };

            this.Show = function(container) {
            	objectContainer = container;
                var IsSpinnerExist = objectContainer.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div class='load-spinner'><span class='loading'><em>Loading...</em><img src='/Static/images/loader.svg' /></span></div>").hide();
                    control.prependTo(objectContainer);
                    control.fadeIn("slow");
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                objectContainer.find(".load-spinner .loading").css({
                    left: ((control.width()-loader.width-5) / 2),
                    top: ((control.height()-loader.height-15) / 2)
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));

    /*
 * global.js
 *
 *
 * @project:   Informa
 * @date:      2016-April-25
 * @author:    Santosh
 * @licensor:  SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    //variables
  INFORMA.Templates = {
    'articleListItems':
    '{{#each Articles}}'+
            '<li>'+
            '<div class="columns">'+
                '<p class="category">'+
                    '{{#if BrandType}}'+
                        '<span class="brand-type">{{BrandType}}</span>' +
                    '{{/if}}' +
                    '{{#if SectorType}}'+
                      '<strong>{{SectorType}}</strong>' +
                    '{{/if}}'+
                '</p>'+
                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                '<span class="content-type">{{ContentType}}</span>'+
                '<p class="date">{{PublicationDate}}</p>'+
                '<div class="list-content">'+
                    '{{#if Description}}'+
                        '<p class="description">{{Description}}</p>'+
                        '<span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span>'+
                            '<span class="article-info"><em>Topic:</em>'+
                                '<strong>{{Topic}}</strong>'+
                            '</span>'+
                    '{{/if}}'+
                    '{{#if Video}}'+
                        '<div class="video-container">'+
                            '<a href="{{Video.url}}" class="video-link">'+
                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                            '</a>'+
                            '<span class="play-icon icon-play"></span>'+
                        '</div>'+
                    '{{/if}}'+
                '</div>'+
            '</div>'+
                '{{#if LinkText}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>'+
                    '</div>'+
                '{{/if}}'+
            '</li>'+
          '{{/each}}',
        'HeadlinesListItems':
            '{{#each Headlines}}'+
                '<li>'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '<div class="list-content">'+
                        '<h4 class="poduct-brand-subheading">{{Title}}</h4>'+
                    '</div>'+
                    '<div class="link">'+
                        '<a role="button" href="{{Link.Url}}" title="External Link" target="{{Link.Target}}">'+
                        '<span class="icon-external-link">{{Link.LinkText}}</span></a>'+
                    '</div>'+
                '</li>'+
            '{{/each}}',
        'SubSectorList':
            '{{#each SubSectors}}'+
                '<option value="{{SubSectorID}}">{{SubSectorName}}</option>'+
            '{{/each}}',
        'ProductFacets' :
            '<div class="col-xs-12 col-sm-6 col-md-4">'+
                '<p><strong>{{results.FilterName}}</strong></p>'+
                '<ul data-filterid="{{results.FilterID}}">'+
                    '{{#each results}}'+
                    '<li>'+
                        '<span class="custom-checkbox">'+
                            '<label class="label" for="{{Key}}">'+
                              '<input type="checkbox" data-value={{Value}} value="{{Value}}" id="{{Key}}" name="{{Key}}" />'+
                              '<span>{{Key}}</span>'+
                            '</label>'+
                        '</span>'+
                    '</li>'+
                    '{{/each}}'+
                '</ul>'+
            '</div>',
        'SearchTabs' :
        '<div class="container clearfix">'+
            '<ul class="tab-list">'+
                '{{#each results}}'+
                    '<li>'+
                        '<a href="#{{Value}}" class="">{{Key}}</a>'+
                    '</li>'+
                '{{/each}}'+
            '</ul>'+
            '<div class="selectMenu">'+
              '<select class="chosen-select">'+
                '{{#each results}}'+
                    '<option value="#{{Value}}">{{Key}}</option>'+
                '{{/each}}'+
              '</select>'+
            '</div>'+
        '</div>',
        'ProductFilters':
            '<div class="{{results.FilterName}}">'+
                '<p>{{results.FilterName}}:</p>'+
                '<ul data-filterid="{{results.FilterID}}">'+
                    '{{#each results}}'+
                        '<li>{{Key}}<a href="#" class="remove" data-sector="{{Sector}}" data-value="{{Value}}">x</a></li>'+
                    '{{/each}}'+
                '</ul>'+
                '<a class="remove-all" href="#" data-filterid="{{results.FilterID}}">Clear all x</a>'+
            '</div>',
        'Products' :
        '{{#each results}}'+
                '<div class="col-xs-12 col-sm-6 col-md-4 search-tile">'+
                    '<div class="tile un-pinned">'+
                        '<div class="front">'+
                            '<div class="triangle">'+
                                '<span class="icon-arrow-right"></span>'+
                            '</div>'+
                            '<div class="header">'+
                                '<img src="{{Image}}" alt="{{ImageAlt}}" />'+
                            '</div>'+
                            '<div class="content">'+
                                '{{#each ProductSectors}}'+
                                    '<span class="tag">{{this}}</span>'+
                                '{{/each}}'+
                                '<a href="{{MoreLink}}" target="_blank"><h2>{{Title}}</h2></a>'+
                                '<ul>'+
                                    '{{#each Benefits}}'+
                                        '<li>{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                                '<div class="footer-content clearfix">'+
                                    '<div class="col-xs-6">'+
                                        '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{FreeTrialLink.CTAType}}" data-productid="{{FreeTrialLink.ProductGuid}}" class="btn btn-default free-trial wffm-elq-form-btn">Free Trial</a>'+
                                    '</div>'+
                                    '<div class="col-xs-6">'+
                                        '<a href="{{MoreLink}}" class="btn btn-default orange more">More</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="back">'+
                            '<div class="header">'+
                                '<img src="{{Image}}" alt="{{ImageAlt}}" />'+
                            '</div>'+
                            '<div class="content">'+
                                '{{#each ProductSectors}}'+
                                    '<span class="tag">{{this}}</span>'+
                                '{{/each}}'+
                                '<a href="{{MoreLink}}" target="_blank"><h2>{{Title}}</h2></a>'+
                                '<p>{{Description}}</p>'+
                                '<ul class="gray-bullets">'+
                                    '{{#each SubSectors}}'+
                                        '<li>{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                            '</div>'+
                            '<div class="triangle">'+
                                '<span class="icon-arrow-right"></span>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '{{/each}}',
    'Resources':
            '<ul class="list-container">'+
            '{{#each results}}'+
                '<li class="col-xs-12 col-sm-6 col-md-4">'+
                    '<div class="columns">'+
                    '<p class="category">'+
                      '<strong>{{SectorType}}</strong>'+
                    '</p>'+
                    '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                    '<span class="content-type">{{ContentType}}</span>'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '<div class="list-content">'+
                        '{{#if Description}}'+
                            '<p class="description">{{Description}}</p>'+
                            '<span class="article-info"><em>Author:</em> <strong>{{Profile}}</strong></span>'+
                                '<span class="article-info"><em>Topic:</em>'+
                                    '<strong>{{Topic}}</strong>'+
                                '</span>'+
                        '{{/if}}'+
                        '{{#if Video}}'+
                            '<div class="video-container">'+
                                '<a href="{{Video.url}}" class="video-link">'+
                                    '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                                '</a>'+
                                '<span class="play-icon"></span>'+
                            '</div>'+
                        '{{/if}}'+
                    '</div>'+
                    '</div>'+
                    '{{#if PageURL}}' +
                        '<div class="btn-container">' +
                          '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>' +
                        '</div>' +
                    '{{/if}}' +
                '</li>'+
            '{{/each}}'+
        '</ul>',
        'Events':
            '<section class="events-list analyst-profile-events event-profile-container">'+
                '<div class="container" data-count="3">'+
                    '<div class="events-container row">'+
                        '{{#each results}}'+
                            '<div class="col-xs-12 col-sm-6 col-md-4 events-section">'+
                                '<div class="events-wrap">'+
                                    '<div class="header clearfix">'+
                                        '<p class="date-field">'+
                                            '{{#compare EventDate null operator="!="}}<span class="bold">{{EventDate}}</span>{{/compare}}{{#if EventDate}}{{#if Time}}, {{/if}}{{/if}}{{#compare Time null operator="!="}}<span>{{Time}}</span>{{/compare}}</p>'+
                                        '<p class="country">'+
                                            '{{#compare State null operator="!="}}<span>{{State}}</span>{{/compare}}{{#if State}}{{#if Country}},{{/if}}{{/if}}{{#compare Country null operator="!="}}<span class="bold">{{Country}}</span>{{/compare}}</p>'+
                                    '</div>'+
                                    '<div class="content-wrap">'+
                                        '<p><span class="type">{{EventType}}</span></p>'+
                                        '<h3 class="title">{{Title}}</h3>'+
                                        '<div class="content clearfix">'+
                                            '<div class="title-content">Presenter:</div>'+
                                            '<div class="title-body">'+
                                                '<ul class="clearfix">'+
                                                    '{{#each Presenters}}'+
                                                    '<li>{{this}}</li>'+
                                                        '{{/each}}'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="content clearfix">'+
                                            '<div class="title-content">Themes:</div>'+
                                            '<div class="title-body">'+
                                                '<ul class="clearfix">'+
                                                    '{{#each Themes}}'+
                                                    '<li>{{this}}</li>'+
                                                        '{{/each}}'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '<div class="footer clearfix">'+
                                    '{{#if Register}}<a  href="{{Register.Url}}" class="btn btn-default register" target="{{Register.Target}}">{{Register.LinkText}}</a>{{/if}}'+
                                    '{{#if FullDetail}}<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>{{/if}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '{{/each}}'+
                    '</div>'+
                '</div>'+
            '</section>',
        'Others': '{{#each results}}' +
                    '<div class="col-xs-12 search-others">'+
                        '<h3>{{Title}}</h3>'+
                        '<p>{{Description}}</p>'+
                        '<div class="btn-container">'+
                            '<a href="{{ReadMoreLink}}" class="btn btn-default">{{ReadMoreText}}</a>'+
                        '</div>'+
                    '</div>'+
                  '{{/each}}',
        'AnalystList': '<section class="analyst-views">' +
                            '<div class="container">' +
                                '<h2 class="header">{{results.header}}</h2>' +
                                '<div class="row analyst-items">' +
                                    '{{#each results.ModelItem}}' +
                                        '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}">' +
                                            '<div class="meet-anlyst-section">' +
                                                '<div class="anlyst-heading">' +
                                                    '<div class="analyst-heading-content">' +
                                                        '<div class="analyst-details">' +
                                                          '<span class="analyst-type">{{Type}}</span>' +
                                                            '<h2>{{Name}}</h2>' +
                                                            '<h3>{{Type}}, {{JobTitle}}</h3>' +
                                                            '{{#if Country}}'+
                                                            '<p class="location">{{State}}, {{Country}}</p>' +
                                                            '{{/if}}'+
                                                        '</div>' +
                                                        '<div class="analyst-img">' +
                                                            '{{#if ProfileImage}}'+
                                                            '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                            '{{/if}}'+
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="analyst-description">' +
                                                    '<p class="heading"><i>{{FirstName}}</i> {{SpecializationText}}</p>' +
                                                    '<ul class="yellow-bullets">' +
                                                        '{{#each Specialization}}' +
                                                            '<li>{{this}}</li>' +
                                                        '{{/each}}' +
                                                    '</ul>' +
                                                    '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                                    '{{#compare MultipleProducts 0 operator=">"}}' +
                                                        '<ul class="track-analyst clearfix">' +
                                                            '{{#each MultipleProducts}}' +
                                                                '<li><a href="#">{{this}}</a></li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}' +
                                                '</div>' +
                                                '<div class="analyst-footer">' +
                                                    '<div class="analyst-footer-content clearfix">' +
                                                        '<ul class="nav-links">' +
                                                            '{{#compare TwitterLink null operator="!="}}' +
                                                                '<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                            '{{/compare}}' +
                                                            '{{#compare LinkedinLink null operator="!="}}' +
                                                                '<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                            '{{/compare}}' +
                                                            '{{#compare EmailAddressLink null operator="!="}}' +
                                                                '<li><a href="mailto:{{EmailAddressLink}}" class="icon-email"></a></li>' +
                                                            '{{/compare}}' +
                                                        '</ul>' +
                                                        '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '{{/each}}' +
                                '</div>' +
                                '{{#compare results.TotalCount "3" operator=">"}}' +
                                    '<div class="btn-container text-center">' +
                                        '<a href="javascript:void(0)" data-fetch="{{results.SectorID}}" class="btn-plus">' +
                                        '<span class="more">See All {{results.TotalCount}} Analysts</span>' +
                                        '<span class="less">Hide Analysts</span></a>' +
                                    '</div>' +
                                '{{/compare}}' +
                            '</div>' +
                        '</section>',
                'Analysts': 
                '{{#each results}}' +
                                '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{Type}}</span>' +
                                                    '<h2>{{Name}}</h2>' +
                                                    '<h3>{{Type}}, {{JobTitle}}</h3>' +
                                                    '<p class="location">{{State}}, {{Country}}</p>' +
                                                '</div>' +
                                                '<div class="analyst-img">' +
                                                    '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="analyst-description">' +
                                            '<p class="heading"><i>{{FirstName}}</i> {{SpecializationText}}</p>' +
                                            '<ul class="yellow-bullets">' +
                                                '{{#each Specialization}}' +
                                                    '<li>{{this}}</li>' +
                                                '{{/each}}' +
                                            '</ul>' +
                                            '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                            '{{#compare MultipleProducts "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each MultipleProducts}}' +
                                                        '<li><a href="#">{{this}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                '<ul class="nav-links">' +
                                                    '{{#compare TwitterLink null operator="!="}}' +
                                                        '<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare LinkedinLink null operator="!="}}' +
                                                        '<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare EmailAddress null operator="!="}}' +
                                                        '<li><a href="mailto:{{EmailAddress}}" class="icon-email"></a></li>' +
                                                    '{{/compare}}' +
                                                '</ul>' +
                                                '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'+
                    '{{/each}}',
        'AnalystTemplate': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{results.Type}}</span>' +
                                                    '<h2>{{results.Name}}</h2>' +
                                                    '<h3>{{results.Type}}, {{results.JobTitle}}</h3>' +
                                                    '{{#if results.Country}}'+
                                                        '<p class="location">{{results.State}}, {{results.Country}}</p>' +
                                                    '{{/if}}'+
                                                '</div>' +
                                                '<div class="analyst-img">' +
                                                    '{{#if results.ProfileImage}}'+
                                                        '<img src="{{results.ProfileImage}}" alt="{{results.image}}" />' +
                                                    '{{/if}}'+
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="analyst-description">' +
                                            '<p class="heading"><i>{{results.FirstName}}</i> {{results.SpecializationText}}</p>' +
                                            '<ul class="yellow-bullets">' +
                                                '{{#each results.Specialization}}' +
                                                    '<li>{{this}}</li>' +
                                                '{{/each}}' +
                                            '</ul>' +
                                            '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>' +
                                            '{{#compare results.MultipleProducts "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each results.MultipleProducts}}' +
                                                        '<li><a href="#">{{this}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                '<ul class="nav-links">' +
                                                    '{{#compare results.TwitterLink null operator="!="}}' +
                                                        '<li><a href="{{results.TwitterLink.Url}}" target="{{results.TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare results.LinkedinLink null operator="!="}}' +
                                                        '<li><a href="{{results.LinkedinLink.Url}}" target="{{results.LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare results.EmailAddressLink null operator="!="}}' +
                                                        '<li><a href="mailto:{{results.EmailAddressLink}}" class="icon-email"></a></li>' +
                                                    '{{/compare}}' +
                                                '</ul>' +
                                                '<a href="#" class="btn btn-default pull-right">{{results.SeeFullProfileLabel}}</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
    'EventpageListviewTemplate':'<div class="header clearfix">'+
                                  '<a href="javascript:void(0)" class="arrows previous"></a>'+
                                  '<h2>{{results.Month}}</h2>'+
                                  '<a href="javascript:void(0)" class="arrows next"></a>'+
                                '</div>'+
                                '<div class="events-container row">'+
                                        '{{#each results.ModelItem}}'+
                                        '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{DateType}}">'+
                                            '<div class="events-wrap">'+
                                                '<div class="header clearfix">'+
                                                    '<div class="date">{{DateField}}</div>'+
                                                    '<p class="country">'+
                                                        '{{#compare State null operator="!="}}{{State}}{{/compare}} {{#if State}}{{#if Country}},{{/if}}{{/if}}<strong>{{#compare Country null operator="!="}}{{Country}}{{/compare}}</strong></p>'+
                                                '</div>'+
                                                '<div class="content-wrap">'+
                                                    '<p><span class="type">{{EventType}}</span></p>'+
                                                    '<h3 class="title">{{Title}}</h3>'+
                                                    '{{#compare Presenters.length 0 operator=">"}}'+
                                                    '<div class="content clearfix">'+
                                                        '<div class="title-content">{{PresentersLabel}}</div>'+
                                                        '<div class="title-body">'+
                                                            '<ul class="clearfix">'+
                                                                '{{#each Presenters}}'+
                                                                '<li>{{this}}</li>'+
                                                                    '{{/each}}'+
                                                            '</ul>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '{{/compare}}'+
                                                    '{{#compare Themes.length 0 operator=">"}}'+
                                                    '<div class="content clearfix">'+
                                                        '<div class="title-content">{{ThemeLabel}}</div>'+
                                                        '<div class="title-body">'+
                                                            '<ul class="clearfix">'+
                                                                '{{#each Themes}}'+
                                                                '<li>{{this}}</li>'+
                                                                    '{{/each}}'+
                                                            '</ul>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '{{/compare}}'+
                                                '</div>'+
                                                '<div class="footer clearfix">'+
                                                    '{{#compare Register null operator="!="}}' + 
                                                       '<a href="{{Register.Url}}" class="btn btn-default register {{EventText}}" target="{{Register.Target}}">{{EventStatus}}</a>'+
                                                    '{{/compare}}'+
                                                    '{{#compare FullDetail null operator="!="}}' +
                                                      '<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>'+
                                                    '{{/compare}}'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '{{/each}}',
    'ResourceList': '<div class="col-xs-12 col-sm-6 col-md-4 list-item-container">'+
                        '<div class="list-item">'+
                            '<div class="columns">'+
                                '{{#if SectorType}}'+
                                '<p class="category">'+
                                  '<strong>{{SectorType}}</strong>'+
                                '</p>'+
                                '{{/if}}'+
                                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                                '<span class="content-type">{{ContentType}}</span>'+
                                '<p class="date">30.03.2016</p>'+
                                '<div class="list-content">'+
                                    '{{#if Description}}'+
                                        '<p class="description">{{Description}}</p>'+
                                        '<span class="article-info"><em>Author:</em> <strong>{{Profiles}}</strong></span>'+
                                            '<span class="article-info"><em>Topic:</em> '+
                                                '<strong>{{Topics}}</strong>'+
                                            '</span>'+
                                    '{{/if}}'+
                                    '{{#if Video}}'+
                                        '<div class="video-container">'+
                                            '<a href="{{Video.url}}" class="video-link">'+
                                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                                                '<span class="play-icon icon-play"></span>'+
                                            '</a>'+
                                        '</div>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</div>'+
                            '{{#if PageURL}}' +
                                '<div class="btn-container">' +
                                  '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>' +
                                '</div>' +
                            '{{/if}}' +
                        '</div>'+
                    '</div>',
        'AccordianTemplate': '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                          '<h4 class="panel-title">'+
                            '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#{{results.FaqAccordionId}}" href="#{{results.Id}}" aria-expanded="false" aria-controls="{{results.Id}}">'+
                              '{{results.Title}}'+
                            '</a>'+
                          '</h4>'+
                        '</div>'+
                        '<div id="{{results.Id}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{results.Id}}">'+
                          '<div class="panel-body">'+
                            '{{results.Description}}'+
                          '</div>'+
                        '</div>'+
                    '</div>',
        'RecomendedContent': '<div class="col-md-4 col-sm-6 col-xs-12">'+
                        '<div class="recomended-wrapper" data-fetch="{{results.Id}}">'+
                            '<div class="recomend-content">'+
                                '<div class="content">'+
                                    '{{#compare results.SectorType.length 0 operator=">"}}'+
                                        '<p>'+
                                            '{{#each results.SectorType}}'+
                                                '<span class="category">'+
                                                    '<strong>{{this}}</strong>'+
                                                '</span>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                    '<p class="type">'+
                                        '<span>{{results.Product}}</span>'+
                                    '</p>'+
                                    '<h4>{{results.Title}}</h4>'+
                                    '<p class="publish">{{results.ByKeyword}} <strong>{{results.Profile}}</strong>{{results.PublicationDate}}</p>'+
                                    '{{#compare results.Description null operator="!="}}'+
                                        '<p class="description">{{results.Description}}</p>'+
                                    '{{/compare}}'+
                                    '{{#compare results.Video null operator="!="}}'+
                                        '<div class="video-container">'+
                                            '<a href="{{results.Video.Url}}" class="video-link" tabindex="0">'+
                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                '<span class="play-icon icon-play"></span>'+
                                            '</a>'+
                                        '</div>'+
                                    '{{/compare}}'+
                                '</div>'+
                                '{{#compare results.Topic.length 0 operator=">"}}'+
                                    '<p class="topics">'+
                                        '{{results.TopicKeyword}} '+
                                        '{{#each results.Topic}}'+
                                            '<strong>{{this}}</strong>'+
                                        '{{/each}}'+
                                    '</p>'+
                                '{{/compare}}'+
                            '</div>'+
                            '<div class="footer">'+
                                '<div class="btn-container text-right">'+
                                    '<a href="{{results.PageURL}}" class="btn btn-default">{{results.LinkText}}</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'

}
}(this, jQuery, 'INFORMA'));

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
                        TileBack = Object.find('.back .triangle');

                    TileFront.on("click", function() {
                        DoFlip($(this), 'flip');
                    });

                    TileBack.on("click", function() {
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
