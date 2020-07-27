var INFORMA = window.INFORMA || {};
INFORMA.worldchart = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        Urls = INFORMA.Configs.urls.webservices,
        _dataSourceId = $(".world-chart-background").data("source"),
        _chartType = $(".world-chart-background").data("chart-type"),
        _getWorldChartData,
        _results,
        _createWorldChart,
        _map,
        _worldChartBoxExpand,
        _worldChartBoxMove,
        _moveImage = 0;

    _getWorldChartData = function() {
        INFORMA.DataLoader.GetServiceData(Urls.WorldChartPageData +'?dataSourceId='+_dataSourceId + '&type='+_chartType, {
            method: "GET",
            success_callback: function (data) {
                _results = data;
                _createWorldChart();
            },
            error_callback: function() {
            
            }
        });
    }

    _createWorldChart = function() {
        var starWithDots = [];
        var facet = _results.ItemList;
        var star = [{
                "latitude": 50.8371,
                "longitude": 4.3676,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "2",
                "balloonText": false
            }, {
                "latitude": 55.6763,
                "longitude": 12.5681,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "3",
                "balloonText": false
            }, {
                "latitude": 40.712775,
                "longitude": -74.005973,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "4",
                "balloonText": false
            }, {
                "latitude": 41.872389,
                "longitude": 12.480180,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "5",
                "balloonText": false
            }, {
                "latitude": 51.507351,
                "longitude": -0.127758,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "6",
                "balloonText": false
            }, {
                "latitude": 59.329323,
                "longitude": 18.068581,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "title": "8",
                "balloonText": false
            }, 
        ];
        star.push(facet);
        function flatten(e,starWithDots){
            if(typeof e.length != "undefined")
            {
                for (var i=0;i<e.length;i++)
                {
                    flatten(e[i],starWithDots);
                }
            }
            else
            {
                starWithDots.push(e);
            }
        }
        flatten(star,starWithDots);
        _map = AmCharts.makeChart("inf-world-chart-wrapper", {
            "type": "map",
            "hideCredits": "true",
            "projection": "miller",

            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": false,
                zoomLevel: mobileZoom().Zoom,

                "areas": [{
                    "title": "Austria",
                    "id": "AT",
                    "color": "#233e90",
                }, {
                    "title": "Ireland",
                    "id": "IE",
                    "color": "#233e90",
                }, {
                    "title": "Finland",
                    "id": "FI",
                    "color": "#233e90",
                }, {
                    "title": "Sweden",
                    "id": "SE",
                    "color": "#233e90",
                }, {
                    "title": "Italy",
                    "id": "IT",
                    "color": "#233e90",
                }, {
                    "title": "France",
                    "id": "FR",
                    "color": "#233e90",
                }, {
                    "title": "Spain",
                    "id": "ES",
                    "color": "#233e90",
                }, {
                    "title": "Greece",
                    "id": "GR",
                    "color": "#233e90",
                }, {
                    "title": "Germany",
                    "id": "DE",
                    "color": "#233e90",
                }, {
                    "title": "Belgium",
                    "id": "BE",
                    "color": "#233e90",
                }, {
                    "title": "Netherlands",
                    "id": "NL",
                    "color": "#233e90",
                }, {
                    "title": "Portugal",
                    "id": "PT",
                    "color": "#233e90",
                }, {
                    "title": "Lithuania",
                    "id": "LT",
                    "color": "#233e90",
                }, {
                    "title": "Latvia",
                    "id": "LV",
                    "color": "#233e90",
                }, {
                    "title": "Czech Republic ",
                    "id": "CZ",
                    "color": "#233e90",
                }, {
                    "title": "Slovakia",
                    "id": "SK",
                    "color": "#233e90",
                }, {
                    "title": "Slovenia",
                    "id": "SI",
                    "color": "#233e90",
                }, {
                    "title": "Estonia",
                    "id": "EE",
                    "color": "#233e90",
                }, {
                    "title": "Hungary",
                    "id": "HU",
                    "color": "#233e90",
                }, {
                    "title": "Poland",
                    "id": "PL",
                    "color": "#233e90",
                }, {
                    "title": "Romania",
                    "id": "RO",
                    "color": "#233e90",
                }, {
                    "title": "Bulgaria",
                    "id": "BG",
                    "color": "#233e90",
                }, {
                    "title": "Croatia",
                    "id": "HR",
                    "color": "#233e90",
                },{
                    "title": "switzerland",
                    "id": "SW",
                    "color": "#233e90",
                }
                ],
                "images": starWithDots,
            },

            "responsive": {
                "enabled": true
            },
            
            "areasSettings": {
                "autoZoom": true,
                "outlineThickness": "0.1",
                "adjustOutlineThickness": true,
                "unlistedAreasColor": "#d9d7e3",
                "balloonText": false
            },

            "imagesSettings": {
                "balloonText": "<span class='tooltip-text'>[[title]] [[value]]</span>"
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
                "fixedPosition": true,
                "horizontalPadding": mobileZoom().balloonHorizontalPadding,
                "maxWidth": mobileZoom().balloonMaxwidth,
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

        function mobileZoom() {
            var obj = {
                Width: 16,
                Height: 16,
                balloonHorizontalPadding: 60,
                balloonMaxwidth: 300,
                Zoom: 1
            }
            var currentWidth = window.screen.width;
            if (currentWidth >= 320 && currentWidth < 767) {
                obj.Width = 8;
                obj.Height = 8;
                obj.balloonHorizontalPadding = 20;
                obj.balloonMaxwidth = 100;
                obj.Zoom = 1;

            return obj;
            }
            return obj;
        }
    }

    _worldChartBoxExpand = function() {
        $(".chart-expand").click(function(){
            var isZoomOut = $(this).hasClass("zoom-out");
            if(isZoomOut) {
                $(this).removeClass("zoom-out zoom-in");
                $(this).addClass("zoom-in");
                _map.zoomOut();
                $(".move-image-container").hide();
                $(".amcharts-main-div").css({"margin-left":"0px"});
            } else {
                $(this).removeClass("zoom-in zoom-out");
                $(this).addClass("zoom-out");
                _map.zoomIn();
                $(".move-image-container").show();
            }
        });
    }

    _worldChartBoxMove = function() {
        $(".move-image-container a").click(function() {
            var moveSide = $(this).attr("class");
            if(moveSide == "move-left") {
                _moveImage = _moveImage + 50;
                $(".amcharts-main-div").animate({
                    'marginLeft': _moveImage +'px',
                });
            }
            if(moveSide == "move-right") {
                _moveImage = _moveImage - 50;
                $(".amcharts-main-div").animate({
                    'marginLeft': _moveImage +'px',
                });
            }
        });
    }

    init = function() {
        _getWorldChartData();
        _worldChartBoxExpand();
        _worldChartBoxMove();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.worldchart.init());