import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // change if API is on a different origin
    headers: { "Content-Type": "application/json" },
});

// optional: attach token from localStorage on each request
api.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        const token = userInfo.accessToken;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
