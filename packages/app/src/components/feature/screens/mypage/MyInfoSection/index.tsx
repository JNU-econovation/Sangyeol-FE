import styled from "@emotion/native";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";

import { Pressable } from "react-native";
import ProfileImageView from "../ProfileImageView";
import useProfileImageHandler from "./hooks/useProfileImageHandler";
import useRouteHandler from "./hooks/useRouteHandler";
import MyInfoSectionLoader from "./loader";

const MyInfoSection = Suspense.with(
  {
    fallback: <MyInfoSectionLoader />,
  },
  () => {
    const { data } = useProfileQuery();
    const { goToMyInfo, goToTravelLog, goToCourseBookmark } = useRouteHandler();
    const { handleProfileImage } = useProfileImageHandler();

    return (
      <Container>
        <ContentContainer>
          <ProfileImageView />
          <Spacing size={20} />

          <Pressable onPress={handleProfileImage}>
            <Text fontSize={14} fontWeight="regular" color="primary">
              프로필 변경
            </Text>
          </Pressable>

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
