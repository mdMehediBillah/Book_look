import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

// API key for the OpenCage Data API
const GEOCODING_API_KEY = "30f399b8abb3424aa79287e7458363e2";

// Custom icon for the marker
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component for selecting location on the map and retrieving address information
const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState(null);

  const map = useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());

      // Reverse Geocoding API call
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${GEOCODING_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          const { country, city, road, postcode } = result.components;
          const formattedAddress = {
            country,
            city,
            road,
            postcode,
          };
          console.log("Retrieved Address:", formattedAddress);
          setAddress(formattedAddress);
          onLocationSelect(formattedAddress);
        } else {
          console.log("No address found for the given location.");
          setAddress(null);
          onLocationSelect(null);
        }
      } catch (error) {
        console.error("Error fetching address data:", error);
        setAddress(null);
        onLocationSelect(null);
      }
    },
  });

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map]);

  return (
    <>
      {position && (
        <Marker position={position} icon={icon}>
          {address && (
            <Popup>
              <div className="popup-content">
                <p>
                  <strong>Country:</strong> {address.country}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Street:</strong> {address.road}
                </p>
                <p>
                  <strong>Postcode:</strong> {address.postcode}
                </p>
              </div>
            </Popup>
          )}
        </Marker>
      )}
    </>
  );
};

// Main component to render the map and handle location selection
const BookshelfMap = ({ onLocationSelect }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationPicker onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default BookshelfMap;
