import api from "./api"; 

const modifyItinerary = async (id, updatedData) => {
  try {
    const res = await api.patch(`/itinerary/${id}`, updatedData);
    return res.data;
    } catch (err) {
    console.error("Lỗi modifyItinerary:", err);
    throw err;
  }
};

export default modifyItinerary;