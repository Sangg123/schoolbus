import api from './api' 

const correctStudent = async (id, fullName, classes, studentCode) => {
    var response = null;
    try {
        const body = {fullName:fullName, class:classes, studentCode:studentCode}
        response = await api.patch(`/student/${id}`, body);
        return response;
    } catch (err) {
        console.error(err.response);
        throw err;
    }

};

export default correctStudent;
