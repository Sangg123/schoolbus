import api from "./api";

const createTrip = async (tripData) => {
    try {
        const response = await api.post("/trip", tripData); 
        return response.data;
    }
    catch (err) {
        console.error("Lỗi tạo chuyến đi:", err);
        throw err;
    }
};

export default createTrip;