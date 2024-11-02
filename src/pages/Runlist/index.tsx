import PathBanner from "../../components/Banner/PathBanner";
import { ResponsiveContainer } from "../../components/Container";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import DateFilter from "../../components/Filter/DateFilter";
import LocationFilter from "../../components/Filter/LocationFilter";
import ItemList from "./ItemList";
import { useEffect, useState } from "react";
import { runData } from "../../_Mock/list";
import { useSearchParams } from "react-router-dom";
// import { CrewTeamList } from "../../_Mock/crewteamlist";

const RunListPage = () => {
	const { isMobile } = useDevice();

	const currentDate = new Date();
	const [startDate, setStartDate] = useState<Date | null>(currentDate);
	const [area, setArea] = useState("전체");
	const [sortOrder, setSortOrder] = useState("latest"); // 기본값은 최신순
	const [items, setItems] = useState([]);

	//카테고리
	const [searchParms] = useSearchParams();
	const category = searchParms.get("");

	// 통신함수
	useEffect(() => {
		// 통신
		const res = runData;
		// const res2 = CrewTeamList;
		setItems(res.itmes);
		console.log(startDate);
		console.log(area);
		console.log(sortOrder);
	}, [area, startDate, sortOrder, items, category]);

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
										{" "}
										오래된순{" "}
									</button>
								</div>
							</div>
							<hr className="border border-white my-4" />
							<div className="">
								<ItemList runData={items} />
							</div>
						</div>
					</div>
				</ResponsiveContainer>
			</ThemWrapperBody>
		</>
	);
};

export default RunListPage;
