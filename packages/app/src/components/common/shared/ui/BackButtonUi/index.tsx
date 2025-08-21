import styled from "@emotion/native";
import { BackArrow } from "@shared/ui/Icons";

interface BackButtonUiProps {
  onPress?: () => void;
}

const BackButtonUi = ({ onPress }: BackButtonUiProps) => {
  return (
    <BackButtonContainer onPress={onPress}>
      <BackArrow />
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.TouchableOpacity``;

export default BackButtonUi;
