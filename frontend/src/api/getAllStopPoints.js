import api from "./api";

const getAllStopPoints = async () => {
  try {
    const res = await api.get("/stop-point");
    return res.data;
  } catch (err) {
    console.error("Lỗi getAllStopPoints:", err);
    throw err;
  }
};

export default getAllStopPoints;
