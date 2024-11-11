import React from "react";
import ReactDOM from "react-dom";
import { useDevice } from "../../hook/usedevice";

interface ModalProps {
	isOpen: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const { isMobile, isTablet } = useDevice();
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
			style={{ zIndex: 99999 }}
		>
			<div
				className={`${
					isMobile || isTablet ? "max-w-full w-full" : "max-w-sm w-full"
				} bg-white rounded-lg   shadow-lg p-6 `}
			>
				<button
					className="mb-4 text-red-500 hover:text-red-700"
					onClick={onClose}
				>
					Close
				</button>
				{children}
			</div>
		</div>,
		document.getElementById("modal-root")!,
	);
};

export default Modal;
