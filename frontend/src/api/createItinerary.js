import api from "./api";

const createItinerary = async (data) => {
  try {
    const res = await api.post("/itinerary", data);
    return res.data;
  } catch (err) {
    console.error("Lỗi createItinerary:", err.response?.data || err);
    throw err;
  }
};

export default createItinerary;
