import api from "./api";

const deleteDriver = async (id) => {
    var response = null;
    try {
        response = await api.delete(`/driver/${id}`);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default deleteDriver;