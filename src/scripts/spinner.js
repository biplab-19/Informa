(function(window, INFORMA, $, undefined) {

    INFORMA.Spinner = (function() {

        function SPINNER() {
            var spinner,
                rePosition = null,
                control,
                window = $(window),
                loader = {
                    width: 38,
                    height: 38
                };

            this.Hide = function() {
                control.fadeOut("fast");

            };

            this.Show = function(container) {
                var IsSpinnerExist = container.find(".load-spinner");

                if (!IsSpinnerExist.length) {
                    control = $("<div><img src='/images/puff.svg' /></div>");
                    control.addClass("load-spinner").prependTo(container);
                }
                control.fadeIn("fast");

                window.resize(function() {
                    RePosition();
                });
                RePosition();

            }

            var RePosition = function() {
                control.find("img").css({
                    left: ((control.width()) / 2),
                    top: "50%"
                });
            }
        }
        return new SPINNER();
    }());
}(window, INFORMA, jQuery));
