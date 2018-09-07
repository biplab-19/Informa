/*! 2018-09-07 *//*
 * google-analytics.js
 *
 *
 * @project:    Informa
 * @date:       2016-Dec-26
 * @author:     Nupur Goyal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.Analytics = (function(window, $, namespace) {
    'use strict';
    //variables
    var trackFormEvents,
    trackEvents,
    trackFormWithoutModal,
    bannerText = $('#banner').find("a.subscribe-stick");

    trackFormEvents = function(obj, action, label){
      if(typeof obj === 'object'){
        var dataModal,
          Parent,
          replaceValue,
          value,
          newReplaceValue,
          contactUsForm = obj.parents('.contactUsPage-contactUs'),
          singleStepRegistrationForm = obj.parents('.registration-form-single-section');
        if(action === 'Open'){
          dataModal = obj.data('modal');
          if(dataModal === '#Intelligence'){
            replaceValue = dataModal.replace(dataModal,'#formRequestADemo');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }
          else if(dataModal === '#Insight'){
            replaceValue = dataModal.replace(dataModal,'#formRequestATrial');
            newReplaceValue = replaceValue.replace('#','');
            value = newReplaceValue.charAt(0).toUpperCase() + newReplaceValue.substr(1);
          }
          else if(contactUsForm.length > 0){
            value = trackFormWithoutModal(contactUsForm);
          }
          else{
            replaceValue = dataModal.replace('#',''),
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1); 
          }  
        }
        else{
          Parent =  obj.parents('.modal.in form');
          dataModal = Parent.data('formcapture');
          if(dataModal === 'Intelligence'){
            replaceValue = dataModal.replace(dataModal,'formRequestADemo');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(dataModal === 'Insight'){
            replaceValue = dataModal.replace(dataModal,'formRequestATrial');
            value = replaceValue.charAt(0).toUpperCase() + replaceValue.substr(1);
          }
          else if(contactUsForm.length > 0){
            value = trackFormWithoutModal(contactUsForm);
          }
          else if(singleStepRegistrationForm.length > 0){
            dataModal = singleStepRegistrationForm.find('.form-inline-container form').data('formcapture');
            value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
          }
          else{
            value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
          }  
        }

        if(dataModal || contactUsForm){
          trackEvents('Form', action, value,1)
        }
      }
    }

    trackFormWithoutModal = function(contactUsForm){
      var dataModal = contactUsForm.find('.tab-pane.active').find('.form-inline-container form').data('formcapture');
      if(dataModal){
        var value = dataModal.charAt(0).toUpperCase() + dataModal.substr(1);
      }
      return value;
    }

 

    trackEvents = function( category, action, label,value){
      //check if ga is set (latest version)
      if (typeof ga !== 'undefined') {
        ga('send', {
          hitType: 'event',
          eventCategory: category,
          eventAction: action,
          eventLabel: label,
          eventValue:value
        });
      }

      //check if _gaq is set (legacy version)
      if (typeof _gaq !== 'undefined') {
        _gaq.push(['_trackEvent', category, action, label]);
      }
     
    }

    bannerText.click(function (event) {
      var input = $(this).text();
      var output = input.replace(/\w+/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1);
      }).replace(/\s/g, '');
      trackEvents('Form', 'Open', output,1)
    });

    $('body').on('click', '.register,.product-login', function(e) {
      if($(this).hasClass('register')){
         trackEvents('Form', 'Open', 'EventRegister',1)
      }
      else if($(this).hasClass('product-login')){
        trackEvents('Form', 'Open', 'ProductLogin',1)
      }
    })
    return {
        trackFormEvents: trackFormEvents
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.Analytics.trackFormEvents());


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
            "GetRefineResults": "/data/product-results.json",
            "GetMoreProducts" :"/data/product-results.json",
            "SearchResult": "/data/search-results.json",
            "AnalystSearch": "/data/analyst-search.json",
            "AnalystSearchDropDown": "/data/analyst-search-dropdown.json",
            "AnalystSearchAll": "/data/analyst-search-subsector.json",
            "EventsSearch": "data/events-page.json",
            "ResourceList": "data/resource-list.json",
            "ResourceResult" : "data/resource-list.json",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/data/form-data.json",
            "GetRecomendedItems": "/data/recomended-content.json",
            "GetProductAndVerticalNames": "/data/GetWffmHiddenItemsContent.json",
            "GetRecomendedProductItems": "/data/recomendedProducts.json"
        },
        "dev": {
            "GetArticles": "/client/search/getarticles",
            "GetSubSectorList": "/client/search/GetSubSectors",
            "ProductSearch": "/client/search/GetProductsSampleContent",
            "GetRefineResults": "/client/search/GetRefineProductResults",
            "GetMoreProducts" :"/client/search/GetMoreProducts",
            "SearchResult": "/client/search/GetSearchResults",
            "AnalystSearch": "/client/search/GetSpecialists",
            "AnalystSearchDropDown": "/client/search/GetSubSectorList",
            "AnalystSearchAll": "/client/search/SeeAllSpecialists",
            "EventsSearch": "/client/search/GetEventList",
            "ResourceList": "/client/search/GetResourceListing",
            "ResourceResult": "/client/search/GetResourceListing",
            "GetFAQs": "/client/search/GetFAQList",
            "GetFormItems": "/client/ajax/GetModifiedWffmFormItems",
            "GetRecomendedItems": "/client/Account/GetRemainingContent",
            "GetProductAndVerticalNames": "/client/ajax/GetWffmHiddenItemsContent",
            "GetRecomendedProductItems": "/client/Account/GetUpdatedProduct",
            "SetFirstContentDisplayedCookie" :"/client/Ajax/SetFirstContentDisplayedCookie" 

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
            //console.log(arguments[i])
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
                    control = $("<div class='load-spinner'><span class='loading'><em>Loading...</em><img src='/Static/images/loader.svg' alt='loading'/></span></div>").hide();
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
                '<div class="col-xs-12">'+
                    '<div class="recomended-wrapper" data-fetch="{{Id}}">'+
                        '<div class="recomend-content">'+
                            '<div class="content">'+
                                '{{#compare SamplecontentProducts.length "0" operator=">"}}'+
                                    '<p class="type">'+
                                        '<span>{{SamplecontentProducts}}</span>'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare PageURL null operator="!="}}' +
                                    '{{#compare PageURL.length "0" operator=">"}}' +
                                        '{{#if HasExternalLink}}'+
                                            '{{#compare HasExternalLink true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/if}}'+

                                        '{{#compare HasExternalLink false operator="=="}}'+
                                            '{{#compare ShowForm false operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a href="{{PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_blank">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare ShowForm true operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                                '{{#compare PageURL.length "0" operator="=="}}' +
                                    '<h4><span>{{Title}}</span></h4>'+
                                '{{/compare}}'+
                                '<p class="publish">{{#if Profile}}{{ByKeyword}} <strong>{{Profile}}</strong>{{/if}}{{#if PublicationDate}}{{PublicationDate}}{{/if}}</p>'+
                                '{{#compare Description null operator="!="}}'+
                                    '<p class="description">{{Description}}</p>'+
                                '{{/compare}}'+
                                '{{#compare Video null operator="!="}}'+
                                    '<div class="video-container">'+
                                        '{{#compare HasExternalLink false operator="=="}}'+
                                            '{{#compare ShowForm true operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '<a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">'+
                                                        '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                        '<span class="play-icon icon-play"></span>'+
                                                    '</a>'+
                                                '{{/compare}}'+
                                                '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_self">{{LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare ShowForm false operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '<a href="{{Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0">'+
                                                        '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                        '<span class="play-icon icon-play"></span>'+
                                                    '</a>'+
                                                '{{/compare}}'+    
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
                                                    '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                    '<span class="play-icon icon-play"></span>'+
                                                '</a>'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+  
                                         '{{#compare HasExternalLink true operator="=="}}'+
                                            '<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
                                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                '<span class="play-icon icon-play"></span>'+
                                            '</a>'+
                                         '{{/compare}}'+
                                    '</div>'+
                                '{{/compare}}'+
                            '</div>'+
                            // '{{#compare Brand.length 0 operator=">"}}'+
                            //         '<p class="brands">'+
                            //             '{{#each Brand}}'+
                            //                     '<span>{{this}}</span>'+
                            //             '{{/each}}'+
                            //         '</p>'+
                            // '{{/compare}}'+
                                '{{#compare TopicURLS.length "0" operator=">"}}'+
                                    '<p class="topics">'+
                                        '{{TopicKeyword}} '+
                                        '{{#each TopicURLS}}'+
                                            '<strong><a href="{{this.TopicResourceLink}}">{{this.TopicName}}</a></strong>'+
                                        '{{/each}}'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare ShowSubSectorOnSampleContentPage true operator="=="}}'+
                                    '{{#compare SubSectorsUrlDetails.length 0 operator=">"}}'+
                                        '<p class="SubSectors">'+
                                            '<span>{{SubSectorKeyword}}</span>'+
                                            '{{#each SubSectorsUrlDetails}}'+
                                                '<span>'+
                                                    '<a href="{{this.Value}}">{{this.Key}}</a>'+
                                                '</span>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                        '</div>'+
                        '<div class="footer">'+
                            '{{#compare Price null operator="!="}}'+
                                    '<div class="recomended-currency"><strong>{{Price}}</strong></div>'+
                            '{{/compare}}'+
                            '{{#compare PageURL null operator="!="}}' +
                                '{{#compare PageURL.length "0" operator=">"}}' +
                                    '{{#if HasExternalLink}}'+
                                        '{{#compare HasExternalLink true operator="=="}}'+
                                            '{{#if LinkText}}'+
                                                '<div class="btn-container text-right">'+
                                                    '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{LinkText}}</a>'+
                                                '</div>'+
                                            '{{/if}}'+
                                        '{{/compare}}'+
                                    '{{/if}}'+

                                    '{{#compare HasExternalLink false operator="=="}}'+
                                        '{{#compare ShowForm false operator="=="}}'+
                                            '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn show-content-first-time" data-firstcontent="true" target="_self">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare ShowForm true operator="=="}}'+
                                            '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a data-show-register="true" class="btn btn-primary show-register-form full-width-btn" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_self">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                            '{{#if LinkText}}'+
                                                '<div class="btn-container text-right">'+
                                                    '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{LinkText}}</a>'+
                                                '</div>'+
                                            '{{/if}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                            '{{#compare PageURL.length "0" operator="=="}}' +
                                '<div class="btn-container text-right">'+
                                    '<a class="btn btn-primary" disabled>{{LinkText}}</a>'+
                                '</div>'+
                            '{{/compare}}'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</li>'+
          '{{/each}}',
        'HeadlinesListItems':
            '{{#each Headlines}}'+
                '<li>'+
                    '{{#compare ProductBrandName.length "0" operator=">"}}'+
                        '<p class="type">'+
                            '<span>{{ProductBrandName}}</span>'+
                        '</p>'+
                    '{{/compare}}'+
                    '{{#compare SamplecontentProducts.length "0" operator=">"}}'+
                        '<p class="type">'+
                            '<span>{{SamplecontentProducts}}</span>'+
                        '</p>'+
                    '{{/compare}}'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '{{#compare PageURL null operator="!="}}' +
                        '{{#compare PageURL.length "0" operator=">"}}' +
                            '{{#compare HasExternalLink true operator="=="}}'+
                                '<div class="list-content">'+
                                    '<h4 class="poduct-brand-subheading"><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                '</div>'+
                            '{{/compare}}'+
                            '{{#compare HasExternalLink false operator="=="}}'+
                                '<div class="list-content">'+
                                    '<h4 class="poduct-brand-subheading"><a href="{{PageURL}}" target="_self">{{Title}}</a></h4>'+
                                '</div>'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                    '{{/compare}}'+
                    '{{#compare PageURL.length "0" operator="=="}}' +
                        '<div class="list-content">'+
                            '<h4 class="poduct-brand-subheading"><span>{{Title}}</span></h4>'+
                        '</div>'+
                    '{{/compare}}'+
                    '{{#compare PageURL null operator="!="}}' +
                        '{{#compare PageURL.length "0" operator=">"}}' +
                            '{{#compare HasExternalLink true operator="=="}}'+
                                '<div class="link">'+
                                    '<a role="button" href="{{PageURL}}" title="External Link" target="_blank">'+
                                    '<span class="icon-external-link"><span class="access-link">Link</span></span></a>'+
                                '</div>'+
                            '{{/compare}}'+  
                             '{{#compare HasExternalLink false operator="=="}}'+
                                '<div class="link">'+
                                    '<a role="button" href="{{PageURL}}" title="Internal Link" target="_self">'+
                                    '<span class="icon-internal-link"><span class="access-link">Link</span></span></a>'+
                                '</div>'+
                            '{{/compare}}'+  
                        '{{/compare}}'+
                    '{{/compare}}'+
                '</li>'+
            '{{/each}}',
        'SubSectorList':
            '{{#each SubSectors}}'+
                '<option value="{{SubSectorID}}">{{SubSectorName}}</option>'+
            '{{/each}}',
    'RefineFacets':
            '{{#each results}}'+
                '<li>'+
                '<span class="custom-checkbox">'+
                    '<label for="{{Id}}" class="label">'+
                        '<input type="checkbox" name="{{Name}}" id="{{Id}}" value="{{Value}}" {{#if Disabled}}disabled="disabled"{{/if}} {{#if Selected}}checked="checked"{{/if}} />'+
                        '<span>{{Text}}</span>'+
                    '</label>'+
                '</span>'+
                '</li>'+
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
                          '<a role="button" href="{{PageURL}}" class="btn btn-primary" target="_blank">{{LinkText}}</a>' +
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
                                    '</div>'+
                                    '<div class="content-wrap">'+ 
                                        '<p class="country">'+
                                            '{{#compare State null operator="!="}}<span>{{State}}</span>{{/compare}}{{#if State}}{{#if Country}},{{/if}}{{/if}}{{#compare Country null operator="!="}}<span class="bold">{{Country}}</span>{{/compare}}'+
                                        '</p>'+
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
                                    '{{#compare StatusEnabled  true operator="=="}}'+
                                        '{{#compare Register null operator="!="}}' +
                                            '{{#compare Register.Url null operator="!="}}' +
                                                '{{#compare Register.Url.length "0" operator=">"}}' +
                                                    '<a href="{{Register.Url}}" class="btn btn-default register" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+ 
                                    '{{#compare StatusEnabled  false operator="=="}}'+   
                                        '{{#compare Register null operator="!="}}' +
                                            '{{#compare Register.Url null operator="!="}}' +
                                                '{{#compare Register.Url.length "0" operator=">"}}' +
                                                    '<a href="{{Register.Url}}" class="btn btn-default register disabled" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+ 
                                    '{{#compare FullDetail null operator="!="}}' +
                                        '{{#compare FullDetail.Url null operator="!="}}' +
                                            '{{#compare FullDetail.Url.length "0" operator=">"}}' + 
                                                '<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '{{/each}}'+
                    '</div>'+
                '</div>'+
            '</section>',
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
                                                            '<h4>{{Name}}</h4>' +
                                                            '<h5>{{Type}}{{#if Type}}{{#if JobTitle}},{{/if}}{{/if}} {{JobTitle}}</h5>' +
                                                            '{{#if Country}}'+
                                                            '<p class="location">{{State}}{{#if Country}}{{#if State}},{{/if}}{{/if}} {{Country}}</p>' +
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
                                                    '{{#compare Specialization.length 0 operator=">"}}' +
                                                        '<p class="heading"><em>{{FirstName}}</em> {{SpecializationText}}</p>' +
                                                        '<ul class="yellow-bullets">' +
                                                            '{{#each Specialization}}' +
                                                                '<li>{{this}}</li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}'+
                                                    '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                                    '{{#compare ProductDetails.length 0 operator=">"}}' +
                                                        '<ul class="track-analyst clearfix">' +
                                                            '{{#each ProductDetails}}' +
                                                                '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}' +
                                                '</div>' +
                                                '<div class="analyst-footer">' +
                                                    '<div class="analyst-footer-content clearfix">' +
                                                        '<ul class="nav-links">'+
                                                            '{{#if LinkedInProfileID}}'+
                                                                '{{#compare LinkedInProfileID.length "1" operator=">"}}'+
                                                                '<li>'+
                                                                    '<a class="addthis_button_linkedin_follow" addthis:userid="{{LinkedInProfileID}}"></a>'+
                                                                '</li>'+
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                            '{{#if TwitterHandleID}}'+
                                                                '{{#compare TwitterHandleID.length "1" operator=">"}}'+
                                                                '<li>'+
                                                                    '<a class="addthis_button_twitter_follow" addthis:userid="{{TwitterHandleID}}"></a>'+
                                                                '</li>'+
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                            '{{#if EmailAddressLink.Url}}'+
                                                                '{{#compare EmailAddressLink.Url null operator="!="}}'+
                                                                    '<li><a href="{{EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                        '</ul>'+
                                                        '<a href="{{ProfileUrl}}" class="btn btn-primary pull-right">Full Profile</a>' +
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
        'AnalystTemplate': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{results.Type}}</span>' +
                                                    '<h4>{{results.Name}}</h5>' +
                                                    '<h5>{{results.Type}}{{#if results.Type}}{{#if results.JobTitle}},{{/if}}{{/if}} {{results.JobTitle}}</h3>' +
                                                    '{{#if results.Country}}'+
                                                        '<p class="location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}} {{results.Country}}</p>' +
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
                                            '{{#compare results.Specialization.length "0" operator=">"}}' +
                                                '<p class="heading"><em>{{results.FirstName}}</em> {{results.SpecializationText}}</p>' +
                                                '<ul class="yellow-bullets">' +
                                                    '{{#each results.Specialization}}' +
                                                        '<li>{{this}}</li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}'+
                                            '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>' +
                                            '{{#compare results.ProductDetails.length "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each results.ProductDetails}}' +
                                                        '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                    '<ul class="nav-links">'+
                                                        '{{#if results.LinkedInProfileID}}'+
                                                            '{{#compare results.LinkedInProfileID.length "1" operator=">"}}'+
                                                            '<li>'+
                                                                '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>'+
                                                            '</li>'+
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                        '{{#if results.TwitterHandleID}}'+
                                                            '{{#compare results.TwitterHandleID.length "1" operator=">"}}'+
                                                            '<li>'+
                                                                '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>'+
                                                            '</li>'+
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                        '{{#if results.EmailAddressLink.Url}}'+
                                                            '{{#compare results.EmailAddressLink.Url null operator="!="}}'+
                                                                '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                    '</ul>'+
                                                '<a href="{{results.ProfileUrl}}" class="btn btn-primary pull-right">{{results.SeeFullProfileLabel}}</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
    'EventListingPage':
            '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{results.DateType}}">'+
                '<div class="events-wrap">'+
                    '<div class="header clearfix">'+
                        '<div class="date">{{results.DateField}}</div>'+
                        '<div class="date month">{{results.MonthField}}</div>'+
                    '</div>'+
                    '<div class="content-wrap">'+
                        '<p class="country">'+
                            '{{#compare results.State null operator="!="}}{{results.State}}{{/compare}}{{#if results.State}}{{#if results.Country}},{{/if}}{{/if}} <strong>{{#compare results.Country null operator="!="}}{{results.Country}}{{/compare}}</strong>'+
                        '</p>'+
                        '<p><span class="type">{{results.EventType}}</span></p>'+
                        '<h3 class="title">{{results.Title}}</h3>'+
                        '{{#compare results.Presenters.length 0 operator=">"}}'+
                        '<div class="content clearfix">'+
                            '<div class="title-content">{{results.PresentersLabel}}</div>'+
                            '<div class="title-body">'+
                                '<ul class="clearfix">'+
                                    '{{#each results.Presenters}}'+
                                    '<li>{{this}}</li>'+
                                        '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '{{/compare}}'+
                        '{{#compare results.Themes.length 0 operator=">"}}'+
                        '<div class="content clearfix">'+
                            '<div class="title-content">{{results.ThemeLabel}}</div>'+
                            '<div class="title-body">'+
                                '<ul class="clearfix">'+
                                    '{{#each results.Themes}}'+
                                    '<li>{{this}}</li>'+
                                        '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '{{/compare}}'+
                    '</div>'+
                    '<div class="footer clearfix">'+
                        '{{#compare results.FullDetail null operator="!="}}' +
                            '{{#compare results.FullDetail.Url null operator="!="}}' +
                                '{{#compare results.FullDetail.Url.length "0" operator=">"}}' +
                                '<a href="{{results.FullDetail.Url}}" class="btn btn-default pull-left full-detail" target="{{results.FullDetail.Target}}">{{results.FullDetail.LinkText}}</a>'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                        '{{/compare}}'+
                        '{{#compare results.StatusEnabled  true operator="=="}}'+
                            '{{#compare results.Register null operator="!="}}' +
                                '{{#compare results.Register.Url null operator="!="}}' +
                                    '{{#compare results.Register.Url.length "0" operator=">"}}' + 
                                        '<a href="{{results.Register.Url}}" class="btn btn-primary pull-right register" target="{{results.Register.Target}}">{{results.EventCTAText}}</a>'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                        '{{#compare results.StatusEnabled  false operator="=="}}'+
                            '{{#compare results.Register null operator="!="}}' +
                                '{{#compare results.Register.Url null operator="!="}}' +
                                    '{{#compare results.Register.Url.length "0" operator=">"}}' + 
                                        '<a href="{{results.Register.Url}}" class="btn btn-primary pull-right register disabled" target="{{results.Register.Target}}">{{results.EventCTAText}}</a>'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                    '</div>'+
                '</div>'+
            '</div>',                      
    'EventpageListviewTemplate':'<div class="header clearfix">'+
                                  '<a href="javascript:void(0)" class="arrows previous">Previous Arrow</a>'+
                                  '<h2>{{results.Month}}</h2>'+
                                  '<a href="javascript:void(0)" class="arrows next">Next Arrow</a>'+
                                '</div>'+
                                '<div class="events-container row">'+
                                        '{{#each results.ModelItem}}'+
                                        '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{DateType}}">'+
                                            '<div class="events-wrap">'+
                                                '<div class="header clearfix">'+
                                                    '<div class="date">{{DateField}}</div>'+
                                                '</div>'+
                                                '<div class="content-wrap">'+
                                                    '<p class="country">'+
                                                        '{{#compare State null operator="!="}}{{State}}{{/compare}}{{#if State}}{{#if Country}},{{/if}}{{/if}} <strong>{{#compare Country null operator="!="}}{{Country}}{{/compare}}</strong>'+
                                                    '</p>'+
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
                                                    '{{#compare FullDetail null operator="!="}}' +
                                                        '{{#compare FullDetail.Url null operator="!="}}' +
                                                            '{{#compare FullDetail.Url.length "0" operator=">"}}' +
                                                            '<a href="{{FullDetail.Url}}" class="btn btn-default pull-left full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare StatusEnabled  true operator="=="}}'+
                                                        '{{#compare Register null operator="!="}}' +
                                                            '{{#compare Register.Url null operator="!="}}' +
                                                                '{{#compare Register.Url.length "0" operator=">"}}' + 
                                                                    '<a href="{{Register.Url}}" class="btn btn-primary pull-right register" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare StatusEnabled  false operator="=="}}'+
                                                        '{{#compare Register null operator="!="}}' +
                                                            '{{#compare Register.Url null operator="!="}}' +
                                                                '{{#compare Register.Url.length "0" operator=">"}}' + 
                                                                    '<a href="{{Register.Url}}" class="btn btn-primary pull-right register disabled" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+
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
                                  '<a role="button" href="{{PageURL}}" class="btn btn-primary" target="_blank">{{LinkText}}</a>' +
                                '</div>' +
                            '{{/if}}' +
                        '</div>'+
                    '</div>',
        'AccordianTemplate': '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                          '<h4 class="panel-title">'+
                            '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#{{results.FaqAccordionId}}" href="#{{results.Id}}{{results.FaqAccordionId}}{{results.Tabs}}" aria-expanded="false" aria-controls="{{results.Id}}">'+
                              '{{results.Title}}'+
                            '</a>'+
                          '</h4>'+
                        '</div>'+
                        '<div id="{{results.Id}}{{results.FaqAccordionId}}{{results.Tabs}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{results.Id}}" data-fetch="{{results.Id}}">'+
                          '<div class="panel-body">'+
                            '{{results.Description}}'+
                          '</div>'+
                        '</div>'+
                    '</div>',
        'SampleContent': '<div class="col-md-4 col-sm-6 col-xs-12">'+
                        '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">'+
                            '<div class="recomended-wrapper">'+
                                '<div class="recomend-content wrap-content">'+
                                    '<div class="content">'+
                                        '{{#compare results.SamplecontentProducts.length "0" operator=">"}}'+
                                            '<p class="type">'+
                                                '<span>{{results.SamplecontentProducts}}</span>'+
                                            '</p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL null operator="!="}}' +
                                            '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL.length "0" operator="=="}}' +
                                            '<h4><span>{{results.Title}}</span></h4>'+
                                        '{{/compare}}'+
                                        '<p class="publish">{{#if results.Profile}}{{results.ByKeyword}} <strong> {{{AnalystData results.Profile}}} </strong>{{/if}}{{#if results.PublicationDate}}{{results.PublicationDate}}{{/if}}</p>'+
                                        '{{#compare results.Description null operator="!="}}'+
                                            '<p class="description">{{results.Description}}</p>'+
                                        '{{/compare}}'+ 
                                        '{{#compare results.Video null operator="!="}}'+
                                            '<div class="video-container">'+
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                            '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                            '<span class="play-icon icon-play"></span>'+
                                                        '</a>'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                            '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                                '<a href="{{results.Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0" target="_self">'+
                                                                    '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                    '<span class="play-icon icon-play"></span>'+
                                                                '</a>'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '<a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.Video.Url}}">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '</div>'+
                                        '{{/compare}}'+
                                    '</div>'+
                                    // '{{#compare results.Brand.length 0 operator=">"}}'+
                                    //         '<p class="brands">'+
                                    //             '{{#each results.Brand}}'+
                                    //                 '<span>{{this}}</span>'+
                                    //             '{{/each}}'+
                                    //         '</p>'+
                                    // '{{/compare}}'+
                                    '{{#compare results.TopicURLS.length 0 operator=">"}}'+
                                        '<p class="topics">'+
                                            '{{results.TopicKeyword}} '+
                                            '{{#each results.TopicURLS}}'+
                                                '<strong><a href="{{this.TopicResourceLink}}">{{this.TopicName}}</a></strong>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                    '{{#compare results.ShowSubSectorOnSampleContentPage true operator="=="}}'+
                                            '{{#compare results.SubSectorsUrlDetails.length 0 operator=">"}}'+
                                                '<p class="SubSectors">'+
                                                    '<span>{{results.SubSectorKeyword}}</span>'+
                                                    '{{#each results.SubSectorsUrlDetails}}'+
                                                        '<span>'+
                                                            '<a href="{{this.Value}}">{{this.Key}}</a>'+
                                                        '</span>'+
                                                    '{{/each}}'+
                                                '</p>'+
                                            '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="footer">'+
                                    '{{#compare results.Price null operator="!="}}'+
                                            '<div class="recomended-currency"><strong>{{results.Price}}</strong></div>'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL null operator="!="}}' +
                                        '{{#compare results.PageURL.length "0" operator=">"}}' +
                                            '{{#if results.HasExternalLink}}'+
                                                '{{#compare results.HasExternalLink true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#compare results.HasExternalLink false operator="=="}}'+
                                                '{{#compare results.ShowForm false operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn show-content-first-time" data-firstcontent="true" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.ShowForm true operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a data-show-register="true" class="btn btn-primary show-register-form full-width-btn" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+    
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL.length "0" operator="=="}}' +
                                        '<div class="btn-container text-right">'+
                                            '<a class="btn btn-primary" disabled>{{results.LinkText}}</a>'+
                                        '</div>'+
                                    '{{/compare}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
            'Product':
                '<div class="col-xs-12 col-sm-6 col-md-4">'+
                '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">'+
                    '<div class="products">'+
                        '<div class="wrap-content">'+
                            '<div class="heading">'+
                                '<div class="heading-content">'+
                                    '<p class="category">'+
                                        '{{#each results.SectorTags}}'+
                                            '<strong>{{this}}</strong>'+
                                        '{{/each}}'+
                                    '</p>'+
                                    '<h4 class={{results.SubSiteTheme}}>{{results.Title}}</h4>'+
                                '</div>'+
                            '</div>'+
                            '<div class="body">'+
                                '<p>{{results.Description}}</p>'+
                                '<ul>'+
                                    '{{#each results.Benefits}}'+
                                    '<li class="icon-tick">{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<div class="button-links">'+
                            '<div class="button-links-wrap row">'+
                                '<div class="col-xs-6">'+
                                    '{{#compare results.PageURL null operator="!="}}' +
                                        '{{#compare results.PageURL.length "0" operator=">"}}' +
                                            '<a href="{{results.PageURL}}" target="{{results.LinkTarget}}" class="btn btn-default">{{results.DetailText}}</a>'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="col-xs-6">'+
                                    '{{#if results.ProductSearchCTAType}}' +
                                        '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="=="}}'+    
                                            '{{#if (splitURL results.SalesforceLink.Url "registration")}}'+
                                                    '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>'+
                                            '{{else}}'+
                                                '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">'+
                                                    '{{results.SearchCTAName}}'+
                                                '</a>'+
                                            '{{/if}}'+                                     
                                        '{{/compare}}'+
                                        '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="!="}}'+ 
                                            '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">'+
                                                '{{results.SearchCTAName}}'+
                                            '</a>'+
                                        '{{/compare}}'+
                                    '{{else}}'+                                 
                                    '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>'+
                                    '{{/if}}'+  
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>',
                'SearchTemplate': '<div class="product-results" data-pagesize="{{results.DefaultItemCount}}">'+
                                    '{{#if results.ProductTitle}}'+
                                       '<h2> <strong>{{results.ProductTitle}}</strong></h2>'+
                                       '{{/if}}'+
                                        '<div class="row list">'+
                                            '{{{results.Content}}}'+
                                        '</div>'+
                                        '{{#compare results.ShowMoreFlag false operator="!="}}'+
                                        '<div class="text-center">'+
                                            '<a href="#" class="btn-showMore">'+
                                                '<span class="more">{{results.ShowMoreText}}</span>'+
                                                '<span class="less">{{results.ShowLessText}}</span>'+
                                            '</a>'+
                                        '</div>'+
                                        '{{/compare}}'+
                                   '</div>',
                            'Specialist': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                                '<div class="list-items">'+
                                                    '<div class="analyst-list-container {{results.Type}}">'+
                                                        '<div class="meet-anlyst-section">'+
                                                            '<div class="wrap-content">'+
                                                                '<div class="anlyst-heading">'+
                                                                    '<div class="analyst-heading-content">'+
                                                                        '<div class="analyst-details">'+
                                                                            '<span class="analyst-type">{{results.Type}}</span>'+
                                                                            '<h4>{{results.Name}}</h4>'+
                                                                            '<h5>{{results.JobTitle}}</h5>'+
                                                                            '{{#if results.Country}}'+
                                                                                '<p class="location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}} {{results.Country}}</p>'+
                                                                            '{{/if}}'+
                                                                        '</div>'+
                                                                        '<div class="analyst-img">'+
                                                                            '<img src="{{results.Image}}" alt="@Model.Name" />'+
                                                                        '</div>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                                '<div class="analyst-description">'+
                                                                    '{{#compare results.Specialization.length "0" operator=">"}}'+
                                                                    '<p class="heading"><em>{{results.FirstName}}</em> {{results.SpecializationText}}</p>'+
                                                                    '<ul class="yellow-bullets">'+
                                                                        '{{#each results.Specialization}}'+
                                                                        '<li>{{this}}</li>'+
                                                                        '{{/each}}'+
                                                                    '</ul>'+
                                                                    '{{/compare}}'+
                                                                    '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>'+
                                                                    '{{#compare results.ProductDetails.length "0" operator=">"}}'+
                                                                        '<ul class="track-analyst clearfix">'+
                                                                            '{{#each results.ProductDetails}}' +
                                                                                '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                                            '{{/each}}' +
                                                                        '</ul>'+
                                                                    '{{/compare}}'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<div class="analyst-footer">'+
                                                                '<div class="analyst-footer-content clearfix">'+
                                                                    '<ul class="nav-links">'+
                                                                        '{{#if results.LinkedInProfileID}}'+
                                                                            '{{#compare results.LinkedInProfileID.length "1" operator=">"}}'+
                                                                            '<li>'+
                                                                                '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>'+
                                                                            '</li>'+
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                        '{{#if results.TwitterHandleID}}'+
                                                                            '{{#compare results.TwitterHandleID.length "1" operator=">"}}'+
                                                                            '<li>'+
                                                                                '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>'+
                                                                            '</li>'+
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                        '{{#if results.EmailAddressLink}}'+
                                                                            '{{#compare results.EmailAddressLink.Url.length "0" operator=">"}}'+
                                                                                '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                    '</ul>'+
                                                                    '<a href="{{results.PageURL}}" target="{{results.LinkTarget}}" class="btn btn-primary pull-right">{{results.SeeFullProfileLText}}</a>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                           '</div>',
                            'Event': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                    '<div class="list-items">'+
                                            '<div class="events-wrap">'+
                                                '<div class="wrap-content">'+
                                                    '<div class="header clearfix">'+
                                                        '<div class="date-field">{{results.EventDate}}</div>'+
                                                    '</div>'+
                                                    '<div class="content-wrap">'+
                                                        '<p class="country">'+
                                                            '<span>{{results.State}}</span>'+
                                                            '{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}}'+
                                                            '<strong> {{results.Country}}</strong>'+
                                                        '</p>'+
                                                        '<p><span class="type">{{results.EventType}}</span></p>'+
                                                        '<h3 class="title">{{results.Title}}</h3>'+
                                                            '{{#compare results.Presenters.length 0 operator=">"}}'+
                                                                '<div class="content clearfix">'+
                                                                    '<div class="title-content">'+
                                                                        '{{results.PresentersLabel}}'+
                                                                    '</div>'+
                                                                    '<div class="title-body">'+
                                                                        '<ul class="clearfix">'+
                                                                            '{{#each results.Presenters}}'+
                                                                            '<li>{{this}}</li>'+
                                                                            '{{/each}}'+
                                                                        '</ul>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                            '{{/compare}}'+
                                                            '{{#compare results.Themes.length 0 operator=">"}}'+
                                                            '<div class="content clearfix">'+
                                                                '<div class="title-content">'+
                                                                    '{{results.ThemeLabel}}'+
                                                                '</div>'+
                                                                '<div class="title-body">'+
                                                                    '<ul class="clearfix">'+
                                                                        '{{#each results.Themes}}'+
                                                                            '<li>{{this}}</li>'+
                                                                        '{{/each}}'+
                                                                    '</ul>'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '{{/compare}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="footer clearfix">'+
                                                        '{{#compare results.FullDetail null operator="!="}}' +
                                                            '{{#compare results.FullDetail.Url null operator="!="}}' +
                                                                '{{#compare results.FullDetail.Url.length "0" operator=">"}}' + 
                                                                    '<a href="{{results.FullDetail.Url}}" target="{{results.FullDetail.Target}}" class="btn btn-default full-detail pull-left">'+
                                                                        '{{results.FullDetail.LinkText}}'+
                                                                    '</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.StatusEnabled  true operator="=="}}'+
                                                            '{{#compare results.Register null operator="!="}}' +
                                                                '{{#compare results.Register.Url null operator="!="}}' +
                                                                    '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                        '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right">'+
                                                                            '{{results.EventCTAText}}'+
                                                                        '</a>'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+ 
                                                        '{{#compare results.StatusEnabled  false operator="=="}}'+  
                                                            '{{#compare results.Register null operator="!="}}' +
                                                                '{{#compare results.Register.Url null operator="!="}}' +
                                                                    '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                        '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right disabled">'+
                                                                            '{{results.EventCTAText}}'+
                                                                        '</a>'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+ 
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>',
                                'Other': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                            '<div class="list-items">'+
                                                '<div class="others-wrapper">'+
                                                    '<div class="wrap-content">'+
                                                        '<div class="content">'+
                                                                '<h4>{{results.Title}}</h4>'+
                                                                '{{#if results.Description}}'+
                                                                    '<p class="description">'+
                                                                        '{{results.Description}}'+
                                                                    '</p>'+
                                                                '{{/if}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="footer">'+
                                                        '<div class="btn-container text-right">'+
                                                            '{{#compare results.PageURL null operator="!="}}'+
                                                                '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                                    '<a href="{{results.PageURL}}" class="btn btn-primary" target="{{results.LinkTarget}}">{{results.DetailText}}</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'


}
}(this, jQuery, 'INFORMA'));

(function(INFORMA, $) {
    INFORMA.Utils = (function() {
        function _utils() {
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


/*
 * welcome-description
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.welcome_description= (function(window, $, namespace) {
    'use strict';
    //variables
    //var _welcomedescription = $('.welcome-description'),
        // _tooltip = _welcomedescription.find('.anonymous,.registered'),
    // methods
      var  init,_closeTip;
      
        _closeTip = function(){
           $('#closetip').on('click', function(){
		            $('.tool').remove();
		        });
        }


    init = function() {
        _closeTip();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.welcome_description.init());

_adjustHeigt = function(){
  var maxHeightTitle = Math.max.apply(null, el.find('.sector-card h2').map(function() {
      return $(this).height();
  }).get());
//  el.find('.slide-block-container').height(maxHeightDesc);
  var maxHeightDesc = Math.max.apply(null, el.find('.sector-card .content').map(function() {
      return $(this).height();
  }).get());

  var maxHeightSubSector= Math.max.apply(null, el.find('.sector-card .sector-list-products').map(function() {
      return $(this).height();
  }).get());

  /* removed unused maxHeightLink */

  el.find('.sector-card h2').height(maxHeightTitle);
  el.find('.sector-card .content').height(maxHeightDesc);
  el.find('.sector-card .sector-list-products').height(maxHeightSubSector);
  el.find('.sector-card .btn-container').height(maxHeightSubSector);
}

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystEventList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _AnalystEventLists = $('.analyst-profile-events'),
        List = _AnalystEventLists.find('.events-section'),
        ShowMoreBtn = _AnalystEventLists.find('.btn-more-events'),
        // methods
        init,
        ShowMore,
        UnbindEvent,
        disabledEvent;

        disabledEvent = function(){
            $('.register.disabled').click(function(e){
                e.preventDefault();
            });
        },
        
        UnbindEvent = function() {
            $('.register.disabled').on('keydown', function(e) {
                if (e.keyCode === 13 || e.which===13) {
                    e.preventDefault();
                }   
            })
        },

