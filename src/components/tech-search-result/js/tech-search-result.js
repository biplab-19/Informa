var INFORMA = window.INFORMA || {};
INFORMA.TechSearch = (function (window, $, namespace) {
    var $searchIcon=$(".search-icons i"),
    $crossIcon=$(".menu-mobile"),
    init;

        init = function () {
            $searchIcon.on("click",function(evt){
                var $hasClassactive=$(this).hasClass("search-active");
                if($hasClassactive){
                    $(this).removeClass("search-active");
                    $(this).parent(".search-icons").toggleClass("active");
                    var $activeclass=$(this).parent(".search-icons").hasClass("active");
                    if($activeclass){
                        $(this).parent(".search-icons").siblings(".menu-mobile").addClass("active");
                    }
                    else{
                        $(this).parent(".search-icons").siblings(".menu-mobile").removeClass("active");
                    }
                }
                else{
                    $(this).addClass("search-active"); 
                }
                
            });
            $crossIcon.on("click",function(evt){
                $(this).removeClass("active");
                $(this).siblings(".search-icons").removeClass("active");
            });
            
        }

    return {
        init: init
    };
}(this, jQuery, 'INFORMA'));
jQuery(INFORMA.TechSearch.init());
