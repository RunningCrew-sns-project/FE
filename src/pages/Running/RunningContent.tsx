import { useDevice } from "../../hook/usedevice";
import Running from "./running";
import RunningFooter from "./RunningFooter";
import RuningHeader from "./RunningHeader";

const RunningContent = () => {
	const { isMobile, isTablet } = useDevice();

	return (
		<>
			<div
				className={`${
					isMobile || isTablet
						? "w-full h-screen"
						: "w-full max-w-[420px] h-[720px]"
				} bg-white rounded-lg relative overflow-hidden`}
			>
				<RuningHeader />
				<div className="absolute top-[160px] w-full ">
					<Running />
				</div>
				<div className={`absolute bottom-0 w-full z-20`}>
					<RunningFooter />
				</div>
			</div>
		</>
	);
};

export default RunningContent;
