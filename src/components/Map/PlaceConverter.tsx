import { useEffect } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationDataProps {
  startCoordinates: Coordinates | null;
  endCoordinates: Coordinates | null;
  startAddress: string;
  endAddress: string;
}

interface PlaceConverterProps {
  locationData: LocationDataProps;
  setLocationData: React.Dispatch<React.SetStateAction<LocationDataProps>>;
}

const PlaceConverter = ({ locationData, setLocationData }: PlaceConverterProps) => {

  const { startAddress, endAddress } = locationData;

  useEffect(() => {
    const places = new window.kakao.maps.services.Places();

    // 출발지 좌표 찾기
    if (startAddress) {
      places.keywordSearch(startAddress, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
          const { y, x, place_name } = data[0]; // 첫 번째 결과만 사용
          const newCoordinates = { lat: parseFloat(y), lng: parseFloat(x) };

          setLocationData((prev) => ({
            ...prev,
            startCoordinates: newCoordinates,
            startAddress: place_name, // 여기서 place_name을 주소로 사용
          }));
        } else {
          console.error("출발지 주소를 찾을 수 없습니다.");
        }
      });
    }

    // 도착지 좌표 찾기
    if (endAddress) {
      places.keywordSearch(endAddress, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
          const { y, x, place_name } = data[0]; // 첫 번째 결과만 사용
          const newCoordinates2 = { lat: parseFloat(y), lng: parseFloat(x) };

          setLocationData((prev) => ({
            ...prev,
            endCoordinates: newCoordinates2,
            endAddress: place_name, // 여기서 place_name을 주소로 사용
          }));
        } else {
          console.error("도착지 주소를 찾을 수 없습니다.");
        }
      });
    }
  }, [startAddress, endAddress]); // startAddress와 endAddress만 의존성 배열에 추가




  return null;
};

export default PlaceConverter;
