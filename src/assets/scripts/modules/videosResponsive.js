/**
 * @file Videos Responsive
 * @author {@link http://andyblackledge.co.uk Andy Blackledge}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Initialises videos responsive module. Fits video passed in, using fitvids.js
		 * @param {Obj} $object jQuery DOM object of video to fit
		 * @see {@link http://fitvidsjs.com}
		 */
		videosResponsive: function($object) {
			var self = this;

			if (!$object) {
				$object = $('.media-video');
			}

			$object.fitVids({
				customSelector: 'iframe[src^=\'http://' + window.location.host + '\'], iframe[src^=\'https://' + window.location.host + '\']'
			});
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.videosResponsive();
	});
}(jQuery));
