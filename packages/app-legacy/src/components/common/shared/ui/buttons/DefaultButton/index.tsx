import { COLORS } from "@styles/colorPalette";
import styled from "@emotion/native";
import { ReactNode } from "react";

import DefaultButtonLoader from "./loader";

export interface ButtonStyledProps {
  fullWidth?: boolean;
  disabled?: boolean;
  backgroundColor?: keyof typeof COLORS;
  color?: keyof typeof COLORS;
  fontSize?: number;
  startIcon?: ReactNode;
  fontWeight?: "bold";
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderColor?: keyof typeof COLORS;
  borderWidth?: number;
  // height?: number;
}

interface DefaultButtonProps extends ButtonStyledProps {
  title: string;
  onPress?: () => void;
}

const DefaultButton = ({
  title,
  fullWidth,
  backgroundColor,
  disabled,
  color,
  fontSize,
  startIcon,
  paddingVertical,
  paddingHorizontal,
  borderColor,
  borderWidth,
  // height,
  onPress,
}: DefaultButtonProps) => {
  return (
    <StyledTouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ width: fullWidth ? "100%" : undefined }}
      backgroundColor={backgroundColor}
      activeOpacity={0.8}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      borderColor={borderColor}
      borderWidth={borderWidth}
    >
      {startIcon && startIcon}
      <StyledText color={color} fontSize={fontSize}>
        {title}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled.TouchableOpacity<ButtonStyledProps>(
  ({
    fullWidth,
    disabled,
    backgroundColor,
    paddingVertical,
    paddingHorizontal,
    borderColor,
    borderWidth,
    // height,
  }) => ({
    backgroundColor: backgroundColor ? COLORS[backgroundColor] : COLORS.primary,
    paddingVertical: paddingVertical || 16,
    paddingHorizontal: paddingHorizontal || 20,
    borderRadius: 8,
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
    flexDirection: "row",
    gap: 12,
    borderColor: borderColor ? COLORS[borderColor] : "transparent",
    borderWidth: borderWidth || 0,
    // height: height || 48, // TODO: 버튼 높이 수정 필요. 임의로 설정한 값
  }),
);

const StyledText = styled.Text<ButtonStyledProps>`
  color: ${({ color }) => (color ? COLORS[color] : COLORS.mainWhite)};
  font-size: ${({ fontSize }) => (fontSize ? fontSize + "px" : "16px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "bold")};
  text-align: center;
`;

DefaultButton.loader = DefaultButtonLoader;

export default DefaultButton;
