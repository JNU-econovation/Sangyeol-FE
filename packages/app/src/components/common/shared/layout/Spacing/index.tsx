import styled from "@emotion/native";
import { memo } from "react";

interface SpacingProps {
  size?: number;
}

const Spacing = memo(styled.View<SpacingProps>`
  margin-top: ${({ size }) => (size ? `${size}px` : "0")};
`);

export default Spacing;
