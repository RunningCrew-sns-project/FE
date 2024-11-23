import Like from "../../components/Like/Like";
import { FaRegCommentDots } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

type BlogCardFooterprops = {
    blogId: number;
    likeCount: number;
    liked: boolean
}

const BlogCardFooter = (props: BlogCardFooterprops) => {

    const navigate = useNavigate();

    const handleMovetodetail = (blogId: number) => {
        navigate(`/blog/${blogId}`);
    }

    return (
        <>
            <div className="flex gap-2 py-4">
                <div><Like liked={props.liked} blogId={props.blogId} /></div>
                <div>{props.likeCount}</div>
                <div onClick={() => handleMovetodetail(props.blogId)}><FaRegCommentDots size="20" /></div>
            </div>
        </>
    );
};

export default BlogCardFooter;