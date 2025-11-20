import api from './api'

const getAllRoute = async (name, description) => {
    var response = null;
    try {
        response = await api.get(`/route?name=${name}&description=${description}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAllUser;