import MapPage from "../../components/Map/Map";

const Running = () => {
	const locationData = {
		startCoordinates: { lat: 37.51064272274346, lng: 127.09971395114385 },
		endCoordinates: { lat: 37.51113059993883, lng: 127.09811980036908 },
		startAddress: "롯데월드 어드벤처",
		endAddress: "롯데월드 샤롯데씨어터",
	};

	return (
		<>
			<div className="w-full h-screen rounded-t-3xl relative">
				<div className="w-full h-full">
					<MapPage locationData={locationData} width="100%" height="100%"  className="rounded-t-3xl"/>
				</div>
				<div className="absolute top-4 left-4 z-10">
            <p>타이머</p>
        </div>
			</div>
		</>
	);
};

export default Running;
