/**
 * @file Utilities
 * @author {@link http://building-blocks.com Building Blocks}
 */
;(function ($) {
  $.extend(bb, {
    /**
     * Returns a query string parameter’s value if specified, object of query string parameters if not.
     * @function getUrlParams
     * @memberof utilities
     * @param {String} [parameter] Parameter passed in to retrieve from query string
     * @returns {Obj} [params] | {String} [param]
     */
    getUrlParams: function (parameter) {
      var queryString = window.location.search

      if (queryString !== undefined) {
        queryString = window.location.search.replace('?', '')

        var params = {},
          queryStringArray = queryString.split('&')

        for (var index in queryStringArray) {
          var query = queryStringArray[index].split('=')

          params[decodeURIComponent(query[0])] = decodeURIComponent(query[1])
        }

        if (parameter) {
          return params[parameter]
        } else {
          return params
        }
      }
    }
  })
  $.subscribe('pageReady', function () {})
}(jQuery))
