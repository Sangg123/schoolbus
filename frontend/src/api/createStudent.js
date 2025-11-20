import { createInstance } from '@testing-library/user-event/dist/cjs/setup/setup.js';
import api from './api' 

const createStudent = async (fullName, classes, studentCode) => {
    var response = null;
    try {
        const body = {fullName:fullName, class:classes, studentCode:studentCode}
        response = await api.post("/student", body);
        return response;
    } catch (err) {
        console.error(err.response);
        throw err;
    }

};

export default createStudent;
