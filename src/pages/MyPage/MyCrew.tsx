import { useEffect, useState } from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyCrew } from "../../api/myPage/api";

interface CrewData {
	crewId: number;
	crewName: string;
	crewImageUrl: null | string;
	crewIntroduction: string;
	activityRegion: string;
	memberCount: number;
	maxCapacity: number;
	requestOrCompletionDate: string;
	status: string;
	crewMaster: boolean;
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
		<div className="flex flex-wrap gap-6 justify-center">
			{crewData.map((data: CrewData) => {
				const props = {
					title: data.crewName,
					location: data.activityRegion,
					banner: data.crewImageUrl,
					people: data.memberCount,
					maximumPeople: data.maxCapacity,
					status: data.status,
					crewId: data.crewId,
					crewIntroduction: data.crewIntroduction,
				};
				return <RunBox {...props} />;
			})}
			<InfiniteScroll fetch={requestMyCrew} isLastPage={true} />
		</div>
	);
};

export default MyCrew;
