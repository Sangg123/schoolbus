import api from "./api";

const deleteStopPoint = async (id) => {
  try {
    const res = await api.delete(`/stop-point/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi deleteStopPoint:", err);
    throw err;
  }
};

export default deleteStopPoint;
