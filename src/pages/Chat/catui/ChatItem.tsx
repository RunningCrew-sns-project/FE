interface ItemProps {
	message : string
	sender: string
	userName : string
}


interface ChatItemProps {
	messageItem : ItemProps
	time: string
} 


const ChatItem = ({ messageItem, time }: ChatItemProps) => {
	const { message, sender, userName } = messageItem;

	return (
		<>
			<div className="text-left ">
				<div className="font-semibold text-sm">{userName}</div>
				<div className="flex flex-start gap-1 ">
					<div
						className={`max-w-xs p-4 rounded-lg ${
							sender ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
						} shadow-md`}
					>
						<div className="text-base">{message}</div>
					</div>
					<div className="text-xs text-right mt-8 ">{time}</div>
				</div>
			</div>
		</>
	);
};

export default ChatItem;
