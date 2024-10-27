import { useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

type LikeProps = {
    blogId: number;
}

const Like = ({ blogId }: LikeProps) => {

    const [liked, setLiked] = useState(false)

    //todo. 좋아요 api
    const handlelike = (blogId: number) => {
        setLiked((prev) => !prev)
    }
    return (
        <>
            <div onClick={() => handlelike(blogId)}>
                {liked ?

                    <FaThumbsUp size="20" /> :
                    <FaRegThumbsUp size="20" />}
            </div>
        </>
    );
};

export default Like;