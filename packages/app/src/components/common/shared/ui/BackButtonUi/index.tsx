import styled from "@emotion/native";
import { BackArrow, BackButton } from "@shared/ui/Icons";

export interface BackButtonUiProps {
  onPress?: () => void;
  background?: boolean;
}

const BackButtonUi = ({ onPress, background }: BackButtonUiProps) => {
  return (
    <BackButtonContainer onPress={onPress} background={background}>
      {!background && <BackArrow />}
      {background && <BackButton />}
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.TouchableOpacity<
  Omit<BackButtonUiProps, "onPress">
>``;

export default BackButtonUi;
