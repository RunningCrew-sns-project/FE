import { ReactNode, useEffect, useRef, useState } from "react";
import Button from "./Button";
import ReactDOM from 'react-dom';

type ModalProps = {
    children: ReactNode;
    leftButtontext: string;
    rightbuttontext: string;
    leftButtonevent: () => void;
    rightbuttonevent: () => void;
    leftvisible?: true
}

const ApplicationModal = ({ leftButtontext, rightbuttontext, leftButtonevent, rightbuttonevent, leftvisible, children }: ModalProps) => {

    //todo.모달 창 바깥클릭하면 모달이 닫히게 
    const modalRef = useRef();

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"  >
                <div className="bg-white w-100 h-2/5 fixed top-2 p-6 rounded shadow-lg z-60" >
                    <div className="text-center mb-8">
                        {children}
                    </div>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                        {leftvisible ? <Button className="bg-[#BFFF00]" onClick={leftButtonevent}>{leftButtontext}</Button> : ''}
                        <Button className="bg-[#BFFF00] ml-2" onClick={rightbuttonevent}>{rightbuttontext} </Button>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default ApplicationModal;