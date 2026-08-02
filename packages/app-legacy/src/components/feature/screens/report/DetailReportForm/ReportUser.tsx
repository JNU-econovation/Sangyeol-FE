import { useDetailReportFormContext } from "@hooks/feature/form/useDetailReportForm";
import useProfileQuery from "@hooks/feature/query/query/useProfileQuery";
import FieldLayout from "@shared/layout/FieldLayout";
import Spacing from "@shared/layout/Spacing";
import LabeledInput from "@shared/ui/LabeledInput";
import { COLORS } from "@styles/colorPalette";
import { Suspense } from "@suspensive/react";
import { useEffect } from "react";

const ReportUser = Suspense.with(
  {
    fallback: null,
  },
  () => {
    const { setValue } = useDetailReportFormContext();
    const {
      data: { name, phoneNumber },
    } = useProfileQuery();

    useEffect(() => {
      setValue("reporterName", name);
      setValue("reporterPhone", phoneNumber);
    }, [name, phoneNumber, setValue]);

    return (
      <FieldLayout
        title="신고자 정보"
        titleWeight="bold"
        content={
          <>
            <LabeledInput
              labelText="이름"
              placeholder={name}
              placeholderTextColor={COLORS.black}
              editable={false}
              backgroundColor="gray600"
              height={40}
            />
            <Spacing size={12} />
            <LabeledInput
              labelText="전화번호"
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
