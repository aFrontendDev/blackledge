/**
 * @file Videos Vimeo
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		videosVimeoIframe: {
			// jQuery DOM caching
			$videos: null,
			// CSS Selectors
			videoSelector: '.hero-video-vimeo',
			// Configuration
			iframeBase: '//player.vimeo.com/video/',
			iframeConfig: null,
			videoWidth: 960,
			videoHeight: 540, // width and height = 16:9 ratio
			/**
			 * Initialises Videos Vimeo module. Caches jQuery DOM objects, builds videos and call to bind modules events.
			 * @function init
			 * @memberOf videosYoutube
			 */
			init: function() {
				var self = this;

				self.$videos = $(self.videoSelector);

				// loop over each video
				self.$videos.each(function() {
					var $video = $(this);

					self.buildPlayer($video);
				});
			},
			/**
			 * Builds video player from a Vimeo ID
			 * @function buildPlayer
			 * @memberOf videosVimeoOverlay
			 * @param {Obj} $action jQuery DOM obj of link clicked, to build video player from
			 */
			buildPlayer: function($video) {
				var self = this,
					$videoReplace = $video.find('.hero-video-replace'),
					playerId = $videoReplace.attr('id'),
					videoTarget = $video.data('vimeo-id'),
					playerWidth = $video.data('width') ? $video.data('width') : self.videoWidth,
					playerHeight = $video.data('height') ? $video.data('height') : self.videoHeight,
					options = $video.data('vimeo-options') ? $video.data('vimeo-options') : '';

				// if these don't exist, dont continue
				if (!videoTarget || !playerId) {
					return;
				}

				// create iframe object
				var $iframe = $('<iframe />');

				// add attributes to iframe
				$iframe.prop({
					'src': self.iframeBase + videoTarget + options,
					'width': playerWidth,
					'height': playerHeight,
					'frameborder': 0,
					'allowfullscreen': 'allowfullscreen'
				});

				$videoReplace.replaceWith($iframe);

				// make video responsive
				bb.videosResponsive($video);
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.videosVimeoIframe.init();
	});
}(jQuery));
