import { http } from "../request";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const changeblogLike = async (blogId:number) => {
    const response = await http.post(`/api/blog/like?blogId=${blogId}`);
    return response;
}

const queryClient = useQueryClient();

export const likeMutation = useMutation({
    mutationFn: changeblogLike,
    onMutate: {}
});