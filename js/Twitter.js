/**
 * Twitter.js - Twitter API communication.
 */
(function () {
  /**
   * List of queued requests. This API just allows one request at a time.
   *
   * @type Function[]
   */
  var requestQueue = [];

  /**
   * Determines if there's a response pending or not. This is used to
   * synchronize requests since this component doesn't support more than one
   * request per time.
   *
   * @type Boolean
   */
  var pending = false;

  /**
   * Keeps the current response callback. Since this component just supports
   * one request per time, this strategy is set every time a new request starts.
   *
   * @type Function
   */
  var responseStrategy = null;

  /**
   * Keeps the reference to the last script element in order to remove it from
   * the DOM tree once it is no longer needed.
   *
   * @type DOMElement
   */
  var scriptElement = null;
  
  /**
   * This is the last retrieved tweet id, so that we don't get repeated entries.
   * @type long
   */
  var lastTweetId = 0;

  /**
   * Makes a JSONP request to the twitter API.
   */
  var getJsonP = function (url, callback) {
    var request = function () {
      pending = true;
      responseStrategy = callback;

      scriptElement = document.createElement("SCRIPT");
      scriptElement.type = "text/javascript";
      scriptElement.src = url + "&callback=GLB.Twitter.jsonPDelegate";

      document.getElementsByTagName("HEAD")[0].appendChild(scriptElement);
    };

    if (pending) {
      requestQueue.push(request);
    } else {
      request();
    }
  };

  /**
   * @namespace This object provides a way to interact with the Twitter API.
   */
  GLB.Twitter = {};

  /**
   * Receives all responses from JSONP requests made to the Twitter API. It
   * delegates the response to the proper callback and proceed performing the
   * next request, if any is queued.
   *
   * @param {Object[]} tweets List of the last requested tweets. It's never
   *    null.
   */
  GLB.Twitter.jsonPDelegate = function (response) {
    lastTweetId = response.max_id;
    // The response strategy is the one doing something with the results.
    responseStrategy(response.results);
    pending = false;
    responseStrategy = null;
    scriptElement.parentNode.removeChild(scriptElement);
    scriptElement = null;

    if (requestQueue.length > 0) {
      var request = requestQueue.shift();
      request();
    }
  };

  /**
   * Retrieves a list of tweets from the public timeline.
   * @param {Function} callback Function invoked once the twitter response
   *    arrives. It cannot be null.
   */
  GLB.Twitter.list = function (callback) {
    var url = "http://search.twitter.com/search.json?q=4sq&rpp=100&since_id="
        + lastTweetId;
    getJsonP(url, callback);
  };

}());
