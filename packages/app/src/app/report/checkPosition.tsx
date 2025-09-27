import styled from "@emotion/native";
import useGetCurrentPosition from "@hooks/feature/location/useGetCurrentPosition";
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
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckPositionScreen = () => {
  const mapRef = useRef<NaverMapViewRef>(null);
  const { top } = useSafeAreaInsets();
  const { isLoading, location } = useGetCurrentPosition();
  const { setReportPosition } = useReportPositionStore();
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();

  useEffect(() => {
    if (!isLoading && location) {
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [isLoading, location]);

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
            onTouchEnd: async () => {
              const { width, height } = Dimensions.get("window");
              const result = await mapRef.current?.screenToCoordinate({
                screenX: width / 2,
                screenY: height / 2,
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
            if (isLoading || !position) return;
            setReportPosition(position);
            console.log("Set report position:", position);
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
  transform: translate(-15px, -30px);
  width: 30px;
  height: 30px;
`;

export default CheckPositionScreen;