// removed equal height function;

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                $(this).toggleClass('showLess');
                $('.analyst-profile-events .events-section:nth-child(n+2)').slideToggle();
            })
        },

    init = function() {
        if (_AnalystEventLists.length > 0) {
            ShowMore();
            UnbindEvent();
            disabledEvent();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystEventList.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.analystProfile = (function(window, $, namespace) {
    'use strict';
     var init,
        _bindShowMore,
        _checkButton;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.show-options');
        _showMore.click(function(){
            $(this).parents('#analyst-profile').find('.descriptions').toggleClass("show-content");
        });
    }
    _checkButton = function () {
        var ContentHeight = $('.descriptions').height(),
            TotalHeight = $('.descriptions').addClass('show-content').height();

        $('.descriptions').removeClass('show-content')
        if(TotalHeight < ContentHeight) {
            jQuery('.show-options').addClass('hidden');
        }
    }
   init = function() {
        //if (_analystList.length > 0) {
            _bindShowMore();
            _checkButton();
            if(INFORMA.global.siteCore.isExperience) {
                $('#analyst-profile .show-options').hide();
                $('#analyst-profile .descriptions').addClass('show-content')
            }
        //}
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystProfile.init());

/*
 * Anlayst Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.AnalystSearch = (function(window, $, namespace) {
    'use strict';
    //variables
    var AnalystSearch = $('.analyst-search'),
        Sector = AnalystSearch.find('.sector select'),
        SubSector = AnalystSearch.find('.sub-sector select'),
        submitBtn = AnalystSearch.find('.submit-btn'),
        resetBtn = AnalystSearch.find('.btn-reset'),
        txtField = AnalystSearch.find('#name'),
        productAnalystResults = $('.product-analyst-results'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        //methods
        init, GetAjaxData, RenderSearchResult, EventsFunctions, checkButtonMore, equalHeight, RenderChangeResult, ajaxCallonSector, AppendItems, RenderAllSubSectorResults,
        emptyData,_bindShowLess;

    emptyData = function() {
        AnalystSearch.find('#name').val('');
            //$('select[name="Sector"]').prop('selectedIndex',0);
        Sector.prop('selectedIndex', 0).trigger('chosen:updated').trigger('change');
    }
    equalHeight = function() {
        var EachView = jQuery('.analyst-views');
        EachView.each(function() {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                ItemsHeader = jQuery(this).find('.analyst-list-container .analyst-details'),
                ItemsFooter = jQuery(this).find('.analyst-list-container .analyst-footer-content'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _maxHeightFooter = 0,
                _padding = 50;
            ItemsHeader.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
            ItemsFooter.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightFooter) {
                    _maxHeightFooter = Height;
                }
            })
            ItemsFooter.css('height', _maxHeightFooter);
        })
    }

    checkButtonMore = function() {
        var _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp),
            Items = productAnalystResults.find('.analyst-views');

        Items.each(function() {
            var Data = $(this).find('.btn-plus').attr('data-count');

            if (Data <= _limit) {
                $(this).find('.btn-plus').addClass('hidden');
            }
        })


    }

    RenderAllSubSectorResults = function(data, sectorId) {
        var results = data,
            html = "",
            Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
            _vp = INFORMA.global.device.viewport,
            _limit = productAnalystResults.data(_vp) + 1;

        for (var key in results) {
            if (results.hasOwnProperty(key)) {

                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystTemplate !== "undefined") ? Templates.AnalystTemplate : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }

        Parent.find('.row').html(html);
        equalHeight();
        Parent.addClass('showLess');
        addthis.toolbox('.analyst-views');
        Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideDown();
        return html;
    }

     EventsFunctions = function() {
        txtField.on('keyup', function() {
            var calcLength = jQuery(this).val().trim().length,
                SectorValue = Sector.val();
            if (calcLength < 3 && SectorValue === 'default') {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
            }
            if (calcLength > 0) {
                resetBtn.show();
            } else {
                var _Object = {
                    "Name": null,
                    "Sector": null,
                    "SearchText": $('.SearchTextSpecialist').val()
                }
                AnalystSearch.find('#name').val('');
                //$('select[name="Sector"]').prop('selectedIndex',0);
                Sector.prop('selectedIndex', 0).trigger('chosen:updated').trigger('change');
                SubSector.prop('selectedIndex', 0).trigger('chosen:updated').trigger('change');
                //$('select[name="SubSector"]').prop('selectedIndex',0);
                GetAjaxData(Urls.AnalystSearch, "Post", JSON.stringify(_Object), RenderSearchResult, null, null);
                resetBtn.hide();
            }
        })

        Sector.chosen().on('change', function() {
            var _value = jQuery(this).val(),
                _text = jQuery(this).find("option:selected").text(),
                _txtField = txtField.val().length;
            if (_value === 'default' && _txtField < 3) {
                submitBtn.addClass('disabled');
            } else {
                submitBtn.removeClass('disabled');
                resetBtn.show();
            }

            if (_value === "default") {
                SubSector.parents('.sub-sector').addClass('disabled');
                SubSector.parents('.form-group').find('label').html('By Sub-Sector');
            } else {
                SubSector.parents('.sub-sector').removeClass('disabled');
                SubSector.parents('.form-group').find('label').html('By ' + _text);
            }

            GetAjaxData(Urls.AnalystSearchDropDown, "Post", _value, RenderChangeResult, null, null);
            
            SubSector.trigger("chosen:updated");

        })

        submitBtn.on('click', function() {
            var FieldArray = AnalystSearch.find("form").serializeArray();
            for (var key in FieldArray) {
                if (FieldArray[key].value === "default") {
                    FieldArray[key].value = null;
                }
            }
            var Data = INFORMA.Utils.serializeObject(FieldArray);
            Data.SearchText = $('.SearchTextSpecialist').val();
            var GetSerializeData = JSON.stringify(Data);
            GetAjaxData(Urls.AnalystSearch, "Post", GetSerializeData, RenderSearchResult, null, null);
            //resetBtn.hide();
        })

        resetBtn.on('click', function(e) {
            e.preventDefault();
            var _Object = {
                "Name": null,
                "Sector": null,
                "SearchText": $('.SearchTextSpecialist').val()
            }
            AnalystSearch.find('#name').val('');
            //$('select[name="Sector"]').prop('selectedIndex',0);
            Sector.prop('selectedIndex', 0).trigger('chosen:updated').trigger('change');
            SubSector.prop('selectedIndex', 0).trigger('chosen:updated').trigger('change');
            //$('select[name="SubSector"]').prop('selectedIndex',0);
            GetAjaxData(Urls.AnalystSearch, "Post", JSON.stringify(_Object), RenderSearchResult, null, null);
            $(this).hide();
        })
    }

    RenderChangeResult = function(data) {
        var defaultValue = jQuery(SubSector.find('option')[0]);
        SubSector.empty();

        var html = '<option value=' + defaultValue.val() + '>' + defaultValue.text() + '</option>';

        for (var key = 0; key < data.length; key++) {
            html += '<option value=' + data[key].Value + '>' + data[key].Text + '</option>';
        }
        SubSector.html(html);
        SubSector.trigger("chosen:updated");
    }

    RenderSearchResult = function(data) {
        //INFORMA.SearchResults.RenderSearchResults(data);
        INFORMA.Spinner.Show($("body"));
        var results = data.SearchDictionary,
            html = "";

        for (var key in results) {
            if (results.hasOwnProperty(key)) {
                var Data = results[key],
                    HeaderText = key,
                    TemplateName = (Templates.AnalystList !== "undefined") ? Templates.AnalystList : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                Data.header = HeaderText;
                html += ListTemplate({ results: Data });

            }
        }
        if (Object.getOwnPropertyNames(results).length === 0) {
            $('.NoRecords').removeClass('hidden');
        } else {
            $('.NoRecords').addClass('hidden');
        }
        productAnalystResults.html(html);
        checkButtonMore();
        equalHeight();
        ajaxCallonSector();
        addthis.toolbox('.analyst-views');
        return html;
    }
/* removed unused AppendSearchResult function */

    ajaxCallonSector = function() {
            var SectorBtn = jQuery('.btn-plus');

            SectorBtn.on('click', function() {
                var sectorId = jQuery(this).data('fetch');
                var FieldArray = AnalystSearch.find("form").serializeArray(),
                    GetSerializeData = JSON.stringify(INFORMA.Utils.serializeObject(FieldArray)),
                    _Object = JSON.parse(GetSerializeData),
                    Parent = jQuery('a[data-fetch="' + sectorId + '"]').parents('.analyst-views'),
                    _vp = INFORMA.global.device.viewport,
                    _limit = parseInt(productAnalystResults.data(_vp)) + 1;

                _Object.SectorID = sectorId;
                _Object.SearchText = $('.SearchTextSpecialist').val()
                for (var key in _Object) {
                    if (_Object[key] === "default") {
                        _Object[key] = null;
                    }
                }
                if (!Parent.hasClass('showLess')) {
                    GetAjaxData(Urls.AnalystSearchAll, "Post", JSON.stringify(_Object), RenderAllSubSectorResults, null, sectorId);
                } else {
                    Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').slideUp();
                    Parent.find('.analyst-list-container:nth-child(n+' + _limit + ')').hide("fast", function(){ $(this).remove(); });
                    Parent.removeClass('showLess');
                }


            })
        },
        _bindShowLess = function () {
          var _showLess = $('.analyst-views').find('.btn-container .btn-plus .less');
          _showLess.on('click',function(){
                $('html, body').animate({
                    scrollTop: $(this).closest('.analyst-views').offset().top - 35
                },500);
          });
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify({ data: data }),
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, SearchType);
                         jQuery('.load-spinner').delay(600).remove();
                    }
                },
                error_callback: function() {
                    jQuery('.load-spinner').delay(600).remove();
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data, SearchType);
                    }
                }
            });
        },

        init = function() {
            //alert('hi');
            if (AnalystSearch.length > 0) {
                EventsFunctions();
                ajaxCallonSector();
                checkButtonMore();
                _bindShowLess();
                emptyData();
                txtField.on("keypress", function(e) {
                    if (e.which === 13) {
                        e.preventDefault();
                        if(txtField.val()){
                            submitBtn.trigger("click");
                        }
                    }
                });
            }
        };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.AnalystSearch.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ArticleList = (function(window, $, namespace) {
    'use strict';
    //variables
    var  Article = $('#article-list-section'),
        _ArticleLists = $('#article-list-section .list-container'),
        _HeadlinesLists = $('section .headline-list .list-container'),
        FilterMenu = $(".category-filter-list .categoryFilter"),
        ArticleCont = $("section .article-list"),
        HeadlineCont = $("section .headline-list"),
        isExperienceMode = INFORMA.global.siteCore.isExperience,
        Urls = INFORMA.Configs.urls.webservices,
        // methods
        init,
        SliderOption = {
            "autoplay": false,
            "autoplaySpeed": 4000,
            "sliderDots": true,
            "sliderInfinite": true,
            "slidesScroll": 3,
            "slidesShow": 3,
            "speed": 400
        },
        CreateSlider, GetCarouselOptions, GetCarouselUpdatedHtml, GetCarouselData, equalHeights, RenderCarousel, BindFilterEvents, GetListCount,headLineEqualHeight;

    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.

    GetCarouselOptions = function(ele) {
            var DataObject = ele.data(),
                OptionObj = {};

            if (typeof DataObject === "object") {
                for (var key in DataObject) {
                    if (DataObject.hasOwnProperty(key)) {
                        var val = DataObject[key];
                        OptionObj[key] = (val !== null && val !== undefined) ? val : SliderOption[key];
                    }
                }
                return OptionObj;
            }
        },
        GetListCount = function(ele) {
            var count = ele.find("li").size();
            return count;
        },
        GetCarouselUpdatedHtml = function(TemplateName, DataObject) {
            var ListTemplate = Handlebars.compile(TemplateName),
                html = ListTemplate(DataObject);
            return html;
        },
        RenderCarousel = function(xhtml, ele,m,i) {
            ele.empty().html(xhtml);
            CreateSlider(ele,m,i);
            ele.show();
            var updateCarouselHeight = setTimeout(function(){
                clearTimeout(updateCarouselHeight);
                equalHeights();
                headLineEqualHeight();
            },500);
        },
        GetCarouselData = function(data) {

            INFORMA.Spinner.Show($(".article-list"));
            INFORMA.DataLoader.GetServiceData(Urls.GetArticles, {
                method: "GET",
                data: data,
                success_callback: function(data) {
                    if (data.Articles !== undefined && data.Articles.length > 0) {
                        var html = GetCarouselUpdatedHtml(INFORMA.Templates.articleListItems, { Articles: data.Articles });
                        _ArticleLists.slick('unslick');
                        ArticleCont.show();
                        RenderCarousel(html, _ArticleLists,1,2);
                    }else{
                        ArticleCont.hide();
                    }
                    if (data.Articles !== undefined && data.Headlines.length > 0) {
                        var HeadelinesListHtml = GetCarouselUpdatedHtml(INFORMA.Templates.HeadlinesListItems, { Headlines: data.Headlines });
                        _HeadlinesLists.slick('unslick');
                        HeadlineCont.show();
                        RenderCarousel(HeadelinesListHtml, _HeadlinesLists,2,4);
                    }else{
                        HeadlineCont.hide();
                    }
                },
                error_callback: function() {

                }
            });
        },
        equalHeights = function() {
            // Select and loop the container element of the elements you want to equalise
           var Items = Article.find('.recomended-wrapper'),
                MaxHeight = 0,
                MaxWrapperHeight = 0,
                MaxTopicHeight = 0,
                MaxSubSectorHeight = 0;

                Items.each(function () {
                    var ContentHeight = $(this).find('.content').outerHeight();
                    if(ContentHeight > MaxHeight) {
                        MaxHeight = ContentHeight;
                    }
                })
                Items.find('.content').css('min-height' , MaxHeight);
                Items.each(function(){
                    var TopicHeight = $(this).find('.topics').outerHeight();
                    if(TopicHeight > MaxTopicHeight) {
                        MaxTopicHeight = TopicHeight;
                    }
                })
                Items.find('.topics').height(MaxTopicHeight);
                Items.each(function(){
                    var TopicHeight = $(this).find('.SubSectors').outerHeight();
                    if(TopicHeight > MaxSubSectorHeight) {
                        MaxSubSectorHeight = TopicHeight;
                    }
                })
                Items.find('.SubSectors').height(MaxSubSectorHeight);
                Items.each(function(){
                    var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                    if(WrapperHeight > MaxWrapperHeight) {
                        MaxWrapperHeight = WrapperHeight;
                    }
                })
                Items.find('.recomend-content').css('min-height' , MaxWrapperHeight);
        },

        headLineEqualHeight = function () {
            var items = _HeadlinesLists.find('.slick-slide'),
                maxHeight = 0,
                Padding = 0;
                items.each(function () {
                    var Height = $(this).outerHeight();
                    if(Height > maxHeight) {
                        maxHeight = Height + Padding;
                    }
                })
                items.css('height', maxHeight);
        }

        BindFilterEvents = function() {
            //Filter menu present then bind filter event to dropdown
            if (FilterMenu) {
                FilterMenu.on("change", function(e) {
                    e.preventDefault();
                    var SelectedFilter = FilterMenu.val();
                    GetCarouselData(SelectedFilter);
                });
            }
            equalHeights();

        },
        CreateSlider = function(el,mobileScroll,ipadScroll) {
            var _listItemCounts = GetListCount(el),
                Options = GetCarouselOptions(el);

            el.slick({
                dots: Options.sliderDots,
                infinite: Options.sliderInfinite,
                speed: Options.speed,
                autoplay: (!isExperienceMode) ? Options.autoplay:false,
                autoplaySpeed: Options.autoplaySpeed,
                slidesToShow: (_listItemCounts >= Options.slidesShow) ? Options.slidesShow : _listItemCounts,
                slidesToScroll: Options.slidesScroll,
                swipe: INFORMA.global.device.isDesktop ? false : true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: (_listItemCounts >= 2) ? ipadScroll : _listItemCounts,
                            slidesToScroll: ipadScroll
                        }
                    }, {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: (_listItemCounts >= 2) ? ipadScroll : _listItemCounts,
                            slidesToScroll: ipadScroll
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: mobileScroll,
                            slidesToScroll: mobileScroll
                        }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                ]
            });
        }

    init = function() {
        if(!$('.article-list').hasClass('no-carousel')) {
            if (_ArticleLists.length > 0) {
                CreateSlider(_ArticleLists,1,2);
            }
            if (_HeadlinesLists.length > 0) {
                var headlineListItems = _HeadlinesLists.find('li');
                var HeadlinesListItemsLength = headlineListItems.length;
                var _vp = INFORMA.global.device.viewportN;
                if((_vp === 2 && HeadlinesListItemsLength >= 2) || (_vp === 1 && HeadlinesListItemsLength >= 4) || (_vp === 0 && HeadlinesListItemsLength >= 6)) {
                    CreateSlider(_HeadlinesLists,2,4);
                }
                else{
                    CreateSlider(_HeadlinesLists,HeadlinesListItemsLength,HeadlinesListItemsLength);
                }   
                //headLineEqualHeight();
            }
            if (FilterMenu && !isExperienceMode) {
                $(".chosen-select").chosen({ disable_search_threshold: 10, width: "100%" });
                BindFilterEvents();
            }
        }
        $(window).on("load", function() {
            equalHeights();
            headLineEqualHeight();
        });
        $(window).on("resize", function() {
            equalHeights();
            //headLineEqualHeight();
        });

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ArticleList.init());

var INFORMA = window.INFORMA || {};
INFORMA.freearticle = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _setFreearticlePadding;
    _setFreearticlePadding = function() {
        var freearticleSection = $('#productDetails').find('.articlepage-freearticle'),
            freearticleH2 = freearticleSection.find('h2'),
            freearticleH3 = freearticleSection.find('h3');
        if (freearticleSection.length > 0) {
            if (INFORMA.global.device.viewportN === 1) {
                freearticleSection.first().css('padding-top', '35px');
                freearticleSection.last().css('padding-bottom', '35px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '35px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '25px');
            } else if (INFORMA.global.device.viewportN === 2) {
                freearticleSection.first().css('padding-top', '25px');
                freearticleSection.last().css('padding-bottom', '25px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '25px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '20px');
            } else {
                freearticleSection.first().css('padding-top', '45px');
                freearticleSection.last().css('padding-bottom', '45px');
                freearticleH2.first().css('padding-top', '0');
                freearticleH2.last().css('padding-bottom', '45px');
                freearticleH3.first().css('padding-top', '0');
                freearticleH3.last().css('padding-bottom', '30px');
            }
        }
    }
    init = function() {
        _setFreearticlePadding();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.freearticle.init());

