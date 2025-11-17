import api from './api' 

const login = async (identifier, password) => {
    try {
        const request = await api.post("auth/login", {identifier, password});
        const response = await request.data
        console.log(response)
        const token = await response.accessToken;
        if (!token) throw new Error("Missing token response from login");
        localStorage.setItem("userInfo", JSON.stringify(response));
        localStorage.setItem("token", token);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch (err) {
        console.error(err)
    }
};

export default login;
