import api from './api'

const getAllUser = async (email, fullName, phone, role) => {
    var response = null;
    try {
        response = await api.get("/users", {email, fullName, phone, role});
        if (response.status !== 200) {
            throw new Error(response);
        }
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAllUser;