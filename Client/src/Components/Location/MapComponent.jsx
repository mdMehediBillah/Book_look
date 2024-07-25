import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";     //Leaflet library object for interacting with the map directly.
import "leaflet/dist/leaflet.css";   //Leaflet’s default styling
import RoutingMachine from "./RoutingMachine";
import LocationMarker from "./LocationMarker";
import MinimapControl from "./MinimapControl";

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
        const { latitude, longitude, name, city, street } = shelf;
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (!isNaN(lat) && !isNaN(lon)) {
          console.log("Adding marker for:", shelf);
          L.marker([lat, lon], { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(`<b>${name}</b><br>${city}<b>${street}</b>`);
        } else {
          console.warn("Invalid bookshelf location:", { latitude, longitude });
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
          const { latitude, longitude, name, city,street } = shelf;
          const lat = parseFloat(latitude);
          const lon = parseFloat(longitude);

          if (!isNaN(lat) && !isNaN(lon)) {
            return (
              <Marker key={idx} position={[lat, lon]} icon={customIcon}>
                <Popup>
                  <div style={{ maxWidth: "200px" }}>
                    <h3>{name}</h3>
                    <p>{city}</p>
                    <p>{street}</p>
                    {shelf.imageUrl && (
                      <img
                        src={shelf.imageUrl}
                        alt={name}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                    <button
                      onClick={() => setDestination([lat, lon])}
                      style={{ marginTop: "10px" }}
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