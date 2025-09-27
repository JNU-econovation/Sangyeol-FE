import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import LabeledInput from "@shared/ui/LabeledInput";

const ReportUser = () => {
  // api 연동 후 수정 필요
  return (
    <FieldLayout
      title="신고자 정보"
      content={
        <>
          <LabeledInput
            labelText="이름"
            value="홍길동"
            editable={false}
            backgroundColor="gray600"
          />
          <Spacing size={12} />
          <LabeledInput
            labelText="전화번호"
            value="010-0101-0101"
            editable={false}
            backgroundColor="gray600"
          />
        </>
      }
    />
  );
};

export default ReportUser;
