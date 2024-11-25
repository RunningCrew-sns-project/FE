import toast from "react-hot-toast";
import Button from "../Button";
import Modal from "./Modal";
import { deleteCrew } from "../../api/crew/api";
import { useNavigate } from "react-router-dom";


interface recordsProps  {
	isOpen : boolean;
	selectedCrewId? : string ;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}




const MessageModal = ({ isOpen, selectedCrewId, setIsOpen }: recordsProps) => {
	const navigate = useNavigate();
	const handleCrewOut = async () => {
		try {
			if(selectedCrewId){
				await deleteCrew(selectedCrewId);
				toast("탈퇴되었습니다. ");
				setIsOpen(false);
				navigate(0);
			}
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
							예
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};
export default MessageModal;
