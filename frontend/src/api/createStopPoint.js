import api from "./api";

const createStopPoint = async (name, address, latitude, longitude) => {
  try {
    const res = await api.post("/stop-point", {
      name,
      address,
      latitude,
      longitude
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi createStopPoint:", err);
    throw err;
  }
};

export default createStopPoint;
