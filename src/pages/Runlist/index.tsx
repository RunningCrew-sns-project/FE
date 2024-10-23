import PathBanner from "../../components/Banner/PathBanner";
import { ResponsiveContainer } from "../../components/Container";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import DateFilter from "./Filter/DateFilter";
import LocationFilter from "./Filter/LocationFilter";
import ItemList from "./ItemList";

const RunListPage = () => {
	const { isMobile } = useDevice();

	return (
		<>
			<ThemWrapperBody theme="dark">
				<PathBanner />
				<ResponsiveContainer>
					<div className="flex flex-col mt-8 tablet:flex-col laptop:flex-row desktop:flex-row ">
						<div className="w-full flex flex-col space-y-4 mr-6 mb-4 laptop:max-w-xs desktop:max-w-xs">
							<DateFilter />
							<LocationFilter />
						</div>
						<div className="flex flex-col  w-full space-y-4 mt-4">
							<div className=" text-white flex justify-between">
								{isMobile ? (
									<h3 className="desktext-lg">
										런닝메이트를 찾아보세요!
									</h3>
								) : (
									<h3 className="desktext-lg">
										함께 달릴 런닝메이트를 찾아보세요!
									</h3>
								)}
								<span className="text-sm">최신순</span>
							</div>
							<hr className="border border-white my-4" />
							<div className="w-3/4 space-y-1">
								<ItemList />
							</div>
						</div>
					</div>
				</ResponsiveContainer>
			</ThemWrapperBody>
		</>
	);
};

export default RunListPage;
