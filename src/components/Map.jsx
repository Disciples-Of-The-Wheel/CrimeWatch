import moment from 'moment';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// require('dotenv').config();


// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

mapboxgl.accessToken = 'pk.eyJ1IjoibWdhbmRvbGZpIiwiYSI6ImNsZnUxcHFqNTAxeWczanF6anpldzV5bjUifQ.HJC-KdFh37GWmawwe0Sx1A';

export default function Map({ reports, zipcode }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.0715);
  const [lat, setLat] = useState(29.9511);
  const [zoom, setZoom] = useState(9);

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

    if (reports === []) {
      return;
    } else {
      if (reports && reports.data) {
        for (let i = 0; i < reports.data.length; i++) {
          const type = reports.data[i].typetext;
          // const date = reports.data[i].timecreate;
          const formattedTime = moment(reports.data[i].timecreate).format('lll');

          const marker = new mapboxgl.Marker()
            .setLngLat([reports.data[i].location.coordinates[0], reports.data[i].location.coordinates[1]])
            .addTo(map.current);
          let popup = new mapboxgl.Popup({
            closeButton: true,
            closeOnClick: false
          });
          marker.getElement().addEventListener('click', () => {
            if (popup.isOpen()) {
              popup.remove();
            } else {
              popup.setLngLat([reports.data[i].location.coordinates[0], reports.data[i].location.coordinates[1]])
                .setHTML(`<p>${type} <br> ${formattedTime}</p>`)
                .addTo(map.current);
            }
          });
        }
      }
    }
  }, [reports]);


  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}