import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import Modal from "./Modal";
import { useMutation } from "@tanstack/react-query";
import { postRunRecords } from "../../api/run/api";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { todayData } from "../../recoil/todayData";

export interface schedulesProps {
	id?: number;
	isCrew?: boolean;
	startDate?: string;
	title?: string;
}


interface AddressModalProps {
	isOpen: boolean;
	onClose?: () => void;
	data: { time: string; progress: number };
	distance: number | undefined;
	schedules: schedulesProps[]; 
	id: number;
	roomId: string | null;
}

const RunResultModal = ({
	isOpen,
	onClose,
	data,
	distance,
	schedules,
	id,
	roomId
}: AddressModalProps) => {
	const navigate = useNavigate()
	const setTodays = useSetRecoilState(todayData)
	
	const { mutate: Result } = useMutation({
		mutationFn: postRunRecords,
		onSuccess: (data) => {
			console.log("결과데이터 전송 성공 ", data);
			toast("달리기가 종료되었습니다. ");
			navigate('/mypage')
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const handleSubmit = () => {
		const selectedSchedule = schedules.find((schedule : schedulesProps)  => schedule.id === id);
		if (selectedSchedule) {
			const todayData = {
				id: selectedSchedule.id,
				isCrew: selectedSchedule.isCrew,
				isComplete: true,
				roomId : roomId,
			};
		
			setTodays((prev) => [...prev, todayData]);
		}
		const result = {
			record: data.time,
			distance: distance,
			process: data.progress,
		};
		Result(result);
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="text-center">
					<h1 className="text-2xl font-black mb-6">정말로 종료하시겠습니까?</h1>
					<div className="text-center">
						<div className="">
							<p className="text-xl font-black mb-4">오늘의 결과</p>
							<div className="flex flex-col ">
								<strong> 총걸이 : {distance} </strong>
								<strong> 달성율 : {data.progress}</strong>
								<strong> 소요시간 : {data.time} </strong>
							</div>
						</div>
						<div className="flex gap-4 item-center justify-center mt-6">
							<div className="">
								<Link to={"/"}>
									<Button theme="dark" type="button">
										저장하지 않기
									</Button>
								</Link>
							</div>
							<Button theme="primary" type="submit" onClick={handleSubmit}>
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
