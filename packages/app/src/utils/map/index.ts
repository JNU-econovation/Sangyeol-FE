/**
 * 경도 위도 배열을 받아 NaverMapView 컴포넌트에서 사용하는 { latitude, longitude } 객체 배열로 변환합니다.
 *
 * @param arr - [경도, 위도] 배열
 * @returns { latitude: number; longitude: number }[] - { 위도, 경도 } 객체 배열
 */
export const coordConvertor = (arr: [number, number][]) => {
  return arr.map(([longitude, latitude]) => ({ latitude, longitude }));
};

// 부채꼴 폴리곤 좌표 생성 함수
/**
 * 부채꼴 폴리곤 과표를 생성합니다.
 * 이는 사용자의 현재 위치와 바라보는 방향을 시각화하는데 사용됩니다.
 *
 * @param centerLat - 중심 위도
 * @param centerLng - 중심 경도
 * @param heading - 방향 (도)
 * @param radius - 반경 (미터), 기본값은 50m
 * @param angle - 부채꼴 각도 (도), 기본값은 60도
 * @returns [number, number][] - [경도, 위도] 배열
 */
export const createViewDirectionPolygon = ({
  centerLat,
  centerLng,
  heading, // 방향 (도)
  radius = 50, // 반경 (미터)
  angle = 60, // 부채꼴 각도 (도)
}: {
  centerLat: number;
  centerLng: number;
  heading: number;
  radius?: number;
  angle?: number;
}) => {
  const coords: [number, number][] = [];

  // 중심점
  coords.push([centerLng, centerLat]);

  // 부채꼴 호 생성
  const startAngle = heading - angle / 2;
  const endAngle = heading + angle / 2;

  for (let i = 0; i <= 20; i++) {
    const currentAngle = startAngle + (endAngle - startAngle) * (i / 20);
    // 북쪽을 0도로 맞추기 위해 90도 빼기
    const radian = ((currentAngle - 90) * Math.PI) / 180;

    // 위도, 경도 계산 수정
    const lat = centerLat + (radius / 111000) * Math.sin(radian);
    const lng =
      centerLng +
      (radius / (111000 * Math.cos((centerLat * Math.PI) / 180))) *
        Math.cos(radian);

    coords.push([lng, lat]);
  }

  // 다시 중심점으로 닫기
  coords.push([centerLng, centerLat]);

  return coords;
};

// 줌 레벨에 따른 크기 계산 함수
/**
 * 줌 레벨에 따른 크기 계산 함수.
 *
 * 만약 지도에 줌 크기와 상관 없이 일정한 크기를 유지하고 싶은 오버레이가 있다면,
 * 이 함수를 사용하여 반경을 조정하세요.
 *
 * 해당 함수를 사용할 때에는 첫 인자에 화면에 보일 기본 반경 크기를 넣고, 두 번째 인자에 현재 지도 줌 레벨을 넣어주세요.
 *
 * 줌 레벨의 경우 <NaverMapView/> 의 `onCameraChanged` 이벤트 핸들러에서 얻을 수 있습니다.
 * onCameraChanged={(event) => {setZoomLevel(event.zoom);}}
 *
 * @param baseRadius - 기본 반경 (미터 단위)
 * @param zoomLevel - 현재 줌 레벨
 * @returns 조정된 반경 (미터 단위)
 */
export const getScaledRadius = (baseRadius: number, zoomLevel: number) => {
  // 줌 16을 기준으로 크기 조정
  const scale = Math.pow(2, 16 - zoomLevel);
  return baseRadius * scale;
};
