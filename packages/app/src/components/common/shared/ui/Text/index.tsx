import { COLORS } from "@styles/colorPalette";
import styled from "@emotion/native";

interface TextProps {
  fontSize?: number;
  color?: keyof typeof COLORS;
  /**
   * 폰트 굵기 설정
   * - thin: 100
   * - extralight: 200
   * - light: 300
   * - normal: 400 (alias of regular)
   * - regular: 400
   * - medium: 500
   * - semibold: 600
   * - bold: 700
   * - extrabold: 800
   * - black: 900
   */
  fontWeight?:
    | "normal"
    | "regular"
    | "bold"
    | "black"
    | "extrabold"
    | "extralight"
    | "light"
    | "medium"
    | "semibold"
    | "thin";
  textAlign?: string;
  opacity?: number;
  italic?: boolean;
}

export default styled.Text<TextProps>`
  font-size: ${({ fontSize = 16 }) => `${fontSize}px`};
  color: ${({ color = "black" }) => COLORS[color]};
  font-family: ${({ fontWeight = "regular" }) => `pretendard-${fontWeight}`};
  text-align: ${({ textAlign = "left" }) => textAlign};
  opacity: ${({ opacity = 1 }) => opacity};
  font-style: ${({ italic: Italic }) => (Italic ? "italic" : "normal")};
  ${({ italic }) => italic && "transform: skewX(-18deg);"}
`;
