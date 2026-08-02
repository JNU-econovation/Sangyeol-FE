import styled from "@emotion/native";
import Text from "@shared/ui/Text";
import { COLORS } from "@styles/colorPalette";
import { TouchableWithoutFeedback } from "react-native";

interface MapHeaderTagProps {
  text: string;
  isSelected: boolean;
  onPressHandler?: () => void;
}

const MapHeaderTag = ({
  text,
  isSelected,
  onPressHandler,
}: MapHeaderTagProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <Container isSelected={isSelected}>
        <Text
          fontSize={13}
          color={isSelected ? "mainWhite" : "black-800"}
          fontWeight="medium"
        >
          {text}
        </Text>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View<{ isSelected: boolean }>`
  padding-inline: 12px;
  padding-block: 4px;
  margin-right: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) =>
    props.isSelected ? COLORS.primary : COLORS.mainWhite};
  border: 1px solid ${COLORS.gray600};
`;

export default MapHeaderTag;
