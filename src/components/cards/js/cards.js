(function (INFORMA, $) {
	 INFORMA.cards = (function () {
		function _cards() {
            this.initcards = function(selector) {
                var el = $(selector);

          }
			this.init = function (selector) {
				var that = this;
				$(selector).each(function() {
					var jEl = $(this);
					that.initcards(jEl);
				});
				return this;
			};
		}
		return new _cards();
	 }());
}(window.INFORMA = ( typeof INFORMA !== 'undefined' && INFORMA instanceof Object ) ? INFORMA : {}, $INFORMA));
