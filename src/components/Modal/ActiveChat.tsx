import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { getChatUser } from "../../api/ChatApi/ChatApi";

const ActiveChat = () => {
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("roomId");

	const {mutate} =useMutation({
		mutationFn: getChatUser,
		onSuccess : (data) => {
			console.log('유저리스트', data )
		},
		onError : (error) => {
			console.log(error)
		}
	})

	useEffect(() => {
		mutate(roomId)
	},[])


	return (
		<>
			<div className="">
				<h3 className="font-black mb-4">참여유저</h3>
				<hr />
				<div className="py-3"></div>
				<div className="bg-primary p-4">
					<ul className="flex justify-around  items-center space-x-4 cursor-pointer">
						<li className="text-black font-semibold text-center">채팅참여인원</li>
						<li className="text-black font-semibold">달리기 참여인원</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default ActiveChat;
