import api from './api'

const deleteBus = async (id) => {
    var response = null;
    try {
        response = await api.delete(`/bus/${id}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default deleteBus;


