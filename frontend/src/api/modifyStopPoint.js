import api from "./api";

const modifyStopPoint = async (id, data) => {
  try {
    const res = await api.patch(`/stop-point/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Lỗi modifyStopPoint:", err);
    throw err;
  }
};

export default modifyStopPoint;