/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _brandList = $('#product-brands-list-section, #related-products-section'),
    // methods
        init,
        _bindShowMore;

        // removed equal height function;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.product-brands-list .view-all-mobile-container');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path

              //$('.product-brands-list .container > .row > .card-col:nth-child(n+4), .card-col-heading').show();
              $(this).prev().find(".col-xs-12 ").show();
              $(this).hide();
            }
        });
    }

    init = function() {
        if (_brandList.length > 0) {
            _bindShowMore(_brandList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());

var INFORMA = window.INFORMA || {};
INFORMA.brandList = (function(window, $, namespace) {
    'use strict';
    var DynamicBrandList = $('.product-brands-list'),
        init, HideOnLoad, ClickEvents,
        Count = 1,
        BtnShowMore = DynamicBrandList.find('.btn-showMore');

// removed equal height function;

init = function () {
    }

     return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.brandList.init());
/*
 * Home Contact Us.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.homeContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var _contactUs = $('#contactus-section'),
        _accordianTile = _contactUs.find('.panel-default'),
        _eachTile = _contactUs.find('.panel-heading'),
        _eachTileBtnMargin =_contactUs.find('.panel-body'),
    // methods
        init,
        _openAccordian,
        _marginBottomWrapperCta;

        _marginBottomWrapperCta = function(){
          var _vp = INFORMA.global.device.viewportN;
           if(_vp === 0 || _vp === 1) {
          _eachTileBtnMargin.each(function(){
            var _tileBtnHeight = jQuery(this).find(".btn-container").outerHeight()-30;
            if(_tileBtnHeight>0){
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom',_tileBtnHeight+'px');
            }else{
              jQuery(this).find('.content-wrapper-cta').css('margin-bottom','15px');
            }
          });
        }
      }

    _openAccordian = function(container){
        if(INFORMA.global.device.viewportN === 2) {
            var _tiles = container.find('.panel-default');

            _tiles.each(function(key, value) {
                if(key < 2) {
                    jQuery(this).find('.panel-heading').removeClass('collapsed');
                } else {
                    jQuery(this).find('.collapse').collapse('hide');

                }
            })
        }
    }

    _eachTile.on('click', function(a) {
     a.stopPropagation();
        if(jQuery(this).hasClass('collapsed')) {
            jQuery(this).removeClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('show');
        } else {
            jQuery(this).addClass('collapsed');
            jQuery(this).parent().find('.collapse').collapse('hide');
        }
    })

// removed equal height function;


    init = function() {
        if (_contactUs.length > 0) {
            _openAccordian(_contactUs);
             _marginBottomWrapperCta();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.homeContactUs.init());

var INFORMA = window.INFORMA || {};
INFORMA.ContactUs = (function(window, $, namespace) {
    'use strict';
    //variables
    var _updateRedirectUrl,
        _showSelectedTab,
        init;

    _showSelectedTab = function() {
        var sucessTabId = $('.contactUsPage-contactUs').find(".submit-status[data-status='success']").parents('.tab-pane').attr('id');
        $('.contactUsPage-contactUs .nav-tabs a[href!="#' + sucessTabId + '"]').removeClass('active')
        $('.contactUsPage-contactUs .nav-tabs a[href="#' + sucessTabId + '"]').tab('show').addClass('active');
        //_updateRedirectUrl();
    }
    _updateRedirectUrl = function() {
        var urlRedirectHidden = $('.contactUsPage-contactUs').find('.redirect-url-field');
        if (urlRedirectHidden.length > 0) {
            urlRedirectHidden.val(window.location.href);
        }
    }
    init = function() {
        _showSelectedTab();
        var hash = document.location.hash,
            prefix = "tab_";
        if (hash) {
            $('.contactUsPage-contactUs .nav-tabs a[href="' + hash.replace(prefix, "") + '"]').tab('show').addClass('active');
            _updateRedirectUrl();
        } else {
            $('.contactUsPage-contactUs a[data-toggle="tab"]:first').tab('show').addClass('active');
            _showSelectedTab();
            _updateRedirectUrl();
        }
        $('.contactUsPage-contactUs a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            // To track Google Analytics on Open
            INFORMA.Analytics.trackFormEvents($(this), 'Open');
            window.location.hash = e.target.hash.replace("#", "#" + prefix);
            _updateRedirectUrl();
        });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ContactUs.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-July-8
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.CookiePolicy = (function(window, $, namespace) {
    'use strict';
    //variables
    /* dropCookie variable removed */
    var cookieDuration = 0, // Number of days before the cookie expires, banner reappears
        cookieName = 'cookiepolicybanneraccepted', // Name of our cookie
        cookieValue = 'yes', // Value of cookie
        // methods
        init,
        ShowBanner, CreateCookie, CheckCookie, RemoveMe;


    ShowBanner = function(name, value, days) {
            $("body").find("#cookieBanner").show();
            if($('#cookieBanner:visible').length){
                if (INFORMA.global.device.isDesktop) {
                    if($('.mainNavigation').hasClass('navbar-fixed-top')) {
                        $(".mainNavigation").css("top", $("#cookieBanner").outerHeight());
                        $('#pdp-navigation').css("top", $("#cookieBanner").outerHeight()+ $(".mainNavigation").outerHeight());
                    }
                }
                else{
                    if($('.mobileNavigation').hasClass('navbar-fixed-top')) {
                        $('.mobileNavigation').css("top", $("#cookieBanner").outerHeight());
                        $('#pdp-navigation').css("top", $("#cookieBanner").outerHeight()+ $(".mobileNavigation").outerHeight());
                    }
                }
             }   
            $("#cookieBanner a.close").on("click", function(e) {
                e.preventDefault();
                RemoveMe();
                //CreateCookie(cookieName,cookieValue, cookieDuration); 
                INFORMA.DataLoader.GetServiceData("/client/ajax/SetCookie", {
                    method: "Post",
                    data: JSON.stringify({"key":cookieName,"value":cookieValue ,"expires":cookieDuration}),
                    success_callback: function(data) {
                    }
                });
                    ///
            });
        },
        // CreateCookie = function(name,value,days) {
        //         if (days) {
        //             var date = new Date();
        //             date.setTime(date.getTime()+(days*24*60*60*1000)); 
        //             var expires = "; expires="+date.toGMTString(); 
        //         }
        //         else {
        //             var expires = "";
        //         }
        //         if(dropCookie) { 
        //             document.cookie = name+"="+value+expires+"; path=/"; 
        //         }
        // },
        CheckCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        /* unused EraseCookie function removed */
        RemoveMe = function(data) {
            $("body").find("#cookieBanner").hide();
            if($('.mainNavigation').hasClass('navbar-fixed-top')) {
                $('.mainNavigation').css('top',0);
            }
            if($('.mobileNavigation').hasClass('navbar-fixed-top')) {
                $('.mobileNavigation').css('top',0);
            }
            if($('#pdp-navigation').hasClass('navbar-fixed-top')) {
                $('#pdp-navigation').css('top', $('.mainNavigation').outerHeight());
            }
        },
        init = function() {
            var getCookieExpiryDate = ($("input.cookieDuration").val()) ? $("input.cookieDuration").val() : 365;
            cookieDuration = parseInt(getCookieExpiryDate);
            //window.onload = function() {
                if (CheckCookie(cookieName) !== cookieValue) {
                    ShowBanner();
                }
           //};
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.CookiePolicy.init());

/*
 * Dashboard.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-5
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.PreferenceTab = (function(window, $, namespace) {
    'use strict';
    //variables
    var PreferenceCheckbox = $(".preference .panel-body li .custom-checkbox"),
         CheckBoxes = $(".preference .panel-body .custom-checkbox input"),
         SelectAll = $(".preference .panel-heading .custom-checkbox input"),
        init, BindCheckboxes, CheckParentSectorCheckBox, ReadPref,CreatePref, UpdatePref, Count=0;
    

    //get all default setting value from component and check
    //if exist any default setting then update and return carousel object.
    CheckParentSectorCheckBox = function() {
        $('.preference .panel-body').each(function() {
            var Items = $(this).find('input[type="checkbox"]').length,
                CheckedItems = $(this).find('input[type="checkbox"]:checked').length;
                
            if(Items > 0) {
                if(Items == CheckedItems) {
                    $(this).parents('.panel').find('.panel-heading').find('input[type="checkbox"]').attr('checked', 'checked');
                }
            }
        })
    },
    CreatePref = function(name, value) {
        INFORMA.DataLoader.GetServiceData("/client/ajax/UpdateCookieAreaOfInterest", {
            method: "Post",
            data: JSON.stringify({"key":name,"value":value ,"expires":365}),
            success_callback: function(data) {
            }
        });
    },
    ReadPref = function(name) {
         var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
         result && (result = JSON.parse(result[1]));
         return result;
    },
    UpdatePref = function(obj, isHeading){
                var ParentEle = obj.parents(".panel-default").eq(0),
                    CountSpan = ParentEle.find("span.count"),
                    SelectedCount = ParentEle.find(".panel-body input[type=checkbox]:checked"),
                    CurrentCheckBoxs = ParentEle.find(".panel-body input[type=checkbox]"),
                    AllCheckBoxs = $(".preference .panel-body").find("input[type=checkbox]:checked"),
                    UserInterest = []; 

                if(!isHeading){
                    if(!obj.prop("checked")){
                          obj.parents(".panel").eq(0).find(".panel-heading input").prop("checked",false);
                    }
                }
                if(SelectedCount){
                    Count = SelectedCount.length;
                    CountSpan.text(Count);
                }
                jQuery.each(AllCheckBoxs, function(e){
                    if($(this).prop("checked")===true){
                       UserInterest.push($(this).val());
                    }
                }); 
                if(!UserInterest){
                    UserInterest = null;
                }else{
                    UserInterest = UserInterest.join(",");
                }
                if(SelectedCount.length===CurrentCheckBoxs.length){
                    obj.parents(".panel").eq(0).find(".panel-heading input").prop("checked",true);
                }
                CreatePref("USR_DETAIL", UserInterest);
    },
    BindCheckboxes = function(ele) {
        SelectAll.on("click",function(e){
            var CurrentCheckBoxs = $(this).parents(".panel").eq(0).find(".panel-body input");
            if($(this).prop("checked")===true){
                jQuery.each(CurrentCheckBoxs, function(e){
                    if($(this).prop("checked")!==true){
                       $(this).prop("checked",true);
                    }
                }); 
            } else{
                jQuery.each(CurrentCheckBoxs, function(e){
                       $(this).prop("checked",false);
                }); 
            }
            UpdatePref($(this),true);
        });
        CheckBoxes.on("click",function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            UpdatePref($(this),false);
        });
    },


    init = function() {
        if(PreferenceCheckbox.length){
            BindCheckboxes();
            CheckParentSectorCheckBox();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.PreferenceTab.init());

/*
 * Events Search.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-5
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.EventsViews = (function(window, $, namespace) {
    'use strict';
    //variables
    var EventsLists = $('.events-search'),
        Views = EventsLists.find('.views a'),
        CalendarView = EventsLists.find('.views a.icon-calendar'),
        ListView = EventsLists.find('.views a.icon-list-view'),
        Calendar = $('section[data-view="calendar-view"] .container'),
        List = $('section[data-view="list-view"] .container'),
        MonthSelect = $('select[name="month"]'),
        SectorSelect = $('select[name="sector"]'),
        Country = $('select[name="country"]'),
        Type = $('select[name="eventType"]'),
        NextButton = $('.fc-next-button'),
        MoreEvents = $('.btn-more-events'),
       _Start = moment(new Date()).format('MMMM YYYY'),
        _end = moment(_Start).add(11, 'months').format('MMMM YYYY'),
        _previous = moment(_Start).add(-11, 'months').format('MMMM YYYY'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        _previousDate = null,
        PageNo = 2,
        //methods
        init, RenderOnLoad, GetAjaxData, SwitchEvents, RenderLoadEvents,LoadMoreEvents,
        SetCalendarEvents, RenderParticularMonth, RenderChange, GetEventData, GetDefaultEventData,
        SetListEvents, NoEventsFound, EqualHeight, CheckCount, MoreEventsFunc, ListChangeEvents, CheckEvents, UnbindEvent, disabledEvent,SetLoadMoreEvents;

    disabledEvent = function(){
        $('.register.disabled').click(function(e){
            e.preventDefault();
        });
    },
    
    UnbindEvent = function() {
        $('.register.disabled').on('keydown', function(e) {
            if (e.keyCode === 13 || e.which===13) {
                e.preventDefault();
            }   
        })
    },
            
    GetEventData = function(monthType) {
        var eventID = $("section#events"),
            eventsEndDate = $("select[name='month'] option:last-child")[0].value,
            obj;
            if($('body').hasClass('list-view')){
                obj = {
                    data:JSON.stringify({ EventsStartDate:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       PageNo: 1,
                       EventsEndDate: eventsEndDate,
                       PageSize: List.data('count'),
                       ViewMode: 'list'
                    })
                }
            }    
            else{
                obj = {
                   data:JSON.stringify({ MonthYear:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       ViewMode: 'calendar'
                    })
                }
            }   
            return obj;        
    },
    
    GetDefaultEventData  = function(monthType) {
        var eventID = $("section#events"),
            eventsEndDate = $("select[name='month'] option:last-child")[0].value,
            obj;
            if($('body').hasClass('list-view')){
                obj = {
                   data:JSON.stringify({ 
                       EventsStartDate:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       PageNo: PageNo,
                       EventsEndDate: eventsEndDate,
                       PageSize: List.data('count'),
                       ViewMode: 'list'
                    })
                }
            }    
            else{
                obj = {
                   data:JSON.stringify({ 
                       MonthYear:  monthType,
                       SectorId: SectorSelect.val(),
                       eventType: Type.val(),
                       Country: Country.val(),
                       CurrentPage:eventID.data("currentpage"),
                       ViewMode: 'calendar'
                    })
                }
            }   
        return obj;        
    },
    
    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($('body'));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    EqualHeight = function(){
       var highestBox = 0,
        EachItem = List.find(".content-wrap"),
        padding = 0;
        jQuery('section[data-view="list-view"]').show();
        EachItem.each(function(){
            if(jQuery(this).height() > highestBox){
                highestBox = jQuery(this).height();
            }
        });
        if(jQuery('body').hasClass('calendar-view')) {
            jQuery('section[data-view="list-view"]').hide();
        }

        EachItem.height(highestBox + padding);
        if(INFORMA.global.device.viewportN == 2) {
            EachItem.height("auto");
        }
    },
    
    RenderChange = function(data) {
        CheckEvents(data);
        SetCalendarEvents(data);
        SetListEvents(data);
        UnbindEvent();
        disabledEvent();
        PageNo = 2;
    },

    LoadMoreEvents = function(data){
        CheckEvents(data);
        SetCalendarEvents(data);
        SetLoadMoreEvents(data);
        UnbindEvent();
        disabledEvent();
        PageNo++;
    },

    SetLoadMoreEvents = function(data){
        var results = data.Events,
            html = "";
            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    var Data = results[key],
                        HeaderText = key,
                        TemplateName = (Templates.EventListingPage !== "undefined") ? Templates.EventListingPage : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                        Data.Month = HeaderText;
                        Data.MonthField = Data.MonthYearField.split(" ")[0];
                        html += ListTemplate({ results: Data });
                }
            }
            List.find('.events-container').append(html);
            NoEventsFound();
            EqualHeight();
            List.attr('total-count',data.TotalResults);
            CheckCount();

            var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date('1 '+ViewDateText));

            if(ViewDate.format('MMMM YYYY') == _previous) {
                List.find('.previous').addClass('arrow-desabled');
            } else {
                List.find('.previous').removeClass('arrow-desabled');
            }

            if(ViewDate.format('MMMM YYYY') == _end) {
                List.find('.next').addClass('arrow-desabled');
            } else {
                List.find('.next').removeClass('arrow-desabled');
            }
    }

    SetListEvents    = function(data) {
        var results = data.Events,
              html = "";

            for (var key in results) {
                if (results.hasOwnProperty(key)) {
                    var Data = results[key],
                        HeaderText = key,
                        TemplateName = (Templates.EventListingPage !== "undefined") ? Templates.EventListingPage : "",
                        ListTemplate = Handlebars.compile(TemplateName);
                        Data.Month = HeaderText;
                        Data.MonthField = Data.MonthYearField.split(" ")[0];
                        html += ListTemplate({ results: Data });
                }
            }
            List.find('.events-container').html(html);
            NoEventsFound();
            EqualHeight();
            List.attr('total-count',data.TotalResults);
            CheckCount();
            var ViewDateText = jQuery('section[data-view="list-view"]').find('h2').text(),
                ViewDate = moment(new Date('1 '+ViewDateText));

            if(ViewDate.format('MMMM YYYY') == _previous) {
                List.find('.previous').addClass('arrow-desabled');
            } else {
                List.find('.previous').removeClass('arrow-desabled');
            }

            if(ViewDate.format('MMMM YYYY') == _end) {
                List.find('.next').addClass('arrow-desabled');
            } else {
                List.find('.next').removeClass('arrow-desabled');
            }
          //RenderClickEvents();
    },

    CheckCount = function() {
        List.each(function() {

            var Count = $(this).data('count'),
                Items = parseInt($(this).attr('total-count')),
                listCount = $(this).find('.events-section').length;

            if(Items > Count) {
                $(this).next('.more-events').find('.btn-more-events').removeClass('hidden');
            } else {
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
            if(Items === 0){
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            } 
            if(Items === listCount){
                $(this).next('.more-events').find('.btn-more-events').addClass('hidden');
            }
        })
    },

    RenderOnLoad = function() {
        jQuery('body').addClass('list-view');
        var date = new Date(),
            DatePass = moment(date).format('MMMM YYYY'),
            PageTemplate = $("section#events").data("currentpage"),
            MonthYear = MonthSelect.val(),
            obj = GetEventData(MonthYear);
            EqualHeight();
            CheckCount();
            _previousDate = date;
            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderLoadEvents, null, null);
    },

    RenderLoadEvents = function(data) {
        var _contentheight = null, _dayView = [],
            _vp = INFORMA.global.device.viewportN,
            header = {
                left: 'prev',
                center: 'title',
                right: 'next'
            };

        if(_vp === 2) {
            _contentheight = 100;
            _dayView = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        } else if(_vp === 1) {
            _dayView = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        } else {
            _contentheight = 1700;
            _dayView = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        }

        // if(_vp === 1 || _vp === 0) {
        //     header = {
        //         left: 'title',
        //         right: 'prev,next'
        //     }
        // } else {
        //     header = {
        //         left: 'prev',
        //         center: 'title',
        //         right: 'next'
        //     }
        // }

        // List.find('.previous').addClass('arrow-desabled');
        NoEventsFound();
        Calendar.html("");
        Calendar.fullCalendar({
                header: header,
                eventLimit: true,
                contentHeight: _contentheight,
                weekMode: 'liquid',
                firstDay: 1,
                viewRender: function(view) {
                    var Current = moment(new Date()).format('MMMM YYYY'),
                        ViewDate = moment(view.title).format('MMMM YYYY'),
                        End = moment(new Date()).add(11, 'months').format('MMMM YYYY');
                        //
                    // if(view.title == Current) {
                    //     jQuery('.fc-prev-button').addClass('disabled');
                    // } else {
                    //     jQuery('.fc-prev-button').removeClass('disabled');

                    // }
                    // if(view.title === End) {
                    //     jQuery('.fc-next-button').addClass('disabled');
                    // } else {
                    //     jQuery('.fc-next-button').removeClass('disabled');
                    // }
                },
                dayNamesShort: _dayView,
                dayClick: function(date, jsEvent, view) {
                    var _vp = INFORMA.global.device.viewportN;

                    if(_vp === 2 || _vp === 1) {
                        var selectedDate = date.format(),
                            parentNode = $(this).parents('.fc-row.fc-widget-content'),
                            DateAttr = $(this).data('date'),
                            Container = $(this).parents('.fc-view-container'),
                            ItemList = null;
                        Container.find('.fc-widget-content').removeClass('open');
                        Container.toggleClass('open-event');
                        Container.find('.events-wrap').remove();
                        Container.find('.fc-day-number').css('color','#6a7285');
                        if($(this).hasClass('event-present')) {
                            ItemList = Container.find('.events[data-date="'+DateAttr+'"]').clone();
                            ItemList.addClass('cloned');
                            parentNode.after('<div class="events-wrap"></div>');
                        } else {
                            parentNode.after('');
                        }

                        if(Container.hasClass('open-event')) {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').addClass('open');
                            Container.find('.fc-day-number[data-date="'+DateAttr+'"]').css('color','#fff');
                            Container.find('.events-wrap').html(ItemList);
                        } else {
                            Container.find('.fc-widget-content[data-date="'+DateAttr+'"]').removeClass('open');
                            Container.find('.events-wrap').remove();
                        }

                        ItemList = "";
                        Container.find('.events-wrap').hide().slideDown();
                    }

                },
                eventAfterAllRender: function(view) {
                    var _vp = INFORMA.global.device.viewportN;
                    if(_vp === 2 || _vp === 1) {

                        var Events = $('.fc-view-container .events');

                        Events.each(function () {
                            var DateField = $(this).data('date');
                            $('td.fc-day-number[data-date="'+DateField+'"]').addClass('events-now');
                            $('td.fc-widget-content[data-date="'+DateField+'"]').addClass('event-present');
                        })
                    }

                    if(_vp === 0) {
                        var OtherMonths = $('.fc-day-number.fc-other-month');

                        OtherMonths.each(function() {
                            var DateView = $(this).data('date'),
                                Month = moment(new Date(DateView)).format('MMM'),
                                Dates = moment(new Date(DateView)).format('DD');

                            $(this).html(Dates + '<sup>\/' +Month+ '</sup>');
                        })
                    }
                },
                eventRender: function(event, element, view) {
                    var CurrentDate = new Date(),
                        ItemDate = new Date(event.start._i),
                        DateAttr = moment(ItemDate).format('YYYY-MM-DD'),
                        CountryText = "",
                        ViewDate = view;

                        if(event.Country != null) {
                            CountryText = event.Country;
                        }

                        if(!event.EventText && event.Link!==null) {

                            if(moment(CurrentDate) > moment(ItemDate)) {
                                if(moment(CurrentDate).format('DD MMM YYYY') == moment(ItemDate).format('DD MMM YYYY')) {
                                    return $('<div data-date="'+DateAttr+'" class="events current"><p class="title"><a href="'+ event.Link +'" target="' +event.Target+ '">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                                } else {
                                    return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="'+ event.Link +'" target="' +event.Target+ '">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                                }
                            } else {
                                return $('<div data-date="'+DateAttr+'" class="events"><p class="title"><a href="'+ event.Link +'" target="' +event.Target+ '">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                            }
                        } else {
                            return $('<div data-date="'+DateAttr+'" class="events disabled"><p class="title"><a href="'+ event.Link +'" target="' +event.Target+ '">' + event.title + '</a></p><p class="country">'+CountryText+'</p></div>');
                        }
                }
        });
        CheckEvents(data);
        SetCalendarEvents(data);
    },
    RenderParticularMonth = function(date) { 
        var NextMonth = moment(new Date('1 ' +date)).format('MMMM YYYY');
//      PageTemplate = $("section#events").data("CurrentPage");
//             var obj = { 
//                data:JSON.stringify({MonthYear: NextMonth, 
//                              SectorId: SectorSelect.val(),
//                  eventType: Type.val(),
//                  CurrentPage:PageTemplate
//               })
//             } 
//         GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null); 
        $('#Eventmonth').val(NextMonth);
        $('#Eventmonth').trigger("chosen:updated");
        var MonthYear = NextMonth,
        obj = GetEventData(NextMonth);
        GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null); 
    },

    CheckEvents = function(data) {

        var results = data.Events,
            List = [];

        for(var key in results) {
            List = results[key];
        }

        if(List.length > 0) {
            jQuery('.no-results').hide();
        } else {
            jQuery('.no-results').show();
        }
    },

    SetCalendarEvents = function(list) {
        Calendar.fullCalendar('removeEvents');
        var data = list.Events,
            _vp = INFORMA.global.device.viewportN;

        var EventList = [];

        for(var key = 0; key < data.length ; key++) {
            EventList.push({
                "title": data[key].Title,
                "start": new Date(data[key].EventDate),
                "State": data[key].State,
                "Country": data[key].Country,
                "Link": (data[key].FullDetail != null) ? (data[key].FullDetail.Url): null,
                "Target": (data[key].FullDetail != null) ? (data[key].FullDetail.Target): null,
                "EventText": (data[key].EventText == "FullyBooked") ? true: false
            })
        }
        if(_vp === 1 || _vp === 2) {
            $('td.fc-day-number').removeClass('events-now');
            $('td.fc-widget-content').removeClass('event-present');
        }
        jQuery('section[data-view="calendar-view"]').show();
        for(var key = 0; key < EventList.length ; key++) {
            Calendar.fullCalendar('renderEvent', EventList[key], true);
        }
        if(jQuery('body').hasClass('list-view')) {
            jQuery('section[data-view="calendar-view"]').hide();
        }
    }

    SwitchEvents = function() {
        Views.on('click', function(e) {
            e.preventDefault();
            var ViewMode = jQuery(this).data('viewport');
            Views.removeClass('active');
            jQuery(this).addClass('active');
            jQuery('body').removeClass('list-view');
            jQuery('body').removeClass('calendar-view');
            jQuery('.events-list').hide();
            jQuery('body').addClass(ViewMode);

            var date = new Date(),
                DatePass = moment(date).format('MMMM YYYY'),
                PageTemplate = $("section#events").data("currentpage"),
                MonthYear = MonthSelect.val();
                EqualHeight();
                CheckCount();
                var obj = GetEventData(MonthYear);
                _previousDate = date;
                GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);
                NoEventsFound();
        })



        MonthSelect.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+value));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear); 
            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);
            NoEventsFound();
        });

        Country.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }
            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: Type.val(),
            //    Country: jQuery(this).val()})
            // }

            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear);

            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        });

        Type.on('change', function() {
            var value = jQuery(this).val(),
                check = moment(new Date('1 '+MonthSelect.val()));
            jQuery('section[data-view="calendar-view"]').show();
            Calendar.fullCalendar('gotoDate', check);
            if(jQuery('body').hasClass('list-view')) {
                jQuery('section[data-view="calendar-view"]').hide();
            }

            var MonthYear = check.format('MMMM YYYY'),
                obj = GetEventData(MonthYear);

            // var obj = {
            //    data:JSON.stringify({ MonthYear: check.format('MMMM YYYY'),
            //     SectorId: SectorSelect.val(),
            //     eventType: jQuery(this).val(),
            //    Country: Country.val()})
            // }

            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })


        SectorSelect.on('change', function(){

            var MonthYear = MonthSelect.val(),
                obj = GetEventData(MonthYear);

            // var obj = {
            //   data:JSON.stringify({  MonthYear: MonthSelect.val(),
            //     SectorId: jQuery(this).val(),
            //     eventType: Type.val(),
            //   Country: Country.val()})
            // }

            _previousDate = new Date(MonthSelect.val());
            GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

            NoEventsFound();
        })

    },
     NoEventsFound = function() {
        var Container = jQuery('.events-container'),
            Items = Container.find('.events-section');

            if(Items.length > 0) {
                jQuery('.no-result').addClass('hidden');
                $('.fc-view-container').removeClass('hidden');
            } else {
                jQuery('.no-result').removeClass('hidden');
                $('.fc-view-container').addClass('hidden');
            }
    },
    MoreEventsFunc = function() {
        MoreEvents.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.find('.container').data('count'),
                MonthYear = MonthSelect.val(),
                obj = GetDefaultEventData(MonthYear);
                GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), LoadMoreEvents, null, $(this));
        });
    },
    
    ListChangeEvents = function() {
        $(document).on('click', 'section[data-view="list-view"] .next', function() {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
                    prevMonth = moment(ViewDate).add('months', 1).format('MMMM YYYY');
                    $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
                    $('#Eventmonth').val(prevMonth);
                    $('#Eventmonth').trigger("chosen:updated");
                    var MonthYear = prevMonth,
                        obj = GetEventData(MonthYear);
                    // var obj = {
                    //    data:JSON.stringify({  MonthYear: prevMonth,
                    //     SectorId: SectorSelect.val(),
                    //    Country: Country.val(),
                    //     eventType: Type.val()})
                    // }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', 1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

        });
        $(document).on('click','.fc-next-button, .fc-prev-button', function(){
            var currentMonth = jQuery(this).parents('.fc-toolbar').find('h2').text();
            RenderParticularMonth(currentMonth);
        });
        $(document).on('click', 'section[data-view="list-view"] .previous', function() {
            var DateText = $(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date('1 '+DateText),
                    prevMonth = moment(ViewDate).add('months', -1).format('MMMM YYYY');
                    $(this).parents('section[data-view="list-view"]').find('.header h2').text(prevMonth)
                    $('#Eventmonth').val(prevMonth);
                    $('#Eventmonth').trigger("chosen:updated");
                    var MonthYear = prevMonth,
                        obj = GetEventData(MonthYear);

                    // var obj = {
                    //   data:JSON.stringify({   MonthYear: prevMonth,
                    //     SectorId: SectorSelect.val(),
                    //   Country: Country.val(),
                    //     eventType: Type.val()})
                    // }
                    jQuery('section[data-view="calendar-view"]').show();
                    Calendar.fullCalendar('gotoDate', moment(ViewDate).add('months', -1));
                    jQuery('section[data-view="calendar-view"]').hide();
                    GetAjaxData(Urls.EventsSearch, "Post", JSON.stringify(obj), RenderChange, null, null);

        });
    }

    init = function() {
        if(EventsLists.length > 0) {
            RenderOnLoad();
            SwitchEvents();
            MoreEventsFunc();
            ListChangeEvents();
            UnbindEvent();
            disabledEvent();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.EventsViews.init());
var INFORMA = window.INFORMA || {};
INFORMA.FAQs = (function (window, $, namespace) {
    'use strict';
    //variables
    var FaqMoreBtn = $('.btn-faq-more'),
        pageNo = 0,
        AccordianWrapper = $('.accordian-structure'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        init, BindMore, ResetAccordian, GetAjaxData, GetFaqIds, RenderFaqs;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify(data),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    RenderFaqs = function (data, Button) {

        var Results = data,
            List = Results.FaqList,
            AccordianId = Results.FaqAccordionId,
            Html = "",
            TabsValue = "";

        for (var key = 0; key < List.length; key++) {
            var Data = List[key],
            TemplateName = (Templates.AccordianTemplate !== "undefined") ? Templates.AccordianTemplate : "",
            ListTemplate = Handlebars.compile(TemplateName);
            Data.FaqAccordionId = AccordianId + Button.parents('.accordian-structure').attr('data-tabs');
            if(Button.parents('.accordian-structure').attr('data-tabs'))
            Data.Tabs = Button.parents('.accordian-structure').attr('data-tabs');
            Html += ListTemplate({ results: Data });
        }

        if(Button.parents('.accordian-structure').attr('data-tabs').length > 0) {
            TabsValue = Button.parents('.accordian-structure').attr('data-tabs');
        }

        if($('.help-faq-wrapper').length > 0) {
            Button.parents('.help-faq-wrapper').find('.panel-group[data-panel="'+AccordianId + TabsValue+'"]').append(Html);
        } else {
            Button.parents('.accordian-wrap').find('.panel-group[data-panel="'+AccordianId + TabsValue+'"]').append(Html);
        }

        if (Results.FaqRemainingCount < 1) {
            $('.panel-group#' + AccordianId + TabsValue).parent().find('.btn-faq-more').hide();
        } else {
            $('.panel-group#' + AccordianId + TabsValue).parent().find('.btn-faq-more').show();
        }
    },

    GetFaqIds = function (Parent) {
        var panels = Parent.find('.panel-collapse'),
            ids = [];

        panels.each(function () {
            var Current = $(this).attr('data-fetch');
            ids.push(Current);
        })

        return ids;
    },

    ResetAccordian = function () {
        var Items = AccordianWrapper.find('.panel-group');
        if($('.help-faq-wrapper').length > 0) {
            $('.help-faq-wrapper .accordian-wrap').addClass('hide');
            $('.help-faq-wrapper .accordian-wrap:first-child').removeClass('hide').addClass('show');
        }
        Items.each(function () {
            $(this).attr('data-pageno', pageNo);
        });
    },

    BindMore = function () {
        FaqMoreBtn.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.accordian-wrap'),
                CurrentPage = Parent.find('.panel-group').attr('data-pageno'),
                HelpDropdown = Parent.parents('.accordian-structure').find('.help-faq-select'),
                Count = Parent.parents('.accordian-structure').attr('data-count'),
                CurrentPageItemGuid = Parent.parents('.accordian-structure').attr('data-CurrentPageItemGuid'),
                SearchTextFaqs = $('.SearchTextFAQ').val(),
                _Object = {
                    PageNo: 0,
                    PageSize: Count,
                    CurrentPageItemGuid: CurrentPageItemGuid,
                    SearchText: SearchTextFaqs
                };

            _Object.ExcludedFAQItemIds = GetFaqIds(Parent);

            if (HelpDropdown.length > 0) {
                _Object.FAQTypeItemGuid = HelpDropdown.val();
            } else {
                _Object.FAQTypeItemGuid = null;
            }
            Parent.find('.panel-group').attr('data-pageno', (parseInt(CurrentPage) + 1));

            GetAjaxData(Urls.GetFAQs, "Post", _Object, RenderFaqs, null, $(this));
        })
    },

    init = function () {
        if (AccordianWrapper.length > 0) {
            ResetAccordian();
            BindMore();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.FAQs.init());
/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.featureList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _featureList = $('.feature-list'),
        _featureListContainer = $('.feature-list-container'),
        _featureListSection = $('.feature-list-section-pharma, .feature-list-section'),
        // methods
        init,
        _hideList,
        _bindShowMore,
        _bindShowLess;

    _bindShowMore = function() {
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.feature-list-section .btn-showMore');
        _showMore.on('click', function() {
            var _vp = INFORMA.global.device.viewport,
                _limit = $(this).parents('.feature-list-section').data(INFORMA.global.device.viewport) + 1,
                Parent = $(this).parents('.feature-list-section'),
                Children = Parent.find('.feature-list-container');
            $(Children.slice((_limit - 1), Children.length)).slideToggle();
            Parent.toggleClass('showLess');
        });
    }
    _hideList = function(ListItems) {
        if (ListItems.length > 0) {
            ListItems.each(function() {
                $(this).find('.feature-list-btn-container').hide();
                var _limit = $(this).data(INFORMA.global.device.viewport) + 1,
                    containersLength = $(this).find('.feature-list-container').length,
                    containerConfigLength = $(this).data(INFORMA.global.device.viewport);


                if (_limit) {
                    $(this).find(".feature-list-container:nth-child(n+" + _limit + ")").hide();
                    if (containersLength > containerConfigLength) {
                        $(this).find('.feature-list-btn-container').show();
                    } else {
                        $(this).find('.feature-list-btn-container').hide();
                    }
                }else{
                  $(this).find('.feature-list-btn-container').show();
                }
            });
        }
    }
// removed equal height function;


    _bindShowLess = function () {
      var _showLess = $('.feature-list-section').find('.btn-showMore .less');
        _showLess.on('click',function(){
          $('html, body').animate({
              scrollTop: $(this).closest('.feature-list-section').offset().top - 50
          });
        });
    }

    init = function() {
        if (_featureListSection.length > 0) {
            if($('.feature-list-section').length > 0) {
                _hideList(_featureListSection);
            }
            _bindShowMore();
          
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.featureList.init());

var INFORMA = window.INFORMA || {};
INFORMA.formComponents = (function(window, $, namespace) {
    'use strict';
    var _toolTip = $('.hasToolTip .icon.icon-info'),

        //functions
        init,
        _bindToolTip,
        _showOverlay, _validateForm;

    _showOverlay = function(container) {

        //alert(1);
    }

    _validateForm = function() {
        $('#requestDemoForm').validate({
            errorPlacement: function(error, element) {        
                if (element.attr('type') === 'select') {          
                    error.insertAfter(element.closest('.chosen-container'));        
                }
                else{
                  error.insertAfter(element);        
                }
            }
        });
        $('#requestTrial').validate({
            ignore: [],
            errorPlacement: function(error, element) {     
              console.log(error, element);   
                if (element.hasClass('chosen-select')) {          
                    error.insertAfter(element.siblings('.chosen-container'));        
                }
                else{
                  error.insertAfter(element);        
                }
            },
            submitHandler: function(){
              console.log("Form Submit")
            }
        });
    }

    init = function() {
        //todo: No null check, dont execute these bindings if forms are not there
        // _showOverlay();
        // _bindToolTip();
        // _validateForm();

    };

    _bindToolTip = function() {
        _toolTip.on('click', function() {
            $(this).toggleClass('active');
            $(this).parent().parent() // .hasToolTip
                .children('.tooltip-placeholder').slideToggle();
        })
    }


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formComponents.init());

var INFORMA = window.INFORMA || {};
INFORMA.RegistrationInterests = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        _showProgressiveTabs,
        _renderMultiSelect,
        _renderSingleSelect,
        _showNextTab,
        _showPrevTab,
        _appendNextBtn,
        _appendBackBtn,
        _myinterestsSection = $('.register-myinterests-section'),
        _myinterestForm = $('.register-myinterests-form'),
        _myinterestFormContainer = $('.register-myinterests-form-container'),
        _myinterestFormTabContainer = _myinterestFormContainer.find('tab-content'),
        _myinterestFormSubmitBtn = _myinterestForm.find('input[type="submit"]'),
        _stepOneContaner = _myinterestFormContainer.find('#step1'),
        _stepTwoContaner = _myinterestFormContainer.find('#step2'),
        _recommendedTips = $('.recommended-tips'),
        _recommendedTipsContainer = $('.recommended-tips-container'),
        _recommendedTipCol = $('.recommended-tips-col'),
        _appendSteps,
        _wrapFormContainer,
        _renderAllContainers,
        _renderRecommendedTips,
        _updateMultiSelect,
        _multiselectonchange,
        _showSelectAll,
        _hideSelectAll,
        _yourinterestguid = [],
        _yourinterestitem = [],
        _isAllSelected = 'false',
        //_validateMultiSelct,
        _showRegisterFormBtn = $('.show-register-form'),
        _showRegisterForm,
        _showRegisterFormPopup,
        _myinterestsModal = $('#registerMyinterestModal'),
        _myinterestsModalClose = $('.register-myinterests-close'),
        _validateEmailDomainMsg,
        _getAjaxData, _SelectAll,
        Urls = INFORMA.Configs.urls.webservices,
        _parseResults,
        _bindNumber,
        _clearFormInput,
        _bindToggleTab,
        _destroyMultiSelect,
        _addTabNumbers,
        _closeMyInterestModal,
        _showRegisterFormPopupSingleStep,
        _validateCountry,
        _showContentFirstTime,
        Urls = INFORMA.Configs.urls.webservices,
        iOSversion;

    //methods

    _clearFormInput = function(form) {
        form.find('input[type=text], input[type=password], input[type=number], input[type=email], input[type=tel], textarea').val('');
        form.find('.area-interests-guid').val('');
        form.find('.area-interests-text').val('');
        form.find(".field-validation-error span").hide();
        form.find('input[type=radio]').removeAttr('checked');
        form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        form.find('.preselected-checkbox input[type=checkbox]').prop('checked', true);
        form.find('select.chosen-select').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }
    _getAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, SearchType);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data, SearchType);
                    }
                }
            });
        },

    _addTabNumbers = function() {
            var progressiveTabs = $('.form-progressive-wizard a[data-toggle="tab"]');
            if (progressiveTabs.length > 0) {
                $.each(progressiveTabs, function(i) {
                    $(this).prepend('<span class="tab-numbers">' + (i + 1) + '</span>');
                });
            }
        },

        _bindToggleTab = function() {
            $('.form-progressive-wizard a[data-toggle="tab"]').on('show.bs.tab', function(e) {
                if (_myinterestForm.valid() == true) {
                    var $target = $(e.target);
                    if ($target.attr('href') == "#step2" && $target.parent().attr('class') == 'active') {
                        _recommendedTipCol.css('display', 'block');
                    } else {
                        _recommendedTipCol.css('display', 'none');
                    }
                    if ($target.parent().hasClass('disabled')) {
                        return false;
                    }
                } else {
                  var validator = _myinterestForm.validate();
                    validator.focusInvalid();
                    return false;
                }
            });
        }
    _showRegisterFormPopup = function() {
        _myinterestsModal.find('.modal-body').empty();
        _myinterestsModal.find('.modal-body').append(_myinterestsSection);
        var chosenSelect = $("form.register-myinterests-form .chosen-select"),
        chosenCotainer = $('form.register-myinterests-form .chosen-container');
        if(chosenCotainer.length > 0 ){
          chosenCotainer.remove();
        }
        if(chosenSelect.length > 0){
          chosenSelect.chosen('destroy');
          chosenSelect.chosen({
              disable_search_threshold: 10,
              width: "100%"
          });
        }
        _myinterestsModal.find('.modal-body .container').removeClass('container');
        _clearFormInput(_myinterestForm);
        _yourinterestguid = [];
        _yourinterestitem = [];
        var resetFormValidate = _myinterestForm.removeData("validator").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse(resetFormValidate);
        var $active = $('.form-progressive-wizard .triangle-nav li.active');
        if ($active) {
            _showPrevTab($active);
        }
        _bindToggleTab();
        _destroyMultiSelect();
        _renderMultiSelect();

        $.each($('.custom-multiselect'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });

        $.each($('.select-wrapper'), function() {
            var secondBtnGroup = $(this).find('.btn-group').eq(1);
            if (secondBtnGroup) {
                secondBtnGroup.remove();
            }
        });
        _myinterestsModal.modal('show');
    }
    _showContentFirstTime = function(){
        $('body').on('click', '.show-content-first-time', function(e) {
            e.preventDefault();
            var value = $(this).attr('href');
            var data = $(this).attr('data-firstcontent');
            if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
                setTimeout(function(){
                    _getAjaxData(Urls.SetFirstContentDisplayedCookie, "Post", JSON.stringify({"firstContent": data}), null, null, null);
                },100)    
            }
            else{
                _getAjaxData(Urls.SetFirstContentDisplayedCookie, "Post", JSON.stringify({"firstContent": data}), null, null, null);
            }
            if(!$(this).attr('data-target') == "loadPDFComponentModal" )
                window.location.href = value;
        })
    }
    
    _showRegisterForm = function() {
        $('body').on('click', '.show-register-form', function(e) {
            if ($(this).attr('data-show-register') == 'true') {
                // To track Google Analytics on Open

                INFORMA.Analytics.trackFormEvents($(this), 'Open');
                e.preventDefault();
                e.stopPropagation();

                $('.redirect-url-field').val($(this).attr('data-url'));
                //_showRegisterFormPopup();
                _showRegisterFormPopupSingleStep();

                if ($(this).attr('pdf-data-url')) {
                    if (document.getElementsByClassName("showPdfUrl").length == 0) {
                        var x = document.createElement("INPUT");
                        x.setAttribute("type", "hidden");
                        x.setAttribute("value", $(this).attr('pdf-data-url'));
                        x.setAttribute("id", "showPdfUrl");
                        x.setAttribute("class", "showPdfUrl");
                        document.body.appendChild(x);
                    } else {
                        $("#showPdfUrl").val($(this).attr('pdf-data-url'));
                    }
                }
            }
            else if ($(this).attr('pdf-data-url')) {
                $("#showPdfUrl").val($(this).attr('pdf-data-url'));
                PDFJS.webViewerLoad($("#showPdfUrl").val());
                document.getElementById("PDFtoPrint").setAttribute("src", $("#showPdfUrl").val());
            } else {
                $(this).attr('href', $(this).attr('data-url'));
            }
            
        });
    }

    iOSversion = function(){
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var appVer = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(appVer[1], 10), parseInt(appVer[2], 10), parseInt(appVer[3] || 0, 10)];
        }
    }
    
    _showRegisterFormPopupSingleStep = function(){
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };  
        _clearFormInput(_myinterestForm);
        var chosenSelect = $("form.register-myinterests-form .chosen-select"),
        chosenCotainer = $('form.register-myinterests-form .chosen-container');
        if(chosenCotainer.length > 0 ){
          chosenCotainer.remove();
        }
        if(chosenSelect.length > 0){
          chosenSelect.chosen('destroy');
          chosenSelect.chosen({
              disable_search_threshold: 10,
              width: "100%"
          });
        }
        var version = iOSversion();
        if (version !== undefined) {
            if(version[0] >= 11){
                $('#formRegistration').on('show.bs.modal', function () {
                    $('body').addClass('body-fixed');
                });
                $('#formRegistration').modal({
                    show: 'true'
                })
                $('#formRegistration').on('hide.bs.modal', function () {
                    $('body').removeClass('body-fixed');
                });
            }
        }
        else {
            if($('.show-register-form').attr('data-show-register') == 'true')
               $('#formRegistration').modal('show'); 
        }
        
        // var a = Math.ceil(Math.random() * 9)+ '';
        // var b = Math.ceil(Math.random() * 9)+ '';
        // var c = Math.ceil(Math.random() * 9)+ '';
        // var d = Math.ceil(Math.random() * 9)+ '';
        // var e = Math.ceil(Math.random() * 9)+ '';
        // var code = a + b + c + d + e;
        // $('.txtCaptcha').val(code);
        // $(".CaptchaDiv").html(code);
        _validateCountry();
    }


     _validateCountry = function() {
        $('.wffm-form .chosen-container').on('click mousedown', function(e) {
            e.preventDefault();
            var selectform = $(this).find('.select-default');
            if(selectform.text()){
                selectform.css('display','none');
            }
        });    
    }
    
    _renderRecommendedTips = function() {
        _recommendedTipsContainer.append(_recommendedTips);
        _recommendedTipCol.css('display', 'none');
    }
    _destroyMultiSelect = function() {
        _myinterestForm.find('select[multiple="multiple"]').multiselect('rebuild');
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                }
            });
        }
    }
    _renderAllContainers = function() {
        _myinterestForm.append(_myinterestFormContainer);
        _myinterestForm.addClass('row');
        _addTabNumbers();
        _renderSingleSelect();
        _renderMultiSelect();
    }
    _wrapFormContainer = function() {
        _myinterestFormContainer.before(_myinterestForm);
    }
    _appendSteps = function() {
        var step1Block = _myinterestForm.find('fieldset.step1'),
            step2Block = step1Block.nextAll();
        _stepOneContaner.prepend(step1Block);
        _stepTwoContaner.prepend(step2Block);
        //    aboutYouBlock.remove();
    }

    _appendBackBtn = function() {
        var backBtn = $('.prev-step')[0],
            btnContainer = _myinterestForm.find(":submit").parent();
        btnContainer.append(backBtn);
    }
    _showNextTab = function(elem) {
        $(elem).next().find('a[data-toggle="tab"]').click();
        _recommendedTipCol.css('display', 'block');
        _myinterestFormContainer.removeClass('background-pattern');
    }
    _showPrevTab = function(elem) {
        $(elem).prev().find('a[data-toggle="tab"]').click();
        $('.about-you-details').find(":input:not([type=hidden]):first").focus();
        _recommendedTipCol.css('display', 'none');
        _myinterestFormContainer.addClass('background-pattern');
    }

    _renderMultiSelect = function() {
        var findMultipleSelect = _myinterestForm.find('select');
        if (findMultipleSelect.length > 0) {
            $.each(findMultipleSelect, function(i) {
                if ($(this).attr('multiple') == 'multiple') {
                    $(this).multiselect('destroy');
                    var placeHolder = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).multiselect({
                        buttonText: function(options, select) {
                            return placeHolder;
                        },
                        maxHeight: 220,
                        onChange: _updateMultiSelect,
                        onDropdownShow: _showSelectAll,
                        onDropdownHidden: _hideSelectAll,
                        numberDisplayed: 1
                    });
                    var placeHolderText = $(this).parents('.form-group').find('.sector-placeholder-text').text();
                    $(this).next().find('button.multiselect>.multiselect-selected-text').html(placeHolderText)
                    var mutiselectContainer = $(this).next().find('.multiselect-container');
                    if (!mutiselectContainer) {
                        var newMultiselectContainer = $(this).parent().find('.multiselect-container').detach();
                        $(this).next().append(newMultiselectContainer);
                    }
                    var selectAllDiv = $('<div class="select-all-bottom"><a class="multiselect-all" data-selectall="false" href="#">Select all</a></div>');
                    $(this).next().append(selectAllDiv);
                }
            });
            _SelectAll();
        }
        $('.multiselect-container').mCustomScrollbar();
    }

    _showSelectAll = function(select) {
        $(this.$container).parent().find("select").addClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'block');
    }
    _hideSelectAll = function() {
        $(this.$container).parent().find("select").removeClass("active");
        $(this.$container).find('.select-all-bottom').css('display', 'none');
    }
    _updateMultiSelect = function(option, checked, select) {
        if (option) {
            if (checked) {
                _yourinterestitem.push(option.text());
                _yourinterestguid.push(option.val());
            } else {
                _yourinterestitem.splice($.inArray(option.text(), _yourinterestitem), 1);
                _yourinterestguid.splice($.inArray(option.val(), _yourinterestguid), 1);
            }
            _yourinterestguid = $.unique(_yourinterestguid);
            _yourinterestitem = $.unique(_yourinterestitem);
            _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
            _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
        }

    }
    _SelectAll = function() {
        var Element = $(".select-all-bottom a");
        if (Element.length > 0 ) {
          $.each(Element, function(){
            $(this).on("click", function(e) {
                _isAllSelected = $(this).attr('data-selectall');
                e.preventDefault();
                if (_isAllSelected == 'false') {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("selectAll", true);
                    var CurrentVals = CurrentSelect.val();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                    $.each(CurrentTxt,function(index, value){
                      if ($.inArray(value, _yourinterestitem)==-1){
                        _yourinterestitem.push(value);
                      }
                    });
                    $.each(CurrentVals,function(index, value){
                        if ($.inArray(value, _yourinterestguid)==-1){
                          _yourinterestguid.push(value);
                        }
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                    $(this).attr('data-selectall', 'true');
                  //  _isAllSelected = true;
                } else {
                    var CurrentSelect = $(this).parents('.form-group').find("select");
                    CurrentSelect.multiselect("deselectAll", false);
                    var CurrentVals = CurrentSelect.find('option').map(function() {
                        return $(this).val();
                    }).get();
                    var CurrentTxt = CurrentSelect.find('option').map(function() {
                        return $(this).text();
                    }).get();
                     _yourinterestitem = $.grep(_yourinterestitem, function(value) {
                        return $.inArray(value, CurrentTxt) < 0;
                    });
                     _yourinterestguid = $.grep(_yourinterestguid, function(value) {
                        return $.inArray(value, CurrentVals) < 0;
                    });
                    _yourinterestguid = $.unique(_yourinterestguid);
                    _yourinterestitem = $.unique(_yourinterestitem);
                    _myinterestForm.find('.area-interests-guid').val('');
                    _myinterestForm.find('.area-interests-guid').val(_yourinterestguid);
                    _myinterestForm.find('.area-interests-text').val('');
                    _myinterestForm.find('.area-interests-text').val(_yourinterestitem);
                  //  _isAllSelected = false;
                    $(this).attr('data-selectall', 'false');
                }
                return false;
            });
          });

        }
    }
    _showProgressiveTabs = function() {
        _bindToggleTab();
        $(document).on('click', '.next-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            $active.next().removeClass('disabled');
            var emailError = $('form.register-myinterests-form .email-field').parent().find('.email-validation-message.show');
            $('form.register-myinterests-form').find('.field-validation-error span').css('display', 'block');
            if (emailError.length == 0) {
                if (_myinterestForm.valid() == true) {
                    var formSubmitBtn = $('form.register-myinterests-form').find('.form-submit-border .btn');
                    formSubmitBtn.removeAttr('disabled');
                    _showNextTab($active);
                }else{
                  var validator = _myinterestForm.validate();
                    validator.focusInvalid();
                    return false;
                }
            }
        });

        $(document).on('click', '.prev-step', function(e) {
            var $active = $('.form-progressive-wizard .triangle-nav li.active');
            _showPrevTab($active);
        });
    }

    // _validateMultiSelct = function() {
    //     $.validator.setDefaults({
    //         ignore: ":hidden:not(.chosen-select)"
    //     });
    //     $("form.register-myinterests-form .chosen-select").on('change', function() {
    //         $(this).valid();
    //     });
    // }

    _renderSingleSelect = function() {
        $("form.register-myinterests-form .chosen-select").chosen({
            disable_search_threshold: 10,
            width: "100%"
        });
    }

    _closeMyInterestModal = function() {
        _myinterestsModalClose.click(function() {
            $("form.register-myinterests-form .chosen-select").chosen('destroy');
        });
    }

    init = function() {
        if (_myinterestForm.length > 0) {
            // _showProgressiveTabs();
            // _appendBackBtn();
            // _appendSteps();
            // _wrapFormContainer();
            // _renderAllContainers();
             _bindNumber();
            // _renderRecommendedTips();
            //_validateMultiSelct();
            _showRegisterForm();
            _closeMyInterestModal();
            _validateCountry();
            _showContentFirstTime();

        } else {
            _myinterestsSection.css('display', 'none');

        }
        

    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RegistrationInterests.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.formRequestForDemo = (function(window, $, namespace) {
    'use strict';
     var _toolTip = $('.hasToolTip .icon.icon-info'),

//functions
     init,
      _bindToolTip,
        _showOverlay;

    /* unused _showOverlay function removed */

    init = function() {
          //todo: No null check, dont execute these bindings if forms are not there

          //  _showOverlay();
        //    _bindToolTip();

    };

    /* unused _bindToolTip function removed */


    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.formRequestForDemo.init());

var INFORMA = window.INFORMA || {};
var modal_Id = '';
INFORMA.forms = (function(window, $, namespace) {
    'use strict';
    var _formModal = $('.form-modal'),
        _formModalBtn = $('.form-btn-container .form-modal-btn'),
        _formSubmitStatus = $('.submit-status'),
        _formInlineContiner,
        months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthName = '',
        monthNbr = '',
        Urls = INFORMA.Configs.urls.webservices,
        formHeading,
        productId,
        _formId,

        //functions
        init,
        _validateEmail,
        _showModal,
        _resetForm,
        _getAjaxData,
        _parseResults,
        _parseVerticalName,
        _bindProductId,
        _bindToolTip,
        _bindCalendar,
        _bindSelectOptions,
        _bindValidationLogic,
        _showOverlay,
        _showOverlayQueryString,
        _validateAllForms,
        _reCaptchaHandler,
        _disableSubmit,
        _showHideInlineForm,
        _HideOverlay,
        _showFormIntro,
        _bindNumber,
        _updateProductVerticalName,
        _validateChoosenSelect,
        _destroyChosenInDevice,
        _customPhoneErrorMsg,
        _reCaptchaAccessbility,
        _updateHiddenProductVerticalName,
        _resetFormOnRefresh,
        _resetDefaultTitle,
        _UpdateHiddenFields,
        _RemoveStatus,
        RemoveParameterFromUrl,
        _productDropdownUpdate,
        _setFormModalFocus,
         _UpdateProductName,
        _changeProductDropdown,
        _formBtnOnHover,
        _validateCountry,
        //_trackCaptchaAnalytics,
        iOSversion,
        getCurrentform;

    _validateChoosenSelect = function() {
        $.validator.setDefaults({
            ignore: ":hidden:not(.chosen-select)"
        });
        $(document).on('change','.wffm-form .chosen-select', function() {
            $(this).valid();
        });
    }
        
    _setFormModalFocus = function(){
          $(".wffm-form .product-list").on('change', function() {
            $('body').scrollTop(300);
            $('.wffm-form').filter(':input:first').focus();
          });
          $(".wffm-form .country-list").on('change', function() {
              $('body').scrollTop(300);
              $('.wffm-form').filter(':input:first').focus();
          });
    };

    _changeProductDropdown = function() {
        $('.product-list').on('change', function() {
            var Parent = $(this).parents('form'),
                Value = $(this).val();

            Parent.find('.tc-product-name').html(Value);
        })
    };

    RemoveParameterFromUrl = function( url, parameter ) {

        if( typeof parameter == "undefined" || parameter == null || parameter == "" ) throw new Error( "parameter is required" );
        var regex =new RegExp( "\\b" + parameter + "=[^&;]+[&;]?", "gi" );
        if(regex.test(url)){
            url = url.replace(regex, "" );

            // remove any leftover crud
            url = url.replace( /[&;]$/, "" );

            var NewUrl = url.split('?');

            if(NewUrl.length === 1) {

                url = NewUrl;
            }

            return url;
        }
        
    };

    _resetDefaultTitle = function(elem) {
        var SecondaryHeading = $('.form-secondary-title');

        if(SecondaryHeading.length > 0) {
            SecondaryHeading.each(function() {
                var GetTitle = $(this).val();
                var Parent = $(this).parents('.modal');
                var ParentId = $(elem).attr('data-modal');
                if(Parent.length > 0) {
                    // var isHeading = Parent.find('.product-name-holder').text();
                    // if(isHeading.length === 0) {
                     Parent.find('h2').text(GetTitle);
                    // }
                    var Product = $(ParentId).find('.product-list').val();
                    $(ParentId).find('.tc-product-name').text(Product);
                }
            });
        }
    },
    _updateHiddenProductVerticalName = function() {
        $(document).ready(function() {
            var ProductName = $('.product-name').val(),
                VerticalName = $('.vertical-name').val();
            if (ProductName || VerticalName) {
                $('span.product-name-holder').html(ProductName);
                $('.product-name-holder').val(ProductName);
                $('.vertical-name-holder').val(VerticalName);
                $('.tc-product-name').html(ProductName);
                $('.tc-vertical-name').html(VerticalName);
                if ( ProductName && ProductName.length > 0) {
                    $('.tc-product-name').html(ProductName);
                } else {
                    $('.tc-product-name').html(VerticalName);
                }
            }
             _UpdateProductName();
        });
    }
    _bindNumber = function() {
        $(document).on('keypress', 'input[type="number"]', function(e) {
            if ((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123)) {
                e.preventDefault();
            }
        })
    }

    _HideOverlay = function() {
        $('.form-modal').on('hidden.bs.modal', function() {
            var Parent = $(this),
                Status = Parent.find('.submit-status');

            Status.attr('data-status', '');

            Parent.find('.submit-response, .error-response').addClass('hide');

            Parent.find('form').removeClass('hide');

            _RemoveStatus();
        })
    }

    _RemoveStatus = function() {
        //Updating the status of the url
        var url = window.location.href,
            Title = document.title,
            RemoveStatus = RemoveParameterFromUrl(url, "sc_wffm_status"),
            NewUrl = RemoveParameterFromUrl(RemoveStatus, "sc_wffm_clientid");

        window.history.pushState('', Title, NewUrl);
    }

     //Recaptcha handler on click of submit and google analytics changes
    _reCaptchaHandler = function () {
        $("form.get-in-touch, form.request-a-demo, form.single-step-form").on('click','input[type="submit"]',function(e) {
            getCurrentform = $(this).parents('form');
            if(getCurrentform.valid() === true){
                e.preventDefault();
                grecaptcha.reset();
                grecaptcha.execute();
                //Google analytics changes on submit of registration form
                if(($(this).parents('.modal').attr('id') == 'formRegistration') || ($(this).parents('.registration-form-single-section').find('.form-inline-container').attr('data-modal') == 'formRegistration')){
                    var value = $('.close-download-form').attr('data-url') ? $('.close-download-form').attr('data-url') : "";
                    var pdfValue = $('.close-download-form').attr('pdf-data-url') ? $('.close-download-form').attr('pdf-data-url') : "";
                    if(value !== "" || pdfValue != ""){
                        // if (value.toLowerCase().match(/\.(pdf|doc)/g)) {
                            _showOverlay();
                            if(pdfValue != ""){
                            $('.close-download-form').removeClass('wffm-elq-form-btn');
                            }
                                INFORMA.Analytics.trackFormEvents($(this), 'Submit');
                                _formModal.modal('hide');
                            
                            $('.close-download-form').attr('data-show-register',false);
                            $('.close-download-form').attr('target',"_blank");

                        // }    
                    }
                    else{
                        INFORMA.Analytics.trackFormEvents($(this), 'Submit');
                    }
                } 
            }
        });   
    }

    //Success callback
    window.onSubmit = function (token) {
        if (getCurrentform.submit()) {
            if ($('.show-register-form').attr('pdf-data-url')) {
                $("#loadPDFComponentModal").modal("show");
                $('#loadPDFComponentModal').on('shown.bs.modal', function (e) {
                    PDFJS.webViewerLoad($("#showPdfUrl").val());
                })

            }
        }
    }

    // _reCaptchaHandler = function() {
    //     $("form.get-in-touch, form.request-a-demo, form.single-step-form").submit(function() {
    //         var theform = $(this);
    //         if($(".CaptchaDiv").is(':visible')){
    //             if($.trim(theform.find('.CaptchaInput:visible').val()).length == 0){
    //                 theform.find('.captcha-field').html('The captcha field is required.');
    //                 return false;
    //             }
    //             if(theform.find('.CaptchaInput:visible').val() != ""){
    //                 var str1 = $.trim($('.txtCaptcha').val()), str2 = $.trim($('.CaptchaInput:visible').val());
    //                 if (str1 !== str2){
    //                     theform.find('.captcha-field').html('The captcha code does not match.');
    //                     return false;
    //                 }
    //                 else{
    //                     theform.find('.captcha-field').html('');
    //                     // To track Google Analytics on Submit
    //                     _trackCaptchaAnalytics(theform);
    //                 }
    //             }
    //         }
    //         else{
    //             // To track Google Analytics on Submit
    //             _trackCaptchaAnalytics(theform);
    //         }
    //     });
    // }

    // _trackCaptchaAnalytics = function(theform){
    //     if((theform.parents('.modal').attr('id') == 'formRegistration') || (theform.parents('.registration-form-single-section').find('.form-inline-container').attr('data-modal') == 'formRegistration')){
    //         if(theform.valid() === true){
    //             var value = $('.close-download-form').attr('data-url') ? $('.close-download-form').attr('data-url') : "";
    //             if(value !== ""){
    //                 if (value.toLowerCase().match(/\.(pdf|doc)/g)) {
    //                     _showOverlay();
    //                     INFORMA.Analytics.trackFormEvents(theform, 'Submit');
    //                     _formModal.modal('hide');
    //                     $('.close-download-form').attr('data-show-register',false);
    //                     $('.close-download-form').attr('target',"_blank");
    //                 }    
    //             }
    //             else{
    //                 INFORMA.Analytics.trackFormEvents(theform, 'Submit');
    //             }
    //         }
    //     } 
    // }

    _showOverlayQueryString = function(container) {
        var url = window.location.href;
        if (url.indexOf('?ResponseStatus=Success') != -1 || url.indexOf('/ResponseStatus/Success') != -1) {
            _formModal.modal({
                show: true,
                backdrop: "static"
            });
        }
    }

    _resetForm = function($form) {
        $form.find('input[type=text], input[type=password], input[type=number], input[type=email], input[type=tel], select, textarea').val('');
        $form.find('input[type=radio]').removeAttr('checked');
        $form.find('.normal-checkbox input[type=checkbox]').removeAttr('checked');
        $form.find('.preselected-checkbox input[type=checkbox]').attr('checked', 'checked');
        $form.find('select.chosen-select').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');
        var preselected = $form.find('.preselected-checkbox input[type=checkbox]');
        if(preselected.length > 0){
          $.each(preselected, function(){
            $(this).val(this.checked ? true : false);
          });
        }
    }

    _showHideInlineForm = function() {
        var formInlineActiveTab = $('.contactUsPage-contactUs .tab-pane.active'),
            _formSubmitStatus = $('.contactUsPage-contactUs .tab-pane .submit-status');
        if (formInlineActiveTab.length > 0) {
            var inlineTabError = formInlineActiveTab.find('.error-response'),
                inlineTabErrorForm = inlineTabError.parents('.tab-pane.active').find('form');
            if (inlineTabError.length > 0) {
                inlineTabErrorForm.addClass('hide');
            } else {
                inlineTabErrorForm.removeClass('hide');
            }
            var inlineTabSucess = formInlineActiveTab.find('.submit-response'),
                inlineTabSucessForm = inlineTabSucess.parents('.tab-pane.active').find('form');
            if (inlineTabSucess.length > 0) {
                inlineTabSucessForm.addClass('hide');
            } else {
                inlineTabSucessForm.removeClass('hide');
            }

            _formSubmitStatus.each(function() {
                var Status = $(this).attr('data-status'),
                    Parent = $(this).parents('.tab-pane');
                if (Status.length > 0) {
                    Parent.find('form').addClass('hide');
                    if (Status == 'success') {
                        Parent.find('.submit-response').removeClass('hide');
                        Parent.find('.error-response').addClass('hide');
                    } else {
                        Parent.find('.error-response').removeClass('hide');
                        Parent.find('.submit-response').addClass('hide');
                    }

                } else {
                    Parent.find('form').removeClass('hide');
                    Parent.find('.submit-response, .error-response').addClass('hide');
                }
            })
        }
    }

    _showOverlay = function() {
        var formSubmitResponseModal;
        if (_formSubmitStatus.length > 0) {
            if (_formSubmitStatus.attr('data-status') == "") {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {
                    formSubmitResponseModal.find('form').removeClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').addClass('hide');
                    formSubmitResponseModal.removeClass('centreAlign');
                }
            } else if (_formSubmitStatus.attr('data-status').length > 0) {
                formSubmitResponseModal = _formSubmitStatus.parents('.form-modal:first');
                if (formSubmitResponseModal.length > 0) {

                    formSubmitResponseModal.find('form').addClass('hide');
                    formSubmitResponseModal.find('.submit-response, .error-response').removeClass('hide');
                    formSubmitResponseModal.addClass('centreAlign');
                    _resetForm(formSubmitResponseModal.find('form'));
                    formSubmitResponseModal.modal({
                        show: true
                    })

                }

                //Checking The status and Displaying that section
                if (_formSubmitStatus.attr('data-status') == 'success') {
                    $('.submit-response').removeClass('hide');
                    $('.error-response').addClass('hide');
                } else {
                    $('.error-response').removeClass('hide');
                    $('.submit-response').addClass('hide');
                }

            }
            _formSubmitStatus.each(function() {
                var Status = $(this).attr('data-status'),
                    Parent = $(this).parents('.modal');
                if (Status.length > 0) {
                    Parent.find('form').addClass('hide');
                    Parent.modal({
                        show: true,
                        backdrop: "static"
                    })
                    if (Status == 'success') {
                        // To track Google Analytics on Submit
                        INFORMA.Analytics.trackFormEvents(_formSubmitStatus, 'Submit');
                        Parent.find('.submit-response').removeClass('hide');
                        Parent.find('.error-response').addClass('hide');
                    } else {
                        Parent.find('.error-response').removeClass('hide');
                        Parent.find('.submit-response').addClass('hide');
                    }

                } else {
                    Parent.find('.submit-response, .error-response').addClass('hide');
                }
                // var a = Math.ceil(Math.random() * 9)+ '';
                // var b = Math.ceil(Math.random() * 9)+ '';
                // var c = Math.ceil(Math.random() * 9)+ '';
                // var d = Math.ceil(Math.random() * 9)+ '';
                // var e = Math.ceil(Math.random() * 9)+ '';

                // var code = a + b + c + d + e;
                // $('.txtCaptcha').val(code);
                // $(".CaptchaDiv").html(code);
            })

        }

    }


    _validateAllForms = function() {
        // $('form.get-in-touch').validate();
        // $('form.request-a-demo').validate();
        $('.wffm-form').find(':submit').on('click', function() {
            if ($('.get-in-touch ').valid() == true) {
                return true;
            } else {
                return false;
            }
        });
    }

    _formBtnOnHover = function(){
       $('.form-submit-border .btn').on('mouseover click', function(event) {
            $('.form-submit-border').addClass('hover-arrow');
        });
        $('.form-submit-border .btn').on('mouseout blur', function() {
            $('.form-submit-border').removeClass('hover-arrow');
        }); 
    }

    _bindToolTip = function() {
        $('form.get-in-touch legend, form.request-a-demo legend, form.wffm-form legend').on("click", function(e) {
            $(this).toggleClass('active');
            $(this).parent().children('p').toggleClass('show');
        });

        $('form.get-in-touch legend, form.request-a-demo legend, form.wffm-form legend').each(function() {
            if ($(this).next().is('p'))
                $(this).addClass('tool_tip');
        });
    }

    _parseVerticalName = function(data) {
        $('span.product-name-holder').html(data.ProductName);
        $('.product-name-holder').val(data.ProductName);
        if(modal_Id && !data.ProductName){
            var current_text = $(modal_Id + ' .page-header h2').text();
			var new_text = current_text.replace(' for ', '');
			$(modal_Id + ' .page-header h2').text(new_text);
        }
        $('.tc-product-name').html(data.ProductName);
        if (data.ProductName != null) {
            $('.tc-product-name').html(data.ProductName);
        }
        // Listing product dropdown update
        if($('.product-finder-results .search-container').length > 0 || $('.recom-prod-carousel').length > 0) {
            _productDropdownUpdate(data.ProductName);
        }
    }

    _parseResults = function(data) {
        var results = data,
            _inputId = $(_formId + ' .area-interests input').first().attr("id"),
            _inputName = $(_formId + ' .area-interests input').first().attr("name"),
            _interestValue = '',
            _interestText = '',
            _presentHeading,
            _tmpElement;
        if (_inputId) {
            _inputId = _inputId.replace("Id", "Value");
        }
        if (_inputName) {
            _inputName = _inputName.replace("Id", "Value");
        }

        $(_formId + " .area-interests .form-group .checkbox").remove();
        $(_formId + " .area-interests").addClass('dynamic-interests');
        $(_formId + ' .page-header h2').find('.product-name').text(results.ProductName);

        $(_formId + ' .page-header h2').text(formHeading);

        var hiddenProdcutName = $(_formId + " .form-additional-fields .product-name-field");
        if (hiddenProdcutName.length > 0) {
            hiddenProdcutName.val(results.Title);
        }

        for (var key in results.Items) {
            if (results.Items.hasOwnProperty(key)) {
                _interestText = results.Items[key].Text;
                _interestValue = results.Items[key].Value;

                _tmpElement = $('<input>').attr({
                    type: 'checkbox',
                    value: _interestValue,
                    id: _inputId,
                    name: _inputName
                });

                $(_formId + ' .area-interests .form-group').append(_tmpElement);
                $(_formId + ' .area-interests .form-group input[type=checkbox]').last().wrap('<div class="checkbox"></div>').wrap('<label>' + _interestText + '</label>');
            }
        }

    }

    _getAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    }

    _bindSelectOptions = function() {
        $(document).on('change', 'form.get-in-touch .hide-title .checkbox input, form.request-a-demo .hide-title .checkbox input', function(e) {
            $(this).parent().parent().toggleClass('active');
        });
    }

    _validateEmail = function(email) {
        var domain = email.substring(email.lastIndexOf("@") + 1);
        if (INFORMA.validDomains.indexOf(domain) < 0)
            return false;
        return true;
    }

    _bindValidationLogic = function() {
        //Email validation logic
        $('.wffm-form').find('.email-field').each(function() {
            $(this).blur(function() {
                var emailDomainMsg = $(this).parent().find('span.email-validation-message'),
                    emailValidMsg = $(this).parent().find('span.field-validation-error');
                // if (_validateEmail($(this).val())) {
                //     if (emailDomainMsg.length > 0 && emailValidMsg.length == 0) {
                //         emailDomainMsg.removeClass('hide').addClass('show');
                //     } else {
                //         emailDomainMsg.addClass('hide').removeClass('show');
                //     }
                // } else {
                //     if (emailDomainMsg.length > 0) {
                //         emailDomainMsg.addClass('hide').removeClass('show');
                //     }
                // }
            });
        });
    }

    function strToDate(str) {
        try {
            var array = str.split('-');
            var year = parseInt(array[0]);
            var month = parseInt(array[1]);
            var day = array.length > 2 ? parseInt(array[2]) : 1;
            if (year > 0 && month >= 0) {
                return new Date(year, month - 1, day);
            } else {
                return null;
            }
        } catch (err) {}; // just throw any illegal format
    };

    /* Date => "YYYY-MM-DD" */
    function dateToStr(d) {
        /* fix month zero base */
        var year = d.getFullYear();
        var month = d.getMonth();
        return year + "-" + (month + 1) + "-" + d.getDate();
    };

    $.fn.calendar = function(options) {
        var _this = this;
        var opts = $.extend({}, $.fn.calendar.defaults, options);
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var tHead = week.map(function(day) {
            return "<th>" + day + "</th>";
        }).join("");

        _this.init = function() {
            var tpl = '<table class="cal">' +
                '<caption>' +
                '   <span class="prev"><a href="javascript:void(0);">&lt;</a></span>' +
                '   <span class="next"><a href="javascript:void(0);">&gt;</a></span>' +
                '   <span class="month" data-date=""><span>' +
                "</caption>" +
                "<thead><tr>" +
                tHead +
                "</tr></thead>" +
                "<tbody>" +
                "</tbody>" + "</table>";
            var html = $(tpl);
            _this.append(html);
        };

        function daysInMonth(d) {
            var newDate = new Date(d);
            newDate.setMonth(newDate.getMonth() + 1);
            newDate.setDate(0);
            return newDate.getDate();
        }

        _this.update = function(date) {
            var mDate = new Date(date);
            mDate.setDate(1); /* start of the month */

            var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
            mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

            function dateToTag(d) {
                var tag = $('<td><a href="javascript:void(0);"></a></td>');
                var a = tag.find('a');
                a.text(d.getDate());
                a.data('date', moment(d).format('YYYY-MM-DD'));
                if (date.getMonth() != d.getMonth()) { // the bounday month
                    tag.addClass('off');
                } else if (_this.data('date') == a.data('date')) { // the select day
                    tag.addClass('active');
                    _this.data('date', dateToStr(d));
                } else if (d.toDateString() == date.toDateString()) {
                    tag.addClass('active');
                }
                return tag;
            };

            var tBody = _this.find('tbody');
            tBody.empty(); /* clear previous first */
            var cols = Math.ceil((day + daysInMonth(date)) / 7);
            for (var i = 0; i < cols; i++) {
                var tr = $('<tr></tr>');
                for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
                    tr.append(dateToTag(mDate));
                }
                tBody.append(tr);
            }

            /* set month head */
            var monthStr = dateToStr(date).replace(/-\d+$/, '');
            monthNbr = date.getMonth();
            monthName = months[monthNbr];
            _this.find('.month').text(monthName);
            _this.find('.month').data("date", monthStr);
        };

        _this.getCurrentDate = function() {
            return _this.data('date');
        }

        _this.init();
        /* in date picker mode, and input date is empty,
         * should not update 'data-date' field (no selected).
         */
        var initDate = opts.date ? opts.date : new Date();
        if (opts.date || !opts.picker) {
            _this.data('date', dateToStr(initDate));
        }
        _this.update(initDate);

        /* event binding */
        _this.delegate('tbody td', 'click', function() {
            var $this = $(this);
            _this.find('.active').removeClass('active');
            $this.addClass('active');
            _this.data('date', $this.find('a').data('date'));
            /* if the 'off' tag become selected, switch to that month */
            if ($this.hasClass('off')) {
                _this.update(strToDate(_this.data('date')));
            }
            if (opts.picker) { /* in picker mode, when date selected, panel hide */
                _this.hide();
            }
        });

        function updateTable(monthOffset) {
            var date = strToDate(_this.find('.month').data('date'));
            date.setMonth(date.getMonth() + monthOffset);
            _this.update(date);
        };

        _this.find('.next').click(function() {
            updateTable(1);
        });

        _this.find('.prev').click(function() {
            updateTable(-1);
        });

        return this;
    };

    $.fn.calendar.defaults = {
        date: new Date(),
        picker: false,
    };

    $.fn.datePicker = function() {
        var _this = this;
        var picker = $('<div></div>')
            .addClass('picker-container')
            .hide()
            .calendar({
                'date': strToDate(_this.val()),
                'picker': true
            });

        _this.after(picker);

        /* event binding */
        // click outside area, make calendar disappear
        $('body').click(function() {
            picker.hide();
        });

        // click input should make calendar appear
        _this.click(function() {
            picker.show();
            return false; // stop sending event to docment
        });

        // click on calender, update input
        picker.click(function() {
            _this.val(moment(picker.getCurrentDate()).format('DD/MMM/YYYY'));
            return false;
        });

        return this;
    };

    _bindCalendar = function() {
        $("form.request-a-demo .three-column .date-picker").wrap("<div class='right-inner'></div>");
        $("form.request-a-demo .three-column .right-inner").prepend("<i class='icon-calender'></i>");

        $('form.request-a-demo .date-picker:text').each(function() {
            $(this).datePicker({
                dateFormat: "dd-mm-yy"
            });
        });
    }

    _disableSubmit = function() {
        var formDOM = $("form.wffm-form");
        if (formDOM.length > 0) {
            $.each(formDOM, function() {
                var formSubmitBtn = $(this).find('.form-submit-border .btn');
                formSubmitBtn.attr('disabled', true);
                $(this).on('change', 'input, textarea, select', function() {
                    formSubmitBtn.removeAttr('disabled');
                    if ($(this).is('textarea') || $(this).is('input[type="email"]') || $(this).is('input[type="text"]') || $(this).is('input[type="number"]') || $(this).is('input[type="tel"]')) {
                        $(this).val($(this).val().trim());
                    }
                });

                $(this).on('change', '.terms-and-conditions input[type=checkbox]', function() {
                    $(this).val(this.checked ? true : false);
                    if(this.checked){
                      $(this).attr('checked', 'checked');
                    }else{
                      $(this).removeAttr('checked');
                    }
                });
            });
        }
    }

    iOSversion = function(){
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var appVer = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(appVer[1], 10), parseInt(appVer[2], 10), parseInt(appVer[3] || 0, 10)];
        }
    }

    _showModal = function(el) {
        $.fn.modal.Constructor.prototype.enforceFocus = function () { };
        _formId = $(el).data('modal');
        modal_Id = _formId;
        _resetForm($(_formId).find('form'));
        if ($(el).attr('data-productid')) {
            if($(_formId + ' .page-header h2').find('.product-name-holder').length === 0){
                $(_formId + ' .page-header h2').text($(_formId + ' .page-header h2').text() + ' for ')
                $(_formId + ' .page-header h2').append('<span class="product-name-holder"></span>');
            } 
            productId = {
                'guid': $(el).attr('data-productid')
            };
            _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
        } else {
            _resetDefaultTitle(el);
        }
        var version = iOSversion();
        if (version !== undefined) {
            if(version[0] >= 11){
                $(_formId).on('show.bs.modal', function () {
                    $('body').addClass('body-fixed');
                });
                $(_formId).modal({
                    show: 'true'
                })
                $(_formId).on('hide.bs.modal', function () {
                    $('body').removeClass('body-fixed');
                });
            }
        }
        else {
           $(_formId).modal({
                show: 'true'
            }) 
        }
        _showOverlay();
        _validateCountry();
    };
    _productDropdownUpdate = function(name) {
        var ProductDropdown = jQuery('.form-modal select.product-list');
        ProductDropdown.append('<option val="' +name+ '">' +name+ '</option>');
        ProductDropdown.val(name);
        ProductDropdown.trigger('chosen:updated');
        //ProductDropdown.parents('.form-group').addClass('disable-dropdown');

    };

    _bindProductId = function() {
        $(document).on('click', '.wffm-elq-form-btn', function() {
            // To track Google Analytics on Open
            INFORMA.Analytics.trackFormEvents($(this), 'Open');
            _showModal(this);
        });
    }

    _showFormIntro = function() {
        var contactUsGetinTouchForm = $('.contactUsPage-contactUs'),
            formIntroText = contactUsGetinTouchForm.find('.form-introduction'),
            tabform = contactUsGetinTouchForm.find('.tab-content'),
            formHeaderText = contactUsGetinTouchForm.find('.page-header');
        if (formIntroText.length > 0) {
            formIntroText.addClass('show');
        }
        if (tabform.length > 0) {
            formHeaderText.addClass('hide');
        }

    }

    _updateProductVerticalName = function() {
        var productId = {
            'guid': $('.page-id').val()
        };
        _getAjaxData(Urls.GetProductAndVerticalNames, "Get", productId, _parseVerticalName, null, null);
    }

    _destroyChosenInDevice = function() {
        if (INFORMA.global.device.isTablet || INFORMA.global.device.isMobile) {
            if ($('form.wffm-form .chosen-select').length > 0) {
                $('form.wffm-form .chosen-select').chosen('destroy');
                $("form.get-in-touch .form-group .chosen-select, form.request-a-demo .form-group .chosen-select, form.register-myinterests-form .form-group .chosen-select").wrap("<div class='select-wrapper'></div>");
            }
        }
    }

    _customPhoneErrorMsg = function() {
        var phoneErorrMsg = $('form.wffm-form input[type="number"]').attr('data-val-regex');
        if (phoneErorrMsg) {
            $.extend($.validator.messages, {
                number: phoneErorrMsg
            });
        }
    }

    _validateCountry = function() {
        $('.wffm-form .chosen-container').on('click mousedown', function(e) {
            e.preventDefault();
            var selectform = $(this).find('.select-default');
            if(selectform.text()){
                selectform.css('display','none');
            }
        });    
    }

    _reCaptchaAccessbility = function() {
        $(window).load(function() {
            $('.g-recaptcha-response').attr('aria-labelledby', 'g-recaptcha-response');
        });
    }

    _resetFormOnRefresh = function() {
        $(window).bind("pageshow", function() {
            var form = $('.wffm-form');
            if (form.length > 0) {
                $.each(form, function() {
                    _resetForm($(this));
                });
            }
        });
    }

    _UpdateHiddenFields = function() {
        if($('.wffm-form').length > 0) {
            $('.wffm-form').each(function() {
                var clientId = $(this).attr('id')
                var inputClientIdEl = $(this).find('.form-clientid');
                if(inputClientIdEl.length){
                    inputClientIdEl.val(clientId); 
                }
             });
        }
    }


    _UpdateProductName = function() {
        var ProductList = $('.product-list');
        ProductList.each(function() {
            var Parent = $(this).parents('form'),
                SelectedItem = $(this).val();

            Parent.find('.tc-product-name').text(SelectedItem);
        })
    }

    init = function() {
        //Update hidden fields on load

        _UpdateHiddenFields();

        //todo: No null check, dont execute these bindings if forms are not there
        _destroyChosenInDevice();
        _bindNumber();
        _showOverlay();
        _showOverlayQueryString()
        _reCaptchaHandler();
        //  _validateAllForms();
        _bindToolTip();
        _bindCalendar();
        _bindProductId();
        _bindSelectOptions();
        _bindValidationLogic();
        _disableSubmit();
        _showHideInlineForm();
        _HideOverlay();
        _showFormIntro();
        //_updateProductVerticalName();
        _updateHiddenProductVerticalName();
        _validateChoosenSelect();
        _customPhoneErrorMsg();
        _reCaptchaAccessbility();
        _resetFormOnRefresh();
        //_resetDefaultTitle();
        _setFormModalFocus();
        _changeProductDropdown();
        _validateCountry();
        _formBtnOnHover();
    };

    return {
        init: init
    };

}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.forms.init());

