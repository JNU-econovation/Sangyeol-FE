import styled from "@emotion/native";
import TravelResultCancelButton from "@screens/travel/TravelResultCancelButton";
import TravelResultMapView from "@screens/travel/TravelResultMapView";
import TravelWithCourseResultReviewSection from "@screens/travel/TravelWithCourseResultReviewSection";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import { router } from "expo-router";
import { useEffect } from "react";

const ResultScreen = () => {
  useEffect(() => {
    router.prefetch("/(tabs)/home");
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Spacing size={82} />
        <TravelResultCancelButton />
      </HeaderContainer>
      <TravelResultMapView />
      <PositionBottom paddingInline={28}>
        <TravelWithCourseResultReviewSection />
      </PositionBottom>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const HeaderContainer = styled.View`
  position: absolute;
  z-index: 10;
  padding-inline: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

export default ResultScreen;
