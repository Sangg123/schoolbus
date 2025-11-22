import api from './api'

const getAllDriver = async (userId, citizenId, licenseId) => {
    var response = null;
    try {
        response = await api.post("/dirver", {userId, citizenId, licenseId});
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default getAllDriver;