import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';

import React from 'react';

export default function Map() {
  const center = [49.3145722, 8.4352064];
  return (
    <div className='flex justify-center'>
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: '500px', height: '500px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={center}>
          <Popup>Startpunkt</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
