import Black_Right_Arrow from "@/icons/Black_Right_Arrow.svg";
import Image from "next/image";

interface BlackRightArrowIconProps {
  width?: number;
  height?: number;
}

export default function BlackRightArrowIcon({
  width,
  height,
}: BlackRightArrowIconProps) {
  return (
    <Image
      src={Black_Right_Arrow}
      alt="오른쪽 검은색 화살표 아이콘"
      width={width}
      height={height}
    />
  );
}
