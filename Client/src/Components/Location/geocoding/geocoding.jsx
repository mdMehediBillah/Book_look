import axios from "axios";

const GEOCODING_API_KEY = "c31e5a04c18e40a795b69e17a6504245";
// const GEOCODING_API_KEY = process.env.REACT_APP_GEOCODING_API_KEY;

export const getCoordinates = async (address) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${GEOCODING_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
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
