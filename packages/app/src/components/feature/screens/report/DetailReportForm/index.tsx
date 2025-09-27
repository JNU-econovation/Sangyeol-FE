import styled from "@emotion/native";
import useDetailReportForm from "@hooks/feature/form/useDetailReportForm";
import PositionBottom from "@shared/layout/PositionBottom";
import Spacing from "@shared/layout/Spacing";
import { FormProvider } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";

import ReportAttachment from "./ReportAttachment";
import ReportContent from "./ReportContent";
import ReportPosition from "./ReportPosition";
import ReportUser from "./ReportUser";
import SubmitButton from "./SubmitButton";

const DetailReportForm = () => {
  const form = useDetailReportForm();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FormProvider {...form}>
        <ContentContainer showsVerticalScrollIndicator={false}>
          <ReportContent />
          <Spacing size={40} />
          <ReportAttachment />
          <Spacing size={40} />
          <ReportPosition />
          <Spacing size={40} />
          <ReportUser />
        </ContentContainer>

        <PositionBottom
          paddingInline={0}
          bottom={20}
          backgroundColor="mainWhite"
        >
          <SubmitButton />
        </PositionBottom>
        <Spacing size={80} />
      </FormProvider>
    </KeyboardAvoidingView>
  );
};

const ContentContainer = styled.ScrollView`
  flex: 1;
`;

export default DetailReportForm;