/*
 * global.js
 *
 *
 * @project:	Informa
 * @date:	   2016-April-25
 * @author:	 Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

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
		if(_viewportWidth > 1024){
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

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalFooter = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('.customers_list_slider'),
    // methods
        init,
        _dots,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = false;
            //chk for sitecore preview
            if (INFORMA.global.siteCore.isPreview) {
                _autoplay = true;
            }
            if (INFORMA.global.siteCore.isExperience) {
                _autoplay = false;
                _infinite = false;
            }
            if(INFORMA.global.device.viewportN === 1){
                  _slideCount = 4;
                  _dots = true;
            }
            else if (INFORMA.global.device.viewportN === 2){
                  _slideCount = 2;
                  _dots = true;
            }
        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            swipe: INFORMA.global.device.isDesktop ? false : true, 
            dots: _dots
        });
    }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider(_customersList);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalFooter.init());

/*
 * global-header.js - 1
 * pdp-navigation.js
 * Because I dont want to create two on('scroll')
 * Update : Bad idea Man, move pdp nav to new file
 * Update 2: If this comment is still here, that means the code is not optimized.
 * Dont try to optimize unless you have absolutely no story to do
 * Already wasted 2 hrs
 *
 * @project:    Informa
 * @date:       2016-May-8
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.globalHeader = (function(window, $, namespace) {
    'use strict';
    var //_mainNavigation = $('#mainNavigation'),
        _mainNavigation = $('.mainNavigation'),
        _mobileNavigation = $('.mobileNavigation'),
        _mobileHeaderNavigation = $('#mobile-header-navigation'),
        _mainNavLink = $('.informaNav .mainNavigation .header-links'),
        _cookieBanner =  $('#cookieBanner'),
        _navHeight = _mainNavigation.height(),
        _headerPos = 0,
        _navHeightMobile = _mobileNavigation.height(),
        _headerPosMobile = 0,
        _cookieHeight =  $('#cookieBanner').outerHeight(),
        _fixed = 'navbar-fixed-top',
        _heroBannerHeading = $('#banner h1').text(),
        _marketingClose = $('.marketing-banner .close a'),

        // for sticky nav of pdp-navigation
        _pdpNavigation = $('#pdp-navigation'),
        _pdpNavigationScrollTo,
        _pdpSectionActions,
        _pdpNavigationHeight = 0,
        _pdpSectionsHeight = 0,
        _isPdpPage = _pdpNavigation.data("productpage"),
        _pdpWrapper = $('.product-detail-page'),
        _pdpMenuFollower = $('#pdp-navigation .menuFollower'),
        _pdpSectionsButton = $('#pdp-navigation .nav-pdp-nondesktop'),
        _pdpMenuActive = true,

        _pdpLink = $('#pdp-navigation ul > li > a'),
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span'),
        _pdpFixed = false,
        _pdpMenuPos = [],
        _pdpMenuWidth = [],
        _pdpMenuleft = [],

        _initPdpMenuBarFollow,
        _activatePdpFixedHeader,
        _arrayFlag = true,
        _pdpFirst = true,
        _pdpStickyMobileFlag = false,
        _pdpStickyIconDesktopFlag = false,
        _pdpStickyHeadingDesktopFlag = false,
        _initialPdpHdrPos = 0,
        


        // for sticky nav of services-navigation
        _servicesNavigation = $('#services-navigation'),
        _servicesNavigationScrollTo,
        _servicesNavigationHeight = 0,
        //_servicesWrapper = $('.services-page'),
        _servicesMenuFollower = $('#services-navigation .menuFollower'),
        _servicesMenuActive = true,

        _servicesLink = $('#services-navigation ul > li > a'),
        _servicesLinkSpan = $('#services-navigation ul > li > a > span'),
        _servicesMenuPos = [],
        _servicesMenuWidth = [],
        _servicesMenuleft = [],

        _initServicesMenuBarFollow,
        _activateServicesFixedHeader,
        _arrayServicesFlag = true,
        _servicesFirst = true,
        _initialServicesHdrPos = 0,
        _expandedServicesNav = false,


        _tryStick = $('#banner .try-stick'),
        _subscribeStick = $('#banner .subscribe-stick'),
        _headingStick = $('#banner h1'),
        _tryStickPosition = 0,
        _headingStickPosition = 0,


        _navlinks = $('.informaNav .nav-links'),
        _subnavclose = $('#sub-nav .subnav-close'),
        _navtoggle = $('.informaNav .navbar-toggle'),
        _navclose = $('#mobile-header-navigation .nav-close'),
        _navback = $('#mobile-header-navigation .nav-back'),


        //functions
        init,
        _whenScrolling,
        _activateMainFixedHeader,
        _activateMobileFixedHeader,
        _pdpsectionSubnavigationInit,
        _selectDocClickEvents,
        _bindClickEvents,
        _bindNavigationEvents,
        _cookieBannerExist,
        _PdpNavReArrange,
        _addClassFixed,
        _removeClassFixed,
        _pdpListItemScroll;



    // if header or pdp is present then only we calc the values.
    // so that even if the elements are not present, the calc will happen
     
    if (_pdpNavigation.length > 0) {
        _pdpNavigationHeight = _pdpNavigation.height(),
        $('#pdp-sections ul li').each(function(){
           var idname = '#' + $(this).find('a').data("target");
           if($(idname).length == 0) {
              $(this).remove();
           }
        });
        _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                        .show();
    }

    if (_servicesNavigation.length > 0) {
        _servicesNavigationHeight = _servicesNavigation.height();
        
        // To show the menu follower with right width and position, todo: remove harcode
        _servicesMenuFollower.css('width', $(_servicesLinkSpan[0]).width())
                             .css('left', $(_servicesLinkSpan[0]).offset().left)
                             .show();
    }

    if (_mainNavigation.length > 0) {
        _navHeight = _mainNavigation.height();
        _headerPos = _mainNavigation.offset().top;
    }

    if (_mobileNavigation.length > 0) {
        _navHeightMobile = _mobileNavigation.height();
        _headerPosMobile = _mobileNavigation.offset().top;
    }

    //Check whether cookie banner exists or not
   _cookieBannerExist = function(){
        if($('#cookieBanner:visible').length){
             _cookieHeight =  $('#cookieBanner').outerHeight();
        }else{
              _cookieHeight =  0;
        }
   }

   //Add fixed class for Desktop Mobile and Tablet
   _addClassFixed = function(){
        if (!INFORMA.global.device.isDesktop){
            _mobileNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mobileNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeightMobile);
        }
        else{
            _mainNavigation.addClass(_fixed);
            _cookieBanner.addClass(_fixed);
            _mainNavigation.css('top', _cookieHeight);
            $('body').css('padding-top', _navHeight);
        }
   }
   
   //Remove fixed class for Desktop Mobile and Tablet
   _removeClassFixed = function(){
        if (!INFORMA.global.device.isDesktop){
            _mobileNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mobileNavigation.css('top', 0);
            $('body').css('padding-top', 0);
        }
        else{
            _mainNavigation.removeClass(_fixed);
            _cookieBanner.removeClass(_fixed);
            _mainNavigation.css('top', 0);
            $('body').css('padding-top', 0);
        }
   }

   //scroll pdp list item
   _pdpListItemScroll = function(){
        var pdpListHeight = $('#pdp-sections ul li').height()*$('#pdp-sections ul li').length;
        var pdpSectionheight = $(window).height() - _navHeightMobile - $('#pdp-navigation .nav-pdp-nondesktop').outerHeight() - _cookieHeight;
        var pdpHeadingHeight = $('#pdp-sections-heading').height();
        if((pdpListHeight + pdpHeadingHeight) > pdpSectionheight){
            $('#pdp-sections').height(pdpSectionheight);
            $('#pdp-sections').css('overflow' , 'auto');
        } 
        else{
            $('#pdp-sections').css({
                'height':'auto',
                'overflow':'hidden'
            })
        }
   }

    // both pdp nav and main nav handled here
    _whenScrolling = function() {
        $(window).on('scroll', function() {

            if (!_pdpFixed && _mainNavigation.length > 0 && INFORMA.global.device.isDesktop)
                _activateMainFixedHeader();
            if (!_pdpFixed && _mobileNavigation.length > 0 && !INFORMA.global.device.isDesktop)
                _activateMobileFixedHeader();
            if (_pdpNavigation.length > 0 && _pdpMenuActive)
                _activatePdpFixedHeader();
            if (_servicesNavigation.length > 0 && _servicesMenuActive)
                _activateServicesFixedHeader();
        });
    };

    _activateMainFixedHeader = function() {
        var _windowPos = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPos > _headerPos + _cookieHeight) {
            if (!_mainNavigation.hasClass(_fixed)) {
               _addClassFixed();
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
            }
        } else {
            if (_mainNavigation.hasClass(_fixed)) {
               _removeClassFixed();
                $('.informaNav .nav-left').animate({ 'left': "0px" }, 1000);
            }
        }
    };

    _activateMobileFixedHeader = function() {
        var _windowPosMobile = $(window).scrollTop();
        _cookieBannerExist();
        if (_windowPosMobile > _headerPosMobile + _cookieHeight) {
            _addClassFixed();
            _mobileHeaderNavigation.css({
                'z-index': '2000'
            });
        } else {
            _removeClassFixed();
            _mobileHeaderNavigation.css({
                'z-index': '2'
            });
        }
    };

    _pdpSectionActions = function(){
        _pdpSectionsButton.on('click', function(e) {
            e.preventDefault();
            //var _pdpLinksCont = $('#pdp-navigation ul > li > a > span').length;
            if($("#pdp-sections:visible").length){
                $('#pdp-sections').slideUp();
              // if(_pdpLinksCont>6){
              //   //$('nav#pdp-navigation').removeClass('deviceactive');
              //   if($('#pdp-navigation').hasClass('navbar-fixed-top')){
              //   $('body').removeClass('global-no-scroll');
              // }
              // }
            }else{
                $('#pdp-sections').slideDown(function() {
                    if(!INFORMA.global.device.isDesktop){
                        if(_pdpNavigation.hasClass(_fixed)){
                            _pdpListItemScroll();
                            $('#pdp-sections').animate({
                                    scrollTop: 0
                            }, 500);
                        }
                    }
                });
                
                
              //   if(_pdpLinksCont>6){
              //   //$('nav#pdp-navigation').addClass('deviceactive');
              //   if($('#pdp-navigation').hasClass('navbar-fixed-top')){
              //   $('body').addClass('global-no-scroll');
              // }
              // }
            } 
        });
    }

    _initPdpMenuBarFollow = function() {
        _pdpLink = $('#pdp-navigation ul > li > a');

        if (_pdpLink.length === 0) {
            _pdpNavigation.remove();
            _pdpMenuActive = false;
        }

    };

    _activatePdpFixedHeader = function() {
        var _windowPos = $(window).scrollTop();

        if (_pdpFirst) {
            _initialPdpHdrPos = _pdpNavigation.offset().top;
            _pdpFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
            _pdpNavigationHeight = $('#pdp-navigation').height();
        } else {
            _fixedNavHeight = _navHeightMobile;
            _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();
        }


        if (INFORMA.global.device.isDesktop){

            if(_tryStick.length > 0){

                _tryStickPosition = _tryStick.offset().top;
                if (_windowPos > ((_tryStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyIconDesktopFlag) {
                        _tryStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _subscribeStick.clone(true).appendTo('.nav-pdp-desktop-sticky');
                        _pdpStickyIconDesktopFlag = true;
                        $('.nav-pdp-desktop-sticky').addClass('move-left');
                    }
                }
                else{
                    _pdpStickyIconDesktopFlag = false;
                    $('.nav-pdp-desktop-sticky').empty();
                }
            }

            if(_headingStick.length > 0){
                _headingStickPosition = _headingStick.offset().top;
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                if (_windowPos > ((_headingStickPosition - _fixedNavHeight) + _cookieHeight)) {
                    if (!_pdpStickyHeadingDesktopFlag) {
                      //debugger;
                      if(_isPdpPage){
                        $('#pdp-sections-heading').text(_heroBannerHeading);
                        $('#pdp-sections-heading').addClass('move-left');
                      }
                        _pdpStickyHeadingDesktopFlag = true;
                        _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                        .css('left', $(_pdpLinkSpan[0]).offset().left)
                                        .show();

                    }
                }
                else{
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    _pdpMenuFollower.css('width', $(_pdpLinkSpan[0]).width())
                                    .css('left', $(_pdpLinkSpan[0]).offset().left)
                                    .show();
                    _pdpStickyHeadingDesktopFlag = false;
                }
            }

        }


        //For fixing the Product Detail Header: Desktop + Tablet + Mobile
        _cookieBannerExist();
        if (_windowPos > (_initialPdpHdrPos - _fixedNavHeight) - _cookieHeight) {
            _pdpNavigation.addClass(_fixed);
            _pdpNavigation.css('top', _fixedNavHeight + _cookieHeight + 'px');
            _pdpWrapper.css('padding-top', _pdpNavigationHeight);
            _pdpFixed = true;
            $('.nav-pdp-nondesktop').addClass('move-left');
            _addClassFixed();
            if (!INFORMA.global.device.isDesktop && !_pdpStickyMobileFlag) {
              var leftOfPdpMover = _pdpMenuFollower.css('left');
                _tryStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _subscribeStick.clone(true).appendTo('.nav-pdp-nondesktop-sticky');
                _pdpStickyMobileFlag = true;
                if(_isPdpPage){
                  $('#pdp-sections-heading').text(_heroBannerHeading);
                  $('#pdp-sections-heading').addClass('move-left');
                }
                $('.nav-pdp-nondesktop-sticky').addClass('move-left');
                _pdpMenuFollower.css('left', leftOfPdpMover + $('#pdp-sections-heading').outerWidth());
                _pdpListItemScroll();
            }

            if (_arrayFlag) {
                _pdpMenuPos = [];
                _pdpMenuWidth = [];
                _pdpMenuleft = [];
                _pdpLink = $('#pdp-navigation ul > li > a');
                _pdpLinkSpan = $('#pdp-navigation ul > li > a > span');
                for (var i = 0; i < _pdpLink.length; i++) {
                    var _sectionName = '#' + $(_pdpLink[i]).data('target');
                    if($(_sectionName).length > 0){
                        _pdpMenuPos.push($(_sectionName).offset().top);
                    }else{
                        _pdpMenuPos.push(0);
                    }
                    if($(_pdpLinkSpan[i]).length > 0) {
                    _pdpMenuWidth.push($(_pdpLinkSpan[i]).width());
                    _pdpMenuleft.push($(_pdpLinkSpan[i]).offset().left);
                    }
                }
                _arrayFlag = false;
            }

        } else {
            if(_pdpFixed){
                _pdpNavigation.removeClass(_fixed);
                _pdpNavigation.css('top', '0px');
                _pdpWrapper.css('padding-top', 0);
                _pdpFixed = false;
                _arrayFlag = true;
                _initialPdpHdrPos = _pdpNavigation.offset().top;
                _removeClassFixed();
                if (!INFORMA.global.device.isDesktop){
                    _pdpStickyMobileFlag = false;
                    $('.nav-pdp-nondesktop-sticky').empty();
                    $('#pdp-sections-heading').text('');
                    $('#pdp-sections-heading').removeClass('move-left');
                    $('.nav-pdp-nondesktop').removeClass('move-left');
                    $('#pdp-sections').css({
                        'height':'auto',
                        'overflow':'hidden'
                    })
                }
            }

        }

        var _fixedHeights = _fixedNavHeight + _pdpNavigationHeight + 5;
        var j = _pdpMenuPos.length - 1;
        for (; j >= 0; j--) {
            if (_windowPos + _fixedHeights >= _pdpMenuPos[j]) {

                if (INFORMA.global.device.isDesktop) {
                    _pdpMenuFollower.css('width', _pdpMenuWidth[j]);
                    _pdpMenuFollower.css('left', _pdpMenuleft[j]);
                }
                j = -1;
            }
        }

    }

    _pdpNavigationScrollTo = function() {
        _pdpLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight, _target, _scrollTopPixels;

            if (!INFORMA.global.device.isDesktop) {

                    _target = $(this).data('target');

                    $('#pdp-sections').slideUp();
                    _pdpNavigationHeight = $('#pdp-navigation .nav-pdp-nondesktop').outerHeight();

                    if(!_pdpFixed)
                        _pdpSectionsHeight = $('#pdp-sections').height();
                    else
                        _pdpSectionsHeight = 0;

                    _fixedNavHeight = _navHeightMobile;
                    _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight + _pdpSectionsHeight);

                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

            }else{
                _target = $(this).data('target');
                $('#pdp-navigation li').removeClass('selected');
                $('#pdp-navigation li').addClass('select-options');
                _pdpNavigationHeight = _pdpNavigation.height();
                _fixedNavHeight = _navHeight;

                _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _pdpNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }

        })
    };


    _initServicesMenuBarFollow = function() {
        _servicesLink = $('#services-navigation ul > li > a');

        if (_servicesLink.length === 0) {
            _servicesNavigation.remove();
            _servicesMenuActive = false;
        }
    };

    _activateServicesFixedHeader = function() {
        var _windowPos = $(window).scrollTop(),
        _servicesWrapper = $('#services-list').parent();
        if (_servicesFirst) {
            _initialServicesHdrPos = _servicesNavigation.offset().top;
            _servicesFirst = false;
        }

        var _fixedNavHeight;
        if (INFORMA.global.device.isDesktop) {
            _fixedNavHeight = _navHeight;
        } else {
            _fixedNavHeight = _navHeightMobile;
        }
        _servicesNavigationHeight = _servicesNavigation.height();

        if (_windowPos > (_initialServicesHdrPos - _fixedNavHeight)) {

            _servicesNavigation.addClass(_fixed);
            _servicesNavigation.css('top', _fixedNavHeight + 'px');
            _servicesWrapper.css('padding-top', _servicesNavigationHeight);
            /* removed unused variable _servicesFixed*/

            if (_arrayServicesFlag) {
                _servicesMenuPos = [];
                _servicesMenuWidth = [];
                _servicesMenuleft = [];
                for (var i = 0; i < _servicesLink.length; i++) {
                    var _sectionName = '#' + $(_servicesLink[i]).data('target');

                    _servicesMenuPos.push($(_sectionName).offset().top);
                    _servicesMenuWidth.push($(_servicesLinkSpan[i]).width());
                    _servicesMenuleft.push($(_servicesLinkSpan[i]).offset().left);
                }
                _arrayServicesFlag = false;
            }
        } else {
            _servicesNavigation.removeClass(_fixed);
            _servicesNavigation.css('top', '0px');
            _servicesWrapper.css('padding-top', 0);
            /* removed unused variable _servicesFixed*/
            _arrayServicesFlag = true;
            _initialServicesHdrPos = _servicesNavigation.offset().top;
        }

        var _fixedHeights = _fixedNavHeight + _servicesNavigationHeight + 7;

        var j = _servicesMenuPos.length - 1;
        for (; j >= 0; j--) {
            if (_windowPos + _fixedHeights >= _servicesMenuPos[j]) {

                if (INFORMA.global.device.isDesktop) {
                    _servicesMenuFollower.css('width', _servicesMenuWidth[j]);
                    _servicesMenuFollower.css('left', _servicesMenuleft[j]);
                } else {
                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $($('#services-navigation li')[j]).addClass('selected');
                }
                j = -1;
            }
        }
    };

    _servicesNavigationScrollTo = function() {
        _servicesLink.on('click', function(e) {
            e.preventDefault();
            var _fixedNavHeight, _target, _scrollTopPixels;

            if (!INFORMA.global.device.isDesktop) {

                if (_expandedServicesNav) {
                    _target = $(this).data('target');

                    $('#services-navigation li').removeClass('selected');
                    $('#services-navigation li').removeClass('select-options');
                    $('#services-navigation li:not(".selected")').slideUp();

                    $(this).parent().addClass('selected');

                    _servicesNavigationHeight = _servicesNavigation.height();
                    _fixedNavHeight = _navHeightMobile;

                    _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                    $('html, body').stop().animate({
                        scrollTop: _scrollTopPixels
                    }, 1000);

                    _expandedServicesNav = false;
                } else {
                    $('#services-navigation li').addClass('select-options');
                    _expandedServicesNav = true;
                }

            } else {
                _target = $(this).data('target');
                $('#services-navigation li').removeClass('selected');
                $('#services-navigation li').addClass('select-options');
                _servicesNavigationHeight = _servicesNavigation.height();
                _fixedNavHeight = _navHeight;

                _scrollTopPixels = $("#" + _target).offset().top - (_fixedNavHeight + _servicesNavigationHeight);
                $('html, body').stop().animate({
                    scrollTop: _scrollTopPixels
                }, 1000);
            }


        })
    };

    _bindClickEvents = function(){
        _marketingClose.on('click', function(e) {
            e.preventDefault();
            $(this).closest('section').hide();
        });
    };

    _bindNavigationEvents = function() {

        if (INFORMA.global.device.isDesktop) {

            _navlinks.on('mouseover', function(e) {
                e.preventDefault();
                var navId = $(this).find('a').data('subnav'),
                    SubNav =  $('#sub-nav'),
                    SubContainer = $("#sub-nav").find(".subnav-container");
                SubNav.css({ 'left': 0});
                SubContainer.hide();
                _navlinks.removeClass('nav-active');
                $(this).addClass('nav-active');
                SubNav.show();
                $('#' + navId).show();
                SubContainer.removeClass("active");
                SubNav.find('#'+navId).addClass("active");
            });

            $('.nav-links a').on('keydown', function(e) {
                if (e.keyCode === 13 || e.which===13) {
                    $(this).parent().trigger('mouseover');
                    var Id = $(this).data('subnav');
                    $($('#' + Id).find('a')[0]).focus();
                    return false;
                }
                
            });

            $('.subnav-close a').on('focusout', function() {
                var ParentId = $(this).parents('.subnav-container').attr('id');
                $('.nav-links a[data-subnav="' +ParentId+ '"]').parent('li').next('li').find('a').focus();
                $(this).find('a').unbind('click');
            });
            $('#sub-nav').hover(
                function() {
                    $(this).show();
                    $('#sub-nav').css({ 'left': 0});
                    var ActiveId = $('#sub-nav').find(".active").attr("id"),
                        ParentEle = _navlinks.find('a[data-subnav='+ActiveId+']').parent();
                    _navlinks.removeClass('nav-active');
                    ParentEle.addClass('nav-active');
                },
                function() {
                    $(this).hide();
                     _navlinks.removeClass('nav-active');
                }
            );
            _navlinks.on('mouseout', function(e) {
                e.preventDefault();
                $('#sub-nav').hide();
                $('#sub-nav').css({'left': 0});
                _navlinks.removeClass('nav-active');
            });
            _subnavclose.on('click', function(e) {
                e.preventDefault();
                $('#sub-nav .subnav-container').hide();
                $('#sub-nav').css({ 'left': 0});
                _navlinks.removeClass('nav-active');
                $(this).unbind('focusout');
                $(this).find('a').unbind('focusout');
            });
        } else {
             _navlinks.on('click', function(e) {
                //e.preventDefault();
                var navId = $(this).find('a').data('subnav');
                var navText = $(this).find('a').text();
                if($('#' + navId).length > 0) {
                    $('#sub-nav .subnav-container').hide();
                    //$('.informaNav .nav-main').css('left', '-100%');
                    $('#sub-nav').css('left', '0');
                    $('#' + navId).css('display', 'block');
                    $('#mobile-header-navigation .nav-subnav-heading').text(navText);
                    $('#mobile-header-navigation .nav-back').css('display', 'block');
                }
            });
        }

        //For mobile toggle navigations
        _navtoggle.on('click', function(e) {
            e.preventDefault();
            $('#mobile-header-navigation').css('left', '0');
            $('.informaNav .nav-main').css('left', '0');
            //$('#sub-nav').css('left', '0');
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
            //$('html, body').addClass('global-no-scroll');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
        });

        _navclose.on('click', function(e) {
            $(".navbar-collapse").collapse('hide');
            $('#mobile-header-navigation').css('left', '-100%');
            $('.informaNav .nav-main').css('left', '-100%');
            $('#sub-nav').css('left', '-100%');
            //$('html, body').removeClass('global-no-scroll');
            $('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'scroll');
            //$('body').css('height', 'auto');
        });

        _navback.on('click', function(e) {
            $('.informaNav .nav-main').css('left', '0');
            $('#sub-nav').css('left', '-100%');
            $('#mobile-header-navigation .nav-subnav-heading').text('');
            $('#mobile-header-navigation .nav-back').css('display', 'none');
            //$('html, body').addClass('global-no-scroll');
            var img = $('.navbar-brand img')[0];
            $('#mobile-header-navigation .nav-subnav-heading').append('<div class="navbar-image"><img src="'+img.src+'" class="logo-img-big"/></div>');
            //$('#mobile-header-navigation .nav-image').remove();
            //$('body').css('overflow-y', 'hidden');
            //$('body').css('height', '100%');
        });

    };
    _pdpsectionSubnavigationInit = function(){
      $('#pdp-sections ul li').each(function(){
       var idname = '#' + $(this).find('a').data("target");
       if($(idname).length === 0) {
          $(this).remove();
       }
      });
    }
    _selectDocClickEvents=function(){
      $(document).on('touchstart',function(event) {
        if(event.target.class !== 'selectMenu' && !$('.selectMenu').find(event.target).length){
           $(".selectMenu .chosen-container").removeClass("container-active chosen-with-drop");
        }
       });
    }
    _PdpNavReArrange = function () {
      var _ArrayOfPdpElements = [],
          Html = "";
      _pdpLink.each(function () {
          var Target = $(this).data('target'),
              _Element = {};
          if($('#'+Target).length > 0) {
              _Element["Name"] = $(this).text();
              _Element["Target"] = Target;
              _ArrayOfPdpElements.push(_Element);
              $('#'+Target).addClass('pdp-item-id');
          }
      });
      $('.pdp-item-id').each(function() {
          var _Id = $(this).attr("id");
          for(var i = 0; i < _ArrayOfPdpElements.length; i++) {
              if(_ArrayOfPdpElements[i].Target === _Id) {
                  Html += '<li><a href="#" data-target="' +_ArrayOfPdpElements[i].Target+ '"><span>' +_ArrayOfPdpElements[i].Name+ '</span></a></li>';
              }
          }
      })
      $('#pdp-sections').find('.navbar-nav').html(Html);
    }
    init = function() {
        if(_mainNavLink.length > 0){
            if(INFORMA.global.device.isMobile || INFORMA.global.device.isTablet){
                if(_mainNavLink.length === 1){
                    $(_mainNavLink).addClass('one')
                }
                else if(_mainNavLink.length === 3){
                    $(_mainNavLink).addClass('three')
                }
                else if(_mainNavLink.length === 4){
                    $(_mainNavLink).addClass('four')
                }
                else{
                    $(_mainNavLink).addClass('two')
                }
            }
        }

        if (_pdpNavigation.length > 0) {
            _pdpsectionSubnavigationInit();
            if (!INFORMA.global.siteCore.isExperience) {
              _PdpNavReArrange();
            }
            _initPdpMenuBarFollow();
            _pdpNavigationScrollTo();
            _pdpSectionActions();
        }

        if (_servicesNavigation.length > 0) {
            _initServicesMenuBarFollow();
            _servicesNavigationScrollTo();
        }

        $('[data-toggle="popover"]').popover();

        _whenScrolling();
        //}
        _bindNavigationEvents();
        _bindClickEvents();
        _selectDocClickEvents();
        /*if (INFORMA.global.device.isMobile) {
            $('#pdp-navigation ul').on('click', function() {
                //todo stop hardcoding
                $('#pdp-navigation li:not(".selected")').slideDown();
                _pdpNavigation.removeClass('cont');
            });
        }*/

        if (INFORMA.global.device.isTablet) {
            $('#services-list section').each(function(i, obj) {
                var _id = this.id;
                $("#" + _id + " .image-thumbnail").prependTo("#" + _id + " .content");
            });
        }

        if (!INFORMA.global.device.isDesktop) {
            $('#services-navigation ul > li:first-child').addClass('selected');
            _expandedServicesNav = false;

            //$('#pdp-navigation ul > li:first-child').addClass('selected');
            /* removed unused _expandedPdpNav variab */
        }

    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.globalHeader.init());

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
    if(profile.includes('#') && u[1]){
          return "<a href="+u[1]+">"+u[0]+"</a>";
    }else{
      return profile;
    }
  }
});
var INFORMA = window.INFORMA || {};
INFORMA.helpfaq = (function(window, $, namespace) {
    'use strict';
    //variables
    var _helpfaqSelect = $('.help-faq-select'),
        // methods
        init,
        _showHideFaq;

    _showHideFaq = function() {
        _helpfaqSelect.change(function() {
            $(this).parents('.accordian-structure').find('.help-faq-wrapper').children().removeClass('show').addClass('hide');
            var show = $("option:selected", this).data('show');
            $(show).removeClass('hide').addClass('show');
        });
    }

    init = function() {
        // $('.help-faq-wrapper').children().first().addClass('show');
        // $('.help-faq-wrapper').children().not(':first').addClass('hide');
        // $('#tabs-2 .accordian-structure .help-faq-wrapper div.col-md-offset-1').first().removeClass('hide').addClass('show');
        _showHideFaq();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.helpfaq.init());

/*
 * Hero Video.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.heroBanner = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoElem = $('img[data-video]'),
        _heroBannerList = $('.hero-banner-carousel .slider-component'),
        _heroBannerFull = $('.hero-banner-texture,.hero-banner'),
        _heroBannerImage = $('.hero-banner-texture .cf-img,.hero-banner .cf-img'),

    // methods
        init,
        _bindIframe,
        _createSlider,
        _playPauseVideo,
        _urlType,
        _youTubeId,
        _wistiaId,
        _vimeoId,
        _wistiaUrl,
        ytPlayer,
        _youTubeSound,
        _wistiaSound,
        _vimeoSound,
        ytPlayers=[],
        playCount = 0,
        vimeoCount = 0,
        vimeoPlayers=[],
        vimeoPlayer,
        wistiaPlayers=[],
        _pauseAllVideos,
        resizeHeroBanner;
       

    _bindIframe = function(){
        var videoUrl = _videoElem.data('video');
        _videoElem.parent().html('<iframe width="100%" height="auto" src="'+videoUrl+'" frameborder="0" allowfullscreen volume="0"></iframe>');

    };

    _createSlider = function(container){
        var _slideCount = 1,//container.data('itemsperframe'), Evil laugh when the author tries to change config,
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = Boolean(container.data('dots')),
            _rtl;

            if(container.data('rtl') !== undefined) {
              _rtl = container.data('rtl');
            }

            if (INFORMA.global.siteCore.isExperience) {
               _autoplay = false;
               _infinite = false;
            }
            if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
            container.slick({
               infinite: _infinite,
               autoplay: _autoplay,
               autoplaySpeed: _duration,
               slidesToShow: _slideCount,
               slidesToScroll: _slideCount,
               speed: _speed,
               dots: (_dots != null || _dots != undefined) ? _dots : true,
               swipe: INFORMA.global.device.isDesktop ? false : true
           });
        };

        _heroBannerList.on('init', function(event, slick){
            var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
               
            _iFrameElement.each(function(i, e) {
                
                _urlType = $(this).attr('data-videotype');

                if (_urlType === "youtube") {

                    _youTubeId = $(this).attr('data-videoid');
                    _youTubeSound = $(this).attr('data-videosound');

                    var playerYTElement = document.createElement('div');
                    playerYTElement.id = "youtubePlayer"+i;
                    $(this).append(playerYTElement);

                    var scriptTag = document.createElement('script');
                    scriptTag.src = "https://www.youtube.com/iframe_api";

                    var ytTag = document.getElementById('youtubePlayer'+i);
                    var node = ytTag.parentNode.insertBefore(scriptTag, ytTag.nextSibling);
                    $(this).append(node);

                } else if (_urlType === "vimeo") {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                    _vimeoId = $(this).attr('data-videoid');
                    _vimeoSound = $(this).attr('data-videosound');

                    var playerVMElement = document.createElement('div');
                    playerVMElement.id = "vimeoPlayer"+i;
                    $(this).append(playerVMElement);
                    var id = document.getElementById('vimeoPlayer'+i);
                    var options = {
                      id: _vimeoId,
                      loop: true,
                      autoplay: true
                    };
                    vimeoPlayer = new Vimeo.Player(id, options);
                    vimeoPlayers.push(vimeoPlayer);
                    if (INFORMA.global.device.viewportN === 2 ) {
                      $('.videoBG_wrapper').css('height', '80%');
                      $('.block-centered').css('transform','translateY(-40%)');
                    }
                    if (INFORMA.global.device.viewportN === 1) {
                      $('section.hero-banner').addClass('vimeo-video-banner');
                      $('.videoBG_wrapper').css('height', '80%');
                      $('.block-centered').css('transform','translateY(-25%)');
                    }
                } else if (_urlType === "wistia") {

                    _wistiaUrl = $(this).attr('data-videourl')
                    _wistiaId = $(this).attr('data-videoid');
                    _wistiaSound = $(this).attr('data-videosound');

                    var iframeWSElement = document.createElement('iframe');
                    iframeWSElement.id = "wistiaEmbed" + i,
                    iframeWSElement.class = "wistia_embed",
                    iframeWSElement.name = "wistia_embed";
                    iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                    $(this).append(iframeWSElement);
                    var wistiaOptions = {
                      id: _wistiaId
                    };
                    wistiaPlayers.push(wistiaOptions);
                    if (INFORMA.global.device.viewportN === 1 || INFORMA.global.device.viewportN === 2 ) {
                        var playButton = $(".videoBG_wrapper");
                        if(playButton.length > 0 ){
                          playButton.on("click", function() {
                                var wistiaEmbed = document.getElementById("wistiaEmbed"+i).wistiaApi;
                                    wistiaEmbed.play();
                          });
                        }
                    }
                }
            });
            onVimeoIframeAPIReady();
            //onWistiaIframeAPIReady();
        });

        if(_heroBannerList.length > 0){
            window.onYouTubeIframeAPIReady = function(){
                var _iFrameElement = $('.hero-banner-carousel .slick-slide .videoBG');
                _iFrameElement.each(function(i, e) {
                    _urlType = $(this).attr('data-videotype');
                    if (_urlType === "youtube") {
                        _youTubeId = $(this).attr('data-videoid');
                        _youTubeSound = $(this).attr('data-videosound');
                        var id = document.getElementById('youtubePlayer'+i);
                        ytPlayer = new YT.Player(id, {
                            videoId: _youTubeId,
                            playerVars: {
                                'modestbranding': 0,
                                'autoplay': 1,
                                'controls': 1,
                                'loop': 1,
                                'wmode':'opaque',
                                'playlist': _youTubeId,
                                'showinfo': 0
                            },
                             events: {
                                'onReady': onCarouselYTPlayerReady
                            }
                        });
                        ytPlayers.push(ytPlayer);
                    }  
                });
            }  
            window.onVimeoIframeAPIReady = function(){
                $.each(vimeoPlayers, function(key, value) {
                    var player = value;
                    player.ready().then(function() {
                        player.pause();
                        player.setVolume(_vimeoSound);
                        vimeoCount++;
                        if(vimeoPlayers.length === vimeoCount) {
                            $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                            setTimeout(function(){
                                _heroBannerList.find('.hero-items.slick-active .videoBG iframe').css('display','block');
                            },100)
                            if(_heroBannerList.find('.hero-items.slick-active .videoBG').attr('data-videotype') ==='vimeo') { 
                                var VimeoId = _heroBannerList.find('.hero-items.slick-active .videoBG iframe').parent()[0].id;
                                for(var i=0; i<vimeoPlayers.length;i++){
                                    if(vimeoPlayers[i].element.parentElement.id === VimeoId){
                                        vimeoPlayers[i].play();
                                    }
                                }
                            }
                        }
                        else {
                            $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                            _heroBannerList.find('.hero-items.slick-active .videoBG iframe').css('display','none');
                        }
                    });
                });
            }
            // window.onWistiaIframeAPIReady = function(){
            //    $.each(wistiaPlayers, function(key, value) {
            //    }); 
            // }
        }

        function onCarouselYTPlayerReady(event) {
            if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                setTimeout(function(){
                    event.target.pauseVideo();
                    event.target.setVolume(_youTubeSound);
                },10)
                playCount++;
                if(ytPlayers.length === playCount) {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').removeClass('disable-arrow');
                        if(_heroBannerList.find('.hero-items.slick-active .videoBG').attr('data-videotype') ==='youtube') {
                            var ytubeId = _heroBannerList.find('.hero-items.slick-active .videoBG iframe')[0].id;
                            for(var i=0; i<ytPlayers.length;i++){
                                if(ytPlayers[i].a.id === ytubeId){
                                    ytPlayers[i].playVideo();
                                }
                            }
                        }
                } else {
                    $('.hero-banner-carousel .slick-next,.hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                }
            }
        }
       
       _heroBannerList.on('afterChange', function(event, slick, currentSlide, nextSlide){
            if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                var video = slick.$slides[currentSlide].getElementsByClassName('videoBG'),
                   _urlType = $(event.target).find('.slick-active .videoBG').attr('data-videotype');
                if(video.length > 0){
                    if(_urlType === 'youtube'){
                        _pauseAllVideos();
                        var ytubeId = slick.$slides[currentSlide].getElementsByTagName('iframe')[0].id;
                        for(var i=0; i<ytPlayers.length;i++){
                            if(ytPlayers[i].a.id === ytubeId ){
                                ytPlayers[i].playVideo();
                            }
                        }    
                    }
                    else if(_urlType === 'vimeo'){
                        _pauseAllVideos();
                        var VimeoId = $(slick.$slides[currentSlide].getElementsByTagName('iframe')).parent()[0].id
                        for(var j=0; j<vimeoPlayers.length;j++){
                            if(vimeoPlayers[j].element.parentElement.id === VimeoId){
                                vimeoPlayers[j].play();
                            }
                        } 
                    }
                }
                else{
                   _pauseAllVideos();
                } 
           }   
        });
        _pauseAllVideos = function(){
            for(var i=0; i<ytPlayers.length; i++){
                ytPlayers[i].pauseVideo();
            }    
            for(var j =0; j<vimeoPlayers.length; j++){
                vimeoPlayers[j].pause();
            }
        },

        resizeHeroBanner = function(){
            if($('.hero-banner-texture').length > 0){
                if ($(window).width() > 1360) {
                    var width = _heroBannerFull.width() - _heroBannerImage.width();
                    var innerWidth = (_heroBannerFull.width() - 1172)/2;
                    var finalWidth = (width - innerWidth) - 15;
                    $('.hero-banner-texture .h1-styles, .hero-banner-texture .subtext, .hero-banner-texture .description').css({
                        'width' : finalWidth
                    })
                }  
                else{
                    $('.hero-banner-texture .h1-styles,.hero-banner-texture .subtext, .hero-banner-texture .description').css('width','auto');
                }
            }
        },

        init = function() {
            if (_videoElem.length > 0) {
               _bindIframe();
            }
            var animatedText = $('.animatedText ').val();
            if(animatedText){
                var title = animatedText.split(',');
                $(".typed-text-primary").typed({
                    strings: title,
                    typeSpeed: 50,
                    backDelay: 1200,
                    loop: true,
                    cursorChar: "",
                });
            }
           
            if (_heroBannerList.length > 0) {
                _createSlider(_heroBannerList);
                if (INFORMA.global.device.viewport === "desktop" || INFORMA.global.device.viewportN === 0) {
                    if($('.hero-banner-carousel .videoBG').length>0){
                        $('.hero-banner-carousel .slick-next, .hero-banner-carousel .slick-prev,.hero-banner-carousel ul.slick-dots').addClass('disable-arrow');
                    }
                }    
            }
            if(_heroBannerFull.length > 0){
                resizeHeroBanner();  
            }    
            $(window).on("load", function() {
                if(_heroBannerFull.length > 0){
                    if(INFORMA.global.device.viewport === "mobile"){
                        var imageHeight = $('.key-logo-img-mobile');
                        if(imageHeight){
                            var height = $('.hero-banner .container,.hero-banner-texture .container').height() + imageHeight.height();
                            $('.hero-banner,.hero-banner-texture').height(height);
                        }
                        else{
                            $('.hero-banner,.hero-banner-texture').height(height);
                        }
                        $('.hero-banner').css('min-height','275px');
                    }
                }
            });
           

            $(window).on("resize", function() {
                if(_heroBannerFull.length > 0){
                    if(INFORMA.global.device.viewport === "mobile"){
                        var height = $('.hero-banner .container,.hero-banner-texture .container').outerHeight();
                        $('.hero-banner,.hero-banner-texture').height(height);
                        $('.hero-banner').css('min-height','275px');
                    }
                    resizeHeroBanner();
               }
            });

        };

        return {
            init: init
        };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.heroBanner.init());


/*
 * twitter-feed.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.twitterFeed = (function(window, $, namespace) {
    'use strict';
    //variables
    var _twitterList = $('.twitter-carousel'),
    // methods
        init,
        _dots,
        _createSlider,
        _equalHeight;

    _equalHeight = function () {
        var items = _twitterList.find('.feed'),
            _vp = INFORMA.global.device.viewportN,
            maxHeight = 0;

            if(_vp === 0 || _vp === 1) {
                items.each(function () {
                    var Height = $(this).height();
                    if(Height > maxHeight) {
                        maxHeight = Height;
                    }
                })
                items.css('height', maxHeight);
            }

    }

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = container.data('autorotate'),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be dis
            _infinite = true,
            _dots = Boolean(container.data('pagination')),
            _rtl;

            if(container.data('rtl') !== undefined) {
                _rtl = container.data('rtl');
            }
            //chk for sitecore preview
            // if (INFORMA.global.siteCore.isPreview) {
            //     _autoplay = true;
            // }
            // if (INFORMA.global.siteCore.isExperience) {
            //     _autoplay = false;
            //     _infinite = false;
            // }
            if(INFORMA.global.device.viewportN === 1){
                  _slideCount = 2;
            }
            else if (INFORMA.global.device.viewportN === 2){
                  _slideCount = 1;
                  _dots = true;
            }

            if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            dots: _dots,
            swipe: INFORMA.global.device.isDesktop ? false : true,
            adaptiveHeight: true
        });
    }

    init = function() {
        if (_twitterList.length > 0) {
            _createSlider(_twitterList);
            _equalHeight();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.twitterFeed.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.analystList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _analystList = $('#pdp-analyst'),
        _listItems = $('.analyst-views'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _equalHeight,
        _lists = null;

    _bindShowMore = function(container){

        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){

            var _vp = INFORMA.global.device.viewportN;

            if(_vp === 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            } else if(_vp === 3) {
                _vp = 3;
            }
            else {
                _vp = 4; // or (n+9)
            }
            $(this).parents('.analyst-views').find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).parents('.analyst-views').toggleClass('showLess');
        });
    }

    _equalHeight = function(items) {
        var EachView = jQuery('.analyst-views');
        EachView.each(function() {
            var Items = jQuery(this).find('.analyst-list-container .analyst-description'),
                ItemsHeader = jQuery(this).find('.analyst-list-container .analyst-details'),
                ItemsFooter = jQuery(this).find('.analyst-list-container .analyst-footer-content'),
                _maxHeight = 0,
                _maxHeightHeader = 0,
                _maxHeightFooter = 0,
                _padding = 50;
            ItemsHeader.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightHeader) {
                    _maxHeightHeader = Height;
                }
            })
            ItemsHeader.css('height', _maxHeightHeader);
            Items.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeight) {
                    _maxHeight = Height;
                }
            })
            Items.css('height', _maxHeight + _padding);
            ItemsFooter.each(function() {
                var Height = jQuery(this).height();
                if (Height > _maxHeightFooter) {
                    _maxHeightFooter = Height;
                }
            })
            ItemsFooter.css('height', _maxHeightFooter);
        })
    }
    _bindShowLess = function () {
      var _showLess = _analystList.find('.btn.btn-showMore .less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _analystList.offset().top - 35
            },700);
      });
    }
    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
            //_bindShowLess();
        }
        if (_listItems.length > 0) {
            _listItems.each(function() {
                var items = jQuery(this).find('.analyst-list-container');
                _equalHeight(items);
            });
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());

/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Saurabh Sinha
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.pdpBrochure = (function(window, $, namespace) {
    'use strict';
    //variables
   var downloadBrochure = $('.pdp-brochure, #agri-report'),
       submitResponse = $('#formSendBrochure .submit-response'),
       Url = downloadBrochure.data('url'),
    //methods
        init;

    init = function() {

      if(submitResponse.length > 0){
        window.open(Url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,left=100,width=1000,height=600");
      }

    }
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.pdpBrochure.init());

/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.pdp_customer_quote = (function(window, $, namespace) {
    'use strict';
    //variables
    var _customersList = $('.customer-quote .slider-component'),
    // methods
        init,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        //todo: for the love of Madonna Sebastian move this to common
        var _slideCount = 1,//container.data('itemsperframe'), Evil laugh when the author tries to change config,
           _autoplay = container.data('autorotate'),
           _speed = container.data('transitionspeed'), // speed of transition
           _duration = container.data('slideduration'), // how long the slider will be dis
           _infinite = true,
           _dots = Boolean(container.data('dots')),
           _rtl;

          if(container.data('rtl') !== undefined) {
              _rtl = container.data('rtl');
          }

      if (INFORMA.global.siteCore.isExperience) {
          _autoplay = false;
          _infinite = false;
      }
      if(_rtl === true && _autoplay === true) {
                container.on('init', function() {
                    window.setInterval(function() {
                        container.slick('slickPrev');
                    }, _duration);
                });
            }
            container.slick({
               infinite: _infinite,
               autoplay: _autoplay,
               autoplaySpeed: _duration,
               slidesToShow: _slideCount,
               slidesToScroll: _slideCount,
               speed: _speed,
               dots: (_dots != null || _dots != undefined) ? _dots : true,
               swipe: INFORMA.global.device.isDesktop ? false : true
           });
      }

    init = function() {
        if (_customersList.length > 0) {
            _createSlider(_customersList);
        }
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.pdp_customer_quote.init());

/*
 * pharma-home-ourProductsl.js
 *
 *
 * @project:    Informa
 * @date:       2016-Aug-3
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */



 var INFORMA = window.INFORMA || {};
 INFORMA.pharma_home_products = (function(window, $, namespace) {
     'use strict';
     //variables
     var _pharma_home_products = $('#Pharma-ourproducts'),
         _productsList = _pharma_home_products.find('.products-carousel'),
     // methods
         init,
         _closeNews,
         _createSlider;
         _createSlider = function(container){
             // if data-items, data-infinite is defined, used it
             var _slideCount = container.data('itemsperframe'),
                 _autoplay = container.data('autorotate'),
                 _speed = container.data('transitionspeed'), // speed of transition
                 _duration = container.data('slideduration'), // how long the slider will be displayed
                 _infinite = true,
                 _dots = Boolean(container.data('pagination'));
                 //chk for sitecore preview
                 if (INFORMA.global.siteCore.isPreview) {
                     _autoplay = true;
                 }
                 if (INFORMA.global.siteCore.isExperience) {
                     _autoplay = false;
                     _infinite = false;
                 }

             container.slick({
                 infinite: _infinite,
                 autoplay: _autoplay,
                 autoplaySpeed: _duration,
                 slidesToShow: _slideCount,
                 slidesToScroll: _slideCount,
                 speed: _speed,
                 dots: _dots,
                 adaptiveHeight: true,
                 arrows: true,
                 swipe: INFORMA.global.device.isDesktop ? false : true,
                 responsive: [{
                         breakpoint: 1024,
                         settings: {
                             slidesToShow: 3,
                             slidesToScroll: 3
                         }
                     },{
                             breakpoint: 480,
                             settings: {
                                 slidesToShow: 1,
                                 slidesToScroll: 1
                             }
                         }
                 ]
             });
         }

     init = function() {
         if (_productsList.length > 0) {
             _createSlider(_productsList);
         }
     }

     return {
         init: init
     }
 }(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
 jQuery(INFORMA.pharma_home_products.init());

/*
 * Product Finder
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductFinder = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductFinderSection = $('#product-finder-section'),
        SubSectorList = $(".sector-search .SubSector"),
        SubmitBtn = $(".sector-search li.button"),
        CustomSelect = ProductFinderSection.find(".custom-multiselect select"),
        CloseIcon = $(".search-options .close-finder"),
        SearchField = $(".site-search input"),
        SearchSubmitBtn = $(".site-search li.button"),
        //SearchIcon = $(".navbar-default .search a"),
        SearchIcon = $(".search:visible"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,

        // methods
        init, GetSubSectorList, ToggleSearchOption, BindDropDown, ShowHideSearch, GetProductFinderData,
        ToggleProductFinder, ToggleSearch, RenderSearchResult, UpdateSubSectorDropdown, GetAjaxData,
        SubmitHandler, BindAjaxHandler,MergeJsonData;

        ToggleSearch = function(){
            var NavClose =$("#sub-nav .subnav-close a");
            ProductFinderSection.slideDown("slow");
                if(NavClose){
                    NavClose.trigger("click");
                }
                if($(".mainNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
                if($(".mobileNavigation").hasClass("navbar-fixed-top")===true){
                    $('html, body').stop().animate({
                        scrollTop: 0
                    }, 600);
                }
        },
        ToggleProductFinder = function() {
            CloseIcon.on("click", function(e) {
                e.preventDefault();
                SearchIcon.toggleClass("inactive");
                ProductFinderSection.slideUp("fast");
            });
            SearchIcon.on("click", function(e) {
                e.preventDefault();
                if($("#product-finder-section:hidden").length){
                    SearchIcon.toggleClass( "inactive" );
                    ToggleSearch();
                }else{
                    SearchIcon.toggleClass( "active" );
                    ToggleSearch();
                }
            });
        },
        MergeJsonData = function(Json1, Json2,Json3,Json4){
            var Data = {};
            $.extend(Data, Json1,Json2,Json3,Json4);
            return Data;
        },
        GetProductFinderData = function(){
            var FieldArray = ProductFinderSection.find("form").serializeArray(),
                Data = INFORMA.Utils.serializeObject(FieldArray);
            return Data;
        },
        UpdateSubSectorDropdown = function(data) {
            if (data.SubSectors.length > 0) {
                var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                    html = ListTemplate({ SubSectors: data.SubSectors });


                $(".sector-search li").removeClass("disabled");
                SubSectorList.removeAttr("disabled")
                    .removeProp("disabled")
                    .html(html);
                SubSectorList.multiselect('rebuild');
            }else{
                $("ul.sector-search li.button").removeClass("disabled");
            }
        },
        RenderSearchResult = function(data,type) {
            INFORMA.SearchResults.RenderSearchResults(data);
            //Update url with update search text value
            if(type === "SearchResult") { 
                var SearchValue = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
                if (history.pushState) {
                    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchtext='+SearchValue;
                    window.history.pushState({path:newurl},'',newurl);
                }
            }
        },
        GetAjaxData = function(url, method, data, SCallback, Errcallback) {
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: data,
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        SubmitHandler = function(btn,SearchType) {
            btn.off().on("click", function(e) {
                e.preventDefault();
                INFORMA.Spinner.Show($("body"));
                if($('#hdnSearchType')) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                var ProductData = GetProductFinderData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = INFORMA.SearchResults.DefaultParameters(),
                    Data = MergeJsonData(ProductData,FilterData,DefaultData);

                if(SearchType === "ProductSearch") {
                    Data.IsProduct = true;
                }
                if(SearchType === "SearchResult") { 
                    Data.IsSearch = true;
                    Data.PageNo = 1;
                    Data.CurrentPage = $(".search-container").data("currentpage");
                }
                GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), function(data){RenderSearchResult(data,SearchType)}, null);
                INFORMA.SearchResults.ResetPaging();
            });
        },
        BindAjaxHandler = function() {

            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SubmitHandler(SubmitBtn,"ProductSearch");
            }
            if (IsSearchPage) {
                SubmitHandler(SearchSubmitBtn,"SearchResult");
            }
            SearchField.on("keyup",function(e){
                var MaxLength = $(this).data('length');
                if($(this).val().trim().length >= MaxLength){
                    SearchSubmitBtn.removeClass("disabled");
                }
                else{
                    SearchSubmitBtn.addClass("disabled");
                }
            });
            $(".product-finder form").on("keydown",function(e){
                var SearchTextField = $(".site-search input[name=SearchText]"),
                    SiteSearchRadio = ProductFinderSection.find("input[type=radio][data-show='site-search']:checked"),
                    ViewPort = INFORMA.global.device.viewportN;
                    if (e.keyCode === 13 || e.which===13) {

                         if(ViewPort===1|| ViewPort===2){
                            SearchTextField.trigger("blur");
                            document.activeElement.blur();
                        }
                        if((SearchTextField.val().length >= SearchTextField.data('length')) && (SiteSearchRadio)){
                            var SearchSbmtBtn = $('button[data-submit="site-search"]').parent();
                            if(!SearchSbmtBtn.hasClass('disabled')) {
                                SearchTextField.parents('.site-search').find('button[data-submit="site-search"]').trigger('click');
                            }
                            return false;
                        }else{
                            var ProductSbmtBtn = $("button[data-submit='sector-search']").parent();
                            if(!ProductSbmtBtn.hasClass('disabled')) {
                                return true;
                            }
                            return false;
                        }
                    }
            });
        },
        ShowHideSearch = function(ele) {
            var ShowOption = $(ele).data('show');
            $("ul.searchToggle").addClass('hidden');
            ProductFinderSection.find("ul." + ShowOption).removeClass("hidden").fadeIn("slow");
        },
        ToggleSearchOption = function() {
            ToggleProductFinder();
            jQuery(".search-options input[type=radio]").on('change', function(e) {
                e.preventDefault();
                ShowHideSearch($(this));
            });
            jQuery(".search-options input[type=radio]").on('focus', function(e) {
                e.preventDefault();
                $(this).parent().addClass("active");
            });
            jQuery(".search-options input[type=radio]").on('focusout', function(e) {
                e.preventDefault();
               	$(this).parent().removeClass("active");
            });
            var CheckedOption = jQuery(".search-options input[type=radio]:checked");
            if (typeof CheckedOption === "object") {
                ShowHideSearch(CheckedOption);
            }
        },
        GetSubSectorList = function(arrayList) {
            var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
                SectorIDs = 'SectorIDs='+SectorIDs;

            GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null);
        },
        BindDropDown = function() {
        	var IsSectorExist = $("input.sector-list").val(),
            	SectorList = (IsSectorExist) ? IsSectorExist.split(',') : [];

            CustomSelect.val("");
            CustomSelect.multiselect({
                maxHeight: 200,
                buttonText: function(o, s) {

                    if (o.length === 0) {
                        return $(s).data('placeholder');
                    } else {
                        var labels = 1;
                        o.each(function(i) {
                            labels = parseInt(1 + i);
                        });
                        return labels + ' Selected';
                    }
                },
                onChange: function(option, checked, select) {
                    if ($(option).parent().hasClass("Sector") === true) {
                        if (checked) {
                            SectorList.push($(option).val());
                        } else {
                            var index = SectorList.indexOf($(option).val());
                            if (index >= 0) {
                                SectorList.splice(index, 1);
                            }
                            SubSectorList.parents("li").eq(0).addClass("disabled");
                            SubSectorList.attr("disabled", "disabled");
                            SubSectorList.val('');
                            SubSectorList.multiselect('rebuild');
                            SubmitBtn.addClass("disabled");
                            $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                        }
                        if (SectorList.length > 0) {
                            GetSubSectorList(SectorList);
                        }
                    }
                }
            });
        };
    init = function() {

        if (ProductFinderSection.length > 0) {
            BindDropDown();
            ToggleSearchOption();
            BindAjaxHandler();
        }
    };

    return {
        init: init,
        UpdateSubSectorDropdown: UpdateSubSectorDropdown,
        GetProductData : GetProductFinderData,
        GetSubSectorList: GetSubSectorList,
        MergeData :MergeJsonData
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductFinder.init());
/*
 * analyst-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-22
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ProductRefine = (function(window, $, namespace) {
    'use strict';
    //variables
    var ProductRefineSection = $('.product-refine-results'),
        RefineHeading = ProductRefineSection.find('.refine-heading'),
        init, DropDownEvents;

    DropDownEvents = function () {
        var _vp = INFORMA.global.device.viewport;

        if(_vp !== "desktop") {
            RefineHeading.on('click', function () {
                $(this).parents('.refine-wrapper').find('.accordian-container').slideToggle();
                $(this).toggleClass('open');
            })
        }

        $('.refine-accordian .title').on('click', function (e) {
            e.preventDefault();
            $(this).next('.content').slideToggle();
            $(this).parents('.refine-accordian').toggleClass('open');
        });

    }


    init = function() {

        if (ProductRefineSection.length > 0) {
            DropDownEvents();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.ProductRefine.init());

/*
 * My recommendations-recommended products
 *
 *
 * @project:    Informa
 * @date:       2016-August-22
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedProductsItems = (function(window, $, namespace) {
    'use strict';
    //variables
    var _recommendedproducts = $('.recommended-products'),
        _productsList = _recommendedproducts.find('.recom-prod-carousel'),
    // methods
        init,
        _createSlider,
        EqualHeightProducts;

        EqualHeightProducts = function() {
            var Items = _recommendedproducts.find('.wrap-content'),
                MaxHeight = 0;
                _recommendedproducts.find('.list-items').height('auto');
                Items.height('auto');
                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);

        },
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _slideCount = container.data('itemsperframe'),
                _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = Boolean(container.data('pagination'));
                //chk for sitecore preview
                if (INFORMA.global.siteCore.isPreview) {
                    _autoplay = true;
                }
                if (INFORMA.global.siteCore.isExperience) {
                    _autoplay = false;
                    _infinite = false;
                }

            container.slick({
                infinite: _infinite,
                autoplay: _autoplay,
                autoplaySpeed: _duration,
                slidesToShow: _slideCount,
                slidesToScroll: _slideCount,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true,
                swipe: INFORMA.global.device.isDesktop ? false : true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },{
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                ]
            });
            EqualHeightProducts();
        }

    init = function() {
        if (_productsList.length > 0) {
            _createSlider(_productsList);
            $(window).on('load', function() {
                EqualHeightProducts();
            });
        }
    }

    return {
        init: init,
        CreateProductSlider: _createSlider
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedProductsItems.init());

/*
* Product Results.js
*
*
* @project:    Informa
* @date:       2016-April-25
* @author:     Tejaswi
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedTabs = (function(window, $, namespace) {
    'use strict';
    var RecomendedTab = $('.recommendation-tabs'),
        RecomendedResults = $('.recommended-results'),
        Tabs = RecomendedTab.find('a[data-toggle="tab"]'),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        //methods
        init, LargeDeviceFunction, SmallDeviceFunction, GetAjaxData, GetItemsDefault, RenderItems,
        RenderDashboardProduct;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },
    GetItemsDefault = function (target) {
        var object = null;
         var   DefaultCount = $('.recomended-content').attr('data-defaultCount');

        if(target === '#tabs-1') {
            
            object = {
                PageSize: DefaultCount,
                GetContentBasedOnContentType:true,
                SearchTexts: $('.SearchTextsSampleContent').val().split('|'),
                ExcludeContentTypeGuids: $('.ExcludeContentTypeGuids').val().split('|'),
                SubSubSectorFlagForRecomendations :$('input.SubSubSectorFlagForRecomendations').val()
            }
            
            GetAjaxData(Urls.GetRecomendedItems, "Post", object, INFORMA.RecomendedContent.RenderRecomendResult, null, "PreferenceUpdate");
        }
    },

    SmallDeviceFunction = function (Parent) {
        var Select = Parent.find('select[name="RecommendTabs"]');

        Select.val('#tabs-1').trigger('change');

        Select.on('change', function () {
            var Value = $(this).val();
            RecomendedResults.find('.tab-pane').removeClass('active');

            $(Value).addClass('active');

            GetItemsDefault(Value);
        })
    }

    LargeDeviceFunction = function (Parent) {
        Parent.find('.nav-tabs li:first-child a').trigger('click');

        Tabs.on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href");

            GetItemsDefault(target);
        });
    },

    RenderDashboardProduct= function(data){
        
        if(data.length > 0) {
            $('#tabs-1 .recommended-products').removeClass('hidden');
            var results = data,
                html = "";

            for(var key = 0; key < results.length; key++) {
                var Data = results[key],
                    TemplateName = (Templates.Product !== "undefined") ? Templates.Product : "",
                    ListTemplate = Handlebars.compile(TemplateName);
                    
                html += ListTemplate({ results: Data });
            }

            $('.recom-prod-carousel').slick('unslick');
            $('.recom-prod-carousel').html(html);
            INFORMA.RecomendedProductsItems.CreateProductSlider($('.recom-prod-carousel'));
        } else {
            $('#tabs-1 .recommended-products').addClass('hidden');
        }
    }

    init = function () {
        if(RecomendedTab.length > 0) {
            var Viewport = INFORMA.global.device.viewport;

            if(Viewport === "mobile") {
                SmallDeviceFunction(RecomendedTab);
            } else {
                LargeDeviceFunction(RecomendedTab);
            }
        }
    }
    return {
        init: init,
        RenderDashboardProduct: RenderDashboardProduct
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedTabs.init());
/*
* Product Results.js
*
*
* @project:    Informa
* @date:       2016-April-25
* @author:     Rajiv Aggarwal
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.RecomendedContent = (function(window, $, namespace) {
    'use strict';
    //variables
    var RecomendedWrapper = $('.recomended-content'),
        RecomendedCount = $(".tab-content .recomended-content").data("maximumnumberofarticles"),
        MaxArticleCount = (RecomendedCount !=="") ? RecomendedCount : 0,
        BtnMore = RecomendedWrapper.find('.btn-showMore'),
        VViewPort = INFORMA.global.device.viewport,
        DefaultArticleCount = $(".tab-content .recomended-content").attr('data-' + VViewPort),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
    //methods
        equalHeight, init, ShowMore, GetIds, GetAjaxData, RenderRecomendResult;

    GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: JSON.stringify({ data: data }),
            success_callback: function (data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function () {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    RenderRecomendResult = function (data, SearchType) {

        if(data != null) {
           
            var results = data,
                html = "",
                ArticleCounts = results.ArticleCount,
                Articles = results.Articles;

                if(Articles != null) {
                    $('#tabs-1 .recomended-content').removeClass('hidden');
                    $('#tabs-1 .recommended-products').removeClass('hidden');
                    $('#tabs-1 .dashboard-no-record').addClass('hidden');
                    for(var key = 0; key < Articles.length; key++) {
                        var Data = Articles[key],
                            TemplateName = (Templates.SampleContent !== "undefined") ? Templates.SampleContent : "",
                            ListTemplate = Handlebars.compile(TemplateName);
                            if($('.recommendation-tabs').length > 0) {
                                if($('.welcome-description').hasClass('Authenticated')) {
                                    Data.IsAuthenticatedUser = true;
                                } else {
                                    Data.IsAuthenticatedUser = false;
                                }
                            }
                        html += ListTemplate({ results: Data });
                    }
                    if(Articles.length > 0) {
                        $('#tabs-1 section.recomended-content').removeClass('hidden');
                        $('#tabs-1 section.dashboard-no-record').addClass('hidden');
                    } else {
                        $('#tabs-1 section.recomended-content').addClass('hidden');
                        $('#tabs-1 section.dashboard-no-record').removeClass('hidden');
                    }
                    if(SearchType == null) {
                        RecomendedWrapper.find('.row').append(html);
                    } else {
                        RecomendedWrapper.find('.row').html(html);
                        equalHeight(RecomendedWrapper);
                        var name = "PrefernceUpdated";
                        var cookie = name+"="+false+'; path=/';
                        document.cookie = cookie;
                    }
                    equalHeight(RecomendedWrapper);


                    if(ArticleCounts > DefaultArticleCount && RecomendedWrapper.find('.recomended-wrapper').length < MaxArticleCount) {
                        BtnMore.removeClass('hidden');
                    } else {
                        BtnMore.addClass('hidden');
                    }

                    if($('#tabs-1 .recommended-products').length > 0) {
                        var _DashBoardObject = {
                            SearchTexts: ($('.SearchTextsPDPTemplateIds').length) ? $('.SearchTextsPDPTemplateIds').val().split('|') : "",
                            PageSize: $('.recomended-content').data('maximumnumberofarticles'),
                            SubSubSectorFlagForRecomendations: $('input.SubSubSectorFlagForRecomendations').val()
                        }
                        GetAjaxData(Urls.GetRecomendedProductItems, "Post", _DashBoardObject, INFORMA.RecomendedTabs.RenderDashboardProduct, null, null);
                    }
                } else {
                    $('#tabs-1 .recomended-content').addClass('hidden');
                    $('#tabs-1 .recommended-products').addClass('hidden');
                    $('#tabs-1 .dashboard-no-record').removeClass('hidden');
                }

        } else {
            BtnMore.addClass('hidden');
        }
        
    },

    GetIds = function (Parent) {
        var items = Parent.find('.list-items'),
            ids = [];

        items.each(function () {
            var id = $(this).attr('data-fetch');
            ids.push(id);
        })

        return ids;
    }

    ShowMore = function () {
        BtnMore.on('click', function (e) {
            e.preventDefault();
            var Parent = $(this).parents('.recomended-content'),
                ViewPort = INFORMA.global.device.viewport,
                Count = Parent.attr('data-' + ViewPort),
                Ids = GetIds(Parent),
                ItemDisplayed = Parent.find('.recomended-wrapper').length,
                MaximumCount = Parent.attr('data-MaximumNumberOfArticles'),
                _Object = null;

                if((MaximumCount - ItemDisplayed) <= Count) {
                    Count = (MaximumCount - ItemDisplayed);
                }

                _Object = {
                    ExcludeContentGuids: Ids,
                    PageSize: Count,
                    SearchTexts: $('.SearchTextsSampleContent').val().split('|'),
                    ExcludeContentTypeGuids: $('.ExcludeContentTypeGuids').val().split('|'),
                    SubSubSectorFlagForRecomendations: $('input.SubSubSectorFlagForRecomendations').val()
                };

            GetAjaxData(Urls.GetRecomendedItems, "Post", _Object, RenderRecomendResult, null, null);
        })
    }

    equalHeight = function (Parent) {
        var Items = Parent.find('.recomended-wrapper'),
            MaxHeight = 0,
            MaxWrapperHeight = 0,
            MaxTopicHeight = 0,
            MaxSubSectorHeight = 0;
            Items.each(function () {
                var ContentHeight = $(this).find('.content').height();
                if(ContentHeight > MaxHeight) {
                    MaxHeight = ContentHeight;
                }
            })
            Items.find('.content').height(MaxHeight);
            Items.each(function(){
                var TopicHeight = $(this).find('.topics').outerHeight();
                if(TopicHeight > MaxTopicHeight) {
                    MaxTopicHeight = TopicHeight;
                }
            })
            Items.find('.topics').height(MaxTopicHeight);
            Items.each(function(){
                var TopicHeight = $(this).find('.SubSectors').outerHeight();
                if(TopicHeight > MaxSubSectorHeight) {
                    MaxSubSectorHeight = TopicHeight;
                }
            })
            Items.find('.SubSectors').height(MaxSubSectorHeight);
            Items.each(function(){
                var WrapperHeight = $(this).find('.recomend-content').outerHeight();
                if(WrapperHeight > MaxWrapperHeight) {
                    MaxWrapperHeight = WrapperHeight;
                }
            })
            Items.find('.recomend-content').height(MaxWrapperHeight);
    }

    init = function () {
        if(RecomendedWrapper.length > 0) {
            $('#tabs-1').addClass('active');
            equalHeight(RecomendedWrapper);
            ShowMore();
        }
    }
    return {
        init: init,
        RenderRecomendResult: RenderRecomendResult
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.RecomendedContent.init());
/*
 * global-footer.js
 *
 *
 * @project:    Informa
 * @author:     Saurabh
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.RelevantProducts = (function(window, $, namespace) {
    'use strict';
    //variables
    var _RelevantProductsWrapper = $('#relevant-products'),
        ShowMoreBtn = _RelevantProductsWrapper.find('.btn-ShowMore'),
        TriangleBtn = _RelevantProductsWrapper.find('.triangle'),
        // methods
        init,
        ShowMore,
        HideItems,
        FlipItems,
        EqualHeight;

        EqualHeight = function (Parent) {
            var Items = Parent.find('.search-tile'),
                MaxHeight = 0,
                Padding = 90;
            Items.each(function () {
                var Height = $(this).height();
                
                if(Height > MaxHeight) {
                    MaxHeight = Height;
                }
            })
            Items.height(MaxHeight + Padding);

        },
        FlipItems = function (This) {
            TriangleBtn.on('click', function () {
                $(this).parents('.tile').toggleClass('flip');
            })
            
        },
        HideItems = function(Parent){
            var Viewport = INFORMA.global.device.viewport,
                Count = Parent.attr('data-'+Viewport);

            Parent.find('.search-tile:nth-child(n+' + (parseInt(Count) + 1 )+ ')').hide();
        },

        ShowMore = function () {
            ShowMoreBtn.on('click', function () {
                var Parent = $(this).parents('#relevant-products'),
                    Viewport = INFORMA.global.device.viewport,
                    Count = Parent.attr('data-'+Viewport);

                Parent.find('.search-tile:nth-child(n+' + (parseInt(Count) + 1 )+ ')').slideToggle();
                Parent.toggleClass('showLess');
            })
        },

    init = function() {
        if (_RelevantProductsWrapper.length > 0) {
            HideItems(_RelevantProductsWrapper);
            ShowMore();
            FlipItems();
            EqualHeight(_RelevantProductsWrapper);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RelevantProducts.init());

var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var ResourceContainer = $('#resource-finder-section'),
    	CustomSelect = ResourceContainer.find(".custom-multiselect select"),
        Urls = INFORMA.Configs.urls.webservices,
        Templates = INFORMA.Templates,
        ResourceSubSectorList = ResourceContainer.find('.SubSector'),
        ResourceSbmtBtn = ResourceContainer.find("li.button"),
    	//methods
    	init, BindDropDown, GetSubSectorList, UpdateSubSectorDropdown, GetAjaxData, BindResourceSbmt, GetProductFinderData;

    GetAjaxData = function(url, method, data, SCallback, Errcallback, SearchType) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: function(data) {
                if (typeof SCallback === "function") {
                    SCallback.call(this, data, SearchType);
                }
            },
            error_callback: function() {
                if (typeof Errcallback === "function") {
                    Errcallback.call(this, data, SearchType);
                }
            }
        });
    },

    GetProductFinderData = function(){
        var FieldArray = ResourceContainer.find("form").serializeArray(),
            Data = INFORMA.Utils.serializeObject(FieldArray);
        return Data ;
    },
    BindResourceSbmt = function() {
        ResourceSbmtBtn.on('click', function(){
            var ProductData = GetProductFinderData(),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = INFORMA.SearchResults.DefaultParameters(),
                Data = INFORMA.ProductFinder.MergeData(ProductData,FilterData,DefaultData);
                Data.PageNo = 1;

            GetAjaxData(Urls.ResourceList, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null, null);
        });
    },
    UpdateSubSectorDropdown = function(data) {
        if (data.SubSectors.length > 0) {
            var ListTemplate = Handlebars.compile(Templates.SubSectorList),
                html = ListTemplate({ SubSectors: data.SubSectors });


            ResourceSubSectorList.parents("li").removeClass("disabled");
            ResourceSubSectorList.removeAttr("disabled")
                .removeProp("disabled")
                .html(html);
            ResourceSubSectorList.multiselect('rebuild');
            ResourceSbmtBtn.removeClass('disabled');
        }
    },
    GetSubSectorList = function(arrayList) {
        var SectorIDs = (INFORMA.Utils.getUniqueArray(arrayList)).join(',');
            SectorIDs = 'SectorIDs='+SectorIDs;
        GetAjaxData(Urls.GetSubSectorList, "Get", SectorIDs, UpdateSubSectorDropdown, null, null);
        INFORMA.SearchResults.ResetPaging();
    },
    BindDropDown = function() {
        var SectorList = [];
        CustomSelect.val("");
        CustomSelect.multiselect({
            maxHeight: 200,
            buttonText: function(o, s) {

                if (o.length === 0) {
                    return $(s).data('placeholder');
                } else {
                    var labels = 1;
                    o.each(function(i) {
                        labels = parseInt(1 + i);
                    });
                    return labels + ' Selected';
                }
            },
            onChange: function(option, checked, select) {
                if ($(option).parent().hasClass("Sector") === true) {
                    if (checked) {
                        SectorList.push($(option).val());
                        ResourceSbmtBtn.removeClass("disabled");
                    } else {
                        var index = SectorList.indexOf($(option).val());
                        if (index >= 0) {
                            SectorList.splice(index, 1);
                        }
                        //if(SectorList.length === 0) {	                    
                    }
                    if (SectorList.length > 0) {
                        GetSubSectorList(SectorList);
                    } else {
                        ResourceSubSectorList.parents("li").eq(0).addClass("disabled");
                        ResourceSubSectorList.attr("disabled", "disabled");
                        ResourceSubSectorList.val('');
                        ResourceSubSectorList.multiselect('rebuild');
                        ResourceSbmtBtn.addClass("disabled");
                        $("li.disabled .dropdown-toggle").attr("disabled", "disabled");
                    }
                }
            }
        });
    };

    init = function() {
    	if(ResourceContainer.length > 0) {
    		BindDropDown();
            BindResourceSbmt();
    	}
    }

    return {
        init: init,
        GetResourceData : GetProductFinderData,
        UpdateSubSectorDropdown : UpdateSubSectorDropdown
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());
/*
 * News Flash
 *
 *
 * @project:    Informa
 * @date:       2016-july-28th
 * @author:     Tejaswi chennupati
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.news_flash = (function(window, $, namespace) {
    'use strict';
    //variables
    var _newsFlash = $('.newsFlash'),
        _newsList = _newsFlash.find('.news-carousel'),
    // methods
        init,
        _closeNews,
        _createSlider;

        _closeNews = function(){
           $('#close-news').on('click', function(){
		            $('.newsFlash').remove();
		        });
        }
        _createSlider = function(container){
            // if data-items, data-infinite is defined, used it
            var _autoplay = container.data('autorotate'),
                _speed = container.data('transitionspeed'), // speed of transition
                _duration = container.data('slideduration'), // how long the slider will be displayed
                _infinite = true,
                _dots = false;
                //chk for sitecore preview
                if (INFORMA.global.siteCore.isPreview) {
                    _autoplay = true;
                }
                if (INFORMA.global.siteCore.isExperience) {
                    _autoplay = false;
                    _infinite = false;
                }

            container.slick({
                infinite: _infinite,
                autoplay: _autoplay,
                autoplaySpeed: _duration,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: _speed,
                dots: _dots,
                adaptiveHeight: true,
                arrows: true,
                swipe: INFORMA.global.device.isDesktop ? false : true
            });
        }

    init = function() {
        if (_newsList.length > 0) {
            _createSlider(_newsList);
        }
        _closeNews();
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.news_flash.init());

var INFORMA = window.INFORMA || {};
INFORMA.RTETable = (function(window, $, namespace) {
    'use strict';
    //variables
    var titles = [],i,init, _RTEOnLoad,
        responsiveContainer = $(".rte-custom-table .responsiveTable"),
        Clonedtable = $(".rte-custom-table .table-responsive .table").clone(true);

    _RTEOnLoad = function() {
        Clonedtable.appendTo(responsiveContainer);
        $('.rte-custom-table .table tr:first-child td').each(function() {
            titles.push('<div class="rteTitles">'+$(this).html()+'</div>');
        });
        responsiveContainer.find('table.table tr').each(function() {
            for (i = 1; i <= titles.length; i++) {
                $(this).find('td').eq(i).wrapInner('<div class="rteValues" />').prepend(titles[i]);
            }
        });
        responsiveContainer.find('table.table tr:first-child').remove();
    }
    init = function() {
        _RTEOnLoad();
    };
    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.RTETable.init());

/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResultFilter = (function (window, $, namespace) {
    'use strict';
    //variables
    var Urls = INFORMA.Configs.urls.webservices,
        SelectAll = $(".refine-container .panel-heading .custom-checkbox input"),
        RefineSection = $(".refine-container .panel-body"),
        ShowMoreLinks = RefineSection.find("a.show-more"),
        RefineCheckBox = $(".refine-container .panel-body .custom-checkbox input"),
        CheckedRefineCheckBox = $(".refine-container .panel-body .custom-checkbox input:checked"),
        ClearAllLink,
        ProductFinderSection = $('#product-finder-section'),
        SearchType = '',
        newURL,
        siteSearch = $('button[data-submit="site-search"]'),
        productSearchCTA = $('button[data-submit="sector-search"]'),
        resourceProductSearchCTA = $('.resource-sector-search button[data-submit="sector-search"]'),
        getProductSearchParams, getResourceResultParams, productSearchString, newSearch = false, sectorQuery, subsectorQuery,
        // methods
        init, SelectAllCheckBox, BindRefineEvents, ClearAllLinkBinding, DoRefine, RefineSearchResult, GetAjaxData, GetSelectedFilter;

    GetAjaxData = function (url, method, data, SCallback, Errcallback) {
        INFORMA.Spinner.Show($("body"));
        INFORMA.DataLoader.GetServiceData(url, {
            method: method,
            data: data,
            success_callback: SCallback,
            error_callback: Errcallback
        });
        INFORMA.SearchResults.ResetPaging();
    },
        GetSelectedFilter = function () {
            var Data = {},
                ParamData = [];

            if (RefineSection) {
                $.each(RefineSection, function () {
                    var GetSectionID = $(this).parent().attr("id").toLowerCase(),
                        SelectedCheckBox = $(this).find("input[type=checkbox]:checked").not(":disabled"),
                        uniqueArr = [],
                        parameters = [],
                        parameter;

                    if (SelectedCheckBox.length) {
                        $.each(SelectedCheckBox, function () {
                            uniqueArr.push($(this).attr("value"));
                            parameter = $(this).next().text().replace(/ /g, '-').toLowerCase();
                            parameters.push(parameter.replace(/&/g, '%26'));
                            Data[GetSectionID] = uniqueArr;
                        });
                        if (parameters.length > 0) {
                            ParamData.push(GetSectionID + "=" + parameters.toString());
                        }
                    }
                });
                newURL = ParamData.join("&");

                if (Data.Brand === undefined) {
                    Data.Brand = ($('input[name="Brand"]')) ? $('input[name="Brand"]').val() : null
                } else {
                    Data.Brand.push($('input[name="Brand"]').val());
                }
                return Data;
            }
        },
        DoRefine = function () {
            var ProductData, searchText, urlpath;
            if (SearchType === "ResourceResult") {
                ProductData = INFORMA.ResourceFilter.GetResourceData();
            } else {
                ProductData = INFORMA.ProductFinder.GetProductData();
            }
            var FilterData = GetSelectedFilter(),
                DefaultData = INFORMA.SearchResults.DefaultParameters(),
                Data = INFORMA.ProductFinder.MergeData(ProductData, FilterData, DefaultData);

            Data.PageNo = 1;
            if (SearchType === "ResourceResult") {
                Data.IsResourceListing = true;
            }
            if (SearchType === "SearchResult") {
                Data.IsSearch = true;
            }
            if (SearchType === "ProductSearch") {
                Data.IsProduct = true;
            }
            if (Data.SearchText) {
                searchText = Data.SearchText;
            }

            GetAjaxData(Urls.GetRefineResults, "Post", JSON.stringify(Data), INFORMA.SearchResults.RenderSearchResults, null);

            if (SearchType === "SearchResult") {
                if (newURL)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText + "&" + newURL;
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?searchText=' + searchText;

                window.history.pushState({ path: urlpath }, '', urlpath);
            } else if (SearchType === "ProductSearch") {
                var urlQueryStrings = [];
                if (newSearch)
                    urlQueryStrings = getProductSearchParams();
                else {
                    if (sectorQuery)
                        urlQueryStrings.push(sectorQuery);
                    if (subsectorQuery)
                        urlQueryStrings.push(subsectorQuery);
                }
                if (newURL && urlQueryStrings.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlQueryStrings.join("&") + '&' + newURL;
                else if (newURL && urlQueryStrings.length == 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newURL;
                else if (!newURL && urlQueryStrings.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlQueryStrings.join("&");
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?PageRequest=' + productSearchString;

                window.history.pushState({ path: urlpath }, '', urlpath);
            } else if (SearchType === "ResourceResult") {
                var resourceSearchParams = getResourceResultParams();
                if (newURL && resourceSearchParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + resourceSearchParams.join("&") + "&" + newURL;
                else if (newURL && resourceSearchParams.length == 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + newURL;
                else if (!newURL && resourceSearchParams.length != 0)
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + resourceSearchParams.join("&");
                else
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname;
                window.history.pushState({ path: urlpath }, '', urlpath);

            }

        },

        getProductSearchParams = function () {
            var parameter, urlQueryStrings = [];
            if ($('#SectorNames').val()) {
                parameter = $("#SectorNames").val().trim().replace(/ /g, '-').toLowerCase();
                urlQueryStrings.push("sector=" + parameter.replace(/&/g, '%26').toLowerCase());
                productSearchString = "Sector"
            }
            if ($('#SubSectorNames').val() && ($('#SubSector2').parent().find("button").attr("title") != "Please Select")) {
                parameter = $("#SubSectorNames").val().trim().replace(/ /g, '-').toLowerCase();
                urlQueryStrings.push("subsector=" + parameter.replace(/&/g, '%26').toLowerCase());
                productSearchString = "subsector"
            }
            return urlQueryStrings;
        },

        getResourceResultParams = function () {
            var resourceSearchParams = [], SubSectorNames = [], SectorNames = [];
            $("#Sector :selected").map(function (i, el) {
                SectorNames.push($(el).text().trim().replace(/ /g, '-').toLowerCase().replace(/&/g, '%26'));
            });
            $("#sub-sector-list :selected").map(function (i, el) {
                SubSectorNames.push($(el).text().trim().replace(/ /g, '-').toLowerCase().replace(/&/g, '%26'));
            });
            if (SectorNames.length != 0) {
                resourceSearchParams.push("sector=" + SectorNames.toString())
            }
            if (SubSectorNames.length != 0) {
                resourceSearchParams.push("subsector=" + SubSectorNames.toString())
            }

            return resourceSearchParams;
        },
        SelectAllCheckBox = function () {

            SelectAll.on("click", function (e) {
                var ParentEle = $(this).parents(".panel").eq(0).find(".panel-body"),
                    CurrentCheckBoxs = ParentEle.find('input[type="checkbox"]').not(":disabled"),
                    CurrentShowMoreLink = ParentEle.find("a.show-more");

                if ($(this).prop("checked") === true) {
                    jQuery.each(CurrentCheckBoxs, function () {
                        $(this).prop("checked", "checked");
                        $(this).attr("checked", "checked");
                    });
                } else {
                    jQuery.each(CurrentCheckBoxs, function () {
                        $(this).removeAttr("checked", false);
                        $(this).removeProp("checked", false);
                    });
                }
                if (CurrentShowMoreLink) {
                    CurrentShowMoreLink.trigger("click");
                }
                var IsAnyCheckBoxChecked = $(".refine-container .panel-body input[type=checkbox]:checked"),
                    isLinkFilterExist = jQuery(".search-container .items-found li").size();
                if (IsAnyCheckBoxChecked.length > 0 || isLinkFilterExist === 1) {
                    ClearAllLink.addClass("noOpaque");
                } else {
                    ClearAllLink.removeClass("noOpaque");
                }
                DoRefine();
            });
            SelectAll.on("focus", function (e) {
                $(this).parents('span').eq(0).addClass("active");
            });
            SelectAll.on("focusout", function (e) {
                $(this).parents('span').eq(0).removeClass("active");
            });
        },
        ClearAllLinkBinding = function (obj) {
            obj.on("click", function (e) {
                e.preventDefault();
                var AllCheckBox = $(".refine-container .custom-checkbox input"),
                    UnfilterCheckbox = ($(".UnFilterCheckbox").length > 0) ? $(".UnFilterCheckbox").val() : "";
                if ($('#hdnSearchType').length > 0) {
                    $('#hdnSearchType').attr('name', '');
                    $('#hdnSearchType').attr('value', '');
                }
                $(this).removeClass("noOpaque");
                $.each(AllCheckBox, function () {
                    $(this).prop("checked", false);
                });
                if (UnfilterCheckbox.length > 0) {
                    $(".refine-container .custom-checkbox input#" + UnfilterCheckbox).prop("checked", true);
                }
                DoRefine();
            });

        },
        BindRefineEvents = function () {
            $.each(RefineSection, function () {
                var DefaultCount = ($(this).attr("data-defaultcount") !== null) ? $(this).attr("data-defaultcount") : 5,
                    SectionCheckBox = $(this).find(".custom-checkbox input"),
                    CurrentList = $(this).find("ul li"),
                    CheckBoxCount = SectionCheckBox.length,
                    ShowMoreLink = $(this).find("a.show-more");

                if (CheckBoxCount > DefaultCount) {
                    ShowMoreLink.addClass("show");
                    $.each(CurrentList, function (i) {
                        var currentIndex = i + 1;
                        if (currentIndex > DefaultCount) {
                            $(this).addClass("hidden");
                        }
                    });
                }
            });
            var RefineCheckBoxes = $(".refine-container .panel-body .custom-checkbox input");
            RefineCheckBoxes.on("click", function () {
                var ParentEle = $(this).parents(".panel-body").eq(0),
                    InputCount = ParentEle.find("input[type=checkbox]"),
                    SelectedCheckBox = ParentEle.find("input[type=checkbox]:checked"),
                    CurrentSelectAllCheckBox = $(this).parents(".panel").eq(0).find(".panel-heading input");
                if (SelectedCheckBox && SelectedCheckBox.length === InputCount.length) {
                    CurrentSelectAllCheckBox.prop("checked", true);
                } else {
                    CurrentSelectAllCheckBox.prop("checked", false);
                }
                var IsAnyCheckBoxChecked = $(".refine-container .panel-body input[type=checkbox]:checked"),
                    isLinkFilterExist = jQuery(".search-container .items-found li").size();
                if (IsAnyCheckBoxChecked.length > 0 || isLinkFilterExist === 1) {
                    ClearAllLink.addClass("noOpaque");
                } else {
                    ClearAllLink.removeClass("noOpaque");
                }
                DoRefine();
            });
            //Accsisbility fix for custom
            RefineCheckBoxes.on("focus", function () {
                $(this).parents('li').eq(0).addClass("active");
            });
            RefineCheckBoxes.on("focusout", function () {
                $(this).parents('li').eq(0).removeClass("active");
            });


            ShowMoreLinks.on("click", function (e) {
                e.preventDefault();
                var text, defaultCount, listItem;
                if ($(this).hasClass("SeeLess") !== true) {
                    text = $(this).data("lesstext");
                    $(this).parent().find("ul li").removeClass("hidden");
                    $(this).addClass("SeeLess");
                    $(this).text(text);
                } else {
                    text = $(this).data("moretext"),
                        defaultCount = $(this).parent().data('defaultcount'),
                        listItem = $(this).parent().find("li");
                    $(this).removeClass("SeeLess");
                    $(this).text(text);
                    listItem.addClass("hidden");

                    $.each(listItem, function (i) {
                        var Index = i + 1;
                        if (Index <= defaultCount) {
                            $(this).removeClass("hidden");
                        }
                    });
                }

            });
            ClearAllLinkBinding(ClearAllLink);
        },
        init = function () {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
                productSearchCTA.on("click", function () {
                    newSearch = true;
                    if(ClearAllLink)
                        ClearAllLink.click();
                    var urlpath, urlQueryStrings = getProductSearchParams();
                    if(urlQueryStrings.length==0){
                        newSearch = false;
                        if (sectorQuery)
                            urlQueryStrings.push(sectorQuery);
                        if (subsectorQuery)
                            urlQueryStrings.push(subsectorQuery);
                    }
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+urlQueryStrings.join("&");
                    window.history.pushState({ path: urlpath }, '', urlpath);
                });

            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
                siteSearch.on("click", function () {
                    if(ClearAllLink) ClearAllLink.click();
                });
            }

            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
                resourceProductSearchCTA.on("click", function () {
                    newSearch = true;
                    if(ClearAllLink.click) ClearAllLink.click();
                    var urlpath, urlQueryStrings = getResourceResultParams();
                    if(urlQueryStrings.length==0){
                        newSearch = false;
                        if (sectorQuery)
                            urlQueryStrings.push(sectorQuery);
                        if (subsectorQuery)
                            urlQueryStrings.push(subsectorQuery);
                    }
                    urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + urlQueryStrings.join("&");
                    window.history.pushState({ path: urlpath }, '', urlpath);
                });

            }
            if (IsSearchPage || IsProductPage || IsResourcePage) {
                var QueryString, japaneseFacets, selectedFilterOptions, filterOptionsList, facets, newFacets, filterOptions, groupid, searchQueryStrings, subQuery, siteUrl = window.location.href;
                var urlParameters = new URLSearchParams(window.location.search);
                QueryString = urlParameters.toString();
                if (QueryString) {
                        searchQueryStrings = QueryString.split("&");
                        if(searchQueryStrings){
                        var sectorParam = urlParameters.get('Sector') || urlParameters.get('sector');
                        var subSectorParam = urlParameters.get('SubSector') || urlParameters.get('subsector');
                        if (sectorParam) {
                            sectorQuery = "sector="+(sectorParam.replace(/&/g,'%26'));
                        }
                        if (subSectorParam) {
                            subsectorQuery = "subsector="+(subSectorParam.replace(/&/g,'%26'));
                        }
                    }

                    $.each(searchQueryStrings, function () {
                        if (this) {
                            var facets=[];
                            subQuery = this.split("=");
                            groupid = subQuery[0];
                            if(subQuery[0] && urlParameters.get(subQuery[0])){
                                if(urlParameters.get(subQuery[0]).includes(','))
                                    facets = urlParameters.get(subQuery[0]).split(",");
                                 else
                                     facets.push(urlParameters.get(subQuery[0]));
                            }
                            newFacets = [];japaneseFacets=[];
                            $.each(facets, function () {
                                newFacets.push(this.replace(/-/g, " ").replace(/%26/g, "&").toLowerCase());
                            });
                            $.each(facets, function () {
                                japaneseFacets.push(this.replace(/%26/g, "&").toLowerCase());
                            });
                            
                            filterOptionsList =  $("[id='"+groupid+"' i]").find("input[type='checkbox']");
                            filterOptions = $("[id='"+groupid+"' i]").find("input[type='checkbox']").not(":disabled");
                            if(newFacets.length >0){
                                filterOptionsList.filter(function () {
                                    if (newFacets.includes($(this).next().text().toLowerCase())) {
                                        $(this).prop("checked", true);
                                    }
                                });
                            }
                            if(japaneseFacets.length > 0){
                                filterOptionsList.filter(function () {
                                    if (japaneseFacets.includes($(this).next().text().toLowerCase())) {
                                        $(this).prop("checked", true);
                                    }
                                });

                            }
                            selectedFilterOptions = $("[id='"+groupid+"' i]").find("input:checked").not(":disabled");
                            if (filterOptions.length == selectedFilterOptions.length) {
                                $("[id='"+groupid+"1' i]").prop("checked", true);
                            }
                        }
                    });
                }
            }
            if (CheckedRefineCheckBox.length > 0) {
                //DoRefine();
            }
            if (SelectAll && RefineCheckBox) {
                var ViewPort = INFORMA.global.device.viewportN;

                if (ViewPort === 1 || ViewPort === 2) {
                    var AllRefineText = $(".refine-container").find("p.heading"),
                        ClearAll = $(".refine-container").find("a.clear-all"),
                        ClearHtml = $('<div class="clear-mobile"><a href="#" class="clear-all">' + ClearAll.html() + '</a></div>');

                    $("body").find(".refine-container").after(ClearHtml);

                    // By default on mobile and tabet refine need to close
                    AllRefineText.addClass("heading-collapsed");
                    $("#refine-list").hide();

                    if (AllRefineText.hasClass("heading-collapsed") !== true) {
                        ClearHtml.show();
                    };

                    AllRefineText.off().on("click", function () {
                        var RefineContent = $(this).parent().find("#refine-list");
                        if ($(this).hasClass("heading-collapsed") !== true) {
                            RefineContent.slideUp("slow");
                            $(this).addClass("heading-collapsed");
                            ClearHtml.hide();
                        } else {
                            RefineContent.slideDown("slow");
                            $(this).removeClass("heading-collapsed");
                            ClearHtml.show();
                        }
                    });
                    $(".refine-container").addClass("showRefine");
                }
                ClearAllLink = $(".product-finder-results a.clear-all");
                SelectAllCheckBox();
                BindRefineEvents();
                var ClearMobileLink = $("body").find(".clear-mobile a");
                if (ClearMobileLink) {
                    ClearAllLinkBinding(ClearMobileLink);
                }
            }

            $(document).on('change', '.custom-multiselect input', function () {
                var SubSectorNames = [], SectorNames = [];
                $("#Sector2 :selected").map(function (i, el) {
                    SectorNames.push($(el).text());
                });
                $("#SubSector2 :selected").map(function (i, el) {
                    SubSectorNames.push($(el).text());
                });
                $("#SectorNames").val(SectorNames.toString());
                $("#SubSectorNames").val(SubSectorNames.toString());
            });
        };
    return {
        init: init,
        GetRefineData: GetSelectedFilter,
        BindRefineEvents: BindRefineEvents

    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResultFilter.init());

/*
 * Product Results.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv Aggarwal
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.SearchResults = (function(window, $, namespace) {
    'use strict';
    //Default variables and cached html elements
    var Templates = INFORMA.Templates,
        Config = INFORMA.Configs,
        Urls = INFORMA.Configs.urls.webservices,
        SearchType = '',
        SearchContent = $(".search-container"),
        ProductFinderSection = $('#product-finder-section'),
        ShowMoreLink = SearchContent.find(".btn-showMore"),
        SearchHidden = $("input.search-hidden"),
        SectorHidden = $("input.sector-list"),
        SubSectorHidden = $("input.sub-sector-list"),
        RefineSection = $(".refine-container"),
        SortDropDown = SearchContent.find(".chosen-select"),
        ProductSearchText = $('input[name="SearchText"]'),
        SeeAllButton = SearchContent.find(".see-all"),
        IsShowFlag = false,
        PageNo = 2,
        // methods
        init, CreateSearchResult, GetSortValue, CreateSearchTags, ParseSearchData, DoGlobalShowMore, ResetPageSize,getSubsectors,UpdateResourceResultPage,
        SetSearchState, MakeDropPreSelected, UpdateResultPage, UpdateRefineSection, ToggleView, GetPaginationData, DoPagination, GetAjaxData, EqualHeight, CreateSubItems,
        DoLinksEvents, GetDefaultValues, LoadMoreProducts, UnbindEvent, disabledEvent;

    disabledEvent = function(){
        $('.register.disabled').click(function(e){
            e.preventDefault();
        });
    },
    
    UnbindEvent = function() {
        $('.register.disabled').on('keydown', function(e) {
            if (e.keyCode === 13 || e.which===13) {
                e.preventDefault();
            }   
        })
    },

    GetDefaultValues = function() {
            var data = {};
            data.Sorting = ($('select[name="sorting"]')) ? $('select[name="sorting"]').val() : null;
            data.PageSize = ($('.product-results')) ? $('.product-results').attr('data-pagesize') : null;
            data.DefaultItemCount = ($('input[name="DefaultItemCount"]')) ? $('input[name="DefaultItemCount"]').val() : null;
            data.MaxItemCount = ($('input[name="MaxItemCount"]')) ? $('input[name="MaxItemCount"]').val() : null;
            data.DefaultProductCount = ($('input[name="DefaultProductCount"]')) ? $('input[name="DefaultProductCount"]').val() : null;
            data.SearchTexts = ($('input[name="SearchTexts"]') && $('input[name="SearchTexts"]').length > 0) ? $('input[name="SearchTexts"]').val().split(",") : null;
            data.OrderOfContentType = ($('input[name="OrderOfContentType"]')) ? $('input[name="OrderOfContentType"]').val().split(",") : null;
            data.WhoWeHelp = ($('input[name="WhoWeHelp"]')) ? $('input[name="WhoWeHelp"]').val() : null,
            //data.Brand = ($('input[name="Brand"]')) ? $('input[name="Brand"]').val() : null,
            data.SearchText = ($('input[name="SearchText"]')) ? ($('input[name="SearchText"]')).val() : null;
            if (SearchType != "ProductSearch") {
                if($('#hdnSearchType').length > 0) {
                    var NameSearchType = $('#hdnSearchType').attr('name'),
                        Value = $('#hdnSearchType').attr('value');
                                    
                    data[NameSearchType] = Value;
                }
            }
            if (SearchType === "ProductSearch") {
            	data.SearchTextSampleContent = ($('input[name="SearchTextSampleContent"]') && $('input[name="SearchTextSampleContent"]').length > 0) ? $('input[name="SearchTextSampleContent"]').val().split(",") : null;
            	data.SearchTextProducts = ($('input[name="SearchTextProducts"]') && $('input[name="SearchTextProducts"]').length > 0) ? $('input[name="SearchTextProducts"]').val().split(",") : null;
            }
            return data;
        },
        DoLinksEvents = function() {
            var Links = $('.items-found').find('a');

            Links.on('click', function(e) {
                e.preventDefault();
                var ProdData, FilterData, Data, DefaultData,
                    GetContentType = $(this).attr('data-contenttype'),
                    FacetCheck = ($(this).attr('data-check') != undefined) ? $(this).attr('data-check') : "",
                    Name = ($(this).attr('name')) ? $(this).attr('name') : "";

                
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }
                $(".product-finder-results a.clear-all").addClass("noOpaque");
                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                if (FacetCheck != "null") {
                    Data[Name] = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', Name);
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                } else {
                    Data.ContentType = GetContentType.split(",");
                    if($('#hdnSearchType').length > 0) {
                        $('#hdnSearchType').attr('name', 'ContentType');
                        $('#hdnSearchType').attr('value', GetContentType);
                    }
                }
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        }
        GetSortValue = function(value) {

            SortDropDown.on("change", function(e) {

                var ProdData, FilterData, Data, DefaultData;
                if (SearchType === "ResourceResult") {
                    ProdData = INFORMA.ResourceFilter.GetResourceData();
                }
                if (SearchType === "SearchResult") {
                    ProdData = INFORMA.ProductFinder.GetProductData();
                }

                FilterData = INFORMA.SearchResultFilter.GetRefineData();
                DefaultData = GetDefaultValues();
                Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);
                Data.PageNo = 1;
                // debugger;
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, null);
                ResetPageSize();
            });
        },
        SetSearchState = function(sVal) {
            //if (sVal) {
                /* unused variable SearchField removed */
                var SearchSubmitBtn = $(".site-search li.button");

                //SearchField.val(sVal);
                SearchSubmitBtn.removeClass("disabled");
                ProductFinderSection.find("input[type=radio][data-show='site-search']").trigger("click");
                //SearchSubmitBtn.trigger("click");
            //}
        },
        ResetPageSize = function() {
            PageNo = 2;
        },
        MakeDropPreSelected = function(Arr, DrpDwn) {
            DrpDwn.val("");
            $.each(Arr, function(i, e) {
                DrpDwn.find("option[value='" + e + "']").prop("selected", true);
            });
            DrpDwn.multiselect('rebuild');
        },
        getSubsectors = function(searchbar, groupid, subsector){
            var dropDownId, QueryString,searchQueryStrings, urlParameters = new URLSearchParams(window.location.search);
            QueryString = urlParameters.toString();
            if (QueryString) {
                searchQueryStrings = QueryString.split("&");
                if (searchQueryStrings) {
                    var sectorParam = urlParameters.get(groupid);
                    if (sectorParam) {
                        var hiddenSecotrList = [], sectorFilterOptionsList=[], sectorFscets = sectorParam.split(","), selctedSectorFacets = [];
                        $.each(sectorFscets, function () {
                            selctedSectorFacets.push(this.replace(/-/g, " ").replace(/%26/g, "&").toLowerCase());
                        });

                        if (subsector.length > 0){
                            $.each(subsector, function () {
                                sectorFilterOptionsList.push(this);
                            });
                            $.each(sectorFilterOptionsList,function () {
                                var item = this;
                                if (selctedSectorFacets.includes(item.SubSectorName.toLowerCase())) {
                                    hiddenSecotrList.push(this.SubSectorID);
                                }
                           });
        
                        }
                        else{
                            if(searchbar == 'sector-search')
                            sectorFilterOptionsList = $("." + searchbar + " [id='" + groupid + "2' i]").next().find(".multiselect-container").find("input[type='checkbox']");
                            else
                            sectorFilterOptionsList = $("." + searchbar + " [id='" + groupid + "' i]").next().find(".multiselect-container").find("input[type='checkbox']");
                            sectorFilterOptionsList.filter(function () {
                                if (selctedSectorFacets.includes($(this).parent().text().trim().toLowerCase())) {
                                    hiddenSecotrList.push($(this).val());
                                }
                            });
    
                        }
                        if (hiddenSecotrList.length > 0) {
                            return hiddenSecotrList.toString();
                        }                    }
                }else{
                    return null;
                }
            }

        },
        UpdateResourceResultPage = function(SectorSelect) {
            var URLSubSectorValue, URLSectorValue = getSubsectors('resource-sector-search','sector',[]);

            if (URLSectorValue) {

                var SectorArray = URLSectorValue.split(","),
                    SubSectors,
                    SectorIDs = 'SectorIDs=' + URLSectorValue, resourceFinderSection = $("#resource-finder-section"),
                    /* unused variable SubmitBtn removed */
                    SubSectorSelect = resourceFinderSection.find("select.SubSector");

                resourceFinderSection.find("input[type=radio][data-show='sector-search']").trigger("click");
                if (SectorSelect.length && SectorArray) {
                    MakeDropPreSelected(SectorArray, SectorSelect);
                    INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                        method: "Get",
                        data: SectorIDs,
                        success_callback: function (data) {
                            INFORMA.ResourceFilter.UpdateSubSectorDropdown(data);
                            URLSubSectorValue = getSubsectors('resource-sector-search', 'subsector', data.SubSectors);
                            if (URLSubSectorValue) {
                                SubSectors = URLSubSectorValue.split(",");
                            }
                            if (SubSectors) {
                                MakeDropPreSelected(SubSectors, SubSectorSelect);
                            }
                        },
                        error_callback: function () {

                        }
                    });
                }
            }
            },
        UpdateResultPage = function(SectorSelect, SecValue, SubSecValue) {
            var URLSubSectorValue, URLSectorValue = getSubsectors('sector-search','sector',[]);
            if(URLSectorValue){
                SecValue = URLSectorValue;
            }
            if (SecValue) {
                var SectorArray = SecValue.split(","),
                    SubSectors = (SubSecValue) ? SubSecValue.split(",") : "",
                    SectorIDs = 'SectorIDs=' + SecValue,
                    /* unused variable SubmitBtn removed */
                    SubSectorSelect = ProductFinderSection.find("select.SubSector");

                ProductFinderSection.find("input[type=radio][data-show='sector-search']").trigger("click");
                if (SectorSelect.length && SectorArray) {
                    MakeDropPreSelected(SectorArray, SectorSelect);
                    INFORMA.DataLoader.GetServiceData(Urls.GetSubSectorList, {
                        method: "Get",
                        data: SectorIDs,
                        success_callback: function (data) {
                            INFORMA.ProductFinder.UpdateSubSectorDropdown(data);
                            URLSubSectorValue = getSubsectors('sector-search', 'subsector',data.SubSectors);
                            if (URLSubSectorValue) {
                                SubSectors = URLSubSectorValue.split(",");
                            }
                            if (SubSectors) {
                                MakeDropPreSelected(SubSectors, SubSectorSelect);
                            }

                            //ProductFinderSection.slideDown();
                            $('.search:visible').trigger('click');
                            //SubmitBtn.trigger("click");
                        },
                        error_callback: function () {

                        }
                    });
                }
            }
            },
        GetAjaxData = function(url, method, data, SCallback, Errcallback, Item) {
            INFORMA.Spinner.Show($("body"));
            INFORMA.DataLoader.GetServiceData(url, {
                method: method,
                data: JSON.stringify(data),
                success_callback: function(data) {
                    if (typeof SCallback === "function") {
                        SCallback.call(this, data, Item);
                    }
                },
                error_callback: function() {
                    if (typeof Errcallback === "function") {
                        Errcallback.call(this, data);
                    }
                }
            });
        },
        EqualHeight = function() {
            var Items = SearchContent.find('.wrap-content'),
                Wrapper = SearchContent.find('.list-items');

            if ($(".search-container").hasClass("tileView")) {

                $('.search-container .list-items[data-type="SampleContent"]').each(function() {
                    var IsVideoComponent = $(this).find('.video-container');

                    if(IsVideoComponent.length > 0) {
                        $(this).find('.content').css('padding-right', '0');
                    }
                });
                var MaxHeight = 0,
                    maxWrapperHeight = 0;

                Items.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        MaxHeight = ItemHeight;
                    }
                })
                Items.height(MaxHeight);
                Wrapper.each(function() {
                    var ItemHeight = $(this).outerHeight();
                    if (ItemHeight > MaxHeight) {
                        maxWrapperHeight = ItemHeight;
                    }
                })
                Wrapper.height(maxWrapperHeight);

            } else {
                Wrapper.css("height", "auto");
                Items.css("height", "auto");

                $('.search-container .list-items[data-type="SampleContent"]').each(function() {
                    var IsVideoComponent = $(this).find('.video-container');

                    if(IsVideoComponent.length > 0) {
                        $(this).find('.content').css('padding-right', IsVideoComponent.width());
                    }
                });
            }
        },
        GetPaginationData = function(List, Section) {
            var Data = {},
                PageSizeValue = (Section) ? Section.data("pagesize") : null;
            if(PageSizeValue){
                Data.PageSize = PageSizeValue;
            }
            $.each(List, function() {
                var KeyName = $(this).data("type"),
                    KeyValue = $(this).data("fetch");
                if (Data.hasOwnProperty(KeyName)) {
                    var uniqueArr = [],
                        existingVal = [];
                    existingVal = existingVal.concat(Data[KeyName]);
                    uniqueArr.push(KeyValue);
                    Data[KeyName] = uniqueArr.concat(existingVal);
                } else {
                    Data[KeyName] = [].concat(KeyValue);
                }
            });
            return Data;
        },
        DoPagination = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var currentSection = $(this).parents(".product-results").eq(0),
                    TileList = currentSection.find(".list-items"),
                    PData = GetPaginationData(TileList, currentSection),
                    ProdData = INFORMA.ProductFinder.GetProductData(),
                    GetDefaultData = GetDefaultValues(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData();

                    if((SearchType === "ProductSearch") && ('Product' in PData)) {
                        PData['CurrentProduct'] = PData.Product;
                    } 
                    var Data = INFORMA.ProductFinder.MergeData(ProdData, PData, FilterData, GetDefaultData);

                if (!$(currentSection).hasClass('showLess')) {
                    $(currentSection).addClass('showLess');
                    GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));
                } else {
                    $(currentSection).removeClass('showLess');
                    $(currentSection).find('.col-xs-12:nth-child(n+4)').remove();
                    $(window).scrollTop($(currentSection).offset().top - 60);
                }


            });
        },
        LoadMoreProducts = function(){
            var Data, TileList = jQuery('.search-container .product-results .list-items'),
                PData = GetPaginationData(TileList),
                FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                DefaultData = GetDefaultValues(),
                ProdData = INFORMA.ProductFinder.GetProductData();
                Data = INFORMA.ProductFinder.MergeData(FilterData, DefaultData,ProdData);
                Data.PageNo = 1;
                Data.ExcludedProduct = PData;
                GetAjaxData(Urls["GetMoreProducts"], "Post", Data, ParseSearchData, null, $(this));
        },
        DoGlobalShowMore = function() {
            var ShowMoreLink = SearchContent.find(".btn-showMore");

            ShowMoreLink.off("click").on("click", function(e) {
                e.preventDefault();
                var ProdData = INFORMA.ResourceFilter.GetResourceData(),
                    FilterData = INFORMA.SearchResultFilter.GetRefineData(),
                    DefaultData = GetDefaultValues(),
                    Data = INFORMA.ProductFinder.MergeData(ProdData, FilterData, DefaultData);

                Data.PageNo = PageNo;

                if (SearchType === "SearchResult") {
                    Data.SearchText = $('input[name="SearchText"]').val();
                }
                GetAjaxData(Urls[SearchType], "Post", Data, ParseSearchData, null, $(this));

            });

            DoLinksEvents();
        },
        ToggleView = function() {
            var toggleButtons = $(".search-container .view-mode li");
            toggleButtons.on("click", function(e) {
                e.preventDefault();
                var currentView = $(this).data("view"),
                    parentEle = $(this).parents(".search-container").eq(0);
                if (currentView) {
                    toggleButtons.removeClass("selected");
                    $(this).addClass("selected");
                    parentEle.removeClass("tileView listView");
                    parentEle.addClass(currentView);
                }

                EqualHeight();

            });
        },
        UpdateRefineSection = function(Data, Type) {
            for (var key in Data) {
                if (Data.hasOwnProperty(key) && Data[key]) {
                    var RefineObj = Data[key],
                        CurrentSection = key;
                    if (RefineObj && CurrentSection) {
                        var Facet = RefineSection.find("#"+CurrentSection),
                            CheckBoxes = Facet.find("input[type=checkbox]"),
                            Header = Facet.prev(".panel-heading"),
                           	SelectAllChkBox = Header.find("input[type=checkbox]"),
                            Links = Header.find("a strong");

                        if (CheckBoxes && Facet && RefineObj.length) {
                            $.each(CheckBoxes, function() {
                                 var CurrentChkBoxVal = $(this).attr("value");
                                     if (RefineObj.contains(CurrentChkBoxVal)) {
                                        $(this).removeAttr("disabled");
                                     }else{
                                        $(this).attr("disabled","disabled");
                                        $(this).prop("checked",false);
                                     }
                            });
                            SelectAllChkBox.removeAttr("disabled");
                            Links.removeClass("disabled");
                        }
                        if(CheckBoxes && Facet && RefineObj.length<1){
                            $.each(CheckBoxes, function() {         
                                 $(this).attr("disabled","disabled");
                                 $(this).prop("checked",false);
                            });
                            SelectAllChkBox.attr("disabled","disabled");
                            Links.addClass("disabled");
                        }
                    }
                }
            }
            if( SearchType === "ResourceResult"){
                var getSelectedCheckBoxID = $("input.UnFilterCheckbox").val();
                if(getSelectedCheckBoxID!==undefined){
                    var getCheckBox = jQuery("#"+getSelectedCheckBoxID);
                    if(typeof getCheckBox != undefined){
                        getCheckBox.removeAttr("disabled");
                        getCheckBox.prop("checked","checked");
                    }
                }
            }
        },
        CreateSearchResult = function(Data) {
            var FinalHTml = '',
                Title, ShowMoreText;
            for (var i = 0; i < Data.length; i++) {
                var Results = Data[i],
                    TemplateName, ListTemplate,
                    HeroTemplate, HeroHandlebar, Html = '',
                    ContentType,
                    Lists = Results.Results;
                HeroTemplate = (Templates.SearchTemplate) ? Templates.SearchTemplate : "";
                HeroHandlebar = Handlebars.compile(HeroTemplate);

                if (Lists) {
                    for (var j = 0; j < Lists.length; j++) {
                        if (Lists[j].Category) {
                            ContentType = Lists[j].Category;
                            TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                            ListTemplate = Handlebars.compile(TemplateName);
                            Html += ListTemplate({ results: Lists[j] });
                        }
                    }

                    Results.Content = Html;
                    if(!IsShowFlag){
                        SearchContent.find(".product-results").remove();
                    }
                    FinalHTml += HeroHandlebar({ results: Results });
                }
            }
            IsShowFlag = false;
            SearchContent.find('.container').append(FinalHTml);
            setTimeout(function() {
                EqualHeight();
            }, 800);
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
            }
        },
        CreateSubItems = function(Data, Button, RemainingCount) {
            var Title;
            var Results = Data[0],
                TemplateName, ListTemplate, Html = '',
                ContentType,
                Lists = Results.Results;
            /* unused ShowMoreText variable removed */
            if (Lists) {
                for (var j = 0; j < Lists.length; j++) {
                    if (Lists[j].Category) {
                        ContentType = Lists[j].Category;
                        TemplateName = (Templates[ContentType]) ? Templates[ContentType] : "";
                        ListTemplate = Handlebars.compile(TemplateName);
                        Html += ListTemplate({ results: Lists[j] });
                    }
                }
                // debugger;
                $(Button).parents('.product-results').find(".list").append(Html);
                setTimeout(function() {
                    EqualHeight();
                }, 800);

                if (SearchType != "ProductSearch") {
                    if (RemainingCount < 1) {
                        $(Button).addClass("hidden");
                    }
                }

            }
            if (SearchType === "ProductSearch") {
                DoPagination();
            } else {
                DoGlobalShowMore();
                PageNo++;
            }
        },
        CreateSearchTags = function(SiteFacets) {
            if (!$.isEmptyObject(SiteFacets)) {
                var Html = "";
                for (var i = 0; i < SiteFacets.length; i++) {
                    Html += "<li><a href='#' name='" + SiteFacets[i].Name + "' data-check='" + SiteFacets[i].Check + "'' data-contenttype='" + SiteFacets[i].ItemId + "'><strong>" + SiteFacets[i].Count + "</strong>" + SiteFacets[i].Value + "</li>";
                }
                $('.items-found').html(Html);
            }
            DoLinksEvents();
        },
        ParseSearchData = function(data, Button) {
            if (Object.keys(data).length) {
                var ProductResults = (data.ProductListing !== undefined) ? data.ProductListing : false,
                    Refine = (data.UpdatedFacets !== undefined) ? data.UpdatedFacets : false,
                    AppendItemsFlag = (data.AppendItemsFlag !== undefined) ? data.AppendItemsFlag : false,
                    FacetDescription = (data.FacetDescription != null && data.FacetDescription.length > 0) ? data.FacetDescription : false,
                    ShowMoreProductFlag = (data.ShowAllFlag  !== undefined) ? data.ShowAllFlag  : false,
                    RemainingCount = (data.RemainingCount !== undefined) ? data.RemainingCount : false;

                if (ProductResults && Object.keys(ProductResults).length && AppendItemsFlag != true) {

                    CreateSearchResult(ProductResults);
                    SearchContent.find('.results').find('strong').html(data.ProductFound);
                    if (data.ProductFound == 0) {
                        $('.items-found').addClass('hidden');
                        $('.product-results').hide();
                    } else {
                        $('.items-found').removeClass('hidden');
                        $('.product-results').show();
                    }
                    SearchContent.find('.product-results').attr('data-pagesize', data.DefaultItemCount);
                    if (FacetDescription) {
                        CreateSearchTags(FacetDescription);
                    }
                    if (Refine && Object.keys(Refine).length) {
                        UpdateRefineSection(Refine);
                    }
                    if(ShowMoreProductFlag)
                    {
                        $(".see-all").removeClass("hidden");
                        $(".see-all").off("click").on("click",function(e){
                            e.preventDefault();
                            IsShowFlag = true;
                            LoadMoreProducts();
                        });
                    }else{
                        $(".see-all").addClass("hidden");
                    }
                }
                if (AppendItemsFlag == true) {
                    CreateSubItems(ProductResults, Button, RemainingCount);
                }
                
                addthis.toolbox('.product-results');
            } else {
                $('.product-results').html(data);
            }
        },
        init = function() {
            var IsProductPage = (ProductFinderSection.data("product") === true) ? true : false,
                IsResourcePage = ($(".resource-finder").data("resource") === true) ? true : false,
                IsSearchPage = (ProductFinderSection.data("search") === true) ? true : false;

            if (IsProductPage) {
                SearchType = "ProductSearch";
                if ($("input[name=searchResultsPageUrl]") && $("input.SeeAllResultInput")) {
                    var Value = $("input[name=searchResultsPageUrl]").val() + '?searchText=*';
                    $("input.SeeAllResultInput").val(Value);
                }
                if(SeeAllButton){
                    SeeAllButton.off("click").on("click",function(e){
                        e.preventDefault();
                        IsShowFlag = true;
                        LoadMoreProducts();
                    });
                }
            }
            if (IsSearchPage) {
                SearchType = "SearchResult";
            }
            if (IsResourcePage && (!IsProductPage && !IsSearchPage)) {
                SearchType = "ResourceResult";
                var SectorSelect = $("#resource-finder-section").find("select.Sector");
                UpdateResourceResultPage(SectorSelect);
            }

            if (IsProductPage) {

                var SVal = SectorHidden.val(),
                    SubSecVal = (SubSectorHidden.length) ? SubSectorHidden.val() : false;
                if (IsProductPage) {
                    var SectorSelect = ProductFinderSection.find("select.Sector");
                    UpdateResultPage(SectorSelect, SVal, SubSecVal);
                }
            }
            if ((IsSearchPage && SearchHidden.length > 0) || (ProductSearchText)) {
                var SearchVal = SearchHidden.val(),
                    SearchText = (ProductSearchText.length > 0) ? ProductSearchText.val() : null;
                if (IsSearchPage) {
                    SetSearchState(SearchVal);
                }
                if (SearchText) {
                    $('.search:visible').trigger('click');
                }
            }
            if (ShowMoreLink && IsProductPage) {
                DoPagination();
            }
            if (ShowMoreLink && (IsResourcePage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            if (ShowMoreLink && (IsSearchPage)) {
                DoGlobalShowMore();
                DoLinksEvents();
            }
            ToggleView();
            $(window).on('load', function() {
                EqualHeight();
            });
            GetSortValue();
            UnbindEvent();
            disabledEvent();
        };
    return {
        init: init,
        RenderSearchResults: ParseSearchData,
        ResetPaging: ResetPageSize,
        DefaultParameters: GetDefaultValues
    };

}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.SearchResults.init());

