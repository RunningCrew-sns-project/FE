import { useState } from "react";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../api/comment/api";
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'

type CommentProps = {
    isEdit: boolean;
    setisEdit: (value: boolean) => void;
    content: string;
    setdropdownOpen: (value: boolean) => void;
    blogId: number;
    commentId: number;
}


const CommentForm = ({ isEdit, setisEdit, content, setdropdownOpen, blogId, commentId }: CommentProps) => {

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries(['blogdetail', blogId]);
        },
        onError: (error) => {
            console.error("댓글 삭제 실패:", error);
        },
    })

    const [editComment, seteditComment] = useState(content)

    const handlewriteEditcomment = (e: React.ChangeEvent<HTMLInputElement>) => {
        seteditComment(e.target.value)
    }

    const handlesubmitEditcomment = (e: React.FormEvent) => {
        e.preventDefault();
        const updatecommentData = {
            content: editComment
        }
        mutate({ commentId, updatecommentData });
        setisEdit(false)
        setdropdownOpen(false)
        toast.success('댓글이 수정되었습니다!')
    }

    const handlecancelEditcomment = () => {
        setisEdit(false)
        setdropdownOpen(false)
    }


    return (
        <>
            {isEdit ?
                <>
                    <div className="flex mt-3">
                        <form onSubmit={
                            handlesubmitEditcomment
                        }>
                            <input className="border border-2 border-slate-300 p-2 rounded-md w-dvw"
                                onChange={handlewriteEditcomment}
                                value={editComment}
                            >
                            </input>
                            <div className="flex ml-2 space-x-2">
                                <Button onClick={handlesubmitEditcomment} className="bg-[#BFFF00] w-20" type="submit">완료</Button>
                                <Button onClick={handlecancelEditcomment} className="bg-[#BFFF00] w-20" type="submit">취소</Button>
                            </div>
                        </form>
                    </div>
                </>
                : <div>{content}</div>}
        </>
    );
};

export default CommentForm;