import React from "react";
import {
	IoPeopleSharp,
	IoLocationOutline,
	IoTimeOutline,
	IoCalendarOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bagigImg from "../assets/mianBanner1_bg.jpg";

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
	const navigate = useNavigate();

	const statusStyle: Record<string, { bg: string; text: string }> = {
		시작전: { bg: "bg-blue-100", text: "text-blue-700" },
		진행중: { bg: "bg-green-100", text: "text-green-700" },
		완료: { bg: "bg-gray-100", text: "text-gray-700" },
		모집중: { bg: "bg-primary/90", text: "text-black" },
		만원: { bg: "bg-red-100", text: "text-red-700" },
		"가입 완료": { bg: "bg-purple-100", text: "text-purple-700" },
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

	const getStatusStyle = (status: string) => {
		return statusStyle[status] || { bg: "bg-gray-100", text: "text-gray-700" };
	};

	return (
		<div
			onClick={handlemovedetail}
			className="group w-[160px] cursor-pointer flex flex-col laptop:flex-row laptop:w-[400px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
		>
			<div className="w-[160px] h-[160px] relative shrink-0 overflow-hidden rounded-t-xl laptop:rounded-l-xl laptop:rounded-tr-none">
				<img
					src={
						Array.isArray(props.banners) && props.banners.length > 0
							? props.banners[0].url
							: props.banner || bagigImg
					}
					className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
					alt={props.title}
				/>
				{props.status && (
					<div
						className={`absolute right-2 top-2 rounded-full px-3 py-1 ${
							getStatusStyle(props.status).bg
						} ${getStatusStyle(props.status).text} text-sm font-medium`}
					>
						{props.status}
					</div>
				)}
				<div className="absolute bottom-2 left-2">
					<div className="bg-black/70 backdrop-blur-sm rounded-full py-1 px-3 text-white text-sm flex items-center gap-2">
						<IoPeopleSharp />
						<span className="font-medium">
							{props.people}/{props.maximumPeople}
						</span>
					</div>
				</div>
			</div>

			<div className="px-3 py-3 flex flex-col gap-2 laptop:p-4 flex-grow">
				<h1 className="text-gray-900 font-semibold text-lg truncate">
					{props.title}
				</h1>

				<div className="flex flex-col gap-2 text-sm">
					<div className="flex items-center gap-2">
						<IoLocationOutline className="text-lg" />
						<p className="text-gray-600 truncate">{props.location}</p>
					</div>

					{props.crewIntroduction && (
						<p className="text-gray-500 hidden laptop:block line-clamp-2">
							{props.crewIntroduction}
						</p>
					)}

					{props.date && props.startTime && (
						<div className="flex flex-wrap gap-2">
							<div className="flex items-center gap-1 text-gray-600">
								<IoCalendarOutline />
								<span>{props.date}</span>
							</div>
							<div className="flex items-center gap-1 text-gray-600">
								<IoTimeOutline />
								<span>{props.startTime}</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RunBox;
