interface ActiveChatItemProps {
  title: string;
  time: string;
  content: string;
}



const ActiveChatItem = ({ title, time, content } : ActiveChatItemProps) => {
	return (
		<>
			<div className="flex items-center p-4 border-b border-gray-300">
				<img
					src="/path/to/image.png"
					alt="Chat Icon"
					className="w-12 h-12 mr-4"
				/>{" "}
				{/* 이미지 경로 수정 */}
				<div className="flex-grow">
					<h2 className="text-md font-semibold">
						{title} <span className="text-sm">(6)</span>
					</h2>
					<p className="text-sm text-gray-600">{content}</p>
				</div>
				<p className="text-sm text-gray-400">{time}</p>
			</div>
		</>
	);
};

export default ActiveChatItem;
