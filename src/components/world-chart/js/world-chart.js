var INFORMA = window.INFORMA || {};
INFORMA.worldchart = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        Urls = INFORMA.Configs.urls.webservices,
        _getWorldChartData,
        _results,
        _createWorldChart,
        _worldChartBoxExpand,
        _worldChartBoxMove,
        _moveImage = 0;

    //_getWorldChartData = function() {
        //INFORMA.DataLoader.GetServiceData(Urls.PieBarChartPageData, {
            //method: "GET",
            //success_callback: function (data) {
                //_results = data;
                //_createWorldChart();
            //},
            //error_callback: function() {
            
            //}
        //});
    //}

    _createWorldChart = function() {
        var map = AmCharts.makeChart("inf-world-chart-wrapper", {
            "type": "map",
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
                "images": [{
                        "latitude": 48.856614,
                        "longitude": 2.352222,
                        "width": 16,
                        "height": 16,
                        "title": "France (20)",
                        "scale": 0.5,
                        "type": "circle",
                        "color": "#ed2024",
                    }, {
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
                    }, {
                        "latitude": 28.6139,
                        "longitude": 77.2090,
                        "width": 16,
                        "height": 16,
                        "scale": 0.5,
                        "type": "circle",
                        "color": "#ed2024",
                        "title": "India (5)"
                    }, {
                        "latitude": -25.2744,
                        "longitude": 133.7751,
                        "width": 16,
                        "height": 16,
                        "scale": 0.5,
                        "type": "circle",
                        "color": "#ed2024",
                        "title": "Australia (39)"
                    }, {
                        "latitude": 56.1304,
                        "longitude": 106.3468,
                        "width": 16,
                        "height": 16,
                        "scale": 0.5,
                        "type": "circle",
                        "color": "#ed2024",
                        "title": "Russia (22)"
                    }, {
                        "latitude": 37.0902,
                        "longitude": -95.7129,
                        "width": 16,
                        "height": 16,
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
                obj.Zoom = 2;

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
                $(".amcharts-main-div").css({"zoom":"1"});
                $(".move-image-container").hide();
                $(".amcharts-main-div").css({"margin-left":"0px"})
            } else {
                $(this).removeClass("zoom-in zoom-out");
                $(this).addClass("zoom-out");
                //$(".amcharts-main-div").css({"zoom":"1.5"});
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
        _createWorldChart();
        _worldChartBoxExpand();
        _worldChartBoxMove();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.worldchart.init());