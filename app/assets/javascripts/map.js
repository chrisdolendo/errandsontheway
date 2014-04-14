var renderMap = function(trip, errands, display_directions){
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map-canvas'));
    directionsDisplay.setMap(map);
    calcRoute();
    if (display_directions === true){
      directionsDisplay.setPanel(document.getElementById('directions-panel'));
    }

  }

  function calcRoute() {
    var request;

    if (errands.length === 0){
      request = {
          origin: trip.start_point_address,
          destination: trip.end_point_address,
          travelMode: google.maps.TravelMode.DRIVING
      };
    }
    
    else {
      var errands_array = [];
      for (var i in errands) {
        errands_array.push({location: errands[i].address});
      }
      request = {
          origin: trip.start_point_address,
          waypoints: errands_array,
          destination: trip.end_point_address,
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING
      };
    }

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }


  google.maps.event.addDomListener(window, 'load', initialize);
  
};

var activateAutocomplete = function(){

  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('trip_start_point_address')));
  autocomplete2 = new google.maps.places.Autocomplete(
      (document.getElementById('trip_end_point_address')));

  geolocate();


};

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = new google.maps.LatLng(
          position.coords.latitude, position.coords.longitude);
      autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
          geolocation));
    });
  }
}

var activateDirectionsToggle = function(){
  var directionsPanel = document.getElementById('directions-panel');
  directionsPanel.style.display = 'none';
  var showDirectionsLink = document.getElementById('directions');

  showDirectionsLink.addEventListener('click', function(event){
    event.preventDefault();
    $("#map-canvas").slideToggle("drop");
    $("#directions-panel").slideToggle("drop");
    updateDirectionsLink();
  });

};

function updateDirectionsLink(){
 
  if ($("#directions").text() === "Show Directions"){
    $("#directions").text("Hide Directions");
  }

  else if ($("#directions").text() === "Hide Directions"){
    $("#directions").text("Show Directions");
  }

}





