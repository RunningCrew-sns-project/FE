import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";

const ChatInput = ({ handleSendMsg }) => {
	const [wirteMsg, setWriteMsg] = useState("");

	const handleSend = () => {
		if (wirteMsg.trim()) {
			const newMsg = {
				id: 1,
				sender: "감자돌이",
				content: "오늘 달리기 가능한 사람?",
				date: "2023-11-06",
				type: "text",
				isSentByUser: true, // 사용자가 보낸 것이 아님
			};

			handleSendMsg(newMsg);
			setWriteMsg("");
		}
	};
	return (
		<>
			<div className="flex items-center w-full p-2 gap-2">
				<input
					type="text"
					value={wirteMsg}
					onChange={(e) => setWriteMsg(e.target.value)}
					placeholder="메시지 보내기"
					className="w-[70%]  h-12 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
				/>
				<div className="flex w-[30%]  gap-2">
					<div className="flex h-12 items-center justify-center w-1/2 bg-gray-200 cursor-pointer rounded-r-lg">
						이미지
					</div>
					<Button
						theme="dark"
						type="button"
						onClick={handleSend}
						className="w-1/2 text-xs h-12 rounded-r-lg"
					>
						<FontAwesomeIcon icon={faPaperPlane} className="mr-1" />
					</Button>
				</div>
			</div>
		</>
	);
};

export default ChatInput;
