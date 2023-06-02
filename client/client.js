
var mymap;

createMap();

function createArc(latLongObj) {
    const startPoint = L.latLng(latLongObj.lat, latLongObj.long);
    const endPoint = L.latLng(27.7172, 85.3240);
    const polyline = L.polyline([startPoint, endPoint], {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1,
      offset: 10
    }).addTo(mymap);
  
    const flightDuration = 3000; // 3 seconds
    let startTime = Date.now();
  
    function updatePolyline() {
      const elapsedTime = Date.now() - startTime;
      const flightProgress = elapsedTime / flightDuration;
      if (flightProgress >= 1) {
        polyline.setLatLngs([startPoint, endPoint]);
        startTime = Date.now();
      } else {
        const currentLatLng = L.latLng(
          startPoint.lat + (endPoint.lat - startPoint.lat) * flightProgress,
          startPoint.lng + (endPoint.lng - startPoint.lng) * flightProgress
        );
        polyline.setLatLngs([startPoint, currentLatLng]);
      }
    }
  
    let timerId = setInterval(updatePolyline, 10);
  
    function togglePolylineColor() {
      if (polyline.options.color === 'red') {
        polyline.setStyle({color: 'blue'});
      }else if (polyline.options.color === 'blue') {
        polyline.setStyle({color: 'yellow'});
      }else {
        polyline.setStyle({color: 'red'});
      }
    }
  
    setInterval(togglePolylineColor, 3000);
  
    function repeatPolyline() {
      polyline.setLatLngs([startPoint, endPoint]);
      startTime = Date.now();
    }
  
    setInterval(repeatPolyline, 10000);
  }
  

function createMap(){
    mymap = L.map('map').setView([27.7172, 85.3240], 7);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mymap);
}
