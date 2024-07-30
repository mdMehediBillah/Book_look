import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; //Leaflet library object for interacting with the map directly.
import "leaflet/dist/leaflet.css"; //Leaflet’s default styling
import RoutingMachine from "./RoutingMachine";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";
import "./MapComponent.css";
import { getOpeningStatus } from "./getOpeningStatus/getOpeningStatus";

const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [25, 25],
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
  const mapRef = useRef(null); //It is used to directly manipulate the map.

  useEffect(() => {
    console.log("MapComponent useEffect called");
    if (mapRef.current) {
      console.log("Map instance:", mapRef.current);

      // Clear previous layers
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer || layer instanceof L.Marker) {
          layer.remove(); //Remove the previous layers (tiles or markers) from the map before adding new one.
        }
      });
      //==========================================================================
      // Validate center coordinates
      //==========================================================================

      //center: is a prop that is passed to the MapComponent,indicating where the map should be centered.
      //center.length === 2 :ensures that the center array has exactly two elements, which should be latitude and longitude.
      if (center && Array.isArray(center) && center.length === 2) {
        mapRef.current.setView(center, 13);
      } else {
        console.warn("Invalid center coordinates:", center);
      }
      //==========================================================================
      // Add tile layer
      //==========================================================================
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      //==========================================================================
      // Add bookshelf markers
      //==========================================================================
      bookshelves.forEach((shelf) => {
        if (shelf.latitude && shelf.longitude) {
          const location = [shelf.latitude, shelf.longitude];
          L.marker(location).addTo(mapRef.current).bindPopup(`
              <div style="max-width: 200px;">
                <h3>${shelf.name}</h3>
                <p>${shelf.street}, ${shelf.city}</p>
                ${
                  shelf.imageUrl
                    ? `<img src="${shelf.imageUrl}" alt="${shelf.name}" style="width: 100%; height: auto; border-radius: 5px;" />`
                    : ""
                }
                <button onClick={() => setDestination(location)} style="margin-top: 10px;">Go Here</button>
              </div>
            `);
        } else {
          console.warn("Invalid bookshelf location:", shelf.location);
        }
      });
      //==========================================================================
      // Add user location marker
      //==========================================================================
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
      //==========================================================================
      // Add destination marker
      //================================================================
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
        {/* //==========================================================================
        Adds the OpenStreetMap tile layer to the map.
        //========================================================================== */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bookshelves.map((shelf, idx) => {
          if (shelf.latitude && shelf.longitude) {
            const location = [shelf.latitude, shelf.longitude];
            // Use getOpeningStatus to determine the opening status
            const { isOpen, message, detail } = getOpeningStatus(
              shelf.openingTime,
              shelf.closingTime
            );

            return (
              <Marker key={idx} position={location} icon={customIcon}>
                <Popup>
                  <div className="popup-container">
                    {/* Image */}
                    {shelf.image && shelf.image.length > 0 && (
                      <img
                        src={shelf.image[0]}
                        alt={shelf.name}
                        className="popup-image"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                    {/* Title and Address */}
                    <div className="popup-text">
                      <h3 className="popup-title">{shelf.name}</h3>
                      <p className="popup-address">
                        {shelf.street}, {shelf.city}
                      </p>
                      <p className="text-gray-500">
                        {shelf.openingTime === "00:00" &&
                        shelf.closingTime === "23:59"
                          ? "Open 24 hours"
                          : `Opening Hours: ${shelf.openingTime} - ${shelf.closingTime}`}
                      </p>
                    </div>
                    <button
                      className="popup-button"
                      onClick={() => setDestination(location)}
                    >
                      Go Here
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}

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