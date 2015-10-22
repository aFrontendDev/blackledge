/**
 * @file Toggle
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Implements Generic toggle content behaviour.
		 * @namespace toggle
		 */
		toggle: {
			// jQuery DOM objs
			$toggles: null,
			// CSS selectors
			toggleActiveClass: 'toggle-in',
			toggleInactiveClass: 'toggle-inactive',
			toggleShowClass: 'toggle-show',
			processedClass: 'processed',
			// Configuration
			/**
			 * Initialses toggle content module, caches jQuery DOM objects, calls to bind events.
			 * @function init
			 * @memberOf toggle
			 */
			init: function() {
				var self = this;

				self.$toggles = $('.toggle:not(.' + self.processedClass + ')');
				self.$toggles.addClass(self.processedClass);

				self.bindEvents();
			},
			/**
			 * Binds all toggle content related events.
			 * @function bindEvents
			 * @memberOf toggle
			 */
			bindEvents: function() {
				var self = this;

				self.$toggles.on('click.toggle', '.toggle-handle', function(event) {
					event.preventDefault();

					var $toggle = $(this).closest('.toggle');

					if ($toggle.hasClass('toggle-in')) {
						self.toggleOut($toggle);
					} else {
						self.toggleIn($toggle);
					}
				});
			},
			/**
			 * [toggleIn description]
			 * @function toggleIn
			 * @memberOf toggle
			 * @param {Obj} $toggle jQuery DOM obj of element to toggle
			 */
			toggleIn: function($toggle) {
				var self = this;

				$toggle.addClass(self.toggleActiveClass).removeClass(self.toggleInactiveClass);

				if (Modernizr.csstransitions && !Modernizr.ie10) {
					var toggleShowTimeout = setTimeout(function() {

						$toggle.addClass(self.toggleShowClass);

						clearTimeout(toggleShowTimeout);
					}, 330);
				} else {
					$toggle.addClass(self.toggleShowClass);
				}
			},
			/**
			 * [toggleOut description]
			 * @function toggleOut
			 * @memberOf toggle
			 * @param {Obj} $toggle jQuery DOM obj of element to toggle
			 */
			toggleOut: function($toggle) {
				var self = this;

				$toggle.removeClass(self.toggleActiveClass).addClass(self.toggleInactiveClass);

				if (Modernizr.csstransitions && !Modernizr.ie10) {
					var toggleShowTimeout = setTimeout(function() {

						$toggle.removeClass(self.toggleShowClass);

						clearTimeout(toggleShowTimeout);
					}, 330);
				} else {
					$toggle.removeClass(self.toggleShowClass);
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggle.init();
	});
}(jQuery));
