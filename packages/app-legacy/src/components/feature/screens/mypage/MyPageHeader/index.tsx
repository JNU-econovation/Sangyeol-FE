import styled from "@emotion/native";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";

const MyPageHeader = () => {
  return (
    <HeaderContainer>
      <Text fontSize={20} fontWeight="bold" color="black" textAlign="center">
        마이 페이지
      </Text>
      <Spacing size={8} />
      <HeaderDivider />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  padding: 0 16px;
`;

const HeaderDivider = styled.View`
  height: 1px;
  background-color: ${COLORS.gray300};
  width: 100%;
`;

export default MyPageHeader;
