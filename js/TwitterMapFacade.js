/**
 * Application entry point.
 */
(function () {
  // Waits until all tweets are retrieved.
  var barrier = 0;

  // Number of tweets which have geo coordinates in the last call.
  var geoCount = 0;

  /**
   * @namespace This facade provides access to the twitter & google maps API.
   */
  GLB.TwitterMapFacade = {};

  /**
   * Initializes the TwitterMap application.
   */
  GLB.TwitterMapFacade.init = function () {
    
    // Init portlets.
    jQuery(".column").sortable({
      connectWith: '.column',
      handle: '.portlet-header'
    });
    
    jQuery(".portlet").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
        .find(".portlet-header")
    		.addClass("ui-widget-header ui-corner-all")
    		.prepend('<span class="ui-icon ui-icon-minusthick"></span>')
    		.end()
    		.find(".portlet-content");

    jQuery(".portlet-header .ui-icon").click(function() {
      jQuery(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
    	jQuery(this).parents(".portlet:first").find(".portlet-content").toggle();
    });

    jQuery(".column").disableSelection();

    // Init map.
    GLB.GMapsPirate.init(document.getElementById("map-canvas"));

    geoCount = 0;

    var interval = setInterval(GLB.TwitterMapFacade.fetch, 5000);
  };

  /**
   * Retrieves and processes the list of tweets for each user.
   *
   * @param {String[]} users List of users to list tweets. It cannot be null.
   */
  GLB.TwitterMapFacade.fetch = function () {
    GLB.Twitter.list(GLB.TwitterMapFacade.onDataArrival);
  };

  /**
   * Occurs when the last set of requested tweets returns from twitter.
   *
   * @param {Object[]} tweets List of tweets. It's never null.
   */
  GLB.TwitterMapFacade.onDataArrival = function (tweets) {
    
    for (var i = 0; i < tweets.length; i++) {
      var item = tweets[i];

      if (item.geo) {
        var x = item.geo.coordinates[0];
        var y = item.geo.coordinates[1];

        GLB.GMapsPirate.createMarker({x : x, y : y},
          "<blockquote>" + item.text + "</blockquote>");
        var newTweet = jQuery("<li class=\"ui-widget-content\">"+item.text+"</li>");
        newTweet.hide();
        jQuery("#timeline").prepend(newTweet);
        
        newTweet.show("highlight",{},500);

        geoCount++;
      }
    }
    
    barrier -= 1;
    if (barrier === 0) {
      var messageEl = jQuery("#message");

      if (geoCount) {
        messageEl.replaceWith("");
        GLB.GMapsPirate.show();
      } else {
        messageEl.replaceWith("No Geo information found, yarrr");
        GLB.GMapsPirate.hide();
      }
    }
  };
}());
