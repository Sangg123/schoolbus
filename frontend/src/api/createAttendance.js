import api from "./api";

const createAttendance = async (attendance) => {
  try {
    const response = await api.post("/attendance", attendance);
    return response.data;
  } catch (err) {
    console.error("Lỗi tạo attendance:", err.response?.data || err);
    throw err;
  }
};

export default createAttendance;
