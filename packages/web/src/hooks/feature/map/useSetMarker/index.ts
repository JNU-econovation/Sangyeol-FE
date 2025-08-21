/* eslint-disable @typescript-eslint/no-explicit-any */

interface SetMarkerProps {
  map: any;
  position: {
    latitude: number;
    longitude: number;
  };
  enable?: boolean;
}

const useSetMarker = ({
  map,
  position: { latitude, longitude },
  enable = true,
}: SetMarkerProps) => {
  if (!map || !enable) return;

  // const icon = {
  //   url: "./free-icon-record-9261360.png",
  //   size: new naver.maps.Size(512, 512),
  //   anchor: new naver.maps.Point(256, 256),
  // };
  // new naver.maps.Marker({
  //   position: new naver.maps.LatLng(latitude, longitude),
  //   map,
  //   icon,
  // });

  new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    map: map,
  });
};

export default useSetMarker;
