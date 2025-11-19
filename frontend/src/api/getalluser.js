import api from './api'

const getalluser = async (email, fullName, phone, role) => {
    var response = null;
    try {
        response = await api.get("/users", {email, fullName, phone, role});
        console.log(response)
        if (response.status !== 200) {
            throw new Error(response);
        }
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getalluser;