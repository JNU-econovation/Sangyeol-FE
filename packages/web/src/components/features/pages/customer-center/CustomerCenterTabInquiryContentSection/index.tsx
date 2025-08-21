import Button from "@/components/common/shared/ui/Button";
import Input from "@/components/common/shared/ui/Input";
import Spacing from "@shared/layout/Spacing";
import Text from "@shared/ui/Text/index";

export default function CustomerCenterTabInquiryContentSection() {
  return (
    <section>
      <Spacing size={4} />
      <Text fontSize="text-2xl" fontWeight="font-bold">
        어떤 점이 궁금하신가요?
      </Text>
      <Spacing size={4} />
      <select className="w-full h-12 px-40 text-white bg-gray-20 rounded-md focus:outline-none">
        <option value="1" defaultChecked>
          문의 종류
        </option>
        <option value="2">회원가입 관련</option>
        <option value="3">결제 관련</option>
        <option value="4">서비스 이용 관련</option>
        <option value="5">기타 문의</option>
      </select>
      <Spacing size={8} />
      <Input color={"white"} placeholder="문의 제목" />
      <Spacing size={8} />
      <textarea
        className="w-full h-40 px-4 border border-gray-30 rounded-md focus:outline-none p-4"
        placeholder="문의 내용을 입력해주세요."
      />
      <Spacing size={9} />
      <Button fullWidth>문의하기</Button>
    </section>
  );
}
