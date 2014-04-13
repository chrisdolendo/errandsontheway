var renderMap = function(trip, errands){
  console.log("we are here at rendermap");
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    map = new google.maps.Map(document.getElementById('map-canvas'));
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    calcRoute();
  }

  function calcRoute() {
    console.log("at calc route");
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
      console.log(errands_array);
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
      else
        console.log("whattup");
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);

};