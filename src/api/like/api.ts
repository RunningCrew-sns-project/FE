import { http } from "../request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const changeblogLike = async (blogId:number) => {
    const response = await http.post(`/api/blog/like?blogId=${blogId}`);
    return response;
}

export const useLikeMutation = () => {

};