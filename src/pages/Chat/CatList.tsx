
import { ChatMessage } from "../../hook/useChatConnect";
import { dateFormatter } from "../../util/dateFormatter";
import ChatDate from "./catui/ChatDate";
import ChatItem from "./catui/ChatItem";

interface chatLlistProps {
	messages: ChatMessage[];
	userName: string | null;
}

const ChatList = ({ messages, userName }: chatLlistProps) => {
	

	return (
		<>
			<div className="w-full" >
				<div className="px-4 bg-white pt-6  pb-4 rounded-t-3xl text-center">
					{messages.map((message, index) => {
						const { time } = message;
						const date = dateFormatter(time);
						return (
							<>
								<div className="mb-3" key={index}>
									{(index === 0 ||
										dateFormatter(messages[index - 1].time).date !==
											date.date) && <ChatDate date={date.date} />}
									<ChatItem
										messageItem={message}
										time={date.startTime}
										userName={userName}
									/>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default ChatList;
