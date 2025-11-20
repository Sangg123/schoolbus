
import api from './api'

const modifyRoute = async (id, name, description) => {
    var response = null;
    try {
        response = await api.patch(`/route/${id}`, {name, description});
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default modifyRoute;