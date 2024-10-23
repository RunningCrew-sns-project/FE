import { useLocation } from "react-router-dom";
import { BANNER_KEY, BannerData } from "../const/banner";
import { useEffect, useState } from "react";


const useBanner = () => {
  const location = useLocation();
  const [banner, setBanner] = useState<BannerData | null>(null); // 초기값을 null로 설정

  useEffect(() => {
    const newBanner = BANNER_KEY[location.pathname] || null; // 경로에 맞는 배너 설정
    setBanner(newBanner);
  }, [location.pathname])

  return banner
}

export default useBanner