import { useState } from "react";
import Button from "../../components/Button";
import BlogCard from "./BlogCard";
import { useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { getAllblogs } from "../../api/blog/api";
import InfiniteScroll from "../../components/InfiniteScroll";

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

    // const { data: blogarray, isLoading, isError, error } = useQuery({ queryKey: ['blogs'], queryFn: getAllblogs })

    const {
        data: blogarray,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery(
        {
            queryKey: ['blogs'],
            queryFn: getAllblogs,
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
                return responseData.nextCursor?.blogId;
            },
        }
    );

    if (!isLoading) {
        console.log('blogarray', blogarray)
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
                    {!isLoading && blogarray?.pages?.map((page, pageIndex) => (
                        <div key={pageIndex}>
                            {page.data.success.responseData.currentScrollItems.map((blog) => (
                                <div key={blog.blogId} className="rounded-lg shadow-lg mb-4">
                                    <BlogCard
                                        userImg={blog.userImg}
                                        userName={blog.userName}
                                        title={blog.title}
                                        record={blog.record}
                                        distance={blog.distance}
                                        imageUrl={blog.imageUrl}
                                        content={blog.content}
                                        liked={blog.liked}
                                        blogId={blog.blogId}
                                        likeCount={blog.likeCount}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <InfiniteScroll
                    isLastPage={!hasNextPage}
                    fetch={fetchNextPage}
                />
            </div>
        </>
    );
};

export default Blog;