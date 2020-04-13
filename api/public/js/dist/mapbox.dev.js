"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayMap = void 0;

var displayMap = function displayMap(locations) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXNsb2FycnluIiwiYSI6ImNrOHdwMDkxcTBwcG8zbG1raTA2bGNicncifQ.HnHqUlOlMYtWNQNEgk2K4Q';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/chrisloarryn/ck8wp5zvv22ps1ivs5p1te7jz',
    scrollZoom: false //   center: [-118.803461, 34.006072],
    //   zoom: 10,
    //   interactive: false

  });
  var bounds = new mapboxgl.LngLatBounds();
  locations.forEach(function (loc) {
    // Add marker
    var el = document.createElement('div');
    el.className = 'marker'; // Add marker

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map); // Add Popup

    new mapboxgl.Popup({
      offset: 30
    }).setLngLat(loc.coordinates).setHTML("<p>Day ".concat(loc.day, ": ").concat(loc.description, "</p>")).addTo(map); // Extend map bounds to include current location

    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};

exports.displayMap = displayMap;