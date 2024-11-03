import { useState } from "react";
import Button from "../../components/Button";
import BlogCard from "./BlogCard";
import { useNavigate } from 'react-router-dom';

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

type BloglistType = BlogType[]

const Blog = () => {

    const [showModal, setshowModal] = useState(false)
    const blogarray: BloglistType = [{
        userName: "user1",
        userImg: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/elderly-man-icon.png",
        blogId: 93,
        title: "블로그 제목 입력1",
        content: "블로그 내용 입력1",
        record: "00:15:00",
        distance: "1.5km",
        imageUrl: ["https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg", "https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"],
        likeCount: 0,
        liked: false,
        createdAt: "2024-10-24T16:26:13"
    }, {
        userName: "user2",
        userImg: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/elderly-man-icon.png",
        blogId: 94,
        title: "블로그 제목 입력2",
        content: "블로그 내용 입력2",
        record: "00:15:00",
        distance: "1.5km",
        imageUrl: ["https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg", "https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"],
        likeCount: 0,
        liked: false,
        createdAt: "2024-10-24T16:26:13"
    },
    ]

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
                    {blogarray.map((blog) => (
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