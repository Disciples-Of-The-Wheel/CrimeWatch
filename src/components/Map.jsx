import moment from 'moment';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = 'pk.eyJ1IjoibWdhbmRvbGZpIiwiYSI6ImNsZnUxcHFqNTAxeWczanF6anpldzV5bjUifQ.HJC-KdFh37GWmawwe0Sx1A';

export default function Map({ mappedReports, zipcode }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.0715);
  const [lat, setLat] = useState(29.9511);
  const [zoom, setZoom] = useState(12);
  const markers = useRef([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return;

    if (mappedReports === []) {
      return;
    }

    // Remove old markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    if (mappedReports) {
      for (let i = 0; i < mappedReports.length; i++) {
        const type = mappedReports[i].description;
        const address = mappedReports[i].address;
        const formattedTime = moment(mappedReports[i].time).format('lll');
        
        const marker = new mapboxgl.Marker({ color: 'blue'})
          .setLngLat([mappedReports[i].long, mappedReports[i].lat])
          .addTo(map.current);
        markers.current.push(marker)
        let popup = new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false
        });
        marker.getElement().addEventListener('click', () => {
          if (popup.isOpen()) {
            popup.remove();
          } else {
            popup.setLngLat([mappedReports[i].long, mappedReports[i].lat])
              .setHTML(`<p>${type} <br> ${formattedTime} <br> ${address} <br> ${zipcode}</p>`)
              .addTo(map.current);
          }
        });
      }
    }
  }, [mappedReports]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
