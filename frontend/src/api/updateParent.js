import api from "./api";

const updateParent = async (parentId, parentData) => {
    try {
        const response = await api.patch(`/parent/${parentId}`, parentData);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật parent :", error);
        throw error;
    }
};

export default updateParent;