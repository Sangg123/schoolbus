import api from "./api";

const getStopPointById = async (id) => {
  try {
    const res = await api.get(`/stop-point/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi getStopPointById:", err);
    throw err;
  }
};

export default getStopPointById;
