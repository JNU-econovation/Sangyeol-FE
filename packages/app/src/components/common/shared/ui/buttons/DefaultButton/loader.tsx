import styled from "@emotion/native";
import { COLORS } from "@styles/colorPalette";

interface DefaultButtonLoaderProps {
  fullWidth?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
  width?: number;
  height?: number;
  backgroundColor?: keyof typeof COLORS;
  title?: string;
  color?: keyof typeof COLORS;
}

/**
 * DefaultButton 컴포넌트의 스켈레톤 UI
 */
const DefaultButtonLoader = ({
  fullWidth,
  paddingVertical = 16,
  paddingHorizontal = 20,
  width = 80,
  height,
  backgroundColor = "gray20",
  title,
  color = "black",
}: DefaultButtonLoaderProps) => {
  const calculatedHeight = height || paddingVertical * 2 + 16;

  return (
    <ButtonSkeleton
      fullWidth={fullWidth}
      paddingVertical={paddingVertical}
      paddingHorizontal={paddingHorizontal}
      width={width}
      height={calculatedHeight}
      backgroundColor={backgroundColor}
    >
      {title ? (
        <ButtonText color={color}>{title}</ButtonText>
      ) : (
        <TextSkeleton />
      )}
    </ButtonSkeleton>
  );
};

const ButtonSkeleton = styled.View<{
  fullWidth?: boolean;
  paddingVertical: number;
  paddingHorizontal: number;
  width: number;
  height: number;
  backgroundColor: keyof typeof COLORS;
}>`
  background-color: ${({ backgroundColor }) => COLORS[backgroundColor]};
  border-radius: 8px;
  width: ${({ fullWidth, width }) => (fullWidth ? "100%" : `${width}px`)};
  height: ${({ height }) => `${height}px`};
  padding-top: ${({ paddingVertical }) => `${paddingVertical}px`};
  padding-bottom: ${({ paddingVertical }) => `${paddingVertical}px`};
  padding-left: ${({ paddingHorizontal }) => `${paddingHorizontal}px`};
  padding-right: ${({ paddingHorizontal }) => `${paddingHorizontal}px`};
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

const TextSkeleton = styled.View`
  width: 40px;
  height: 14px;
  background-color: ${COLORS.gray200};
  border-radius: 4px;
`;

const ButtonText = styled.Text<{ color: keyof typeof COLORS }>`
  color: ${({ color }) => COLORS[color]};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export default DefaultButtonLoader;
