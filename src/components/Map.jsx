import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const Map = ({ reports }) => {

  // console.log('from map', reports)

  return (
    <div>
      <h1>MAP</h1>
    </div>
  )
}

export default Map;