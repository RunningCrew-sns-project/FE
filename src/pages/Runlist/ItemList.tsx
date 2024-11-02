import RunBox from "../../components/RunBox";
import { useNavigate } from "react-router-dom";



const ItemList = ({ runData }) => {

	const navigate = useNavigate();
	const handlemovedetail = (runType, runId) => {
		if (runType === "Crew") {
			navigate(`/joinCrew/${runId}`);
		} else {
			navigate(`/joinRun/${runId}`);
		}
	}

	return (
		<>
			{/* 런박스 반응형 나중에  */}
			{/* 무한스크롤릴 구현 나중에  */}
			<div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-3 laptop:grid-cols-2 desktop:grid-cols-2  ">
				{runData.map((item) => (
					<div onClick={() => handlemovedetail(item.runType, item.runId)} className="w-[32%] mb-4" key={item.runId}>
						<RunBox
							boxVerticalWidth="200px" // 세로 너비
							boxHorizontalWidth="450px" // 가로 너비
							title={item.title}
							location={item.location}
							date={item.date}
							startTime={item.startTime}
							banner={item.banner}
							people={item.people}
							maximumPeople={item.maximumPeople}
							status={item.status}
							runId={item.runId}
							runType={item.runType}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default ItemList;
