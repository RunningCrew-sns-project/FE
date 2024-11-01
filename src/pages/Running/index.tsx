import PathBanner from "../../components/Banner/PathBanner";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import RunningContent from "./RunningContent";

const RunningPage = () => {
	const { isMobile, isTablet } = useDevice();

	return (
		<>
			{isMobile || isTablet ? (
				<div className="">
					<div className="flex items-center justify-center min-h-screen">
						<div className="w-full h-full">
							<RunningContent />
						</div>
					</div>
				</div>
			) : (
				<ThemWrapperBody theme="dark">
					<div className="">
						<PathBanner />
						<div className="flex items-center justify-center min-h-screen">
							<RunningContent />
						</div>
					</div>
				</ThemWrapperBody>
			)}
		</>
	);
};

export default RunningPage;
