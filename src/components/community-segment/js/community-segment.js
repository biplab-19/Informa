
var INFORMA = window.INFORMA || {};
INFORMA.CommunitySegment = (function (window, $, namespace) {
    'use strict';
    var sticky;
    var header;
    var SegmentLists = $('#myCarousel'), init, _communitySegment, _loop;
    init = function () {
        if ($('#myCarousel').length == 0)
            return;

        var lastVisitedLi;
        var isSegmentLinkedClicked = false;

        $(document).ready(function () {
            
            var $loopedLink = $('li.listgroup-item');
            var $loopedDiv = $('.carousel-inner .item');
            var index = 0;
            var timeOut;

            function _loop(idx) {
                $loopedLink.removeClass('current').eq(idx).addClass('current');
                $loopedDiv.hide().eq(idx).show();
                timeOut = setTimeout(function () {
                    index = (idx + 1) % $loopedLink.length
                    _loop(index);
                }, 4000);
            };

            _loop(index);

            $("#myCarousel .listgroup").hover(function () {
                window.clearTimeout(timeOut);
            }, function () {
                if (isSegmentLinkedClicked) {
                    if ($("li.listgroup-item.current").length == 0 && lastVisitedLi.length > 0) {
                        var id = $(lastVisitedLi).attr('data-slide-to');
                        //$('.carousel-inner .item').hide().removeClass("current");
                        //$('.carousel-inner .item[data-slide-to="' + id + '"]').show().addClass("current")
                        //$("li.listgroup-item").removeClass("current");
                        //$('li.listgroup-item[data-slide-to="' + id + '"]').addClass("current");

                        //id = parseInt(id);
                        //var newidx = id + 1;
                        //$(".carousel-inner .item:nth-child(" + newidx + ")").show();

                    }

                    return false;
                }

                _loop(index);
            });

            //$("li.listgroup-item").hover(function () {
            //    lastVisitedLi = $(this);
            //    var idx = $(this).attr('data-slide-to');
            //    $("li.listgroup-item").removeClass("current");
            //    $(this).addClass("current");
            //    $('.carousel-inner .item').hide().removeClass("current");
            //    $('.carousel-inner .item[data-slide-to="' + idx + '"]').show().addClass("current");
            //    idx = parseInt(idx);
            //    var newidx = idx + 1;
            //    $(".carousel-inner .item:nth-child(" + newidx + ")").show();
            //    window.clearTimeout(timeOut);
            //}, function () {
            //    $("li.listgroup-item").removeClass("current");
            //    $('.carousel-inner .item').hide().removeClass("current");
            //});

            var x = window.innerWidth;
            if (x < 768) {
                window.clearTimeout(timeOut);
            }

            $("li.listgroup-item").hover(function () {
                if (isSegmentLinkedClicked) {
                    return false;
                }
                else {
                    //var idx = $(this).attr('data-slide-to');
                    //var x = $(this).attr("data-segmentid");
                    //$('[data-segmentid=' + x + ']').trigger("click");
                    var idx = $(this).attr('data-slide-to');
                    $("li.listgroup-item").removeClass("current");
                    $(this).addClass("current");
                    $('.carousel-inner .item').hide().removeClass("current");
                    $('.carousel-inner .item[data-slide-to="' + idx + '"]').show().addClass("current");
                    idx = parseInt(idx);
                    var newidx = idx + 1;
                    $(".carousel-inner .item:nth-child(" + newidx + ")").show();
                    window.clearTimeout(timeOut);

                }
            });

            $("li.listgroup-item").click(function () {
                lastVisitedLi = $(this);
                isSegmentLinkedClicked = true;

                var idx = $(this).attr('data-slide-to');
                $("li.listgroup-item").removeClass("current");
                $(this).addClass("current");
                $('.carousel-inner .item').hide().removeClass("current");
                $('.carousel-inner .item[data-slide-to="' + idx + '"]').show().addClass("current");
                idx = parseInt(idx);
                var newidx = idx + 1;
                $(".carousel-inner .item:nth-child(" + newidx + ")").show();
                window.clearTimeout(timeOut);
            });

            $('.carousel-inner').hover(function () {
                if ($("li.listgroup-item.current").length == 0 && lastVisitedLi.length > 0) {
                    var id = $(lastVisitedLi).attr('data-slide-to');
                    $('.carousel-inner .item').hide().removeClass("current");
                    $('.carousel-inner .item[data-slide-to="' + id + '"]').show().addClass("current")
                    $("li.listgroup-item").removeClass("current");
                    $('li.listgroup-item[data-slide-to="' + id + '"]').addClass("current");
                }
            });

            $('.carousel-controls .carousel-control').click(function (evt) {
                var items = $('.carousel-inner .item'),
                    currItem = items.filter(':visible'),
                    currItemInd = items.index(currItem),
                    targInd = $(this).hasClass('right') ? currItemInd + 1 : currItemInd - 1,
                    lastInd = items.length - 1,
                    nextItem,
                    nextItemInd,
                    nextDdItem

                // loop 
                targInd = targInd > lastInd ? 0 : targInd < 0 ? lastInd : targInd;
                
                // select next elements
                nextItem = items.eq(targInd);
                nextItemInd = items.index(nextItem);
                nextDdItem = $('li.dropgroup-item[data-slide-to="' + nextItemInd + '"]');
                
                // activate next elements
                nextItem.addClass('current').show();
                currItem.removeClass('current').hide();
                nextDdItem.addClass('current');
                $('.content-head').text(nextDdItem.text());

                evt.preventDefault();
            });


            $("#divsegment").click(function () {
                $(this).toggleClass("active");


            });

            setTimeout(function () {
                var x = $("#divsegment li:nth-child(1)").html();
                // console.log(x);
                $(".content-head").text(x);

            }, 30);

            $("li.dropgroup-item").click(function () {
                lastVisitedLi = $(this);
                isSegmentLinkedClicked = true;

                var idx = $(this).attr('data-slide-to');
                $("li.dropgroup-item").removeClass("current");
                $(this).addClass("current");
                $('.carousel-inner .item').hide().removeClass("current");
                $('.carousel-inner .item[data-slide-to="' + idx + '"]').show().addClass("current");
                idx = parseInt(idx);
                var newidx = idx + 1;
                $(".carousel-inner .item:nth-child(" + newidx + ")").show();

                $('.content-head').text($(this).text());


            });



        });

        
    };
    
    _communitySegment = function () {
        //var clickEvent = false;
        //$('#myCarousel').carousel({
        //    interval: 6000
        //}).on('click', '.listgroup  li', function () {
        //    clickEvent = true;
        //    $('.listgroup  li').removeClass('active');
        //    $(this).addClass('active');
        //}).on('slid.bs.carousel', function (e) {
        //    if (!clickEvent) {
        //        var count = $('.listgroup ').children().length - 1;
        //        var current = $('.listgroup  li.active');
        //        current.removeClass('active').next().addClass('active');
        //        var id = parseInt(current.data('slide-to'));
        //        if (count == id) {
        //            $('.listgroup  li').first().addClass('active');
        //        }
        //    }
        //    clickEvent = false;
        //});

        
    };

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.CommunitySegment.init());
