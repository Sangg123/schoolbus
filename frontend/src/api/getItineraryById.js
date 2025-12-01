import api from "./api";

const getItineraryById = async (id) => {
  try {
    const res = await api.get(`/itinerary/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi getItineraryById:", err);
    throw err;
  }
};

export default getItineraryById;
