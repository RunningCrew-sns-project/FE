import { useRef, useState } from "react";

const useStopWatch = () => {
	const [time, setTime] = useState<number>(0);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const timer = useRef<number | null>(null);

	const start = () => {
		if (!isRunning) {
			setIsRunning(true);
			timer.current = setInterval(() => {
				setTime((pre) => pre + 1);
			}, 1000);
		}
	};

	const pause = () => {
		if (isRunning) {
			setIsRunning(false);
			if (timer.current !== null) {
				clearInterval(timer.current);
				timer.current = null;
			}
		}
	};

	const stop = () => {
		if (isRunning) {
			setIsRunning(false);
			if (timer.current !== null) {
				clearInterval(timer.current);
				timer.current = null;
			}
		}
		setTime(0); // 타이머 초기화
	};
	const formatTime = (time : number) => {
		const hours = Math.floor((time / 60 / 60) % 24);
		const minutes = Math.floor((time / 60) % 60);
		const seconds = Math.floor(time % 60);

		const formattedHours = hours < 10 ? `0${hours}` : hours;
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
		const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	};

	return { start, stop, formatTime, time ,pause };
};

export default useStopWatch;
