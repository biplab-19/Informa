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
            '{{/each}}'
  }
}(this, jQuery, 'INFORMA'));
