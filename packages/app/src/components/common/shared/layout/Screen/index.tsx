import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";
import { SafeAreaView } from "react-native";

interface ScreenContainerProps
  extends Omit<React.ComponentProps<typeof SafeAreaView>, "flex"> {
  backgroundColor?: keyof typeof COLORS;
}

const ScreenContainer = styled.SafeAreaView<ScreenContainerProps>`
  flex: 1;
  background-color: ${({ backgroundColor = "mainWhite" }) =>
    COLORS[backgroundColor]};
`;

export default ScreenContainer;
