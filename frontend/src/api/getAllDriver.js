import api from "./api";

const getAllDriver = async (filters = {}) => {
    try {
        const response = await api.get("/driver", { params: filters });
        return response.data;
    } catch (err) {
        console.error("GET DRIVER ERROR:", err);
        throw err;
    }
};

export default getAllDriver;
