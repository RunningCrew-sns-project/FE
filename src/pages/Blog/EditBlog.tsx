import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WriteBlogCard from '../Blog/WriteBlogCard'


const EditBlog = () => {
    const location = useLocation();
    const { feedData } = location.state || {};
    const [isEdit, setIsEdit] = useState(false)
    console.log('editblog', feedData)

    useEffect(() => {
        if (location.pathname.includes('edit')) {
            setIsEdit(true)
        }
    }, [])

    return (
        <>
            <WriteBlogCard
                content={feedData.content}
                blogId={feedData.blogId}
                distance={feedData.distance}
                imageUrl={feedData.imageUrl}
                record={feedData.record}
                title={feedData.title}
                isEdit={isEdit}
            ></WriteBlogCard>
        </>
    );
};

export default EditBlog;