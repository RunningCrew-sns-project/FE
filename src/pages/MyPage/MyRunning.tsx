import { useEffect, useState } from "react";
import RunBox from "../../components/RunBox";
import InfiniteScroll from "../../components/InfiniteScroll";
import { getMyRunning } from "../../api/myPage/api";

const MyRunning = () => {
	const [runHistory, setRunHistory] = useState([]);
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

	const requestMyRunning = async () => {
		const res = await getMyRunning();
		console.log(res, "res");
	};

	useEffect(() => {
		requestMyRunning();
	}, []);

	const num = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
	const requestData = () => {};
	return (
		<div className="flex flex-wrap gap-6 justify-center">
			{runHistory.length > 1 ? (
				<>
					{num.map(() => {
						return <RunBox {...data} />;
					})}
					<InfiniteScroll fetch={requestData} isLastPage={false} />
				</>
			) : (
				<span className="text-white">런닝 기록이 없습니다.</span>
			)}
		</div>
	);
};

export default MyRunning;
