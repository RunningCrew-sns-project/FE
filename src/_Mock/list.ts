interface RunProps {
  title: string;        // 모임 제목, 문자열 타입
  location: string;     // 모임 장소, 문자열 타입
  date: string;         // 모임 날짜, 문자열 타입 (YYYY-MM-DD 형식)
  startTime: string;    // 모임 시작 시간, 문자열 타입 (HH:mm 형식)
  banner: string;       // 배너 이미지 URL, 문자열 타입
  people: number;       // 현재 참여 인원, 숫자 타입
  maximumPeople: number;// 최대 참여 인원, 숫자 타입
  status: "시작전" | "진행중" | "완료";  // 모임 상태, 특정한 문자열 중 하나 (시작전, 진행중, 완료)
}


export const runData: RunProps[] = [
  {
    title: "새벽 달리기 모임",
    location: "서울 한강공원",
    date: "2024-11-01",
    startTime: "06:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 10,
    maximumPeople: 15,
    status: "진행중",
  },
  {
    title: "도심 속 야간 달리기",
    location: "부산 광안리 해변",
    date: "2024-11-05",
    startTime: "21:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 8,
    maximumPeople: 10,
    status: "시작전",
  },
  {
    title: "주말 러닝 클럽",
    location: "인천 송도 센트럴파크",
    date: "2024-11-02",
    startTime: "08:30",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 15,
    maximumPeople: 20,
    status: "완료",
  },
  {
    title: "청계천 주말 러너즈",
    location: "서울 청계천",
    date: "2024-11-04",
    startTime: "07:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 20,
    maximumPeople: 25,
    status: "진행중",
  },
  {
    title: "아침을 여는 한강 러닝",
    location: "서울 뚝섬유원지",
    date: "2024-11-06",
    startTime: "06:30",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 12,
    maximumPeople: 20,
    status: "시작전",
  },
  {
    title: "강남 러닝 크루",
    location: "서울 강남역",
    date: "2024-11-03",
    startTime: "19:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 5,
    maximumPeople: 10,
    status: "완료",
  },
  {
    title: "해질녘 러닝",
    location: "대구 두류공원",
    date: "2024-11-07",
    startTime: "18:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 7,
    maximumPeople: 12,
    status: "진행중",
  },
  {
    title: "주말 야외 러닝",
    location: "대전 엑스포공원",
    date: "2024-11-08",
    startTime: "10:00",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 18,
    maximumPeople: 20,
    status: "시작전",
  },
  {
    title: "강원도 힐링 러닝",
    location: "강원도 춘천시 공지천",
    date: "2024-11-09",
    startTime: "07:30",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 10,
    maximumPeople: 15,
    status: "진행중",
  },
  {
    title: "도시 공원 아침 러닝",
    location: "서울 올림픽공원",
    date: "2024-11-10",
    startTime: "06:45",
    banner: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    people: 16,
    maximumPeople: 20,
    status: "완료",
  },
];
