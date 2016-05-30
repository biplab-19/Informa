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
(function(window, $, namespace) {
	'use strict';
	//variables
  INFORMA.Templates = {
    'articleListItems':
    '{{#each Articles}}'+
            '<li>'+
                '<p class="category">{{ContentType.[0]}}'+
                  '<strong>{{SectorType}}</strong>'+
                '</p>'+
                '<img src="{{ContentType.[1]}}" alt="{{ContentType.[2]}}" />'+
                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
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
                '{{#if Link}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a>'+
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
        'RefineResult' :
            '{{#each results}}'+
                '<div class="col-xs-12 col-sm-6 col-md-4">'+
                    '<p><strong>{{RefineText}}</strong></p>'+
                    '<ul>'+
                        '{{#each Items}}'+
                        '<li>'+
                            '<span class="custom-checkbox">'+
                                '<label class="label" for="{{Label}}">'+
                                  '<input type="checkbox" value="{{Value}}" id="{{Label}}" name="{{Label}}" />'+
                                  '<span>{{Label}}</span>'+
                                '</label>'+
                            '</span>'+
                        '</li>'+
                        '{{/each}}'+
                    '</ul>'+
                '</div>'+
            '{{/each}}',
        'SearchFilter':
        '{{#each results}}'+
                '<li>{{Name}}<a href="#" class="remove" data-name="{{Value}}">x</a></li>'+
        '{{/each}}',
        'ProductsList' :
                '{{#each results}}'+
                '<div class="col-xs-12 col-sm-6 col-md-4 search-tile">'+
                    '<div class="tile un-pinned">'+
                        '<div class="front">'+
                            '<div class="pin"></div>'+
                            '<div class="header">'+
                                '<img src="{{Image}}" alt="{{ImageAlt}}" />'+
                            '</div>'+
                            '<div class="content">'+
                                '<h2>{{Title}}</h2>'+
                                '<p>{{Description}}</p>'+
                                '<ul class="gray-bullets">'+
                                    '{{#each SubSectors}}'+
                                        '<li>{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                            '</div>'+
                        '</div>'+
                        '<div class="back">'+
                            '<div class="header">'+
                                '<div class="header-content">'+
                                    '<div class="pin"></div>'+
                                    '<h4>{{Title}}</h4>'+
                                '</div>'+
                            '</div>'+
                            '<div class="content">'+
                                '<ul>'+
                                    '{{#each Benefits}}'+
                                        '<li><a href="#">{{this}}</a></li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="footer">'+
                                '<div class="footer-content clearfix">'+
                                    '<div class="col-xs-6">'+
                                        '<a href="{{FreeTrialLink}}" class="btn btn-default free-trial">Free Trial</a>'+
                                    '</div>'+
                                    '<div class="col-xs-6">'+
                                        '<a href="{{FreeTrialLink}}" class="btn btn-default orange more">More</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+  
                '{{/each}}',
    'ResourcesList':
            '<ul class="list-container">'+
            '{{#each results}}'+
                '<li class="col-xs-12 col-sm-6 col-md-4">'+
                    '<p class="category">{{ContentType.[0]}}'+
                      '<strong>{{SectorType}}</strong>'+
                    '</p>'+
                    '<img src="{{ContentType.[1]}}" alt="{{ContentType.[2]}}" />'+
                    '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
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
                    '{{#if Link}}'+
                        '<div class="btn-container">'+
                          '<a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a>'+
                        '</div>'+
                    '{{/if}}'+
                '</li>'+
            '{{/each}}'+
        '</ul>',
    'AnalystList': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container">'+
                        '<div class="meet-anlyst-section">'+
                            '<div class="anlyst-heading">'+
                                '<div class="analyst-heading-content">'+
                                    '<div class="analyst-details">'+
                                        '<h2>{{Name}}</h2>'+
                                        '<h3>{{analystdesc}}</h3>'+
                                        '<p class="location">{{location}}</p>'+
                                    '</div>'+
                                    '<div class="analyst-img">'+
                                        '<img src="{{image}}" alt="{{image}}" />'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="analyst-description">'+
                                '<p class="heading">{{question}}</p>'+
                                '<ul class="yellow-bullets">'+
                                    '{{#each MultipleProducts}}'+
                                        '<li>{{name}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                                '<p class="heading">{{experience}}</p>'+
                                '<ul class="track-analyst clearfix">'+
                                    '{{#each products}}'+
                                        '<li><a href="#">{{name}}</a></li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                            '<div class="analyst-footer">'+
                                '<div class="analyst-footer-content clearfix">'+
                                    '<ul class="nav-links">'+
                                        '<li><a href="#" class="icon-twitter"></a></li>'+
                                        '<li><a href="#" class="icon-linked-in"></a></li>'+
                                        '<li><a href="#" class="icon-facebook"></a></li>'+
                                    '</ul>'+
                                    '<a href="#" class="btn btn-default pull-right">Full Profile</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'
}
}(this, jQuery, 'INFORMA'));
