import { useEffect } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { LocationDataProps } from "../../pages/Run/create/createRun";

interface MapPageProps {
  setLocationData: React.Dispatch<React.SetStateAction<LocationDataProps>>;
  locationData: LocationDataProps;
  keyword: string;   // 출발지 키워드
  keyword2: string;  // 도착지 키워드
}

const MapPage = ({ setLocationData, keyword, locationData, keyword2 }: MapPageProps) => {

  useEffect(() => {
    const places = new window.kakao.maps.services.Places();

    // 출발지 키워드 검색
    if (keyword) {
      places.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
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

    // 도착지 키워드 검색
    if (keyword2) {
      places.keywordSearch(keyword2, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
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
  }, [keyword, keyword2]); // 두 키워드를 의존성 배열에 포함

  return (
    <Map
      center={
        locationData.startCoordinates || locationData.endCoordinates || { lat: 33.5563, lng: 126.79581 }
      }
      style={{ width: "100%", height: "360px" }}
      level={3}
    >
      {locationData.startCoordinates && (
        <MapMarker position={locationData.startCoordinates}>
          <div style={{ color: "#000" }}>출발지: {locationData.startAddress}</div>
        </MapMarker>
      )}
      {locationData.endCoordinates && (
        <MapMarker position={locationData.endCoordinates}>
          <div style={{ color: "#000" }}>도착지: {locationData.endAddress}</div>
        </MapMarker>
      )}
    </Map>
  );
};

export default MapPage;
