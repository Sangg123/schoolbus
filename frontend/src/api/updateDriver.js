import api from "./api";

const updateDriver = async (id, data) => {
    try {
        const response = await api.patch(`/driver/${id}`, data);
        return response.data;
    } catch (err) {
        console.error("UPDATE DRIVER ERROR:", err);
        throw err;
    }
};

export default updateDriver;
