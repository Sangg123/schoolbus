import api from "./api";

const updateTrip = async (tripId, tripData) => {
    try {
        const response = await api.patch(`/trip/${tripId}`, tripData);
        return response.data;
    } catch (err) {
        console.error("Lỗi cập nhật chuyến đi:", err);
        throw err;
    }
};

export default updateTrip;