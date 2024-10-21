import SlickSlider from "../../components/Slider/slider";
import todayRun from '../../assets/mianBanner1_bg.jpg';
import withTogeter from '../../assets/mianBanner2_bg.jpg';
import joinCrew from '../../assets/mianBanner3_bg.jpg';
import MainBanner from "./mainbanner";
import {  useState } from "react";



const MainPage = () => {

  const [state, setState] = useState('')

  // const getState = () => {
  //   try {
  //     // axios 요청 
  //   } catch (error) {
      
  //   }
  // }

  // useEffect(()=>{

  // },[])

  const slidesData = [
    { id: 1, bgimg: todayRun, subTitle : 'TODAY' , title : 'RUNNING SCHEDULE', btn : '시작하기'},
    { id: 2, bgimg: joinCrew, subTitle : 'CREW', title : 'JOIN THE CREW', btn : '등록하기'},
    { id: 3, bgimg: withTogeter, subTitle : 'SCHEDULE', title : 'RUNNING TOGETHER', btn : '등록하기'},
  ];

  return (
    <>
      <SlickSlider>
        {slidesData.map(slide => (
          <div key={slide.id}>
            <MainBanner slide={slide} state={state}/>
          </div>
        ))}
      </SlickSlider>
    </>
  );
};

export default MainPage;

