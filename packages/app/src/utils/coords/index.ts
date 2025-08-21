export const convertToDMS = (lat: number, lon: number) => {
  // 위도를 도분초로 변환
  function toDMS(coordinate: number, isLatitude: boolean) {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100; // 소수점 둘째자리까지

    // 방향 결정
    let direction;
    if (isLatitude) {
      direction = coordinate >= 0 ? "N" : "S";
    } else {
      direction = coordinate >= 0 ? "E" : "W";
    }

    return `${degrees}°${minutes}'${seconds}"${direction}`;
  }

  const latDMS = toDMS(lat, true);
  const lonDMS = toDMS(lon, false);

  return `${latDMS}, ${lonDMS}`;
};
