import Spacing from "@shared/layout/Spacing";
import Button from "@shared/ui/Button";
import Text from "@shared/ui/Text";
import TextField from "@shared/ui/TextField";

export default function EmailAuthSection() {
  return (
    <section>
      <Text fontSize="text-3xl" fontWeight="font-bold">
        메일 인증
      </Text>

      <Spacing size={8} />

      <TextField
        label="이메일"
        type="email"
        placeholder="이메일"
        right={
          <Button color="white">
            <Text fontWeight="font-semibold">인증 요청</Text>
          </Button>
        }
      />

      <Text
        fontSize="text-sm"
        fontWeight="font-medium"
        color="text-error-message"
      >
        존재하지 않는 이메일입니다.
      </Text>

      <Spacing size={8} />

      <TextField
        label="인증번호"
        type="number"
        placeholder="인증번호"
        right={<span>04:59</span>}
      />

      <Spacing size={8} />

      <Button color="black" fullWidth={true}>
        <Text fontWeight="font-bold" color="text-white">
          확인하기
        </Text>
      </Button>
    </section>
  );
}
