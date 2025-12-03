import api from './api';

const updateParentStudent = async (id, parentId, studentId) => {
    try {
        const response = await api.patch(`/parent-students/${id}`, {
            parentId,
            studentId
        });
        return response.data;
    } catch (error) {
        console.error('Error updating parent-student relationship:', error);
        throw error;
    }
};

export default updateParentStudent;