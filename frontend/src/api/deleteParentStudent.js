import api from "./api";

const deleteParentStudent = async (parentStudentId) => {
    try {
        const response = await api.delete(`/parent-student/${parentStudentId}`);
        return response; // hoặc response.data
    } catch (error) {
        console.error("Error deleting parent-student relationship:", error);
        throw error;
    }
};

export default deleteParentStudent;