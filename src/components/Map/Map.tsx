import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { LocationDataProps } from "../../pages/Run/create/createRun";

interface MapPageProps {
  setLocationData: React.Dispatch<React.SetStateAction<LocationDataProps>>;
  locationData: LocationDataProps;
  keyword: string;
}

const MapPage = ({ setLocationData, keyword, locationData }: MapPageProps) => {
  const [step, setStep] = useState(1); // 검색 단계: 1 = 출발지, 2 = 도착지

  useEffect(() => {
    if (keyword) {
      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { y, x, place_name } = data[0]; // 첫 번째 결과만 사용
          const newCoordinates = { lat: parseFloat(y), lng: parseFloat(x) };

          setLocationData((prev) => {
            if (step === 1) {
              return {
                ...prev,
                startCoordinates: newCoordinates,
                startAddress: place_name, // 여기서 place_name을 주소로 사용
              };
            } else {
              return {
                ...prev,
                endCoordinates: newCoordinates,
                endAddress: place_name,
              };
            }
          });

          // 다음 검색을 위해 단계 증가
          setStep((prevStep) => (prevStep === 1 ? 2 : 1));
        } else {
          console.error("주소를 찾을 수 없습니다.");
        }
      });
    }
  }, [keyword]);

  return (
    <Map
      center={
        step === 1
          ? locationData.startCoordinates || { lat: 33.5563, lng: 126.79581 }
          : locationData.endCoordinates || { lat: 33.5563, lng: 126.79581 }
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
