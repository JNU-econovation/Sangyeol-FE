import styled from "@emotion/native";
import TravelResultMapView from "@screens/travel/TravelResultMapView";
import TravelResultScreenHeaderSection from "@screens/travel/TravelResultScreenHeaderSection";
import TravelWithoutCourseResultReviewSection from "@screens/travel/TravelWithoutCourseResultReviewSection";
import Spacing from "@shared/layout/Spacing";
import { router } from "expo-router";
import { useEffect } from "react";

const ResultScreen = () => {
  useEffect(() => {
    router.prefetch("/(tabs)/home");
  }, []);

  return (
    <Container>
      <Spacing size={52} />
      <TravelResultScreenHeaderSection />
      <TravelWithoutCourseResultReviewSection />
      <TravelResultMapView />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: white;
`;

export default ResultScreen;
