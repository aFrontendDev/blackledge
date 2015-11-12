/**
 * @file Carousel module
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Carousel related methods.
		 * @namespace carousel
		 */
		carousel: {
			// jQuery DOM caching
			$carousels: null,
			// CSS selectors
			carouselSelector: '.carousel',
			// Configuration
			autoplay: false,
			dots: false,
			items: 1,
			loop: false,
			nav: false,
			navText: [
				'<i class="icon icon-arrow-left"></i>',
				'<i class="icon icon-arrow-right"></i>'
			],
			speed: 500,
			/**
			 * Initialises carousel module. Caches jQuery DOM objects. Calls to bind all module events.
			 * @function init
			 * @memberof carousel
			 */
			init: function() {
				var self = this;

				self.$carousels = $(self.carouselSelector);

				if (!self.$carousels || self.$carousels.length < 1) {
					return;
				}

				self.bindEvents();
			},
			/**
			 * Binds all content card related events.
			 * @function bindEvents
			 * @memberof carousel
			 * @see {@link http://owlcarousel.owlgraphic.com}
			 * @todo loop through data attr's and add them to config obj
			 */
			bindEvents: function() {
				var self = this;

				self.$carousels.each(function() {
					var $carousel = $(this);

					// carousel options
					var options = {
						dots: true, // @todo configure this
						dotsSpeed: self.speed,
						nav: self.nav,
						navSpeed: self.speed,
						navText: self.navText
					};

					// grab additional options from DOM element
					options['dots'] = ($carousel.data('dots')) ? $carousel.data('dots') : self.dots;
					options['items'] = ($carousel.data('items')) ? $carousel.data('items') : self.items;
					options['nav'] = ($carousel.data('nav')) ? $carousel.data('nav') : self.nav;
					options['autoplay'] = ($carousel.data('autoplay')) ? $carousel.data('autoplay') : self.autoplay;
					options['loop'] = ($carousel.data('loop')) ? $carousel.data('loop') : self.loop;
					// use any more data attributes to configure this way from the component’s markup

					$carousel.owlCarousel(options);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.carousel.init();
	});
}(jQuery));
