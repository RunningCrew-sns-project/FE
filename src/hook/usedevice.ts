

import { useMediaQuery } from "react-responsive"


export const useDevice = () => {

  const isMobile = useMediaQuery({
    query :"(max-width: 640px)"
  })
  const isTablet = useMediaQuery({
    query : '(min-width: 640px) and (max-width: 1024px)',
  })
  const isTabletAndLaptop = useMediaQuery({
    query : '(min-width: 1024px) and (max-width: 1280px)',
  })
  const isDesktop = useMediaQuery({
    query : '(min-width: 1280px)'
  })

  return {isMobile, isTablet, isTabletAndLaptop, isDesktop}
}