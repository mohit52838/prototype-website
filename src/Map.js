import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'; // Removed unused imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Geocoder CSS
import * as Geocoder from 'leaflet-control-geocoder'; // Geocoder library

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function Map() {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      style={{ height: '400px', width: '100%' }} // Map size
      zoomControl={true} // Enable default zoom control
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add geocoder control (search bar) */}
      <GeocoderControl />
    </MapContainer>
  );
}

// Geocoder control component (search bar)
function GeocoderControl() {
  const map = useMap();

  useEffect(() => {
    const geocoder = Geocoder.geocoder({
      defaultMarkGeocode: false, // Don't automatically add a marker
      placeholder: 'Search for a location...', // Search bar placeholder
      errorMessage: 'Location not found.', // Error message
    });

    geocoder
      .on('markgeocode', (e) => {
        const { center } = e.geocode;
        map.setView(center, 10); // Zoom to the searched location
        L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup(); // Add a marker at the searched location
      })
      .addTo(map);

    return () => {
      geocoder.remove(); // Cleanup on unmount
    };
  }, [map]);

  return null;
}