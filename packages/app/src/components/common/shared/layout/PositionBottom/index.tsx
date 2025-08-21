import styled from "@emotion/native";
import { memo, PropsWithChildren } from "react";
import { Dimensions } from "react-native";

const DEFAULT_BOTTOM_SPACE = 50; // 하단 여백

interface PositionBottomStyleProps {
  bottom?: number;
  paddingInline?: number;
}

interface PositionBottomProps
  extends PositionBottomStyleProps,
    PropsWithChildren {}

const PositionBottom = ({
  children,
  bottom = DEFAULT_BOTTOM_SPACE,
  paddingInline = 20,
}: PositionBottomProps) => {
  return (
    <Container bottom={bottom} paddingInline={paddingInline}>
      {children}
    </Container>
  );
};

const Container = styled.View<PositionBottomStyleProps>`
  position: absolute;
  padding-inline: ${({ paddingInline }) => paddingInline || 0}px;
  bottom: ${({ bottom }) => bottom || DEFAULT_BOTTOM_SPACE}px;
  left: 0;
  right: 0;
  align-items: center;
  z-index: 110;
`;

PositionBottom.DEFAULT_BOTTOM_SPACE = DEFAULT_BOTTOM_SPACE;
PositionBottom.DISPLAY_HEIGHT =
  Dimensions.get("window").height - DEFAULT_BOTTOM_SPACE;

export default PositionBottom;
