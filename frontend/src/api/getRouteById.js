import api from "./api";

const getRouteById = async (id) => {
    try {
        const res = await api.get(`/route/${id}`);
        return res.data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default getRouteById;
