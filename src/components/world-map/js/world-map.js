var INFORMA = window.INFORMA || {};
INFORMA.worldMap= (function(window, $, namespace) {
    'use strict';
      var  init,
       animate = 10;
    
      var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
      var map = AmCharts.makeChart("chartdiv", {
          "type": "map",
          "projection": "miller",

          "dataProvider": {
              "map": "worldLow",
              "getAreasFromMap": false,

              "areas": [{
                  "title": "Austria",
                  "id": "AT",
                  "color": "#233e90",
                  "customData": "1995",
                  "groupId": "before2004"
              }, {
                  "title": "Ireland",
                  "id": "IE",
                  "color": "#233e90",
                  "customData": "1973",
                  "groupId": "before2004"

              }, {
                  "title": "Denmark",
                  "id": "DK",
                  "color": "#233e90",
                  "customData": "1973",
                  "groupId": "before2004"
              }, {
                  "title": "Finland",
                  "id": "FI",
                  "color": "#233e90",
                  "customData": "1995",
                  "groupId": "before2004"
              }, {
                  "title": "Sweden",
                  "id": "SE",
                  "color": "#233e90",
                  "customData": "1995",
                  "groupId": "before2004"
              }, {
                  "title": "Great Britain",
                  "id": "GB",
                  "color": "#233e90",
                  "customData": "1973",
                  "groupId": "before2004"
              }, {
                  "title": "Italy",
                  "id": "IT",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "France",
                  "id": "FR",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "Spain",
                  "id": "ES",
                  "color": "#233e90",
                  "customData": "1986",
                  "groupId": "before2004"
              }, {
                  "title": "Greece",
                  "id": "GR",
                  "color": "#233e90",
                  "customData": "1981",
                  "groupId": "before2004"
              }, {
                  "title": "Germany",
                  "id": "DE",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "Belgium",
                  "id": "BE",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "Luxembourg",
                  "id": "LU",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "Netherlands",
                  "id": "NL",
                  "color": "#233e90",
                  "customData": "1957",
                  "groupId": "before2004"
              }, {
                  "title": "Portugal",
                  "id": "PT",
                  "color": "#233e90",
                  "customData": "1986",
                  "groupId": "before2004"
              }, {
                  "title": "Lithuania",
                  "id": "LT",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Latvia",
                  "id": "LV",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Czech Republic ",
                  "id": "CZ",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Slovakia",
                  "id": "SK",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Slovenia",
                  "id": "SI",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Estonia",
                  "id": "EE",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Hungary",
                  "id": "HU",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Cyprus",
                  "id": "CY",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Malta",
                  "id": "MT",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Poland",
                  "id": "PL",
                  "color": "#233e90",
                  "customData": "2004",
                  "groupId": "2004"
              }, {
                  "title": "Romania",
                  "id": "RO",
                  "color": "#233e90",
                  "customData": "2007",
                  "groupId": "2007"
              }, {
                  "title": "Bulgaria",
                  "id": "BG",
                  "color": "#233e90",
                  "customData": "2007",
                  "groupId": "2007"
              }, {
                  "title": "Croatia",
                  "id": "HR",
                  "color": "#233e90",
                  "customData": "2013",
                  "groupId": "2013",
              }
              ],
              "images": [{
                      "latitude": 48.856614,
                      "longitude": 2.352222,
                      //"imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "France (20)",
                      "svgPath": targetSVG,
                      "scale": 0.5,
                      "type": "circle",
                      "color": "#ed2024",
                  }, {
                      "latitude": 50.8371,
                      "longitude": 4.3676,
                      "imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "2",
                  }, {
                      "latitude": 55.6763,
                      "longitude": 12.5681,
                      "imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "3"
                  }, {
                      "latitude": 40.712775,
                      "longitude": -74.005973,
                      //"imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "4"
                  }, {
                      "latitude": 41.872389,
                      "longitude": 12.480180,
                      "imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "5"
                  }, {
                      "latitude": 51.507351,
                      "longitude": -0.127758,
                      "imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "6"
                  }, {
                      "latitude": 59.329323,
                      "longitude": 18.068581,
                      "imageURL": "images/star.svg",
                      "width": 16,
                      "height": 16,
                      "title": "8"
                  }, {
                      "latitude": 28.6139,
                      "longitude": 77.2090,
                      "width": 16,
                      "height": 16,
                      //"svgPath": targetSVG,
                      "scale": 0.5,
                      "type": "circle",
                      "color": "#ed2024",
                      "title": "India (5)"
                  }, {
                      "latitude": -25.2744,
                      "longitude": 133.7751,
                      "width": 16,
                      "height": 16,
                      "svgPath": targetSVG,
                      "scale": 0.5,
                      "type": "circle",
                      "color": "#ed2024",
                      "title": "Australia (39)"
                  }, {
                      "latitude": 56.1304,
                      "longitude": 106.3468,
                      "width": 16,
                      "height": 16,
                      "svgPath": targetSVG,
                      "scale": 0.5,
                      "type": "circle",
                      "color": "#ed2024",
                      "title": "Russia (22)"
                  }, {
                      "latitude": 37.0902,
                      "longitude": -95.7129,
                      "width": 16,
                      "height": 16,
                      "svgPath": targetSVG,
                      "scale": 0.5,
                      "type": "circle",
                      "color": "#ed2024",
                      "title": "United States (84)"
                  },
              ],
          },

          "responsive": {
              "enabled": true
          },
          
          "areasSettings": {
              "autoZoom": true,
              "selectedColor": "#CC0000", //Color of area which is currently selected. You can set this to "undefined" (no quotes) to make the area retain it's original color when selected..
              "rollOverOutlineColor": "#000", //Color of area's outline when user rolls-over it.
              "unlistedAreasColor": "#d9d6e3",//Color of all areas which are in the map.
              "rollOverColor": "#ab3092", //mouse hover color on select area.
              "alpha": 1,
              "unlistedAreasAlpha": 1, // Opacity of all areas which are in the map svg file, but not listed as areas in DataSet.
              "outlineThickness": "0.1", //Thickness of area's of map outline.
              "outlineColor": "#d9d6e3", //areas of map select color
              "adjustOutlineThickness": true,
          },

          "imagesSettings": {
              "balloonText": "<span style='font-size:14px;font-weight:bold;color:#FFFFFF'>[[title]] [[value]]</span>"
          },

          "balloon": {
              "adjustBorderColor": true,
              "animationDuration": 2,
              "borderAlpha": 0,
              "borderColor": "",
              "borderThickness": 0,
              "cornerRadius": 6,
              "fillColor": "#ab3192",
              "fillAlpha": "1",
              "fixedPosition": false,
              "horizontalPadding": 60,
              "maxWidth": 300,
              "pointerWidth": 0,
              "shadowAlpha": 0,
              "textAlign": "middle",
              "verticalPadding": 10
          },

          "listeners": [{
              "event": "descriptionClosed",
              "method": function (ev) {
                  ev.chart.selectObject();
              }
          }]
      });
      
      $(".dragable-btn button").click(function() {
      var childname=$(this).attr("class");
          if(childname == "left-drag") {
              $(".amcharts-main-div").animate({
                  'marginLeft': animate +'px',
              });
              animate = animate + 10;
          }
          if(childname == "right-drag") {
              $(".amcharts-main-div").animate({
                  'marginLeft': animate + 'px',
              });
              animate = animate - 10;
          }
      });
      $(".draggble-btn").click(function(){
         var isminbutton = $(this).hasClass("min-button");
         if(isminbutton) {
             $(this).removeClass("min-button max-button");
             $(this).addClass("max-button");
             $("._brexitstyle-map").removeClass("max-setion");
             $(".dragable-btn").removeClass("active"); 
         }
         else{
          $(this).removeClass("min-button max-button");
             $(this).addClass("min-button");
             $("._brexitstyle-map").addClass("max-setion");
             $(".dragable-btn").addClass("active");
         }

      });

    init = function() {
        
    }

    return {
        init: init
    }
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.worldMap.init());
