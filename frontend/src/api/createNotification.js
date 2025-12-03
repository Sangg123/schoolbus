import api from "./api";

const createNotification = async (notificationData) => {
  try {
    const response = await api.post("/notification", notificationData);
    return response.data;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

export default createNotification;