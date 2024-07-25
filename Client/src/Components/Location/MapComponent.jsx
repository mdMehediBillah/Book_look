import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RoutingMachine from "./RoutingMachine";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";

const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
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
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Clear previous layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer || layer instanceof L.Marker) {
          layer.remove();
        }
      });

      // Validate center coordinates
      if (center && Array.isArray(center) && center.length === 2) {
        mapRef.current.setView(center, 13);
      } else {
        console.warn("Invalid center coordinates:", center);
      }

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add bookshelf markers
      bookshelves.forEach((shelf) => {
        if (
          shelf.location &&
          Array.isArray(shelf.location) &&
          shelf.location.length === 2
        ) {
          L.marker(shelf.location)
            .addTo(mapRef.current)
            .bindPopup(`<b>${shelf.name}</b><br>${shelf.address}`);
        } else {
          console.warn("Invalid bookshelf location:", shelf.location);
        }
      });

      // Add user location marker
      if (
        userLocation &&
        Array.isArray(userLocation) &&
        userLocation.length === 2
      ) {
        const userIcon = L.icon({
          iconUrl: "path_to_custom_user_icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        L.marker(userLocation, { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup("Your Location")
          .openPopup();
      } else {
        console.warn("Invalid user location:", userLocation);
      }

      // Add destination marker
      if (
        destination &&
        Array.isArray(destination) &&
        destination.length === 2
      ) {
        L.marker(destination)
          .addTo(mapRef.current)
          .bindPopup("Destination")
          .openPopup();
      } else {
        console.warn("Invalid destination location:", destination);
      }
    }
  }, [bookshelves, center, userLocation, destination]);

  return (
    <div className="px-2">
      <MapContainer
        center={center || [51.505, -0.09]} // Default center if `center` is undefined
        zoom={5}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        className="min-h-[500px] max-h-[800px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bookshelves.map((shelf, idx) =>
          shelf.location ? (
            <Marker key={idx} position={shelf.location} icon={customIcon}>
              <Popup>
                <div style={{ maxWidth: "200px" }}>
                  <h3>{shelf.name}</h3>
                  <p>{shelf.address}</p>
                  {shelf.imageUrl && (
                    <img
                      src={shelf.imageUrl}
                      alt={shelf.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
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
          ) : null
        )}
        <LocationMarker />
        {userLocation && destination && (
          <RoutingMachine start={userLocation} end={destination} />
        )}
        <MinimapControl position="topright" zoom={0} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
