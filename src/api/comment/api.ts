import { CommentProps } from "../../pages/Blog/Comment";
import { http } from "../request";

type UpdateCommentParams = {
    updatecommentData: CommentProps; 
    commentId: number; 
};

type WriteCommentParams = {
    writecommentData: CommentProps; 
    blogId: number; 
};

export const writeComment = async ({blogId, writecommentData}:WriteCommentParams) => {
    const response = await http.post(`/api/comment?blogId=${blogId}`,writecommentData);
    return response;
} 

export const updateComment = async ({commentId, updatecommentData}:UpdateCommentParams) => {
    const response = await http.put(`/api/comment?commentId=${commentId}`,updatecommentData);
    return response;
}

export const deleteComment = async (commentId: number) => {
    const response = await http.delete(`/api/comment?commentId=${commentId}`);
    return response;
}

export const getComment = async ({ blogId, pageParam }: { blogId: number; pageParam: number | null}) => {
    const cursor = pageParam;
    console.log('cursor:', cursor);
    const response = await http.get(`/api/comment?blogId=${blogId}&size=10&cursor=${cursor || ''}`);
    return response;
};