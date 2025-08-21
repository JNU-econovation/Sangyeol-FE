import styled from "@emotion/native";
import PermissionHeaderSection from "@screens/onboarding/PermissionHeaderSection";
import PermissionListSection from "@screens/onboarding/PermissionListSection";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";

const permissionScreen = () => {
  return (
    <ScreenContainer>
      <Spacing size={80} />
      <HeaderContainer>
        <PermissionHeaderSection />
      </HeaderContainer>
      <Spacing size={53} />
      <PermissionListSection />
    </ScreenContainer>
  );
};

const HeaderContainer = styled.View`
  padding-inline: 23px;
`;

export default permissionScreen;
