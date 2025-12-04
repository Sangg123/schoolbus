import api from "./api";

const createStudent = async (student) => {
    try {
        return await api.post("/student", student);
    } catch (err) {
        console.error(err.response);
        throw err;
    }
};

export default createStudent;
