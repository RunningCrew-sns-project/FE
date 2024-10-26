import React from "react";
import runCrew from "../assets/runCrew.jpg";

// 제목 지역 일자 시작시간 이미지 인원수 진행상태값
interface RunProps {
	title: string;
	location: string;
	date: string;
	startTime: string;
	banner: string;
	people: number;
	maximumPeople: number;
	status: "시작전" | "진행중" | "완료";
	boxVerticalWidth?: string; //세로
	boxHorizontalWidth?: string; //가로
}

interface CrewProps {
	title: string;
	location: string;
	banner: string;
	people: number;
	maximumPeople: number;
	status: "모집중" | "만원";
	boxVerticalWidth?: string;
	boxHorizontalWidth?: string;
}
const RunBox = (props: RunProps | CrewProps) => {
	const isRunProps = (props: any): props is RunProps => {
		return (props as RunProps).date !== undefined; // date가 있는 경우 RunProps로 간주
	};

	return (
		<div
			className={`w-[${props.boxVerticalWidth || "184px"}] cursor-pointer flex flex-col laptop:flex-row laptop:w-[${props.boxHorizontalWidth || "400px"}] laptop:border laptop:border-white/30 rounded-lg`}
		>
			<div
				className={`w-[${props.boxVerticalWidth || "180px"}] h-[160px] relative`}
			>
				{/* TODO:이미지 url로 교체 */}
				<img src={runCrew} className="object-cover w-full h-full rounded-lg" />
				<div className="absolute right-2 top-2 bg-[#C0FF00] rounded-xl">
					<span className="px-3">{props.status}</span>
				</div>
				<div className="absolute bottom-2 left-2 flex">
					<span>👽</span>
					<div className=" bg-black rounded-xl text-white text-sm px-3">
						{props.people}/{props.maximumPeople}
					</div>
				</div>
			</div>
			{/* title */}
			<div className="px-2 flex flex-col mt-2 gap-1 laptop:p-4">
				<h1 className="text-white font-semibold text-lg truncate">
					{props.title}
				</h1>
				<div className="flex text-sm justify-between laptop:flex-col laptop:justify-between laptop:h-full">
					<span className="text-white">{props.location}</span>
					{isRunProps(props) && (
						<div className="flex">
							<div className=" bg-white rounded-xl px-2 mr-1">{props.date}</div>
							<div className=" bg-white rounded-xl px-2">{props.startTime}</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RunBox;
