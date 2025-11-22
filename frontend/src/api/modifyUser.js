import api from './api'

const modifyuser = async (id, email, password, fullName, phone, role) => {
    var response = null;
    try {
        response = await api.patch(`/user/${id}`, {email, password, fullName, phone, role});
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default modifyuser;