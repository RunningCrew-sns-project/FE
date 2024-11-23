import BlogCard from "./BlogCard";
import { useParams } from 'react-router-dom';
import Comment from "./Comment";
import Button from "../../components/Button";
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getBlogdetail } from "../../api/blog/api";
import { useMutation } from "@tanstack/react-query";
import { getComment, writeComment } from "../../api/comment/api";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import InfiniteScroll from "../../components/InfiniteScroll";

type BlogDetailTypes = {
    userName: string;
    userImg: string;
    blogId: number;
    title: string;
    content: string;
    record: string;
    distance: string;
    imageUrl: string[];
    likeCount: number;
    liked: boolean
    createdAt: string;
    comments: Comment[]
}

type Comment = {
    blogId: number;
    commentId: number;
    content: string;
    userName: string;
    userImg: string;
    createdAt: string;
    userId: number;
}

const BlogDetail = () => {

    let { blogId } = useParams();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: writeComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogdetail', blogId]);
            toast.success('댓글이 작성되었습니다!');
        },
        onError: (error) => {
            console.error("댓글 작성 실패:", error);
        },
    });

    const [commentContent, setcommentContent] = useState('');

    const { data: blogdetailarray, isLoading } = useQuery({
        queryKey: ['blogdetail', blogId],
        queryFn: () => getBlogdetail(blogId)
    });

    const {
        data: commentarray,
        isLoading: commentloading,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery({
        queryKey: ['comment', blogId],
        queryFn: ({ pageParam }) => getComment({ blogId: Number(blogId), pageParam }),
        getNextPageParam: (lastPage) => {
            if (!lastPage) {
                return false;
            }

            const responseData = lastPage.data.success.responseData;
            const currentScrollItems = responseData.currentScrollItems;
            const lastScroll = responseData.lastScroll;

            if (currentScrollItems.length === 0 && lastScroll) {
                return false;
            }
            return responseData.nextCursor?.commentId;
        },
    });

    if (isLoading) return <div>Loading...</div>;

    if (!blogdetailarray) {
        return <div>블로그 데이터가 없습니다.</div>;
    }

    const blogDetail: BlogDetailTypes = blogdetailarray.data.success.responseData;

    if (!commentloading) {
        const isLastPage = commentarray?.pages[0]?.data?.success?.responseData.lastScroll
        console.log('isLastPage', isLastPage)
    }

    const handlechangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setcommentContent(e.target.value);
    };

    const handlesubmitcomment = (e: React.FormEvent) => {
        e.preventDefault();
        const writecommentData = {
            content: commentContent
        };
        mutate({ blogId: Number(blogId), writecommentData });
        setcommentContent('');
    };

    return (
        <>
            <div className="bg-black py-8">
                {!isLoading && (
                    <>
                        <div
                            className="w-full tablet:w-[700px] laptop:w-[1100px] mx-auto bg-white px-8 py-6 mt-6 rounded-lg shadow-lg"
                        >
                            <BlogCard
                                userImg={blogDetail.userImg}
                                userName={blogDetail.userName}
                                title={blogDetail.title}
                                record={blogDetail.record}
                                distance={blogDetail.distance}
                                imageUrl={blogDetail.imageUrl}
                                content={blogDetail.content}
                                liked={blogDetail.liked}
                                likeCount={blogDetail.likeCount}
                                blogId={blogDetail.blogId}
                            />
                            <div className="pt-4">
                                {!commentloading && commentarray?.pages[0]?.data?.success?.responseData?.currentScrollItems?.length === 0 ? (
                                    <div className="text-center text-gray-500">댓글이 없습니다.</div>
                                ) : (
                                    commentarray?.pages?.map((page, pageIndex) => (
                                        <div key={pageIndex}>
                                            {page.data?.success?.responseData?.currentScrollItems?.map((comment: Comment) => (
                                                <div key={comment.commentId} className="mb-2 w-full bg-gray-100 rounded-lg p-4">
                                                    <Comment
                                                        content={comment.content}
                                                        userName={comment.userName}
                                                        userImg={comment.userImg}
                                                        createdAt={comment.createdAt}
                                                        commentId={comment.commentId}
                                                        blogId={comment.blogId}
                                                        userId={comment.userId}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))
                                )}
                                <InfiniteScroll
                                    isLastPage={!hasNextPage}
                                    fetch={fetchNextPage}
                                />
                            </div>
                            <div className="flex items-center gap-2 mt-6">
                                <form onSubmit={handlesubmitcomment}>
                                    <input
                                        type="text"
                                        placeholder="댓글을 입력하세요"
                                        className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#BFFF00]"
                                        value={commentContent}
                                        onChange={handlechangeComment}
                                    />
                                    <Button
                                        theme="primary"
                                        className="bg-[#BFFF00] text-white px-4 py-2 rounded-md hover:bg-[#aaff00] transition"
                                        type="submit"
                                    >
                                        완료
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default BlogDetail;