import { NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map";
import { Coordinate } from "@model/map";

interface DomainMarkersProps {
  zoomLevel: number; //TODO: zoomLevel을 부모 컴포넌트에서 단순히props로 받아오지 않도록 수정 필요. 컨텍스트로 수정 필요
  showOverlays: string[];
  bases?: Coordinate[];
  toilets?: Coordinate[];
  markets?: Coordinate[];
  rentals?: Coordinate[];
  emergencyKits?: Coordinate[];
}

const DomainMarkers = ({
  zoomLevel,
  showOverlays,
  bases,
  toilets,
  markets,
  rentals,
  emergencyKits,
}: DomainMarkersProps) => {
  return (
    <>
      {bases.map(([longitude, latitude], index) => (
        <NaverMapMarkerOverlay
          key={`${index}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
          image={require("@assets/images/Base.png")}
          isIconPerspectiveEnabled={true}
          isHidden={
            zoomLevel < 9 ||
            showOverlays.length === 0 ||
            !showOverlays.includes("BASE") ||
            bases.length === 0
          }
        />
      ))}

      {toilets.map(([longitude, latitude], index) => (
        <NaverMapMarkerOverlay
          key={`${index}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
          image={require("@assets/images/Toilet.png")}
          isHidden={
            zoomLevel < 9 ||
            showOverlays.length === 0 ||
            !showOverlays.includes("TOILET") ||
            toilets.length === 0
          }
        />
      ))}
      {markets.map(([longitude, latitude], index) => (
        <NaverMapMarkerOverlay
          key={`${index}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
          image={require("@assets/images/Market.png")}
          isHidden={
            zoomLevel < 9 ||
            showOverlays.length === 0 ||
            !showOverlays.includes("MARKET") ||
            markets.length === 0
          }
        />
      ))}
      {emergencyKits.map(([longitude, latitude], index) => (
        <NaverMapMarkerOverlay
          key={`${index}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
          image={require("@assets/images/Emergency_Kit.png")}
          isHidden={
            zoomLevel < 9 ||
            showOverlays.length === 0 ||
            !showOverlays.includes("EMERGENCY_KIT") ||
            emergencyKits.length === 0
          }
        />
      ))}
      {rentals.map(([longitude, latitude], index) => (
        <NaverMapMarkerOverlay
          key={`${index}-${latitude}-${longitude}`}
          latitude={latitude}
          longitude={longitude}
          image={require("@assets/images/Rental.png")}
          isHidden={
            zoomLevel < 9 ||
            showOverlays.length === 0 ||
            !showOverlays.includes("RENTAL") ||
            rentals.length === 0
          }
        />
      ))}
    </>
  );
};

export default DomainMarkers;
