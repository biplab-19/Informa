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
    // methods
        init,
        _bindShowMore,
        _bindElement,
        _template,
        _lists = null;

    _bindShowMore = function(container){
        
        // if data-items, data-infinite is defined, used it
        var _showMore = $('.btn-showMore');
        _showMore.on('click',function(){
            var _vp = INFORMA.global.device.viewportN;
            if(_vp == 2) {// This is mobile, toggle everything except first twbs-font-path
                _vp = 2; //to emulate nth-child(n+3)
            }
            else {
                _vp = 4; // or (n+9)
            }
            _analystList.find('.analyst-list-container:nth-child(n+'+_vp+')').slideToggle();
            $(this).toggleClass('showLess');
        });
    }

    _template = function(obj) {
        _lists += '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container">'+
                    '<div class="meet-anlyst-section">'+
                        '<div class="anlyst-heading">'+
                            '<div class="analyst-details">'+
                                '<h2>'+obj.Title+'</h2>'+
                                '<h3>'+obj.Description+'</h3>'+
                                '<p class="location">'+obj.Location+'</p>'+
                            '</div>'+
                            '<div class="analyst-img">'+
                                '<img src="{{image}}" alt="{{image}}" />'+
                            '</div>'+
                        '</div>'+
                        '<div class="analyst-description">'+
                            '<p class="heading">{{question}}</p>'+
                            '<ul class="yellow-bullets">'+
                                // {{#each specialities}}
                                //     <li>{{name}}</li>
                                // {{/each}}
                            '</ul>'+
                            '<p class="heading">{{experience}}</p>'+
                            '<ul class="track-analyst clearfix">'+
                                // {{#each products}}
                                //     <li><a href="#">{{name}}</a></li>
                                // {{/each}}
                            '</ul>'+
                        '</div>'+
                        '<div class="analyst-footer clearfix">'+
                            '<ul class="nav-links">'+
                                '<li><a href="#" class="white-twitter"></a></li>'+
                                '<li><a href="#" class="white-linkedin"></a></li>'+
                                '<li><a href="#" class="white-mail"></a></li>'+
                            '</ul>'+
                            '<a href="#" class="btn btn-default orange pull-right">Full Profile</a>'+
                        '</div>'+
                    '</div>'+
                '</div>';
    }

    _bindElement = function () {
        var self = this;
        $.get('../json/analyst.json', function(data) {
            var x = null;
            for(x in data.ResultPayLoad) {
                _template(data.ResultPayLoad[x]);
            }

            $('.analyst-items').html(_lists);
        });
    }

    init = function() {
        if (_analystList.length > 0) {
           // _bindElement();
            _bindShowMore(_analystList);
        }
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.analystList.init());
