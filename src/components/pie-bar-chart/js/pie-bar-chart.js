var INFORMA = window.INFORMA || {};
INFORMA.piebarchart = (function(window, $, namespace) {
    'use strict';
    //variables
    var init,
        Templates = INFORMA.Templates,
        Urls = INFORMA.Configs.urls.webservices,
        _dataSourceId,
        _chartType,
        _getPieBarChartData,
        _results,
        _template,
        _handlebar,
        _html,
        _createPieBarChartSection,
        _createPie,
        _createBar,
        _initializeSlider

    _getPieBarChartData = function(obj) {
        _dataSourceId = $(obj).data('source');
        _chartType = $(obj).data('chart-type');
        INFORMA.DataLoader.GetServiceData(Urls.PieBarChartPageData +'?dataSourceId='+_dataSourceId + '&type='+_chartType+'|'+Date.now(), {
            method: "GET",
            success_callback: function (data) {
                _results = data;
                _results["UniqueId"]= Date.now();
                _results.Type = _results.Type.split('|')[0];
                if( _results.Type == "bar") {
                    _results["Bar"] = true;
                }
                else {
                    _results["Bar"] = false;
                }
                _createPieBarChartSection(obj);
            },
            error_callback: function() {
            
            }
        });
    }

    _createPieBarChartSection = function(obj) {
        _template = (Templates.PieBarChartTemplate) ? Templates.PieBarChartTemplate : "";
        _handlebar = Handlebars.compile(_template);
        _html = _handlebar(_results);
        $(obj).find(".inf-pie-bar-chart-section").append(_html);
        if( _results.Type == "pie") {
            $(obj).addClass("chart-background");
            _createPie(obj);
        }
        if( _results.Type == "bar") {
            $(obj).addClass("bar-chart-background");
            _createBar(obj);
        }
        _initializeSlider(obj);
    }

    _createPie = function(obj) {
        $(obj).find('.pie-bar-chart-col .pie-bar-chart-container').each(function() {
            var pieId = (this.id);
            var facet = _results.FacetList.filter(facet=>facet.Id+_results.UniqueId == pieId);
            var chart = AmCharts.makeChart(pieId, {
                "type": "pie",
                "hideCredits":"true",
                "labelTickAlpha": "0",
                "labelText": "[[title]]\n",
                "labelFunction": function (category) {
                    var title = category.title;
                    title = title.replace(" ","\n") + "\n";
                    var value = category.value;
                    if(title.length > 15) {
                        title = title.substring(0,15) + '...';
                    }
                    return title +"\n"+ value;
                },
                "theme": "light",
                "fontSize": 12,
                "color": "#ffffff",
                "colorField": "Color",
                "titleField": "Name",
                "valueField": "Count",
                "autoMargins": "false",
                "dataProvider": facet[0].SectionList,
                "balloon": {
                    "fixedPosition": true
                },
                "export": {
                    "enabled": true,
                    "menu": []
                }
            });
        
        });
    }

    _createBar = function(obj) {
        $(obj).find('.pie-bar-chart-col .pie-bar-chart-container').each(function() {
            var barChartId = (this.id);
            var facet = _results.FacetList.filter(facet=>facet.Id+_results.UniqueId == barChartId);
            var chart = AmCharts.makeChart(barChartId, {
                "type": "serial",
                "hideCredits": "true",
                "theme": "none",
                "marginRight": 70,
                "fontSize": 10,
                "color": "#FFFFFF",
                "titleField": "Name",
                "plotAreaBorderAlpha": 0,
                "plotAreaBorderColor": "",
                "plotAreaFillColors": "#FFFFFF",
                "backgroundColor": "",
                "backgroundAlpha": 0,
                "dataProvider": facet[0].SectionList,
                "valueAxes": [{
                    "axisAlpha": 0,
                    "position": "left",
                    "gridColor": "transparent",
                }],       
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "<b>[[Name]]\n[[value]]</b>",
                    "fillColorsField": "Color",
                    "fillAlphas": 1,
                    "lineAlpha": 0,
                    "type": "column",
                    "valueField": "Count",
                    "labelText": '[[Name]]\n[[value]]',
                    "labelPosition": 'top',
                    "labelFunction": function(value, category, graphs) {
                        return category.replace(" ","\n") + "\n";
                    }
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "Name",
                "autoMargins": false,
                "marginLeft": 10,
                "marginRight": 10,
                "marginTop": 0,
                "marginBottom": 0,
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridThickness": 0,
                    "axisColor": "#FFFFFF",
                    "labelsEnabled": false,
                    "startOnAxis": false,
                }
            });
        
        });
    }

    _initializeSlider = function(obj) {
        $(obj).find('.pie-bar-chart-carousel').slick({
            slidesToShow: 4,
            infinite: false,
            responsive: [
                {
                  breakpoint: 1400,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 800,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 1
                  }
                }                
            ]
        });
    }

    init = function() {

        $('.chart-bc').each(function(index){
	        _getPieBarChartData(this);
        });
        
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.piebarchart.init());