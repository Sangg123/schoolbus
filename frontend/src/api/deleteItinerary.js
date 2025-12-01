import api from "./api";

const deleteItinerary = async (id) => {
    try {
        const res = await api.delete(`/itinerary/${id}`);
        return res.data;
    } catch (err) {
        console.error("Lỗi deleteItinerary:", err);
        throw err;
    }
};

export default deleteItinerary;