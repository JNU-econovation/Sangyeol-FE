import styled from "@emotion/native";

interface SpacingProps {
  size?: number;
}

const Spacing = styled.View<SpacingProps>`
  margin-top: ${({ size }) => (size ? `${size}px` : "0")};
`;

export default Spacing;
