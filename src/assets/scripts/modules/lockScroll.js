/**
 * @file Lock scroll module
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 * @author {@link http://andyblackledge.co.uk Andy Blackledge}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Lock scroll related methods.
		 * @namespace scrollLock
		 */
		scrollLock: {
			// jQuery DOM caching
			$fixedItems: null,
			$measure: null,
			$measureRuler: null,
			// CSS selectors
			fixedSelectors: 'body, #header, #page',
			measureClass: 'scroll-measure',
			scrollClass: 'scroll',
			scrollableSelectors: '.modal-container',
			scrollLockedClass: 'scroll-locked',
			scrollLockedIOSClass: 'scroll-locked-ios',
			// Configuration
			hasScrollbar: false,
			isLocked: false,
			shiftWait: null,
			storedScrollPos: 0,
			/**
			 * Initialises lock scroll module, fixes widths of containers, creates and appends ruler to <body>. Tests for scrollbar.
			 * @function init
			 * @memberOf scrollLock
			 */
			init: function() {
				var self = this;

				self.$fixedItems = $(self.fixedSelectors);

				self.$measure = $('<div />', {
					'class': self.measureClass
				});

				self.$measureRuler = $('<div />');

				bb.settings.$body.append(self.$measure.html(self.$measureRuler));

				self.testScrollbar();
			},
			/**
			 * Tests the page/device for a scrollbar.
			 * @function testScrollbar
			 * @memberOf scrollLock
			 */
			testScrollbar: function() {
				var self = this;

				var width1 = 0,
					width2 = 0;

				self.$measure.addClass(self.scrollClass);
				width1 = self.$measureRuler.width();

				var timeout = setTimeout(function() {
					width1 = self.$measureRuler.width();

					self.$measure.removeClass(self.scrollClass);

					var innerTimeout = setTimeout(function() {
						width2 = self.$measureRuler.width();

						if (width2 > width1) {
							self.hasScrollbar = true;
						}

						clearTimeout(innerTimeout);
					}, 30);

					clearTimeout(timeout);
				}, 30);
			},
			/**
			 * Locks the background, disabling scrolling. Binds lock scroll related events.
			 * @function lock
			 * @memberOf scrollLock
			 */
			lock: function() {
				var self = this;

				if (self.isLocked) {
					return;
				}

				self.isLocked = true;
				self.storedScrollPos = bb.settings.$window.scrollTop();

				self.fixWidths(true);

				bb.settings.$body.on('touchmove.scrollLock', function(event) {
					event.stopPropagation();
					event.preventDefault();
				});

				$(self.scrollableSelectors).on('touchmove.scrollLock', function(event) {
					event.stopPropagation();
				});

				var timeout = setTimeout(function() {
					bb.settings.$html.addClass(self.scrollLockedClass);

					clearTimeout(timeout);
				}, 10);

				var iosTimeout = setTimeout(function() {
					if (Modernizr.ios) {
						bb.settings.$html.addClasss(self.scrollLockedIOSClass);
					}

					clearTimeout(iosTimeout);
				}, 100);
			},
			/**
			 * Unlocks the background, enabling scrolling. Unbinds lock scroll related events.
			 * @function unlock
			 * @memberOf scrollLock
			 */
			unlock: function() {
				var self = this;

				if (!self.isLocked) {
					return;
				}

				bb.settings.$html.removeClass(self.scrollLockedClass + ' ' + self.scrollLockedIOSClass);
				bb.settings.$body.off('touchmove.scrollLock');

				var timeout = setTimeout(function() {
					self.unfixWidths();

					self.storedScrollPos = null;
					self.isLocked = false;

					clearTimeout(timeout);
				}, 100);
			},
			/**
			 * Fixes the widths of containing elements.
			 * @function fixWidths
			 * @memberOf scrollLock
			 * @param {Bool} force An override of whether of not to force the fixing of widths.
			 */
			fixWidths: function(force) {
				var self = this;

				if (!self.isLocked && !force) {
					return;
				}

				self.unfixWidths();

				self.$fixedItems.css('width', self.$measureRuler.innerWidth());
			},
			/**
			 * Removes CSS from fixed width items, unfixing them.
			 * @function unfixWidths
			 * @memberOf scrollLock
			 */
			unfixWidths: function() {
				var self = this;

				self.$fixedItems.css('width', '');
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.scrollLock.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.scrollLock.fixWidths();
	});
}(jQuery));
