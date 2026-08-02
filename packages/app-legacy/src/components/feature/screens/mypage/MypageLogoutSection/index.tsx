import styled from "@emotion/native";
import useLogoutModal from "@hooks/feature/modal/useLogoutModal";
import Text from "@shared/ui/Text";

const MypageLogoutSection = () => {
  const { showLogoutModal } = useLogoutModal();

  return (
    <Container>
      <LogoutButton onPress={showLogoutModal}>
        <Text color="primary" opacity={0.5}>
          로그아웃
        </Text>
      </LogoutButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 0 16px;
`;

const LogoutButton = styled.TouchableOpacity``;

export default MypageLogoutSection;
