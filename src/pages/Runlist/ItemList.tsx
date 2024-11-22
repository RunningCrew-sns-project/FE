import RunBox from "../../components/RunBox";
import React from 'react';

// Item의 타입 정의
export interface Item {
  runId: number;
  crewId: number;
  title: string;
  location: string;
  activityRegion: string;
  date: string;
  startTime: string;
  banner?: string; // 선택적 프로퍼티
  crewImageUrl?: string; // 선택적 프로퍼티
  people: number;
  memberCount: number;
  maximumPeople: number;
  maxCapacity: number;
  status: "시작전" | "진행중" | "완료" | "모집중" | "만원"; // status 값을 제한된 문자열로 정의
  postType: string;
  crewName?: string; // crewName 추가
	image?: string;
	region?: string;
	time?: string;
	maxMember?: number;
}

// ItemList의 props 타입 정의
interface ItemListProps {
  runData: Item[] ;
}





const ItemList = React.memo(({ runData } : ItemListProps) => {



  return (
		<>
			{/* 런박스 반응형 나중에  */}
			{/* 무한스크롤릴 구현 나중에  */}
			<div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-3 laptop:grid-cols-2 desktop:grid-cols-2  ">
				{runData.map((item,index) => (
					<div className="w-[32%] mb-4" key={index}>
						<RunBox
							boxVerticalWidth="200px" // 세로 너비
							boxHorizontalWidth="450px" // 가로 너비
							title={item.title || item.crewName || ''}
							location={item.location || item.activityRegion}
							date={item.date}
							startTime={item.startTime}
							banner={item.banner || item.crewImageUrl || ''}
							people={item.people || item.memberCount}
							maximumPeople={item.maximumPeople || item.maxCapacity}
							status={item.status}
							runId={item.runId}
							postType={item.postType}
							crewId={item.crewId}
						/>
					</div>
				))}
			</div>
		</>
	);
});



export default ItemList
