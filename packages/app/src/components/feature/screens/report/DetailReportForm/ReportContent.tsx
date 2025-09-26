import { REPORT_CONTENT_PLACEHOLDER } from "@constants/report";
import styled from "@emotion/native";
import useFrequentReportModal from "@hooks/feature/modal/useFrequentReportModal";
import Spacing from "@shared/layout/Spacing";
import TextAreaField from "@shared/ui/TextareaField";
import WeakButton from "@shared/ui/WeakButton";
import { COLORS } from "@styles/colorPalette";
import { Controller } from "react-hook-form";

const ReportContent = () => {
  const { showReportResult } = useFrequentReportModal();

  return (
    <>
      <Controller
        name="reportContent"
        render={({ field: { onChange, value } }) => (
          <TextAreaField
            title="신고 내용"
            titleSize={20}
            titleWeight="bold"
            width={"100%"}
            multiline
            numberOfLines={3}
            height={90}
            textAlignVertical="top"
            placeholderTextColor={COLORS.gray900}
            placeholder={REPORT_CONTENT_PLACEHOLDER}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Spacing size={12} />
      <ButtonContainer>
        <WeakButton
          title="자주 하는 신고 +"
          onPress={() => {
            showReportResult();
          }}
          color="gray800"
          borderColor="gray500"
        />
      </ButtonContainer>
    </>
  );
};

const ButtonContainer = styled.View`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 100%;
`;

export default ReportContent;
