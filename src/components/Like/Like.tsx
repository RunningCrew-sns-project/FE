import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { useLikeMutation } from "../../api/like/api";

type LikeProps = {
    blogId: number;
    liked: boolean;
}

const Like = ({ blogId, liked }: LikeProps) => {

    const { mutate } = useLikeMutation();

    //todo. 좋아요 api
    const handlelike = (blogId: number) => {
        console.log('좋아요눌러')
        console.log(liked)
        mutate(blogId);
    }
    return (
        <>
            <div onClick={() => handlelike(blogId)}>
                {liked ?

                    <FaThumbsUp size="20" /> :
                    <FaRegThumbsUp size="20" />
                }
            </div>
        </>
    );
};

export default Like;