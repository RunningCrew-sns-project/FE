import { http } from "../request";

export const writeComment = async ({blogId, writecommentData}) => {
    const response = await http.post(`/api/comment/${blogId}`,writecommentData);
    return response;
} 

export const updateComment = async ({commentId, updatecommentData}) => {
    const response = await http.put(`/api/comment/${commentId}`,updatecommentData);
    return response;
}

export const deleteComment = async (commentId) => {
    const response = await http.delete(`/api/comment?commentId=${commentId}`);
    return response;
}

export const getComment = async (blogId) => {
    try {
        const response = await http.get(`/api/comment?blogId=${blogId}`);
        return response.data; 
    } catch (error) {
        return [];
    }
}