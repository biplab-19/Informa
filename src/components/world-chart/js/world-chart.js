var INFORMA = window.INFORMA || {};
INFORMA.worldchart = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        Urls = INFORMA.Configs.urls.webservices,
        _dataSourceId = $(".world-chart-background").data("source"),
        _chartType = $(".world-chart-background").data("chart-type"),
        _moveImageContainer = $(".move-image-container"),
        _moveImageContainerAnchor = $(".move-image-container a"),
        _getWorldChartData,
        _results,
        _createWorldChart,
        _map,
        _worldChartBoxExpand,
        _worldChartBoxMove,
        _moveImage = 0,
        _trackEvents,
        _dataAttributes,
        _latLon = [{
                "latitude": 59.334591,
                "longitude": 18.063240
            }, {
                "latitude": 52.237049,
                "longitude": 21.017532
            }, {
                "latitude": 48.210033,
                "longitude": 16.363449
            }, {
                "latitude": 41.902782,
                "longitude": 12.496366
            }, {
                "latitude": 48.864716,
                "longitude": 2.349014
            }, {
                "latitude": 53.350140,
                "longitude": -6.266155
            }, 
        ],
        _blueHighlighted = [{
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
        ]

    _getWorldChartData = function() {
        _results = JSON.parse($(".world-chart-background").find("input[type=hidden]").val());
        $(".inf-world-chart-section p").append(_results.Heading);
        _createWorldChart();
    }

    _createWorldChart = function() {
        var starWithDots = [];
        var facet = _results.FacetList[0].SectionList;
        var compelteData = [];
        $.each( facet, function(i, obj) {
            obj.width = 16
            obj.height = 16
            obj.scale = 1
            obj.type = "circle"
            obj.color = "#ed2024"
            compelteData.push(obj)
        });
        function startImage(){
            var starLatLon = []
            $.each(_latLon, function(i, obj) {
                starLatLon.push(starImagesData(obj.latitude, obj.longitude))
            })
            return starLatLon
        }
        function starImagesData(lat, lon){
            var starImagesDataArray = {
                "latitude": lat,
                "longitude": lon,
                "imageURL": "../../Static/images/star.svg",
                "width": mobileZoom().Width,
                "height": mobileZoom().Height,
                "balloonText": false
            }
            return starImagesDataArray
        }
        if (_results.IsdisplayEurozone == "true"){
            var star = startImage();
        } else {
            var star = [];
            _blueHighlighted = []
        }
        star.push(compelteData);
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
            "zoomOnDoubleClick": false,
            //"dragMap": false,
            "dragMap": mobileZoom().dragMap,
            "projection": "miller",

            "dataProvider": {
                "map": "worldLow",
                "getAreasFromMap": false,
                zoomLevel: mobileZoom().Zoom,

                "areas": _blueHighlighted,
                "images": starWithDots,
            },

            "responsive": {
                "enabled": true
            },

            "zoomControl": {
                "homeButtonEnabled": false,
                "zoomControlEnabled": false,
                "panControlEnabled": false
            },
            
            "areasSettings": {
                "autoZoom": false,
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
                balloonMaxwidth: 320,
                Zoom: 1,
                dragMap: false
            }
            var currentWidth = window.screen.width;
            if (currentWidth >= 320 && currentWidth < 767) {
                obj.Width = 8;
                obj.Height = 8;
                obj.balloonHorizontalPadding = 20;
                obj.balloonMaxwidth = 140;
                obj.Zoom = 1;
                obj.dragMap = true;

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
                _moveImageContainer.hide();
                $(".amcharts-main-div").css({"margin-left":"0px"});
            } else {
                $(this).removeClass("zoom-in zoom-out");
                $(this).addClass("zoom-out");
                _map.zoomIn();
                _moveImageContainer.show();
            }
        });
    }

    _worldChartBoxMove = function() {
        _moveImageContainerAnchor.click(function() {
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

    _dataAttributes = function() {
        $(".world-chart-read-more").click(function(){
            var _category = $(this).data("category");
            var _action = $(this).data("action");
            var _label = $(this).data("label");
            var _value = $(this).data("value");
            INFORMA.Analytics.trackEvents(_category, _action, _label, _value);
        })
    }

    init = function() {
        _getWorldChartData();
        _worldChartBoxExpand();
        _worldChartBoxMove();
        _dataAttributes();
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.worldchart.init());