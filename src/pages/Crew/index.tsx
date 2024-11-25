import CrewBanner from "./CrewBanner";
import MyCrewList from "./MyCrewList";
import PostList from "./PostList";
import { useEffect, useState } from "react";
import ThemWrapperBody from "../../components/ThemWrapper";
import { ResponsiveContainer } from "../../components/Container";
import CrewManger from "./CrewManger";
import { getMyCrew } from "../../api/myPage/api";
import { dateFormatter } from "../../util/dateFormatter";
import { useSearchParams } from "react-router-dom";
import { getCrewInfoList } from "../../api/crew/api";
import { Item } from "../Runlist/ItemList";


// 각 인터페이스 타입 정의
export interface CrewInfo {
	id: string;
	crewName: string;
	crewIntroduction: string;
	imageUrl: string;
	memberCount: number;
	maxCapacity: number;
	activityRegion: string;
}



const CrewPage = () => {
	const [,  setSearchParams] = useSearchParams()

	const [mycrew, setMyCrew] = useState([]);
	const [info, setInfo] = useState<CrewInfo | null>(null);
	const [items, setItems] = useState<Item[]>([]);
	const [selectedCrewId, setSelectedCrewId] = useState<string | undefined>(); // 선택된 크루 ID
	const [master, setMaster] = useState(true);
	const [isOepnManger, setIsOpenManger] = useState(false);

	const [page, setPage] = useState<number>(30);
	// const [hasMore, setHasMore] = useState<boolean>(false);

	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [area, setArea] = useState("전체");
	const [sortOrder, setSortOrder] = useState("newest");
	const [cusor, setCusor ] = useState(null)


	//내가 가입한 크루  불러오기
	const getMyRunningCrew = async () => {
		try {
			const mycrews = await getMyCrew();
			console.log("내가 가입한 크루", mycrews);
			const crewList = mycrews.data.success.responseData;

			if (crewList.length > 0) {
				const firstCrewId = crewList[0].crewId;
				console.log("첫 번째 크루", firstCrewId);
				setSearchParams({ crewId : firstCrewId})

				setMyCrew(crewList);
				setSelectedCrewId(firstCrewId);
			} else {
				console.log("가입한 크루가 없습니다.");
			}
		} catch (error) {
			console.error("크루 목록 불러오기 실패:", error);
		}
	};

	useEffect(() => {
		getMyRunningCrew();
	}, []);

	// selectedCrewId가 변경될 때마다 크루 세부 정보를 가져옴
	useEffect(() => {
		if (selectedCrewId) {
			fetchCrewDeatil();
			setSearchParams({ crewId: selectedCrewId ? selectedCrewId.toString() : '' });
		}
	}, [selectedCrewId, startDate, area, sortOrder]);
	
	const fetchCrewDeatil = async () => {
		const date = dateFormatter(startDate);
		const filter = {
			cursor: cusor,
			size: page,
			location: area,
			date: date.date,
			sortType : sortOrder
		};

		try {
			const res = await getCrewInfoList(  selectedCrewId ? selectedCrewId.toString() : "" , filter);
			console.log("인포랑데이터응답", res.data.success.responseData);
			const resData  = res.data.success.responseData;
			const { content, countPerScroll, lastScroll, nextCursor } = resData;
			console.log(content, countPerScroll, lastScroll, nextCursor);
			if (content) {
				console.log('작동중')
				console.log('리스트' , content[0].items)

				setInfo(content[0].crewInfo);
				setItems(content[0].items);
				setCusor(nextCursor)
			} else {
				console.log("데이터가  없습니다. ");
			}
		} catch (error) {
			console.log(error);
		}
	};

	// parmas를 전달받기
	const handleDetailCrew = (crewId: string, crewMaster: boolean) => {
		setSelectedCrewId(crewId);
		setMaster(crewMaster);
	};

	return (
		<>
			<ThemWrapperBody theme="dark">
				<ResponsiveContainer>
					<div className="mb-16 pt-24">
						<MyCrewList mycrew={mycrew} handleDetailCrew={handleDetailCrew} />
					</div>
				</ResponsiveContainer>
				<div className="">
						{info && <CrewBanner info={info} />}
				<ResponsiveContainer>
					{isOepnManger === true ? (
						<CrewManger setIsOpenManger={setIsOpenManger} crewId={selectedCrewId} />
					) : (
						items && (
							<PostList
								items={items}
								setPage={setPage}
								// setHasMore={setHasMore}
								selectedCrewId={selectedCrewId}
								setStartDate={setStartDate}
								setArea={setArea}
								setSortOrder={setSortOrder}
								startDate={startDate}
								currentDate={currentDate}
								sortOrder={sortOrder}
								master={master}
								setIsOpenManger={setIsOpenManger}
							/>
						)
					)}
				</ResponsiveContainer>
				</div>
			</ThemWrapperBody>
		</>
	);
};

export default CrewPage;
