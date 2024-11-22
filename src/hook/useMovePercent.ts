import { useEffect, useState } from "react";
import { calculateDistance } from "../util/calculateDistance";
import { LocationData } from "../pages/Running/RunningContent";

interface CurrentLocation {
  latitude: number | null;
  longitude: number | null;
}



const useMovePercent = (locationData : LocationData) => {
	console.log(locationData ,' 표시해라 ' )
	//총거리
	const totalDistance = locationData.distance ?? 0; 
	// 진행율
	const [progress, setProgress] = useState(0);
	//현재위치
	const [currentlocation, setCurrentLocation] = useState<CurrentLocation>({
		latitude: null,
		longitude: null,
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
				console.log(currentDistance, '현재거리')
				console.log(totalDistance, '총거리')
				const percentage = Math.min(
					Math.round((currentDistance   / totalDistance)) / 10,  
					100
				);
				setProgress(percentage);
				console.log("진행 비율:", percentage);
			},
			(error) => console.error(error),
			{ enableHighAccuracy: true },
		);

		return () => navigator.geolocation.clearWatch(watchId);
	}, []); // 빈 배열 의존성으로 한 번만 실행

	return { progress, currentlocation };
};

export default useMovePercent;
