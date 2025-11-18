import api from './api' 


//send login request and set token to locahost
const login = async (identifier, password) => {
    var response = null
    try {
        response = await api.post("/auth/login", {identifier, password});
        if(response.status !== 200 && response.status !== 201) {
            throw new Error(response);
        }
        const data = response.data;
        const token = data.accessToken;
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }

};

export default login;
