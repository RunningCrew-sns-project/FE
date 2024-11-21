import PathBanner from "../../components/Banner/PathBanner";
import { ResponsiveContainer } from "../../components/Container";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import DateFilter from "../../components/Filter/DateFilter";
import LocationFilter from "../../components/Filter/LocationFilter";
import ItemList, { Item } from "./ItemList";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { dateFormatter } from "../../util/dateFormatter";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getCrewListApi, getRunListApi } from "../../api/run/api";



const RunListPage = () => {
	const { isMobile } = useDevice();

	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [area, setArea] = useState("");
	const [sortOrder, setSortOrder] = useState("newest"); // 기본값은 최신순
	const [reversem, setReverse] = useState(false);
	const [items, setItems] = useState<Item[]>([]);
	const [cursor, setCursor] = useState(null);
	const [runCursor, setRunCursor] = useState(null);
	const [cursorNext, setNextCursor] = useState();
	const [isLastPage, setIsLastPage] = useState(false);

	//카테고리
	const [searchParms] = useSearchParams();
	const category = searchParms.get("category");

	//크루 목록리스트
	const getCrewlist = async () => {
		const CrewFilter = {
			size: 20,
			cursor: cursor ,
			cursorId: cursorNext,
			reverse: reversem,
			criteria: "latest",
			crewRegion: area,
		};
		const res = await getCrewListApi(CrewFilter);
		console.log(res);
		const listData = res.data.success.responseData;
		const { currentScrollItems, lastScroll, nextCursor, nextCursorId } =
			listData;
		console.log(currentScrollItems, lastScroll, nextCursor, nextCursorId);
		setCursor(nextCursor);
		setIsLastPage(lastScroll);
		setItems((prevItems) => [...prevItems, ...currentScrollItems]);
		setNextCursor(nextCursorId);
	};

	//일반달리기 목록리스트
	const getRunlist = async () => {
		const date = dateFormatter(startDate);
		const RunFilter = {
			cursor: runCursor,
			size: 20,
			location: area,
			date: date.date,
			sortType: sortOrder,
		};
		const res = await getRunListApi(RunFilter);
		const runlist = res.data.responseData;
		console.log(res);
		const { content, countPerScroll, lastScroll, nextCursor } = runlist;
		console.log(
			"일반달리기 ",
			content,
			countPerScroll,
			lastScroll,
			"넥스트 ",
			nextCursor,
		);
		setItems((prevContent) => [...prevContent, ...content]);
		setRunCursor(nextCursor);
		setIsLastPage(lastScroll);
	};

	const fetchList = async () => {
		if (category === "run") {
			await getRunlist();
		} else {
			await getCrewlist();
		}
	};
	// 통신함수
	useEffect(() => {
		setItems([]); // 카테고리 변경 시 기존 데이터를 리셋
		setCursor(null);
		fetchList();
	}, [area, startDate, sortOrder, category]);

	const handleSort = (order: string) => {
		setSortOrder(order);
		console.log(" 오더 왁인", order);

		if (order === "oldest") {
			setReverse(true);
		} else {
			setReverse(false);
		}
	};

	return (
		<>
			<ThemWrapperBody theme="dark">
				<div className="pt-10">
					<PathBanner />
				</div>
				<ResponsiveContainer>
					<div className=" flex flex-col mt-8 tablet:flex-col laptop:flex-row desktop:flex-row ">
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
										className={`text-sm ${sortOrder === "asc" ? "text-primary" : "text-white"}`}
										onClick={() => handleSort("newest")}
									>
										최신순
									</button>
									<button
										className={`text-sm  ml-4 ${sortOrder === "desc" ? "text-primary font-bold" : "text-white"}`}
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
					<InfiniteScroll fetch={fetchList} isLastPage={isLastPage} />
				</ResponsiveContainer>
			</ThemWrapperBody>
		</>
	);
};

export default RunListPage;
