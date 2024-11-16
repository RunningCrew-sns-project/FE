import SlickSlider from "../../components/Slider/slider";



// 각 크루의 정보 타입 정의
interface Crew {
  crewId: string;
  crewImageUrl: string;
  crewName: string;
  crewMaster: boolean;
}

// MyCrewList의 props 타입 정의
interface MyCrewListProps {
  mycrew: Crew[]; // mycrew는 Crew 객체 배열
  handleDetailCrew: (crewId: string, crewMaster: boolean) => void; // handleDetailCrew는 crewId와 crewMaster를 받는 함수
}

const MyCrewList = ({ mycrew, handleDetailCrew }: MyCrewListProps) => {
  const isSliderActive = mycrew.length >= 5; // 크루가 5개 이상일 경우만 슬라이더가 활성화됨

  // 슬라이더 설정
  const sliderSettings = {
    dots: false,
    infinite: isSliderActive, // 5개 이상일 때만 슬라이더가 무한 반복
    speed: 500,
    slidesToShow: isSliderActive ? 5 : mycrew.length, // 크루가 5개 이상일 때는 5개씩 보여주고, 미만일 경우 크루 수대로 표시
    slidesToScroll: 1,
    fade: false,
    arrows: false,
    autoplay: isSliderActive, // 5개 이상일 때만 autoplay 활성화
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: isSliderActive ? 4.5 : mycrew.length, // 반응형에서 크루가 5개 이상일 때만 슬라이드
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: isSliderActive ? 3.5 : mycrew.length,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: isSliderActive ? 2.2 : mycrew.length,
        },
      },
      {
        breakpoint: 435,
        settings: {
          slidesToShow: isSliderActive ? 2.2 : mycrew.length,
        },
      },
    ],
  };

  return (
    <>
      <h3 className="text-white mb-4">내가 가입한 크루</h3>
      {/* 슬라이더 활성화 여부를 체크하여 조건부로 렌더링 */}
      {isSliderActive ? (
        <SlickSlider settings={sliderSettings} className="flex">
          {mycrew.map((crew) => (
            <div
              className="flex justify-center mx-2 desktop:mr-28"
              key={crew.crewId}
              onClick={() => handleDetailCrew(crew.crewId, crew.crewMaster)}
            >
              <div className="relative text-center cursor-pointer">
                <img
                  src={crew.crewImageUrl}
                  alt="이미지"
                  className="w-[100px] h-[100px] rounded-full desktop:w-[160px] desktop:h-[160px] object-cover"
                />
                <p className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold bg-black bg-opacity-50 rounded-full">
                  {crew.crewName}
                </p>
              </div>
            </div>
          ))}
        </SlickSlider>
      ) : (
        <div className="flex justify-start">
          {mycrew.map((crew) => (
            <div
              className="relative text-center cursor-pointer mx-2"
              key={crew.crewId}
              onClick={() => handleDetailCrew(crew.crewId, crew.crewMaster)}
            >
              <img
                src={crew.crewImageUrl}
                alt="이미지"
                className="w-[100px] h-[100px] rounded-full desktop:w-[160px] desktop:h-[160px] object-cover"
              />
              <p className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold bg-black bg-opacity-50 rounded-full">
                {crew.crewName}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyCrewList;
