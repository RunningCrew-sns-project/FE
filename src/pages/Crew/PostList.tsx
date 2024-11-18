import { useDevice } from "../../hook/usedevice";
import DateFilter from "../../components/Filter/DateFilter";
import LocationFilter from "../../components/Filter/LocationFilter";
import ItemList, { Item } from "../Runlist/ItemList";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { deleteCrew } from "../../api/crew/api";
import MessageModal from "../../components/Modal/MssageModal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface PostListProps {
	items: Item[];
	setPage: (page: number) => void;
	selectedCrewId: number;
	setStartDate: (startDate: Date | null) => void;
	setArea: (area: string) => void;
	setSortOrder: (sortOrder: string) => void;
	startDate: Date | null;
	currentDate: Date;
	sortOrder: string;
	master: boolean;
	setIsOpenManger: (isOpen: boolean) => void;
}

const PostList = ({
	items,
	selectedCrewId,
	// setHasMore,
	setStartDate,
	setArea,
	setSortOrder,
	startDate,
	currentDate,
	sortOrder,
	master,
	setIsOpenManger,
}: PostListProps) => {
	const { isMobile } = useDevice();
	const [isOpen, setIsOpen] = useState(false);

	const handleSort = (order: string) => {
		setSortOrder(order);
	};

	const handleManager = () => {
		setIsOpenManger(true);
	};

	const handleCrewOut = async () => {
		setIsOpen(true);
	};


	useEffect(() => {},[isOpen]) 

	return (
		<>
			<div className="flex flex-col mt-8 tablet:flex-col laptop:flex-row desktop:flex-row pb-40">
				{/* 필터 */}
				<div className="w-full flex flex-col space-y-4 mr-6 mb-4 laptop:max-w-xs desktop:max-w-xs">
					<DateFilter
						startDate={startDate}
						setStartDate={setStartDate}
						currentDate={currentDate}
					/>
					<LocationFilter setArea={setArea} />
					<div className="">
						<Link to={`/create/crewRun/${selectedCrewId}`}>
							<Button
								theme="light"
								type="button"
								className="w-full flex flex-col space-y-4 mr-6 mb-4 laptop:max-w-xs desktop:max-w-xs"
							>
								크루와 함께 Run
							</Button>
						</Link>
					</div>
					{master && (
						<div className="">
							<Button
								type="button"
								theme="primary"
								onClick={handleManager}
								className="w-full flex flex-col space-y-4 mr-6 mb-4 laptop:max-w-xs desktop:max-w-xs"
							>
								관리자 페이지
							</Button>
						</div>
					)}
					<Button
						type="button"
						theme="dark"
						className="opacity-30"
						onClick={() => handleCrewOut()}
					>
						탈퇴하기
					</Button>
				</div>

				<div className="flex flex-col  w-full space-y-4 mt-4">
					<div className=" text-white flex justify-between">
						{isMobile ? (
							<h3 className="desktext-lg">크루원들과 함께 달려보세요</h3>
						) : (
							<h3 className="desktext-lg">크루원들과 함께 달려보세요</h3>
						)}
						<div>
							<button
								className={`text-sm ${sortOrder === "latest" ? "text-primary" : "text-white"}`}
								onClick={() => handleSort("newest")}
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

				{isOpen && (
					<MessageModal
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						selectedCrewId={selectedCrewId}
					/>
				)}
			</div>
		</>
	);
};

export default PostList;
