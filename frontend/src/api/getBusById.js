import api from "./api";

const getBusById = async (id) => {
    try {
        const res = await api.get(`/bus/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default getBusById;
