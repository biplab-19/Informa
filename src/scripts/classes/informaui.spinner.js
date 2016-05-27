(function(window, INFORMA, $, undefined) {

    INFORMA.Spinner = (function() {

        function SPINNER() {
            var spinner,
                rePosition = null,
                control,
                objectContainer,
                window = $(window),
                loader = {
                    width: 124,
                    height: 124
                };

            this.Hide = function() {
                if(typeof objectContainer ==="object"){
                    objectContainer.find('.load-spinner').fadeOut("fast");
                }
            };

            this.Show = function(container) {
            	objectContainer = container;
                var IsSpinnerExist = objectContainer.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div class='load-spinner'><span class='loading'><em>Loading...</em><img src='/Static/images/loader.svg' /></span></div>").hide();
                    control.prependTo(objectContainer);
                    control.fadeIn("slow");
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                objectContainer.find(".load-spinner .loading").css({
                    left: ((control.width()-loader.width-5) / 2),
                    top: ((control.height()-loader.height-15) / 2)
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));
