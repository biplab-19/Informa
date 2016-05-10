(function(window, INFORMA, $, undefined) {

    INFORMA.Spinner = (function() {

        function SPINNER() {
            var spinner,
                rePosition = null,
                control,
                objectContainer,
                window = $(window),
                loader = {
                    width: 38,
                    height: 38
                };

            this.Hide = function() {
                objectContainer.find('.load-spinner').fadeOut("fast");

            };

            this.Show = function(container) {
            	objectContainer = container;
                var IsSpinnerExist = objectContainer.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div><img src='/images/puff.svg' /></div>");
                    control.addClass("load-spinner").prependTo(objectContainer);
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                objectContainer.find(".load-spinner img").css({
                    left: ((control.width()) / 2),
                    top: "50%"
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));
