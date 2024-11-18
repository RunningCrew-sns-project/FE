import toast from "react-hot-toast";
import Button from "../Button";
import Modal from "./Modal";
import { deleteCrew } from "../../api/crew/api";

const MessageModal = ({ isOpen, selectedCrewId, setIsOpen }) => {
	const handleCrewOut = async () => {
		try {
			const res = await deleteCrew(selectedCrewId);
			console.log("확인탈퇴 ", res);
			toast("탈퇴되었습니다. ");
			setIsOpen(false);
		} catch (error) {
			console.log(error);
		}


		
    setIsOpen(false);
	};

	return (
		<>
			<Modal isOpen={isOpen}>
				<div className="">
					<h3>`정말로 탈퇴하시겠습니까?' </h3>
					<div className="flex w-full gap-2">
						<Button
							type="button"
							theme="dark"
							onClick={() => setIsOpen(false)}
							className="w-1/2"
						>
							취소
						</Button>
						<Button
							type="button"
							theme="primary"
							onClick={() => handleCrewOut()}
							className="w-1/2"
						>
							예{" "}
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};
export default MessageModal;
