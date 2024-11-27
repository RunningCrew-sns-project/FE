import { useEffect, useState } from "react";
import Button from "../../components/Button";

import toast from "react-hot-toast";
import {
	deleteMember,
	getCrewMember,
	putChangeMster,
	putWarning,
} from "../../api/crew/api";
import { useNavigate } from "react-router-dom";

interface CrewMember {
	userId: number;
	nickname: string;
	caveat: number;
	status: string;
	email: string;
}

interface crewMangerProps {
	setIsOpenManger: React.Dispatch<React.SetStateAction<boolean>>;
	crewId: string | undefined;
}

const CrewManger = ({ setIsOpenManger, crewId }: crewMangerProps) => {
	const [members, setMembers] = useState<CrewMember[]>([]);
	const [loading, setLoading] = useState(false); // 로딩 상태 추가
	const navigate = useNavigate();

	const fetchCrewMember = async () => {
		try {
			const res = await getCrewMember(crewId);
			const members = res.data.success.responseData;
			setMembers(members);
			console.log("멤버들", members);
		} catch (error) {
			console.error("Failed to fetch crew members", error);
		}
	};

	// 경고 처리 함수 (낙관적 UI 구현)
	const handleWarning = async (userId: number, currentWarning: number) => {
		// UI에서 즉시 경고 수 증가
		setMembers((prevMembers) =>
			prevMembers.map((member) =>
				member.userId === userId
					? { ...member, caveat: currentWarning + 1 }
					: member,
			),
		);

		try {
			setLoading(true); // 로딩 시작
			const res = await putWarning({ crewId, userId: userId.toString() });

			if (res.data.success.code === 200) {
				const caveat = res.data.success.responseData.caveat;
				toast(`경고 ${caveat}회 누적`);
				// 서버에서 최신 경고 수 받아오기
				setMembers((prevMembers) =>
					prevMembers.map((member) =>
						member.userId === userId ? { ...member, caveat } : member,
					),
				);
				if (caveat === 3) {
					fetchCrewMember();
				}
			} else {
				throw new Error("Failed to update warning");
			}
		} catch (error) {
			toast.error("경고 처리 실패");
			console.error("Error handling warning:", error);
			// UI 상태 롤백
			setMembers((prevMembers) =>
				prevMembers.map((member) =>
					member.userId === userId
						? { ...member, caveat: currentWarning }
						: member,
				),
			);
		} finally {
			setLoading(false); // 로딩 끝
		}
	};

	// 강퇴처리
	const handleOut = (userId: string, nickname: string, status: string) => {
		console.log("상태확인 ", status);
		try {
			if (status === "가입 완료") {
				setMembers((prevMember) =>
					prevMember.map((member) =>
						member.userId.toString() === userId.toString()
							? { ...member, status: "강제 탈퇴" }
							: member,
					),
				);
				deleteMember(crewId, userId);
				toast(`${nickname}님이 강퇴처리되었습니다. `);
			} else {
				toast(` 이미 크루원이 아닙니다.`);
			}
		} catch (error) {
			console.log(error);
			//롤백, 다시 받아오기
			fetchCrewMember();
		}
	};

	// 방장 권한 넘기기
	const handleChangeMaster = async (userId: string, nickname: string) => {
		try {
			if (crewId && userId) {
				await putChangeMster(crewId, userId);
				navigate(0);
				toast(`권한을 ${nickname} 넘기고 크루를 탈퇴했습니다. `);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCrewMember();
	}, [crewId]);

	return (
		<>
			<div className="pb-24">
				<div className="flex items-center justify-between mb-8">
					<h3 className="text-white mb-4">크루원을 관리해 보세요</h3>
					<Button
						type="button"
						theme="light"
						onClick={() => setIsOpenManger(false)}
					>
						돌아가기
					</Button>
				</div>
				<hr />
				<div className="flex items-center justify-between   text-white p-4 rounded-md bg-gray-900 mb-4">
					<div className="flex-1 text-center border-r border-white px-2">
						이름
					</div>
					<div className="flex-1 text-center border-r border-white px-2">
						누적 경고
					</div>
					<div className="flex-1 text-center border-r border-white px-2">
						경고주기
					</div>
					<div className="flex-1 text-center border-r border-white px-2">
						퇴장
					</div>
					<div className="flex-1 text-center border-r border-white px-2">
						상태
					</div>
					<div className="flex-1 text-center px-2">방장변경</div>
				</div>

				{members && members.length > 0
					? members.map((member) => (
							<div
								className="flex items-center justify-between text-white p-4 rounded-md bg-gray-800 mb-2"
								key={member.email}
							>
								<div className="flex-1 text-center border-r border-white px-2">
									{member.nickname}
								</div>
								<div className="flex-1 text-center border-r border-white px-2">
									{member.caveat} / 3
								</div>
								<div className="flex-1 text-center border-r border-white px-2">
									<Button
										type="button"
										theme="primary"
										disabled={loading} // 로딩 중에는 버튼 비활성화
										onClick={() => handleWarning(member.userId, member.caveat)}
									>
										경고
									</Button>
								</div>
								<div className="flex-1 text-center border-r border-white px-2">
									{member.status.trim() === "가입 완료".trim() ? (
										<Button
											type="button"
											theme="primary"
											onClick={() =>
												handleOut(
													member.userId.toString(),
													member.nickname,
													member.status,
												)
											}
										>
											강퇴
										</Button>
									) : (
										<Button
											type="button"
											theme="primary"
											onClick={() =>
												handleOut(
													member.userId.toString(),
													member.nickname,
													member.status,
												)
											}
										>
											강퇴불가
										</Button>
									)}
								</div>
								<div className="flex-1 text-center border-r border-white px-2">
									{member.status}
								</div>
								<div className="flex-1 text-center px-2">
									<Button
										type="button"
										theme="dark"
										onClick={() =>
											handleChangeMaster(
												member.userId.toString(),
												member.nickname,
											)
										}
									>
										권한주기
									</Button>
								</div>
							</div>
						))
					: ""}
			</div>
		</>
	);
};

export default CrewManger;
