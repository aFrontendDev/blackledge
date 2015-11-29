/**
 * @file Overlay module
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Overlay related methods.
		 * @namespace overlay
		 */
		overlay: {
			// jQuery DOM caching
			$overlay: null,
			// CSS selectors
			overlayClass: 'overlay',
			overlayInClass: 'overlay-in',
			overlayShowClass: 'overlay-show',
			// Configuration
			overlayIn: false,
			/**
			 * Initialises overlay module, creates and appends overlay div to body if it doesn’t exist.
			 * @function init
			 * @memberOf overlay
			 */
			init: function() {
				var self = this;

				if (!self.$overlay) {
					self.$overlay = $('<div>', {
						'class': self.overlayClass
					});
				}

				bb.settings.$html.addClass(self.overlayOutClass);
				bb.settings.$body.append(self.$overlay);
			},
			/**
			 * Add CSS class to <html>, showing overlay.
			 * @function openOverlay
			 * @memberOf overlay
			 */
			openOverlay: function() {
				var self = this;

				if (self.overlayIn) {
					return;
				}

				self.overlayIn = true;

				if (Modernizr.csstransitions) {
					bb.settings.$html.addClass(self.overlayShowClass);

					var timeout = setTimeout(function() {
						bb.settings.$html.addClass(self.overlayInClass);

						clearTimeout(timeout);
					}, 30);
				} else {
					bb.settings.$html.addClass(self.overlayShowClass + ' ' + self.overlayInClass);
				}
			},
			/**
			 * Removes CSS class from <html>, hiding overlay.
			 * @function closeOverlay
			 * @memberOf overlay
			 */
			closeOverlay: function() {
				var self = this;

				if (!self.overlayIn) {
					return;
				}

				if (Modernizr.csstransitions) {
					var timeout = setTimeout(function() {
						bb.settings.$html.removeClass(self.overlayInClass);

						clearTimeout(timeout);
					}, 100);

					var timeout2 = setTimeout(function() {
						bb.settings.$html.removeClass(self.overlayShowClass);

						clearTimeout(timeout2);
					}, 330);
				} else {
					bb.settings.$html.removeClass(self.overlayInClass + ' ' + self.overlayShowClass);
				}

				self.overlayIn = false;
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.overlay.init();
	});
}(jQuery));
