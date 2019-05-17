var INFORMA = window.INFORMA || {};
INFORMA.BrandPortfolio = (function (window, $, namespace) {
    'use strict';
    var $filterContainer = $('.portfolio .select-filter'),
        $showFiltersBtn = $('#showFiltersBtn'),
        $closeFilterBtn = $('<a href="#" id="closeFilterBtn">Hide filters</a>'),
        $searchBtn = $('.search-icon'),
        filtersOpen = false,
        init = function () {
            // create and add close button
            $filterContainer.append($closeFilterBtn);
            // add event listner to close button
            $closeFilterBtn.click(function (evt) {
                evt.preventDefault();
                $showFiltersBtn.text("Select filters");
                $filterContainer.hide();
            });
            // add event listener to filters button
            $showFiltersBtn.click(function (evt) {
                evt.preventDefault();
                filtersOpen = !filtersOpen;
                if (filtersOpen) {
                    $filterContainer.show();
                    $showFiltersBtn.text("Search");
                    $showFiltersBtn.attr('data-state', 'search');
                } else {
                    $searchBtn.click();
                    $filterContainer.hide();
                    $showFiltersBtn.text("Select filters");
                    $showFiltersBtn.attr('data-state', 'select');
                }
            });
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.BrandPortfolio.init());