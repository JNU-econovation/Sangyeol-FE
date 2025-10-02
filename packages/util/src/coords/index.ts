export const convertToDMS = (lat: number, lon: number) => {
  // 입력 값 범위 검증
  if (lat < -90 || lat > 90) {
    throw new Error("Latitude must be between -90 and 90 degrees");
  }
  if (lon < -180 || lon > 180) {
    throw new Error("Longitude must be between -180 and 180 degrees");
  }

  // 위도를 도분초로 변환
  function toDMS(coordinate: number, isLatitude: boolean) {
    const absolute = Math.abs(coordinate);
    let degrees = Math.floor(absolute);
    const minutesFloat = (absolute - degrees) * 60;
    let minutes = Math.floor(minutesFloat);
    let seconds = Math.round((minutesFloat - minutes) * 60 * 100) / 100;

    // 초가 60이 되면 분으로 올림
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    // 분이 60이 되면 도로 올림
    if (minutes >= 60) {
      minutes = 0;
      degrees += 1;
    }

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
