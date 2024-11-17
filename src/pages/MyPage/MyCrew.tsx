import { useEffect, useState } from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyCrew } from "../../api/myPage/api";

interface CrewData {
	crewId: 20;
	crewName: "Mountain Explorers";
	crewImageUrl: null;
	crewIntroduction: "A crew for mountain hiking enthusiasts.";
	requestOrCompletionDate: "2024-11-07T06:53:29";
	status: "가입 완료";
	crewMaster: false;
}
const MyCrew = () => {
	const [crewData, setCrewData] = useState<CrewData[]>([]);

	const requestMyCrew = async () => {
		const res = await getMyCrew();
		if (res.status === 200) {
			setCrewData(res.data.success.responseData);
		}
	};

	useEffect(() => {
		requestMyCrew();
	}, []);
	return (
		<div className="flex flex-wrap gap-6">
			{crewData.map((data: CrewData) => {
				return <RunBox {...data} />;
			})}
			<InfiniteScroll fetch={requestMyCrew} isLastPage={false} />
		</div>
	);
};

export default MyCrew;
