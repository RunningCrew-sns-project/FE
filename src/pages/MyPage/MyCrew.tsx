import React from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";
import { useNavigate } from "react-router-dom";

type Props = {};

const MyCrew = (props: Props) => {
	const data = {
		title: "오늘의 갓생",
		location: "무슨동",
		banner: "url",
		people: 2,
		maximumPeople: 10,
		status: "모집중",
		runId: 3
	};

	const navigate = useNavigate();
	const handlemovedetail = (runId) => {
		navigate(`/joinCrewRun/${runId}`);
	}

	const num = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	const requestData = () => { };
	return (
		<div className="flex flex-wrap gap-6 mx-auto justify-center">
			{num.map((number) =>
				<div onClick={() => handlemovedetail(number.runId)} >
					< RunBox {...data} />;
				</div>
			)}
			<InfiniteScroll fetch={requestData} isLastPage={false} />
		</div>
	);
};

export default MyCrew;
