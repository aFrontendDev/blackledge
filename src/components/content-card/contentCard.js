/**
 * @file Content card module
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Content card related methods.
		 * @namespace contentCard
		 */
		contentCard: {
			// jQuery DOM caching
			$contentCards: null,
			// CSS selectors
			contentCardSelector: '.content-card',
			/**
			 * Initialises contentCard module. Caches jQuery DOM objects. Calls to bind all module events.
			 * @function init
			 * @memberof contentCard
			 */
			init: function() {
				var self = this;

				self.$contentCards = $(self.contentCardSelector);

				// Set initial equal height
				self.$contentCards.conformity();

				self.bindEvents();
			},
			/**
			 * Binds all content card related events.
			 * @function bindEvents
			 * @memberof contentCard
			 * @see {@link https://github.com/louisremi/jquery-smartresize}
			 * @see {@link https://github.com/codekipple/conformity}
			 */
			bindEvents: function() {
				var self = this;

				// set equal height on window resize for RWD
				// throttle the resize event for performance
				bb.settings.$window.on('throttledresize', function(event) {
					self.$contentCards.conformity();
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.contentCard.init();
	});
}(jQuery));
