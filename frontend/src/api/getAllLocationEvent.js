import apt from "./api";

const getAllLocationEvent = async () => {
  try {
    const response = await apt.get("/location-event");
    return response.data;
  } catch (error) {
    console.error("Error fetching location events:", error);
    throw error;
  }
};

export default getAllLocationEvent;