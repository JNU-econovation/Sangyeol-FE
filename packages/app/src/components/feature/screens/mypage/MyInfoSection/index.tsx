import styled from "@emotion/native";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";
import { router } from "expo-router";
import { useCallback } from "react";

import PATH_ROUTE from "@constants/pathRoute";
import MyInfoSectionLoader from "./loader";

const MyInfoSection = Suspense.with(
  {
    fallback: <MyInfoSectionLoader />,
  },
  () => {
    const { data } = useProfileQuery();

    const goToMyInfo = useCallback(() => {
      router.push({
        pathname: "/(tabs)/mypage/webview/[url]",
        params: {
          url: PATH_ROUTE.WEBVIEW.MY_INFO,
        },
      });
    }, []);

    const goToTravelLog = useCallback(() => {
      const now = new Date();
      router.push({
        pathname: "/(tabs)/mypage/webview/[url]",
        params: {
          url: PATH_ROUTE.WEBVIEW.TRAVEL_LOG({
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            date: now.getDate(),
          }),
        },
      });
    }, []);

    const goToCourseBookmark = useCallback(() => {
      router.push({
        pathname: "/(tabs)/mypage/webview/[url]",
        params: {
          url: PATH_ROUTE.WEBVIEW.COURSE_BOOKMARK,
        },
      });
    }, []);

    return (
      <Container>
        <ContentContainer>
          <ProfileImagePlaceholder />
          <Spacing size={20} />

          <Text fontSize={14} fontWeight="regular" color="primary">
            프로필 변경
          </Text>

          <Spacing size={20} />

          {/* User Name */}
          <UserNameContainer onPress={goToMyInfo}>
            <Text fontSize={24} fontWeight="bold" color="black">
              {data?.name}
            </Text>
            <Spacing size={4} horizontal />
            <Text fontSize={20} color="black">
              ›
            </Text>
          </UserNameContainer>

          <Spacing size={16} />

          {/* Navigation Links */}
          <NavigationContainer>
            <NavigationButton onPress={goToTravelLog}>
              <Text fontSize={16} fontWeight="semibold" color="primary">
                산행 기록
              </Text>
            </NavigationButton>

            <NavigationDivider />

            <NavigationButton onPress={goToCourseBookmark}>
              <Text fontSize={16} fontWeight="semibold" color="primary">
                코스 북마크
              </Text>
            </NavigationButton>
          </NavigationContainer>
        </ContentContainer>
      </Container>
    );
  },
);

const Container = styled.View`
  background-color: ${COLORS.mainWhite};
`;

const ContentContainer = styled.View`
  align-items: center;
  padding: 0 16px;
`;

const ProfileImagePlaceholder = styled.View`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: ${COLORS.gray300};
`;

const UserNameContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NavigationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const NavigationButton = styled.TouchableOpacity``;

const NavigationDivider = styled.View`
  width: 1px;
  height: 24px;
  background-color: ${COLORS.gray300};
`;

export default MyInfoSection;
