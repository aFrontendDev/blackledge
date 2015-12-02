/**
 * @file Modal module
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 * @author {@link http://andyblackledge.co.uk Andy Blackledge}
 * @todo More refactoring
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Modal related methods.
		 * @namespace modal
		 */
		modals: {
			// jQuery DOM caching
			$modalContent: null,
			$currentLink: null,
			// CSS selectors
			modalActionSelectors: '.action-modal, [data-modal], .modal-link',
			modalCloseSelectors: '.modal-close, [data-modal-close], .action-modal-close',
			modalContainerSelector: '.modal-container',
			modalFilterSelector: '#modal_ajax',
			modalInClass: 'modal-in',
			modalLoadingClass: 'modal-loading',
			modalOutClass: 'modal-out',
			modalShowClass: 'modal-show',
			// Configuration
			modalIn: false,
			modalRequest: null,
			modalWait: false,
			overModal: false,
			/**
			 * Initialises modal module. Caches jQuery DOM objects.
			 * @function init
			 * @memberof modal
			 */
			init: function() {
				var self = this;

				self.bindEvents();
				self.closeEvents();
			},
			/**
			 * Binds all Modal related events.
			 * @function bindEvents
			 * @memberOf videosYoutube
			 */
			bindEvents: function() {
				var self = this;

				$(self.modalActionSelectors).on('click.modals', function(event) {
					event.preventDefault();
					var $action = $(this);

					if (self.modalIn) {
						self.closeModal(true);

						var timeout = setTimeout(function() {
							self.getContent($action);

							clearTimeout(timeout);
						}, 100);
					} else {
						self.getContent($action);
					}

				});

			},
			closeEvents: function () {
				var self = this;

				$(self.modalCloseSelectors).on('click.modals touchend.modals', function(event) {
					event.preventDefault();

					self.closeModal();
				});

				bb.settings.$body.on('keydown.modals', function(event) {
					var code = event.keyCode ? event.keyCode : event.which;

					// ESC key
					if (code === 27 && self.modalIn) {
						event.preventDefault();

						self.closeModal();
					}
				});

				$(self.modalContainerSelector).on('click.overlay', function() {
					if (!self.overModal && !Modernizr.touch) {
						self.closeModal();
					}
				});

				bb.settings.$body.on('mouseenter.overlay', '.modal-inner', function () {
					self.overModal = true;
				}).on('mouseleave.overlay', '.modal-inner', function () {
					self.overModal = false;
				});
			},
			/**
			 * [getContent description]
			 * @param  {[type]} $action [description]
			 */
			getContent: function($action) {
				var self = this;

				if (!$action || self.modalIn) {
					return;
				}

				self.$currentLink = $action;
				self.$currentLink.data('modal-current', true);

				var url = $action.attr('href'),
					content = $action.data('modal-content');

				self.modalIn = true;

				bb.overlay.openOverlay();

				bb.scrollLock.lock();

				if (content) {
					// show modal
					self.showModal(content, 0);

				} else if (url.indexOf('#') !== -1) {
					// get inline content
					var $originalContainer = $(url),
						$clonedContainer = $originalContainer.clone();

					content = $clonedContainer.html();

					// show modal
					self.showModal(content, 500, true);
				} else {
					self.showLoader();

					if (self.modalWait) {
						clearTimeout(self.modalWait);
					}

					self.modalWait = setTimeout(function() {
						if (self.modalRequest) {
							self.modalRequest.abort();
						}

						// get ajax content
						self.modalRequest = $.ajax({
							type: 'GET',
							url: url,
							dataType: 'html',
							cache: false,
							timeout: bb.settings.globalTimeout,
							success: function(response, status, jqXHR) {
								// Check for full-page redirect header
								if (jqXHR.getResponseHeader('FORCE_REDIRECT') !== null) {
									window.location = jqXHR.getResponseHeader('FORCE_REDIRECT');
									return;
								}

								// filter the HTML
								var $response = $('<div />').html(response),
									content = $response.find(self.modalFilterSelector).html();

								// did we find the ID?
								if (!content) {
									//content = self.$modalAjaxError;
									window.location.href = url;
								}

								self.showModal(content);
							},
							error: function(xhr) {
								bb.log(xhr.responseText);
							},
							complete: function() {
								// bb.loader.hideLoader(); // @todo reimplement this
								clearTimeout(self.ajaxWait);
							}
						});
						clearTimeout(self.modalWait);
					}, 1000);
				}
			},
			/**
			 * [showModal description]
			 * @param  {[type]} content [description]
			 * @param  {[type]} timeout [description]
			 * @param  {[type]} inline  [description]
			 */
			showModal: function(content, timeout, inline) {
				var self = this;

				self.$modalContainer = $('<div>', {
					'class': 'modal-container'
				});

				self.$modalContent = $('<div>', {
					'class': 'modal-container-inner'
				});

				bb.settings.$body.append(self.$modalContainer.html(self.$modalContent));

				if (!content) {
					return;
				}

				timeout = timeout ? timeout : 300;

				self.$modalContent.html(content);
				bb.settings.$html.removeClass(self.modalOutClass);
				bb.settings.$html.addClass(self.modalShowClass);
				var ajaxWait = setTimeout(function() {
					// run functions over the new content
					bb.ajaxLoaded();

					//self.init();
					self.closeEvents();
					self.modalIn = true;
					clearTimeout(ajaxWait);
				}, 30);
				var classWait = setTimeout(function() {
					bb.settings.$html.addClass(self.modalInClass);
					self.$modalContent.scrollTop(0);
					clearTimeout(classWait);
				}, timeout);
			},
			/**
			 * [closeModal description]
			 * @param  {[type]} persistOverlay [description]
			 */
			closeModal: function(persistOverlay) {
				var self = this;

				if (!self.modalIn) {
					return;
				}

				if (!persistOverlay) {
					bb.overlay.closeOverlay();
					bb.scrollLock.unlock();
				}

				bb.settings.$html.removeClass(self.modalInClass).addClass(self.modalOutClass);

				if (self.modalWait) {
					clearTimeout(self.modalWait);
				}

				self.modalWait = setTimeout(function() {
					self.$modalContent.empty();
					$('.modal-container').remove();

					self.modalIn = false;
					if (self.$currentLink) {
						self.$currentLink.data('modal-current', false);
					}
				}, 200);

				var timeout = setTimeout(function() {
					if (!persistOverlay) {
						bb.settings.$html.removeClass(self.modalShowClass);
					}

					clearTimeout(timeout);
				}, 600);
			},
			/**
			 * [showLoader description]
			 */
			showLoader: function() {
				var self = this;

				bb.settings.$html.addClass(self.modalLoadingClass);
				// bb.loader.showLoader(); // @todo reimplement this
			},
			/**
			 * [hideLoader description]
			 */
			hideLoader: function() {
				var self = this;

				bb.settings.$html.removeClass(self.modalLoadingClass);
				// bb.loader.hideLoader(); // @todo reimplement this
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.modals.init();
	});
}(jQuery));
