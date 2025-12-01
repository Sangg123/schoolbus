import api from "./api";

const getAllTrip = async (scheduleId) => {
    try {
        const response = await api.get("/trip", { params: { scheduleId } });
        return response.data;
    } catch (err) {
        console.error("Lỗi getAllTrip:", err);
        return [];
    }
};

export default getAllTrip;