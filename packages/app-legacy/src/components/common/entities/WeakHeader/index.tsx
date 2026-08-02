import styled from "@emotion/native";
import BackButton from "@components/common/entities/BackButton";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";

interface WeakHeaderProps {
  headerText?: string;
}

export default function WeakHeader({ headerText }: WeakHeaderProps) {
  return (
    <HeaderContainer>
      <BackButtonWrapper>
        <BackButton />
      </BackButtonWrapper>
      <Text fontSize={16} fontWeight="medium" textAlign="center">
        {headerText}
      </Text>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 12px;
  background-color: ${COLORS.mainWhite};
  position: relative;
`;

const BackButtonWrapper = styled.View`
  position: absolute;
  left: 16px;
`;
