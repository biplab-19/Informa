    /*
 * global.js
 *
 *
 * @project:   Informa
 * @date:      2016-April-25
 * @author:    Santosh
 * @licensor:  SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
(function(window, $, namespace) {
    'use strict';
    //variables
  INFORMA.Templates = {
	'articleListItemsNewCo':
        '{{#each Articles}}'+
            '<li>'+
                '<div class="col-xs-12">'+
                '{{#compare Video null operator="=="}}'+
						'{{#compare ContentTileImage null operator="!="}}'+
							'<div class="video-container">' +
								'<img src="{{ContentTileImage.Url}}" alt="{{ContentTileImage.Alt}}"/>' +
							'</div>' +
						'{{/compare}}' +	
					'{{/compare}}' +
					'{{#compare Video null operator="!="}}'+
						'<div class="video-container">'+
							'{{#compare HasExternalLink false operator="=="}}'+
								'{{#compare ShowForm true operator="=="}}'+
									'{{#compare IsAuthenticatedUser false operator="=="}}'+
										'<a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">'+
											'<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
											'<span class="play-icon icon-play"></span>'+
										'</a>'+
									'{{/compare}}'+
									'{{#compare IsAuthenticatedUser true operator="=="}}'+
										'{{#if LinkText}}'+
											'<div class="btn-container text-right">'+
												'<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_self">{{LinkText}}</a>'+
											'</div>'+
										'{{/if}}'+
									'{{/compare}}'+
								'{{/compare}}'+
								'{{#compare ShowForm false operator="=="}}'+
									'{{#compare IsAuthenticatedUser false operator="=="}}'+
										'<a href="{{Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0">'+
											'<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
											'<span class="play-icon icon-play"></span>'+
										'</a>'+
									'{{/compare}}'+    
								'{{/compare}}'+
								'{{#compare IsAuthenticatedUser true operator="=="}}'+
									'<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
										'<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
										'<span class="play-icon icon-play"></span>'+
									'</a>'+
								'{{/compare}}'+
							'{{/compare}}'+  
							 '{{#compare HasExternalLink true operator="=="}}'+
								'<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
									'<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
									'<span class="play-icon icon-play"></span>'+
								'</a>'+
							 '{{/compare}}'+
						'</div>'+
					'{{/compare}}'+

					'{{#compare Video null operator="=="}}'+
						'{{#compare ContentTileImage null operator="=="}}'+
						   '{{#compare Image null operator="!="}}' +
								'{{#compare Image.length "0" operator=">"}}' +
									'{{#if HasExternalLink}}'+
										'{{#compare HasExternalLink true operator="=="}}'+
											'{{#if LinkText}}'+
												'<a class="newco-article-image" href="{{PageURL}}" target="_blank" title="{{Title}}"><img src="{{Image}}" alt="" class="img-responsive" /></a>'+
											'{{/if}}'+
										'{{/compare}}'+
									'{{/if}}'+
									'{{#compare HasExternalLink false operator="=="}}'+
										'{{#compare ShowForm false operator="=="}}'+
											'{{#compare IsAuthenticatedUser false operator="=="}}'+
												'{{#if LinkText}}'+
													'<a href="{{PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_blank"><img src="{{Image}}" alt="{{Title}}" class="img-responsive" /></a>'+
												'{{/if}}'+
											'{{/compare}}'+
										'{{/compare}}'+
										'{{#compare ShowForm true operator="=="}}'+
											'{{#compare IsAuthenticatedUser false operator="=="}}'+
												'{{#if LinkText}}'+
													'<a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}"><img src="{{Image}}" alt="{{Title}}" class="img-responsive" /></a>'+
												'{{/if}}'+
											'{{/compare}}'+
										'{{/compare}}'+
										'{{#compare IsAuthenticatedUser true operator="=="}}'+
											'{{#if LinkText}}'+
												'<a href="{{PageURL}}" target="_blank"><img src="{{Image}}" alt="{{Title}}" class="img-responsive" /></a>'+
											'{{/if}}'+
										'{{/compare}}'+
									'{{/compare}}'+
								'{{/compare}}'+
							'{{/compare}}'+
							'{{#compare PageURL.length "0" operator="=="}}' +
								'<img src="{{Image}}" alt="{{Title}}" class="img-responsive" />'+ 
							'{{/compare}}'+
						'{{/compare}}'+
					'{{/compare}}'+
                    '<div class="recomended-wrapper" data-fetch="{{Id}}">'+
                        '<div class="recomend-content">'+
                            '<div class="content">'+
                                '{{#compare SamplecontentProducts.length "0" operator=">"}}'+
                                    '<p class="type">'+
                                        '<span>{{SamplecontentProducts}}</span>'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare PageURL null operator="!="}}' +
                                    '{{#compare PageURL.length "0" operator=">"}}' +
                                        '{{#if HasExternalLink}}'+
                                            '{{#compare HasExternalLink true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank" title="{{Title}}">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/if}}'+

                                        '{{#compare HasExternalLink false operator="=="}}'+
                                            '{{#compare ShowForm false operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a href="{{PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_blank" title="{{Title}}">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare ShowForm true operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a class="show-register-form gated-content" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}" title="{{Title}}">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank" title="{{Title}}">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                                '{{#compare PageURL.length "0" operator="=="}}' +
                                    '<h4><span title="{{Title}}">{{Title}}</span></h4>'+
                                '{{/compare}}'+
                                '{{#IfNotBlank Description}}'+
                                '{{#compare Description null operator="!="}}'+
                                    '{{#compare Description.length "0" operator=">"}}' +
                                        '<p class="description">{{Description}}</p>'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                                '{{/IfNotBlank}}'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</li>'+
          '{{/each}}',
    'articleListItems':
        '{{#each Articles}}'+
            '<li>'+
                '<div class="col-xs-12">'+
                    '<div class="recomended-wrapper" data-fetch="{{Id}}">'+
                        '<div class="recomend-content">'+
                            '<div class="content">'+
                                '{{#compare SamplecontentProducts.length "0" operator=">"}}'+
                                    '<p class="type">'+
                                        '{{SamplecontentProducts}}'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare PageURL null operator="!="}}' +
                                    '{{#compare PageURL.length "0" operator=">"}}' +
                                        '{{#if HasExternalLink}}'+
                                            '{{#compare HasExternalLink true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/if}}'+
                                        '{{#compare HasExternalLink false operator="=="}}'+
                                            '{{#compare ShowForm false operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a href="{{PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_blank">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare ShowForm true operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<h4><a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">{{Title}}</a></h4>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<h4><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                                '{{#compare PageURL.length "0" operator="=="}}' +
                                    '<h4><span>{{Title}}</span></h4>'+
                                '{{/compare}}'+
                                '<p class="publish">' +
                                '{{#if Profile}}{{ByKeyword}} ' +
                                        '{{#compare ProfileUrl null operator="!=" }} <a href="{{ProfileUrl}}" target="_blank"><strong>{{Profile}}</strong></a> {{/compare}}' +
                                        '{{#compare ProfileUrl null operator="=="}} <strong>{{Profile}}</strong> {{/compare}}' +
                                '{{/if}}'+
                                '{{#if PublicationDate}}{{PublicationDate}}{{/if}}</p>' +
                                '{{#compare Video null operator="=="}}'+
                                    '<div class="video-container">' +
                                        '<img src="{{ContentTileImage.Url}}" alt="{{ContentTileImage.Alt}}">' +
                                    '</div>' +
                                '{{/compare}}' +
                                '{{#compare Video null operator="!="}}'+
                                    '<div class="video-container">'+
                                        '{{#compare HasExternalLink false operator="=="}}'+
                                            '{{#compare ShowForm true operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '<a class="show-register-form" data-show-register="true" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">'+
                                                        '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                        '<span class="play-icon icon-play"></span>'+
                                                    '</a>'+
                                                '{{/compare}}'+
                                                '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_self">{{LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                            '{{#compare ShowForm false operator="=="}}'+
                                                '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                    '<a href="{{Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0">'+
                                                        '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                        '<span class="play-icon icon-play"></span>'+
                                                    '</a>'+
                                                '{{/compare}}'+    
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
                                                    '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                    '<span class="play-icon icon-play"></span>'+
                                                '</a>'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+  
                                         '{{#compare HasExternalLink true operator="=="}}'+
                                            '<a href="{{Video.Url}}" class="video-link"  tabindex="0">'+
                                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                                '<span class="play-icon icon-play"></span>'+
                                            '</a>'+
                                         '{{/compare}}'+
                                    '</div>'+
                                '{{/compare}}'+
                                '{{#compare Description null operator="!="}}'+
                                    '<p class="description">{{Description}}</p>'+
                                '{{/compare}}'+
                            '</div>'+
                            // '{{#compare Brand.length 0 operator=">"}}'+
                            //         '<p class="brands">'+
                            //             '{{#each Brand}}'+
                            //                     '<span>{{this}}</span>'+
                            //             '{{/each}}'+
                            //         '</p>'+
                            // '{{/compare}}'+
                                '{{#compare TopicURLS.length "0" operator=">"}}'+
                                    '<p class="topics">'+
                                        '{{TopicKeyword}} '+
                                        '{{#each TopicURLS}}'+
                                            '<strong><a href="{{this.TopicResourceLink}}">{{this.TopicName}}</a></strong>'+
                                        '{{/each}}'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare ShowSubSectorOnSampleContentPage true operator="=="}}'+
                                    '{{#compare SubSectorsUrlDetails.length 0 operator=">"}}'+
                                        '<p class="SubSectors">'+
                                            '<span>{{SubSectorKeyword}}</span>'+
                                            '{{#each SubSectorsUrlDetails}}'+
                                                '<span>'+
                                                    '<a href="{{this.Value}}">{{this.Key}}</a>'+
                                                '</span>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                        '</div>'+
                        '<div class="footer">'+
                            '{{#compare Price null operator="!="}}'+
                                    '<div class="recomended-currency"><strong>{{Price}}</strong></div>'+
                            '{{/compare}}'+
                            '{{#compare PageURL null operator="!="}}' +
                                '{{#compare PageURL.length "0" operator=">"}}' +
                                    '{{#if HasExternalLink}}'+
                                        '{{#compare HasExternalLink true operator="=="}}'+
                                            '{{#if LinkText}}'+
                                                '<div class="btn-container text-right">'+
                                                    '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{LinkText}}</a>'+
                                                '</div>'+
                                            '{{/if}}'+
                                        '{{/compare}}'+
                                    '{{/if}}'+

                                    '{{#compare HasExternalLink false operator="=="}}'+
                                        '{{#compare ShowForm false operator="=="}}'+
                                            '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn show-content-first-time" data-firstcontent="true" target="_self">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare ShowForm true operator="=="}}'+
                                            '{{#compare IsAuthenticatedUser false operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a data-show-register="true" class="btn btn-primary show-register-form full-width-btn" data-toggle="modal" data-modal="#formRegistration" data-url="{{PageURL}}">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                            '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                                '{{#if LinkText}}'+
                                                    '<div class="btn-container text-right">'+
                                                        '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_self">{{LinkText}}</a>'+
                                                    '</div>'+
                                                '{{/if}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare IsAuthenticatedUser true operator="=="}}'+
                                            '{{#if LinkText}}'+
                                                '<div class="btn-container text-right">'+
                                                    '<a href="{{PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{LinkText}}</a>'+
                                                '</div>'+
                                            '{{/if}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                            '{{#compare PageURL.length "0" operator="=="}}' +
                                '<div class="btn-container text-right">'+
                                    '<a class="btn btn-primary" disabled>{{LinkText}}</a>'+
                                '</div>'+
                            '{{/compare}}'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</li>'+
          '{{/each}}',
        'HeadlinesListItems':
            '{{#each Headlines}}'+
                '<li>'+
                    '{{#compare ProductBrandName.length "0" operator=">"}}'+
                        '<p class="type">'+
                            '<span>{{ProductBrandName}}</span>'+
                        '</p>'+
                    '{{/compare}}'+
                    '{{#compare SamplecontentProducts.length "0" operator=">"}}'+
                        '<p class="type">'+
                            '<span>{{SamplecontentProducts}}</span>'+
                        '</p>'+
                    '{{/compare}}'+
                    '<p class="date">{{PublicationDate}}</p>'+
                    '{{#compare PageURL null operator="!="}}' +
                        '{{#compare PageURL.length "0" operator=">"}}' +
                            '{{#compare HasExternalLink true operator="=="}}'+
                                '<div class="list-content">'+
                                    '<h4 class="poduct-brand-subheading"><a href="{{PageURL}}" target="_blank">{{Title}}</a></h4>'+
                                '</div>'+
                            '{{/compare}}'+
                            '{{#compare HasExternalLink false operator="=="}}'+
                                '<div class="list-content">'+
                                    '<h4 class="poduct-brand-subheading"><a href="{{PageURL}}" target="_self">{{Title}}</a></h4>'+
                                '</div>'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                    '{{/compare}}'+
                    '{{#compare PageURL.length "0" operator="=="}}' +
                        '<div class="list-content">'+
                            '<h4 class="poduct-brand-subheading"><span>{{Title}}</span></h4>'+
                        '</div>'+
                    '{{/compare}}'+
                    '{{#compare PageURL null operator="!="}}' +
                        '{{#compare PageURL.length "0" operator=">"}}' +
                            '{{#compare HasExternalLink true operator="=="}}'+
                                '<div class="link">'+
                                    '<a role="button" href="{{PageURL}}" title="External Link" target="_blank">'+
                                    '<span class="icon-external-link"><span class="access-link">Link</span></span></a>'+
                                '</div>'+
                            '{{/compare}}'+  
                             '{{#compare HasExternalLink false operator="=="}}'+
                                '<div class="link">'+
                                    '<a role="button" href="{{PageURL}}" title="Internal Link" target="_self">'+
                                    '<span class="icon-internal-link"><span class="access-link">Link</span></span></a>'+
                                '</div>'+
                            '{{/compare}}'+  
                        '{{/compare}}'+
                    '{{/compare}}'+
                '</li>'+
            '{{/each}}',
        'SubSectorList':
            '{{#each SubSectors}}'+
                '<option value="{{SubSectorID}}">{{SubSectorName}}</option>'+
            '{{/each}}',
    'RefineFacets':
            '{{#each results}}'+
                '<li>'+
                '<span class="custom-checkbox">'+
                    '<label for="{{Id}}" class="label">'+
                        '<input type="checkbox" name="{{Name}}" id="{{Id}}" value="{{Value}}" {{#if Disabled}}disabled="disabled"{{/if}} {{#if Selected}}checked="checked"{{/if}} />'+
                        '<span>{{Text}}</span>'+
                    '</label>'+
                '</span>'+
                '</li>'+
            '{{/each}}',
    'Resources':
            '<ul class="list-container">'+
            '{{#each results}}'+
                '<li class="col-xs-12 col-sm-6 col-md-4">'+
                    '<div class="columns">'+
                    '<p class="category">'+
                      '<strong>{{SectorType}}</strong>'+
                    '</p>'+
                    '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                    '<span class="content-type">{{ContentType}}</span>'+
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
                    '</div>'+
                    '{{#if PageURL}}' +
                        '<div class="btn-container">' +
                          '<a role="button" href="{{PageURL}}" class="btn btn-primary" target="_blank">{{LinkText}}</a>' +
                        '</div>' +
                    '{{/if}}' +
                '</li>'+
            '{{/each}}'+
        '</ul>',
        'Events':
            '<section class="events-list analyst-profile-events event-profile-container">'+
                '<div class="container" data-count="3">'+
                    '<div class="events-container row">'+
                        '{{#each results}}'+
                            '<div class="col-xs-12 col-sm-6 col-md-4 events-section">'+
                                '<div class="events-wrap">'+
                                    '<div class="header clearfix">'+
                                        '<p class="date-field">'+
                                            '{{#compare EventDate null operator="!="}}<span class="bold">{{EventDate}}</span>{{/compare}}{{#if EventDate}}{{#if Time}}, {{/if}}{{/if}}{{#compare Time null operator="!="}}<span>{{Time}}</span>{{/compare}}</p>'+
                                    '</div>'+
                                    '<div class="content-wrap">'+ 
                                        '<p class="country">'+
                                            '{{#compare State null operator="!="}}<span>{{State}}</span>{{/compare}}{{#if State}}{{#if Country}},{{/if}}{{/if}}{{#compare Country null operator="!="}}<span class="bold">{{Country}}</span>{{/compare}}'+
                                        '</p>'+
                                        '<p><span class="type">{{EventType}}</span></p>'+
                                        '<h3 class="title">{{Title}}</h3>'+
                                        '<div class="content clearfix">'+
                                            '<div class="title-content">Presenter:</div>'+
                                            '<div class="title-body">'+
                                                '<ul class="clearfix">'+
                                                    '{{#each Presenters}}'+
                                                    '<li>{{this}}</li>'+
                                                        '{{/each}}'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="content clearfix">'+
                                            '<div class="title-content">Themes:</div>'+
                                            '<div class="title-body">'+
                                                '<ul class="clearfix">'+
                                                    '{{#each Themes}}'+
                                                    '<li>{{this}}</li>'+
                                                        '{{/each}}'+
                                                '</ul>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '<div class="footer clearfix">'+
                                    '{{#compare StatusEnabled  true operator="=="}}'+
                                        '{{#compare Register null operator="!="}}' +
                                            '{{#compare Register.Url null operator="!="}}' +
                                                '{{#compare Register.Url.length "0" operator=">"}}' +
                                                    '<a href="{{Register.Url}}" class="btn btn-default register" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+ 
                                    '{{#compare StatusEnabled  false operator="=="}}'+   
                                        '{{#compare Register null operator="!="}}' +
                                            '{{#compare Register.Url null operator="!="}}' +
                                                '{{#compare Register.Url.length "0" operator=">"}}' +
                                                    '<a href="{{Register.Url}}" class="btn btn-default register disabled" target="{{Register.Target}}">{{EventCTAText}}</a>'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+ 
                                    '{{#compare FullDetail null operator="!="}}' +
                                        '{{#compare FullDetail.Url null operator="!="}}' +
                                            '{{#compare FullDetail.Url.length "0" operator=">"}}' + 
                                                '<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '{{/each}}'+
                    '</div>'+
                '</div>'+
            '</section>',
        'AnalystListNewCo': '<section class="analyst-views newco-analyst-views">' +
                                '<div class="container">' +
                                    '<h2 class="header">{{results.header}}</h2>' +
                                    '<div class="row">' +
                                        '{{#each results.ModelItem}}' +
                                        '<div class="col-md-4 col-sm-12 col-xs-12 analyst-view-container">' +
                                            '<div class="row">' +
                                                '<div class="col-lg-12  image ">' +
                                                    '<div class="analyst-img">' +
                                                        '{{#if ProfileImage}}' +
                                                        '<a href="{{ProfileUrl}}">' +
                                                            '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                        '</a>' +
                                                        '{{/if}}' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="col-lg-12  content">' +
                                                    '<div class="row">' +
                                                        '<div class="col-md-12">' +
                                                            '<div class="meet-anlyst-section">' +
                                                                '<div class="anlyst-heading">' +
                                                                    '<div class="analyst-heading-content">' +
                                                                        '<div class="analyst-details">' +
                                                                            '<span class="analyst-type">{{Type}}</span>' +
                                                                            '<a href="{{ProfileUrl}}">' +
                                                                                '<h4>{{Name}}</h4>' +
                                                                            '</a>' +
                                                                            '<h5>' +
                                                                                '<span class="designation">{{Type}}{{#if Type}}{{#if JobTitle}},{{/if}}{{/if}} {{JobTitle}}</span>' +
                                                                                '<span class="newco-location">{{State}}{{#if Country}}{{#if State}},{{/if}}{{/if}} {{Country}}</span>' +
                                                                                '<span class="experiance"> {{YearsOfExperience}}+ {{ExperienceText}}</span>' +
                                                                            '</h5>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="row discription">' +
                                                        '<div class="profile-discription">' +
                                                            '<div class="col-md-12">' +
                                                                '<strong>' +
                                                                    'Specialities include ' +
                                                                    '</strong>' + '{{#each Specialization}}' +
                                                                    ' {{#if @last}}{{this}} {{else}}{{this}}, {{/if}} ' +
                                                                    '{{/each}}' +
                                                            '</div>' +
                                                        '<div class="col-md-12">' +
                                                            '<strong>' +
                                                                'Product covered include ' +
                                                                '</strong>' + '{{#each ProductDetails}}' +
                                                                ' {{#if @last}}{{this.Key}} {{else}}{{this.Key}}, {{/if}}' +
                                                                '{{/each}}' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="col-md-12 meet-anlyst-section">' +
                                                        '<div class="analyst-footer">' +
                                                            '<div class="analyst-footer-content clearfix">' +
                                                                '<ul class="nav-links">' +
                                                                '{{#if LinkedInProfileID}}' +
                                                                '{{#compare LinkedInProfileID.length "1" operator=">"}}' +
                                                                    '<li>' +
                                                                        '<a class="addthis_button_linkedin_follow trigger-sc-event" addthis:userid="{{LinkedInProfileID}}"></a>' +
                                                                    '</li>' +
                                                                    '{{/compare}}' +
                                                                    '{{/if}}' +
                                                                    '{{#if TwitterHandleID}}' +
                                                                    '{{#compare TwitterHandleID.length "1" operator=">"}}' +
                                                                    '<li>' +
                                                                        '<a class="addthis_button_twitter_follow trigger-sc-event" addthis:userid="{{TwitterHandleID}}"></a>' +
                                                                    '</li>' +
                                                                    '{{/compare}}' +
                                                                    '{{/if}}' +
                                                                    '{{#if EmailAddressLink.Url}}' +
                                                                    '{{#compare EmailAddressLink.Url null operator="!="}}' +
                                                                    '<li><a href="{{EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                                    '{{/compare}}' +
                                                                    '{{/if}}' +
                                                                '</ul>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '{{/each}}' +
                                    '<div class="btn-container text-center">'+
                                        '<a href="javascript:void(0)" class="btn-plus" data-fetch="{{results.SectorID}}" data-count="{{results.TotalCount}}">'+
                                            '<span class="more"> See all {{results.TotalCount}} Specialists </span>'+
                                           ' <span class="less"> See Less Specialists </span>'+
                                        '</a>'+
                                    '</div>'+
                                '</div>' +
                            '</div>' +
                        '</section>',

        'AnalystList': '<section class="analyst-views">' +
                            '<div class="container">' +
                                '<h2 class="header">{{results.header}}</h2>' +
                                '<div class="row analyst-items">' +
                                    '{{#each results.ModelItem}}' +
                                        '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}">' +
                                            '<div class="meet-anlyst-section">' +
                                                '<div class="anlyst-heading">' +
                                                    '<div class="analyst-heading-content">' +
                                                        '<div class="analyst-details">' +
                                                          '<span class="analyst-type">{{Type}}</span>' +
                                                            '<h4>{{Name}}</h4>' +
                                                            '<h5>{{Type}}{{#if Type}}{{#if JobTitle}},{{/if}}{{/if}} {{JobTitle}}</h5>' +
                                                            '{{#if Country}}'+
                                                            '<p class="location">{{State}}{{#if Country}}{{#if State}},{{/if}}{{/if}} {{Country}}</p>' +
                                                            '{{/if}}'+
                                                        '</div>' +
                                                        '<div class="analyst-img">' +
                                                            '{{#if ProfileImage}}'+
                                                            '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                            '{{/if}}'+
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="analyst-description">' +
                                                    '{{#compare Specialization.length 0 operator=">"}}' +
                                                        '<p class="heading"><em>{{FirstName}}</em> {{SpecializationText}}</p>' +
                                                        '<ul class="yellow-bullets">' +
                                                            '{{#each Specialization}}' +
                                                                '<li>{{this}}</li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}'+
                                                    '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                                    '{{#compare ProductDetails.length 0 operator=">"}}' +
                                                        '<ul class="track-analyst clearfix">' +
                                                            '{{#each ProductDetails}}' +
                                                                '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}' +
                                                '</div>' +
                                                '<div class="analyst-footer">' +
                                                    '<div class="analyst-footer-content clearfix">' +
                                                        '<ul class="nav-links">'+
                                                            '{{#if LinkedInProfileID}}'+
                                                                '{{#compare LinkedInProfileID.length "1" operator=">"}}'+
                                                                '<li>'+
                                                                    '<a class="addthis_button_linkedin_follow" addthis:userid="{{LinkedInProfileID}}"></a>'+
                                                                '</li>'+
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                            '{{#if TwitterHandleID}}'+
                                                                '{{#compare TwitterHandleID.length "1" operator=">"}}'+
                                                                '<li>'+
                                                                    '<a class="addthis_button_twitter_follow" addthis:userid="{{TwitterHandleID}}"></a>'+
                                                                '</li>'+
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                            '{{#if EmailAddressLink.Url}}'+
                                                                '{{#compare EmailAddressLink.Url null operator="!="}}'+
                                                                    '<li><a href="{{EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                                '{{/compare}}'+
                                                            '{{/if}}'+
                                                        '</ul>'+
                                                        '<a href="{{ProfileUrl}}" class="btn btn-primary pull-right">Full Profile</a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '{{/each}}' +
                                '</div>' +
                                '{{#compare results.TotalCount "3" operator=">"}}' +
                                    '<div class="btn-container text-center">' +
                                        '<a href="javascript:void(0)" data-fetch="{{results.SectorID}}" class="btn-plus">' +
                                        '<span class="more">See All {{results.TotalCount}} Analysts</span>' +
                                        '<span class="less">Hide Analysts</span></a>' +
                                    '</div>' +
                                '{{/compare}}' +
                            '</div>' +
                        '</section>',
        'AnalystTemplate': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{results.Type}}</span>' +
                                                    '<h4>{{results.Name}}</h5>' +
                                                    '<h5>{{results.Type}}{{#if results.Type}}{{#if results.JobTitle}},{{/if}}{{/if}} {{results.JobTitle}}</h3>' +
                                                    '{{#if results.Country}}'+
                                                        '<p class="location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}} {{results.Country}}</p>' +
                                                    '{{/if}}'+
                                                '</div>' +
                                                '<div class="analyst-img">' +
                                                    '{{#if results.ProfileImage}}'+
                                                        '<img src="{{results.ProfileImage}}" alt="{{results.image}}" />' +
                                                    '{{/if}}'+
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="analyst-description">' +
                                            '{{#compare results.Specialization.length "0" operator=">"}}' +
                                                '<p class="heading"><em>{{results.FirstName}}</em> {{results.SpecializationText}}</p>' +
                                                '<ul class="yellow-bullets">' +
                                                    '{{#each results.Specialization}}' +
                                                        '<li>{{this}}</li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}'+
                                            '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>' +
                                            '{{#compare results.ProductDetails.length "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each results.ProductDetails}}' +
                                                        '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                    '<ul class="nav-links">'+
                                                        '{{#if results.LinkedInProfileID}}'+
                                                            '{{#compare results.LinkedInProfileID.length "1" operator=">"}}'+
                                                            '<li>'+
                                                                '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>'+
                                                            '</li>'+
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                        '{{#if results.TwitterHandleID}}'+
                                                            '{{#compare results.TwitterHandleID.length "1" operator=">"}}'+
                                                            '<li>'+
                                                                '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>'+
                                                            '</li>'+
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                        '{{#if results.EmailAddressLink.Url}}'+
                                                            '{{#compare results.EmailAddressLink.Url null operator="!="}}'+
                                                                '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                    '</ul>'+
                                                '<a href="{{results.ProfileUrl}}" class="btn btn-primary pull-right">{{results.SeeFullProfileLabel}}</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
    'AnalystTemplateNewCo': '<div class="col-md-4 col-sm-12 col-xs-12 analyst-view-container {{results.Type}}">' +
        '<div class="row">' +                                        
                '<div class="col-lg-12  image">' +
                    '<div class="analyst-img">' +
                        '{{#if results.ProfileImage}}'+
                            '<img src="{{results.ProfileImage}}" alt="{{results.image}}" />' +
                        '{{/if}}'+
                    '</div>' +
                '</div>' +  
                '<div class="col-lg-12  content">'+
                    '<div class="row">'+
                        '<div class="col-md-12">'+
                            '<div class="meet-anlyst-section">'+
                                '<div class="anlyst-heading">'+
                                    '<div class="analyst-heading-content">'+
                                        '<div class="analyst-details">'+
                                            '<span class="analyst-type">{{results.Type}}</span>'+
                                            '<a href={{results.ProfileUrl}}>'+
                                                '<h4>{{results.Name}}</h4>'+
                                            '</a>'+
                                            '<h5>'+
                                                '<span class="designation">{{results.JobTitle}}</span>'+
                                                '<span class="newco-location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}}'+
                                                '{{results.Country}}</span>'+
                                                '<span class="experiance">'+'  '+'  {{results.YearsOfExperience}}+ {{results.ExperienceText}}</span>'+
                                            '</h5>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+	
                    '<div class="row discription">'+	
                        '<div class="profile-discription">'+
                            '<div class="col-md-12">'+
                                '{{#compare results.Specialization.length "0" operator=">"}}' +
                                    '<strong>Specialities include</strong>' +																	
                                    '{{#each results.Specialization}}' +
                                        ' {{this}}' +																	
                                    '{{/each}}' +																	
                                '{{/compare}}'+
                            '</div>'+
                            '<div class="col-md-12">'+                                                              
                                '{{#compare results.ProductDetails.length "0" operator=">"}}' +
                                        '<strong>'+
                                            'Product covered include'+
                                        '</strong>'+
                                        '{{#each results.ProductDetails}}' +
                                            ' {{this.Key}},' +
                                        '{{/each}}' +																		
                                '{{/compare}}' +
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-12 meet-anlyst-section">' +
                                '<div class="analyst-footer">'+
                                '<div class="analyst-footer-content clearfix">' +
                                        '<ul class="nav-links">'+
                                            '{{#if results.LinkedInProfileID}}'+
                                                '{{#compare results.LinkedInProfileID.length "1" operator=">"}}'+
                                                '<li>'+
                                                    '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>'+
                                                '</li>'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#if results.TwitterHandleID}}'+
                                                '{{#compare results.TwitterHandleID.length "1" operator=">"}}'+
                                                '<li>'+
                                                    '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>'+
                                                '</li>'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#if results.EmailAddressLink.Url}}'+
                                                '{{#compare results.EmailAddressLink.Url null operator="!="}}'+
                                                    '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                        '</ul>'+
                                    
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +	
            '</div>' +
    '</div>',	
    'EventListingPage':
        '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{results.DateType}}">'+
            '<div class="events-wrap">'+
                '<div class="header clearfix">'+
                    '<div class="date">{{results.DateField}}</div>'+
                    '<div class="date month">{{results.MonthField}}</div>'+
                '</div>'+
                '<div class="content-wrap">'+
                    '<p class="country">'+
                        '{{#compare results.State null operator="!="}}{{results.State}}{{/compare}}{{#if results.State}}{{#if results.Country}},{{/if}}{{/if}} <strong>{{#compare results.Country null operator="!="}}{{results.Country}}{{/compare}}</strong>'+
                    '</p>'+
                    '<p><span class="type">{{results.EventType}}</span></p>'+
                    '<h3 class="title">{{results.Title}}</h3>'+
                    '{{#compare results.Presenters.length 0 operator=">"}}'+
                    '<div class="content clearfix">'+
                        '<div class="title-content">{{results.PresentersLabel}}</div>'+
                        '<div class="title-body">'+
                            '<ul class="clearfix">'+
                                '{{#each results.Presenters}}'+
                                '<li>{{this}}</li>'+
                                    '{{/each}}'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                    '{{/compare}}'+
                    '{{#compare results.Themes.length 0 operator=">"}}'+
                    '<div class="content clearfix">'+
                        '<div class="title-content">{{results.ThemeLabel}}</div>'+
                        '<div class="title-body">'+
                            '<ul class="clearfix">'+
                                '{{#each results.Themes}}'+
                                '<li>{{this}}</li>'+
                                    '{{/each}}'+
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                    '{{/compare}}'+
                '</div>'+
                '<div class="footer clearfix">'+
                    '{{#compare results.FullDetail null operator="!="}}' +
                        '{{#compare results.FullDetail.Url null operator="!="}}' +
                            '{{#compare results.FullDetail.Url.length "0" operator=">"}}' +
                            '<a href="{{results.FullDetail.Url}}" class="btn btn-default pull-left full-detail" target="{{results.FullDetail.Target}}">{{results.FullDetail.LinkText}}</a>'+
                        '{{/compare}}'+
                    '{{/compare}}'+
                    '{{/compare}}'+
                    '{{#compare results.StatusEnabled  true operator="=="}}'+
                        '{{#compare results.Register null operator="!="}}' +
                            '{{#compare results.Register.Url null operator="!="}}' +
                                '{{#compare results.Register.Url.length "0" operator=">"}}' + 
                                    '<a href="{{results.Register.Url}}" class="btn btn-primary pull-right register" target="{{results.Register.Target}}">{{results.EventCTAText}}</a>'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                    '{{/compare}}'+
                    '{{#compare results.StatusEnabled  false operator="=="}}'+
                        '{{#compare results.Register null operator="!="}}' +
                            '{{#compare results.Register.Url null operator="!="}}' +
                                '{{#compare results.Register.Url.length "0" operator=">"}}' + 
                                    '<a href="{{results.Register.Url}}" class="btn btn-primary pull-right register disabled" target="{{results.Register.Target}}">{{results.EventCTAText}}</a>'+
                                '{{/compare}}'+
                            '{{/compare}}'+
                        '{{/compare}}'+
                    '{{/compare}}'+
                '</div>'+
            '</div>'+
        '</div>',
    'EventpageListviewTemplate':
            '<div class="col-xs-12 events-section {{results.DateType}}"> <div class="events-wrap"> <div class="dates col-sm-2"> {{{results.DateRange}}} </div> <div class="content-wrap col-sm-10 col-md-7"> {{#if results.Title}} <h3 class="title">{{results.Title}}</h3> {{/if}} {{#if results.EventType}} <p class="type">{{results.EventType}}</p> {{/if}} {{#if results.Venue}} <div class="content clearfix venue"> <div class="title-content">{{results.VenueLabel}}</div> <div class="title-body"> {{results.Venue}} </div> </div> {{/if}} {{#if results.Country}} <div class="content clearfix location"> <div class="title-content">{{results.LocationLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#if results.State}} <li>{{results.State}}</li> {{/if}} <li>{{results.Country}}</li> </ul> </div> </div> {{/if}} {{#if results.Duration}} <div class="content clearfix duration"> <div class="title-content">{{results.DurationLabel}}</div> <div class="title-body"> {{results.Duration}} </div> </div> {{/if}} {{#if (or results.TimeZone results.TimeZone1 results.TimeZone2 results.TimeZone3 results.TimeZone4)}} <div class="content clearfix timezones"> <div class="title-content">{{results.TimeZoneLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#if results.TimeZone}}<li>{{results.TimeZone}}</li>{{/if}} {{#if results.TimeZone1}}<li>{{results.TimeZone1}}</li>{{/if}} {{#if results.TimeZone2}}<li>{{results.TimeZone2}}</li>{{/if}} {{#if results.TimeZone3}}<li>{{results.TimeZone3}}</li>{{/if}} {{#if results.TimeZone4}}<li>{{results.TimeZone4}}</li>{{/if}} </ul> </div> </div> {{/if}} {{#if results.Description}} <div class="content clearfix description"> {{{results.Description}}} </div> {{/if}} {{#compare results.Presenters.length 0 operator=">"}} <div class="content clearfix presenters"> <div class="title-content">{{results.PresentersLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#each results.Presenters}} <li>{{this}}</li> {{/each}} </ul> </div> </div> {{/compare}} {{#compare results.Themes.length 0 operator=">"}} <div class="content clearfix themes"> <div class="title-content">{{results.ThemeLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#each results.Themes}} <li>{{this}}</li> {{/each}} </ul> </div> </div> {{/compare}} <div class="content clearfix ctas"> {{#if results.Primarycta}} {{#if results.Primarycta.Url}} {{#compare results.Primarycta.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Primarycta.Url}}" class="btn btn-primary pull-left primarycta" target="{{results.Primarycta.Target}}">{{results.Primarycta.LinkText}}</a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Primarycta.Url}}" class="btn btn-primary pull-left primarycta disabled" target="{{results.Primarycta.Target}}">{{results.Primarycta.LinkText}}</a> {{/compare}} {{/compare}} {{/if}} {{/if}} {{#if results.Secondarycta}} {{#if results.Secondarycta.Url}} {{#compare results.Secondarycta.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Secondarycta.Url}}" class="btn btn-primary pull-left secondarycta" target="{{results.Secondarycta.Target}}">{{results.Secondarycta.LinkText}}</a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Secondarycta.Url}}" class="btn btn-primary pull-left secondarycta disabled" target="{{results.Secondarycta.Target}}">{{results.Secondarycta.LinkText}}</a> {{/compare}} {{/compare}} {{/if}} {{/if}} {{#if results.Ical}} {{#if results.Ical.Url}} {{#compare results.Ical.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Ical.Url}}" class="btn pull-left ical" target="{{results.Ical.Target}}"><span class="text">{{results.Ical.LinkText}}</span></a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Ical.Url}}" class="btn pull-left ical disabled" target="{{results.Ical.Target}}"><span class="text">{{results.Ical.LinkText}}</span></a> {{/compare}} {{/compare}} {{/if}} {{/if}} </div> {{#compare results.Tags.length 0 operator=">"}} <div class="content clearfix tags"> <div class="title-body"> <ul class="clearfix"> {{#each results.Tags}} <li>{{this}}</li> {{/each}} </ul> </div> </div> {{/compare}} </div> <div class="logo col-sm-offset-2 col-md-offset-0 col-md-3"> {{#if results.Logo}} <div class="content clearfix"> <img src="{{results.Logo}}" alt="event logo"> </div> {{/if}} </div> </div> </div>',
    'EventpageTileviewTemplate':
            '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{results.DateType}}"> <div class="events-wrap"> <div class="header clearfix"> {{{results.DateRange}}} {{#if results.Ical}} {{#if results.Ical.Url}} {{#compare results.Ical.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Ical.Url}}" class="btn pull-right ical" target="{{results.Ical.Target}}"><span class="text">{{results.Ical.LinkText}}</span></a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Ical.Url}}" class="btn pull-right ical disabled" target="{{results.Ical.Target}}"><span class="text">{{results.Ical.LinkText}}</span></a> {{/compare}} {{/compare}} {{/if}} {{/if}} </div> <div class="content-wrap clearfix"> {{#if results.Venue}} <div class="content clearfix venue"> <div class="title-content">{{results.VenueLabel}}</div> <div class="title-body"> {{results.Venue}} </div> </div> {{/if}} {{#if results.Country}} <div class="content clearfix location"> <div class="title-content">{{results.LocationLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#if results.State}} <li>{{results.State}}</li> {{/if}} <li>{{results.Country}}</li> </ul> </div> </div> {{/if}} {{#if results.Duration}} <div class="content clearfix duration"> <div class="title-content">{{results.DurationLabel}}</div> <div class="title-body"> {{results.Duration}} </div> </div> {{/if}} {{#if (or results.TimeZone results.TimeZone1 results.TimeZone2 results.TimeZone3 results.TimeZone4)}} <div class="content clearfix timezones"> <div class="title-content">{{results.TimeZoneLabel}}</div> <div class="title-body"> <ul class="clearfix"> {{#if results.TimeZone}}<li>{{results.TimeZone}}</li>{{/if}} {{#if results.TimeZone1}}<li>{{results.TimeZone1}}</li>{{/if}} {{#if results.TimeZone2}}<li>{{results.TimeZone2}}</li>{{/if}} {{#if results.TimeZone3}}<li>{{results.TimeZone3}}</li>{{/if}} {{#if results.TimeZone4}}<li>{{results.TimeZone4}}</li>{{/if}} </ul> </div> </div> {{/if}} {{#if results.Title}} <h3 class="content clearfix title">{{results.Title}}</h3> {{/if}} {{#if results.Description}} <div class="content clearfix description"> {{{results.Description}}} </div> {{/if}} </div> <div class="footer clearfix"> <div class="content clearfix ctas"> {{#if results.Primarycta}} {{#if results.Primarycta.Url}} {{#compare results.Primarycta.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Primarycta.Url}}" class="btn btn-primary pull-left primarycta" target="{{results.Primarycta.Target}}">{{results.Primarycta.LinkText}}</a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Primarycta.Url}}" class="btn btn-primary pull-left primarycta disabled" target="{{results.Primarycta.Target}}">{{results.Primarycta.LinkText}}</a> {{/compare}} {{/compare}} {{/if}} {{/if}} {{#if results.Secondarycta}} {{#if results.Secondarycta.Url}} {{#compare results.Secondarycta.Url.length "0" operator=">"}} {{#compare results.StatusEnabled "true" operator="=="}} <a href="{{results.Secondarycta.Url}}" class="btn btn-primary pull-left secondarycta" target="{{results.Secondarycta.Target}}">{{results.Secondarycta.LinkText}}</a> {{/compare}} {{#compare results.StatusEnabled "false" operator="=="}} <a href="{{results.Secondarycta.Url}}" class="btn btn-primary pull-left secondarycta disabled" target="{{results.Secondarycta.Target}}">{{results.Secondarycta.LinkText}}</a> {{/compare}} {{/compare}} {{/if}} {{/if}} </div> </div> </div> </div>',
    'EventpageModalTemplate': 
            '<div id="event-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button> </div> <div class="modal-body events-list"> </div> </div> </div> </div>',
    'ResourceList': '<div class="col-xs-12 col-sm-6 col-md-4 list-item-container">'+
                        '<div class="list-item">'+
                            '<div class="columns">'+
                                '{{#if SectorType}}'+
                                '<p class="category">'+
                                  '<strong>{{SectorType}}</strong>'+
                                '</p>'+
                                '{{/if}}'+
                                '<h2 class="poduct-brand-subheading">{{Title}}</h2>'+
                                '<span class="content-type">{{ContentType}}</span>'+
                                '<p class="date">30.03.2016</p>'+
                                '<div class="list-content">'+
                                    '{{#if Description}}'+
                                        '<p class="description">{{Description}}</p>'+
                                        '<span class="article-info"><em>Author:</em> <strong>{{Profiles}}</strong></span>'+
                                            '<span class="article-info"><em>Topic:</em> '+
                                                '<strong>{{Topics}}</strong>'+
                                            '</span>'+
                                    '{{/if}}'+
                                    '{{#if Video}}'+
                                        '<div class="video-container">'+
                                            '<a href="{{Video.url}}" class="video-link">'+
                                                '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}" />'+
                                                '<span class="play-icon icon-play"></span>'+
                                            '</a>'+
                                        '</div>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</div>'+
                            '{{#if PageURL}}' +
                                '<div class="btn-container">' +
                                  '<a role="button" href="{{PageURL}}" class="btn btn-primary" target="_blank">{{LinkText}}</a>' +
                                '</div>' +
                            '{{/if}}' +
                        '</div>'+
                    '</div>',
        'AccordianTemplate': '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                          '<h4 class="panel-title">'+
                            '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#{{results.FaqAccordionId}}" href="#{{results.Id}}{{results.FaqAccordionId}}{{results.Tabs}}" aria-expanded="false" aria-controls="{{results.Id}}">'+
                              '{{results.Title}}'+
                            '</a>'+
                          '</h4>'+
                        '</div>'+
                        '<div id="{{results.Id}}{{results.FaqAccordionId}}{{results.Tabs}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{results.Id}}" data-fetch="{{results.Id}}">'+
                          '<div class="panel-body">'+
                            '{{results.Description}}'+
                          '</div>'+
                        '</div>'+
                    '</div>',
        'SampleContent': '<div class="col-md-4 col-sm-6 col-xs-12">'+
                        '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">'+
                            '<div class="recomended-wrapper">'+
                                '<div class="recomend-content wrap-content">'+
                                    '<div class="content">'+
                                        '{{#compare results.SamplecontentProducts.length "0" operator=">"}}'+
                                            '<p class="type">'+
                                                '<span>{{results.SamplecontentProducts}}</span>'+
                                            '</p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL null operator="!="}}' +
                                            '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL.length "0" operator="=="}}' +
                                            '<h4><span>{{results.Title}}</span></h4>'+
                                        '{{/compare}}'+
                                        '<p class="publish">{{#if results.Profile}}{{results.ByKeyword}} <strong> {{{AnalystData results.Profile}}} </strong>{{/if}}{{#if results.PublicationDate}}{{results.PublicationDate}}{{/if}}</p>'+
                                        '{{#compare results.Publisher null operator="!="}}'+
                                            '<p><span>{{results.PublisherKeyword}} </span><strong>{{results.Publisher}}<strong></p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.Video null operator="!="}}'+
                                            '<div class="video-container">'+
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                            '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                            '<span class="play-icon icon-play"></span>'+
                                                        '</a>'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                            '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                                '<a href="{{results.Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0" target="_self">'+
                                                                    '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                    '<span class="play-icon icon-play"></span>'+
                                                                '</a>'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '<a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.Video.Url}}">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '</div>'+
                                        '{{/compare}}'+
                                        '{{#compare results.ContentTileImage null operator="!="}}'+
                                            '<div class="video-container">' +
                                                '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                            '</div>' +
                                        '{{/compare}}'+
                                        '{{#compare results.Description null operator="!="}}'+
                                            '<p class="description">{{results.Description}}</p>'+
                                        '{{/compare}}'+
                                    '</div>'+
                                    // '{{#compare results.Brand.length 0 operator=">"}}'+
                                    //         '<p class="brands">'+
                                    //             '{{#each results.Brand}}'+
                                    //                 '<span>{{this}}</span>'+
                                    //             '{{/each}}'+
                                    //         '</p>'+
                                    // '{{/compare}}'+
                                    '{{#compare results.TopicURLS.length 0 operator=">"}}'+
                                        '<p class="topics">'+
                                            '{{results.TopicKeyword}} '+
                                            '{{#each results.TopicURLS}}'+
                                                '<strong><a href="{{this.TopicResourceLink}}">{{this.TopicName}}</a></strong>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                    '{{#compare results.ShowSubSectorOnSampleContentPage true operator="=="}}'+
                                            '{{#compare results.SubSectorsUrlDetails.length 0 operator=">"}}'+
                                                '<p class="SubSectors">'+
                                                    '<span>{{results.SubSectorKeyword}}</span>'+
                                                    '{{#each results.SubSectorsUrlDetails}}'+
                                                        '<span>'+
                                                            '<a href="{{this.Value}}">{{this.Key}}</a>'+
                                                        '</span>'+
                                                    '{{/each}}'+
                                                '</p>'+
                                            '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="footer">'+
                                    '{{#compare results.Price null operator="!="}}'+
                                            '<div class="recomended-currency"><strong>{{results.Price}}</strong></div>'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL null operator="!="}}' +
                                        '{{#compare results.PageURL.length "0" operator=">"}}' +
                                            '{{#if results.HasExternalLink}}'+
                                                '{{#compare results.HasExternalLink true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#compare results.HasExternalLink false operator="=="}}'+
                                                '{{#compare results.ShowForm false operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn show-content-first-time" data-firstcontent="true" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.ShowForm true operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a data-show-register="true" class="btn btn-primary show-register-form full-width-btn" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+    
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL.length "0" operator="=="}}' +
                                        '<div class="btn-container text-right">'+
                                            '<a class="btn btn-primary" disabled>{{results.LinkText}}</a>'+
                                        '</div>'+
                                    '{{/compare}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
                    'SampleContentNewCo': '<div class="">'+
                        '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">'+
                            '<div class="recomended-wrapper">'+
                                '<div class="recomend-content wrap-content row">'+
									'{{#compare results.Video null operator="!="}}'+
                                        '<div class="col-sm-4 col-md-4">'+
                                            '{{#if results.HasExternalLink}}'+
                                                '{{#compare results.HasExternalLink true operator="=="}}'+
                                                    '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                        '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                        '<span class="play-icon icon-play"></span>'+
                                                    '</a>'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#compare results.HasExternalLink false operator="=="}}'+
                                                '{{#compare results.ShowForm false operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '<a href="{{results.Video.Url}}" class="video-link show-content-first-time" data-firstcontent="true" tabindex="0" target="_self">'+
                                                                '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                                '<span class="play-icon icon-play"></span>'+
                                                            '</a>'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.ShowForm true operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '<a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.Video.Url}}">'+
                                                            '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                            '<span class="play-icon icon-play"></span>'+
                                                        '</a>'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                            '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                            '<span class="play-icon icon-play"></span>'+
                                                        '</a>'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_self">'+
                                                            '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                            '<span class="play-icon icon-play"></span>'+
                                                        '</a>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '</div>'+
                                    '{{/compare}}'+
                                    '{{#compare results.Video null operator="=="}}'+
                                        '<div class="col-sm-4 col-md-4 img-container">'+
                                        '{{#compare results.PageURL null operator="!="}}'+
                                            '{{#compare results.PageURL.length "0" operator=">"}}'+
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<a href="{{results.PageURL}}" target="_blank">'+
                                                            '{{#compare results.ContentTileImage null operator="!="}}'+
                                                                '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                                            '{{/compare}}'+
                                                            '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                    '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                            '</a>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<a href="{{results.PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_self">'+
                                                                '{{#compare results.ContentTileImage null operator="!="}}'+
                                                                    '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                                                '{{/compare}}'+
                                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                    '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                        '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                                '</a>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">'+
                                                                '{{#compare results.ContentTileImage null operator="!="}}'+
                                                                    '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                                                '{{/compare}}'+
                                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                    '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                        '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                                '</a>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<a href="{{results.PageURL}}" target="_self">'+
                                                                '{{#compare results.ContentTileImage null operator="!="}}'+
                                                                    '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                                                '{{/compare}}'+
                                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                    '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                        '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                                '</a>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<a href="{{results.PageURL}}" target="_blank">'+
                                                            '{{#compare results.ContentTileImage null operator="!="}}'+
                                                                '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                                            '{{/compare}}'+
                                                            '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                                    '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL.length "0" operator="=="}}'+
                                            '{{#compare results.ContentTileImage null operator="!="}}'+
                                                '<img src="{{results.ContentTileImage.Url}}" alt="{{results.ContentTileImage.Alt}}">'+
                                            '{{/compare}}'+
                                            '{{#compare results.ContentTileImage null operator="=="}}'+
                                                '{{#compare results.ContentTileImage null operator="=="}}'+
                                                    '<img src="{{results.Image}}" alt="{{results.Title}}" class="img-responsive" />'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '</div>'+
                                    '{{/compare}}'+
                                     '<div class="content col-sm-8 col-md-8">'+
                                        '{{#compare results.SamplecontentProducts.length "0" operator=">"}}'+
                                            '<p class="type">'+
                                                '<span>{{results.SamplecontentProducts}}</span>'+
                                            '</p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL null operator="!="}}' +
                                            '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                '{{#if results.HasExternalLink}}'+
                                                    '{{#compare results.HasExternalLink true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/if}}'+
                                                '{{#compare results.HasExternalLink false operator="=="}}'+
                                                    '{{#compare results.ShowForm false operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" class="show-content-first-time" data-firstcontent="true" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.ShowForm true operator="=="}}'+
                                                        '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4 class="gated-content"><a data-show-register="true" class="show-register-form" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                            '{{#if results.LinkText}}'+
                                                                '<h4><a href="{{results.PageURL}}" target="_self">{{results.Title}}</a></h4>'+
                                                            '{{/if}}'+
                                                        '{{/compare}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<h4><a href="{{results.PageURL}}" target="_blank">{{results.Title}}</a></h4>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                        '{{#compare results.PageURL.length "0" operator="=="}}' +
                                            '<h4><span>{{results.Title}}</span></h4>'+
                                        '{{/compare}}'+
                                        '<p class="publish">{{#if results.Profile}}{{results.ByKeyword}}' +
                                            '<strong> {{{AnalystData results.Profile}}} </strong>' +
                                            '{{/if}}{{#if results.PublicationDate}}{{results.PublicationDate}}{{/if}}' +
                                        '</p>'+
                                        '{{#compare results.Publisher null operator="!="}}'+
                                            '<p><span>{{results.PublisherKeyword}} </span><strong>{{results.Publisher}}</strong></p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.Description null operator="!="}}'+
                                            '<p class="description">{{results.Description}}</p>'+
                                        '{{/compare}}'+
                                    '</div>'+
                                    '{{#compare results.ShowSubSectorOnSampleContentPage true operator="=="}}'+
                                            '{{#compare results.SubSectorsUrlDetails.length 0 operator=">"}}'+
                                                '<p class="SubSectors">'+
                                                    '<span>{{results.SubSectorKeyword}}</span>'+
                                                    '{{#each results.SubSectorsUrlDetails}}'+
                                                        '<span>'+
                                                            '<a href="{{this.Value}}">{{this.Key}}</a>'+
                                                        '</span>'+
                                                    '{{/each}}'+
                                                '</p>'+
                                            '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="footer">'+
                                    '{{#compare results.Price null operator="!="}}'+
                                            '<div class="recomended-currency"><strong>{{results.Price}}</strong></div>'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL null operator="!="}}' +
                                        '{{#compare results.PageURL.length "0" operator=">"}}' +
                                            '{{#if results.HasExternalLink}}'+
                                                '{{#compare results.HasExternalLink true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+
                                                '{{/compare}}'+
                                            '{{/if}}'+
                                            '{{#compare results.HasExternalLink false operator="=="}}'+
                                                '{{#compare results.ShowForm false operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn show-content-first-time" data-firstcontent="true" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.ShowForm true operator="=="}}'+
                                                    '{{#compare results.IsAuthenticatedUser false operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a data-show-register="true" class="btn btn-primary show-register-form full-width-btn" data-toggle="modal" data-modal="#formRegistration" data-url="{{results.PageURL}}">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                    '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                        '{{#if results.LinkText}}'+
                                                            '<div class="btn-container text-right">'+
                                                                '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                            '</div>'+
                                                        '{{/if}}'+
                                                    '{{/compare}}'+
                                                '{{/compare}}'+
                                                '{{#compare results.IsAuthenticatedUser true operator="=="}}'+
                                                    '{{#if results.LinkText}}'+
                                                        '<div class="btn-container text-right">'+
                                                            '<a href="{{results.PageURL}}" class="btn btn-primary btn-ecommerce full-width-btn" target="_blank">{{results.LinkText}}</a>'+
                                                        '</div>'+
                                                    '{{/if}}'+    
                                                '{{/compare}}'+
                                            '{{/compare}}'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                    '{{#compare results.PageURL.length "0" operator="=="}}' +
                                        '<div class="btn-container text-right">'+
                                            '<a class="btn btn-primary" disabled>{{results.LinkText}}</a>'+
                                        '</div>'+
                                    '{{/compare}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
            'Product':
                '<div class="col-xs-12 col-sm-6 col-md-4">'+
                '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">'+
                    '<div class="products">'+
                        '<div class="wrap-content">'+
                            '<div class="heading">'+
                                '<div class="heading-content">'+
                                    '<p class="category">'+
                                        '{{#each results.SectorTags}}'+
                                            '<strong>{{this}}</strong>'+
                                        '{{/each}}'+
                                    '</p>'+
                                    '<h4 class={{results.SubSiteTheme}}>{{results.Title}}</h4>'+
                                '</div>'+
                            '</div>'+
                            '<div class="body">'+
                                '<p>{{results.Description}}</p>'+
                                '<ul>'+
                                    '{{#each results.Benefits}}'+
                                    '<li class="icon-tick">{{this}}</li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<div class="button-links">'+
                            '<div class="button-links-wrap row">'+
                                '<div class="col-xs-6">'+
                                    '{{#compare results.PageURL null operator="!="}}' +
                                        '{{#compare results.PageURL.length "0" operator=">"}}' +
                                            '<a href="{{results.PageURL}}" target="{{results.LinkTarget}}" class="btn btn-default">{{results.DetailText}}</a>'+
                                        '{{/compare}}'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="col-xs-6">'+
                                    '{{#if results.ProductSearchCTAType}}' +
                                        '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="=="}}'+    
                                            '{{#if (splitURL results.SalesforceLink.Url "registration")}}'+
                                                    '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>'+
                                            '{{else}}'+
                                                '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">'+
                                                    '{{results.SearchCTAName}}'+
                                                '</a>'+
                                            '{{/if}}'+                                     
                                        '{{/compare}}'+
                                        '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="!="}}'+ 
                                            '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">'+
                                                '{{results.SearchCTAName}}'+
                                            '</a>'+
                                        '{{/compare}}'+
                                    '{{else}}'+                                 
                                    '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>'+
                                    '{{/if}}'+  
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>',
            'ProductNewCo':
                '<div>' +
                    '<div class="list-items" data-fetch="{{results.Id}}" data-type="{{results.Category}}">' +
                        '<div class="recomended-wrapper products">' +
                            '<div class="recomend-content wrap-content row">' +
                                '<div class="col-md-4">' +
                                    '<div class="image-gradient">' +
                                        '{{results.Title}}' +
                                    '</div>' +
                                '</div>' +
                                '<div class="wrap-content col-md-8">' +
                                    '<div class="body">' +
                                        '<p>{{results.Description}}</p>' +
                                        '<ul>' +
                                            '{{#each results.Benefits}}' +
                                            '<li class="icon-tick">{{this}}</li>' +
                                            '{{/each}}' +
                                        '</ul>' +
                                    '</div>' +
                                    '<div class="footer clearfix">' +
                                        '<div class="row">' +
                                            '<div class="col-xs-6">' +
                                                '{{#compare results.PageURL null operator="!="}}' +
                                                '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                '<a href="{{results.PageURL}}" target="{{results.LinkTarget}}" class="btn btn-default">{{results.DetailText}}</a>' +
                                                '{{/compare}}' +
                                                '{{/compare}}' +
                                            '</div>' +
                                            '<div class="col-xs-6">' +
                                                '{{#if results.ProductSearchCTAType}}' +
                                                '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="=="}}' +
                                                '{{#if (splitURL results.SalesforceLink.Url "registration")}}' +
                                                '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>' +
                                                '{{else}}' +
                                                '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">' +
                                                    '{{results.SearchCTAName}}' +
                                                '</a>' +
                                                '{{/if}}' +
                                                '{{/compare}}' +
                                                '{{#compare results.ProductSearchCTAType "formRequestATrial"  operator="!="}}' +
                                                '<a href="javascript:void(0)" data-toggle="modal" data-modal="#{{results.ProductSearchCTAType}}" data-productid="{{results.FreeTrialLink.ProductGuid}}" class="btn btn-primary free-trial wffm-elq-form-btn">' +
                                                    '{{results.SearchCTAName}}' +
                                                '</a>' +
                                                '{{/compare}}' +
                                                '{{else}}' +
                                                '<a href="{{results.SalesforceLink.Url}}" target="{{results.SalesforceLink.Target}}" class="btn btn-primary">{{results.SearchCTAName}}</a>' +
                                                '{{/if}}' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>',
                'SearchTemplate': '<div class="product-results" data-pagesize="{{results.DefaultItemCount}}">'+
                                    '{{#if results.ProductTitle}}'+
                                       '<h2> <strong>{{results.ProductTitle}}</strong></h2>'+
                                       '{{/if}}'+
                                        '<div class="row list">'+
                                            '{{{results.Content}}}'+
                                        '</div>'+
                                        '{{#compare results.ShowMoreFlag false operator="!="}}'+
                                        '<div class="text-center">'+
                                            '<a href="#" class="btn-showMore">'+
                                                '<span class="more">{{results.ShowMoreText}}</span>'+
                                                '<span class="less">{{results.ShowLessText}}</span>'+
                                            '</a>'+
                                        '</div>'+
                                        '{{/compare}}'+
                                   '</div>',
                            'Specialist': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                                '<div class="list-items">'+
                                                    '<div class="analyst-list-container {{results.Type}}">'+
                                                        '<div class="meet-anlyst-section">'+
                                                            '<div class="wrap-content">'+
                                                                '<div class="anlyst-heading">'+
                                                                    '<div class="analyst-heading-content">'+
                                                                        '<div class="analyst-details">'+
                                                                            '<span class="analyst-type">{{results.Type}}</span>'+
                                                                            '<h4>{{results.Name}}</h4>'+
                                                                            '<h5>{{results.JobTitle}}</h5>'+
                                                                            '{{#if results.Country}}'+
                                                                                '<p class="location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}} {{results.Country}}</p>'+
                                                                            '{{/if}}'+
                                                                        '</div>'+
                                                                        '<div class="analyst-img">'+
                                                                            '<img src="{{results.Image}}" alt="@Model.Name" />'+
                                                                        '</div>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                                '<div class="analyst-description">'+
                                                                    '{{#compare results.Specialization.length "0" operator=">"}}'+
                                                                    '<p class="heading"><em>{{results.FirstName}}</em> {{results.SpecializationText}}</p>'+
                                                                    '<ul class="yellow-bullets">'+
                                                                        '{{#each results.Specialization}}'+
                                                                        '<li>{{this}}</li>'+
                                                                        '{{/each}}'+
                                                                    '</ul>'+
                                                                    '{{/compare}}'+
                                                                    '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>'+
                                                                    '{{#compare results.ProductDetails.length "0" operator=">"}}'+
                                                                        '<ul class="track-analyst clearfix">'+
                                                                            '{{#each results.ProductDetails}}' +
                                                                                '<li><a href="{{this.Value}}">{{this.Key}}</a></li>' +
                                                                            '{{/each}}' +
                                                                        '</ul>'+
                                                                    '{{/compare}}'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<div class="analyst-footer">'+
                                                                '<div class="analyst-footer-content clearfix">'+
                                                                    '<ul class="nav-links">'+
                                                                        '{{#if results.LinkedInProfileID}}'+
                                                                            '{{#compare results.LinkedInProfileID.length "1" operator=">"}}'+
                                                                            '<li>'+
                                                                                '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>'+
                                                                            '</li>'+
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                        '{{#if results.TwitterHandleID}}'+
                                                                            '{{#compare results.TwitterHandleID.length "1" operator=">"}}'+
                                                                            '<li>'+
                                                                                '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>'+
                                                                            '</li>'+
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                        '{{#if results.EmailAddressLink}}'+
                                                                            '{{#compare results.EmailAddressLink.Url.length "0" operator=">"}}'+
                                                                                '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                                                            '{{/compare}}'+
                                                                        '{{/if}}'+
                                                                    '</ul>'+
                                                                    '<a href="{{results.PageURL}}" target="{{results.LinkTarget}}" class="btn btn-primary pull-right">{{results.SeeFullProfileLText}}</a>'+
                                                                '</div>'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                           '</div>',
                            'Event': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                    '<div class="list-items">'+
                                            '<div class="events-wrap">'+
                                                '<div class="wrap-content">'+
                                                    '<div class="header clearfix">'+
                                                        '<div class="date-field">{{results.EventDate}}</div>'+
                                                    '</div>'+
                                                    '<div class="content-wrap">'+
                                                        '<p class="country">'+
                                                            '<span>{{results.State}}</span>'+
                                                            '{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}}'+
                                                            '<strong> {{results.Country}}</strong>'+
                                                        '</p>'+
                                                        '<p><span class="type">{{results.EventType}}</span></p>'+
                                                        '<h3 class="title">{{results.Title}}</h3>'+
                                                            '{{#compare results.Presenters.length 0 operator=">"}}'+
                                                                '<div class="content clearfix">'+
                                                                    '<div class="title-content">'+
                                                                        '{{results.PresentersLabel}}'+
                                                                    '</div>'+
                                                                    '<div class="title-body">'+
                                                                        '<ul class="clearfix">'+
                                                                            '{{#each results.Presenters}}'+
                                                                            '<li>{{this}}</li>'+
                                                                            '{{/each}}'+
                                                                        '</ul>'+
                                                                    '</div>'+
                                                                '</div>'+
                                                            '{{/compare}}'+
                                                            '{{#compare results.Themes.length 0 operator=">"}}'+
                                                            '<div class="content clearfix">'+
                                                                '<div class="title-content">'+
                                                                    '{{results.ThemeLabel}}'+
                                                                '</div>'+
                                                                '<div class="title-body">'+
                                                                    '<ul class="clearfix">'+
                                                                        '{{#each results.Themes}}'+
                                                                            '<li>{{this}}</li>'+
                                                                        '{{/each}}'+
                                                                    '</ul>'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '{{/compare}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="footer clearfix">'+
                                                        '{{#compare results.FullDetail null operator="!="}}' +
                                                            '{{#compare results.FullDetail.Url null operator="!="}}' +
                                                                '{{#compare results.FullDetail.Url.length "0" operator=">"}}' + 
                                                                    '<a href="{{results.FullDetail.Url}}" target="{{results.FullDetail.Target}}" class="btn btn-default full-detail pull-left">'+
                                                                        '{{results.FullDetail.LinkText}}'+
                                                                    '</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+
                                                        '{{#compare results.StatusEnabled  true operator="=="}}'+
                                                            '{{#compare results.Register null operator="!="}}' +
                                                                '{{#compare results.Register.Url null operator="!="}}' +
                                                                    '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                        '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right">'+
                                                                            '{{results.EventCTAText}}'+
                                                                        '</a>'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+ 
                                                        '{{#compare results.StatusEnabled  false operator="=="}}'+  
                                                            '{{#compare results.Register null operator="!="}}' +
                                                                '{{#compare results.Register.Url null operator="!="}}' +
                                                                    '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                        '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right disabled">'+
                                                                            '{{results.EventCTAText}}'+
                                                                        '</a>'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '{{/compare}}'+ 
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>',
                                        'SpecialistNewCo': '<section class="analyst-views newco-analyst-views">' +
                                        '<div class="row">' +
                                        '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 image ">' +
                                        '<div class="analyst-img">' +
                                        '<a href="{{results.PageURL}}">  <img src="{{results.Image}}" alt="{{results.Name}}" /></a>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 content">' +
                                        '<div class="row">' +
                                        '<div class="col-md-9">' +
                                        '<div class="meet-anlyst-section">' +

                                        '<div class="anlyst-heading">' +
                                        '<div class="analyst-heading-content">' +
                                        '<div class="analyst-details">' +
                                        '<span class="analyst-type">{{results.Type}}</span>' +
                                        '<a href="@Model.PageURL"><h4>{{results.Name}}</h4></a>' +
                                        '<h5>' +
                                        '<span class="designation">{{results.JobTitle}}</span>' +
                                        '<span class="newco-location">{{results.State}}{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}} {{results.Country}} </span>' +
                                        '<span class="experiance">{{results.YearsOfExperience}}' +
                                        '+{{results.ExperienceText}}</span>' +
                                        '</h5>' +
                                        '</div>' +

                                        '</div>' +
                                        '</div>' +



                                        '</div>' +
                                        '</div>' +
                                        '<div class="col-md-3 meet-anlyst-section">' +
                                        '<div class="analyst-footer">' +
                                        '<div class="analyst-footer-content clearfix">' +

                                        '<ul class="nav-links">' +
                                        '{{#if results.LinkedInProfileID}}' +
                                        '{{#compare results.LinkedInProfileID.length "1" operator=">"}}' +
                                        '<li>' +
                                        '<a class="addthis_button_linkedin_follow" addthis:userid="{{results.LinkedInProfileID}}"></a>' +
                                        '</li>' +
                                        '{{/compare}}' +
                                        '{{/if}}' +
                                        '{{#if results.TwitterHandleID}}' +
                                        '{{#compare results.TwitterHandleID.length "1" operator=">"}}' +
                                        '<li>' +
                                        '<a class="addthis_button_twitter_follow" addthis:userid="{{results.TwitterHandleID}}"></a>' +
                                        '</li>' +
                                        '{{/compare}}' +
                                        '{{/if}}' +
                                        '{{#if results.EmailAddressLink}}' +
                                        '{{#compare results.EmailAddressLink.Url.length "0" operator=">"}}' +
                                        '<li><a href="{{results.EmailAddressLink.Url}}" class="icon-email"></a></li>' +
                                        '{{/compare}}' +
                                        '{{/if}}' +
                                        '</ul>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '<div class="row discription">' +
                                        '<div class="col-md-12">' +
                                        '{{#compare results.Specialization.length "0" operator=">"}}' +
                                        '<strong>' +
                                        'Specialities include ' +
                                        '</strong>' +
                                        '{{#each results.Specialization}}' +
                                        '{{this}} ' +
                                        '{{/each}}' +

                                        '{{/compare}}' +
                                        '</div>' +
                                        '<div class="col-md-12">' +
                                        '{{#compare results.ProductDetails.length "0" operator=">"}}' +
                                        '<strong>' +
                                        'Product covered include ' +
                                        '</strong>' +
                                        '{{#each results.ProductDetails}}' +
                                        '{{this.Key}}' +
                                        '{{/each}}' +

                                        '{{/compare}}' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</section>',                
                        'EventNewCo': '<div class="">'+
                                            '<div class="list-items">'+
                                                '<div class="recomended-wrapper">'+
                                                    '<div class="recomend-content wrap-content row" style="height: auto;">'+
                                                        '<div class="col-md-4">'+
                                                            '{{#if results.Image}}'+
                                                                '<img src="results.Image" alt="results.Title" class="img-responsive" />'+
                                                            '{{else}}'+
                                                                '<div class="image-gradient">'+
                                                                    '<p><span class="type">{{results.EventType}}</span></p>'+
                                                                    '<h3 class="title">{{results.Title}}</h3>'+
                                                                '</div>'+
                                                            '{{/if}}'+
                                                        '</div>'+
                                                        '<div class="events-wrap col-md-8">'+
                                                            '<div class="wrap-content">'+
                                                                '<div class="header clearfix">'+
                                                                    '<p><span class="type">{{results.EventType}}</span></p>'+
                                                                    '<h3 class="title">{{results.Title}}</h3>'+
                                                                '</div>'+
                                                                '<div class="content-wrap">'+
                                                                    '<div class="content clearfix">'+
                                                                        '<div class="date-field">{{results.EventDate}}</div>'+
                                                                        '<div class="seperator"> | </div>'+
                                                                        '<p class="country">'+
                                                                            '<span>{{results.State}}</span>'+
                                                                            '{{#if results.Country}}{{#if results.State}},{{/if}}{{/if}}'+
                                                                            '<span>{{results.Country}}</span>'+
                                                                        '</p>'+
                                                                        '{{#compare results.Presenters.length 0 operator=">"}}'+
                                                                            '<div class="seperator"> | </div>'+
                                                                            '<div class="title-content">'+
                                                                                '{{results.PresentersLabel}}'+
                                                                            '</div>'+
                                                                            '<div class="title-body">'+
                                                                                '<ul class="clearfix">'+
                                                                                    '{{#each results.Presenters}}'+
                                                                                    '<li>{{this}}</li>'+
                                                                                    '{{/each}}'+
                                                                                '</ul>'+
                                                                            '</div>'+
                                                                        '{{/compare}}'+
                                                                    '</div>'+
                                                                    '{{#compare results.Themes.length 0 operator=">"}}'+
                                                                        '<div class="content clearfix">'+
                                                                            '<div class="title-content">'+
                                                                                '{{results.ThemeLabel}}'+
                                                                            '</div>'+
                                                                            '<div class="title-body">'+
                                                                                '<ul class="clearfix">'+
                                                                                    '{{#each results.Themes}}'+
                                                                                        '<li>{{this}}</li>'+
                                                                                    '{{/each}}'+
                                                                                '</ul>'+
                                                                            '</div>'+
                                                                        '</div>'+
                                                                    '{{/compare}}'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<div class="footer clearfix">'+
                                                                '{{#compare results.FullDetail null operator="!="}}' +
                                                                    '{{#compare results.FullDetail.Url null operator="!="}}' +
                                                                        '{{#compare results.FullDetail.Url.length "0" operator=">"}}' + 
                                                                            '<a href="{{results.FullDetail.Url}}" target="{{results.FullDetail.Target}}" class="btn btn-default full-detail pull-left">'+
                                                                                '{{results.FullDetail.LinkText}}'+
                                                                            '</a>'+
                                                                        '{{/compare}}'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                                '{{#compare results.StatusEnabled  true operator="=="}}'+
                                                                    '{{#compare results.Register null operator="!="}}' +
                                                                        '{{#compare results.Register.Url null operator="!="}}' +
                                                                            '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                                '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right">'+
                                                                                    '{{results.EventCTAText}}'+
                                                                                '</a>'+
                                                                            '{{/compare}}'+
                                                                        '{{/compare}}'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                                '{{#compare results.StatusEnabled  false operator="=="}}'+  
                                                                    '{{#compare results.Register null operator="!="}}' +
                                                                        '{{#compare results.Register.Url null operator="!="}}' +
                                                                            '{{#compare results.Register.Url.length "0" operator=">"}}' +
                                                                                '<a href="{{results.Register.Url}}" target="_blank" class="btn btn-primary register pull-right disabled">'+
                                                                                    '{{results.EventCTAText}}'+
                                                                                '</a>'+
                                                                            '{{/compare}}'+
                                                                        '{{/compare}}'+
                                                                    '{{/compare}}'+
                                                                '{{/compare}}'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>',

                                'Other': '<div class="col-xs-12 col-sm-6 col-md-4">'+
                                            '<div class="list-items">'+
                                                '<div class="others-wrapper">'+
                                                    '<div class="wrap-content">'+
                                                        '<div class="content">'+
                                                                '<h4>{{results.Title}}</h4>'+
                                                                '{{#if results.Description}}'+
                                                                    '<p class="description">'+
                                                                        '{{results.Description}}'+
                                                                    '</p>'+
                                                                '{{/if}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '<div class="footer">'+
                                                        '<div class="btn-container text-right">'+
                                                            '{{#compare results.PageURL null operator="!="}}'+
                                                                '{{#compare results.PageURL.length "0" operator=">"}}' +
                                                                    '<a href="{{results.PageURL}}" class="btn btn-primary" target="{{results.LinkTarget}}">{{results.DetailText}}</a>'+
                                                                '{{/compare}}'+
                                                            '{{/compare}}'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>',
                                        'SiteWideSearch' : '{{#each Results}}'+
                                        '<div class="search-tile-article artcl-list" boxid="{{ItemId}}">'+
                                            '<div class="left-artcl">'+
                                                '{{#if PageUrl}}'+
                                                '<a href="{{PageUrl}}" target="_blank">'+
                                                    '{{#if Image }}'+
                                                    '<img src="{{Image}}">'+
                                                    '{{else}}'+
                                                    '<img src="/Static/images/tech/Article-List-FallBack-Image.jpg">'+
                                                    '{{/if}}'+
                                                '</a>'+
                                               '{{else if this.Image }}'+
                                                '<img src="{{Image}}">'+
                                                '{{else}}'+
                                                '<img src="/Static/images/tech/Article-List-FallBack-Image.jpg">'+
                                                '{{/if}}'+
                                            '</div>'+
                                            '<div class="right-artcl">'+
                                                '{{#if PageUrl}}'+
                                                '<p class="artcl-headline"><a href="{{PageUrl}}" target="_blank"> {{Title}} </a></p>'+
                                                '{{else if Title}}'+
                                                '<p class="artcl-headline">{{Title}}</p>'+
                                                '{{/if}}'+
												'{{#if SubtitleLength}}'+
                                                '<ul class="artcl-info list-unstyled"><li>{{SubTitle}}<li></ul>'+
												'{{/if}}'+
                                                '<p class="artcl-description desktop">'+
                                                    '{{Description}}'+
                                                    '{{#if PageUrl}}'+
                                                    '<a href="{{PageUrl}}" target="_blank" class="artcl-read-more">{{LinkText}} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> </a>'+
                                                    '{{/if}}'+
                                                '</p>'+
                                            '</div>'+
											'<p class="artcl-description mobile">'+
								'{{Description}}'+
								'{{#if PageUrl}}'+
								'<a href="{{PageUrl}}" target="_blank" class="artcl-read-more">{{LinkText}} <i class="fa fa-long-arrow-right" aria-hidden="true"></i> </a>'+
								'{{/if}}'+
							'</p>'+
                                        '</div>'+
                                        '{{/each}}'

}
}(this, jQuery, 'INFORMA'));
