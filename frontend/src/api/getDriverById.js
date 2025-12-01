import api from "./api";

const getDriverById = async (id) => {
    try {
        const res = await api.get(`/driver/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default getDriverById;
