import React from "react";
import Button from "../../components/Button";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";

type Props = {};

const MyPage = (props: Props) => {
	const data = {
		title: "오늘의 갓생",
		location: "무슨동",
		date: "오늘",
		startTime: "17:00",
		banner: "url",
		people: 2,
		maximumPeople: 10,
		status: "시작전",
	};
	const dd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	return (
		<>
			<div className="flex w-full justify-around bg-black flex-wrap gap-4">
				{dd.map(() => {
					return <RunBox {...data} />;
				})}
			</div>
			<InfiniteScroll isLastPage={false} fetch={() => console.log("touch")} />
		</>
	);
};

export default MyPage;
