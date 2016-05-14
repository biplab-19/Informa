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
                '<p class="category">{{ContentType}}'+
                  '<strong>{{SectorType}}</strong>'+
                '</p>'+
                '<img src="{{Image}}" alt="{{ImageAltText}}" />'+
                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                '<p class="date">{{TimeStamp}}</p>'+
                '<div class="list-content">'+
                    '{{#if Description}}'+
                        '<p class="description">{{Description}}</p>'+
                        '<span class="article-info"><em>Author:</em> <strong>{{Profiles}}</strong></span>'+
                            '<span class="article-info"><em>Topic:</em>'+ 
                                '<strong>{{Topics}}</strong>'+
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
                '{{#if ResourceLink}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{ResourceLink.url}}" class="btn btn-default" target="{{ResourceLink.target}}">{{ResourceLink.linkText}}</a>'+
                    '</div>'+
                '{{/if}}'+
            '</li>'+
          '{{/each}}'
  }
}(this, jQuery, 'INFORMA'));

