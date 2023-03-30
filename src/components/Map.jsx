import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
require('dotenv').config();

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

    if (reports === null) {
      return;
    } else {
      for (let i = 0; i < reports.data.length; i++) {
        new mapboxgl.Marker()
        .setLngLat([reports.data[i].location.coordinates[0], reports.data[i].location.coordinates[1]])
        .addTo(map.current);
      }
    }
    })

  // useEffect(() => {
  //   console.log('zip', zipcode)
  // })

  return (
  <div>
  <div ref={mapContainer} className="map-container" />
  </div>
  );
  }