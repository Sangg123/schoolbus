
import api from './api'

const addUser = async (email, password, fullName, phone, role) => {
    var response = null;
    try {
        response = await api.post("/users", {email, password, fullName, phone, role});
        return response;
    } catch (err) {
        console.error(err);
        console.error(err.response);
        throw err;
    }
};

export default addUser;