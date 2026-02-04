import styled from "@emotion/native";
import useRouterPrefetcher from "@hooks/common/useRouterPrefetcher";
import useCheckEnvironment from "@hooks/feature/env/useCheckEnvironment";
import usePersonalInfoModal from "@hooks/feature/modal/usePersonalInfoModal";
import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import Spacing from "@shared/layout/Spacing";
import { router } from "expo-router";
import { useEffect } from "react";
import { Button, ImageBackground } from "react-native";

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

  const goToTestPage = () => {
    router.push("/travel/withoutCourse/result");
  };

  return (
    <Container source={require("@assets/images/Home_Background.png")}>
      {isDevelopment && (
        <Button title="테스트 페이지로 가기" onPress={goToTestPage} />
      )}
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
