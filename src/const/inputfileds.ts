export const fields = [
  {
    type: "text",
    name: "title",
    label: "제목",
    required: true,
    placeholder: "제목을 입력해주세요",
  },
  {
    type: "text",
    name: "description",
    label: "소개글",
    required: true,
    placeholder: "소개글을 입력해주세요",
  },
  {
    type: "select",
    name: "area",
    label: "지역",
    required: true,
    placeholder: "지역선택",
  },
  {
    type: "number",
    name: "maxpeople",
    label: "최대인원수",
    placeholder: "최대 인원수를 선택",
  },
];
