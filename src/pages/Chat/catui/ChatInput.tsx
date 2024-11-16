import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import UploadImage from "../../../components/UploadImage";
import { uploadFiles } from "../../../api/image/api";
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ChatInput = ({ handleSendMsg, setImageUrls, imgUrl }) => {
	const [writeMsg, setWriteMsg] = useState("");

	const getImgURL = async () => {
		if (imgUrl.length === 0) return []; // 이미지가 없으면 빈 배열 반환
		const fileUrls = await uploadFiles(
			'http://ec2-54-180-9-220.ap-northeast-2.compute.amazonaws.com:8080/api/storage',
			imgUrl,
			{ directory: 'chat', big: false }
		);
		return fileUrls;
	};

	const handleSend = async () => {
		const images = await getImgURL();
		if (writeMsg.trim() || images.length > 0) { // 메시지 또는 이미지가 있으면 전송
			const newMsg = {
				id: 1,
				sender: "감자돌이",
				content: writeMsg.trim(), // 사용자가 입력한 메시지로 설정
				date: "2023-11-06",
				// type: "text",
				// isSentByUser: true,
				image: images.length > 0 ? images : undefined // 이미지가 없으면 필드 생략
			};
			handleSendMsg(newMsg);
			setWriteMsg("");
			setImageUrls([]);
		}
	};

	return (
		<>
			<div className="flex items-center w-full p-2 gap-2">
				<input
					type="text"
					value={writeMsg}
					onChange={(e) => setWriteMsg(e.target.value)}
					placeholder="메시지 보내기"
					className="w-[70%] h-12 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
				/>
				<div className="flex w-[30%] gap-2">
					<div className="flex h-12 items-center justify-center w-1/2">
						<UploadImage
							onUploadFiles={(formData) => setImageUrls(formData)}
							multiple={true}
							uploadfileLength={5}
							id="file-upload"
							imgpreviewWidth={30}
							imgpreviewHeight={12}
							buttonClassName="bg-blue-500 text-white p-2 rounded"
							imgClassName="w-full h-full object-cover"
							buttonpositionClassName="flex items-center"
							showPreview={false}
							icon={faUpload}
						/>
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
