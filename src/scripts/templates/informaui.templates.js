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
        'ProductListingSearch' :
            '{{#each results}}'+
            '<div class="col-xs-12 col-sm-6 col-md-4 product-finder-list">'+
                '<div class="product-finder-container un-pinned">'+
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
            '{{/each}}'
}
}(this, jQuery, 'INFORMA'));
