

import { useMediaQuery } from "react-responsive"

interface DeviceTypes {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
}


export const useDevice = () : DeviceTypes => {

  const isMobile = useMediaQuery({
    query :"(max-width: 640px)"
  })
  const isTablet = useMediaQuery({
    query: '(min-width: 640px) and (max-width: 1023px)' // 태블릿은 640px 이상 1023px 이하
  })

  const isLaptop = useMediaQuery({
    query: '(min-width: 1024px) and (max-width: 1279px)' // 랩탑은 1024px 이상 1279px 이하
  })

  const isDesktop = useMediaQuery({
    query: '(min-width: 1280px)' // 데스크탑은 1280px 이상
  })

  return {isMobile, isTablet, isLaptop, isDesktop}
}