import api from "./api";

const createParentStudent = async (parentStudentData) => {
    try {
        // kiểm tra endpoint thật sự trên server, ví dụ là /parent-students
        const response = await api.post("/parent-student", parentStudentData);
        return response.data;
    } catch (error) {
        console.error("Error creating parent-student relationship:", error);
        throw error;
    }
};

export default createParentStudent;
