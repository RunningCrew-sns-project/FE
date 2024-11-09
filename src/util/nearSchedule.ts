export const naearSchedule = (scheduleData) => {
  console.log(scheduleData)
  if (!scheduleData || scheduleData.length === 0) return { nearest: null, remaining: [] };

  const now = new Date();

  // 스케줄 중에서 가장 임박한 일정을 찾기
  let nearest = scheduleData[0];
  let minTimeDiff = Math.abs(new Date(nearest.time) - now);
  console.log('민',minTimeDiff)

  scheduleData.forEach((schedule) => {
    const timeDiff = Math.abs(new Date(schedule.time) - now);
    if (timeDiff < minTimeDiff) {
      nearest = schedule;
      minTimeDiff = timeDiff;
    }
  });

  console.log('임박한', nearest)
  // 가장 임박한 일정을 제외한 나머지 일정을 필터링
  const remaining = scheduleData.filter((schedule) => schedule.id !== nearest.id);
  console.log('제외한', remaining)
  return { nearest, remaining };
};
