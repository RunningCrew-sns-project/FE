import { useEffect, useState } from "react";
import { calculateDistance } from "../util/calculateDistance";
import { LocationData } from "../pages/Running/RunningContent";

interface CurrentLocation {
  latitude: number | null;
  longitude: number | null;
}

const useMovePercent = (locationData: LocationData) => {
  // 총거리
  const totalDistance = locationData.distance ?? 0;
  // 진행율
  const [progress, setProgress] = useState<number>(() => {
    // localStorage에서 진행률을 불러오기 (초기값은 0)
    const savedProgress = localStorage.getItem("progress");
    return savedProgress ? parseFloat(savedProgress) : 0;
  });
  // 현재위치
  const [currentlocation, setCurrentLocation] = useState<CurrentLocation>(() => {
    // localStorage에서 현재 위치를 불러오기 (초기값은 null)
    const savedLocation = localStorage.getItem("currentLocation");
    return savedLocation ? JSON.parse(savedLocation) : { latitude: null, longitude: null };
  });

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        console.log("현재 위치:", { latitude, longitude });

        // 거리 계산 및 진행률 업데이트
        const currentDistance = calculateDistance(
          locationData.startCoordinates,
          { latitude, longitude },
        );
        console.log(currentDistance, "현재거리");
        console.log(totalDistance, "총거리");

        const percentage = Math.min(
          Math.round((currentDistance / totalDistance) * 100),  // 진행률을 백분율로 계산
          100
        );

        setProgress(percentage);
        console.log("진행 비율:", percentage);

        // 진행률을 로컬 스토리지에 저장
        localStorage.setItem("progress", String(percentage));

        // 현재 위치를 로컬 스토리지에 저장
        localStorage.setItem("currentLocation", JSON.stringify({ latitude, longitude }));
      },
      (error) => console.error(error),
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [locationData.startCoordinates, totalDistance]);

  return { progress, currentlocation };
};

export default useMovePercent;
