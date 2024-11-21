export interface Schedule {
  id: number;
  isCrew: boolean;
  startDate: string; // ISO 형식의 날짜 문자열
  title: string;
}



export const naearSchedule = (scheduleData: Schedule[]) => {

  if (!scheduleData || scheduleData.length === 0) return { nearest: {}, remaining: [] };

  const now = new Date();

  // 스케줄 중에서 가장 임박한 일정을 찾기
  let nearest = scheduleData[0];
  let minTimeDiff = Math.abs(new Date(nearest.startDate).getTime() - now.getTime()); // .getTime() 사용


  scheduleData.forEach((schedule) => {
    const scheduleTime = new Date(schedule.startDate).getTime(); // .getTime()으로 명시적 변환
    const timeDiff = Math.abs(scheduleTime - now.getTime());
    if (timeDiff < minTimeDiff) {
      nearest = schedule;
      minTimeDiff = timeDiff;
    }
  });


  // 가장 임박한 일정을 제외한 나머지 일정을 필터링
  const remaining = scheduleData.filter((schedule) => schedule.id !== nearest.id);
  return { nearest, remaining };
};
