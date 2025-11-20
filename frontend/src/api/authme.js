import api from "./api";

const authMe = async () => {
    var response = null;
    try {
        response = await api.get("/auth/me");
        if (resopnse.status !== 200) {
            throw new Error(response)
        }
        return response
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default authMe;