import { useState } from "react";
import Button from "../../components/Button";
import BlogCard from "./BlogCard";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { getAllblogs } from "../../api/blog/api";

type BlogType = {
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

}

const Blog = () => {

    const { data: blogarray, isLoading, isError, error } = useQuery({ queryKey: ['blogs'], queryFn: getAllblogs })

    if (!isLoading) {
        console.log(blogarray)
    }

    const navigate = useNavigate();
    const handleMovewriteBlogCardpage = () => {
        navigate(`/writeBlogCard`);
    }

    return (
        <>
            <div className="bg-black min-h-screen py-6">
                <div className="flex justify-end mr-4 mb-4">
                    <Button className="bg-[#BFFF00]" onClick={handleMovewriteBlogCardpage}>+</Button>
                </div>
                <div className="flex flex-col gap-4 px-4 ">
                    {!isLoading && blogarray.data.success.responseData.currentScrollItems.map((blog) => (
                        <div key={blog.blogId} className=" rounded-lg shadow-lg">
                            <BlogCard key={blog.blogId}
                                userImg={blog.userImg}
                                userName={blog.userName}
                                title={blog.title}
                                record={blog.record}
                                distance={blog.distance}
                                imageUrl={blog.imageUrl}
                                content={blog.content}
                                liked={blog.liked}
                                blogId={blog.blogId}
                                likeCount={blog.likeCount}>
                            </BlogCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Blog;