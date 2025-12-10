import api from "./api";

const getStudentById = async (id) => {
  try {
    const res = await api.get(`/student/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi getStudentById:", err);
    throw err;
  }
};

export default getStudentById;