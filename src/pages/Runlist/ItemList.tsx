import RunBox from "../../components/RunBox";
import React from 'react';

const ItemList = React.memo(({ runData }) => {



  return (
		<>
			{/* 런박스 반응형 나중에  */}
			{/* 무한스크롤릴 구현 나중에  */}
			<div className="grid grid-cols-2 gap-4 w-full tablet:grid-cols-3 laptop:grid-cols-2 desktop:grid-cols-2  ">
				{runData.map((item) => (
					<div className="w-[32%] mb-4" key={`${item.runId || item.crewId}-${item.runId}`}>
						<RunBox
							boxVerticalWidth="200px" // 세로 너비
							boxHorizontalWidth="450px" // 가로 너비
							title={item.title || item.crewName}
							location={item.location || item.activityRegion}
							date={item.date}
							startTime={item.startTime}
							banner={item.banner || item.crewImageUrl}
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
