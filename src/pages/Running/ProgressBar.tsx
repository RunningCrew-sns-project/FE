import { useState } from "react";

import { CircularProgressbar,  buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


interface ProgressBarProps {
	start: () => void;
	pause: () => void;
	progress: number;

}

const ProgressBar = ({ start, pause,  progress  }: ProgressBarProps) => {
	const [isStart, setIsStart] = useState(false);



	const handleTimer = () => {
		if (!isStart) {
			start();
		} else {
			pause()
		}
		setIsStart(!isStart);
	};

	return (
		<>
			<div
				className="bg-primary rounded-full w-[80px] h-[80px] cursor-pointer font-black"
				onClick={handleTimer}
			>
				<CircularProgressbar
					value={ progress}
					text={isStart ? `${progress}%` : "▶"}
					styles={buildStyles({
						textColor: "black",
						pathColor: "black",
						trailColor: "white",
						textSize: "20px"
					})}
				/>
			</div>
		</>
	);
};

export default ProgressBar;
