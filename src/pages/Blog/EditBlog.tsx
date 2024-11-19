import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WriteBlogCard from '../Blog/WriteBlogCard'


const EditBlog = () => {
    const location = useLocation();
    const { feedData } = location.state || {};
    const [isEdit, setIsEdit] = useState(false)
    console.log(feedData)

    useEffect(() => {
        if (location.pathname.includes('edit')) {
            setIsEdit(true)
        }
    }, [])

    return (
        <>
            <WriteBlogCard
                content={feedData[0].content}
                blogId={feedData[0].blogId}
                distance={feedData[0].distance}
                imageUrl={feedData[0].imageUrl}
                record={feedData[0].record}
                title={feedData[0].title}
                isEdit={isEdit}
            ></WriteBlogCard>
        </>
    );
};

export default EditBlog;