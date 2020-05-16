var xl = [];
var sum = 0;
var recov = 0;
var confrm = 0;
var deaths = 0;
var str = "";

function updatemap() {
  fetch("https://www.trackcorona.live/api/countries")
    .then(res => res.json())
    .then(res2 => {
      res2.data.forEach(element => {
        latitude = element.latitude;
        longitude = element.longitude;
        name = element.location;
        infected = parseFloat(element.confirmed);
        // name = element.name;
        death = element.dead;
        recovered = element.recovered;
        str = element.updated;
        deaths += parseInt(element.dead);
        recov += parseInt(element.recovered);
        confrm += parseInt(element.confirmed);


        if (infected >= 10000) {
          color = "rgb(255,0,0)";

        }
        else if (infected >= 5000 && infected <= 9999) {
          color = "rgb(255,128,0)";
        }
        else {
          color = "rgb(204,0,204)";
        }







        var el = document.createElement('div');
        el.id = 'marker';
        var geojson = {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            }

          }]
        };
        geojson.features.forEach(function (marker) {

          // create a HTML element for each feature
          var el = document.createElement('div');
          el.className = 'marker';

          // make a marker for each feature and add to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML('<h3>' + `Name : ${name},
             infected :  ${infected},
              recovered : ${recovered},
             deaths: ${death}` + '</h3>'))
            .addTo(map);
        });








      })
       
      document.getElementById("dth").innerHTML = deaths;
      document.getElementById("recov").innerHTML = recov;
      document.getElementById("confrm").innerHTML = confrm;
      document.getElementById("updated").innerHTML = str;
    });
}
updatemap();


