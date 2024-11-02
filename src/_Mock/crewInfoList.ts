type PostStatus = "모집중" | "진행중" | "완료";

// 개별 게시글 정보 인터페이스
interface PostItem {
	image: string; // 게시글 이미지 URL
	title: string; // 게시글 제목
	region: string; // 게시글 지역
	date: string; // 약속 날짜
	time: string; // 약속 시간
	status: PostStatus; // 게시글 상태 (모집중, 진행중, 완료)
	maxMember: number; // 최대 인원수
	people: number; // 현재 인원
}

// 크루 기본 정보 인터페이스
interface CrewInfo {
	id: string; // 크루 고유 ID
	name: string; // 크루 이름
	description: string; // 크루 소개글
	imageUrl: string; // 크루 이미지 URL
	memberCount: number; // 현재 인원수
	maxMember: number; // 최대 인원수
	location: string; // 크루 지역
}

// 전체 응답 구조 인터페이스
interface CrewResponse {
	info: CrewInfo; // 크루 기본 정보
	page: number; // 현재 페이지 번호
	hasMore: boolean; // 다음 페이지 존재 여부
	items: PostItem[]; // 게시글 리스트
}

export const CREW_INFOLIST: CrewResponse = {
	info: {
		id: "1c6e7b54-06a9-4a3d-b7b2-bc1dbba4e543",
		name: "갓 생을 위한 오늘의 러닝",
		description: "함께 달리기를 즐기는 모임입니다.",
		imageUrl:
			"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		memberCount: 20,
		maxMember: 30,
		location: "서울숲 공원",
	},
	page: 1,
	hasMore: true,
	items: [
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "오늘 러닝 후기",
			region: "서울숲 공원",
			date: "2024-10-29",
			time: "20:00",
			status: "모집중",
			maxMember: 10,
			people: 7,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "러닝 노하우 공유",
			region: "한강 공원",
			date: "2024-10-28",
			time: "18:30",
			status: "진행중",
			maxMember: 15,
			people: 15,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "야간 러닝 모임 후기",
			region: "올림픽 공원",
			date: "2024-10-27",
			time: "22:00",
			status: "완료",
			maxMember: 12,
			people: 12,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "주말 아침 러닝",
			region: "양재 시민의 숲",
			date: "2024-10-26",
			time: "08:00",
			status: "모집중",
			maxMember: 8,
			people: 5,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "밤 러닝",
			region: "반포 한강공원",
			date: "2024-10-25",
			time: "21:00",
			status: "진행중",
			maxMember: 20,
			people: 18,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "새벽 달리기",
			region: "남산 공원",
			date: "2024-10-24",
			time: "05:30",
			status: "모집중",
			maxMember: 12,
			people: 8,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "강변 러닝",
			region: "뚝섬 유원지",
			date: "2024-10-23",
			time: "19:00",
			status: "완료",
			maxMember: 25,
			people: 25,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "도심 야경 러닝",
			region: "서울숲",
			date: "2024-10-22",
			time: "20:00",
			status: "진행중",
			maxMember: 15,
			people: 10,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "강남 도보 여행",
			region: "압구정 로데오",
			date: "2024-10-21",
			time: "14:00",
			status: "모집중",
			maxMember: 10,
			people: 9,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "러닝을 사랑하는 사람들",
			region: "성수동",
			date: "2024-10-20",
			time: "18:00",
			status: "완료",
			maxMember: 18,
			people: 18,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "금요 밤 러닝",
			region: "광화문 광장",
			date: "2024-10-19",
			time: "21:00",
			status: "진행중",
			maxMember: 20,
			people: 20,
		},
		{
			image:
				"https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			title: "주말 강변 달리기",
			region: "잠실 한강공원",
			date: "2024-10-18",
			time: "09:00",
			status: "모집중",
			maxMember: 30,
			people: 28,
		},
	],
};
