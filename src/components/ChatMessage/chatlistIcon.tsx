import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

interface ChatListIconProps {
  handleOepnList: () => void; 
}


const ChatListIcon = ({handleOepnList} : ChatListIconProps) => {
	return (
		<>
			<div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer text-xl hover:bg-yellow">
				<FontAwesomeIcon icon={faComment} onClick={handleOepnList} />
			</div>
		</>
	);
};
export default ChatListIcon;
