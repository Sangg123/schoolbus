import api from "./api";

const getAllParent = async () => {
    try {
        const response = await api.get("/parent");
        return response.data 
    } catch (error) {
        console.error("Error fetching all parents:", error);
        throw error;
    }
};

export default getAllParent;
