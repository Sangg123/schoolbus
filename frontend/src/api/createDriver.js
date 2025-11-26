import api from "./api";

const createDriver = async (userId, data) => {
  try {
    // data = { citizenId, licenseId }
    const response = await api.post("/driver", {
      userId,
      ...data,
    });
    return response.data;
  } catch (err) {
    console.error("CREATE DRIVER ERROR:", err);
    throw err;
  }
};

export default createDriver;
