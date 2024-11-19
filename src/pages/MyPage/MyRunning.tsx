import { useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyRunning } from "../../api/myPage/api";
import { FaPersonRunning } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";

const MyRunning = () => {
	const [runHistory, setRunHistory] = useState([]);

	const requestMyRunning = async () => {
		const res = await getMyRunning();
		setRunHistory(res.data.success.responseData.currentScrollItems);
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
		<div>
			{sortedMonths.length > 0 ? (
				sortedMonths.map((monthKey) => (
					<div key={monthKey} className="flex flex-col gap-6 items-center ">
						<div className="w-full tablet:w-[400px] laptop:w-[600px]">
							<h2 className=" text-xl bg-primary w-[200px] py-1 pl-2 rounded-sm">
								{new Date(monthKey + "-01").toLocaleString("default", {
									year: "numeric",
									month: "long",
								})}
							</h2>
						</div>
						{groupedRecords[monthKey].map((data: any) => (
							<RunRecord key={data.id} data={data} />
						))}

						<InfiniteScroll fetch={requestMyRunning} isLastPage={false} />
					</div>
				))
			) : (
				<span className="text-white">런닝 기록이 없습니다.</span>
			)}
		</div>
	);
};

export default MyRunning;
