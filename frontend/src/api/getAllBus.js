import api from './api'

const getAllBus = async (licensePlate, capacity, currentLat, currentLng) => {
    var response = null;
    try {
        response = await api.get("/bus", {licensePlate, capacity, currentLat, currentLng });
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAllBus;


