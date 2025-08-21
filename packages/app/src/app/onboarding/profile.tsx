import styled from "@emotion/native";
import ProfileForm from "@screens/onboarding/ProfileForm";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";

const ProfileSettingScreen = () => {
  return (
    <ScreenContainer>
      <Spacing size={36} />
      <HeaderContainer>
        <Text color="mainGreen" fontSize={24} fontWeight={"medium"}>
          프로필 설정
        </Text>
      </HeaderContainer>
      <Spacing size={20} />
      <ProfileForm />
    </ScreenContainer>
  );
};

const HeaderContainer = styled.View`
  align-items: center;
`;

export default ProfileSettingScreen;
