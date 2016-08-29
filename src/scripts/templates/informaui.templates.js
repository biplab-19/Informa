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
    'articleListItems':
        '{{#each Articles}}'+
            '<li>'+
                '<div class="col-xs-12">'+
                    '<div class="recomended-wrapper" data-fetch="{{Id}}">'+
                        '<div class="recomend-content">'+
                            '<div class="content">'+
                                '{{#compare SectorTags.length 0 operator=">"}}'+
                                    '<p>'+
                                        '{{#each SectorTags}}'+
                                            '<span class="category">'+
                                                '<strong>{{this}}</strong>'+
                                            '</span>'+
                                        '{{/each}}'+
                                    '</p>'+
                                '{{/compare}}'+
                                '{{#compare Product null operator="!="}}'+
                                    '<span class="type">'+
                                        '<span>{{Product}}</span>'+
                                    '</span>'+
                                '{{/compare}}'+  
                                '<h4>{{Title}}</h4>'+
                                '<p class="publish">{{ByKeyword}} <strong>{{Profile}}</strong>{{PublicationDate}}</p>'+
                                '{{#compare Description null operator="!="}}'+
                                    '<p class="description">{{Description}}</p>'+
                                '{{/compare}}'+
                                '{{#compare Video null operator="!="}}'+
                                    '<div class="video-container">'+
                                        '<a href="{{Video.Url}}" class="video-link" tabindex="0">'+
                                            '<img src="{{Video.ImageSrc}}" alt="{{Video.ImageAltText}}">'+
                                            '<span class="play-icon icon-play"></span>'+
                                        '</a>'+
                                    '</div>'+
                                '{{/compare}}'+
                            '</div>'+
                            '{{#compare Topic.length 0 operator=">"}}'+
                                '<p class="topics">'+
                                    '{{TopicKeyword}} '+
                                    '{{#each TopicURLS}}'+
                                        '<strong><a href="{{TopicURLS.TopicResourceLink}}">{{TopicURLS.TopicName}}</a></strong>'+
                                    '{{/each}}'+
                                '</p>'+
                            '{{/compare}}'+
                        '</div>'+
                        '<div class="footer">'+
                            '{{#compare Price null operator="!="}}'+
                                    '<div class="recomended-currency"><strong>{{Price}}</strong></div>'+
                            '{{/compare}}'+
                            '{{#if EcommerceLink}}'+
                                '{{#if EcommerceLink.Url}}'+
                                    '<div class="btn-container text-right">'+
                                        '<a href="{{EcommerceLink.Url}}" class="btn btn-default" target="{{EcommerceLink.Target}}">{{EcommerceLink.LinkText}}</a>'+
                                    '</div>'+
                                '{{/if}}'+  
                            '{{/if}}'+
                            '{{#if LinkText}}'+
                                '<div class="btn-container text-right">'+
                                    '<a href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>'+
                                '</div>'+
                            '{{/if}}'+
                        '</div>'+
                    '</div>'+
                '</div>'+    
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
                          '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>' +
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
                                        '<p class="country">'+
                                            '{{#compare State null operator="!="}}<span>{{State}}</span>{{/compare}}{{#if State}}{{#if Country}},{{/if}}{{/if}}{{#compare Country null operator="!="}}<span class="bold">{{Country}}</span>{{/compare}}</p>'+
                                    '</div>'+
                                    '<div class="content-wrap">'+
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
                                    '{{#if Register}}<a  href="{{Register.Url}}" class="btn btn-default register" target="{{Register.Target}}">{{Register.LinkText}}</a>{{/if}}'+
                                    '{{#if FullDetail}}<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>{{/if}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '{{/each}}'+
                    '</div>'+
                '</div>'+
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
                                                            '<h5>{{Type}}, {{JobTitle}}</h5>' +
                                                            '{{#if Country}}'+
                                                            '<p class="location">{{State}}, {{Country}}</p>' +
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
                                                    '<p class="heading"><em>{{FirstName}}</em> {{SpecializationText}}</p>' +
                                                    '<ul class="yellow-bullets">' +
                                                        '{{#each Specialization}}' +
                                                            '<li>{{this}}</li>' +
                                                        '{{/each}}' +
                                                    '</ul>' +
                                                    '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                                    '{{#compare MultipleProducts 0 operator=">"}}' +
                                                        '<ul class="track-analyst clearfix">' +
                                                            '{{#each MultipleProducts}}' +
                                                                '<li><a href="#">{{this}}</a></li>' +
                                                            '{{/each}}' +
                                                        '</ul>' +
                                                    '{{/compare}}' +
                                                '</div>' +
                                                '<div class="analyst-footer">' +
                                                    '<div class="analyst-footer-content clearfix">' +
                                                        '<ul class="nav-links">' +
                                                            '{{#compare TwitterLink null operator="!="}}' +
                                                                '<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                            '{{/compare}}' +
                                                            '{{#compare LinkedinLink null operator="!="}}' +
                                                                '<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                            '{{/compare}}' +
                                                            '{{#compare EmailAddressLink null operator="!="}}' +
                                                                '<li><a href="mailto:{{EmailAddressLink}}" class="icon-email"></a></li>' +
                                                            '{{/compare}}' +
                                                        '</ul>' +
                                                        '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
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
                'Analysts': 
                '{{#each results}}' +
                                '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{Type}}</span>' +
                                                    '<h4>{{Name}}</h4>' +
                                                    '<h5>{{Type}}, {{JobTitle}}</h5>' +
                                                    '<p class="location">{{State}}, {{Country}}</p>' +
                                                '</div>' +
                                                '<div class="analyst-img">' +
                                                    '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="analyst-description">' +
                                            '<p class="heading"><em>{{FirstName}}</em> {{SpecializationText}}</p>' +
                                            '<ul class="yellow-bullets">' +
                                                '{{#each Specialization}}' +
                                                    '<li>{{this}}</li>' +
                                                '{{/each}}' +
                                            '</ul>' +
                                            '<p class="heading">+{{YearsOfExperience}} {{ExperienceText}}</p>' +
                                            '{{#compare MultipleProducts "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each MultipleProducts}}' +
                                                        '<li><a href="#">{{this}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                '<ul class="nav-links">' +
                                                    '{{#compare TwitterLink null operator="!="}}' +
                                                        '<li><a href="{{TwitterLink.Url}}" target="{{TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare LinkedinLink null operator="!="}}' +
                                                        '<li><a href="{{LinkedinLink.Url}}" target="{{LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare EmailAddress null operator="!="}}' +
                                                        '<li><a href="mailto:{{EmailAddress}}" class="icon-email"></a></li>' +
                                                    '{{/compare}}' +
                                                '</ul>' +
                                                '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'+
                    '{{/each}}',
        'AnalystTemplate': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{results.Type}}</span>' +
                                                    '<h2>{{results.Name}}</h2>' +
                                                    '<h3>{{results.Type}}, {{results.JobTitle}}</h3>' +
                                                    '{{#if results.Country}}'+
                                                        '<p class="location">{{results.State}}, {{results.Country}}</p>' +
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
                                            '<p class="heading"><em>{{results.FirstName}}</em> {{results.SpecializationText}}</p>' +
                                            '<ul class="yellow-bullets">' +
                                                '{{#each results.Specialization}}' +
                                                    '<li>{{this}}</li>' +
                                                '{{/each}}' +
                                            '</ul>' +
                                            '<p class="heading">+{{results.YearsOfExperience}} {{results.ExperienceText}}</p>' +
                                            '{{#compare results.MultipleProducts "0" operator=">"}}' +
                                                '<ul class="track-analyst clearfix">' +
                                                    '{{#each results.MultipleProducts}}' +
                                                        '<li><a href="#">{{this}}</a></li>' +
                                                    '{{/each}}' +
                                                '</ul>' +
                                            '{{/compare}}' +
                                        '</div>' +
                                        '<div class="analyst-footer">' +
                                            '<div class="analyst-footer-content clearfix">' +
                                                '<ul class="nav-links">' +
                                                    '{{#compare results.TwitterLink null operator="!="}}' +
                                                        '<li><a href="{{results.TwitterLink.Url}}" target="{{results.TwitterLink.Target}}" class="icon-twitter"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare results.LinkedinLink null operator="!="}}' +
                                                        '<li><a href="{{results.LinkedinLink.Url}}" target="{{results.LinkedinLink.Target}}" class="icon-linked-in"></a></li>' +
                                                    '{{/compare}}' +
                                                    '{{#compare results.EmailAddressLink null operator="!="}}' +
                                                        '<li><a href="mailto:{{results.EmailAddressLink}}" class="icon-email"></a></li>' +
                                                    '{{/compare}}' +
                                                '</ul>' +
                                                '<a href="#" class="btn btn-default pull-right">{{results.SeeFullProfileLabel}}</a>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>',
    'EventpageListviewTemplate':'<div class="header clearfix">'+
                                  '<a href="javascript:void(0)" class="arrows previous"></a>'+
                                  '<h2>{{results.Month}}</h2>'+
                                  '<a href="javascript:void(0)" class="arrows next"></a>'+
                                '</div>'+
                                '<div class="events-container row">'+
                                        '{{#each results.ModelItem}}'+
                                        '<div class="col-xs-12 col-sm-6 col-md-4 events-section {{DateType}}">'+
                                            '<div class="events-wrap">'+
                                                '<div class="header clearfix">'+
                                                    '<div class="date">{{DateField}}</div>'+
                                                    '<p class="country">'+
                                                        '{{#compare State null operator="!="}}{{State}}{{/compare}} {{#if State}}{{#if Country}},{{/if}}{{/if}}<strong>{{#compare Country null operator="!="}}{{Country}}{{/compare}}</strong></p>'+
                                                '</div>'+
                                                '<div class="content-wrap">'+
                                                    '<p><span class="type">{{EventType}}</span></p>'+
                                                    '<h3 class="title">{{Title}}</h3>'+
                                                    '{{#compare Presenters.length 0 operator=">"}}'+
                                                    '<div class="content clearfix">'+
                                                        '<div class="title-content">{{PresentersLabel}}</div>'+
                                                        '<div class="title-body">'+
                                                            '<ul class="clearfix">'+
                                                                '{{#each Presenters}}'+
                                                                '<li>{{this}}</li>'+
                                                                    '{{/each}}'+
                                                            '</ul>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '{{/compare}}'+
                                                    '{{#compare Themes.length 0 operator=">"}}'+
                                                    '<div class="content clearfix">'+
                                                        '<div class="title-content">{{ThemeLabel}}</div>'+
                                                        '<div class="title-body">'+
                                                            '<ul class="clearfix">'+
                                                                '{{#each Themes}}'+
                                                                '<li>{{this}}</li>'+
                                                                    '{{/each}}'+
                                                            '</ul>'+
                                                        '</div>'+
                                                    '</div>'+
                                                    '{{/compare}}'+
                                                '</div>'+
                                                '<div class="footer clearfix">'+
                                                    '{{#compare Register null operator="!="}}' + 
                                                       '<a href="{{Register.Url}}" class="btn btn-default register {{EventText}}" target="{{Register.Target}}">{{EventStatus}}</a>'+
                                                    '{{/compare}}'+
                                                    '{{#compare FullDetail null operator="!="}}' +
                                                      '<a href="{{FullDetail.Url}}" class="btn btn-default full-detail" target="{{FullDetail.Target}}">{{FullDetail.LinkText}}</a>'+
                                                    '{{/compare}}'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '{{/each}}',
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
                                  '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>' +
                                '</div>' +
                            '{{/if}}' +
                        '</div>'+
                    '</div>',
        'AccordianTemplate': '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                          '<h4 class="panel-title">'+
                            '<a class="collapsed" role="button" data-toggle="collapse" data-parent="#{{results.FaqAccordionId}}" href="#{{results.Id}}" aria-expanded="false" aria-controls="{{results.Id}}">'+
                              '{{results.Title}}'+
                            '</a>'+
                          '</h4>'+
                        '</div>'+
                        '<div id="{{results.Id}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="{{results.Id}}">'+
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
                                        '{{#compare results.SectorTags.length 0 operator=">"}}'+
                                            '<p>'+
                                                '{{#each results.SectorTags}}'+
                                                    '<span class="category">'+
                                                        '<strong>{{this}}</strong>'+
                                                    '</span>'+
                                                '{{/each}}'+
                                            '</p>'+
                                        '{{/compare}}'+
                                        '<span class="type">'+
                                            '<span>{{results.Product}}</span>'+
                                        '</span>'+
                                        '<h4>{{results.Title}}</h4>'+
                                        '<p class="publish">{{results.ByKeyword}} <strong>{{results.Profile}}</strong>{{results.PublicationDate}}</p>'+
                                        '{{#compare results.Description null operator="!="}}'+
                                            '<p class="description">{{results.Description}}</p>'+
                                        '{{/compare}}'+
                                        '{{#compare results.Video null operator="!="}}'+
                                            '<div class="video-container">'+
                                                '<a href="{{results.Video.Url}}" class="video-link" tabindex="0" target="_blank">'+
                                                    '<img src="{{results.Video.ImageSrc}}" alt="{{results.Video.ImageAltText}}">'+
                                                    '<span class="play-icon icon-play"></span>'+
                                                '</a>'+
                                            '</div>'+
                                        '{{/compare}}'+
                                    '</div>'+
                                    '{{#compare results.Topic.length 0 operator=">"}}'+
                                        '<p class="topics">'+
                                            '{{results.TopicKeyword}} '+
                                            '{{#each result.TopicURLS}}'+
                                                '<strong><a href="{{result.TopicURLS.TopicResourceLink}}">{{result.TopicURLS.TopicName}}</a></strong>'+
                                            '{{/each}}'+
                                        '</p>'+
                                    '{{/compare}}'+
                                '</div>'+
                                '<div class="footer">'+
                                    '{{#compare results.Price null operator="!="}}'+
                                            '<div class="recomended-currency"><strong>{{results.Price}}</strong></div>'+
                                    '{{/compare}}'+
                                    '{{#if results.LinkText}}'+
                                        '<div class="btn-container text-right">'+
                                            '<a href="{{results.PageURL}}" class="btn btn-default" target="_blank">{{results.LinkText}}</a>'+
                                        '</div>'+
                                    '{{/if}}'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
            'Product':
            '<div class="col-xs-12 col-sm-6 col-md-4">'+
                        '<div class="list-items" data-fetch="{{results.ProductPageID}}" data-type="{{results.Category}}">'+
                            '<div class="products">'+
                                '<div class="wrap-content">'+
                                    '<div class="heading">'+
                                        '<div class="heading-content">'+
                                            '<p class="category">'+
                                                '{{#each results.Sector}}'+
                                                    '<strong>{{this}}</strong>'+
                                                '{{/each}}'+
                                            '</p>'+
                                            '<h4>{{results.Title}}</h4>'+
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
                                            '<a href="{{results.MoreLink}}" target="_blank" class="btn btn-default">{{results.DetailText}}</a>'+
                                        '</div>'+
                                        '<div class="col-xs-6">'+
                                            '<a href="javascript:void(0)" data-toggle="modal" data-modal="#results.FreeTrialLink.CTAType" data-productid="results.FreeTrialLink.ProductGuid" class="btn btn-primary free-trial wffm-elq-form-btn">'+
                                                '{{results.CtaText}}'+
                                            '</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>',
                'SearchTemplate': '<div class="product-results" data-pagesize="9">'+
                                       '<h2> <strong>{{results.ProductTitle}}</strong></h2>'+
                                        '<div class="row list">'+
                                            '{{{results.Content}}}'+
                                        '</div>'+
                                        '{{#compare results.ShowMoreFlag null operator="!="}}'+
                                        '<div class="text-center">'+
                                            '<a href="#" class="btn-showMore">'+
                                                '<span class="more">{{results.ShowMoreText}}</span>'+
                                                '<span class="less">{{results.ShowLessText}}</span>'+
                                            '</a>'+
                                        '</div>'+
                                        '{{/compare}}'+
                                   '</div>'


}
}(this, jQuery, 'INFORMA'));
