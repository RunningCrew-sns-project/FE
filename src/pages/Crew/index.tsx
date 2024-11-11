import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CrewBanner from "./CrewBanner";
import MyCrewList from "./MyCrewList";
import PostList from "./PostList";
import ThemWrapperBody from "../../components/ThemWrapper";
import { ResponsiveContainer } from "../../components/Container";
import CrewManger from "./CrewManger";
import { getMyCrew } from "../../api/myPage/api";
import { getCrewInfoList } from "../../api/crew/api";
import { dateFormatter } from "../../util/dateFormatter";

const CrewPage = () => {
	const { crewId } = useParams(); // URL 경로에서 crewId를 가져옴
	const navigate = useNavigate();
	const [mycrew, setMyCrew] = useState([]);
	const [info, setInfo] = useState<CrewInfo | null>(null);
	const [items, setItems] = useState<PostItem[]>([]);
	const [selectedCrewId, setSelectedCrewId] = useState<number | null>(null);
	const [master, setMaster] = useState(true);
	const [isOepnManger, setIsOpenManger] = useState(false);
	const [page, setPage] = useState<number>(30);
	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [area, setArea] = useState("전체");
	const [sortOrder, setSortOrder] = useState("latest");

	// 내가 가입한 크루 목록 불러오기
	const getMyRunningCrew = async () => {
		try {
			const mycrews = await getMyCrew();
			console.log("내가 가입한 크루", mycrews);
			const crewList = mycrews.data.success.responseData;

			if (crewList.length > 0) {
				setMyCrew(crewList);

				// URL에 crewId가 없고 selectedCrewId가 설정되지 않은 경우 첫 번째 크루 ID로 설정
				if (!crewId && !selectedCrewId) {
					const firstCrewId = crewList[0].crewId;
					console.log("첫 번째 크루", firstCrewId);
					setSelectedCrewId(firstCrewId); // 첫 번째 크루 ID를 상태로 설정
				}
			} else {
				console.log("가입한 크루가 없습니다.");
			}
		} catch (error) {
			console.error("크루 목록 불러오기 실패:", error);
		}
	};

	// 첫 번째 로드 시에만 내가 가입한 크루 목록을 불러옴
	useEffect(() => {
		getMyRunningCrew();
	}, []);

	// selectedCrewId가 설정된 후 URL 업데이트
	useEffect(() => {
		if (selectedCrewId && !crewId) {
			// selectedCrewId가 설정되면 navigate로 URL을 업데이트
			navigate(`/crew/${selectedCrewId}`);
		}
	}, [selectedCrewId, crewId, navigate]);

	// URL의 crewId가 변경될 때마다 크루 세부 정보를 가져옴
	useEffect(() => {
		if (crewId) {
			fetchCrewDetail(crewId);
		}
	}, [crewId, startDate, area, sortOrder]);

	const fetchCrewDetail = async (crewId) => {
		const date = dateFormatter(startDate);
		const filter = {
			cursor: null,
			size: page,
			location: area,
			date: date.date,
		};

		try {
			const res = await getCrewInfoList(crewId, filter);
			console.log('인포랑 데이터 응답', res.data.success.responseData);
			const resData = res.data.success.responseData;
			const { content, countPerScroll, lastScroll, nextCursor } = resData;
			console.log(content, countPerScroll, lastScroll, nextCursor);

			if (content && content.length > 0) {
				setInfo(content[0].crewInfo);
				setItems(content[0].items);
			} else {
				console.log('데이터가 없습니다.');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// 크루 선택 시 URL 경로 업데이트
	const handleDetailCrew = (crewId: number, crewMaster: boolean) => {
		setMaster(crewMaster);
		navigate(`/crew/${crewId}`);
	};

	return (
		<ThemWrapperBody theme="dark">
			<ResponsiveContainer>
				<div className="mb-16 mt-8">
					<MyCrewList mycrew={mycrew} handleDetailCrew={handleDetailCrew} />
				</div>
			</ResponsiveContainer>
			{info && <CrewBanner info={info} />}
			<ResponsiveContainer>
				{isOepnManger === true ? (
					<CrewManger setIsOpenManger={setIsOpenManger} crewId={selectedCrewId} />
				) : (
					items && (
						<PostList
							items={items}
							setPage={setPage}
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
		</ThemWrapperBody>
	);
};

export default CrewPage;
