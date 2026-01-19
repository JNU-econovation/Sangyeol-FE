import PATH_ROUTE from "@constants/pathRoute";
import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { router } from "expo-router";
import { useCallback } from "react";

const MyPageNavListSection = () => {
  const goToNotificationSetting = useCallback(() => {
    router.push("/(tabs)/mypage/notificationSetting");
  }, []);

  const goToCheckTerms = useCallback(() => {
    router.push({
      pathname: "/(tabs)/mypage/checkTerms",
    });
  }, []);

  const goToCustomerCenter = useCallback(() => {
    router.push({
      pathname: "/(tabs)/mypage/webview/[url]",
      params: {
        url: PATH_ROUTE.WEBVIEW.CUSTOMER_CENTER("inquiry"),
      },
    });
  }, []);

  return (
    <Container>
      <Spacing size={20} />
      <SectionDivider />
      {/* <Spacing size={20} /> */}

      <SectionContainer>
        <Text fontSize={14} fontWeight="medium" color="primary" opacity={0.5}>
          고객 센터
        </Text>
        <Spacing size={8} />

        <MenuButton activeOpacity={0.6} onPress={goToCustomerCenter}>
          <MenuItemContainer>
            <Text fontSize={16} color="black" fontWeight="regular">
              문의하기
            </Text>
            <Text fontSize={20} color="gray800">
              ›
            </Text>
          </MenuItemContainer>
        </MenuButton>
        <MenuButton activeOpacity={0.6} onPress={goToCheckTerms}>
          <MenuItemContainer>
            <Text fontSize={16} color="black" fontWeight="regular">
              약관 확인
            </Text>
            <Text fontSize={20} color="gray800">
              ›
            </Text>
          </MenuItemContainer>
        </MenuButton>
        <Divider />
      </SectionContainer>

      {/* Environment Section */}
      <SectionContainer>
        <Text fontSize={14} fontWeight="medium" color="primary" opacity={0.5}>
          환경
        </Text>
        <Spacing size={8} />

        <MenuButton activeOpacity={0.6} onPress={goToNotificationSetting}>
          <MenuItemContainer>
            <Text fontSize={16} color="black" fontWeight="regular">
              알림 설정
            </Text>
            <Text fontSize={20} color="gray800">
              ›
            </Text>
          </MenuItemContainer>
        </MenuButton>

        <Spacing size={8} />

        <VersionContainer>
          <Text
            fontSize={16}
            color="primary"
            fontWeight="regular"
            opacity={0.5}
          >
            버전 정보
          </Text>
          <Text
            fontSize={16}
            color="primary"
            fontWeight="regular"
            opacity={0.5}
          >
            0.0.1
          </Text>
        </VersionContainer>
        <Divider />
      </SectionContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${COLORS.mainWhite};
`;

const SectionDivider = styled.View`
  height: 9px;
  background-color: ${COLORS.gray300};
`;

const SectionContainer = styled.View`
  margin-top: 24px;
  padding: 0 16px;
`;

const MenuButton = styled.TouchableOpacity`
  height: 44px;
  justify-content: center;
`;

const MenuItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const VersionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${COLORS.gray300};
  margin-top: 8px;
`;

export default MyPageNavListSection;
