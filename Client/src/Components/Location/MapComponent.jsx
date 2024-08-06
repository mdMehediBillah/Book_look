import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import "./MapComponent.css";

// Custom icon for individual markers
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [0, -25],
});

// Custom icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/000000/user.png", // Person icon URL
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Custom cluster icon creation function
const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const MapComponent = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const center = [48.8566, 2.3522]; // Centered on Paris
  const userLocation = [52.52, 13.405]; // Default location set to Berlin

  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/bookshelves/"
        );
        // Check if the response contains an array
        const shelves = Array.isArray(response.data)
          ? response.data
          : response.data.bookshelves;

        if (!Array.isArray(shelves)) {
          throw new Error(
            "Invalid data format: expected an array of bookshelves."
          );
        }

        const geocodedShelves = await Promise.all(
          response?.data.result.slice(0, 2)?.map(async (shelf) => {
            const { street, city, state, country, zipCode } = shelf;
            const address = `${street}, ${city}, ${state}, ${zipCode}, ${country}`;

            try {
              const GEOCODING_API_KEY = "77aae2d5299d4cbabd4862c860ae13bd";
              const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                address
              )}&key=${GEOCODING_API_KEY}`;

              const geocodeResponse = await axios.get(url);

              if (geocodeResponse?.data?.results?.length > 0) {
                const latitude =
                  geocodeResponse?.data?.results[0]?.geometry?.lat;
                const longitude =
                  geocodeResponse?.data?.results[0]?.geometry?.lng;
                console.log({ ...shelf, latitude, longitude });
                return { ...shelf, latitude, longitude };
              } else {
                console.error(`No geocoding results for address: ${address}`);
                return null;
              }
            } catch (error) {
              console.error(`Error geocoding address: ${address}`, error);
              return null;
            }
          })
        );

        setBookshelves(geocodedShelves.filter((shelf) => shelf !== null));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookshelves data:", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchBookshelves();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-2">
      <MapContainer
        center={center}
        zoom={13}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "15px",
          border: "2px solid red",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {bookshelves.map((shelf, index) => (
            <Marker
              key={index}
              position={[shelf.latitude, shelf.longitude]}
              icon={customIcon}
            >
              <Popup>
                <div style={{ maxWidth: "200px" }}>
                  <h3>{shelf.name}</h3>
                  <p>
                    {shelf.street}, {shelf.city}
                  </p>
                  {shelf.image && (
                    <img
                      src={shelf.image[0]}
                      alt={shelf.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Marker position={userLocation} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
