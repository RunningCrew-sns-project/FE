import { Link } from "react-router-dom";
import Button from "../Button";
import Modal from "./Modal";

interface AddressModalProps {
	isOpen: boolean;
	onClose?: () => void;
}

const RunResultModal = ({ isOpen, onClose }: AddressModalProps) => {
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="text-center">
					<h1 className="text-2xl font-black mb-6">
						정말로 종료하시겠습니까?{" "}
					</h1>
					<div className="text-center">
						<div className="">
							<p className="text-xl font-black mb-4">오늘의 결과</p>
							<div className="flex flex-col ">
								<strong> 총걸이 : </strong>
								<strong> 달성율 : </strong>
								<strong> 소요시간 : </strong>
								<strong> 속도 : </strong>
							</div>
						</div>
						<div className="flex gap-4 item-center justify-center mt-6">
							<div className="">
								<Link to={"/"}>
									<Button theme="dark" type="button">
										저장하지 않기{" "}
									</Button>
								</Link>
							</div>
							<Button theme="primary" type="submit">
								저장하기
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default RunResultModal;
