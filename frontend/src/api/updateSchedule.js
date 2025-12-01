import api from "./api";

const updateSchedule = async (id, updatedData) => {
  try {
    const res = await api.patch(`/schedule/${id}`, updatedData);
    return res.data;
  } catch (err) {
    console.error("Lỗi updateSchedule:", err);
    throw err;
  }
};

export default updateSchedule;
