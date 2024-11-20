import SlickSlider from "../../components/Slider/slider";
import todayRun from "../../assets/mianBanner1_bg.jpg";
import withTogeter from "../../assets/mianBanner2_bg.jpg";
import joinCrew from "../../assets/mianBanner3_bg.jpg";

import MainBanner from "./mainbanner";

const MainPage = () => {

	const slidesData = [
		{
			id: 1,
			bgimg: todayRun,
			subTitle: "TODAY",
			title: "RUNNING SCHEDULE",
			btn: "시작하기",
		},
		{
			id: 2,
			bgimg: joinCrew,
			subTitle: "CREW",
			title: "JOIN THE CREW",
			btn: "등록하기",
		},
		{
			id: 3,
			bgimg: withTogeter,
			subTitle: "SCHEDULE",
			title: "RUNNING TOGETHER",
			btn: "등록하기",
		},
	];

	const sliderSettings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: false,
	};

	return (
		<>
			<div className="overflow-x-hidden relative">
				<SlickSlider settings={sliderSettings} className="h-screen">
					{slidesData.map((slide) => (
						<>
							<div key={slide.id}>
								<MainBanner slide={slide} />
							</div>
						</>
					))}
				</SlickSlider>
			</div>
		</>
	);
};

export default MainPage;
