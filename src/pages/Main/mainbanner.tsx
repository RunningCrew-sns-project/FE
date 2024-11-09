import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ScheduleList from "./ScheduleLilst";
import { naearSchedule } from "../../util/nearSchedule";

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

const MainBanner = ({ slide, state }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [schedules, setSchedules] = useState<[]>([]);
	const [neaer, setNeaer] = useState({})
	const navigate = useNavigate();

	const handleMoveBtn = (id?: number) => {
		switch (slide.subTitle) {
			case "SCHEDULE":
				navigate("/create/run");
				break;
			case "CREW":
				navigate("/create/crew");
				break;
			case "TODAY":
				if (id) {
					navigate(`/running/${id}`);
				} else {
					navigate("/running");
				}
				break;
			default:
				navigate("/");
				break;
		}
	};

	const scheduleData = [
		{ id: 1, title: "아침 달리기", time:'2024-11-09T10:00:00' },
		{ id: 2, title: "저녁 조깅", time: '2024-11-09T10:560:00' },
		{ id: 3, title: "저녁 조깅2", time: '2024-11-09T11:00:00' },
		{ id: 4, title: "저녁 조깅3", time: '2024-11-09T11:20:00' },
		{ id: 5, title: "저녁 조깅4", time: '2024-11-09T12:00:00' },
		{ id: 6, title: "저녁 조깅5", time: '2024-11-09T12:35:00' },
		// 추가 일정들...
	];

	const handleIsOpen = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		// 데이터 요청함수 
		const timeDate = naearSchedule(scheduleData)
		const neaerDate = timeDate.nearest;
		const schedule =timeDate.remaining
		setSchedules(schedule);
		setNeaer(neaerDate)
	}, []);

	return (
		<>
			<div className="relative  h-screen flex items-center  justify-start">
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
