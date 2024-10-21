import React from 'react'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// 나중에 dot 커스텀 해보기 

interface slideSetting  {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean; 
  autoplaySpeed?: number; 
  fade: boolean;
}

interface slideProps {
  settings?: slideSetting; 
  className?: string;
  children: React.ReactNode;
}



const SlickSlider = ({children, settings,  className = '' }: slideProps ) => {

  const defaultSetting : slideSetting = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
    ...settings
  }
  return(
      <Slider {...defaultSetting}>
        {React.Children.map(children, (child) => (
          <div className={className}>
            {child} 
          </div>
        ))}
    </Slider>
  )
}

export default SlickSlider