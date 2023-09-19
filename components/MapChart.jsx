import React from 'react';
import { ComposableMap, Geography, Geographies } from 'react-simple-maps';
import nigeria from '../ghana.json';

const MapChart = () => {
  return (
    <ComposableMap
      height={350}
      projectionConfig={{ scale: 2500, center: [0, 8] }}
    >
      <Geographies geography={nigeria}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill='#DDD'
              stroke='#FFF'
            />
          ))
        }
        yarn
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
