

const ChatItem = ({ messageItem, time }) => {
	const { message,  sender,  userName } = messageItem;


	return (
		<>
			<div className="">
				<div
					className={`max-w-xs p-4 rounded-lg ${
						sender ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
					} shadow-md`}
				>
					{/* 사용자 이름 */}
					<div className="font-semibold">{userName}</div>
					{/* 메시지 내용 */}
					<div>{message}</div>
					{/* 타임스탬프 */}
					<div className="text-xs text-right mt-1">{time}</div>
				</div>
			</div>
		</>
	);
};

export default ChatItem;
