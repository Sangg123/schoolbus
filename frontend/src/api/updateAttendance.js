import api from "./api";

const updateAttendance = async (attendanceId, updatedData) => {
  try {
    const response = await api.patch(`/attendance/${attendanceId}`, updatedData);
    return response.data;
  } catch (err) {
    console.error("Lỗi cập nhật attendance:", err.response?.data || err);
    throw err;
  }
};

export default updateAttendance;