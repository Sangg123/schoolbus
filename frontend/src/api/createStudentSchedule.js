import api from "./api";

const createStudentSchedule = async (studentId, scheduleId, pickupStopId, dropoffStopId) => {
    try {
        const payload = {
            studentId,
            scheduleId,
            pickupStopId,
            dropoffStopId
        };

        const res = await api.post("/student-schedule", payload);
        return res.data;
    } catch (err) {
        console.error("Lỗi createStudentSchedule:", err.response?.data || err);
        throw err;
    }
};

export default createStudentSchedule;