import { useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyRunning } from "../../api/myPage/api";
import { FaPersonRunning } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";

const MyRunning = () => {
	const [runHistory, setRunHistory] = useState([]);
	const [nextCursor, setNextCursor] = useState(null);
	const [isLastPage, setIsLastPage] = useState(false);

	const requestMyRunning = async () => {
		const res = await getMyRunning({ cursor: nextCursor, size: 5 });
		const data = await res.data.success.responseData;
		setRunHistory((prev) => prev.concat(data.currentScrollItems));
		setNextCursor(data.nextCursor?.id || null);
		setIsLastPage(data.lastScroll);
	};

	useEffect(() => {
		requestMyRunning();
	}, []);

	const RunRecord = ({ data }: { data: any }) => {
		return (
			<div className="border rounded-md p-4 flex flex-col bg-white w-full tablet:w-[400px] laptop:w-[600px]">
				<div className="flex gap-2 items-center">
					<MdTimer />
					<span>{data.record}</span>
				</div>
				<div className="flex gap-2 items-center">
					<FaPersonRunning />
					<span>{data.distance}</span>
				</div>
				<span className="text-gray-400">{data.createdAt}</span>
			</div>
		);
	};

	// Group records by month
	const groupedRecords = runHistory.reduce((acc: any, record: any) => {
		const date = new Date(record.createdAt);
		const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;

		if (!acc[monthKey]) {
			acc[monthKey] = [];
		}
		acc[monthKey].push(record);
		return acc;
	}, {});

	const sortedMonths = Object.keys(groupedRecords).sort((a, b) => {
		const [yearA, monthA] = a.split("-").map(Number);
		const [yearB, monthB] = b.split("-").map(Number);
		return yearB - yearA || monthB - monthA;
	});

	return (
		<div className="flex flex-col items-center">
			{sortedMonths.length > 0 ? (
				<div className="flex flex-col gap-6 items-center">
					{sortedMonths.map((monthKey) => (
						<div
							key={monthKey}
							className="w-full flex flex-col gap-6 items-center"
						>
							<div className="w-full tablet:w-[400px] laptop:w-[600px]">
								<h2 className="text-xl bg-primary w-[200px] py-1 pl-2 rounded-sm">
									{new Date(monthKey + "-01").toLocaleString("default", {
										year: "numeric",
										month: "long",
									})}
								</h2>
							</div>
							{groupedRecords[monthKey].map((data: any) => (
								<RunRecord key={data.id} data={data} />
							))}
						</div>
					))}
					<InfiniteScroll fetch={requestMyRunning} isLastPage={isLastPage} />
				</div>
			) : (
				<span className="text-white">런닝 기록이 없습니다.</span>
			)}
		</div>
	);
};

export default MyRunning;
