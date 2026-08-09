import Gray_Right_Arrow from "@/icons/Gray_Right_Arrow.svg";
import Image from "next/image";

interface GrayRightArrowIconProps {
  width?: number;
  height?: number;
}

export default function GrayRightArrowIcon({
  width,
  height,
}: GrayRightArrowIconProps) {
  return (
    <Image
      src={Gray_Right_Arrow}
      alt="오른쪽 회색 화살표 아이콘"
      width={width}
      height={height}
    />
  );
}
