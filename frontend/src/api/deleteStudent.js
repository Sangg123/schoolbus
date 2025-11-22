import api from './api' 

const correctStudent = async (id) => {
    var response = null;
    try {
        response = await api.delete(`/student/${id}`);
        return response;
    } catch (err) {
        console.error(err.response);
        throw err;
    }

};

export default correctStudent;
