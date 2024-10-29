import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface SlideProps {
	id: number;
	bgimg: string;
	subTitle: string;
	title: string;
	btn: string;
}

interface Props {
	slide: SlideProps;
	state: string;
}

const MainBanner = ({ slide, state }: Props) => {
	const navigate = useNavigate();

	const handleMoveBtn = () => {
		switch (slide.subTitle) {
			case "SCHEDULE":
				navigate("/create/run");
				break;
			case "CREW":
				navigate("/create/crew");
				break;
			case "TODAY":
				navigate("/running");
				break;
			default:
				navigate("/");
				break;
		}
	};

	return (
		<>
			<div className="relative  h-screen flex items-center  justify-start">
				{/* 배경이미지 */}
				<img
					src={slide.bgimg}
					alt="배경이미지 "
					className="inset-0 w-full h-full object-cover  object-center object-right-bottom tablet:object-cover laptop:object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />

				{/* 타이틀 */}
				<div className="absolute  text-white ml-8  tablet:ml-16 laptop:ml-36 desktop:ml-36 ">
					<span className="text-base">{slide.subTitle}</span>
					<h1 className="font-kbo text-4xl  w-64  laptop:w-auto desktop: w-auto laptop:text-6xl desktop:text-6xl mb-4 mt-4">
						{slide.title}
					</h1>
					{state === "running" && slide.btn === "시작하기" ? (
						<div className="relative flex items-center mt-8">
							<span className="bg-white text-black px-4 py-2 rounded-xl">
								타이틀제목 인원수
							</span>
							<Button
								type="button"
								theme="primary"
								className="absolute left-36"
								onClick={handleMoveBtn}
							>
								시작하기
							</Button>
						</div>
					) : (
						<Button
							type="button"
							theme="primary"
							className="text-lg font-pre900"
							onClick={handleMoveBtn}
						>
							{slide.btn}
						</Button>
					)}
				</div>
			</div>
		</>
	);
};

export default MainBanner;
