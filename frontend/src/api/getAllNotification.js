import api from "./api";

const getAllNotification = async () => {
  try {
    const res = await api.get("/notification"); 
    return res.data;
  } catch (err) {
    console.error("Lỗi lấy tất cả notification:", err.response?.data || err);
    return [];
  }
};

export default getAllNotification;
