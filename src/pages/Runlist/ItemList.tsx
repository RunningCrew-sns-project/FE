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
	runData: RunData[]; // runData는 RunData 객체의 배열
}

const ItemList = ({ runData }: ItemListProps) => {
	return (
		<>
			<div className="flex flex-wrap justify-between">
				{runData.map((item) => (
					<div className="w-[32%] mb-4">
						<RunBox
							key={item.title} // 각 요소에 고유한 key 값을 부여해야 한다 (ex. title)
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
