import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import LabeledInput from "@shared/ui/LabeledInput";
import { COLORS } from "@styles/colorPalette";
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
        titleWeight="bold"
        content={
          <>
            <LabeledInput
              labelText="이름"
              // value={name}
              placeholder={name}
              placeholderTextColor={COLORS.black}
              editable={false}
              backgroundColor="gray600"
              height={40}
            />
            <Spacing size={12} />
            <LabeledInput
              labelText="전화번호"
              // value={phoneNumber}
              placeholder={phoneNumber}
              placeholderTextColor={COLORS.black}
              editable={false}
              backgroundColor="gray600"
              height={40}
            />
          </>
        }
      />
    );
  },
);

export default ReportUser;
