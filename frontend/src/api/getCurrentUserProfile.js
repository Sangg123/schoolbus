import api from "./apiConfig";

const getCurrentUserProfile = async () => {
    try {
        const response = await api.get("/auth/me");
        return response.data;
    } catch (err) {
        console.error("Lỗi getCurrentUserProfile:", err);
        return null;
    }
};

export default getCurrentUserProfile;