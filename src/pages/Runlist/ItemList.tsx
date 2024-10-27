import RunBox from "../../components/RunBox";

interface RunData {
	title: string;
	location: string;
	date: string;
	startTime: string;
	banner: string;
	people: number;
	maximumPeople: number;
	status: "시작전" | "진행중" | "완료";
}

interface ItemListProps {
	runData: {
		data: RunData[];
		total: number;
		page: number;
		pageSize: number;
		moreData: boolean;
	};
}

const ItemList = ({ runData }: ItemListProps) => {
	return (
		<>
			{/* 런박스 반응형 나중에  */}
			{/* 무한스크롤릴 구현 나중에  */}
			<div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-3 laptop:grid-cols-2 desktop:grid-cols-2  ">
				{runData.data.map((item) => (
					<div className="w-[32%] mb-4" key={item.title}>
						<RunBox
							boxVerticalWidth="200px" // 세로 너비
							boxHorizontalWidth="450px" // 가로 너비
							title={item.title}
							location={item.location}
							date={item.date}
							startTime={item.startTime}
							banner={item.banner}
							people={item.people}
							maximumPeople={item.maximumPeople}
							status={item.status}
						/>
					</div>
				))}
			</div>
		</>
	);
};

export default ItemList;
