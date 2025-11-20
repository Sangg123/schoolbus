import api from './api' 

const getAllStudent = async (fullName, classes, studentCode) => {
    var response = null;
    try {
        const body = {fullName:fullName, class:classes, studentCode:studentCode}
        response = await api.get("/student", body);
        return response;
    } catch (err) {
        console.error(err.response);
        throw err;
    }

};

export default getAllStudent;
