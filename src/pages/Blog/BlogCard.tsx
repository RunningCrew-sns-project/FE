import Like from "../../components/Like/Like";
import BlogCardFooter from "./BlogCardFooter";

type BlogCardprops = {
    userName: string;
    userImg: string;
    blogId: number;
    title: string;
    content: string;
    record: string;
    distance: string;
    imageUrl: string;
    likeCount: number;
    liked: boolean
    createdAt: string;
}

const BlogCard = (props: BlogCardprops) => {

    return (
        <>
            <div className="h-screen w-full tablet:w-[700px] laptop:w-[1100px] mx-auto bg-white px-8 mx-6 mt-6 rounded-lg ">
                <div className="flex">
                    <img src={props.userImg}
                        className="w-12 h-12 rounded-full mt-3"></img>
                    <div className="ml-3 mt-6">{props.userName}</div>
                </div>
                <div>{props.title}</div>
                <img src={props.imageUrl}
                    className="w-full h-[400px]"></img>
                <BlogCardFooter liked={props.liked} blogId={props.blogId} likeCount={props.likeCount}></BlogCardFooter>
                <div>{props.content}</div>
                <div className="flex space-x-4">
                    <div>{props.record}</div>
                    <div>{props.distance}</div>
                </div>
            </div>
        </>

    );
};

export default BlogCard;