import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from "../request"; 

export const changeblogLike = async (blogId: number) => {
  console.log('change blogId',blogId)
  const response = await http.post(`/api/blog/like?blogId=${blogId}`);
  return response;
  // console.log(response)
};

export const useLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeblogLike, 
    onMutate: async (blogId) => {
      await queryClient.cancelQueries({queryKey:['blogs']});

      const previousBlogs = queryClient.getQueryData(['blogs']);

      queryClient.setQueryData('blogs', (old: any = []) =>
        old.map((blog: any) =>
          blog.id === blogId
            ? {
                ...blog,
                liked: !blog.liked,
              }
            : blog
        )
      );
      return { previousBlogs };
    },
    onError: (err, blogId, context) => {
      queryClient.setQueryData({queryKey:['blogs']}, context.previousBlogs);
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['blogs']);
    },
  });
};