import { useEffect } from "react";
import SlickSlider from "../../components/Slider/slider";
import { useDevice } from "../../hook/usedevice";

const MyCrewList = ({ mycrew, handleDetailCrew }) => {
	const { isDesktop } = useDevice();

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		fade: false,
		arrows: false,
		autoplay: true,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					slidesToShow: 4.5,
				},
			},
			{
				breakpoint: 670,
				settings: {
					slidesToShow: 3.5,
				},
			},
			{
				breakpoint: 570,
				settings: {
					slidesToShow: 2.2,
				},
			},
			{
				breakpoint: 435,
				settings: {
					slidesToShow: 2.2,
				},
			},
		],
	};

	return (
		<>
			<h3 className="text-white mb-4">내가 가입한 크루 </h3>
			<SlickSlider settings={sliderSettings} className="flex">
				{mycrew.map((item) => (
					<div
						className="flex justify-center mx-2  desktop:mr-28 "
						key={item.id}
						onClick={() => handleDetailCrew(item.id)}
					>
						<div className="relative text-center cursor-pointer">
							<img
								src={item.imageUrl}
								alt="이미지"
								className="w-[100px] h-[100px]  rounded-full desktop:w-[160px]  desktop:h-[160px]  object-cover"
							/>
							<p className="absolute inset-0 flex items-center justify-center text-white  text-xs font-semibold bg-black bg-opacity-50 rounded-full">
								{item.name}
							</p>
						</div>
					</div>
				))}
			</SlickSlider>
		</>
	);
};

export default MyCrewList;
