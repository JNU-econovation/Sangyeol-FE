import * as Updates from "expo-updates";
import { Button } from "react-native";
import styled from "@emotion/native";
import useRouterPrefetcher from "@hooks/common/useRouterPrefetcher";
import usePersonalInfoModal from "@hooks/feature/modal/usePersonalInfoModal";
import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import Spacing from "@shared/layout/Spacing";
import { useEffect } from "react";
import { ImageBackground } from "react-native";

const HomeScreen = () => {
  const {
    data: profileStatusData,
    // isLoading: profileStatusLoading,
    // error: profileStatusError,
  } = useUserProfileStatusQuery();
  const { showNotificationModal } = usePersonalInfoModal();

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

  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // 업데이트 다운로드 완료, 앱 재시작
        await Updates.reloadAsync();
      } else {
        alert("최신 버전입니다!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container source={require("@assets/images/Home_Background.png")}>
      <Button title="업데이트 확인" onPress={checkForUpdates} />;
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
