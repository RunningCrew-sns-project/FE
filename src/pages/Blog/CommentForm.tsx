import { useState } from "react";
import Button from "../../components/Button";

type CommentProps = {
    isEdit: boolean;
    setisEdit: () => void;
    content: string;
    setdropdownOpen: () => void;
}

const CommentForm = ({ isEdit, setisEdit, content, setdropdownOpen }: CommentProps) => {


    const [editComment, seteditComment] = useState(content)
    // const [isEdit, setisEdit] = useState(false)

    //댓글 수정 입력하기
    const handlewriteEditcomment = (e: React.ChangeEvent<HTMLInputElement>) => {
        seteditComment(e.target.value)
    }

    //todo. 댓글 수정 
    const handlesubmitEditcomment = () => {
        console.log("댓글 수정 완료", editComment)
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
                        <input className="border border-2 border-slate-300 p-2 rounded-md w-dvw"
                            onChange={handlewriteEditcomment}
                            value={editComment}
                        >
                        </input>
                        <div className="flex ml-2 space-x-2">
                            <Button onClick={handlesubmitEditcomment} className="bg-[#BFFF00] w-20" type="submit">완료</Button>
                            <Button onClick={handlecancelEditcomment} className="bg-[#BFFF00] w-20" type="submit">취소</Button>
                        </div>
                    </div>
                </>
                : <div>{content}</div>}
        </>
    );
};

export default CommentForm;