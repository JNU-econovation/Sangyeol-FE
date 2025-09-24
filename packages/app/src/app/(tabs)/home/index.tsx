import styled from "@emotion/native";
import { ImageBackground } from "react-native";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import Spacing from "@shared/layout/Spacing";
import { router } from "expo-router";
import { useEffect } from "react";

const HomeScreen = () => {
  useEffect(() => {
    router.prefetch("/(tabs)/home/course");
  }, []);

  return (
    <Container source={require("@assets/images/Home_Background.png")}>
      <HomeNavGridSection />
      <Spacing size={20} />
    </Container>
  );
};

const Container = styled(ImageBackground)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-inline: 20px;
`;

export default HomeScreen;
