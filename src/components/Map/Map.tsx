import { Map, MapMarker } from "react-kakao-maps-sdk";
import PlaceConverter from "./PlaceConverter";
import React from "react";
import { LocationData } from "../../pages/Running/RunningContent";

interface MapPageProps {
	locationData: LocationData;
	setLocationData?: React.Dispatch<React.SetStateAction<LocationData>>; // 선택적 props로 변경
	width?: string;
	height?: string;
	className?: string;
	currentlocation?: { latitude: number | null; longitude: number | null };
}

const MapPage = ({
	setLocationData = () => { },
	locationData,
	width = "100%", // 기본값 설정
	height = "360px",
	className = "",
	currentlocation
}: MapPageProps) => {
	return (
		<>
			<PlaceConverter
				setLocationData={setLocationData}
				locationData={locationData}
			/>
			<Map
				center={
					locationData.startCoordinates ||
					locationData.endCoordinates || { lat: 33.5563, lng: 126.79581 }
				}
				style={{ width, height }}
				level={3}
				className={className}
			>
				{locationData.startCoordinates && (
					<MapMarker position={locationData.startCoordinates}>
						<div style={{ color: "#000" }}>
							출발지: {locationData.startAddress}
						</div>
					</MapMarker>
				)}
				{locationData.endCoordinates && (
					<MapMarker position={locationData.endCoordinates}>
						<div style={{ color: "#000" }}>
							도착지: {locationData.endAddress}
						</div>
					</MapMarker>
				)}
				{currentlocation?.latitude && currentlocation?.longitude && (
					<MapMarker position={{ lat: currentlocation.latitude, lng: currentlocation.longitude }}>
						<div style={{ color: "red" }}>현재 위치</div>
					</MapMarker>
				)}
			</Map>
		</>
	);
};

export default MapPage;
