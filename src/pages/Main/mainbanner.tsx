import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ScheduleList from "./ScheduleLilst";
import { naearSchedule } from "../../util/nearSchedule";
import { useMutation } from "@tanstack/react-query";
import { createRoomNameApi } from "../../api/ChatApi/ChatApi";
import { getRunToday } from "../../api/run/api";
import { useRecoilValue } from "recoil";
import { todayData } from "../../recoil/todayData";
import { schedulesProps } from "../../components/Modal/RunResult";

interface SlideProps {
	id: number;
	bgimg: string;
	subTitle: string;
	title: string;
	btn: string;
}

interface Schedule {
	id: number;
	isCrew: boolean;
	startDate: string;
	title: string;
}

interface NeaerType {
	title?: string;
	id?: number; // id는 선택적 속성일 수 있음
	isCrew?: boolean; // isCrew는 선택적 속성일 수 있음
}

interface Props {
	slide: SlideProps;
}

const MainBanner = ({ slide }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [neaer, setNeaer] = useState<NeaerType>({ title: "기본 제목" });
	const [totalSchedules, setTotalSchedules] = useState<Schedule[]>([]);
	const todayDatas = useRecoilValue(todayData);


	const navigate = useNavigate();

	const handleMoveBtn = async (id?: number, isCrew?: boolean) => {
		switch (slide.subTitle) {
			case "SCHEDULE":
				navigate("/create/run");
				break;
			case "CREW":
				navigate("/create/crew");
				break;
			case "TODAY":
				if (id) {
					const roomType = isCrew ? "crew_" : "general_";
					try {
						console.log("실행중?");
						console.log("최종 roomName:", roomType + id.toString());
						const res = await createRoomNameApi({
							roomName: roomType + id.toString(),
						});
						if (
							res.data.success.code === 201 ||
							res.data.success.code === 409
						) {
							const roomData = res.data.success.responseData;
							const roomId = res.data.success.responseData.roomId;
							console.log("roomId", roomId);
							navigate(`/chat?roomId=${roomId}`, {
								state: {
									roomData: roomData,
									id: id,
									schedules: totalSchedules,
								},
							});
						}
						console.log(res);
					} catch (error) {
						console.log("에러발생", error);
					}
				} else {
					console.log("생성 실패");
				}
				break;
		}
	};

	const { mutate } = useMutation({
		mutationFn: getRunToday,
		onSuccess: (data) => {
			const scheduleData = data.data.success.responseData;
			// todayData와 scheduleData를 비교하여 동일한 id를 제외
			const filteredScheduleData = scheduleData.filter(
				(item: schedulesProps) => !todayDatas.some((todayItem) => todayItem.id === item.id),
			);

			const timeDate = naearSchedule(filteredScheduleData);
			const neaerDate = timeDate.nearest;
			const schedule = timeDate.remaining;
			setSchedules(schedule);
			setNeaer(neaerDate);
			setIsLoading(false);
			setTotalSchedules(scheduleData);
		},
		onError: (error) => {
			console.log(error);
			// navigate("/login");
		},
	});

	const handleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsLoading(true);
		mutate();
	}, []);

	return (
		<>
			<div className="relative h-screen flex items-center  justify-start  overflow-x-hidden w-full ">
				{/* 배경이미지 */}
				<img
					src={slide.bgimg}
					alt="배경이미지 "
					className="inset-0 w-full h-full object-cover tablet:object-cover laptop:object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
				{/* 타이틀 */}
				<div className="absolute  text-white ml-8  tablet:ml-16 laptop:ml-36 desktop:ml-36 ">
					<span className="text-base">{slide.subTitle}</span>
					<h1 className="font-kbo text-4xl  w-64  laptop:w-auto desktop: w-auto laptop:text-6xl desktop:text-6xl mb-4 mt-4">
						{slide.title}
					</h1>
					{slide.subTitle === "TODAY" ? (
						<div className="relative">
							<div className="flex items-center  mb-4">
								{isLoading ? (
									"오늘의 달리기가 없어요 !! "
								) : (
									<>
										<div className=" flex items-center relative  bg-white  bg-opacity-40 text-black px-4 py-2 rounded-full mr-4">
											<span className="mr-4">{neaer.title}</span>
											<Button
												type="button"
												theme="primary"
												className="w-[80px]  "
												onClick={() => handleMoveBtn(neaer.id, neaer.isCrew)}
											>
												입장
											</Button>
										</div>
										<div
											className="text-2xl cursor-pointer"
											onClick={handleIsOpen}
										>
											<FontAwesomeIcon icon={faChevronDown} />
										</div>
									</>
								)}
							</div>
							{isOpen && (
								<div className="absolute ">
									<ScheduleList
										handleIsOpen={handleIsOpen}
										handleMoveBtn={handleMoveBtn}
										schedules={schedules}
									/>
								</div>
							)}
						</div>
					) : (
						<Button
							type="button"
							theme="primary"
							className="text-lg font-pre900"
							onClick={handleMoveBtn}
						>
							{slide.btn}
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default MainBanner;
