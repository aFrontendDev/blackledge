/**
 * @file Alerts
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Show and hide alerts
		 * @namespace alerts
		 */
		alerts: {
			// jQuery DOM objs
			$alertsContainer: $('.alerts'),
			// CSS Selectors
			alertSelector: '.alert',
			alertDismissSelector: '.alert-dismiss',
			alertsInClass: 'alerts-in',
			alertInClass: 'alert-in',
			alertOutClass: 'alert-out',
			alertShowClass: 'alert-show',
			alertHideShowClass: 'alert-hide-show',
			// Configuration
			alertWaitTime: 300,
			/**
			 * Initialises alerts module.
			 * @function init
			 * @memberof alert
			 * @todo refactor module JS
			 */
			init: function() {
				var self = this;

				self.$alerts = self.$alertsContainer.find(self.alertSelector + ':not(.' + self.alertInClass + ')');

				if (self.$alerts.length > 0 && !self.$alerts.hasClass(self.alertHideShowClass)) {
					self.showAlerts();
				}

				self.bindEvents();
			},
			/**
			 * [bindEvents description]
			 * @function bindEvents
			 * @memberof alert
			 */
			bindEvents: function() {
				var self = this;

				self.$alertsContainer.on('click.alerts', self.alertDismissSelector, function(event) {
					event.preventDefault();

					self.hideAlert($(this).closest(self.alertSelector));
				});
			},
			/**
			 * Shows the alert container via CSS.
			 * @function showContainer
			 * @memberof alert
			 */
			showContainer: function() {
				var self = this;

				self.$alertsContainer.addClass(self.alertsInClass);
			},
			/**
			 * Hides the alert container via CSS.
			 * @function hideContainer
			 * @memberof alert
			 */
			hideContainer: function() {
				var self = this;

				self.$alertsContainer.removeClass(self.alertsInClass);
			},
			/**
			 * Hides an alert via CSS then removes it from the DOM.
			 * @function hideAlert
			 * @memberof alert
			 * @param {Obj} $alert jQuery DOM obj of alert to hide
			 */
			hideAlert: function($alert) {
				var self = this;

				if ($alert.length > 0) {
					if (Modernizr.cssanimations) {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.on(bb.settings.animationEnd, function() {
								$(this).remove();
							}).removeClass(self.alertInClass).addClass(self.alertOutClass);
						}
					} else {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
							$alert.each(function() {
								$(this).remove();
							});
						}
					}

					if (self.$alertsContainer.find(self.alertSelector).length < 1) {
						self.$alertsContainer.removeClass(self.alertsInClass);
					}
				}
			},
			/**
			 * Shows all alerts on page load and `bb.alerts.init()`.
			 * @function showAlerts
			 * @memberof alert
			 */
			showAlerts: function() {
				var self = this;

				var $hideShowAlerts = self.$alertsContainer.find('.' + self.alertHideShowClass);

				if ($hideShowAlerts.length > 0) {
					$hideShowAlerts.removeClass(self.alertOutClass).addClass(self.alertInClass);
				}

				if (self.$alerts.length === 0) {
					return false;
				}

				self.showContainer();

				self.$alerts.reverse().each(function(i) {
					var $alert = $(this),
						timeout = $alert.data('timeout'); // timeout in seconds

					$alert.addClass(self.alertShowClass);

					var alertWait = window.setTimeout(function() {
						$alert.addClass(self.alertInClass);

						if (timeout && timeout > 0) {
							var timeoutWait = window.setTimeout(function() {
								self.hideAlert($alert);

								window.clearTimeout(timeoutWait);
							}, timeout * 1000); // convert to miliseconds
						}
						window.clearTimeout(alertWait);
					}, self.alertWaitTime * i);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.alerts.init();
	});
}(jQuery));
