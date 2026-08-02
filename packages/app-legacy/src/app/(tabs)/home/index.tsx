import { ChevronRightSVG } from "@components/common/shared/ui/Icons";
import Text from "@components/common/shared/ui/Text";
import styled from "@emotion/native";
import useRouterPrefetcher from "@hooks/common/useRouterPrefetcher";
import useCheckEnvironment from "@hooks/feature/env/useCheckEnvironment";
import usePersonalInfoModal from "@hooks/feature/modal/usePersonalInfoModal";
import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import Spacing from "@shared/layout/Spacing";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";

const HomeScreen = () => {
  const {
    data: profileStatusData,
    // isLoading: profileStatusLoading,
    // error: profileStatusError,
  } = useUserProfileStatusQuery();
  const { showNotificationModal } = usePersonalInfoModal();
  const { isDevelopment } = useCheckEnvironment();

  useRouterPrefetcher({
    routes: ["/(tabs)/home/course"],
  });

  useEffect(() => {
    const isPersonalInfoSet =
      profileStatusData?.profileStatusInfoDTO?.isPersonalInfoSet;
    if (profileStatusData && !isPersonalInfoSet) {
      showNotificationModal();
    }
  }, [profileStatusData]);

  const goToTestPage = useCallback(() => {
    router.push("/travel/withoutCourse/result");
  }, []);

  const goToRecommendStores = useCallback(() => {
    router.push("/webview/recommend-stores");
  }, []);

  return (
    <Container source={require("@assets/images/Home_Background.png")}>
      {isDevelopment && (
        <TouchableOpacity onPress={goToTestPage}>
          <Text>테스트 페이지로 이동</Text>
        </TouchableOpacity>
      )}
      <TravelEventBannerContainer>
        <TravelEventTextField>
          <Text fontSize={20} color="gray300" fontWeight="bold">
            오늘의 산행 보상
          </Text>
          <Spacing size={8} />
          <Text fontSize={14} color="gray300">
            AI 추천 쿠폰 받기
          </Text>
        </TravelEventTextField>
        <TravelEventRouteButton onPress={goToRecommendStores}>
          <ChevronRightSVG />
        </TravelEventRouteButton>
      </TravelEventBannerContainer>
      <Spacing size={28} />
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

const TravelEventBannerContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.primary};
  padding: 20px;
  border-radius: 16px;
`;
const TravelEventTextField = styled.View``;

const TravelEventRouteButton = styled.TouchableOpacity`
  background-color: ${COLORS.mainWhite};
  border-radius: 10px;
  padding: 4px;
`;

export default HomeScreen;
