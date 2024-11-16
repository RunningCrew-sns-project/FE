import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ScheduleList from "./ScheduleLilst";
import { naearSchedule } from "../../util/nearSchedule";
import { createRoomNameApi } from "../../api/ChatApi/ChatApi";
import { useRecoilState } from "recoil";
import { roomsState } from "../../recoil/chatData/myroomState";

interface SlideProps {
	id: number;
	bgimg: string;
	subTitle: string;
	title: string;
	btn: string;
}

interface Props {
	slide: SlideProps;
	state: string;
}

const MainBanner = ({ slide }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [schedules, setSchedules] = useState<[]>([]);
	const [rooms, setRooms] = useRecoilState(roomsState);
	const [neaer, setNeaer] = useState({})
	const navigate = useNavigate();
	const general = "general_";
	const handleMoveBtn = async  (id?: number) => {
		switch (slide.subTitle) {
			case "SCHEDULE":
				navigate("/create/run");
				break;
			case "CREW":
				navigate("/create/crew");
				break;
			case "TODAY":
				if (id) {
					const existingRoom = rooms.find((room) => room.roomName ===  general+id.toString());
					console.log('존재하는 룸', existingRoom)
					if (existingRoom) {
						navigate(`/chat?roomId=${existingRoom.roomId}`);
						console.log('이미존재 ')
					} else {
						const res = await createRoomNameApi({ roomName: general + id.toString()} );
						const tilte = res.data.success.responseData.title;
						const parsedData = JSON.parse(tilte); // JSON 파싱
						console.log(parsedData)
						const roomId = res.data.success.responseData.roomId;
						console.log("Room ID:", res.data.success.responseData.roomId);
						if ( parsedData) {
							setRooms((prevRooms) => {
								const newRooms = [...prevRooms, { roomName: parsedData, roomId: roomId }];
								return newRooms;
						});
						navigate(`/chat?roomId=${roomId}`);

						} else {
							console.log("생성 실패");
						}
					}
				} else {
					console.log("생성 실패");
				}
				break;
		}
	};



	const scheduleData = [
		{ id: 7, title: "아침 달리기", time:'2024-16-10T10:00:00' },
		{ id: 8, title: "저녁 조깅", time: '2024-16-10T10:560:00' },
		{ id: 14, title: "저녁 조깅2", time: '2024-16-10T11:00:00' },
		{ id: 10, title: "저녁 조깅3", time: '2024-16-10T11:20:00' },
		{ id: 11, title: "저녁 조깅4", time: '2024-16-10T12:00:00' },
		{ id: 12, title: "저녁 조깅5", time: '2024-16-10T12:35:00' },
		{ id: 42, title: "헤이", time: '2024-16-10T12:35:00' },
		{ id: 18, title: "감자돌이가 달려요 ", time: '2024-16-10T12:35:00' },
		{ id: 25, title: "릴리달리기 ", time: '2024-16-10T12:35:00' },
		// 추가 일정들...
	];

	const handleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const timeDate = naearSchedule(scheduleData)
		const neaerDate = timeDate.nearest;
		const schedule =timeDate.remaining
		setSchedules(schedule);
		setNeaer(neaerDate);
	}, []);




	return (
		<>
			<div className="relative h-screen flex items-center  justify-start overflow-hidden w-full">
				{/* 배경이미지 */}
				<img
					src={slide.bgimg}
					alt="배경이미지 "
					className="inset-0 w-full h-full object-cover  object-center object-right-bottom tablet:object-cover laptop:object-cover"
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
								<div className=" flex items-center relative  bg-white  bg-opacity-40 text-black px-4 py-2 rounded-full mr-4">
									<span className="mr-4">{neaer.title}</span>
									<Button
										type="button"
										theme="primary"
										className="w-[80px]  "
										onClick={() => handleMoveBtn(neaer.id)}
									>
										입장
									</Button>
								</div>
								<div className="text-2xl cursor-pointer" onClick={handleIsOpen}>
									<FontAwesomeIcon icon={faChevronDown} />
								</div>
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
