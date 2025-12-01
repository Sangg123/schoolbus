import api from "./api";

const getAllStudentSchedule = async () => {
    try {
        const response = await api.get("/student-schedule");
        return response.data;
    } catch (err) {
        console.error("Lỗi getAllStudentSchedule:", err);
        return [];
    }
};

export default getAllStudentSchedule;