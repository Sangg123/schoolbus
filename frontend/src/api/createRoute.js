import api from './api'

const createRoute = async (name, description) => {
    var response = null;
    try {
        response = await api.post("/route", {name, description});
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default createRoute;