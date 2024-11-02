interface Item {
  id: string;
  image: string;
  title: string;
  location: string;
  status: "모집중" | "진행중" | "완료";
  maximumPeople: number;
  people: number;
}

interface CrewTeamList {
  data: {
      page: number;
      hasMore: boolean;
      items: Item[];
  };
}





export const CrewTeamList:CrewTeamList = {
  data: {
    page: 1,
    hasMore: true,
    items: [
      {
        id: "6e7f3c48-8834-4f73-8eec-9e1d4d202ec7",
        image: "https://example.com/image1.jpg",
        title: "런닝 클럽 모집",
        location: "서울",
        status: "모집중",
        maximumPeople: 20,
        people: 5
      },
      {
        id: "f2b3e2bc-2904-4e76-8af3-63d7757e58c5",
        image: "https://example.com/image2.jpg",
        title: "한강에서의 조깅",
        location: "한강",
        status: "진행중",
        maximumPeople: 15,
        people: 15
      },
      {
        id: "3a5f5684-d5b1-4d62-a57f-06761c491aa5",
        image: "https://example.com/image3.jpg",
        title: "마라톤 준비 모임",
        location: "부산",
        status: "완료",
        maximumPeople: 30,
        people: 30
      },
      {
        id: "9bc20634-9450-4a02-a8f1-27a0c0f37f9c",
        image: "https://example.com/image4.jpg",
        title: "주말 러닝",
        location: "서울숲",
        status: "모집중",
        maximumPeople: 10,
        people: 3
      },
      {
        id: "d9b488c8-67db-4e8c-94e8-150a933f4794",
        image: "https://example.com/image5.jpg",
        title: "새벽 러닝 모임",
        location: "남산",
        status: "진행중",
        maximumPeople: 12,
        people: 10
      },
      {
        id: "c8d07a87-30d4-4879-9c3f-e74657481e3e",
        image: "https://example.com/image6.jpg",
        title: "여름 캠프 러닝",
        location: "제주도",
        status: "모집중",
        maximumPeople: 25,
        people: 15
      },
      {
        id: "4e6c68e8-8c64-4b91-bc77-16dbb2a1642e",
        image: "https://example.com/image7.jpg",
        title: "가을철 산책",
        location: "경기",
        status: "완료",
        maximumPeople: 20,
        people: 20
      },
      {
        id: "587eae90-59c4-4e63-a353-d07d3ebc18b6",
        image: "https://example.com/image8.jpg",
        title: "야간 러닝",
        location: "서울",
        status: "진행중",
        maximumPeople: 10,
        people: 5
      },
      {
        id: "c3f51176-f5c8-4e3c-96e7-37c13ee5f4bc",
        image: "https://example.com/image9.jpg",
        title: "마라톤 대회",
        location: "광주",
        status: "모집중",
        maximumPeople: 50,
        people: 25
      },
      {
        id: "9d490e35-32fc-4a58-bd62-7a745e0f5c30",
        image: "https://example.com/image10.jpg",
        title: "크로스핏 러닝",
        location: "인천",
        status: "완료",
        maximumPeople: 15,
        people: 15
      },
      {
        id: "de2e6207-8c89-4fc9-b4f1-df9537f2c1a0",
        image: "https://example.com/image11.jpg",
        title: "해변 러닝",
        location: "부산",
        status: "진행중",
        maximumPeople: 20,
        people: 18
      },
      {
        id: "66c9e67c-baf0-49f3-b953-f42977e6c43f",
        image: "https://example.com/image12.jpg",
        title: "주말 하이킹",
        location: "양평",
        status: "모집중",
        maximumPeople: 10,
        people: 5
      },
      {
        id: "7c8fef9f-5806-4e14-9e56-5a55b12c2e71",
        image: "https://example.com/image13.jpg",
        title: "도시 탐험 러닝",
        location: "서울",
        status: "완료",
        maximumPeople: 30,
        people: 30
      },
      {
        id: "2af4819c-e7a0-41cb-927e-c0c7c93eaa2e",
        image: "https://example.com/image14.jpg",
        title: "마라톤 훈련",
        location: "대전",
        status: "진행중",
        maximumPeople: 12,
        people: 10
      },
      {
        id: "a09bcd51-6530-42f6-b8f0-2b9db90f1b4b",
        image: "https://example.com/image15.jpg",
        title: "눈밭 러닝",
        location: "강원도",
        status: "모집중",
        maximumPeople: 15,
        people: 0
      }
    ]
  }
}
