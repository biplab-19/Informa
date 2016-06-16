var INFORMA = window.INFORMA || {};
INFORMA.eventPage = (function(window, $, namespace) {
    'use strict';
    var init,
       _equalheight,
       _bindShowMoreEvents,
       GetAjaxData,
       _eventListbind,
       RenderOnLoad,
       RenderEvent,
       RenderClickEvents,
       EventSearch = $('.events-search'),
       _Start = moment(new Date()).format('MMM YYYY'),
       _end = moment(_Start).add('months', 11).format('MMM YYYY'),
       Urls = INFORMA.Configs.urls.webservices,
       Templates = INFORMA.Templates,
       _eventList = $('section[data-view="list-view"]');
       _equalheight = function(){
           var highestBox = 0,
            EachItem = _eventList.find(".events-section .events-wrap");
          EachItem.each(function(){
                  if($(this).height() > highestBox){
                  highestBox = $(this).height();
                }
          });
          EachItem.height(highestBox);
        }

        GetAjaxData = function (url, method, data, SCallback, Errcallback, SearchType) {
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

        RenderEvent = function (data) {
          var results = data.SearchDictionary,
              html = "";

          for (var key in results) {
              if (results.hasOwnProperty(key)) {
                  var Data = results[key],
                      HeaderText = key,
                      TemplateName = (Templates.EventpageListviewTemplate !== "undefined") ? Templates.EventpageListviewTemplate : "",
                      ListTemplate = Handlebars.compile(TemplateName);
                      console.log(Data);
                  Data.Month = HeaderText;
                  html += ListTemplate({ results: Data });
              }
          }
          _eventList.find('.container').html(html);

          var ViewDate = moment(results.Month).format('MMM YYYY');

          if(ViewDate == _Start) {
            _eventList.find('.previous').addClass('arrow-desabled');
          } else {
             _eventList.find('.previous').removeClass('arrow-desabled');
          }

          if(ViewDate == _end) {
            _eventList.find('.next').addClass('arrow-desabled');
          } else {
             _eventList.find('.next').removeClass('arrow-desabled');
          }

          RenderClickEvents();
        }

        RenderClickEvents = function () {
          var NextBtn = _eventList.find('.next'),
              PreviousBtn =  _eventList.find('.previous');


              NextBtn.on('click', function () {
                var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    nextMonth = moment(ViewDate).add('months', 1);
                    GetAjaxData(Urls.EventsSearch, "Get", nextMonth, RenderEvent, null, null);
              })

              PreviousBtn.on('click', function () {
                var DateText = jQuery(this).parents('section[data-view="list-view"]').find('.header h2').text(),
                    ViewDate = new Date(DateText),
                    nextMonth = moment(ViewDate).add('months', -1);
                    GetAjaxData(Urls.EventsSearch, "Get", nextMonth, RenderEvent, null, null);
              })

        }

        RenderOnLoad = function () {
          jQuery('body').addClass('list-view');
            var momentDate = moment(_Start).format('MMM YYYY');
            var passdata = {
              MonthYear: momentDate
            }

            GetAjaxData(Urls.EventsSearch, "Get", JSON.stringify(passdata), RenderEvent, null, null);
        }

        _bindShowMoreEvents = function(container){
            // if data-items, data-infinite is defined, used it
            var _showMoreEvents = _eventList.find('.btn-more-events');
           var _limit = container.data(INFORMA.global.device.viewport) + 1;
            _showMoreEvents.on('click',function(){
                var _vp = INFORMA.global.device.viewport;
                var _limit = container.data(INFORMA.global.device.viewport) + 1;
                _eventList.find('.events-section:nth-child(n+7)').slideToggle();
                $(this).toggleClass('showLess');
            });
        }

        init = function() {
              _equalheight();
            if (_eventList.length > 0) {
              _bindShowMoreEvents(_eventList);

              RenderOnLoad();
           }
        };
    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.eventPage.init());
