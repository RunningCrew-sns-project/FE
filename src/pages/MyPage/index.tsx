import React from "react";
import Button from "../../components/Button";
import RunBox from "../../components/RunBox";

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
	return (
		<div className="flex w-full justify-around bg-black">
			<RunBox {...data} />
			<RunBox />
		</div>
	);
};

export default MyPage;
