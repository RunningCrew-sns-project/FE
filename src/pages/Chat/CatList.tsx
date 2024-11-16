

import ChatDate from "./catui/ChatDate";
import ChatItem from "./catui/ChatItem";


const ChatList = ({messages}) => {


  



	return (
		<>
			<div className="w-full h-screen  overflow-hidden ">
        <div className="px-4 bg-white pt-6  pb-4 rounded-t-3xl text-center h-full overflow-y-auto">
          {messages.map((message, index) =>(
            <div className="" key={index}>
              {/* {(index == 0 || messages[index -1].date !== message.date) && (
                  <ChatDate date={message.date}/>
              )} */}
              <ChatItem message={message}/>
            </div>
          ) )}
          
        </div>
			</div>
		</>
	);
};

export default ChatList;
