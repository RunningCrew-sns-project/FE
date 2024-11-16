export const fields = [
  {
    type: "text",
    name: "crewName",
    label: "크루명",
    required: true,
    placeholder: "크루명을 입력해주세요",
  },
  {
    type: "text",
    name: "crewIntroduction",
    label: "소개글",
    required: true,
    placeholder: "소개글을 입력해주세요",
  },
  {
    type: "select",
    name: "activityRegion",
    label: "지역",
    required: true,
    placeholder: "지역선택",
  },
  {
    type: "number",
    name: "maxCapacity",
    label: "최대인원수",
    placeholder: "최대 인원수를 선택",
  },
];
