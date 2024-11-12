import { useLocation } from "react-router-dom";
import { BANNER_KEY, BannerData } from "../const/banner";
import { useEffect, useState } from "react";

const useBanner = () => {
  const location = useLocation();
  const [banner, setBanner] = useState<BannerData | null>(null);

  useEffect(() => {
    const path = location.pathname;

    // 특정 경로 패턴에 맞춰 배너를 설정
    if (path.startsWith('/running')) {
      setBanner(BANNER_KEY['/running']);
    } else if (path.startsWith('/create/crewRun')) {
      setBanner(BANNER_KEY['/create/crewRun:selectedCrewId']);
    } else if (path.startsWith('/chat/')) {
      setBanner(BANNER_KEY['/chat/:id']);
    } else {
      setBanner(BANNER_KEY[path] || null);
    }
  }, [location.pathname]);

  return banner;
};

export default useBanner;
