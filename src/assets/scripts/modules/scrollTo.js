/**
 * @file scrollTo
 * @author {@link http://andyblackledge.co.uk Andy Blackledge}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Scroll to element based on querystring id
		 * @namespace scrollto
		 */
		scrollto: {
			// jQuery objs
			$actionScrollto: null,
			// Selectors
			actionScrolltoSelector: '.scroll-to-action',
			// Classes
			// Configuration
			scrollSpeed: 500,
			// Misc
			/**
			 * Initialises viewport resize module, binds event to window resize.
			 * @function init
			 * @memberOf scrollto
			 */
			init: function() {
				var self = this;

				// scroll down to element automatically if the 'scrollto' query string is present in url
				var queryString = bb.getUrlParams('scrollto');
				if (queryString && queryString.length > 0) {
					self.scrollToElement('#' + queryString);
				}

				self.bindEvents();
			},
			bindEvents: function() {
				var self = this;

				self.$actionScrollto = $(self.actionScrolltoSelector);
				self.$actionScrollto.on('click.scrollto', function(e) {
					e.preventDefault();

					var $this = $(this);
					var dataScrolltoTarget = $this.data('scrollto-target');
					var hrefTarget = $this.attr('href');
					var target = null;
					var dataScrollSpeed = $this.data('scrollto-speed');

					if (dataScrolltoTarget && dataScrolltoTarget.length > 0) {
						target = dataScrolltoTarget;
					} else {
						target = hrefTarget;
					}

					self.scrollToElement(target, dataScrollSpeed);
				});
			},
			scrollToElement: function(id, scrollSpeed) {

				if (!id) {
					bb.log('ERROR: scrollto - scrollToElement() - no id');
					return;
				}

				var self = this,
					$element = $(id),
					speed = null;

				if (!$element || $element.length < 1) {
					bb.log('ERROR: scrollto - scrollToElement() - no $element');
					return;
				}

				if (scrollSpeed) {
					speed = scrollSpeed;
				} else {
					speed = self.scrollSpeed;
				}

				var elementPosition = $element.offset().top;
				bb.settings.$htmlbody.animate({
					scrollTop: elementPosition
				}, speed);
			}
		}
	});
	$.subscribe('pageLoaded', function() {
		bb.scrollto.init();
	});
}(jQuery));
