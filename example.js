
let selectedRoute;
const ROUTE_DEFAULT_COLOR = '#ff0051e6'

function initMap() {


    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10, 
        center: {lat: 41.68234735080762, lng: 44.8471791124803},
    });

    var adjaraRoutes = new google.maps.Data({map: map});
    adjaraRoutes.loadGeoJson(
        "https://nikajamburia.github.io/files/routes-adjara-2.geojson"
    );

    adjaraRoutes.setStyle({
        strokeColor: ROUTE_DEFAULT_COLOR,
        strokeWeight: 3
    });
    
    adjaraRoutes.addListener('click', function(event) {
        var route = event.feature;

        adjaraRoutes.overrideStyle(selectedRoute, {strokeColor: ROUTE_DEFAULT_COLOR});
        selectedRoute = route;
        
        adjaraRoutes.overrideStyle(event.feature, {strokeColor: 'green'});
  
        moveMapOnSelectRoute(map, event.latLng, route)

        console.log(route.i.routeCode);
        document.getElementById('capture').innerHTML = route.i.description;

    });

  }

  function moveMapOnSelectRoute(map, eventCoordinates, route) {
    map.panTo( eventCoordinates );

    var routeLength = parseInt(route.i.lengthInKm);
    var zoomLevel;

    console.log(routeLength);
    if(routeLength <= 5) {
        zoomLevel = 15;
    } else if (routeLength > 5 && routeLength <= 15) {
        zoomLevel = 13;
    } else {
        zoomLevel = 12;
    }

    map.setZoom(zoomLevel);
  }