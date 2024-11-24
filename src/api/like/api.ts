import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from "../request"; 

export const changeblogLike = async (blogId: number) => {
  const response = await http.post(`/api/blog/like?blogId=${blogId}`);
  return response;
};

export const useLikeMutation = (blogId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeblogLike, 
    onMutate: async (blogId: number) => {
      await queryClient.cancelQueries({queryKey:['blogs']});
      await queryClient.cancelQueries({ queryKey: ['blogdetail', blogId] });

      const previousBlogs = queryClient.getQueryData(['blogs']);
      const previousBlogDetail = queryClient.getQueryData(['blogdetail', blogId]);

      queryClient.setQueryData(['blogs'], (old: any = { pages: [] }) => {
        return {
          ...old,
          pages: old.pages.map((page: any) => {
            return {
              ...page,
              data: {
                ...page.data,
                success: {
                  ...page.data.success,
                  responseData: {
                    ...page.data.success.responseData,
                    currentScrollItems: page.data.success.responseData.currentScrollItems.map((blog: any) =>
                      blog.blogId === blogId
                        ? {
                            ...blog,
                            liked: !blog.liked, 
                          }
                        : blog
                    ),
                  },
                },
              },
            };
          }),
        };
      });
      queryClient.setQueryData(['blogdetail', blogId], (oldData: any) => {
        if (oldData && oldData.data && oldData.data.success && oldData.data.success.responseData) {
          const isLiked = oldData.data.success.responseData.liked;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              success: {
                ...oldData.data.success,
                responseData: {
                  ...oldData.data.success.responseData,
                  liked: !oldData.data.success.responseData.liked, 
                  likeCount: isLiked ? oldData.data.success.responseData.likeCount - 1 : oldData.data.success.responseData.likeCount + 1,
                },
              },
            },
          };
        }
        return oldData;
      });
      return { previousBlogs, previousBlogDetail };
    },
    onError: (err, context :any ) => {
      queryClient.setQueryData(['blogs'], context.previousBlogs);
      queryClient.setQueryData(['blogdetail', context.previousBlogDetail?.blogId], context.previousBlogDetail);
      console.log(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['blogs']});
      queryClient.invalidateQueries({ queryKey: ['blogdetail', blogId] });
    },
  });
};