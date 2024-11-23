import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getChatUser } from "../../api/ChatApi/ChatApi";
import { useLocation } from "react-router-dom";
import { deleteCrewRunMember, deleteRunMember, getCrewRunMembers, getRunMembers } from "../../api/run/api";
import Button from "../Button";

interface userMember {
	userName?: string;
	nickname?: string;
	userId? : number;
}

const ActiveChat = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const { id, roomData } = location.state || {};
	const roomId = queryParams.get("roomId");
	const [members, setMembers] = useState<userMember[]>([]);
	const [isRun, setIsRun] = useState(true);


	const { mutate } = useMutation({
		mutationFn: getChatUser,
		onSuccess: (data) => {
			console.log("유저리스트", data);
			setMembers(data.data.success.responseData);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// 일반달리기 멤버  조회
	const { mutate: runMembers } = useMutation({
		mutationFn: getRunMembers,
		onSuccess: (data) => {
			console.log("일반달리기 유저 리스트 ", data);
			setMembers(data.data.responseData);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	// 크루달리기 멤버 조회
	const { mutate: crewRunMembers } = useMutation({
		mutationFn: getCrewRunMembers,
		onSuccess: (data) => {
			console.log("크루달리기 유저 리스트 ", data);
			setMembers(data.data.responseData);
		},
		onError: (error) => {
			console.log(error);
		},
	});


	const handleRunMemberOut = (badUser : string) => {
		if(badUser){
			const title = roomData.title;
			setMembers((prevMembers) =>
				prevMembers.filter((member) => member.userId?.toString() !== badUser)
			);
			if (title.includes("crew")) {
				deleteCrewRunMember(id, badUser);
			} else {
				deleteRunMember(id, badUser);
			}
		}else {
			console.error("BadUser is empty!"); // 디버깅용 메시지
		}
	}



	useEffect(() => {
		if (isRun) {
			mutate(roomId);
		} else {
			if (roomData) {
				const title = roomData.title;
				if (title.includes("crew")) {
					crewRunMembers(id);
				} else {
					runMembers(id);
				}
			}
		}
	}, [isRun]);

	return (
		<>
			<div className="">
				<h3 className="font-black mb-4">참여유저</h3>
				<hr />
				<div className="py-3 mb-2">
					{isRun
						? members.map((member) => <div className="">{member.userName}</div>)
						: members.map((member) => (
								<div className="flex justify-between  items-center mb-4" key={member.userId}>
									<div className="my-2">{member.nickname}</div>
									<Button type="button" theme="dark"    onClick={() => handleRunMemberOut(member.userId?.toString() || '')} >강퇴</Button>
								</div>
							))}
				</div>
				<div className="bg-primary p-4">
					<ul className="flex justify-around  items-center space-x-4 cursor-pointer">
						<li
							className="text-black font-semibold text-center"
							onClick={() => setIsRun(true)}
						>
							채팅참여인원
						</li>
						<li
							className="text-black font-semibold"
							onClick={() => setIsRun(false)}
						>
							달리기 참여인원
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default ActiveChat;
