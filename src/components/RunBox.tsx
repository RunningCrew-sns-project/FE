import React from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bagigImg from "../assets/mianBanner1_bg.jpg";

// Unified interface that combines both RunProps and CrewProps
interface PostProps {
	title: string;
	location: string;
	banner: string | null;
	banners?: { url: string }[];
	people: number;
	maximumPeople: number;
	status: "시작전" | "진행중" | "완료" | "모집중" | "만원" | string;
	runId?: number;
	crewId?: number;
	postType?: string;
	date?: string;
	startTime?: string;
	crewIntroduction?: string;
	boxVerticalWidth?: string;
	boxHorizontalWidth?: string;
}

const RunBox: React.FC<PostProps> = (props) => {
	console.log("프롭스", props);
	const navigate = useNavigate();

	const statusStyle: Record<string, string> = {
		시작전: "bg-white",
		진행중: "bg-primary",
		완료: "bg-black text-white",
		모집중: "bg-primary",
		만원: "bg-black text-white",
	};

	const handlemovedetail = () => {
		if (props.postType === "일반") {
			navigate(`/joinRun/${props.runId}`);
		} else if (props.postType === "크루") {
			navigate(`/joinCrewRun/${props.runId}`);
		} else {
			navigate(`/joinCrew/${props.crewId}`);
		}
	};

	return (
		<div
			onClick={handlemovedetail}
			className={`w-[170px] cursor-pointer flex flex-col laptop:flex-row laptop:w-[400px] rounded-lg bg-gray-900`}
		>
			<div className={`w-[170px] h-[160px] relative shrink-0`}>
				<img
					src={
						Array.isArray(props.banners) && props.banners.length > 0
							? props.banners[0].url
							: props.banner || bagigImg
					}
					className="object-cover w-full h-full rounded-lg"
					alt={props.title}
				/>
				{props.status && (
					<div
						className={`absolute right-2 top-2 rounded-xl ${statusStyle[props.status]}`}
					>
						<span className="px-3 truncate">{props.status}</span>
					</div>
				)}
				<div className="absolute bottom-2 left-2 flex items-center gap-1">
					<div className="bg-black rounded-xl text-white text-sm px-3 flex items-center gap-2">
						<IoPeopleSharp color="white" />
						{props.people}/{props.maximumPeople}
					</div>
				</div>
			</div>

			<div className="px-2 pb-2 flex flex-col mt-2 gap-1 laptop:p-4 laptop:mt-0 flex-grow overflow-hidden">
				<h1 className="text-white font-semibold text-lg truncate">
					{props.title}
				</h1>
				<div className="flex text-sm justify-between laptop:flex-col laptop:justify-between laptop:h-full">
					<span className="text-white truncate">{props.location}</span>

					{props.crewIntroduction && (
						<p className="text-white hidden laptop:block">
							{props.crewIntroduction}
						</p>
					)}

					{props.date && props.startTime && (
						<div className="flex laptop:flex-col laptop:gap-2">
							<div className="bg-white rounded-xl px-2 mr-1 truncate w-[50px] laptop:w-fit">
								{props.date}
							</div>
							<div className="bg-white rounded-xl px-2 truncate w-[50px] laptop:w-fit">
								{props.startTime}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RunBox;
