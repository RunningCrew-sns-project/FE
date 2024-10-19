import { useDevice } from "../../hook/useDevice";

const MainPage = () => {
  const { isMobile, isTablet, isTabletAndLaptop, isDesktop } = useDevice();

  return (
    <>
      {isMobile && (
        <div className="bg-blue-500 p-4">
          <h1 className="text-white">모바일 뷰입니다</h1>
        </div>
      )}
      {isTablet && (
        <div className="bg-green-500 p-4">
          <h1 className="text-white">태블릿 뷰입니다</h1>
        </div>
      )}
      {isTabletAndLaptop && (
        <div className="bg-yellow-500 p-4">
          <h1 className="text-black">노트북 뷰입니다</h1>
        </div>
      )}
      {isDesktop && (
        <div className="bg-red-500 p-4">
          <h1 className="text-white">데스크탑 뷰입니다</h1>
        </div>
      )}
    </>
  );
};

export default MainPage;

