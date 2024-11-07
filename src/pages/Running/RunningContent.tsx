
import { useState } from "react";
import { useDevice } from "../../hook/usedevice";
import useStopWatch from "../../hook/useStopWatch";
import Running from "./Running";
import RunningFooter from "./RunningFooter";
import RuningHeader from "./RunningHeader";

const RunningContent = () => {
	const { isMobile, isTablet } = useDevice();
	const [isStop, setIsStop] = useState(false);
	const [data , setData] = useState({})
	const { stop } = useStopWatch();



	return (
		<>
			<div
				className={`${
					isMobile || isTablet
						? "w-full h-screen"
						: "w-full max-w-[420px] h-[720px]"
				} bg-white rounded-lg relative overflow-hidden`}
			>
				<RuningHeader/>
				<div className="absolute top-[160px] w-full ">
					<Running  isStop={isStop} setData={setData}/>
				</div>
				<div className={`absolute bottom-0 w-full z-20`}>
					<RunningFooter  stop={stop} setIsStop={setIsStop} data={data}/>
				</div>
			</div>
		</>
	);
};

export default RunningContent;
