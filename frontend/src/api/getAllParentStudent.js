import api from "./api";

const getAllParentStudent = async () => {
    try {
        const response = await api.get("/parent-student");
        return response.data; // hoặc response.data
    } catch (error) {
        console.error("Error fetching all parent-student data:", error);
        throw error;
    }
};

export default getAllParentStudent;
