import axios from "axios";

// const GEOCODING_API_KEY = "0c27af005e7b4f3baf82131d9ac9c56e..";
// const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

// export const getCoordinates = async (address) => {
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     address
//   )}&key=${GEOCODING_API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data.results.length > 0) {
//       const { lat, lng } = data.results[0].geometry;
//       return { latitude: lat, longitude: lng };
//     } else {
//       console.warn(`No results found for address: ${address}`);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error);
//     return null;
//   }
// };

const GEOCODING_API_KEY = "77aae2d5299d4cbabd4862c860ae13bd";

export const getCoordinates = async (address) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${GEOCODING_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data && data.results && data.results.length > 0) {
      const { lat, lng } = data?.results[0]?.geometry;
      return { latitude: lat, longitude: lng };
    } else {
      console.warn(`No results found for address: ${address}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

export const updateBookshelvesWithCoordinates = async (bookshelves) => {
  const updatedBookshelves = await Promise.all(
    bookshelves.map(async (shelf) => {
      if (!shelf.latitude || !shelf.longitude) {
        const address = `${shelf.city}, ${shelf.state}, ${shelf.country}`;
        const coordinates = await getCoordinates(address);

        if (coordinates) {
          return { ...shelf, ...coordinates };
        } else {
          return shelf;
        }
      } else {
        return shelf;
      }
    })
  );

  return updatedBookshelves;
};

// import { useEffect, useState } from "react";
// import axios from "axios";

// const GEOCODING_API_KEY = "0c27af005e7b4f3baf82131d9ac9c56e";

// // Helper function to get cached coordinates from localStorage
// const getCoordinatesFromCache = (address) => {
//   const cached = localStorage.getItem(address);
//   if (cached) {
//     return JSON.parse(cached);
//   }
//   return null;
// };

// // Helper function to set coordinates to cache in localStorage
// // const setCoordinatesToCache = (address, coordinates) => {
// //   localStorage.setItem(address, JSON.stringify(coordinates));
// // };

// export const getCoordinates = async (address) => {
//   const cachedCoordinates = getCoordinatesFromCache(address);
//   if (cachedCoordinates) {
//     return cachedCoordinates;
//   }

//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     address
//   )}&key=${GEOCODING_API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data;

//     if (data.results.length > 0) {
//       console.log(data);
//       const { lat, lng } = data.results[0].geometry;
//       console.log(lat, lng);
//       const coordinates = { latitude: lat, longitude: lng };

//       // Cache the coordinates for future use
//       // setCoordinatesToCache(address, coordinates);

//       return coordinates;
//     } else {
//       console.warn(`No results found for address: ${address}`);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching coordinates:", error);
//     return null;
//   }
// };

// export const updateBookshelvesWithCoordinates = async (bookshelves) => {
//   const updatedBookshelves = await Promise.all(
//     bookshelves?.map(async (shelf) => {
//       if (!shelf.latitude || !shelf.longitude) {
//         const address = `${shelf.city}, ${shelf.state}, ${shelf.country}`;
//         const coordinates = await getCoordinates(address);

//         if (coordinates) {
//           return { ...shelf, ...coordinates };
//         } else {
//           return shelf;
//         }
//       } else {
//         return shelf;
//       }
//     })
//   );

//   return updatedBookshelves;
// };

// // React component to demonstrate usage
// const MapComponent = ({ bookshelves }) => {
//   const [updatedBookshelves, setUpdatedBookshelves] = useState([]);

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       const updated = await updateBookshelvesWithCoordinates(bookshelves);
//       setUpdatedBookshelves(updated);
//     };

//     fetchCoordinates();
//   }, [bookshelves]);

//   // Render logic for the map and markers (omitted for brevity)
//   return <div>{/* Map rendering logic here */}</div>;
// };

// export default MapComponent;

//original code
