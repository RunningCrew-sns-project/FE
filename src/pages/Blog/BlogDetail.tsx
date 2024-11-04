import BlogCard from "./BlogCard";
import { useParams } from 'react-router-dom';
import Comment from "./Comment";
import Button from "../../components/Button";
import { useQuery } from '@tanstack/react-query'
import { getBlogdetail } from "../../api/blog/api";
import { useMutation } from "@tanstack/react-query";
import { writeComment } from "../../api/comment/api";
import { useState } from "react";
import { useQueryClient } from '@tanstack/react-query';

type BlogDetailprops = {
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
}

const BlogDetail = () => {

    let { blogId } = useParams();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: writeComment,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogdetail', blogId]);
            toast.success('댓글이 삭제되었습니다!');
        },
        onError: (error) => {
            console.error("댓글 작성 실패:", error);
        },
    })

    const [commentContent, setcommentContent] = useState('')
    const { data: blogdetailarray, isLoading, isError, error } = useQuery({ queryKey: ['blogdetail', blogId], queryFn: () => getBlogdetail(blogId) })

    const handlechangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setcommentContent(e.target.value)
    }
    const handlesubmitcomment = (e: React.FormEvent) => {
        e.preventDefault();
        const writecommentData = {
            content: commentContent
        }
        mutate({ blogId: Number(blogId), writecommentData });
        setcommentContent('')
    }

    return (
        <>
            <div className="bg-black py-8">
                {!isLoading && (
                    <>
                        <div
                            className="w-full tablet:w-[700px] laptop:w-[1100px] mx-auto bg-white px-8 py-6 mt-6 rounded-lg shadow-lg"
                        >
                            <BlogCard
                                userImg={blogdetailarray.data.success.responseData.userImg}
                                userName={blogdetailarray.data.success.responseData.userName}
                                title={blogdetailarray.data.success.responseData.title}
                                record={blogdetailarray.data.success.responseData.record}
                                distance={blogdetailarray.data.success.responseData.distance}
                                imageUrl={blogdetailarray.data.success.responseData.imageUrl}
                                content={blogdetailarray.data.success.responseData.content}
                                liked={blogdetailarray.data.success.responseData.liked}
                                likeCount={blogdetailarray.data.success.responseData.likeCount}
                                blogId={blogdetailarray.data.success.responseData.blogId}
                            />
                            <div className="pt-4">
                                {blogdetailarray.data.success.responseData.comments.map((comment: Comment) => (
                                    <div key={comment.commentId} className="mb-2 w-full bg-gray-100 rounded-lg p-4">
                                        <Comment
                                            content={comment.content}
                                            userName={comment.userName}
                                            userImg={comment.userImg}
                                            createdAt={comment.createdAt}
                                            commentId={comment.commentId}
                                            blogId={comment.blogId}
                                        />
                                    </div>
                                ))}
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