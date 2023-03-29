import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // Load worker code separately with worker-loader


require('dotenv').config();

mapboxgl.accessToken = process.env.MAPBOXGL;

mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default

 
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