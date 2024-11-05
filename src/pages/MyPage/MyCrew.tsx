import React, { useEffect } from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyCrew } from "../../api/myPage/api";

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

	const requestMyCrew = async () => {
		const res = getMyCrew();
	};

	useEffect(() => {
		requestMyCrew();
	}, []);
	return (
		<div className="flex flex-wrap gap-6 mx-auto justify-center">
			{num.map(() => {
				return <RunBox {...data} />;
			})}
			<InfiniteScroll fetch={requestMyCrew} isLastPage={false} />
		</div>
	);
};

export default MyCrew;
