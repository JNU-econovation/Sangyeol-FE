import DetailReportForm from "@components/feature/screens/report/DetailReportForm";
import ScreenContainer from "@shared/layout/Screen";
import Spacing from "@shared/layout/Spacing";
import Header from "@shared/ui/Header";
import styled from "@emotion/native";

const DetailReport = () => {
  return (
    <ScreenContainer>
      <Spacing size={20} />
      <Header headerTitle="상세 신고하기" />
      <Spacing size={38} />
      <ContentContainer>
        <DetailReportForm />
      </ContentContainer>
    </ScreenContainer>
  );
};

const ContentContainer = styled.View`
  flex: 1;
  padding-inline: 26px;
`;

export default DetailReport;
