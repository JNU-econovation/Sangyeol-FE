import styled from "@emotion/native";
import { memo } from "react";

interface SpacingProps {
  size?: number;
  horizontal?: boolean;
}

const Spacing = memo(styled.View<SpacingProps>`
  margin-top: ${({ size }) => (size ? `${size}px` : "0")};
  margin-left: ${({ horizontal, size }) =>
    horizontal && size ? `${size}px` : "0"};
  margin-right: ${({ horizontal, size }) =>
    horizontal && size ? `${size}px` : "0"};
`);

export default Spacing;
