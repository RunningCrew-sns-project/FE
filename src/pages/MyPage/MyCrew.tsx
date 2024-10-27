import React from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";

type Props = {};

const MyCrew = (props: Props) => {
	const data = {
		title: "오늘의 갓생",
		location: "무슨동",
		banner: "url",
		people: 2,
		maximumPeople: 10,
		status: "모집중",
	};
	const num = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	const requestData = () => {};
	return (
		<div className="flex flex-wrap gap-2">
			{num.map(() => {
				return <RunBox {...data} />;
			})}
			<InfiniteScroll fetch={requestData} isLastPage={false} />
		</div>
	);
};

export default MyCrew;
