mapboxgl.accessToken = 'pk.eyJ1IjoibWFybmloZWlqbmlzIiwiYSI6ImNrYjd0anJqaTAybjcyeG85bjFiZnQ0N2oifQ.mrX3dBGe0-hFeZ0hztzWVA';

var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = '262f64a5fc748c26bad6ed83c84f7e15';

var cities = [
  {
    name: 'Ede',
    coordinates: [5.66881, 52.04166]
  },
  {
    name: 'Huissen',
    coordinates: [5.94138, 51.93739]
  },
  {
    name: 'Nijmegen',
    coordinates: [5.85278, 51.8425]
  },
  {
    name: 'Zevenaar',
    coordinates: [6.07643, 51.92814]
  },
  {
    name: 'Wageningen',
    coordinates: [5.66236, 51.96464]
  },
  {
    name: 'Apeldoorn',
    coordinates: [5.96462, 52.21633]
  },
];

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/marniheijnis/ckcer7iek17391imoozy27bgs',
  center: [5.9124, 51.97973],
  zoom: 9,
  pitch: 45
});
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  }),
  'top-left'
);

map.addControl(new mapboxgl.NavigationControl());


map.on('load', function () {
  cities.forEach(function(city) {
 
 var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];
   
    fetch(request)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
       plotImageOnMap(response.weather[0].icon, city)
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  });
});

function plotImageOnMap(icon, city) {
  map.loadImage(
    'http://openweathermap.org/img/w/' + icon + '.png',
    function (error, image) {
      if (error) throw error;
      map.addImage("weatherIcon_" + city.name, image);
      map.addSource("point_" + city.name, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: city.coordinates
            }
          }]
        }
      });
      map.addLayer({
        id: "points_" + city.name,
        type: "symbol",
        source: "point_" + city.name,
        layout: {
          "icon-image": "weatherIcon_" + city.name,
          "icon-size": 1
        }
      });
    }
  );
}
//const mymap = new mapboxgl.Map({
//container: 'issMap',
//style: 'mapbox://styles/marniheijnis/ckcer7iek17391imoozy27bgs', // stylesheet location
//center: [0, 0], // starting position [lng, lat]
//zoom: 1 // starting zoom
//});

//const marker = new mapboxgl.Marker()
//.setLngLat([0, 0])
//.addTo(mymap); // add the marker to the map

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
   	async function getISS() {
   		const response = await fetch(api_url);
   		const data = await response.json();
   		const {latitude, longitude} = data;



//marker.setLngLat([latitude, longitude])
   		document.getElementById('lat').textContent= latitude;
   		document.getElementById('lon').textContent = longitude;
   		}

   		getISS();