/*
 * feature-list.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Jagadeesh Jayachandran, jjayachandran2@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.sectorList = (function(window, $, namespace) {
    'use strict';
    //variables
    var _sectorList = $('#sector-list-section'),
    // methods
        init,
        _bindShowMore,
        _bindShowLess,
        _adjustHeigt;

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sector-list .container > .row + .row >.text-center:nth-child(n+3)').show();
              $('.sector-list .view-all-sectors-btn-container').hide();
        });
    }
    _bindShowLess = function () {
      var _showLess = $('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 35
            },700);
      });
    }
    init = function() {
        if (_sectorList.length > 0) {
            _bindShowMore(_sectorList);
            _bindShowLess();
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorList.init());

/*
 * sectorpage-strengths.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-25
 * @author:     Tejaswi , tchennupati@sapient.com
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.sectorPageStrengths = (function(window, $, namespace) {
    'use strict';
    //variables

    var _sectorPageStrengths = $('.sectorpage-strengths'),
        _elements = 0,
    // methods
        init,
        _bindShowMore,_bindShowLess,
        _adjustHeigt, _checkElemnt, equalHeight;


    _checkElemnt = function () {
        var _vp = INFORMA.global.device.viewportN;

        if(_vp == 0) {
            var count = _sectorPageStrengths.data('desktop');
            _sectorPageStrengths.find('.marg1:nth-child(n+'+ (count + 1)+')').hide();
            if(_sectorPageStrengths.find('.marg1').length >= (count+1)) {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
            } else {
                _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
            }
            _elements = count;
        } else if(_vp == 1) {
          _sectorPageStrengths.find('.marg1:nth-child(n+5)').hide();
          if(_sectorPageStrengths.find('.marg1').length > 4) {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').show();
          } else {
              _sectorPageStrengths.find('.view-all-sectors-btn-container').hide();
          }
          _elements = 4;
        } else {
          _sectorPageStrengths.find('.marg1:nth-child(n+4)').hide();
          _elements = 3;
        }
    }

    _bindShowMore = function(container){
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.view-all-sectors-btn');
        _showMore.on('click',function(){
              $('.sectorpage-strengths .container > .row + .row >.marg1:nth-child(n+'+ (_elements + 1) +')').slideToggle();
              $(this).parents('.sectorpage-strengths').toggleClass('showLess');
        });
    }
// equal height function removed for maincontainer and text-description
equalHeight = function () {
    var EachView = jQuery('.sectorpage-strengths');
    EachView.each(function () {
        var Description = jQuery(this).find('.yellow-container'),
            _descHeight = 0;
        Description.each(function () {
            var Height = jQuery(this).outerHeight();
            if (Height > _descHeight) {
                _descHeight = Height;
            }
        })
        Description.css('height', _descHeight );

    })
}

    _bindShowLess = function () {
      var _showLess = _sectorPageStrengths.find('.view-all-sectors-btn.less');
      _showLess.on('click',function(){
            $('html, body').animate({
                scrollTop: _sectorPageStrengths.offset().top - 35
            },700);
      });
    }
    init = function() {
        if (_sectorPageStrengths.length > 0) {
            _checkElemnt();
            _bindShowMore(_sectorPageStrengths);
            _bindShowLess();
            $(window).on('load', function() {
                equalHeight();
            });        }

            $("#loadPDFComponentModal").on('hidden.bs.modal', function(){
                $("#hiddenIframe").html("");
            });
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.sectorPageStrengths.init());

/*
* support-page-tabs.js
*
*
* @project:    Informa
* @date:       2016-june-13
* @author:     Tejaswi tchennupati@sapient.com
* @licensor:   SAPIENNITRO
* @namespaces: INFORMA
*
*/

