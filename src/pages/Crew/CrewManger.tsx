import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { getCrewMember } from "../../api/crew/api";

const CrewManger = ({ setIsOpenManger, crewId }) => {
	const [members, setMembers] = useState([]);
	const [isout, setIsOut] = useState(true);

	const members_Mock = [
		{
			id: 1,
			name: "홍길동",
			warnings: 2,
			status: "활동 중", // 강퇴 여부에 따라 "활동 중" 또는 "강퇴"로 표시
		},
		{
			id: 2,
			name: "김영희",
			warnings: 5,
			status: "경고 누적", // 특정 경고 기준 이상일 때 표시
		},
		{
			id: 3,
			name: "이철수",
			warnings: 7,
			status: "강퇴", // 경고 기준 초과 시 강퇴 상태
		},
	];

	const fetchCrewMember = async() => {
		console.log('머ㅏ스터ㅡ ',typeof(crewId))
		const res = await getCrewMember(crewId,null)
		console.log(res)
	}



	useEffect(() => {
		fetchCrewMember()
	}, [crewId]);

	const handleWarning = (id) => {
		const selectedMember = members.find((member) => member.id === id);
		//낙관적 ui 업데이트 후, 서버에 경고 api 요청 후, 에러시 롤백

		if (selectedMember.warnings < 3) {
			const updateMember = members.map((member) =>
				member.id === id
					? { ...member, warnings: member.warnings + 1 }
					: member,
			);
			setMembers(updateMember);
			if ((selectedMember.warnings = 3)) {
				setIsOut(true);
			}
		}

		//서버로 경고 요청
		//에러시  member.id === id ? { ...member, warnings: member.warnings - 1 } : member
	};

	return (
		<>
			<div className="">
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
					<div className="flex-1 text-center px-2">상태</div>
				</div>

				{members.map((items) => (
					<div className="flex items-center justify-between   text-white p-4 rounded-md bg-gray-800 mb-2">
						<div className="flex-1 text-center border-r border-white px-2">
							{items.name}
						</div>
						<div className="flex-1 text-center border-r border-white px-2">
							{items.warnings} / 3
						</div>
						<div className="flex-1 text-center border-r border-white px-2">
							<Button
								type="button"
								theme="primary"
								onClick={() => handleWarning(itmes.id)}
							>
								경고
							</Button>
						</div>
						<div className="flex-1 text-center border-r border-white px-2">
							{isout ? (
								<Button type="button" theme="primary">
									강퇴
								</Button>
							) : (
								<Button type="button" theme="dark">
									비활성
								</Button>
							)}
						</div>
						<div className="flex-1 text-center px-2">{items.status}</div>
					</div>
				))}
			</div>
		</>
	);
};

export default CrewManger;
