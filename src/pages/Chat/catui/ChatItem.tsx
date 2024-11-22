interface ItemProps {
	message: string;
	sender: string;
	userName?: string |null;
}

interface ChatItemProps {
	messageItem: ItemProps;
	time: string;
	userName: string | null;
}

const ChatItem = ({
	messageItem,
	time,
	userName: senderEmail,
}: ChatItemProps) => {
	const { message, sender, userName } = messageItem;
	console.log(userName);
	return (
		<>
			<div
				className={`flex   ${sender === senderEmail ? "justify-end" : "justify-start"}`}
			>
				<div className="flex flex-col  flex-start gap-1 ">
					<div className={`font-semibold text-sm ${
              sender === senderEmail ? "text-right" : "text-left"
            }`}>{userName}</div>
					<div
						className={`max-w-xs p-4 rounded-lg ${
							sender === senderEmail
								? "bg-blue-500 text-white"
								: "bg-gray-300 text-gray-800"
						} shadow-md`}
					>
						<div className="text-base">{message}</div>
					</div>
					<div className={` text-xs ${
              sender === senderEmail ? "text-right" : "text-left"
            }`}>{time}</div>
				</div>
			</div>
		</>
	);
};

export default ChatItem;
