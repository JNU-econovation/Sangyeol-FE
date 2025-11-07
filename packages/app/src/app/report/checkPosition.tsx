import styled from "@emotion/native";
import { NaverMapViewRef } from "@mj-studio/react-native-naver-map";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import DefaultButton from "@shared/ui/buttons/DefaultButton";
import Header from "@shared/ui/Header";
import { MarkerSVG } from "@shared/ui/Icons";
import { useReportPositionStore } from "@store/report/useReportPositionStore";
import ConfigurableMapView from "@widget/ConfigurableMapView";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckPositionScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const [mapLayout, setMapLayout] = useState({ width: 0, height: 0 });
  const { top } = useSafeAreaInsets();
  const { reportPosition, setReportPosition } = useReportPositionStore();
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    if (reportPosition) {
      setPosition({
        latitude: reportPosition.latitude,
        longitude: reportPosition.longitude,
      });
      return;
    }
  }, [reportPosition]);

  return (
    <Screen>
      <HeaderContainer>
        <Spacing size={top + 20} />
        <Header />
      </HeaderContainer>
      <MapContainer>
        <ConfigurableMapView
          ref={mapRef}
          options={{
            initialCamera: {
              zoom: 14,
              latitude: reportPosition.latitude,
              longitude: reportPosition.longitude,
            },
            isShowLocationButton: true,
            // locationOverlay: {
            //   circleOutlineColor: "rgb(21, 255, 0)",
            //   circleOutlineWidth: 2,
            //   isVisible: true,
            //   circleColor: "rgba(255, 0, 0, 0.3)",
            //   circleRadius: 20,
            //   subImageWidth: 40,
            //   subImageHeight: 40,
            //   anchor: { x: 0.5, y: 0.5 },
            //   position: {
            //     latitude: reportPosition.latitude,
            //     longitude: reportPosition.longitude,
            //   },
            // },
            onLayout: (event) => {
              const { width, height } = event.nativeEvent.layout;
              setMapLayout({ width, height });
            },
            onTouchEnd: async () => {
              if (!mapLayout.width || !mapLayout.height) return;
              const result = await mapRef.current?.screenToCoordinate({
                screenX: mapLayout.width / 2,
                screenY: mapLayout.height / 2,
              });
              if (result) {
                setPosition({
                  latitude: result.latitude,
                  longitude: result.longitude,
                });
              }
            },
          }}
        />
        <MarkerContainer>
          <MarkerSVG />
        </MarkerContainer>
      </MapContainer>
      <PositionBottom>
        <DefaultButton
          title="현재 위치로 설정"
          fullWidth
          onPress={() => {
            // if (isLoading || !position) return;
            setReportPosition(position);
            router.back();
          }}
        />
        <Spacing size={12} />
        <DefaultButton
          title="취소"
          color="black"
          backgroundColor="mainWhite"
          fullWidth
          onPress={() => router.back()}
        />
      </PositionBottom>
    </Screen>
  );
};

const Screen = styled.View`
  flex: 1;
  position: relative;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

const MapContainer = styled.View`
  flex: 1;
  position: relative;
`;

const MarkerContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25px, -40px);
  width: 30px;
  height: 30px;
`;

export default CheckPositionScreen;
