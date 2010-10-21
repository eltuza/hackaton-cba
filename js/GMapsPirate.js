/**
 * @version 1.0
 * @author Franco Monsalvo <franco.monsalvo@globant.com>
 * Represents a Google Maps Pirate that will navigate the seven seas
 * finding the magical loot of the lost forgotten tweets. Arr!
 */
(function () {
  
  /** The Google Map instance to show the tweets on. */
  var map = null;
    
  /** The HTML Element that will contain the map. */
  var mapContainer = null;

  /**
   * @namespace This object provides a facade for Google Maps.
   */
  GLB.GMapsPirate = {};
    
  /**
   * Initializes the Pirate to set sail on the Google Maps seas and
   * display your information.
   * @param {Element} container the HTML element that will contain the map.
   * It cannot be null.
   */
  GLB.GMapsPirate.init =  function(container) {
    mapContainer = container;
    var center = new google.maps.LatLng(36.03133177633187, -1.40625);
    var mapOptions = {
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: center
    };
    map = new google.maps.Map(mapContainer, mapOptions);
  };
  
  /**
   * Creates a marker on the map.
   * @param {Point} coords The coordinates where the marker is going to be added.
   * It cannot be null, and both x and y properties should be set.
   * @param {String} text The text of the marker.
   * It cannot be neither null or empty.
   */
  GLB.GMapsPirate.createMarker = function(coords, text) {
    var point = new google.maps.LatLng(coords.x, coords.y);

    var infoWindow = new google.maps.InfoWindow({
      content: text
    });

    var marker = new google.maps.Marker({position: point, title: text});
    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    });
  };

  /**
   * Shows the map.
   */
  GLB.GMapsPirate.show = function() {
    jQuery(mapContainer).show();
  };

  /**
   * Hides the map.
   */
  GLB.GMapsPirate.hide = function() {
    jQuery(mapContainer).hide();
  };
}());
