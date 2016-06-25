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
                            '<span class="play-icon icon-play"></span>'+
                        '</div>'+
                    '{{/if}}'+
                '</div>'+
            '</div>'+
                '{{#if LinkText}}'+
                    '<div class="btn-container">'+
                      '<a role="button" href="{{PageURL}}" class="btn btn-default" target="_blank">{{LinkText}}</a>'+
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
        'ProductFacets' :
            '<div class="col-xs-12 col-sm-6 col-md-4">'+
                '<p><strong>{{results.FilterName}}</strong></p>'+
                '<ul data-filterid="{{results.FilterID}}">'+
                    '{{#each results}}'+
                    '<li>'+
                        '<span class="custom-checkbox">'+
                            '<label class="label" for="{{Key}}">'+
                              '<input type="checkbox" data-value={{Value}} value="{{Value}}" id="{{Key}}" name="{{Key}}" />'+
                              '<span>{{Key}}</span>'+
                            '</label>'+
                        '</span>'+
                    '</li>'+
                    '{{/each}}'+
                '</ul>'+
            '</div>',
        'SearchTabs' :
        '<div class="container clearfix">'+
            '<ul class="tab-list">'+
                '{{#each results}}'+
                    '<li>'+
                        '<a href="#{{Value}}" class="">{{Key}}</a>'+
                    '</li>'+
                '{{/each}}'+
            '</ul>'+
            '<div class="selectMenu">'+
              '<select class="chosen-select">'+
                '{{#each results}}'+
                    '<option value="#{{Value}}">{{Key}}</option>'+
                '{{/each}}'+
              '</select>'+
            '</div>'+
        '</div>',
        'ProductFilters':
            '<div class="{{results.FilterName}}">'+
                '<p>{{results.FilterName}}:</p>'+
                '<ul data-filterid="{{results.FilterID}}">'+
                    '{{#each results}}'+
                        '<li>{{Key}}<a href="#" class="remove" data-sector="{{Sector}}" data-value="{{Value}}">x</a></li>'+
                    '{{/each}}'+
                '</ul>'+
                '<a class="remove-all" href="#" data-filterid="{{results.FilterID}}">Clear all x</a>'+
            '</div>',
        'Products' :
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
                                        '<a href="{{MoreLink}}" class="btn btn-default orange more">More</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '{{/each}}',
    'Resources':
            '<ul class="list-container">'+
            '{{#each results}}'+
                '<li class="col-xs-12 col-sm-6 col-md-4">'+
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
                    '{{#if Link}}'+
                        '<div class="btn-container">'+
                          '<a role="button" href="{{Link.Url}}" class="btn btn-default" target="{{Link.Target}}">{{Link.LinkText}}</a>'+
                        '</div>'+
                    '{{/if}}'+
                '</li>'+
            '{{/each}}'+
        '</ul>',
        'Events':
            '<ul class="event-items">'+
                '{{#each results}}'+
                    '<li class="col-xs-12 col-sm-6 col-md-4">'+
                        '<div class="event-container">'+
                            '<div class="content">'+
                                    '<div class="info">'+
                                        '<p class="tag">{{Type}}</p>'+
                                        '<span class="date"><span class="icon icon-calendar-day">'+
                                        '</span>{{Date}}</span>'+
                                        '<span class="time"><span class="icon icon-calendar-day">'+
                                        '</span>{{Time}}</span>'+
                                        '<h3>{{Description}}</h3>'+
                                        '<p><strong>Presenters: </strong>{{Presenters}}</p>'+
                                    '</div>'+
                                    '<div class="parent">'+
                                        '<div class="child clearfix">'+
                                            '<a class="link" href="{{DetailsLink}}">{{DetailsText}}</a>'+
                                            '<a class="btn btn-default" href="{{RegisterLink}}">{{RegisterText}}</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</li>'+
                    '{{/each}}'+
                    '</ul>',
        'Others': '{{#each results}}' +
                    '<div class="col-xs-12 search-others">'+
                        '<h3>{{Title}}</h3>'+
                        '<p>{{Description}}</p>'+
                        '<div class="btn-container">'+
                            '<a href="{{MoreLink}}" class="btn btn-default">{{MoreText}}</a>'+
                        '</div>'+
                    '</div>'+
                  '{{/each}}',
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
                                                            '<h2>{{Name}}</h2>' +
                                                            '<h3>{{Type}}, {{JobTitle}}</h3>' +
                                                            '<p class="location">{{State}}, {{Country}}</p>' +
                                                        '</div>' +
                                                        '<div class="analyst-img">' +
                                                            '<img src="{{ProfileImage}}" alt="{{image}}" />' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="analyst-description">' +
                                                    '<p class="heading"><i>{{FirstName}}</i> {{SpecializationText}}</p>' +
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
                                                            '{{#compare EmailAddress null operator="!="}}' +
                                                                '<li><a href="mailto:{{EmailAddress}}" class="icon-email"></a></li>' +
                                                            '{{/compare}}' +
                                                        '</ul>' +
                                                        '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '{{/each}}' +
                                '</div>' +
                                '{{#compare results.TotalCount 3 operator=">"}}' +
                                    '<div class="btn-container text-center">' +
                                        '<a href="javascript:void(0)" data-fetch="{{results.SectorID}}" class="btn-plus">' +
                                        '<span class="more">See All {{results.TotalCount}} Analysts</span>' +
                                        '<span class="less">Hide Analysts</span></a>' +
                                    '</div>' +
                                '{{/compare}}' +
                            '</div>' +
                        '</section>',
        'Analysts': '<div class="col-xs-12 col-sm-6 col-md-4 analyst-list-container {{results.Type}}">' +
                                    '<div class="meet-anlyst-section">' +
                                        '<div class="anlyst-heading">' +
                                            '<div class="analyst-heading-content">' +
                                                '<div class="analyst-details">' +
                                                     '<span class="analyst-type">{{Type}}</span>' +
                                                    '<h2>{{results.Name}}</h2>' +
                                                    '<h3>{{results.Type}}, {{results.JobTitle}}</h3>' +
                                                    '<p class="location">{{results.State}}, {{results.Country}}</p>' +
                                                '</div>' +
                                                '<div class="analyst-img">' +
                                                    '<img src="{{results.ProfileImage}}" alt="{{results.image}}" />' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="analyst-description">' +
                                            '<p class="heading"><i>{{results.FirstName}}</i> {{results.SpecializationText}}</p>' +
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
                                                    '{{#compare results.EmailAddress null operator="!="}}' +
                                                        '<li><a href="mailto:{{results.EmailAddress}}" class="icon-email"></a></li>' +
                                                    '{{/compare}}' +
                                                '</ul>' +
                                                '<a href="#" class="btn btn-default pull-right">Full Profile</a>' +
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
                                                        '{{#compare State null operator="!="}}{{State}}{{/compare}} ,<strong>{{#compare Country null operator="!="}}{{Country}}{{/compare}}</strong></p>'+
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
                                '<p class="category">'+
                                  '<strong>{{SectorType}}</strong>'+
                                '</p>'+
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
                            '{{#if PageUrl}}'+
                                '<div class="btn-container">'+
                                  '<a role="button" href="{{PageUrl.url}}" class="btn btn-default" target="{{PageUrl.target}}">{{PageUrl.linkText}}</a>'+
                                '</div>'+
                            '{{/if}}'+
                        '</div>'+
                    '</div>'

}
}(this, jQuery, 'INFORMA'));
