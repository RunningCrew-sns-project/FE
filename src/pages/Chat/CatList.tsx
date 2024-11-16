import { newDate } from "react-datepicker/dist/date_utils";
import { dateFormatter } from "../../util/dateFormatter";
import ChatDate from "./catui/ChatDate";
import ChatItem from "./catui/ChatItem";

const ChatList = ({ messages }) => {







	return (
		<>
			<div className="w-full h-screen  overflow-hidden ">
				<div className="px-4 bg-white pt-6  pb-4 rounded-t-3xl text-center h-full overflow-y-auto">
					{messages.map((message, index) => {
						const { time } = message;
						const date = dateFormatter(time);
						console.log(date);
						return (
							<>
								<div className="" key={index}>
									{(index === 0 ||
										dateFormatter(messages[index - 1].time).date !==
											date.date) && <ChatDate date={date.date} />}
									<ChatItem messageItem={message} time={date.startTime} />
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
