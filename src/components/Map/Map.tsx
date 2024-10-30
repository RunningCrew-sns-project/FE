import { Map, MapMarker } from "react-kakao-maps-sdk";
import { LocationDataProps } from "../../pages/Run/create/createRun";
import PlaceConverter from "./PlaceConverter";
import React from "react";

interface MapPageProps {
    locationData: LocationDataProps;
    setLocationData?: React.Dispatch<React.SetStateAction<LocationDataProps>>; // 선택적 props로 변경
}

const MapPage = ({ setLocationData = () => {}, locationData }: MapPageProps) => {
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
                style={{ width: "100%", height: "360px" }}
                level={3}
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
            </Map>
        </>
    );
};

export default MapPage;
