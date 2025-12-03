import api from "./api";

const deleteParent = async (parentId) => {
    try {
        const response = await api.delete(`/parent/${parentId}`);   
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xoá parent :", error);
        throw error;
    }
};

export default deleteParent;