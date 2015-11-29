/**
 * @file Videos Youtube
 * @author {@link http://danielfurze.co.uk Daniel Furze}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		videosYoutube: {
			// jQuery DOM caching
			$videos: null,
			$currentVideo: null,
			// CSS Selectors
			animatingInClass: 'animating-in',
			animatingOutClass: 'animating-out',
			activeClass: 'active',
			errorClass: 'error',
			pausedClass: 'paused',
			pauseSelector: '.hero-video-pause',
			playingClass: 'playing',
			playSelector: '.hero-video-play',
			playerSelector: '.hero-video-player',
			posterSelector: '.hero-video-poster',
			videoSelector: '.hero-video-youtube',
			videoReplaceSelector: '.hero-video-replace',
			// Configuration
			animatingInSpeed: 300,
			animatingOutSpeed: 300,
			canPlay: false,
			iframeBase: null,
			iframeConfig: null,
			pauseTimer: null,
			pauseWait: false,
			playTimer: null,
			playWait: false,
			videoHeight: 540, // width and height = 16:9 ratio
			videoWidth: 960,
			/**
			 * Loads the Youtube API script when needed on the page.
			 * @function preInit
			 * @memberOf videosYoutube
			 * @todo conditionally load this if there’s a video on the page
			 */
			preInit: function() {
				Modernizr.load({
					load: 'https://www.youtube.com/iframe_api',
					complete: function() {
						// bb.videosYoutube.init is triggered by onYouTubeIframeAPIReady() - in the plugins/combine
					}
				});
			},
			/**
			 * Initialises Videos Youtube module. Caches jQuery DOM objects, builds videos and call to bind modules events.
			 * @function init
			 * @memberOf videosYoutube
			 */
			init: function() {
				var self = this;

				self.$videos = $(self.videoSelector);

				self.$videos.each(function() {
					var $video = $(this);

					self.videoFit($video);
					self.buildPlayer($video);
				});

				self.bindEvents();
			},
			/**
			 * Binds all Videos Youtube related events.
			 * @function bindEvents
			 * @memberOf videosYoutube
			 */
			bindEvents: function() {
				var self = this;

				bb.settings.$body.on('click.videosYoutube', self.playSelector, function(event) {
					event.preventDefault();

					if (self.playWait) {
						return;
					}

					var $video = $(this).closest(self.videoSelector);

					self.startPlayer($video);

					self.playWait = true;

					self.playTimer = setTimeout(function() {
						self.playWait = false;
						clearTimeout(self.playTimer);
					}, 200);
				});

				bb.settings.$body.on('click.videosYoutube', self.pauseSelector, function(event) {
					event.preventDefault();

					if (self.pauseWait) {
						return;
					}

					var $video = $(this).closest(self.videoSelector);

					if ($video.hasClass(self.pausedClass)) {
						self.startPlayer($video);
					} else {
						self.pausePlayer($video);
					}

					self.pauseWait = true;

					self.pauseTimer = setTimeout(function() {
						self.pauseWait = false;
						clearTimeout(self.pauseTimer);
					}, 200);
				});
			},
			/**
			 * Builds the video player using the Youtube API, binds Youtube events to it.
			 * @function buildPlayer
			 * @memberOf videosYoutube
			 * @param {Obj} $video jQuery DOM obj of video to build player around
			 */
			buildPlayer: function($video) {
				var self = this;

				if (!$video) {
					return;
				}

				if ($video.data('video')) {
					return;
				} else {
					var player = null,
						youtubeId = $video.data('youtube-id'),
						container = $video.find(self.videoReplaceSelector).attr('id');

					player = new YT.Player(container, {
						height: self.videoHeight,
						width: self.videoWidth,
						videoId: youtubeId,
						wmode: 'transparent',
						playerVars: {
							'wmode': 'transparent', // wmode transparent used to stop flash vid appearing above nav buttons
							'rel': 0,
							'controls': 1,
							'start': 1
						},
						events: {
							onReady: function() {
								$video.data('video-ready', 'true');
								$video.data('video', player);
							},
							onStateChange: function(event) {
								if (event.data === YT.PlayerState.ENDED) {
									// stop video when it finishes
									if (self.$currentVideo && self.$currentVideo.hasClass(self.playingClass)) {
										self.stopVideo();
									}
								} else if (event.data === YT.PlayerState.PAUSED) {
									$video.removeClass(self.playingClass);
									$video.addClass(self.pausedClass);
								} else if (event.data === YT.PlayerState.PLAYING) {
									self.startPlayer($video);
								}
							}
						}
					});
				}
			},
			/**
			 * Plays the video on a user interaction.
			 * @function startPlayer
			 * @memberOf videosYoutube
			 * @param {Obj} $video jQuery DOM obj of video to play
			 */
			startPlayer: function($video) {
				var self = this;

				// stop current video
				if (self.$currentVideo && self.$currentVideo.hasClass(self.playingClass)) {
					self.$currentVideo.removeClass(self.playingClass).addClass(self.pausedClass).data('video').pauseVideo();
				}

				self.$currentVideo = $video;
				$video.removeClass(self.pausedClass);

				if (!$video.hasClass(self.activeClass)) {
					$video.addClass(self.activeClass);
				}

				// start the video
				$video.addClass(self.playingClass).data('video').playVideo();
			},
			/**
			 * Pauses the video on a user interaction.
			 * @function pausePlayer
			 * @memberOf videosYoutube
			 * @param {Obj} $video jQuery DOM obj of video to pause
			 */
			pausePlayer: function($video) {
				var self = this;

				$video.removeClass(self.playingClass).addClass(self.pausedClass).data('video').pauseVideo(); // instead??
			},
			/**
			 * Fits the video to the container for RWD.
			 * @function videoFit
			 * @memberOf videosYoutube
			 * @param {Obj} $video jQuery DOM obj of video to fit
			 */
			videoFit: function($video) {
				var self = this;

				var $coverImage = $video.find(self.posterSelector),
					imageHeight = $coverImage.height(),
					imageWidth = $coverImage.width(),
					newWidth = (self.videoWidth / self.videoHeight) * imageHeight,
					newHeight = (self.videoHeight / self.videoWidth) * imageWidth,
					$heroVideoPlayer = $video.find(self.playerSelector);

				if (newWidth > imageWidth) {
					if (newHeight > imageHeight) {
						$heroVideoPlayer.height(imageHeight).css('width', '100%');
					} else {
						$heroVideoPlayer.height(newHeight).css('width', '100%');
					}

				} else {
					if (newHeight > imageHeight) {
						$heroVideoPlayer.height(imageHeight).css('width', '100%');
					} else {
						$heroVideoPlayer.height(newHeight).css('width', '100%');
					}
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.videosYoutube.preInit();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.videosYoutube.init();
	});
}(jQuery));
