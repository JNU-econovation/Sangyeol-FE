import Image from "next/image";
import type { StaticImageData } from "next/image";
import Default_Profile_Image from "@/images/Default_Profile_Image.png";

interface MyProfileImageProps {
  src: StaticImageData | string;
  width?: number;
  height?: number;
}

export default function MyProfileImage({
  src,
  width,
  height,
}: MyProfileImageProps) {
  return (
    <Image
      src={src || Default_Profile_Image}
      alt="나의 프로필 이미지"
      width={width}
      height={height}
      className="rounded-full border border-gray-30"
    />
  );
}
