import { useEffect, useState } from "react";
import { calculateDistance } from "../util/calculateDistance";

const useMovePercent = () => {
	//총거리
	const totalDistance = 454.22;
	// 진행율
	const [progress, setProgress] = useState(0);
	//현재위치
	const [currentlocation, setCurrentLocation] = useState({
		latitude: null,
		longitude: null,
	});

	const locationData = {
		startCoordinates: { lat: 37.6428999322418, lng: 127.009680856107 },
		endCoordinates: { lat: 37.63887785974017, lng: 127.01058220054608 },
		startAddress: "서울인수초등학교",
		endAddress: "국립재활원",
	};

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
				const percentage = Math.min(
					Math.round((currentDistance / totalDistance) * 100),
					100,
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
