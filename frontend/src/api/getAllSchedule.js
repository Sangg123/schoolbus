import api from "./api";

const getAllSchedule = async () => {
  try {
    const res = await api.get("/schedule");
    return res.data;
  } catch (err) {
    console.error("Lỗi getAllSchedule:", err);
    throw err;
  }
};

export default getAllSchedule;
