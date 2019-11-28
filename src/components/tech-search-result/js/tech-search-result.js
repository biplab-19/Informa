var INFORMA = window.INFORMA || {};
INFORMA.TechSearch = (function (window, $, namespace) {
    var $searchIcon = $(".search-icons i"),
        $crossIcon = $(".menu-mobile"),
        pagenumber = 1,
        facetFilterId = "facetFilter",
        searchTextBoxId = "txtComponentSearch",
        queryKeySearchText = "searchtext",
        compiledHtml,
        ListTemplate,
        _getQuerystring,
        _setAllFacet,
        _SetHashUrl,
        _isSearchBoxEmpty,
        _getSelectedFacets,
        _getFacetObject,
        _clearFacetSelection,
        _init,
        _initSearchRequest,
        _loadSearchResult,
        _hideResults,
        _loadNextPage,
        _loadSpecificPage,
        _setPagenumber,
        _loadPreviousPage,
        _getTotalPage,
        _setPreviousButton,
        _setNextButton,
        _hasQueryString,
        _redirectToSearch,

        init;


    $searchIcon.on("click", function (evt) {
        //hide menu
        $(this).parents(".stellarnav").removeClass("active");
        $(".main-nav-bar").hide();
        var $hasClassactive = $(this).hasClass("search-active");
        if ($hasClassactive) {
            $(this).removeClass("search-active");
            $(this).parent(".search-icons").toggleClass("active");
            var $activeclass = $(this).parent(".search-icons").hasClass("active");
            if ($activeclass) {
                $(this).parent(".search-icons").parent(".outer-search-icon").siblings(".menu-mobile").addClass("active");
                $(this).parent(".search-icons").parent(".outer-search-icon").addClass("active");
                $(this).parents("#tech-main-header").addClass("search-active");
            }
            else {
                $(this).parent(".search-icons").parent(".outer-search-icon").siblings(".menu-mobile").removeClass("active");
                $(this).parent(".search-icons").parent(".outer-search-icon").removeClass("active");
                $(this).parents("#tech-main-header").removeClass("search-active");
            }
        }


    });
    $crossIcon.on("click", function (evt) {
        $(this).removeClass("active");
        $(this).siblings(".outer-search-icon").children(".search-icons").removeClass("active");
        $(this).siblings(".outer-search-icon").children(".search-icons").children("i").addClass("search-active");
        $(this).siblings(".outer-search-icon").removeClass("active");
        $("#tech-main-header").removeClass("search-active");
    });

    _getQuerystring = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
            .exec(window.location.search);
        return (results !== null) ? results[1] || "" : "";
    }



    $('#' + searchTextBoxId).on("keypress", function (e) {
        if (e.keyCode == 13) {
            var qtext = _getQuerystring(queryKeySearchText);
            var inputext = jQuery(this).val();
            if (inputext != null) {
                if (inputext.length >= 2) {
                    var url = $(location)[0].origin;
                    url = url + '/search?'
                    url = url + queryKeySearchText + '=' + inputext;
                    $(location).attr('href', url)
                }
            }
            return false;
        }
    });

    $('#searchbox').on("keypress", function (e) {
        if (e.keyCode == 13) {
            var qtext = _getQuerystring(queryKeySearchText);
            var inputext = jQuery(this).val();
            if (inputext != null) {
                if (inputext.length >= 2) {
                    var url = $(location)[0].origin;
                    url = url + '/search?'
                    url = url + queryKeySearchText + '=' + inputext;
                    $(location).attr('href', url)
                }
            }
            return false;
        }
    });

    jQuery(document).ready(function () {
        var text = _getQuerystring(queryKeySearchText);
        jQuery("#" + searchTextBoxId).val(decodeURI(text));


        if (_hasQueryString()) {
            var searchRequest = _init();
            pagenumber = jQuery("#txtPageNumber").val();

            var selectedfacets = $("#" + facetFilterId).find("li.facet-selected");
            var selectedfacetCount;
            selectedfacets.each(function () {
                if ($(this).data("facet-name") != "All") {
                    searchRequest.SelectedFacets.push($(this).data("facet-name"));
                    selectedfacetCount++;
                }
            })

            if (selectedfacetCount > 1) {
                _setAllFacet(false);
            }

            searchRequest = _initSearchRequest(searchRequest);
            searchRequest.PageNo = pagenumber;
            searchRequest.CurrentPage = pagenumber;
            _setPagenumber(pagenumber)
            _loadSearchResult(searchRequest);
        }
        else {
            jQuery("#txtPageNumber").val("1");
        }

        if (jQuery("#ResultFound").val() == "1") {
            _setNextButton(false);
            _setPreviousButton(false);
        }

        $('#totalCount').text(jQuery("#ResultFound").val());
        $('#searchKeyword').text($('#txtComponentSearch').val());
    })

    _setAllFacet = function (selected) {
        if (selected)
            $("#facet-all").addClass("facet-selected");
        else
            $("#facet-all").removeClass("facet-selected");
    }

    _SetHashUrl = function (pagenumber) {
        var searchTextValue = decodeURI(_getQuerystring(queryKeySearchText));
        var searchText = queryKeySearchText + "=";
        var selectedfacets = $("#" + facetFilterId).find("li.facet-selected");
        var selectedfacetCount = 0;
        var facetQueryKey = "&facets=";
        var pageQueryKey = "&page=";

        var queryString;
        var facetSelectedValue = "";
        selectedfacets.each(function () {
            if ($(this).data("facet-name") != "All") {
                facetSelectedValue += $(this).data("facet-name") + "|";
            }
            selectedfacetCount++;
        });

        var result = _isSearchBoxEmpty();
        var hasSearchInput = false;
        if (result) {
            searchText += searchTextValue;
            hasSearchInput = true;
        }

        if (selectedfacetCount >= 1) {
            window.history.pushState("", document.title, window.location.pathname);

            if (facetSelectedValue != "") {
                facetQueryKey += facetSelectedValue;
                queryString = searchText + facetQueryKey;
            }
            else
                queryString = searchText;

            if (pagenumber > 1) {
                queryString += pageQueryKey + pagenumber;
            }

            if (queryString != "") {
                window.history.pushState('', window.location.href, "?" + queryString)
            }
        }
        else {
            window.history.pushState("", document.title, window.location.pathname);
        }
    }

    _isSearchBoxEmpty = function () {
        var searchTextValue = $('#' + searchTextBoxId).val();
        if (searchTextValue != "" && searchTextValue != "View Search") {
            return true;
        }
        return false
    }

    jQuery(document).on("click", "section.refine-container-container  ul > li", function () {
        var defaultPage = 1;
        var searchRequest = _init();
        var selectedfacetCount = 0;
        if ($(this).data("facet-name") == "All") {
            $(this).parent().find("li.facet-selected").each(function () {
                $(this).removeClass("facet-selected");
            })
            searchRequest.SelectedFacets = [];
            _setAllFacet(true);
        }
        else {
            if ($(this).hasClass("facet-selected")) {
                $(this).removeClass("facet-selected");
            }
            else {
                $(this).addClass("facet-selected");
                $("#facet-all").removeClass("facet-selected");
            }

            var selectedfacets = $(this).parent().find("li.facet-selected");

            selectedfacets.each(function () {
                if ($(this).data("facet-name") != "All") {
                    searchRequest.SelectedFacets.push($(this).data("facet-name"));
                    selectedfacetCount++;
                }
            })

            if (selectedfacetCount > 1) {
                _setAllFacet(false);
            }
            else if (selectedfacetCount == 0) {
                _setAllFacet(true);
                searchRequest.SelectedFacets = [];
            }
        }
        pagenumber = defaultPage;
        _setNextButton(true);
        _setPreviousButton(false);
        searchRequest = _initSearchRequest(searchRequest);
        searchRequest.PageNo = pagenumber;
        searchRequest.CurrentPage = pagenumber;
        _setPagenumber(pagenumber)
        _loadSearchResult(searchRequest);
        _SetHashUrl(defaultPage);
    })

    _getSelectedFacets = function (searchRequest) {
        var selectedfacets = $("#facetFilter ul li.facet-selected");
        selectedfacets.each(function () {
            if ($(this).data("facet-name") != "All") {
                searchRequest.SelectedFacets.push($(this).data("facet-name"));
            }
        })
        return searchRequest;
    }

    _getFacetObject = function () {
        return $(".refine-container-container ul li");
    }

    _clearFacetSelection = function () {
        var selectedfacets = _getFacetObject();
        selectedfacets.each(function () {
            $(this).text($(this).data("facet-name") + " (0)");
        });
    }
    _init = function () {
        var searchRequest = {};
        searchRequest.SelectedFacets = [];
        return searchRequest;
    }

    _initSearchRequest = function (searchRequest) {
        searchRequest.SearchText = $("#" + searchTextBoxId).val();
        searchRequest.PageSize = $("#resultPagesize").val();
        searchRequest.LinkText = $("#readMoreText").val();
        return searchRequest;
    }

    _loadSearchResult = function (searchRequest) {
        INFORMA.Spinner.Show($("body"));
        jQuery.ajax({
            url: "/client/search/ComponentSearchResults",
            type: "POST",
            data: searchRequest,
            success: function (result) {
                if (result.TotalPage < searchRequest.PageNo) {
                    $("#facet-all").click();
                }
                if (result && result.Results && result.Results.length > 0) {
                    result.Results.forEach(function (ele) {
                        ele.SubtitleLength = ele.SubTitle.trim().length;
                    });
                }
                ListTemplate = Handlebars.compile(INFORMA.Templates.SiteWideSearch);
                compiledHtml = ListTemplate({ Results: result.Results });
                jQuery("#totalPage").val(result.TotalPage);
                jQuery("#ResultFound").val(result.ResultFound);
                jQuery("#lblTotalPage").text(result.TotalPage);
                if (result.ResultFound > 0) {
                    jQuery("#searchResultListing").html(compiledHtml);
                    jQuery("#searchResultList").show();
                    jQuery(".no-result-hide").hide();

                    if (result.TotalPage == 1) {
                        _setNextButton(false);
                        _setPreviousButton(false);
                    }


                }
                else {
                    jQuery(".no-result").hide();
                    _hideResults();
                }
                INFORMA.Spinner.Hide();
            },
            error: function (error) {
                INFORMA.Spinner.Hide();
                },
                 complete: function (data) {
                setTimeout(function () { INFORMA.Spinner.Hide(); }, 1000);
                 }
        });
    }

    _hideResults = function () {
        jQuery("#facetFilter").hide();
        jQuery("#searchResultList").hide();
        jQuery(".no-result-hide").show();
        _clearFacetSelection();
    }

    _loadNextPage = function () {
        var searchRequest = _init();

        var pagecount = _getTotalPage();
        if (pagenumber >= 1 && pagenumber <= pagecount) {
            pagenumber++;
            // get next record
            searchRequest = _initSearchRequest(searchRequest);
            searchRequest = _getSelectedFacets(searchRequest);
            searchRequest.PageNo = pagenumber;
            searchRequest.CurrentPage = pagenumber;
            _loadSearchResult(searchRequest);

            _setPagenumber(pagenumber);
            _setPreviousButton(true);
        }
        if (pagenumber == pagecount) {
            _setNextButton(false);
        }
        _SetHashUrl(pagenumber);
        return false;
    }

    _loadSpecificPage = function () {
        var previousPage = pagenumber;
        pagenumber = jQuery("#txtPageNumber").val();
        var pagecount = _getTotalPage();
        if (parseInt(pagenumber) <= parseInt(pagecount)) {
            var searchRequest = _init();
            if (pagenumber >= 1 && pagenumber <= pagecount) {
                // get next record
                searchRequest = _initSearchRequest(searchRequest);
                searchRequest = _getSelectedFacets(searchRequest);
                searchRequest.PageNo = pagenumber;
                searchRequest.CurrentPage = pagenumber;
                _loadSearchResult(searchRequest);

                _setPagenumber(pagenumber);
                _setPreviousButton(true);
            }
            if (pagenumber == pagecount) {
                _setNextButton(false);
            }
            _SetHashUrl(pagenumber);
        }
        else {
            pagenumber = previousPage;
        }
        return false;
    }

    _setPagenumber = function (pagenumber) {
        jQuery("#txtPageNumber").val(pagenumber);
    }

    _loadPreviousPage = function () {
        var searchRequest = _init();

        if (pagenumber > 1) {
            pagenumber--;
            // get previous record
            searchRequest = _initSearchRequest(searchRequest);
            searchRequest = _getSelectedFacets(searchRequest);
            searchRequest.PageNo = pagenumber;
            searchRequest.CurrentPage = pagenumber;
            _loadSearchResult(searchRequest);
            _setPagenumber(pagenumber);
            _setNextButton(true);
        }

        if (pagenumber == 1) {
            _setPreviousButton(false);
        }
        _SetHashUrl(pagenumber);
        return true
    }

    _getTotalPage = function () {
        return jQuery("#totalPage").val();
    }

    _setPreviousButton = function (isEnable) {
        if (isEnable) {
            jQuery("#btnPrePage").removeClass("disabled");
            jQuery("#btnPrePage").attr("disabled", false);
        }
        else {
            jQuery("#btnPrePage").addClass("disabled");
            jQuery("#btnPrePage").attr("disabled", true);
        }
    }

    _setNextButton = function (isEnable) {
        if (isEnable) {
            jQuery("#btnNextPage").removeClass("disabled");
            jQuery("#btnNextPage").attr("disabled", false);
        }
        else {
            jQuery("#btnNextPage").addClass("disabled");
            jQuery("#btnNextPage").attr("disabled", true);
        }
    }

    _hasQueryString = function () {
        var urlParam = window.location.href.split("?");
        if (urlParam.length > 1) {
            return true;
        }
        return false;
    }

    _redirectToSearch = function (searchBoxValue) {
        if (searchBoxValue.length >= 2) {
            var url = $(location)[0].origin;
            url = url + '/search?'
            url = url + queryKeySearchText + '=' + searchBoxValue;
            $(location).attr('href', url)
        }
    }


    $('#txtPageNumber').on("keyup", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            document.getElementById("myBtn").click();
        }
    });
    $('.hot-port-container').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    $('#topNavSearch').click(function () {
        var searchBoxValue = $('#searchbox').val();
        _redirectToSearch(searchBoxValue);
    });

    $('#searchPage').click(function () {
        var searchBoxValue = $('#txtComponentSearch').val();
        _redirectToSearch(searchBoxValue);
    });


    $("#btnPrePage").on("click", function () {
        _loadPreviousPage();
    });
    $("#myBtn").on("click", function () {
        _loadSpecificPage();
    });
    $("#btnNextPage").on("click", function () {
        _loadNextPage();
    });

    init = function () {


    }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.TechSearch.init());











