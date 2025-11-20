import api from './api'

const deleteRoute = async (id) => {
    var response = null;
    try {
        response = await api.delete(`/route/${id}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default deleteRoute;