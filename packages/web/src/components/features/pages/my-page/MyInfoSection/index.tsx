"use client";

import ROUTE from "@/constants/route";
import Spacing from "@shared/layout/Spacing";
import BlackRightArrowIcon from "@shared/ui/BlackRightArrowIcon";
import Text from "@shared/ui/Text";
import MyProfileImage from "@widgets/etc/MyProfileImage";
import { StackLink } from "stack-link";

export default function MyInfoSection() {
  return (
    <section>
      {/* header */}
      <div className="px-6">
        <h1 className="text-center justify-center text-black text-xl font-medium">
          마이 페이지
        </h1>
        <Spacing size={2} />
        <hr className="w-full mx-auto text-gray-300" />
      </div>
      <Spacing size={7} />

      {/* content */}
      <div className="flex flex-col items-center">
        <MyProfileImage />
        <Spacing size={5} />
        <span className="text-green-700 border-b text-sm">프로필 변경</span>
        <Spacing size={5} />
        <StackLink href={ROUTE.MY_INFO} preLoad>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{"홍길동"}</span>
            <BlackRightArrowIcon width={10} height={10} />
          </div>
        </StackLink>
        <Spacing size={4} />
        <div className="flex flex-row items-center gap-22">
          <StackLink
            href={ROUTE.TRAVEL_LOG({
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              date: new Date().getDate(),
            })}
            preLoad
          >
            <Text
              fontSize="text-base"
              fontWeight="font-semibold"
              color="text-primary"
            >
              산행 기록
            </Text>
          </StackLink>
          <StackLink href={ROUTE.COURSE_BOOKMARK} preLoad>
            <Text
              fontSize="text-base"
              fontWeight="font-semibold"
              color="text-primary"
            >
              코스 북마크
            </Text>
          </StackLink>
        </div>
      </div>
    </section>
  );
}
