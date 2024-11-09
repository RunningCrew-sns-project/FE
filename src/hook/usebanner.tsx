import { useLocation } from "react-router-dom";
import { BANNER_KEY, BannerData } from "../const/banner";
import { useEffect, useState } from "react";

const useBanner = () => {
  const location = useLocation();
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    // `/running`으로 시작하는 경로인지 확인
    const isRunningPath = location.pathname.startsWith('/running');
    const newBanner = isRunningPath ? BANNER_KEY['/running'] : BANNER_KEY[location.pathname] || null;
    setBanner(newBanner);
  }, [location.pathname]);

  return banner;
};

export default useBanner;
