import React from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";

type Props = {};

const MyRunning = (props: Props) => {
	const data = {
		title: "오늘의 갓생ㅓ아ㅓㄹ 너ㅏ러ㅣ너리나ㅓ리ㅓㄹ이나ㅓ리나ㅓㅇ리ㅏㄴㄹ",
		location: "무슨동 ㅓ아ㅓㄹㄴ ㅓ나 러ㅏ니ㅓ라밀 djksjfksjfsljdflsj",
		date: "오늘 ㅓ아ㅓㄹ나ㅓ린러 ",
		startTime: "17:00 어ㅏ너리너 sjkdjlsjfl",
		banner: "url",
		people: 2,
		maximumPeople: 10,
		status: "시작전",
	};

	const num = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	const requestData = () => {};
	return (
		<div className="flex flex-wrap gap-6 justify-center">
			{num.map(() => {
				return <RunBox {...data} boxVerticalWidth="130px" />;
			})}
			<InfiniteScroll fetch={requestData} isLastPage={false} />
		</div>
	);
};

export default MyRunning;
