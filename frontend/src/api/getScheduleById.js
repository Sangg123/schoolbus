import api from "./api";

const getScheduleById = async (id) => {
  try {
    const res = await api.get(`/schedule/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi getScheduleById:", err);
    throw err;
  }
};

export default getScheduleById;
