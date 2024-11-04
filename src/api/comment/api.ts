import { http } from "../request";

export const writeComment = async (blogId,CommentData) => {
    const response = await http.post(`/api/comment/${blogId}`,CommentData);
    return response;
} 

export const updateComment = async (CommentId:number) => {
    const response = await http.put(`/api/comment/${CommentId}`);
    return response;
}

export const deleteComment = async () => {
    const response = await http.delete(`/api/comment`);
    return response;
}