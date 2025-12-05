import api from "./api";

const createItinerary = async (routeId, stopId, stopOrder) => {
  try {
    const body = { routeId, stopId, stopOrder };
    const res = await api.post("/itinerary", body);
    return res.data;
  } catch (err) {
    console.error("Lỗi createItinerary:", err.response?.data || err);
    throw err;
  }
};

export default createItinerary;
