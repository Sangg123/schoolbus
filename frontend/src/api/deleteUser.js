import api from './api'

const deleteUser = async (id) => {
    var response = null;
    try {
        response = await api.delete(`/users/${id}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default deleteUser;