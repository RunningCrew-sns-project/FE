import { useState } from "react";
import { LOCATION, LocationData } from "../../const/location";
import Button from "../Button";
import { useDevice } from "../../hook/usedevice";
import SlickSlider from "../Slider/slider";

type LocationFilterProps = {
	setArea: (area: string) => void;
};

const LocationFilter = ({ setArea }: LocationFilterProps) => {
	const { isDesktop, isLaptop } = useDevice();
	const [seletArea, setSeletArea] = useState<string | null>('전체');

	const handleClick = (area: string) => {
		setArea(area);
		setSeletArea(area);
	};

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		fade: false,
		arrows: false,
		autoplay: false,
		responsive: [
			{
				breakpoint: 1023, 
				settings: {
					slidesToShow: 5.5, 
				},
			},
			{
				breakpoint: 670, 
				settings: {
					slidesToShow: 4.5, 
				},
			},
			{
				breakpoint: 570, 
				settings: {
					slidesToShow: 3.5, 
				},
			},
			{
				breakpoint: 435, 
				settings: {
					slidesToShow: 2.5, 
				},
			},
		],
	};

	return (
		<div>
			{isDesktop || isLaptop ? (
				<div className="flex flex-wrap gap-2 justify-start" >
					{LOCATION.map((item: LocationData) => (
						<Button
							theme={seletArea === item.area ? "primary" : "light"}
							key={item.id}
							className="text-sm  min-w-[100px] max-w-[150px] "
							onClick={() => handleClick(item.area)}
						>
							{item.area}
						</Button>
					))}
				</div>
			) : (
				<div className="overflow-hidden">
					{" "}
					{/* 슬라이더가 반만 보이도록 설정 */}
					<SlickSlider settings={sliderSettings} className="flex">
						{LOCATION.map((item: LocationData) => (
							<div className="flex justify-center mx-2 pl-28" key={item.id}>
								<Button
									theme={seletArea === item.area ? "primary" : "light"}
									className="text-sm min-w-[100px] max-w-[150px]"
									onClick={() => handleClick(item.area)}
								>
									{item.area}
								</Button>
							</div>
						))}
					</SlickSlider>
				</div>
			)}
		</div>
	);
};

export default LocationFilter;
