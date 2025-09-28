import Image from "next/image";
import type { StaticImageData } from "next/image";
import Default_Profile_Image from "@/images/Default_Profile_Image.png";

export default function MyProfileImage() {
  const src = ""; // TODO: 프로필 이미지 경로 받아오기
  const width = 89;
  const height = 89;

  return (
    <Image
      src={src || Default_Profile_Image}
      alt="나의 프로필 이미지"
      width={width}
      height={height}
      className="rounded-full border-gray-700 border"
    />
  );
}
