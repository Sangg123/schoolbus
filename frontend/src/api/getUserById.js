import api from './api'

const getAllUserById = async (id) => {
    var response = null;
    try {
        response = await api.get(`/users/${id}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAllUserById;