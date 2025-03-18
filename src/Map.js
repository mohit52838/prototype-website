import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Simulated disaster data (replace with actual data source)
const disasterData = [
  { id: 1, type: 'flood', location: [18.5204, 73.8567], message: 'Flood alert in Pune', details: 'Severe flooding reported in low-lying areas.', timestamp: '2023-10-25 10:30 AM' },
  { id: 2, type: 'earthquake', location: [19.076, 72.8777], message: 'Earthquake in Mumbai', details: 'Magnitude 5.5 earthquake reported.', timestamp: '2023-10-24 09:15 AM' },
  { id: 3, type: 'wildfire', location: [28.7041, 77.1025], message: 'Wildfire in Delhi', details: 'Wildfire spreading in the northern region.', timestamp: '2023-10-23 04:45 PM' },
];

export default function Map() {
  const mapRef = useRef(null);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {!mapRef.current && (
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <GeocoderControl />
          {/* Render disaster markers with default pins */}
          {disasterData.map((disaster) => (
            <Marker
              key={disaster.id}
              position={disaster.location}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{disaster.message}</h3>
                  <p>{disaster.details}</p>
                  <small>{disaster.timestamp}</small>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}

// Geocoder control (search bar)
function GeocoderControl() {
  const map = useMap();
  const geocoderRef = useRef(null);

  useEffect(() => {
    if (geocoderRef.current) return;

    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    }).on('markgeocode', (e) => {
      const { center, name } = e.geocode;
      map.setView(center, 10);
      L.marker(center).addTo(map).bindPopup(name).openPopup();
    });

    map.addControl(geocoder);
    geocoderRef.current = geocoder;

    return () => {
      map.removeControl(geocoder);
      geocoderRef.current = null;
    };
  }, [map]);

  return null;
}
