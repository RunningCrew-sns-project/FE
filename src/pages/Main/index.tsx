import SlickSlider from "../../components/Slider/slider";
import todayRun from "../../assets/mianBanner1_bg.jpg";
import withTogeter from "../../assets/mianBanner2_bg.jpg";
import joinCrew from "../../assets/mianBanner3_bg.jpg";
import ChatListIcon from "./chatlistIcon";
import MainBanner from "./mainbanner";
import { useDevice } from "../../hook/usedevice";

const MainPage = () => {
	const {isMobile, isTablet } = useDevice()
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
				<div className={`${isMobile || isTablet ? ' right-[40px]' : 'right-[160px]'} fixed bottom-[140px]`}>
					<ChatListIcon />
				</div>
			</div>
		</>
	);
};

export default MainPage;
