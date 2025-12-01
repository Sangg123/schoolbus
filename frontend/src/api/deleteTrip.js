import api from "./api";

const deleteTrip = async (id) => {
    try {
        const response = await api.delete(`/trip/${id}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi deleteTrip:", error);
        throw error;
    }
};

export default deleteTrip;