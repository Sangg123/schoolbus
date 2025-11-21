import api from './api'

const createBus = async (id, licensePlate, capacity, currentLat, currentLng) => {
    var response = null;
    try {
        response = await api.creaet(`/bus/${id}`, {licensePlate, capacity, currentLat, currentLng});
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default createBus;


