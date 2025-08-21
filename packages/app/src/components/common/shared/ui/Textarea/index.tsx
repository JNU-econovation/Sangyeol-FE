import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";

interface StyledTextInputProps {
  backgroundColor?: keyof typeof COLORS;
  width?: string | number;
  height?: string | number;
  fontSize?: number;
  color?: keyof typeof COLORS;
  borderColor?: keyof typeof COLORS;
  paddingVertical?: number;
  paddingHorizontal?: number;
}

const Textarea = styled.TextInput<StyledTextInputProps>`
  border-width: 1px;
  border-color: ${({ borderColor }) =>
    borderColor ? COLORS[borderColor] : COLORS.subGray};
  border-style: solid;
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? COLORS[backgroundColor] : COLORS.mainWhite};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : "16px")};
  color: ${({ color }) => (color ? COLORS[color] : COLORS.black)};
  padding: ${({ paddingVertical, paddingHorizontal }) =>
    `${paddingVertical || 12}px ${paddingHorizontal || 12}px`};
`;

export default Textarea;
