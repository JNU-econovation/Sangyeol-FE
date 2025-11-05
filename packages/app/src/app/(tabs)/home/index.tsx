import styled from "@emotion/native";
import useRouterPrefetcher from "@hooks/common/useRouterPrefetcher";
import useCheckEnvironment from "@hooks/feature/env/useCheckEnvironment";
import usePersonalInfoModal from "@hooks/feature/modal/usePersonalInfoModal";
import useUserProfileStatusQuery from "@hooks/feature/query/query/useUserProfileStatusQuery";
import HomeNavGridSection from "@screens/Home/HomeNavGridSection";
import Spacing from "@shared/layout/Spacing";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { Alert, Button, ImageBackground } from "react-native";

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

  const checkForUpdates = async () => {
    try {
      Alert.alert("업데이트 확인 중...");
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert("업데이트가 있습니다! 다운로드를 시작합니다.");
        await Updates.fetchUpdateAsync();
        // 업데이트 다운로드 완료, 앱 재시작
        Alert.alert("업데이트가 완료되었습니다! 앱을 재시작합니다.");
        await Updates.reloadAsync();
      } else {
        Alert.alert("최신 버전입니다!");
      }
    } catch (error) {
      Alert.alert("업데이트 확인 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Container source={require("@assets/images/Home_Background.png")}>
      {isDevelopment && (
        <Button title="업데이트 확인" onPress={checkForUpdates} />
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
