import CrewBanner from "./CrewBanner";
import MyCrewList from "./MyCrewList";
import PostList from "./PostList";

import { MY_CREWLIST } from "../../_Mock/crewlist";
import { CREW_INFOLIST } from "../../_Mock/crewInfoList";
import { useEffect, useState } from "react";
import ThemWrapperBody from "../../components/ThemWrapper";
import { ResponsiveContainer } from "../../components/Container";

// 각 인터페이스 타입 정의
interface CrewInfo {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
	memberCount: number;
	maxMember: number;
	location: string;
}

interface PostItem {
	image: string;
	title: string;
	region: string;
	date: string;
	time: string;
	status: "모집중" | "진행중" | "완료";
	maxMember: number;
	people: number;
}

interface CrewResponse {
	info: CrewInfo;
	page: number;
	hasMore: boolean;
	items: PostItem[];
}

const CrewPage = () => {
	const [mycrew, setMyCrew] = useState<
		{ id: string; name: string; imageUrl: string }[]
	>([]);
	const [info, setInfo] = useState<CrewInfo | null>(null);
	const [items, setItems] = useState<PostItem[]>([]);
	const [selectedCrewId, setSelectedCrewId] = useState(null); // 선택된 크루 ID


	const [page, setPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(false);

	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [area, setArea] = useState("전체");
	const [sortOrder, setSortOrder] = useState("latest"); // 기본값은 최신순

		// 크루 목록을 불러오는 useEffect
		useEffect(() => {
			const res = MY_CREWLIST;
			setMyCrew(res.data);

			if (mycrew.length > 0) {
				setSelectedCrewId(mycrew[0].id); // 첫 번째 크루의 ID로 정보 요청
			}
		}, [mycrew]);
	
		//선택된 크루 바꾸기, 혹은 선택된 크루내 세시글 필터링 변화시 새 리스트 요청 
		useEffect(() => {
			if (selectedCrewId) {
				fetchCrewDeatil(selectedCrewId);
			}
		}, [selectedCrewId, startDate, area, sortOrder]); 
	
	const fetchCrewDeatil = (crewId: string) => {

		// const response = await fetch(`/api/crew/${crewId}?startDate=${startDate}&area=${area}&sortOrder=${sortOrder}`);
		// const data = await response.json();

		// if (response.ok) {
		// 	setInfo(data.info); // 크루 정보 업데이트
		// 	setItems(data.items); // 목록 리스트 업데이트
		// } else {
		// 	console.error("크루 정보 요청 실패:", data.message);
		// }
		const res: CrewResponse = CREW_INFOLIST;
		setInfo(res.info);
		setItems(res.items);
	};


	//필터링을 교체하는 함수 


	// parmas를 전달받기
	const handleDetailCrew = (crewId: string) => {
		fetchCrewDeatil(crewId);
		console.log(crewId)
	};

	return (
		<>
			<ThemWrapperBody theme="dark">
				<ResponsiveContainer>
					<div className="mb-16 mt-8">
						<MyCrewList mycrew={mycrew} handleDetailCrew={handleDetailCrew} />
					</div>
				</ResponsiveContainer>
				{info && <CrewBanner info={info} />}
				<ResponsiveContainer>
					{items && (
						<PostList
							items={items}
							setPage={setPage}
							setHasMore={setHasMore}
							setStartDate={setStartDate}
							setArea={setArea}
							setSortOrder={setSortOrder}
							startDate={startDate}
							currentDate={currentDate}
							sortOrder={sortOrder}
						/>
					)}
				</ResponsiveContainer>
			</ThemWrapperBody>
		</>
	);
};

export default CrewPage;
