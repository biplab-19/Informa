/*
 * Resource Filter.js
 *
 *
 * @project:    Informa
 * @date:       2016-April-25
 * @author:     Rajiv
 * @licensor:   SAPIENNITRO
 * @namespaces: INFORMA
 *
 */

var INFORMA = window.INFORMA || {};
INFORMA.ResourceFilter = (function(window, $, namespace) {
    'use strict';
    //variables
    var Templates = INFORMA.Templates,
        ResourceContainer = $('.resource-filter'),
        CustomSelect = ResourceContainer.find("select"),
        SectorSelect = ResourceContainer.find("select.resource-sector"),
        SubSectorSelect = ResourceContainer.find("select.resource-sub-sector"),
        ResourceListContainer = $('.resource-list'),
        BtnMore = $('.btn-showMore'),
    // methods
        init,
        BindDropDown,
        ResourceBindDropDown,
        RenderOnLoad;

    ResourceBindDropDown = function() {
        CustomSelect.val("");
        CustomSelect.multiselect({
            maxHeight: 200,
            buttonText: function(o, s) {
                debugger;
                if (o.length === 0) {
                    return $(s).data('placeholder');
                } else {
                    var labels = 1;
                    o.each(function(i) {
                        labels = parseInt(1 + i);
                    });
                    return '<strong>'+labels + '</strong> Selected';
                }
            },
            onChange: function(option, checked, select) {
                 debugger;
                if ($(option).parent().hasClass("resource-sector") === true) {
                    if (checked) {
                        SubSectorSelect.parents('li').removeClass('hidden');
                    } else {
                        SubSectorSelect.parents('li').addClass('hidden');
                    }
                }
            }
        });
    };

    RenderOnLoad = function() {
        ResourceListContainer.each(function() {
            var oThis = jQuery(this),
                Count = oThis.data('count'),
                Items = oThis.find('.list-item-container').length;

            if(Items> Count) {
                oThis.find('.list-item-container:nth-child('+ (Count + 1) +')').hide();
                oThis.find('.btn-showMore').show();
            } else {
                oThis.find('.btn-showMore').hide();
            }

        })

        BtnMore.on('click', function() {
            var Parent = jQuery(this).parents('section'),
                Count = Parent.data('count');
                Parent.find('.list-item-container:nth-child('+ (Count + 1) +')').slideToggle();

                jQuery(this).toggleClass('showLess');
        })
    }
    

    init = function() {
        if (ResourceContainer.length > 0) {
            ResourceBindDropDown();
            RenderOnLoad();
        }
    };

    return {
        init: init
    };
}(this, $INFORMA = jQuery.noConflict(), 'INFORMA'));
jQuery(INFORMA.ResourceFilter.init());
