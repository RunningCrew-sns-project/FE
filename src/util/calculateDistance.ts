

export const calculateDistance = (startCoordinates, currentCoords) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // 지구 반지름 (미터)
  
  const φ1 = toRad(startCoordinates.lat);
  const φ2 = toRad(currentCoords.latitude);
  const Δφ = toRad(currentCoords.latitude - startCoordinates.lat);
  const Δλ = toRad(currentCoords.longitude - startCoordinates.lng);

  const a = Math.sin(Δφ / 2) ** 2 +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 미터 단위 거리
}

