import { useState } from "react";

interface ProgressBarProps {
  start: () => void;
  stop: () => void;
}



const ProgressBar = ({ start, stop }:ProgressBarProps) => {

  const [isStart, setIsStart] = useState(false)

  const handleTimer = () => {
    if(!isStart){
      start()
    }else{
      stop()
    }
    setIsStart(!isStart);
  }

	return (
		<>
			<div className="bg-black text-white w-[40px] h-[40px] cursor-pointer"
        onClick={handleTimer}
        >
          {!isStart ?  '시작'  : '정지 '}
			</div>
		</>
	);
};

export default ProgressBar;
