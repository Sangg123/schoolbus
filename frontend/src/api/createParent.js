import api from "./api";

const createParent = async (parentData) => {
    try {
        const response = await api.post("/parent", parentData);
        return response.data;
    } catch (error) {
        console.error("Error creating parent:", error);
        throw error;
    }
};

export default createParent;