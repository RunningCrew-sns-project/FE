import Button from "../../components/Button";
import { IoIosMore } from "react-icons/io";
import { useState } from "react";
import ApplicationModal from "../../components/ApplicationModal";
import CommentDropdown from "./CommentDropdown";
import CommentForm from "./CommentForm";
import toast from 'react-hot-toast'


type CommentProps = {
    blogId: number;
    commentId: number;
    content: string;
    userName: string;
    userImg: string;
    createdAt: string;
}

const Comment = (props: CommentProps) => {

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
        console.log(isEdit)
    }

    //삭제버튼 누르면 -> 삭제할래요! 취소 누르는 모달 뜨고 여기서 취소 누르는 경우
    const handlecloseModal = () => {
        setconfirmDeleteOpen(false)
    }

    //todo. 댓글삭제 
    const handleconfirmDeletecomment = () => {
        toast.success('삭제되었습니다!')
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
                <div className="ml-auto" onClick={Opendropdown}>
                    <IoIosMore />
                </div>
                <div>
                    {renderDropdownMenu()}
                </div>
            </div>
            <div>
                <CommentForm isEdit={isEdit} setisEdit={setisEdit} content={props.content} setdropdownOpen={setdropdownOpen}></CommentForm>
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