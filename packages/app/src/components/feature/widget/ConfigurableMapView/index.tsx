import MOUNTAIN from "@constants/mountain";
import useRealTimeLocation from "@hooks/feature/location/useRealTimeLocation";
import {
  NaverMapMarkerOverlay,
  NaverMapPathOverlay,
  NaverMapPathOverlayProps,
  NaverMapView,
} from "@mj-studio/react-native-naver-map";
import { ComponentProps, memo, useState } from "react";

import CurrentPosition from "./currentPosition";
import DomainMarkers from "./domainMarkers";
import HeadPolygon from "./headPolygon";
import type { NaverMapMarkerProps } from "./marker";
import BasePoint from "./basePoint";
import type { Coordinate } from "@model/map";

const DEFAULT_ZOOM = 14;

export interface PolylineOptions extends NaverMapPathOverlayProps {}

export interface ConfigurableMapViewProps {
  paths?: PolylineOptions[];
  marker?: { latitude: number; longitude: number };
  currentPositionIcon?: boolean;
  zoom?: number;

  markers?: NaverMapMarkerProps[];
  showMarkers?: boolean;
  basePoints?: { latitude: number; longitude: number }[];
  options?: ComponentProps<typeof NaverMapView>;

  //TODO: 너무 도메인에 강결합된 값. 하지만.. 이거 어떻게 해결해.. NaverMapMarker로 하면 메모리 초과로 앱 죽음
  showOverlays?: string[];
  bases?: Coordinate[];
  toilets?: Coordinate[];
  markets?: Coordinate[];
  rentals?: Coordinate[];
  emergencyKits?: Coordinate[];
}

const ConfigurableMapView = memo(
  ({
    currentPositionIcon,
    zoom = DEFAULT_ZOOM,
    paths,
    // showMarkers,
    // markers,
    options,
    basePoints = [],
    showOverlays = [],
    bases,
    toilets,
    markets,
    rentals,
    emergencyKits,
  }: ConfigurableMapViewProps) => {
    const { location, isLoading: isLocationLoading } = useRealTimeLocation({
      accuracy: "highest",
      timeInterval: 2000,
      distanceInterval: 2,
    });

    const [zoomLevel, setZoomLevel] = useState(zoom);

    if (isLocationLoading || !location) {
      return null;
    }

    return (
      <NaverMapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}
        isShowLocationButton={false}
        initialCamera={{
          zoom: zoomLevel,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
        // isRotateGesturesEnabled={false} // 회전 제스처 비활성화
        // isTiltGesturesEnabled={false} // 기울이기 제스처 비활성화
        isShowZoomControls={false}
        isShowCompass={false}
        onCameraChanged={({ zoom }) => setZoomLevel(zoom)}
        minZoom={6}
        {...options}
      >
        {currentPositionIcon && (
          <>
            <CurrentPosition />
            <HeadPolygon zoomLevel={zoomLevel} />
          </>
        )}

        <DomainMarkers
          zoomLevel={zoomLevel}
          showOverlays={showOverlays}
          bases={bases}
          toilets={toilets}
          markets={markets}
          rentals={rentals}
          emergencyKits={emergencyKits}
        />

        {/* markers */}
        {Object.keys(MOUNTAIN).map((key) => {
          const [longitude, latitude] =
            MOUNTAIN[key as keyof typeof MOUNTAIN].coordinate;
          return (
            <NaverMapMarkerOverlay
              key={key}
              latitude={latitude}
              longitude={longitude}
              image={require("@assets/images/Mountain.png")}
              isHidden={zoomLevel >= 9 && showOverlays.length !== 0}
            />
          );
        })}

        {paths &&
          paths.map(
            (pathOptions, index) =>
              pathOptions.coords.length > 3 && (
                <NaverMapPathOverlay
                  key={`path-${index}`}
                  coords={pathOptions.coords}
                  {...pathOptions}
                />
              ),
          )}
        <BasePoint coordinates={basePoints} zoomLevel={zoomLevel} />
      </NaverMapView>
    );
  },
);

export default ConfigurableMapView;
