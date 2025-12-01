import api from "./api";

const deleteSchedule = async (id) => {
  try {
    const res = await api.delete(`/schedule/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi deleteSchedule:", err);
    throw err;
  }
};

export default deleteSchedule;
