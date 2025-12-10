import api from "./api";

const getAllAttendace = async () => {
  try {
    const response = await api.get("/attendance");  
    return response.data;
  } catch (err) {
    console.error("Lỗi lấy danh sách attendance:", err.response?.data || err);
    throw err;
  }
};

export default getAllAttendace;