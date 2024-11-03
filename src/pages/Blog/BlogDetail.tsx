import BlogCard from "./BlogCard";
import { useParams } from 'react-router-dom';
import Comment from "./Comment";
import Button from "../../components/Button";

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

    //todo. blogId에 해당하는 BlogCarddetail api 
    const blogdetailarray =
        [{
            userImg: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/elderly-man-icon.png",
            userName: "user1",
            blogId: 93,
            title: "블로그 제목 입력1",
            content: "블로그 내용 입력1",
            record: "00:15:00",
            distance: "1.5km",
            imageUrl: ["https://running-crew.s3.ap-northeast-2.amazonaws.com/default_image/blog_default.jpg"],
            likeCount: 1,
            liked: true,
            createdAt: "2024-10-24T16:26:13",
            comments: [
                {
                    blogId: 93,
                    commentId: 28,
                    content: "댓글입니당",
                    userName: "user3",
                    userImg: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/elderly-man-icon.png",
                    createdAt: "2024-10-24T00:00:00"
                },
                {
                    blogId: 93,
                    commentId: 29,
                    content: "댓글입니당2",
                    userName: "user4",
                    userImg: "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/elderly-man-icon.png",
                    createdAt: "2024-10-24T00:00:00"
                }]
        }]

    //todo.댓글작성 api 
    const handlesubmitcomment = () => {

    }

    return (
        <>
            <div className="bg-black py-8">
                {blogdetailarray.map((blogdetail: BlogDetailprops) => (
                    <div
                        key={blogdetail.blogId}
                        className="w-full tablet:w-[700px] laptop:w-[1100px] mx-auto bg-white px-8 py-6 mt-6 rounded-lg shadow-lg"
                    >
                        <BlogCard
                            userImg={blogdetail.userImg}
                            userName={blogdetail.userName}
                            title={blogdetail.title}
                            record={blogdetail.record}
                            distance={blogdetail.distance}
                            imageUrl={blogdetail.imageUrl}
                            content={blogdetail.content}
                            liked={blogdetail.liked}
                            likeCount={blogdetail.likeCount}
                            blogId={blogdetail.blogId}
                        />
                        <div className="pt-4">
                            {blogdetail.comments.map((comment: Comment) => (
                                <div key={comment.commentId} className="mb-2 w-full bg-gray-100 rounded-lg p-4">
                                    <Comment
                                        content={comment.content}
                                        userName={comment.userName}
                                        userImg={comment.userImg}
                                        createdAt={comment.createdAt}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                            <input
                                type="text"
                                placeholder="댓글을 입력하세요"
                                className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#BFFF00]"
                            />
                            <Button
                                onClick={handlesubmitcomment}
                                className="bg-[#BFFF00] text-white px-4 py-2 rounded-md hover:bg-[#aaff00] transition"
                                type="submit"
                            >
                                완료
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogDetail;