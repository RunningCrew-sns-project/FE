import { format } from "date-fns";

export const dateFormatter = (selectDate : Date | string) => {
  // selectDate가 빈 문자열인지 확인
  if (!selectDate) {
    return {
      date: "",  // 빈 문자열로 반환
      startTime: ""
    };
  }

  // selectDate가 정상적인 값일 경우 처리
  const date = format(selectDate, "yyyy-MM-dd");
  const time = format(selectDate, "HH:mm:ss");


  return {
    date: date,
    startTime: time
  };
};