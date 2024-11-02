interface Crew {
  id: string;         // 크루 고유 ID (UUID 형식)
  name: string;       // 크루 이름
  imageUrl: string;   // 크루 이미지 URL
}

interface CrewListResponse {
  data: Crew[];        // 크루 배열 데이터
}


export const MY_CREWLIST : CrewListResponse = {
  data: [
    {
      id: "1c6e7b54-06a9-4a3d-b7b2-bc1dbba4e543",
      name: "갓 생을 위한 오늘의 러닝",
      imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "2f6c8a88-8a41-4b61-9b9f-6c1f6d528b11",
      name: "아침 러닝 모임",
      imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "7a3f7b58-0293-4ecf-bf8a-1df028d6b111",
      name: "저녁 운동 클럽",
      imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "9c5f7a01-8d6c-4b0a-80d9-2a5d4c7db877",
      name: "야간 산책 동아리",
      imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: "5d6f8b67-0a81-46de-9a3c-4e1f1b6e5678",
      name: "헬스 마니아 모임",
      imageUrl: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]
} 