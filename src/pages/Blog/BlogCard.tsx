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
            <div className="bg-white w-100 mb-5 mx-6 rounded-lg">
                <div className="flex">
                    <img src={props.userImg}
                        className="w-12 h-12 rounded-full"></img>
                    <div className="t-12">{props.userName}</div>
                </div>
                <div>{props.title}</div>
                <img src={props.imageUrl}
                    className="w-90 h-52 justify-center"></img>
                <div>{props.content}</div>
                <div className="flex space-x-4">
                    <div>{props.record}</div>
                    <div>{props.distance}</div>
                </div>
                <BlogCardFooter liked={props.liked} blogId={props.blogId} likeCount={props.likeCount}></BlogCardFooter>
            </div>
        </>

    );
};

export default BlogCard;