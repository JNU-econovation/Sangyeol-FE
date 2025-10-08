import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import LabeledInput from "@shared/ui/LabeledInput";
import { Suspense } from "@suspensive/react";

const ReportUser = Suspense.with(
  {
    fallback: null,
  },
  () => {
    const {
      data: { name, phoneNumber },
    } = useProfileQuery();
    return (
      <FieldLayout
        title="신고자 정보"
        content={
          <>
            <LabeledInput
              labelText="이름"
              value={name}
              editable={false}
              backgroundColor="gray600"
            />
            <Spacing size={12} />
            <LabeledInput
              labelText="전화번호"
              value={phoneNumber}
              editable={false}
              backgroundColor="gray600"
            />
          </>
        }
      />
    );
  },
);

export default ReportUser;
