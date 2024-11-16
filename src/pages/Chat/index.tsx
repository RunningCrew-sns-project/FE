import PathBanner from "../../components/Banner/PathBanner";
import ThemWrapperBody from "../../components/ThemWrapper";
import { useDevice } from "../../hook/usedevice";
import ChatRoom from "./ChatRoom";

const Chat = () => {
	const { isMobile, isTablet } = useDevice();

	return (
		<>
			{isMobile || isTablet ? (
				<div className="">
					<div className="flex items-center justify-center min-h-screen">
						<div className="w-full h-full">
							<ChatRoom />
						</div>
					</div>
				</div>
			) : (
				<ThemWrapperBody theme="dark">
					<div className="">
						<PathBanner />
						<div className="flex items-center justify-center min-h-screen">
							<ChatRoom />
						</div>
					</div>
				</ThemWrapperBody>
			)}
		</>
	);
};
export default Chat;