var INFORMA = window.INFORMA || {};
INFORMA.navtabs = (function(window, $, namespace) {
    'use strict';
    //variables
    var Tabs = $('.support-page-tabs ul.nav li'),
        tabcontent = $('.support-page-tabs .tab-content .tab-pane'),
        init;
    init = function() {
        jQuery(Tabs[0]).addClass('active');
        jQuery(tabcontent[0]).addClass('active');
        Tabs.on('click', function() {
        Tabs.removeClass('active');
            jQuery(this).addClass('active');
            var tabpane = jQuery(this).find('a').attr('href');
            tabcontent.removeClass('active');
            jQuery(tabpane).addClass('active');
        })
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.navtabs.init());

/*
 * training-material.js
 *
 *
 * @project:    Informa
 * @date:       2016-May-18
 * @author:     Tejaswi
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.trainingMaterial = (function(window, $, namespace) {
    'use strict';
    //variables
    var _traininglist = $('.slick-carousel'),
    // methods
        init,
        _dots,
        _createSlider;

    _createSlider = function(container){
        // if data-items, data-infinite is defined, used it
        var _slideCount = container.data('itemsperframe'),
            _autoplay = Boolean(container.data('autorotate')),
            _speed = container.data('transitionspeed'), // speed of transition
            _duration = container.data('slideduration'), // how long the slider will be displayed
            _infinite = true,
            _dots = Boolean(container.data('pagination'));
            

        container.slick({
            infinite: _infinite,
            autoplay: _autoplay,
            autoplaySpeed: _duration,
            slidesToShow: _slideCount,
            slidesToScroll: _slideCount,
            speed: _speed,
            dots: _dots,
            adaptiveHeight: true,
            arrows: true,
            swipe: INFORMA.global.device.isDesktop ? false : true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },{
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
            ]
        });
    }

    init = function() {
        if (_traininglist.length > 0) {
            _createSlider(_traininglist);
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.trainingMaterial.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoBackground = (function(window, $, namespace) {
    'use strict';

    var _iFrameElement = $('.hero-banner .videoBG'),
        init,
        _urlType,
        _urlSrc,
        _urlSrcOptions,
        _youTubeId,
        _wistiaId,
        _vimeoId,
        _wistiaUrl,
        _youTubeSound,
        _wistiaSound,
        _vimeoSound,
        _addOptions,
        _heroBannerList = $('.hero-banner-carousel .slider-component');
        /* unused _setHeroVideoHeight function removed */

    _addOptions = function() {
        
        //$('.videoBG_wrapper').parent().css( "height", "auto" );
        if(_heroBannerList.length == 0){
        _iFrameElement.each(function(i, e) {
            _urlType = $(this).attr('data-videotype');

            if (_urlType == "youtube") {

                _youTubeId = $(this).attr('data-videoid');
                _youTubeSound = $(this).attr('data-videosound');

                var playerYTElement = document.createElement('div');
                playerYTElement.id = "youtubePlayer";
                $(this).append(playerYTElement);

                var scriptTag = document.createElement('script');
                scriptTag.src = "https://www.youtube.com/iframe_api";

                var ytTag = document.getElementById('youtubePlayer');
                ytTag.parentNode.insertBefore(scriptTag, ytTag.nextSibling);

            } else if (_urlType == "vimeo") {

                _vimeoId = $(this).attr('data-videoid');
                _vimeoSound = $(this).attr('data-videosound');

                var playerVMElement = document.createElement('div');
                playerVMElement.id = "vimeoPlayer";
                $(this).append(playerVMElement);

                var options = {
                  id: _vimeoId,
                  autoplay: true,
                  loop: true
                };

                var vimeoPlayer = new Vimeo.Player('vimeoPlayer', options);
                vimeoPlayer.setVolume(_vimeoSound);
                if (INFORMA.global.device.viewportN == 2 ) {
                  $('.videoBG_wrapper').css('height', '80%');
                  $('.block-centered').css('transform','translateY(-40%)');
                }
                if (INFORMA.global.device.viewportN == 1) {
                  $('section.hero-banner').addClass('vimeo-video-banner');
                  $('.videoBG_wrapper').css('height', '80%');
                  $('.block-centered').css('transform','translateY(-25%)');
                }
            } else if (_urlType == "wistia") {

                _wistiaUrl = $(this).attr('data-videourl')
                _wistiaId = $(this).attr('data-videoid');
                _wistiaSound = $(this).attr('data-videosound');

                var iframeWSElement = document.createElement('iframe');
                iframeWSElement.id = "wistiaEmbed",
                iframeWSElement.class = "wistia_embed",
                iframeWSElement.name = "wistia_embed";
                iframeWSElement.src = _wistiaUrl + '/embed/iframe/' + _wistiaId + "?autoplay=1&playbar=false&smallPlayButton=false&fullscreenButton=false&volumeControl=false&endVideoBehavior=loop&volume=" + _wistiaSound;
                $(this).append(iframeWSElement);

                  if (INFORMA.global.device.viewportN == 1 || INFORMA.global.device.viewportN == 2 ) {
                    var playButton = $(".videoBG_wrapper");
                    if(playButton.length > 0 ){
                      playButton.on("click", function() {
                            var wistiaEmbed = document.getElementById("wistiaEmbed").wistiaApi;
                                wistiaEmbed.play();
                      });
                    }
                  }
            }

        });
       } 

    }

    if(_heroBannerList.length == 0){
   window.onYouTubeIframeAPIReady = function() {
      var ytPlayer = new YT.Player('youtubePlayer', {
            videoId: _youTubeId,
            playerVars: {
                'modestbranding': 0,
                'autoplay': 1,
                'controls': 1,
                'loop': 1,
                'wmode':'opaque',
                'playlist': _youTubeId,
                'showinfo': 0
            },

            events: {
                'onReady': onYTPlayerReady
            }
        });
    };
}
    function onYTPlayerReady(event) {
        if (INFORMA.global.device.viewport == "desktop" || INFORMA.global.device.viewportN == 0) {
            event.target.playVideo();
            event.target.setVolume(_youTubeSound);
        }
    }

    init = function() {
        _addOptions();
      //  _setHeroVideoHeight();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoBackground.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoFull = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoFullWrapper = $('.video-full-container .video-img'),
        _videoPlayBtnWrapper = $('.video-full-container .play-icon'),
        video,
        // methods
        init,
        _playFullVideoWrapper,
        _playFullVideoBtnWrapper;

    _playFullVideoBtnWrapper = function() {
        _videoPlayBtnWrapper.click(function() {
            var videoImg = $(this).parent().find('img');
            if (videoImg.attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg .attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' +  videoImg.attr('data-videourl') + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
            }
            videoImg.replaceWith(video);
            $(this).remove();
        });
    }

    _playFullVideoWrapper = function() {
        _videoFullWrapper.click(function() {

            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoplay=1" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '?autoPlay=true" frameborder="0" allowfullscreen></iframe>';
            }
            $(this).replaceWith(video);
            function onYouTubePlayerAPIReady() {
               var player = new YT.Player('video', {
                  autoplay: 1
                });
            }
            $('.play-icon').remove();
        });


    }

    init = function() {
        _playFullVideoWrapper();
        _playFullVideoBtnWrapper();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoFull.init());

var INFORMA = window.INFORMA || {};
INFORMA.videoMini = (function(window, $, namespace) {
    'use strict';
    //variables
    var _videoMiniImgWrapper = $('.video-mini-container .video-img'),
        _videoMiniPlayBtnWrapper = $('.video-mini-container .play-icon'),
        _videoMiniPlayerModal = $('#videoMiniModal'),
        _videoMiniModalClose = $('.video-mini-close'),
        video,
        // methods
        init,
        _playVideoMiniImgWrapper,
        _playVideoMiniBtnWrapper,
        _videoMiniShowPlayIcon;

    _playVideoMiniBtnWrapper = function() {
        _videoMiniPlayBtnWrapper.click(function() {
            var videoImg = $(this).parent().find('img');
            if (videoImg.attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if (videoImg.attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" src="' + videoImg.attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            _videoMiniPlayerModal.find('.modal-body .video-mini-player').html(video)
            _videoMiniPlayerModal.modal('show');
            $(this).parents('.video-mini-container').find('.play-icon').hide();
          //  imgContainer.find(_videoMiniPlayBtnWrapper).hide();

        });
    }

    _playVideoMiniImgWrapper = function() {
        _videoMiniImgWrapper.click(function() {
            if ($(this).attr('data-videotype') == "youtube") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "vimeo") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            } else if ($(this).attr('data-videotype') == "wistia") {
                video = '<iframe width="100%" height="' + $(this).attr('height') + '" src="' + $(this).attr('data-videourl') + '" frameborder="0" allowfullscreen></iframe>';
            }
            _videoMiniPlayerModal.find('.modal-body .video-mini-player').html(video)
            _videoMiniPlayerModal.modal('show');
            _videoMiniPlayBtnWrapper.hide();
        });
    }
    _videoMiniShowPlayIcon = function() {
        _videoMiniModalClose.click(function() {
            _videoMiniPlayBtnWrapper.show();
            $(this).parents('.video-mini-modal').find('iframe').remove();
        });
    }

    init = function() {
        _playVideoMiniImgWrapper();
        _playVideoMiniBtnWrapper();
        _videoMiniShowPlayIcon();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.videoMini.init());
