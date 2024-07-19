import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "../RoutingMachine/RoutingMachine";

// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000", // Replace with the path to your custom icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({
  bookshelves,
  center,
  userLocation,
  destination,
  setDestination,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {bookshelves.map((shelf, idx) => (
        <Marker key={idx} position={shelf.location} icon={customIcon}>
          <Popup>
            <div style={{ maxWidth: "200px" }}>
              <h3>{shelf.name}</h3>
              <p>{shelf.address}</p>
              {shelf.imageUrl && (
                <img
                  src={shelf.imageUrl}
                  alt={shelf.name}
                  style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                />
              )}
              <button
                onClick={() => setDestination(shelf.location)}
                style={{ marginTop: "10px" }}
              >
                Go Here
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {userLocation && destination && (
        <RoutingMachine start={userLocation} end={destination} />
      )}
    </MapContainer>
  );
};

export default MapComponent;
