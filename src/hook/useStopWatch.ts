import { useEffect, useRef, useState } from "react";

const useStopWatch = () => {
  // 로컬 스토리지에서 `time` 값을 불러오고, 기본값은 0
  const [time, setTime] = useState<number>(parseInt(localStorage.getItem('time') || '0'));
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // 타이머 시작
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      timer.current = setInterval(() => {
        setTime((prev) => prev + 1);  // time을 1씩 증가시킴
      }, 1000);
    }
  };

  // 타이머 일시 정지
  const pause = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
  };

  // 타이머 리셋
  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timer.current !== null) {
        clearInterval(timer.current);
        timer.current = null;
      }
    }
    setTime(0);  // 타이머 초기화
  };

  // 시간을 `HH:mm:ss` 형식으로 포맷
  const formatTime = (time: number) => {
    const hours = Math.floor((time / 60 / 60) % 24);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = Math.floor(time % 60);

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  // `time`이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('time', String(time));  // time 값을 로컬 스토리지에 저장
  }, [time]);  // `time`이 변경될 때마다 실행

  return { start, stop, formatTime, time, pause };
};

export default useStopWatch;
