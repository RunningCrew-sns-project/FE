import { useState } from "react";
import ChatListIcon from "./chatlistIcon";
import MessageList from "./MessageList";
import { useDevice } from "../../hook/usedevice";

const Message = () => {

  const [isListOpen, setIsListOpen] = useState(false);
  const {isMobile, isTablet} =useDevice()

  const handleOepnList = () => {
		setIsListOpen((prev) => !prev);
	};

	return (
		<>
			<div
				className={`${isMobile || isTablet ? " " : "right-[160px]  bottom-[160px]"} fixed z-40`}
			>
				<div className="z-50">{isListOpen && <MessageList />}</div>
			</div>
			<div
				className={`${isMobile || isTablet ? " right-[40px] bottom-[40px]" : "right-[160px] bottom-[100px]"} fixed z-50`}
			>
				<ChatListIcon handleOepnList={handleOepnList} />
			</div>
		</>
	);
};
export default Message