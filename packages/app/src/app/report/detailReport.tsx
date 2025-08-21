import { REPORT_CONTENT_PLACEHOLDER } from "@constants/report";
import styled from "@emotion/native";
import useDetailReportForm from "@hooks/feature/form/useDetailReportForm";
import FieldLayout from "@shared/layout/FieldLayout";
import PositionBottom from "@shared/layout/PositionBottom";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import LabeledInput from "@shared/ui/LabeledInput";
import { COLORS } from "@styles/colorPalette";

const DetailReport = () => {
  const form = useDetailReportForm();

  return (
    <ScreenContainer>
      <Spacing size={20} />
      <Header headerTitle="상세 신고하기" />
      <Spacing size={38} />

      <form.AppForm>
        <ContentContainer>
          <form.AppField
            name="content"
            children={(field) => (
              <field.TextAreaField
                title="신고 내용"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor={COLORS.gray200}
                placeholder={REPORT_CONTENT_PLACEHOLDER}
              />
            )}
          />
          <Spacing size={20} />
          <form.AppField
            name="attachments"
            children={(field) => (
              <field.AttachmentField title="첨부 파일" buttonTitle="파일 +" />
            )}
          />
          <Spacing size={24} />
          <form.AppField
            name="address"
            children={(field) => (
              <field.PositionSelectField
                title="현재 위치 확인"
                titleSideButtonTitle="위치 확인"
              />
            )}
          />
          <Spacing size={24} />
          <form.AppField
            name="reporter"
            children={(field) => (
              <FieldLayout
                title="신고자 정보"
                content={
                  <>
                    <LabeledInput
                      labelText="이름"
                      value="홍길동"
                      editable={false}
                      backgroundColor="subGray"
                    />
                    <Spacing size={12} />
                    <LabeledInput
                      labelText="전화번호"
                      value="010-0101-0101"
                      editable={false}
                      backgroundColor="subGray"
                    />
                  </>
                }
              />
            )}
          />
          <Spacing size={30} />
        </ContentContainer>
        <PositionBottom>
          <form.SubmitButton
            title="신고하기"
            color="mainWhite"
            fullWidth
            disabled={form.isSubmitting}
          />
        </PositionBottom>
      </form.AppForm>
    </ScreenContainer>
  );
};

const ContentContainer = styled.ScrollView`
  padding-inline: 28px;
  /* 150은 버튼 크기 */
  max-height: ${PositionBottom.DISPLAY_HEIGHT - 150 + "px"};
  height: 100px;
`;

export default DetailReport;
