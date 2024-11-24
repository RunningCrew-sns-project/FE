import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import UploadImage from "../../../components/UploadImage";
import { uploadFiles } from "../../../api/image/api";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

interface ChatInputProps {
	handleSendMsg: (message: string) => void;
	setImageUrls: (urls: string[]) => void;
	imgUrl: string[];
}
const ChatInput = ({ handleSendMsg, setImageUrls, imgUrl }: ChatInputProps) => {
	const [writeMsg, setWriteMsg] = useState("");

	const getImgURL = async () => {
		if (imgUrl.length === 0) return []; // 이미지가 없으면 빈 배열 반환
		const fileUrls = await uploadFiles(
			"https://runlink.kro.kr/api/storage",
			imgUrl,
			{ directory: "chat", big: false },
		);
		return fileUrls;
	};

	const handleSend = async () => {
		const images = await getImgURL();
		if (writeMsg.trim() || images.length > 0) {
			// 메시지 또는 이미지가 있으면 전송
			const newMsg = writeMsg.trim();
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
							onUploadFiles={(formData: FormData) => {
								const fileUrls = Array.from(formData.getAll("files")).map(
									(file) =>
										typeof file === "string"
											? file
											: URL.createObjectURL(file as File),
								);
								setImageUrls(fileUrls); // URL 문자열 배열을 설정
							}}
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
