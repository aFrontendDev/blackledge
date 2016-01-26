/**
 * @file scrollTo
 * @author {@link http://andyblackledge.co.uk Andy Blackledge}
 */
var bb = bb ? bb : {}(function ($) {
  $.extend(bb, {
    /**
     * Scroll to element based on querystring id
     * @namespace scrollto
     */
    scrollTo: {
      // jQuery objs
      $actionScrollto: null,
      // Selectors
      actionScrolltoSelector: '.scroll-to-action',
      // Configuration
      scrollSpeed: 500,
      /**
       * Initialises scrollTo module, binds event to window resize.
       * @function init
       * @memberOf scrollto
       */
      init: function () {
        var self = this

        // scroll down to element automatically if the 'scrollto' query string is present in url
        var queryString = bb.getUrlParams('scrollto')

        if (queryString && queryString.length > 0) {
          self.scrollToElement('#' + queryString)
        }

        self.bindEvents()
      },
      /**
       * Binds all scrollTo module events.
       * @function bindEvents
       * @memberOf scrollTo
       */
      bindEvents: function () {
        var self = this

        self.$actionScrollto = $(self.actionScrolltoSelector)

        self.$actionScrollto.on('click.scrollto', function (e) {
          e.preventDefault()

          var $this = $(this),
            dataScrolltoTarget = $this.data('scrollto-target'),
            hrefTarget = $this.attr('href'),
            target = null,
            dataScrollSpeed = $this.data('scrollto-speed')

          if (dataScrolltoTarget && dataScrolltoTarget.length > 0) {
            target = dataScrolltoTarget
          } else {
            target = hrefTarget
          }

          self.scrollToElement(target, dataScrollSpeed)
        })
      },
      /**
       * Scrolls the window to the top of element.
       * @function scrollToElement
       * @memberOf scrollTo
       * @param  {String} id - ID to search the DOM for
       * @param  {Number} scrollSpeed Optional speed to scroll
       * @todo update query string with ID of element scrolled to, for bookmarking - using history API?
       */
      scrollToElement: function (id, scrollSpeed) {
        if (!id) {
          bb.log('ERROR: scrollTo.scrollToElement() - no id')

          return
        }

        var self = this,
          $element = $(id),
          speed = null

        if (!$element || $element.length < 1) {
          bb.log('ERROR: scrollTo.scrollToElement() - no $element')

          return
        }

        speed = scrollSpeed ? scrollSpeed : self.scrollSpeed

        var elementPosition = $element.offset().top

        bb.settings.$htmlbody.animate({
          scrollTop: elementPosition
        }, speed)
      }
    }
  })
  $.subscribe('pageLoaded', function () {
    bb.scrollTo.init()
  })
}(jQuery))
