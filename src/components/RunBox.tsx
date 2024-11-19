import { IoPeopleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import bagigImg from '../assets/mianBanner1_bg.jpg'; // 이미지 파일을 import로 가져오기


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
	runId: number;
	boxVerticalWidth?: string; //세로
	boxHorizontalWidth?: string; //가로
	postType: string;
}

interface CrewProps {
	title: string;
	location: string;
	banner: string | null;
	people: number;
	maximumPeople: number;
	status: string;
	crewId: number;
	crewIntroduction?: string;
	boxVerticalWidth?: string;
	boxHorizontalWidth?: string;
}
const RunBox = (props: RunProps | CrewProps) => {
	console.log("propsss", props);
	const isRunProps = (props: any): props is RunProps => {
		return (props as CrewProps).postType !== undefined; // date 아니고 Posttype이 있는 경우 RunProps로 간주
	};
	const statusStyle = {
		시작전: "bg-white",
		진행중: "bg-primary",
		완료: "bg-black text-white",
		모집중: "bg-primary",
		만원: "bg-black text-white",
	};

	const navigate = useNavigate();
	const handlemovedetail = (
		postType: string,
		runId: string | number,
		crewId: string | number,
	) => {
		console.log("runbox props", props);
		if (postType === "일반") {
			navigate(`/joinRun/${runId}`);
		} else if (postType === "크루") {
			navigate(`/joinCrewRun/${runId}`);
		} else {
			navigate(`/joinCrew/${crewId}`);
		}
	};

	return (
		<div
			onClick={() =>
				handlemovedetail(props.postType, props.runId, props.crewId)
			}
			className={`w-[170px] cursor-pointer flex flex-col laptop:flex-row laptop:w-[400px] rounded-lg bg-gray-900`}
		>
			<div className={`w-[170px]  h-[160px] relative shrink-0`}>
				{/* TODO:이미지 url로 교체 */}
				<img
					src={props.banner ? props.banner :  bagigImg }
					className="object-cover w-full h-full rounded-lg"
				/>
				<div
					className={`absolute right-2 top-2 rounded-xl ${statusStyle[props.status]}`}
				>
					<span className="px-3 truncate">
						{isRunProps(props) ? props.status : ""}
					</span>
				</div>
				<div className="absolute bottom-2 left-2 flex items-center gap-1">
					<div className=" bg-black rounded-xl text-white text-sm px-3 flex items-center gap-2">
						<IoPeopleSharp color="white" />
						{props.people}/{props.maximumPeople}
					</div>
				</div>
			</div>

			<div className="px-2 pb-2 flex flex-col mt-2 gap-1 laptop:p-4 laptop:mt-0 flex-grow overflow-hidden">
				{/* title */}
				<h1 className="text-white font-semibold text-lg truncate">
					{props.title}
				</h1>
				<div className="flex text-sm justify-between laptop:flex-col laptop:justify-between laptop:h-full">
					<span className="text-white truncate">{props.location}</span>
					{!isRunProps(props) && (
						<p className="text-white hidden laptop:block">
							{props.crewIntroduction}
						</p>
					)}
					{isRunProps(props) && (
						<div className="flex laptop:flex-col laptop:gap-2">
							<div className="bg-white rounded-xl px-2 mr-1 truncate w-[50px] laptop:w-fit">
								{props.date}
							</div>
							<div className=" bg-white rounded-xl px-2 truncate w-[50px] laptop:w-fit">
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
