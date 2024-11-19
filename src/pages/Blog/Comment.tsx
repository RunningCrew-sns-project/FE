import Button from "../../components/Button";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import ApplicationModal from "../../components/ApplicationModal";
import CommentDropdown from "./CommentDropdown";
import CommentForm from "./CommentForm";
import toast from 'react-hot-toast'
import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../api/comment/api";
import { useQueryClient } from '@tanstack/react-query';
import useAuthStore from "../../store/useAuthStore";

type CommentProps = {
    blogId: number;
    commentId: number;
    content: string;
    userName: string;
    userImg: string;
    createdAt: string;
    userId: number;
}

const Comment = (props: CommentProps) => {

    const { userId } = useAuthStore()
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
            console.log("댓글 삭제 성공:", data);
            queryClient.invalidateQueries(['comment', props.blogId]);
        },
        onError: (error) => {
            console.error("댓글 삭제 실패:", error);
        },
    })

    const [isEdit, setisEdit] = useState(false)
    const [dropdownOpen, setdropdownOpen] = useState(false)
    const [confirmDeleteOpen, setconfirmDeleteOpen] = useState(false)

    //...아이콘 누르면 수정/삭제버튼 뜸
    const Opendropdown = () => {
        setdropdownOpen((prev) => !prev)
    }

    //삭제버튼 누르면 -> 삭제할래요! 취소 누르는 모달 뜨기
    const handleDeleteComment = () => {
        setconfirmDeleteOpen((prev) => !prev)
    }

    //수정 버튼 누를 때
    const handleEditComment = () => {
        setisEdit(true)
    }

    //삭제버튼 누르면 -> 삭제할래요! 취소 누르는 모달 뜨고 여기서 취소 누르는 경우
    const handlecloseModal = () => {
        setconfirmDeleteOpen(false)
    }

    const handleconfirmDeletecomment = () => {
        mutate(props.commentId);
        toast.success('삭제되었습니다!')
        setconfirmDeleteOpen(false)
    }

    const renderDropdownMenu = () => {
        if (!dropdownOpen || isEdit) return null;
        return (
            <div className="flex flex-col justify-center items-center border border-gray-400 rounded">
                <Button onClick={handleEditComment} className="bg-transparent">수정</Button>
                <Button onClick={handleDeleteComment} className="bg-transparent">삭제</Button>
            </div>
        );
    };

    return (
        <>
            <div className="flex items-center">
                <img src={props.userImg}
                    className="w-12 h-12 rounded-full mt-3"></img>
                <div className="ml-3 mt-6">{props.userName}</div>
                {userId === props.userId && <div className="ml-auto" onClick={Opendropdown}>
                    <IoIosMore />
                </div>}
                <div>
                    {renderDropdownMenu()}
                </div>
            </div>
            <div>
                <CommentForm commentId={props.commentId} blogId={props.blogId} isEdit={isEdit} setisEdit={setisEdit} content={props.content} setdropdownOpen={setdropdownOpen}></CommentForm>
            </div>
            <div className="text-gray-500">{props.createdAt}</div>
            {confirmDeleteOpen ? <ApplicationModal
                leftButtontext="삭제할래요!!"
                rightbuttontext="취소"
                leftButtonevent={handleconfirmDeletecomment}
                rightbuttonevent={handlecloseModal}>
                <div>해당 댓글을 삭제하시겠습니까??</div>
            </ApplicationModal> : ''}

        </>
    );
};


export default Comment;