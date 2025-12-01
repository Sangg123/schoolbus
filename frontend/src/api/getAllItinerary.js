import api from "./api";

const getAllItinerary = async () => {
    try {
        const res = await api.get("/itinerary");
        return res.data;
    } catch (err) {
        console.error("Lỗi getAllItinerary:", err);
        throw err;
    }
};

export default getAllItinerary;