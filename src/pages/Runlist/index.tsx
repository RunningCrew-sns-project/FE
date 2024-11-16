import PathBanner from "../../components/Banner/PathBanner";
import { ResponsiveContainer } from "../../components/Container";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import DateFilter from "../../components/Filter/DateFilter";
import LocationFilter from "../../components/Filter/LocationFilter";
import ItemList from "./ItemList";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { getCrewListApi, getRunListApi } from "../../api/run/api";
import { dateFormatter } from "../../util/dateFormatter";
import InfiniteScroll from "../../components/InfiniteScroll";
// import { CrewTeamList } from "../../_Mock/crewteamlist";

const RunListPage = () => {
	const { isMobile } = useDevice();

	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [area, setArea] = useState("전체");
	const [sortOrder, setSortOrder] = useState("latest"); // 기본값은 최신순
	const [items, setItems] = useState([]);
	const [cursor, setCursor ] = useState(null)
	const [runCursor, setRunCursor ] = useState(null)
	const [cursorNext, setNextCursor] = useState(1) 
	const [isLastPage, setIsLastPage] = useState(false)

	//카테고리
	const [searchParms] = useSearchParams();
	const category = searchParms.get("category");


	//크루 목록리스트 
	const getCrewlist = async() => {
		const CrewFilter = {
			size: 5, 
			cursor: cursor, 
			cursorId: cursorNext, 
			reverse: false, 
			criteria: sortOrder
	
		}
		const res = await getCrewListApi(CrewFilter)
		console.log(res)
		const listData = res.data.success.responseData;
		const {currentScrollItems, lastScroll , nextCursor ,nextCursorId } = listData
		console.log( currentScrollItems, lastScroll , nextCursor ,nextCursorId)
		setCursor(nextCursor)
		setIsLastPage(lastScroll)
		setItems((prevItems) =>[...prevItems, ...currentScrollItems] )
		setNextCursor(nextCursorId)
	}


	//일반달리기 목록리스트 
	const getRunlist = async () => {
		const date = dateFormatter(startDate)
		const RunFilter = {
			cursor: runCursor,
			size: 4, 
			location: area, 
			date: date.date
		}
		const res = await getRunListApi(RunFilter)
		const runlist = res.data.responseData ; 
		const {content, countPerScroll, lastScroll, nextCursor} =runlist;
		console.log('일반달리기 ',content, countPerScroll, lastScroll,'넥스트 ', nextCursor)
		setItems((prevContent) => [...prevContent , ...content])
		setRunCursor(nextCursor)
		setIsLastPage(lastScroll)
		console.log('일반달리기 ',res)
	}

	const fetchList = async () => {

		
		if (category === 'run') {
			await getRunlist();
		} else {
			await getCrewlist();
		}

		// sortOrder에 따라 정렬 적용
		if (sortOrder === 'oldest') {
			setItems((prevItems) => [...prevItems].reverse());
		}

		
	};
	// 통신함수
	useEffect(() => {
		setItems([]); // 카테고리 변경 시 기존 데이터를 리셋
		setCursor(null)
		fetchList();
	}, [area, startDate, sortOrder, category]);

	const handleSort = (order: string) => {
		setSortOrder(order);
	};

	return (
		<>
			<ThemWrapperBody theme="dark">
				<PathBanner />
				<ResponsiveContainer>
					<div className="flex flex-col mt-8 tablet:flex-col laptop:flex-row desktop:flex-row ">
						{/* 필터 */}
						<div className="w-full flex flex-col space-y-4 mr-6 mb-4 laptop:max-w-xs desktop:max-w-xs">
							<DateFilter
								startDate={startDate}
								setStartDate={setStartDate}
								currentDate={currentDate}
							/>
							<LocationFilter setArea={setArea} />
						</div>

						<div className="flex flex-col  w-full space-y-4 mt-4">
							<div className=" text-white flex justify-between">
								{isMobile ? (
									<h3 className="desktext-lg">런닝메이트를 찾아보세요!</h3>
								) : (
									<h3 className="desktext-lg">
										함께 달릴 런닝메이트를 찾아보세요!
									</h3>
								)}
								<div>
									<button
										className={`text-sm ${sortOrder === "latest" ? "text-primary" : "text-white"}`}
										onClick={() => handleSort("latest")}
									>
										최신순
									</button>
									<button
										className={`text-sm  ml-4 ${sortOrder === "oldest" ? "text-primary font-bold" : "text-white"}`}
										onClick={() => handleSort("oldest")}
									>
										오래된순
									</button>
								</div>
							</div>
							<hr className="border border-white my-4" />
							<div className="">
								<ItemList runData={items} />
							</div>
						</div>
					</div>
					<InfiniteScroll fetch={fetchList} isLastPage={isLastPage}/>
				</ResponsiveContainer>
			</ThemWrapperBody>
		</>
	);
};

export default RunListPage;
