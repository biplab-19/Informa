var INFORMA = window.INFORMA || {};
INFORMA.BrandPortfolio = (function (window, $, namespace) {
    'use strict';
    var $filterContainer = $('.portfolio .select-filter'),
        $showFiltersBtn = $('.portfolio #showFiltersBtn'),
        $closeFilterBtn = $('<a href="#" id="closeFilterBtn">Hide filters</a>'),
        $searchBtn = $('.search-icon'),
        $body = $('body'),
        filtersOpen = false,
        init = function () {
            // create and add close button
            $filterContainer.append($closeFilterBtn);
            // add event listner to close button
            $closeFilterBtn.click(function (evt) {
                evt.preventDefault();
                $body.css('overflow-y', '');
                $filterContainer.hide();
                $showFiltersBtn.text("Select filters");
                $showFiltersBtn.attr('data-state', 'select');
                filtersOpen=false;
            });
            // add event listener to filters button
            $showFiltersBtn.click(function (evt) {
                evt.preventDefault();
                filtersOpen = !filtersOpen;
                if (filtersOpen) {
                    $body.css('overflow-y', 'hidden');
                    $filterContainer.show();
                    $showFiltersBtn.text("Search");
                    $showFiltersBtn.attr('data-state', 'search');
                } else {
                    $searchBtn.click();
                    $body.css('overflow-y', '');
                    $filterContainer.hide();
                    $showFiltersBtn.text("Select filters");
                    $showFiltersBtn.attr('data-state', 'select');
                }
            });
            $('.segmanet-head, .sub-segment, .sub-seg').click(function () {
                $(this).siblings('label').trigger('click');
            })
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.BrandPortfolio.init());